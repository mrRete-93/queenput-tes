<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Services\AuditService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class AuditLogController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(function ($request, $next) {
                if (!auth()->check() || auth()->user()->role !== 'owner') {
                    abort(403, 'Hanya Owner yang dapat melihat audit log.');
                }
                return $next($request);
            }),
        ];
    }

    public function index(Request $request)
    {
        $validated = $request->validate([
            'model'   => ['nullable', 'string', 'max:100', 'regex:/^[A-Za-z]+$/'],
            'action'  => ['nullable', 'string', 'in:created,updated,deleted,view,export'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'date'    => ['nullable', 'date_format:Y-m-d'],
        ]);

        $query = AuditLog::query();

        if (!empty($validated['model']))   $query->where('model', $validated['model']);
        if (!empty($validated['action']))  $query->where('action', $validated['action']);
        if (!empty($validated['user_id'])) $query->where('user_id', $validated['user_id']);
        if (!empty($validated['date']))    $query->whereDate('created_at', $validated['date']);

        $logs = $query->latest('id')->paginate(50)->withQueryString();

        $chainValid = Cache::remember('audit_chain_valid', 300, function () {
            return AuditLog::verifyChain();
        });

        // ✅ Catat via AuditService agar hash & prev_hash otomatis dihitung
        AuditService::log('view', 'AuditLog', 0);

        return Inertia::render('AuditLog/Index', [
            'logs'       => $logs,
            'chainValid' => $chainValid,
            'filters'    => $request->only(['model', 'action', 'user_id', 'date']),
        ]);
    }

    public function export(Request $request)
    {
        $validated = $request->validate([
            'model'   => ['nullable', 'string', 'max:100', 'regex:/^[A-Za-z]+$/'],
            'action'  => ['nullable', 'string', 'in:created,updated,deleted,view,export'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'date'    => ['nullable', 'date_format:Y-m-d'],
        ]);

        // ✅ Catat via AuditService
        AuditService::log('export', 'AuditLog', 0);

        $filename = 'audit_log_' . now()->format('Ymd_His') . '.csv';

        $headers = [
            'Content-Type'           => 'text/csv; charset=UTF-8',
            'Content-Disposition'    => "attachment; filename=\"$filename\"",
            'Cache-Control'          => 'no-store, no-cache',
            'X-Content-Type-Options' => 'nosniff',
        ];

        $columns = ['ID', 'Admin', 'Action', 'Model', 'Model ID', 'Field', 'Old Value', 'New Value', 'IP', 'Waktu', 'Hash'];

        $callback = function () use ($validated, $columns) {
            $file = fopen('php://output', 'w');
            fputs($file, "\xEF\xBB\xBF");
            fputcsv($file, $columns);

            AuditLog::when(!empty($validated['model']),   fn($q) => $q->where('model', $validated['model']))
                ->when(!empty($validated['action']),  fn($q) => $q->where('action', $validated['action']))
                ->when(!empty($validated['user_id']), fn($q) => $q->where('user_id', $validated['user_id']))
                ->when(!empty($validated['date']),    fn($q) => $q->whereDate('created_at', $validated['date']))
                ->orderBy('id')
                ->chunk(500, function ($logs) use ($file) {
                    foreach ($logs as $log) {
                        fputcsv($file, [
                            $log->id,
                            $log->admin_name ?? '-',
                            $log->action,
                            $log->model,
                            $log->model_id ?? '-',
                            $log->field ?? '-',
                            $log->old_value ?? '-',
                            $log->new_value ?? '-',
                            $log->ip_address,
                            $log->created_at->format('d/m/Y H:i:s'),
                            $log->hash,
                        ]);
                    }
                });

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
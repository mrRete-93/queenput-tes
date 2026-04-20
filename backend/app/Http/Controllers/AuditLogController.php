<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware; // Wajib di-import
use Illuminate\Routing\Controllers\Middleware;    // Wajib di-import
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
        $query = AuditLog::with('user')
            ->orderByDesc('id');

        if ($request->filled('model')) {
            $query->where('model', $request->model);
        }

        if ($request->filled('action')) {
            $query->where('action', $request->action);
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }

        $logs = $query->paginate(50)->withQueryString();

        // Verifikasi integritas chain
        $chainValid = AuditLog::verifyChain();

        return Inertia::render('AuditLog/Index', [
            'logs'       => $logs,
            'chainValid' => $chainValid,
            'filters'    => $request->only(['model', 'action', 'user_id', 'date']),
        ]);
    }

    /**
     * Export ke CSV.
     */
    public function export(Request $request)
    {
        $logs = AuditLog::with('user')
            ->when($request->model,   fn($q) => $q->where('model', $request->model))
            ->when($request->action,  fn($q) => $q->where('action', $request->action))
            ->when($request->user_id, fn($q) => $q->where('user_id', $request->user_id))
            ->when($request->date,    fn($q) => $q->whereDate('created_at', $request->date))
            ->orderBy('id')
            ->get();

        $filename = 'audit_log_' . now()->format('Ymd_His') . '.csv';

        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        $columns = ['ID', 'User', 'Action', 'Model', 'Model ID', 'Field', 'Old Value', 'New Value', 'IP', 'Waktu', 'Hash'];

        $callback = function () use ($logs, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($logs as $log) {
                fputcsv($file, [
                    $log->id,
                    $log->user->name ?? '-',
                    $log->action,
                    $log->model,
                    $log->model_id,
                    $log->field ?? '-',
                    $log->old_value ?? '-',
                    $log->new_value ?? '-',
                    $log->ip_address,
                    $log->created_at->format('d/m/Y H:i:s'),
                    $log->hash,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class AuditService
{
    /**
     * Log perubahan satu field.
     *
     * FIX Bug #4: Seluruh operasi read-prev_hash + compute + insert
     * dibungkus dalam DB::transaction dengan lockForUpdate() agar
     * tidak ada dua request yang mengambil prev_hash yang sama
     * secara bersamaan (race condition → chain rusak).
     */
    public static function log(
        string  $action,
        string  $model,
        int     $modelId,
        ?string $field    = null,
        mixed   $oldValue = null,
        mixed   $newValue = null,
    ): AuditLog {
        return DB::transaction(function () use ($action, $model, $modelId, $field, $oldValue, $newValue) {
            $prevHash = AuditLog::lockForUpdate()->latest('id')->value('hash') ?? '';
            $now      = now()->toISOString();

            // Ambil nama shift dari session
            $adminName = Request::input('shift_admin') ?? (Auth::user()?->name ?? 'System');

            $data = [
                'user_id'    => Auth::id(),
                'admin_name' => $adminName,   // ← tambah ini
                'action'     => $action,
                'model'      => $model,
                'model_id'   => $modelId,
                'field'      => $field,
                'old_value'  => $oldValue !== null ? (string) $oldValue : null,
                'new_value'  => $newValue !== null ? (string) $newValue : null,
                'ip_address' => Request::ip(),
                'user_agent' => Request::userAgent(),
                'prev_hash'  => $prevHash,
                'created_at' => $now,
            ];

            $data['hash'] = AuditLog::computeHash($data);

            return AuditLog::create($data);
        });
    }

    /**
     * Log seluruh field saat model di-create.
     * Tiap field dicatat sebagai baris terpisah agar chain tetap linear.
     */
    public static function logCreated(string $model, int $modelId, array $attributes): void
    {
        $skip = ['id', 'created_at', 'updated_at'];

        foreach ($attributes as $field => $value) {
            if (in_array($field, $skip, strict: true)) continue;
            self::log('created', $model, $modelId, $field, null, $value);
        }
    }

    /**
     * Log field yang berubah saat update — hanya field yang benar-benar berubah.
     */
    public static function logUpdated(string $model, int $modelId, array $original, array $changes): void
    {
        foreach ($changes as $field => $newValue) {
            if ($field === 'updated_at') continue;
            self::log('updated', $model, $modelId, $field, $original[$field] ?? null, $newValue);
        }
    }

    /**
     * Log snapshot seluruh data saat model di-delete.
     */
    public static function logDeleted(string $model, int $modelId, array $attributes): void
    {
        self::log('deleted', $model, $modelId, null, json_encode($attributes), null);
    }
}
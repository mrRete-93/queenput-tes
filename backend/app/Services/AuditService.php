<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AuditService
{
    /**
     * Log perubahan satu field.
     * Dipanggil dari Observer atau Controller.
     */
    public static function log(
        string $action,
        string $model,
        int    $modelId,
        ?string $field    = null,
        $oldValue         = null,
        $newValue         = null,
    ): AuditLog {
        // Ambil hash terakhir untuk membentuk chain
        $prevHash = AuditLog::latest('id')->value('hash') ?? '';
        $now      = now()->toISOString();

        $data = [
            'user_id'    => Auth::id(),
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
    }

    /**
     * Log seluruh field saat create.
     */
    public static function logCreated(string $model, int $modelId, array $attributes): void
    {
        foreach ($attributes as $field => $value) {
            if (in_array($field, ['id', 'created_at', 'updated_at'])) continue;
            self::log('created', $model, $modelId, $field, null, $value);
        }
    }

    /**
     * Log field yang berubah saat update (before & after).
     */
    public static function logUpdated(string $model, int $modelId, array $original, array $changes): void
    {
        foreach ($changes as $field => $newValue) {
            if (in_array($field, ['updated_at'])) continue;
            self::log('updated', $model, $modelId, $field, $original[$field] ?? null, $newValue);
        }
    }

    /**
     * Log saat delete.
     */
    public static function logDeleted(string $model, int $modelId, array $attributes): void
    {
        self::log('deleted', $model, $modelId, null, json_encode($attributes), null);
    }
}
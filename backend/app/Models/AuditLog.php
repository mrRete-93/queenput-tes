<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    public $timestamps = false;

    // Immutable — tidak ada update atau delete
    protected $guarded = [];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Hitung hash untuk baris ini (SHA-256 dari konten + prev_hash)
     * Mirip mekanisme blockchain sederhana.
     */
    public static function computeHash(array $data): string
    {
        $payload = implode('|', [
            $data['user_id'],
            $data['action'],
            $data['model'],
            $data['model_id'],
            $data['field'] ?? '',
            $data['old_value'] ?? '',
            $data['new_value'] ?? '',
            $data['prev_hash'] ?? '',
            $data['created_at'] ?? now()->toISOString(),
        ]);

        return hash('sha256', $payload);
    }

    /**
     * Verifikasi integritas seluruh chain — kembalikan true jika tidak ada yang dirusak.
     */
    public static function verifyChain(): bool
    {
        $logs = self::orderBy('id')->get();
        $prevHash = '';

        foreach ($logs as $log) {
            $expected = self::computeHash([
                'user_id'    => $log->user_id,
                'action'     => $log->action,
                'model'      => $log->model,
                'model_id'   => $log->model_id,
                'field'      => $log->field,
                'old_value'  => $log->old_value,
                'new_value'  => $log->new_value,
                'prev_hash'  => $log->prev_hash,
                'created_at' => $log->created_at->toISOString(),
            ]);

            if ($log->hash !== $expected || $log->prev_hash !== $prevHash) {
                return false;
            }

            $prevHash = $log->hash;
        }

        return true;
    }
}
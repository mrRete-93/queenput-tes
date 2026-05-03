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
     * Hitung hash SHA-256 dari konten + prev_hash.
     * Urutan field harus IDENTIK antara sini dan AuditService::log().
     */
   public static function computeHash(array $data): string
    {
        $payload = implode('|', [
            $data['user_id']    ?? '',
            $data['admin_name'] ?? '', // Tambahkan ini (sesuai image_5d8cd9.jpg)
            $data['action']     ?? '',
            $data['model']      ?? '',
            $data['model_id']   ?? '',
            $data['field']      ?? '',
            $data['old_value']  ?? '',
            $data['new_value']  ?? '',
            $data['ip_address'] ?? '', // Tambahkan ini
            $data['user_agent'] ?? '', // Tambahkan ini
            $data['prev_hash']  ?? '',
            $data['created_at'] ?? now()->toISOString(),
        ]);

        return hash('sha256', $payload);
    }

    /**
     * Verifikasi integritas seluruh chain.
     *
     * FIX Bug #3: chunk(500) menggantikan get() agar tidak load
     * semua baris sekaligus ke memory — aman untuk jutaan record.
     *
     * @return bool  true = chain intact, false = ada data yang dirusak
     */
    public static function verifyChain(): bool
    {
        $prevHash = '';
        $intact   = true;

        self::orderBy('id')->chunk(500, function ($logs) use (&$prevHash, &$intact) {
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
                    $intact = false;

                    // Kembalikan false agar chunk berhenti lebih awal (early exit)
                    return false;
                }

                $prevHash = $log->hash;
            }
        });

        return $intact;
    }
}
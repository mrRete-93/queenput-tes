<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\GuestObserver;

class Guest extends Model
{
    protected $fillable = [
        'nomor_kamar',
        'nama_tamu',
        'tanggal_checkin',
        'tanggal_checkout',
        'total_bayar',
        'alamat',
        'nik',
        'keterangan',
    ];

    protected $casts = [
        'total_bayar' => 'integer',
    ];

    protected static function booted(): void
    {
        static::observe(GuestObserver::class);
    }
}
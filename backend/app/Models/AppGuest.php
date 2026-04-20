<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\GuestObserver;

class AppGuest extends Model
{
    // app/Models/AppGuest.php
    protected $table = 'app_guests';

    protected $fillable = [
        'nomor_kamar',
        'nama_tamu',
        'platform',
        'tanggal_checkin',
        'tanggal_checkout',
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
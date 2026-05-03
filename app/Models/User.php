<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * FIX: Hapus #[Fillable] PHP Attribute — konflik dengan $fillable property.
     * Laravel membaca SALAH SATU, bukan keduanya. Jika Attribute yang menang,
     * kolom 'role' tidak ikut fillable → update role diam-diam diabaikan
     * → observer updated() tidak terpanggil → tidak masuk audit log.
     *
     * Gunakan $fillable property saja — lebih eksplisit dan konsisten.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',      // ← wajib ada agar update role ter-track observer
    ];

    /**
     * FIX: Hapus #[Hidden] PHP Attribute — sama-sama konflik.
     * Gunakan $hidden property saja.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Casting kolom.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }
}
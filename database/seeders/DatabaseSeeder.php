<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Guest;
use App\Models\AppGuest;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat atau update user admin/owner
        $owner = User::updateOrCreate(
            ['email' => 'owner@queenput.com'],
            [
                'name'     => 'Owner Queenput',
                'password' => Hash::make('123'),
                'role'     => 'owner',
            ]
        );

        $admin = User::updateOrCreate(
            ['email' => 'admin@queenput.com'],
            [
                'name'     => 'Admin Queenput',
                'password' => Hash::make('123'),
                'role'     => 'admin',
            ]
        );
        
        $this->command->info('Berhasil membuat user dan 100 data dummy tanpa error audit!');
    }
}
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Membuat User Owner
        User::create([
            'name'     => 'Owner Queenput',
            'email'    => 'owner@queenput.com',
            'password' => Hash::make('123'), // Silakan ganti passwordnya
            'role'     => 'owner',
        ]);

        // Membuat User Admin
        User::create([
            'name'     => 'Admin Queenput',
            'email'    => 'admin@queenput.com',
            'password' => Hash::make('123'),
            'role'     => 'admin',
        ]);
    }
}
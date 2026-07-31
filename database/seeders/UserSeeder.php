<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        User::create([
            'name' => 'Mr Shelby',
            'email' => 'lioneltala93230@gmail.com',
            'password' => Hash::make('lioneltala'),
            'role' => 'super_admin',
            'is_active' => true,
        ]);

    }
}

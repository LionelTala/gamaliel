<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('app.super_admin_email');
        $password = config('app.super_admin_password');

        if (blank($email) || blank($password)) {
            $this->command?->warn(
                'SUPER_ADMIN_EMAIL / SUPER_ADMIN_PASSWORD absents du .env — UserSeeder ignoré. '
                . 'Ajoute ces variables puis relance : php artisan db:seed --class=UserSeeder'
            );
            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => config('app.super_admin_name', 'Super Administrateur'),
                'password' => Hash::make($password),
                'role' => 'super_admin',
                'is_active' => true,
            ]
        );

        $this->command?->info("Super admin créé/mis à jour : {$email}");
    }
}
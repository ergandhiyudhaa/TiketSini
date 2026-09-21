<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Customer',
                'slug' => 'customer',
                'description' => 'User who purchases and manages event tickets.',
            ],
            [
                'name' => 'Organizer',
                'slug' => 'organizer',
                'description' => 'User who creates and manages events.',
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Administrator who manages the TiketSini platform.',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['slug' => $role['slug']],
                $role
            );
        }
    }
}
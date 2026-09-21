<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create([
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'User who purchases and manages event tickets.',
        ]);

        Role::create([
            'name' => 'Organizer',
            'slug' => 'organizer',
            'description' => 'User who creates and manages events.',
        ]);

        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Administrator who manages the TiketSini platform.',
        ]);
    }
}
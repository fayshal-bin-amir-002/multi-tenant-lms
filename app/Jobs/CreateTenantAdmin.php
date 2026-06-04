<?php

namespace App\Jobs;

use App\Models\Tenant;
use App\Models\TenantUser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreateTenantAdmin implements ShouldQueue
{
    use Queueable;


    /**
     * Create a new job instance.
     */
    public function __construct(
        public Tenant $tenant,
        public array $adminData
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->tenant->run(function () {
            $role = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'tenant']);
            $user = TenantUser::create([
                'name'     => $this->adminData['name'],
                'email'    => $this->adminData['email'],
                'password' => $this->adminData['password'],
            ]);
            $user->assignRole($role);
        });
    }
}

<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTenantRequest;
use App\Jobs\CreateTenantAdmin;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TenantRegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('Central/TenantRegister');
    }

    public function store(StoreTenantRequest $request)
    {
        $tenant = Tenant::create($request->validated());

        $tenant->domains()->create([
            'domain' => $request->domain
        ]);

        CreateTenantAdmin::dispatch($tenant, [
            'name'     => $request->admin_name,
            'email'    => $request->admin_email,
            'password' => Hash::make($request->password),
        ]);

        return redirect(route('central.dashboard'));
    }
}

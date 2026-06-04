<?php

namespace App\Http\Controllers\Tenant\Admin;

use App\Enums\TenantRole;
use App\Http\Controllers\Controller;
use App\Http\Resources\TenantUserResource;
use App\Imports\TenantUsersImport;
use App\Models\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = TenantUser::with(['roles'])->latest()->get();

        return Inertia::render('Tenant/Admin/User/Index', [
            'users' => TenantUserResource::collection($users)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tenant/Admin/User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'string', new Enum(TenantRole::class)]
        ]);

        $user = TenantUser::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('tenant.admin.user.index');
    }

    public function bulkUpload(Request $request)
    {
        // dd($request->file('bulk_file'));
        $request->validate([
            'bulk_file' => ['required', 'file', 'mimes:csv,xlsx,xls,txt', 'max:2048']
        ]);

        Excel::import(new TenantUsersImport, $request->file('bulk_file'));


        return redirect()->route('tenant.admin.user.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

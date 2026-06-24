<?php

namespace App\Http\Controllers\Tenant\Admin;

use App\Http\Controllers\Controller;
use App\Models\TenantUsage;
use App\Models\Usage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantUsageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usages = TenantUsage::query()
            ->latest()
            ->get();

        return Inertia::render('Tenant/Admin/AiUsages', [
            'usages' => $usages,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tokens' => ['required', 'integer', 'min:0'],
        ]);

        // dd($validated);

        TenantUsage::create($validated);

        $usage = Usage::firstOrCreate(
            [
                'tenant_id' => tenant('id'),
            ],
            [
                'tokens' => 0,
            ]
        );

        $usage->increment('tokens', $validated['tokens']);

        return redirect()->back()->with('success', 'Usage created successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */

    /**
     * Display the specified resource.
     */
    public function show(TenantUsage $tenantUsage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TenantUsage $tenantUsage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TenantUsage $tenantUsage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TenantUsage $tenantUsage)
    {
        //
    }
}

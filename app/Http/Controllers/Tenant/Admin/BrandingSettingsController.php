<?php

namespace App\Http\Controllers\Tenant\Admin;

use App\Http\Controllers\Controller;
use App\Models\BrandingSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrandingSettingsController extends Controller
{
    public function index()
    {

        return Inertia::render('Tenant/Admin/Setting/BrandingSettings');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'theme' => 'required|string',
            'radius' => 'required|numeric',
            'font' => 'required|string',
            'logo_file' => 'nullable|image|max:2048',
            'favicon_file' => 'nullable|image|max:512',
        ]);

        $branding = BrandingSetting::find($id);

        $data = [
            'theme_name' => $request->theme,
            'radius' => $request->radius,
            'font_family' => $request->font,
        ];

        if ($request->hasFile('logo_file')) {
            if ($branding && $branding->logo_path) {
                Storage::disk('public')->delete($branding->logo_path);
            }
            $data['logo_path'] = $request->file('logo_file')->store('branding', 'public');
        }

        if ($request->hasFile('favicon_file')) {
            if ($branding && $branding->favicon_path) {
                Storage::disk('public')->delete($branding->favicon_path);
            }
            $data['favicon_path'] = $request->file('favicon_file')->store('branding', 'public');
        }

        BrandingSetting::updateOrCreate(['id' => $id], $data);

        return back();
    }
}

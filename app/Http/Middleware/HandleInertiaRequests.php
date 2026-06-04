<?php

namespace App\Http\Middleware;

use App\Models\BrandingSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $tenantBranding = null;
        $schoolData = null;

        $fontMap = [
            'Geist' => 'font-geist',
            'Roboto' => 'font-roboto',
            'Inter' => 'font-inter',
            'Open Sans' => 'font-open-sans',
            'Merriweather' => 'font-merriweather'
        ];

        if (tenant()) {
            $branding = BrandingSetting::first();

            $schoolData = [
                'id' => tenant('id'),
                'school_name' => tenant('school_name'),
                'school_email' => tenant('school_email'),
            ];

            if ($branding) {
                $tenantBranding = [
                    'theme'      => $branding->theme_name ?? 'zinc',
                    'radius'     => $branding->radius ?? '0.625',
                    'font'       => $branding->font_family ?? 'Geist',

                    'font_class' => $fontMap[$branding->font_family] ?? 'font-geist',
                    'logo'       => (!empty($branding->logo_path))
                        ? asset($branding->logo_path)
                        : null,
                    'favicon'    => (!empty($branding->favicon_path))
                        ? asset($branding->favicon_path)
                        : null,
                ];
            }
        }

        return [
            ...parent::share($request),
            'name'   => config('app.name'),
            'school' => $schoolData,
            'tenant_branding' => $tenantBranding,

            'theme_options' => [
                'zinc',
                'neutral',
                'stone',
                'amber',
                'blue',
                'cyan',
                'emerald',
                'fuchsia',
                'green',
                'indigo',
                'lime',
                'orange',
                'pink',
                'purple',
                'red',
                'rose',
                'sky',
                'teal',
                'violet',
                'yellow'
            ],

            'font_options' => $fontMap,

            'auth'   => [
                'admin'  => $request->user('admin'),
                'tenant' => $request->user('tenant') ? [
                    'user' => $request->user('tenant'),
                    'role' => $request->user('tenant')->getRoleNames()->first(),
                ] : null,
            ],

            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
        ];
    }
}

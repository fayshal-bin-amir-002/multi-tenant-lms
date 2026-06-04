<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @if(isset($page['props']['tenant_branding']['favicon']))
            <link rel="icon" type="image/png" href="{{ $page['props']['tenant_branding']['favicon'] }}">
            <link rel="shortcut icon" type="image/png" href="{{ $page['props']['tenant_branding']['favicon'] }}">
        @else
            <link rel="icon" type="image/x-icon" href="{{ global_asset('favicon.ico') }}">
            <link rel="shortcut icon" type="image/x-icon" href="{{ global_asset('favicon.ico') }}">
        @endif
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Open+Sans:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

        @if(isset($branding['font']) && $branding['font'] !== 'Geist Variable')
            <link href="https://fonts.googleapis.com/css2?family={{ str_replace(' ', '+', $branding['font']) }}:wght@400;500;600;700&display=swap" rel="stylesheet">
        @endif

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        <style>
            :root {
                --radius: {{ $branding['radius'] ?? '0.5' }}rem;
            }

            .font-tenant {
                font-family: '{{ $branding['font'] ?? 'Geist Variable' }}', ui-sans-serif, system-ui, sans-serif !important;
            }
        </style>
    </head>
    
    <body class="theme-{{ $page['props']['tenant_branding']['theme'] ?? 'zinc' }} {{    $page['props']['tenant_branding']['font_class'] ?? 'font-roboto' }} antialiased">
        @inertia
    </body>
</html>
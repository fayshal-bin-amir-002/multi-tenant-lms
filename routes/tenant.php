<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\Admin\BrandingSettingsController;
use App\Http\Controllers\Tenant\Admin\DashboardController;
use App\Http\Controllers\Tenant\Admin\UserController;
use App\Http\Controllers\Tenant\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Tenant\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Controllers\Tenant\TenantController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->name('tenant.')->group(function () {
    Route::get('/', [TenantController::class, 'home'])->name('home');

    Route::get('/login', [TenantController::class, 'login'])->name('login');

    Route::post('/login', [TenantController::class, 'authenticate'])->name('authenticate');

    Route::post('/logout', [TenantController::class, 'logout'])->middleware(['tenant:admin'])->name('logout');

    // tenants admin routes
    Route::redirect('/admin', '/admin/dashboard');
    Route::middleware(['tenant:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

        Route::resource('/user', UserController::class);

        Route::post('/user/bulk-upload', [UserController::class, 'bulkUpload'])->name('user.bulk-upload');

        Route::resource('/branding-settings', BrandingSettingsController::class);
    });

    // tenants teacher routes
    Route::redirect('/teacher', '/teacher/dashboard');
    Route::middleware(['tenant:teacher'])->prefix('teacher')->name('teacher.')->group(function () {
        Route::get('/dashboard', TeacherDashboardController::class)->name('dashboard');
    });

    // tenants student routes
    Route::redirect('/student', '/student/dashboard');
    Route::middleware(['tenant:student'])->prefix('student')->name('student.')->group(function () {
        Route::get('/dashboard', StudentDashboardController::class)->name('dashboard');
    });
});

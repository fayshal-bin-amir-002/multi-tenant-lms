<?php

use App\Http\Controllers\Central\AdminController;
use App\Http\Controllers\Central\TenantRegisterController;
use Illuminate\Support\Facades\Route;

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->name('central.')->group(function () {
        Route::get('/', [AdminController::class, 'home'])->name('home');

        Route::get('/login', [AdminController::class, 'login'])->name('login');

        Route::post('/login', [AdminController::class, 'authenticate'])->name('authenticate');

        Route::middleware(['auth.admin'])->group(function () {
            Route::post('/logout', [AdminController::class, 'logout'])->name('logout');

            Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

            Route::get('/register-school', [TenantRegisterController::class, 'create'])->name('tenant.register.create');

            Route::post('/register-school', [TenantRegisterController::class, 'store'])->name('tenant.register.store');

            Route::get('/ai-usages', [AdminController::class, 'ai_usages'])->name('ai.usages');
        });
    });
}

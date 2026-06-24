<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Usage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function home()
    {
        return Inertia::render('Central/Home');
    }

    public function dashboard()
    {
        $tenents = Tenant::with(['domains'])->latest()->get();
        return Inertia::render('Central/Dashboard', [
            'tenents' => $tenents
        ]);
    }

    public function login()
    {
        return Inertia::render('Central/Login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended(route('central.dashboard'));
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->intended(route('central.home'));
    }

    public function ai_usages()
    {
        $usages = Usage::query()
            ->latest()
            ->get();

        return Inertia::render('Central/AiUsages', [
            'usages' => $usages,
        ]);
    }
}

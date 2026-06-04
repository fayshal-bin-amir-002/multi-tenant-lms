<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function home()
    {
        $school = tenant();
        return Inertia::render('Tenant/Home', [
            'school' => $school
        ]);
    }

    public function login()
    {
        $school = tenant();
        return Inertia::render('Tenant/Login', [
            'school' => $school
        ]);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::guard('tenant')->attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::guard('tenant')->user();
            $role = $user->getRoleNames()->first();

            return redirect()->intended(route("tenant.{$role}.dashboard"));
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::guard('tenant')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->intended(route('tenant.home'));
    }
}

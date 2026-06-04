<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->guard('tenant')->check()) {
            return redirect()->route('tenant.login');
        }

        if (!empty($roles)) {
            $user = auth()->guard('tenant')->user();

            if (!$user->hasAnyRole($roles)) {
                abort(403, 'Unauthorized action.');
            }
        }

        return $next($request);
    }
}

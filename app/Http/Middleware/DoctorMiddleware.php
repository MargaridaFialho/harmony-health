<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the authenticated user has the 'doctor' role
        if (Auth::check() && Auth::user()->hasRole('doctor')) {
            return $next($request);
        }

        // Redirect non-doctors away or show an error
        return redirect('/')->with('error', 'Access denied. You must be a doctor to view this page.');
    }
}
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            // Share the entire user object and the user's role with every Inertia response
            'auth' => function () {
                $user = auth()->user();

                if ($user) {
                    // Optionally, you can limit what properties of the user you want to share
                    // to avoid sending sensitive information (like passwords) to the frontend
                    return [
                        'user' => $user->only('id', 'name', 'email'),
                        'userRole' => $user->roles->first()->name,
                    ];
                }

                return [
                    'user' => null,
                    'userRole' => null,
                ];
            },
        ]);
    }
}

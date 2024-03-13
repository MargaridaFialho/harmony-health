<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Models\Appointment;
use App\Policies\AppointmentPolicy;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Appointment::class => AppointmentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('manage-drugs', function ($user) {
            return $user->hasRole('administrator'); // Assuming you have a hasRole method or similar
        });
    
        Gate::define('view-drugs', function ($user) {
            return $user->hasRole('doctor') || $user->hasRole('administrator');
        });
    }
}

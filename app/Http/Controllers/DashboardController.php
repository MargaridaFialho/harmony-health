<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user->load('roles'); // Load roles if you're using a roles relationship

        // Example logic for a patient
        if ($user->hasRole('patient')) { // Assuming you have a method to check user roles
            $appointments = $user->appointments()->with('doctor')->get();

            return Inertia::render('Dashboard/PatientDashboard', [
                'appointments' => $appointments,
            ]);
        }

        // Add more conditions here for other roles, e.g., doctor or admin

        // Default return for users without specific roles or additional data
        return Inertia::render('Dashboard', [
            'user' => $user,
        ]);
    }
}
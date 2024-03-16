<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user->load('roles');
        $userRole = $user->roles->first()->name;

        // Logic for a patient
        if ($user->hasRole('patient')) {
            $appointments = $user->appointments()->with('doctor')->get();

            return Inertia::render('Dashboard/PatientDashboard', [
                'appointments' => $appointments,
                'userRole' => $userRole,
            ]);
        }


        if ($user->hasRole('doctor')) {
            // Fetch all appointments for the doctor, distinguishing between confirmed and pending
            $confirmedAppointments = $user->doctorAppointments()
                ->join('users as patients', 'appointments.patient_user_id', '=', 'patients.id')
                ->where('appointments.status', 'scheduled')
                ->get(['appointments.*', 'patients.name as patient_name']);
        
            $pendingAppointments = $user->doctorAppointments()
                ->join('users as patients', 'appointments.patient_user_id', '=', 'patients.id')
                ->where('appointments.status', 'pending confirmation')
                ->get(['appointments.*', 'patients.name as patient_name']);
        
            return Inertia::render('Dashboard/DoctorDashboard', [
                'confirmedAppointments' => $confirmedAppointments,
                'pendingAppointments' => $pendingAppointments,
                'userRole' => $userRole,
            ]);
        }

        // Logic for an admin
        if ($user->hasRole('administrator')) {
            // Additional data can be fetched and passed to the admin dashboard as needed
            return Inertia::render('Dashboard/AdminDashboard', [
                'auth' => $user, // Passing the authenticated user object under 'auth'
            ]);
        }

        return Inertia::render('Dashboard', [
            'user' => $user,
            'userRole' => $userRole,
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorHistoryController extends Controller
{
    public function show(Request $request)
    {
        $user = Auth::user();
        // Fetch appointments where the doctor is the current user and status is 'completed', ordered by most recent
        $appointments = Appointment::with(['patient', 'prescriptions.drug'])
            ->where('doctor_user_id', $user->id)
            ->where('status', 'completed')
            ->orderBy('date_time', 'desc')
            ->get();

        return Inertia::render('DoctorHistory', [
            'appointments' => $appointments
        ]);
    }
}
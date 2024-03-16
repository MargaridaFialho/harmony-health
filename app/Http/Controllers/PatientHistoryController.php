<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientHistoryController extends Controller
{
    public function show(Request $request)
    {
        $user = Auth::user();
        $appointments = Appointment::with(['doctor', 'prescriptions.drug'])
            ->where('patient_user_id', $user->id)
            ->where('status', 'completed')
            ->orderBy('date_time', 'desc')
            ->get();

        return Inertia::render('PatientHistory', [
            'appointments' => $appointments
        ]);
    }

    // Adjusted getAppointments method to fit within PatientHistoryController
    public function getAppointments($patientId)
    {
        // Assuming you want to keep the functionality of fetching appointments for a specific patient ID
        $appointments = Appointment::with(['prescriptions', 'prescriptions.drug'])
                                   ->where('patient_user_id', $patientId)
                                   ->orderBy('date_time', 'desc')
                                   ->get();

        return response()->json($appointments);
    }
}
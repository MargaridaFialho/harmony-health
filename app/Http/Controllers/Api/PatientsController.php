<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Patient;

class PatientsController extends Controller
{
    public function appointments($id)
    {
        $user = User::with('roles')->findOrFail($id);

        // Check if the user has the 'patient' role
        $isPatient = $user->roles->contains('name', 'patient');
        if (!$isPatient) {
            return response()->json(['error' => 'User is not a patient'], 404);
        }

        // Directly query the appointments table using Query Builder
        $appointments = DB::table('appointments')->where('patient_user_id', $id)->get();

        return response()->json($appointments);
    }

    // New show function to fetch appointments for a user ID that is a patient
    public function show($id)
    {
        $user = User::with(['roles', 'appointments'])->findOrFail($id);

        // Check if the user has the 'patient' role
        $isPatient = $user->roles->contains('name', 'patient');
        if (!$isPatient) {
            return response()->json(['error' => 'User is not a patient'], 404);
        }

        // Check if the user has appointments
        if ($user->appointments->isEmpty()) {
            return response()->json(['message' => 'No appointments found for this patient'], 404);
        }

        return response()->json($user->appointments);
    }
}
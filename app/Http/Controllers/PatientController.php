<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    // Display a listing of patients
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    // Store a newly created patient in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            // Add other fields as necessary
        ]);

        $patient = Patient::create($validatedData);
        return response()->json($patient, 201);
    }

    // Display the specified patient
    public function show($id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }
        return response()->json($patient);
    }

    // Update the specified patient in storage
    public function update(Request $request, $id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            // Add other fields as necessary
        ]);

        $patient->update($validatedData);
        return response()->json($patient);
    }

    // Remove the specified patient from storage
    public function destroy($id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }
        $patient->delete();
        return response()->json(['message' => 'Patient deleted successfully']);
    }
}
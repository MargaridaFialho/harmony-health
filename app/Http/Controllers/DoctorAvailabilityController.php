<?php

namespace App\Http\Controllers;

use App\Models\DoctorAvailability;
use Illuminate\Http\Request;

class DoctorAvailabilityController extends Controller
{
    // Display a listing of doctor availabilities
    public function index()
    {
        $availabilities = DoctorAvailability::with('doctor')->get();
        return response()->json($availabilities);
    }

    // Store a newly created availability in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'doctor_user_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'required|in:available,not available',
        ]);

        $availability = DoctorAvailability::create($validatedData);
        return response()->json($availability, 201);
    }

    // Display the specified availability
    public function show($id)
    {
        $availability = DoctorAvailability::with('doctor')->find($id);
        if (!$availability) {
            return response()->json(['message' => 'Doctor availability not found'], 404);
        }
        return response()->json($availability);
    }

    // Update the specified availability in storage
    public function update(Request $request, $id)
    {
        $availability = DoctorAvailability::find($id);
        if (!$availability) {
            return response()->json(['message' => 'Doctor availability not found'], 404);
        }

        $validatedData = $request->validate([
            'doctor_user_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'required|in:available,not available',
        ]);

        $availability->update($validatedData);
        return response()->json($availability);
    }

    // Remove the specified availability from storage
    public function destroy($id)
    {
        $availability = DoctorAvailability::find($id);
        if (!$availability) {
            return response()->json(['message' => 'Doctor availability not found'], 404);
        }
        $availability->delete();
        return response()->json(['message' => 'Doctor availability deleted successfully']);
    }
}
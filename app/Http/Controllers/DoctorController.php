<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    // Display a listing of doctors
    public function index()
    {
        $doctors = Doctor::all();
        return response()->json($doctors);
    }

    // Show the form for creating a new doctor
    // Note: This is typically not used in API development
    public function create()
    {
        //
    }

    // Store a newly created doctor in storage
    public function store(Request $request)
    {
        $doctor = Doctor::create($request->all());
        return response()->json($doctor, 201);
    }

    // Display the specified doctor
    public function show($id)
    {
        $doctor = Doctor::find($id);
        if (!$doctor) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }
        return response()->json($doctor);
    }

    // Show the form for editing the specified doctor
    // Note: This is typically not used in API development
    public function edit($id)
    {
        //
    }

    // Update the specified doctor in storage
    public function update(Request $request, $id)
    {
        $doctor = Doctor::find($id);
        if (!$doctor) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }
        $doctor->update($request->all());
        return response()->json($doctor);
    }

    // Remove the specified doctor from storage
    public function destroy($id)
    {
        $doctor = Doctor::find($id);
        if (!$doctor) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }
        $doctor->delete();
        return response()->json(['message' => 'Doctor deleted successfully']);
    }
}
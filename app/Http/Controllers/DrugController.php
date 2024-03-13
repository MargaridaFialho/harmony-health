<?php

namespace App\Http\Controllers;

use App\Models\Drug;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DrugController extends Controller
{
    // Display a listing of drugs
    public function index()
    {
        Log::info('Fetching all drugs');
        $drugs = Drug::all();
        Log::info('Drugs fetched successfully', ['count' => $drugs->count()]);
        return response()->json($drugs);
    }

    // Store a newly created drug in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            // Add other fields as necessary
        ]);

        $drug = Drug::create($validatedData);
        return response()->json($drug, 201);
    }

    // Display the specified drug
    public function show($id)
    {
        $drug = Drug::find($id);
        if (!$drug) {
            return response()->json(['message' => 'Drug not found'], 404);
        }
        return response()->json($drug);
    }

    // Update the specified drug in storage
    public function update(Request $request, $id)
    {
        $drug = Drug::find($id);
        if (!$drug) {
            return response()->json(['message' => 'Drug not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            // Add other fields as necessary
        ]);

        $drug->update($validatedData);
        return response()->json($drug);
    }

    // Remove the specified drug from storage
    public function destroy($id)
    {
        $drug = Drug::find($id);
        if (!$drug) {
            return response()->json(['message' => 'Drug not found'], 404);
        }
        $drug->delete();
        return response()->json(['message' => 'Drug deleted successfully']);
    }
}
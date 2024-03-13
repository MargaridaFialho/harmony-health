<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DrugController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/doctors', [DoctorController::class, 'index']);

Route::post('/appointments/{appointment}/confirm', [AppointmentController::class, 'confirmAppointment']);
Route::post('/appointments/{appointment}/cancel', [AppointmentController::class, 'cancelAppointment']);

Route::get('/drugs', [DrugController::class, 'index']); // View all drugs
Route::post('/drugs', [DrugController::class, 'store']); // Add a new drug
Route::patch('/drugs/{drug}', [DrugController::class, 'update']); // Update an existing drug
Route::delete('/drugs/{drug}', [DrugController::class, 'destroy']); // Delete a drug

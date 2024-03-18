<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DrugController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\Api\PatientsController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\PatientHistoryController;


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

Route::get('/drugs', [DrugController::class, 'index']); 
Route::post('/drugs', [DrugController::class, 'store']); 
Route::patch('/drugs/{drug}', [DrugController::class, 'update']); 
Route::delete('/drugs/{drug}', [DrugController::class, 'destroy']);

Route::get('/patients', [PatientController::class, 'index']);
Route::get('/patients/{id}', [PatientsController::class, 'show']);
Route::get('/patients/{id}/appointments', [PatientsController::class, 'appointments']);

Route::get('/appointments/scheduled', [PrescriptionController::class, 'scheduledAppointments']);
Route::post('/prescriptions', [PrescriptionController::class, 'store']);

Route::post('/appointments/{id}/complete', [AppointmentController::class, 'complete']);

Route::get('/patient/{id}/appointments', [PatientHistoryController::class, 'getAppointments']);

Route::get('/appointments/all', [AppointmentController::class, 'getAllAppointments']);

Route::middleware(['web', 'auth'])->get('/appointments/pending', [AppointmentController::class, 'getPendingAppointments']);
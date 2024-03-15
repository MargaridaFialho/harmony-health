<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    DashboardController,
    ProfileController,
    AppointmentController,
    Admin\UserManagementController,
    PrescriptionController
};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn() => Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register')
]));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile routes
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    // Appointment routes
    Route::controller(AppointmentController::class)->prefix('appointments')->name('appointments.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{appointment}', 'show')->name('show');
        Route::patch('/{appointment}', 'update')->name('update');
        Route::delete('/{appointment}', 'destroy')->name('destroy');
    });

    // Admin routes
    Route::middleware('can:manageUsers,App\Models\User')->group(function () {
        Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users.manage');
        Route::post('/admin/users/{user}/update-role', [UserManagementController::class, 'updateRole'])->name('admin.users.updateRole');
        Route::post('/admin/assign-doctor', [UserManagementController::class, 'assignRoleAsDoctor'])->name('admin.assign.doctor');

        // Managing drugs
        Route::get('/admin/drugs', [UserManagementController::class, 'manageDrugs'])->middleware('can:manage-drugs')->name('admin.drugs.manage');
    });

    // Viewing drugs, accessible to all authenticated users (including doctors)
    Route::get('/drugs', [UserManagementController::class, 'viewDrugs'])->name('drugs.view');

    Route::get('/patients', function () {
        return Inertia::render('PatientPage');
    })->name('patients.index');

    Route::get('/patients/{id}', function ($id) {
        return Inertia::render('PatientDetailsPage', ['id' => $id]);
    })->name('patients.details')->middleware('auth');

    Route::get('/scheduled-appointments', function () {
        return Inertia::render('ScheduledAppointmentList');
    })->name('scheduled.appointments');
});

require __DIR__.'/auth.php';

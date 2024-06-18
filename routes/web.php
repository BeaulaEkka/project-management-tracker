<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
});

Route::resource('project', ProjectController::class);
Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
    ->name('task.myTasks');
Route::resource('task', TaskController::class);
Route::resource('user', UserController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// In routes/web.php or routes/api.php
Route::post('/tasks/store', [TaskController::class, 'store'])->name('task.store')->middleware('auth');

Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])->name('task.edit');

// Route::get('/api/tasks', [TaskController::class, 'getTasks']);

require __DIR__ . '/auth.php';

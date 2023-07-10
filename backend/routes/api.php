<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Budget\UserBudgetController;

/**
 * Budget routes.
 */
Route::get('/budgets', [UserBudgetController::class, 'index']);

/**
 * Get a budget by ID.
 */
Route::get('/budget/{id}', [UserBudgetController::class, 'readById']);

/**
 * Create a new budget.
 */
Route::post('/createbudget', [UserBudgetController::class, 'create']);

/**
 * Update a budget by ID.
 */
Route::put('/editbudget/{id}', [UserBudgetController::class, 'update']);

/**
 * Delete a budget by ID.
 */
Route::delete('/deletebudget/{id}', [UserBudgetController::class, 'delete']);

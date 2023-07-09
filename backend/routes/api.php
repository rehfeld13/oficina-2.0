<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Budget\UserBudgetController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/budgets', [UserBudgetController::class, 'index']);
Route::get('/budget/{id}', [UserBudgetController::class, 'readById']);
Route::post('/createbudget',[UserBudgetController::class,'create']);
Route::put('/editbudget/{id}', [UserBudgetController::class, 'update']);
Route::delete('/deletebudget/{id}', [UserBudgetController::class, 'delete']);

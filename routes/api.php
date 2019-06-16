<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


    // Controllers Within The "App\Http\Controllers\Admin" Namespace
    Route::get('/wallet','WalletController@index');
    Route::post('/transfer','TransferController@store');

// Route::group(function(){
// });
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

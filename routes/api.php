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



Route::group(['middleware' => ['auth:api'], 'namespace' => 'Api'], function() {
    // namespace means the folder where RoleController is located
    Route::resource('roles', 'RoleController');

    Route::get('/verify', 'UserController@verify');
});
Route::post('login', 'Api\UserController@login')->name('login');


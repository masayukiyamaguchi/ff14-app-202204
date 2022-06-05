<?php

use Illuminate\Support\Facades\Route;

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


//TOPページルート
Route::get('/', "Top\IndexController@index");

//footer
Route::get('/privacy', "Footer\IndexController@index");



//ccardルート
Route::get('/ccard', "CCard\IndexController@index")->name("index");
Route::post('/ccard', "CCard\GenerateController@index")->name("generate");




//MovieSearchルート
//top
Route::get('/moviesearch', "MovieSearch\IndexController@index");
Route::post('/moviesearch/moviesearchajax', "MovieSearch\IndexController@ajax");

//投稿画面
Route::get('/moviesearch/postcontents', "MovieSearch\MoviePostController@Index");
Route::post('/moviesearch/postcontents/create', "MovieSearch\MoviePostController@InsertData");

//データアップデートアクセス
Route::get('/moviesearch/dataupdataaccess', "MovieSearch\MoviePostController@DataUpdateBach");

//お気に入り画面
Route::get('/moviesearch/favorite', "MovieSearch\FavoriteController@redirect"); //転送
Route::post('/moviesearch/favorite', "MovieSearch\FavoriteController@index");
Route::post('/moviesearch/favoriteajax', "MovieSearch\FavoriteController@ajax");
Route::get('/ms/{movie_id}', "MovieSearch\FavoriteController@shorturl");

//チャンネル画面
Route::get('/moviesearch/channnel/{id}', "MovieSearch\IndexController@channel");

//test
Route::get('/moviesearch/test', "MovieSearch\IndexController@test");

//プレイ画面
Route::get('/moviesearch/{movie_id}', "MovieSearch\MoviePlayController@index");


//Avoidsnakesルート
Route::get('/avoidsnakes', "avoidsnakes\IndexController@index");


//Checkleve
Route::get('/checkleve', "checkleve\IndexController@index");
Route::post('/checkleve/download', "checkleve\IndexController@download");
Route::post('/checkleve/post', "checkleve\IndexController@post");


//buffsimulator
Route::get('/buffsimulator', "buffsimulator\IndexController@index");
Route::post('/buffsimulator/ajax_access', "buffsimulator\IndexController@Ajax_access");
Route::post('/buffsimulator/ajax_access_skilldata', "buffsimulator\IndexController@Ajax_access_skilldata");
Route::post('/buffsimulator/ajax_access_timeline', "buffsimulator\IndexController@Ajax_access_timeline");


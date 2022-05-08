<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesearchShorturlDatas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moviesearch_shorturl_datas', function (Blueprint $table) {
            $table->id();

            //お気に入りリスト
            $table->string("favorite_list");

            //ランダムURL
            $table->string("random_url");

            //deleted_at
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('moviesearch_shorturl_datas');
    }
}

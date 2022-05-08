<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesearchDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moviesearch_datas', function (Blueprint $table) {
            //id
            $table->id();

            //動画タイトル
            $table->string("movie_title");

            //チャンネル名
            $table->string("channel_name");
            
            //サムネイル画像
            $table->string("samneil_img");

            //チャンネル画像
            $table->string("channel_img");

            //動画ID
            $table->string("movie_id");

            //チャンネルID
            $table->string("channel_id");

            //動画説明
            $table->text("movie_discription")->nullable();

            //ジョブ
            $table->string("play_job");

            //コンテンツ
            $table->string("contents");

            //ＶＣ
            $table->boolean("bool_vc");

            //解説
            $table->boolean("bool_guide");
            
            //解説2
            $table->string("string_guide");

            //顔出し
            $table->string("string_Appearance");

            //言語
            $table->string("language");

            //クリアータイム
            $table->int("clear_time")->nullable();

            //クリアー
            $table->boolean("bool_clear");

            //act
            $table->boolean("bool_act");

            //〇〇式
            $table->string("gimick_process")->nullable();

            //再生数
            $table->integer("view_count")->nullable();

            //高評価数
            $table->integer("good_num")->nullable();

            //チャンネル登録者数
            $table->integer("member_num")->nullable();

            //動画投稿日
            $table->string("published_at");

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
        Schema::dropIfExists('moviesearch_datas');
    }
}

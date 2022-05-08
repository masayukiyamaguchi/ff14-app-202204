<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\moviesearch\Moviesearch_data;
use Faker\Generator as Faker;

$factory->define(Moviesearch_data::class, function (Faker $faker) {

    $data = [

            "movie_title" => "金ネジキクリアまでの軌跡",
            "channel_name" => "jun channel",
            "samneil_img" => "https://i.ytimg.com/vi/RbTsVd07cUk/maxresdefault.jpg",
            "channel_img" => "https://yt3.ggpht.com/ytc/AKedOLQTGeggt5tp-l3ynVXC8F1s1y18x9pMRiccw_9y_g=s800-c-k-c0x00ffffff-no-rj",
            "movie_id" => "RbTsVd07cUk",
            "channel_id" => "UCx1nAvtVDIsaGmCMSe8ofsQ",
            "movie_discription" => "ネジキクリアなんか一切目指さない。\n高い目標を持ち過ぎると、ネジキはうまくいかないと思っている。\n何気ない一戦を過ごして勝ち、それで42連勝あたりに優勝争いをしていたら、\nさあ、目指そうと。\n▼うんこちゃん/加藤純一Twitter\nhttps://twitter.com/unkochan1234567",
            "play_job"=> "blm",
            "contents"=> "eden_base_01",
            "bool_vc" => true,
            "bool_guide" => false,
            "bool_clear" => true,
            "bool_act" => false,
            "gimick_process" => "test",
            "view_count" => 100000,
            "good_num" => 100,
            "member_num" => 600,

    ];

    return $data;
});

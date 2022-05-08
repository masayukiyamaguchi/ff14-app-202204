<?php

namespace App\Http\Controllers\MovieSearch;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\moviesearch\Moviesearch_data;

class MoviePlayController extends Controller
{
    //
    public function index($id)
    {

        //クエリビルダーの記述
        $all = Moviesearch_data::where("movie_id",$id)->get();
        
        $all[0] -> view_count_numformat = number_format($all[0]["view_count"]);
        $all[0] -> view_count_str = $this -> numOfDigitsTo2($all[0]["view_count"]," 回視聴","万 回視聴");
        $all[0] -> member_num_str = $this -> numOfDigitsTo2($all[0]["member_num"],"人","万人");

        $all[0] -> published_at_str = $this -> DateToSlash($all[0]["published_at"]);



        //チャンネル登録動画の取得
        $channel_id = $all[0]["channel_id"];
        $channel = app()->make('App\Http\Controllers\MovieSearch\IndexController');
        $searchdatas = $channel -> ChannelReturnID($channel_id);


        //前にどのページにいたか確認
        //$prevurl = url()->previous();
        //dump($prevurl);


        return view("MovieSearch.movieplay",["id"=>$id , "all"=>$all[0], "searchdatas"=>$searchdatas]);


    }


    //チャンネル登録者数の数変換
    public function numOfDigitsTo2($num,$unit1,$unit2)
    {
        if($num / 10000 <1 )
        {
            $ret = (string)$num.$unit1;
            return $ret;

        }else if($num / 100000 <1 )
        {
            $num = round($num/10000,2);
            $ret = (string)($num) .$unit2;
            return $ret;

        }else if($num / 1000000 <1 )
        {
            $num = round($num/10000,1);
            $ret = (string)($num).$unit2;
            return $ret;

        }else
        {
            $ret = (string)($num/10000).$unit2;
            return $ret;
        }
    }

    //投稿日変換
    public function DateToSlash($date)
    {
        $left10 = substr($date,0,10);
        $left10Slash = str_replace("-","/",$left10);
        return $left10Slash;
    }


    


    

}

<?php

namespace App\Http\Controllers\MovieSearch;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\moviesearch\Moviesearch_data;

use Google_Client;
use Google_Service_YouTube;


//データベースのカラムにデータを追加した場合は　「APIで動画データを取得」以下と　「データの更新プログラム」以下２か所を編集
class MoviePostController extends Controller
{

    public function Index()
    {
        return view("MovieSearch.post.index");
    }

    public function InsertData(Request $request)
    {
        //データの取得
        $alldatas = $request->all();

        $movie_url = $alldatas["movie_url"];

        //ムービーURLを動画IDに変換
        $movie_ID = $this->urlToId($movie_url);

        //すでに同じムービーURLがあったらエラーを返す
        $existData = Moviesearch_data::where("movie_id", $movie_ID)->first();
        $error = array();
        if (isset($existData["movie_id"])) {
            //データのアップデートを行う
            $error = $this->DataUpData($existData, $movie_ID);
            return redirect()->back()->withInput()->withErrors($error);
        } else {
        }


        if (array_key_exists("bool_vc", $alldatas)) {
            $bool_vc = true;
        } else {
            $bool_vc = false;
        }

        /*
        if(array_key_exists("bool_guide",$alldatas))
        {
            $bool_guide = true;
        }else
        {
            $bool_guide = false;
        }
        */

        if (array_key_exists("bool_clear", $alldatas)) {
            $bool_clear = true;
        } else {
            $bool_clear = false;
        }

        if (array_key_exists("bool_act", $alldatas)) {
            $bool_act = true;
        } else {
            $bool_act = false;
        }

        $string_guide = $alldatas["string_guide"];
        $language = $alldatas["language"];

        $play_job = $alldatas["play_job"];
        $contents = $alldatas["contents"];


        //エラーならエラーコードを返す
        //if($movie_ID == "error")
        //{
        //    return "error001";
        //}


        //APIで動画データを取得
        $datas = $this->YoutubeApiGetData($movie_ID);

        //チャンネル
        $channeldatas = $this->YoutubeApiGetDataChannel($datas[0]["channelId"]);



        //サムネイル画像の大きさチェック
        $samneil_img_size = $this->ImageSizeCheck($datas[0]["thumbnails"]);
        $channel_img_size = $this->ImageSizeCheck($channeldatas[0]["thumbnails"]);

        $movie_title = $datas[0]["title"];
        $channel_name = $datas[0]["channelTitle"];
        $samneil_img = $datas[0]["thumbnails"][$samneil_img_size]["url"];
        $channel_img = $channeldatas[0]["thumbnails"][$channel_img_size]["url"];

        if (isset($channeldatas[2]["image"]["bannerExternalUrl"])) {
            $channel_header_img = $channeldatas[2]["image"]["bannerExternalUrl"];
        } else {
            $channel_header_img = "https://ff14-app.com/images/moviesearch/nonedot.jpg";
        }


        $member_num = $channeldatas[1]["subscriberCount"];
        $channel_id = $datas[0]["channelId"];

        $view_count = $datas[1]["viewCount"];
        $good_num = $datas[1]["likeCount"];

        $movie_discription_data =  $datas[0]["localized"]["description"];
        $published_at = $datas[0]["publishedAt"];

        //取得したデータからデータベースへ入れるデータへ変換
        $datas = new Moviesearch_data();
        $datas->movie_title = $movie_title;
        $datas->channel_name = $channel_name;
        $datas->samneil_img = $samneil_img;
        $datas->channel_img = $channel_img;
        $datas->channel_header_img = $channel_header_img;
        $datas->movie_id = $movie_ID;
        $datas->channel_id = $channel_id;
        $datas->movie_discription = $movie_discription_data;
        $datas->bool_vc = $bool_vc;
        //$datas -> bool_guide = $bool_guide;
        $datas->bool_clear = $bool_clear;
        $datas->bool_act = $bool_act;
        //$datas -> gimick_process = "";
        $datas->view_count = $view_count;
        $datas->good_num = $good_num;
        $datas->member_num = $member_num;
        $datas->string_guide = $string_guide;
        $datas->language = $language;
        $datas->published_at = $published_at;
        $datas->play_job = $play_job;
        $datas->contents = $contents;

        $datas->save();


        if (array_key_exists("bool_list", $alldatas)) {
            return 0;
        } else {
            return view("MovieSearch.post.postdone", ["alldata" => $datas]);
        }
    }


    //ムービーURLを動画IDに変換
    public function urlToId(string $movie_url)
    {

        //文字列の条件に抽出（エラーになるようなら、ID直入れに変更
        if (strpos($movie_url, 'youtu') !== false) {

            if (strpos($movie_url, 'watch?v=') !== false) {
                $y = mb_strpos($movie_url, "watch?v=");
                $movie_id = substr($movie_url, $y + 8, 11);
            } else {
                $y = mb_strpos($movie_url, "youtu.be/");
                $movie_id = substr($movie_url, $y + 9, 11);
            }
        } else {
            return "error";
        }
        return $movie_id;
    }


    //APIで動画データを取得
    public function YoutubeApiGetData(string $ID)
    {
        // Googleへの接続情報のインスタンスを作成と設定
        $client = new Google_Client();
        $client->setDeveloperKey(config('app.googlekey'));

        // 接続情報のインスタンスを用いてYoutubeのデータへアクセス可能なインスタンスを生成
        $youtube = new Google_Service_YouTube($client);


        // 必要情報を引数に持たせ、listSearchで検索して動画一覧を取得
        $items = $youtube->videos->listVideos('snippet,statistics', [
            'id' => $ID,
        ]);


        // 連想配列だと扱いづらいのでcollection化して処理
        $snippets = collect($items->getItems())->pluck('snippet')->all();
        $dataall[0] = $snippets[0];
        $statistics = collect($items->getItems())->pluck('statistics')->all();
        $dataall[1] =  $statistics[0];

        return $dataall;
    }

    //チャンネル
    public function YoutubeApiGetDataChannel(string $ID)
    {
        // Googleへの接続情報のインスタンスを作成と設定
        $client = new Google_Client();
        $client->setDeveloperKey(config('app.googlekey'));

        // 接続情報のインスタンスを用いてYoutubeのデータへアクセス可能なインスタンスを生成
        $youtube = new Google_Service_YouTube($client);

        // 必要情報を引数に持たせ、listSearchで検索して動画一覧を取得
        $items = $youtube->channels->listChannels('snippet,statistics,brandingSettings', [
            'id'  => $ID,
        ]);



        // 連想配列だと扱いづらいのでcollection化して処理
        $snippets = collect($items->getItems())->pluck('snippet')->all();
        $dataall[0] = $snippets[0];
        $statistics = collect($items->getItems())->pluck('statistics')->all();
        $dataall[1] =  $statistics[0];
        $brandingSettings = collect($items->getItems())->pluck('brandingSettings')->all();
        $dataall[2] =  $brandingSettings[0];

        return $dataall;
    }


    public function ImageSizeCheck($thumbnails)
    {

        if (isset($thumbnails["maxres"])) {
            return "maxres";
        } else if (isset($thumbnails["standard"])) {
            return "standard";
        } else if (isset($thumbnails["high"])) {
            return "high";
        } else if (isset($thumbnails["medium"])) {
            return "medium";
        } else {
            return "default";
        }
    }


    //データの更新プログラム
    public function DataUpData($existData, $movie_ID)
    {
        //APIで動画データを取得
        $datas = $this->YoutubeApiGetData($movie_ID);

        //チャンネル
        $channeldatas = $this->YoutubeApiGetDataChannel($datas[0]["channelId"]);

        //サムネイル画像の大きさチェック
        $samneil_img_size = $this->ImageSizeCheck($datas[0]["thumbnails"]);
        $channel_img_size = $this->ImageSizeCheck($channeldatas[0]["thumbnails"]);

        //いろいろアップデートするなら以下を変更
        $movie_title = $datas[0]["title"];
        $channel_name = $datas[0]["channelTitle"];
        $samneil_img = $datas[0]["thumbnails"][$samneil_img_size]["url"];
        $channel_img = $channeldatas[0]["thumbnails"][$channel_img_size]["url"];

        if (empty($channeldatas[2]["image"]["bannerExternalUrl"])) {
            $channel_header_img = "\images\moviesearch\samplesamneil.jpg";
        } else {
            $channel_header_img = $channeldatas[2]["image"]["bannerExternalUrl"];
        }

        $movie_discription_data =  $datas[0]["localized"]["description"];
        $member_num = $channeldatas[1]["subscriberCount"];
        $published_at = $datas[0]["publishedAt"];
        $view_count = $datas[1]["viewCount"];
        $good_num = $datas[1]["likeCount"];

        $existData->movie_title = $movie_title;
        $existData->channel_name = $channel_name;
        $existData->samneil_img = $samneil_img;
        $existData->channel_img = $channel_img;
        $existData->channel_header_img = $channel_header_img;
        $existData->movie_discription = $movie_discription_data;
        $existData->view_count = $view_count;
        $existData->good_num = $good_num;
        $existData->member_num = $member_num;
        $existData->published_at = $published_at;

        //記録
        $existData->save();

        $error[] =  "更新完了";
        return $error[0];
    }


    //アップデートバッチ
    public function DataUpdateBach()
    {
        $data_movie_ID_all = Moviesearch_data::all()->pluck("movie_id");

        foreach ($data_movie_ID_all as $data_movie_ID) {
            $existData = Moviesearch_data::where("movie_id", $data_movie_ID)->first();
            $ret = $this->DataUpData($existData, $data_movie_ID);
        }
        return view("MovieSearch.post.postdone", ["alldata" => $data_movie_ID]);
    }


    public function Postlist()
    {
        return view("MovieSearch.post.Postlist");
    }



    // 一括登録
    public function Postlistdataaccess(Request $request)
    {

        // データベースの動画データ
        $existDatas = Moviesearch_data::get(['movie_id']);
        $existData = $this->arraycolumns($existDatas);


        $alldatas = $request->all();
        $key = $alldatas;

        // Googleへの接続情報のインスタンスを作成と設定
        $client = new Google_Client();
        $client->setDeveloperKey(config('app.googlekey'));

        // 接続情報のインスタンスを用いてYoutubeのデータへアクセス可能なインスタンスを生成
        $youtube = new Google_Service_YouTube($client);


        // 必要情報を引数に持たせ、listSearchで検索して動画一覧を取得
        $items = $youtube->search->listSearch('snippet', [
            'q' => $key,
            'maxResults' => 30,
            'order' => 'relevance',
            'type' => 'video',
        ]);

        // 連想配列だと扱いづらいのでcollection化して処理
        $snippets = collect($items->getItems())->pluck('snippet')->all();

        $dataall = [];
        $index_num = 0;

        foreach ($snippets as $index => $snippet) {

            // 既に登録済みか確認
            $thumbnail = $snippet["thumbnails"]["high"]["url"];
            $id = substr($thumbnail, 23, 11);

            if (in_array($id, $existData)) {
                continue;
            }

            $name = $snippet["channelTitle"];
            $title = $snippet["title"];
            $view_url = "https://www.youtube.com/watch?v=" . $id;

            $dataall[$index_num]["name"] = $name;
            $dataall[$index_num]["title"] = $title;
            $dataall[$index_num]["thumbnail"] = $thumbnail;
            $dataall[$index_num]["id"] = $id;
            $dataall[$index_num]["view_url"] = $view_url;

            // 動画情報
            // 必要情報を引数に持たせ、listSearchで検索して動画一覧を取得
            $movieitems = $youtube->videos->listVideos('snippet,statistics,contentDetails', [
                'id' => $id,
            ]);


            $play_time = $movieitems[0]["contentDetails"]["duration"];
            $view_count =  $movieitems[0]["statistics"]["viewCount"];
            $published_at =  $movieitems[0]["snippet"]["publishedAt"];


            // 再生時間を変換
            $play_time = str_replace("PT", "", $play_time);
            $play_time = str_replace("H", ":", $play_time);
            $play_time = str_replace("M", ":", $play_time);
            $play_time = str_replace("S", "", $play_time);

            // 視聴回数を変換
            $view_count = $this->numOfDigitsTo2($view_count);


            //登録日を変換
            $published_at = substr($published_at, 0, 10);
            $published_at = str_replace("-", "/", $published_at);


            $dataall[$index_num]["play_time"] = $play_time;
            $dataall[$index_num]["view_count"] = $view_count;
            $dataall[$index_num]["published_at"] = $published_at;

            // チャンネル情報
            // 必要情報を引数に持たせ、listSearchで検索して動画一覧を取得
            $channelid = $snippet["channelId"];
            $channelitems = $youtube->channels->listChannels('snippet,statistics,brandingSettings', [
                'id'  => $channelid,
            ]);

            $channel_icon = $channelitems[0]["snippet"]["thumbnails"]["default"]["url"];
            $dataall[$index_num]["channel_icon"] = $channel_icon;

            $index_num++;
        }


        return $dataall;
    }

    //視聴回数の表記を変換
    public function numOfDigitsTo2($num)
    {
        if ($num / 10000 < 1) {
            $ret = (string)$num . " 回視聴";
            return $ret;
        } else if ($num / 100000 < 1) {
            $num = round($num / 10000, 1);
            $ret = (string)($num) . "万 回視聴";
            return $ret;
        } else if ($num / 1000000 < 1) {
            $num = round($num / 10000, 1);
            $ret = (string)($num) . "万 回視聴";
            return $ret;
        } else {
            $num = round($num / 10000, 1);
            $ret = (string)($num) . "万 回視聴";
            return $ret;
        }
    }


    //連想配列を配列にする
    public function arraycolumns($existDatas)
    {
        $return_data = [];
        foreach ($existDatas as $existData) {
            array_push($return_data, $existData["movie_id"]);
        }
        return $return_data;
    }
}

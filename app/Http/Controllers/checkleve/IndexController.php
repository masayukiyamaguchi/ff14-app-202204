<?php

namespace App\Http\Controllers\checkleve;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\checkleve\Checkleve_data;

use Illuminate\Support\Facades\Storage;

class IndexController extends Controller
{
    //top
    public function Index()
    {
        return view("checkleve.index");
    }

    //download
    public function download(Request $request)
    {
        $image_code64_all = $request->all();
        $image_code64 = $image_code64_all["datauri"];
        $image_code = substr($image_code64, 22);

        // base64デコード
        $data = base64_decode($image_code);

        $name = $_SERVER['REQUEST_TIME'];

        //MIMEタイプから拡張子を選択してファイル名を作成
        //$filename = "images/checkleve/download/checkleve".$name.".png";
        $filename = "public/images/checkleve/download/checkleve".$name.".png";


        file_put_contents($filename, $data);

        return json_encode($filename);
    }


    //post
    public function post(Request $request)
    {
        $search_data = Checkleve_data::where("email", $request->email)->first();

        if ($search_data) {
            $datas = $search_data;
        } else {
            //メールデータがない場合
            $datas = new Checkleve_data();
        }

        $datas->email = $request->email;
        $datas->lossdata = $request->date;
        $datas->time = $request->time;
        $datas->count = $request->count;

        $datas->save();

        return view("checkleve.index");
    }
}

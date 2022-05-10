<?php

namespace App\Http\Controllers\buffsimulator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\buffsimulator\Buffsimulator_jobdata;

class IndexController extends Controller
{
    //top
    public function Index()
    {

        $array_joblist = [
            "paladin", "warrior", "darkknight", "gunbreaker", "monk", "dragoon", "ninja", "samurai", "reaper", "bard", "machinist", "dancer", "blackmage", "summoner", "redmage", "bluemage", "whitemage", "scholar", "astrologian", "sage"
        ];


        return view("buffsimulator.index", compact("array_joblist"));
    }

    public function Ajax_access(Request $request)
    {
        // リクエストからデータを取得
        $select_job_alldatas = $request->all();
        $select_job = $select_job_alldatas["select_job"];

        // データベースにアクセス
        $search_data = Buffsimulator_jobdata::where("job", $select_job)->first();

        return $search_data;
    }
}

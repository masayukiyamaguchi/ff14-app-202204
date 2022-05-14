<?php

namespace App\Http\Controllers\buffsimulator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\buffsimulator\Buffsimulator_jobdata;
use App\Models\buffsimulator\Buffsimulator_skilldata;
use LengthException;

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


    public function Ajax_access_skilldata(Request $request)
    {
        // リクエストからデータを取得
        $datas = $request->all();
        $select_skill_data_alljob = [];

        // ジョブ分だけ回す
        foreach ($datas["all_done_skill_list"] as $data) {

            $loop = 0;
            $job_e = array_keys($data);

            dump("1");

            // ジョブのデータを抽出
            $search_data = Buffsimulator_skilldata::where("job_e", $job_e)->get();
            dump("2");

            // 選択されたスキルのみ抽出
            $select_skill_data =  $this->selectSkillChoice($data, $job_e, $search_data);
            dump("3");

            //合成
            array_push($select_skill_data_alljob, $select_skill_data);
            dump("4");

            $loop++;
        }

        //dump($select_skill_data_alljob);

        return 0;
    }



    // 選択されたスキルのみ抽出(次回ここが引数の変更によりバグったので再検証)
    public function selectSkillChoice($datas, $job_e, $search_datas)
    {
        $skill_no_array = $datas;
        dump("5");
        $return_data = [];
        dump("6");

        foreach ($search_datas as $search_data) {
            dump("7");
            $skill_no = $search_data["skill_no"];
            if (in_array($skill_no, $skill_no_array)) {
                array_push($return_data, $search_data);
                dump("8");
            }
        }

        return $return_data;
    }
}

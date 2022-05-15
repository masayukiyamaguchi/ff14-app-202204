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

        //メインデータがなければダミーを挿入
        if (!array_key_exists("all_done_skill_list", $datas)) {
            $datas["all_done_skill_list"] = [];
        }


        // サブ項目の配列を整理用
        $select_skill_sub = [];
        $select_skill_subs = []; //サブ項目のすべてが入っている変数

        // サブがなければダミーを挿入
        if (!array_key_exists("all_done_skill_list_sub", $datas)) {
            $datas["all_done_skill_list_sub"] = [];
        }

        // サブ項目の配列を整理
        foreach ($datas["all_done_skill_list_sub"] as $data) {
            $select_skill_sub = array_merge($select_skill_sub, $data);
        }

        $key = array_keys($select_skill_sub);
        $count = 0;


        foreach ($select_skill_sub as $data) {
            $arraysub = [];
            foreach ($data as $subdata) {
                $keysub = array_keys($subdata)[0];
                $tempsub = array($keysub => $subdata[$keysub]);
                $arraysub += $tempsub;
            }

            $temp = $arraysub;
            $temp = array($key[$count] => $temp);

            $select_skill_subs = array_merge($select_skill_subs, $temp);
            $count++;
        }



        // 選択されたスキルだけデータベースから情報を選別して抽出
        foreach ($datas["all_done_skill_list"] as $data) {

            $loop = 0;
            $job_e = array_keys($data);

            // ジョブのデータを抽出
            $search_data = Buffsimulator_skilldata::where("job_e", $job_e)->get();

            // 選択されたスキルのみ抽出
            $select_skill_data =  $this->selectSkillChoice($data, $job_e, $search_data);


            //合成
            $select_skill_data_alljob = array_merge($select_skill_data_alljob, $select_skill_data);
            $loop++;
        }

        // データベース調整
        // 整理されたサブターゲットをtarget_oneに設置
        foreach ($select_skill_data_alljob as $data) {
            $job_e = $data["job_e"];
            $skill_no = $data["skill_no"];

            if ($data["target"] == "pt_target" || $data["target"] == "other_than_oneself") {
                $data["target_one"] = $select_skill_subs[$job_e][$skill_no];
            }
        }

        // 魔法物理判断による調整
        $damage_element = $datas["damage_element"];
        $exist_kensei = false;
        $exist_adoll = false;
        if ($damage_element == "magic") {
            foreach ($select_skill_data_alljob as $data) {
                switch ($data["skill_name"]) {
                    case "牽制":
                        if (!$exist_kensei) {
                            $data["efect_size"] = 0.05;
                            $exist_kensei = true;
                            break;
                        } else {
                            break;
                        }

                    case "アドル":
                        if (!$exist_adoll) {
                            $data["efect_size"] = 0.1;
                            $exist_adoll = true;
                            break;
                        }
                }
            }
        } else {
            foreach ($select_skill_data_alljob as $data) {
                switch ($data["skill_name"]) {
                    case "牽制":
                        if (!$exist_kensei) {
                            $data["efect_size"] = 0.1;
                            $exist_kensei = true;
                            break;
                        } else {
                            break;
                        }

                    case "アドル":
                        if (!$exist_adoll) {
                            $data["efect_size"] = 0.05;
                            $exist_adoll = true;
                            break;
                        }
                }
            }
        }

        // 重複無効スキルの調整
        $exist_riplyzal = false;
        foreach ($select_skill_data_alljob as $data) {
            switch ($data["skill_name"]) {
                case "リプライザル":
                    if (!$exist_riplyzal) {
                        $exist_riplyzal = true;
                        break;
                    } else {
                        $data["efect_size"] = 0.0;
                        break;
                    }
            }
        }


        // バフ類一覧を定義
        $buff_base_list = ["f_BUF" => [], "f_BAR" => [], "f_HP" => []];
        $de_buff_boss = ["f_DBUF" => []];
        $all_buff_list = [];

        foreach ($datas["job_name_list"] as $job_name) {
            $array_temp = [$job_name => $buff_base_list];
            $all_buff_list += $array_temp;
        }



        // リターンするデータ
        foreach ($select_skill_data_alljob as $skill_data_list) {

            // 誰が
            $who =  $skill_data_list["job_e"];
            // 誰に
            $target = $skill_data_list["target"];
            // 効果量
            $efect_size = 1 - $skill_data_list["efect_size"];
            //サブターゲット
            $target_one = $skill_data_list["target_one"];

            switch ($skill_data_list["element"]) {

                case "damage_reduct":
                    // 被ダメ軽減
                    $all_buff_list = $this->skillUseDamageReduct($who, $target, $efect_size, $datas["job_name_list"], $all_buff_list, $target_one);
                    break;

                case "barrier":
                    break;

                case "boss_attack_reduct":
                    $de_buff_boss = $this->skillUseBossAttackReduct($who, $target, $efect_size, $datas["job_name_list"], $de_buff_boss, $target_one);
                    break;

                case "hp_up":
                    $all_buff_list = $this->skillUseHpUp($who, $target, $efect_size, $datas["job_name_list"], $all_buff_list, $target_one);
                    break;

                case "heal_efect_up":
                    break;

                case "magic_damege_reduct":
                    break;

                case "heal_vol_up":
                    break;

                case "special_ability":
                    break;
            }
        }


        dump($all_buff_list);

        return 0;
    }



    // 選択されたスキルのみ抽出
    public function selectSkillChoice($datas, $job_e, $search_datas)
    {
        $skill_no_array = $datas;
        $return_data = [];

        foreach ($search_datas as $search_data) {

            $skill_no = $search_data["skill_no"];

            if (in_array($skill_no, $skill_no_array[$job_e[0]])) {
                array_push($return_data, $search_data);
            }
        }
        return $return_data;
    }

    // //誰が、誰に、どのくらい、PTジョブリスト、全体のバフの総リスト
    public function skillUseDamageReduct($who, $target, $efect_size, $pt_job_lists, $all_buff_list, $target_one)
    {

        switch ($target) {
            case "one_self":
                array_push($all_buff_list[$who]["f_BUF"], $efect_size);
                return  $all_buff_list;

            case "pt_target":
            case "other_than_oneself":
                array_push($all_buff_list[$target_one]["f_BUF"], $efect_size);
                return  $all_buff_list;


            case  "pt_member":
                foreach ($pt_job_lists as $pt_job) {
                    array_push($all_buff_list[$pt_job]["f_BUF"], $efect_size);
                }

                return  $all_buff_list;
        }
    }

    public function skillUseBossAttackReduct($who, $target, $efect_size, $pt_job_lists, $de_buff_boss, $target_one)
    {
        switch ($target) {
            case "boss_around":
            case "boss_select":

                array_push($de_buff_boss["f_DBUF"], $efect_size);
                return  $de_buff_boss;
        }
    }

    public function skillUseHpUp($who, $target, $efect_size, $pt_job_lists, $all_buff_list, $target_one)
    {
        switch ($target) {
            case "one_self":
                array_push($all_buff_list[$who]["f_HP"], 2 - $efect_size);
                return  $all_buff_list;

            case "pt_target":
                array_push($all_buff_list[$target_one]["f_HP"], 2 - $efect_size);
                return  $all_buff_list;
        }
    }
}

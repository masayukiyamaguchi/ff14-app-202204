<?php

namespace App\Http\Controllers\buffsimulator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\buffsimulator\Buffsimulator_jobdata;
use App\Models\buffsimulator\Buffsimulator_skilldata;
use App\Models\buffsimulator\Buffsimulator_statusdata;
use App\Models\buffsimulator\Buffsimulator_timeline;
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

            if ($data["target"] == "pt_target") {
                $data["target_one"] = $select_skill_subs[$job_e][$skill_no];
            } else if ($job_e == "dancer" && $skill_no == "2") {
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


        // バフ類一覧などを定義
        $buff_base_list = ["f_BUF" => [], "f_BAR" => [], "f_HP" => [], "f_HEALE" => [], "f_HEALV" => [], "f_BRR" => [], "f_BRR" => []];
        $de_buff_boss = ["f_DBUF" => []];
        $f_ten = [];
        $heal_status = ["f_PTC" => 1, "f_WD" => 1, "f_HMP" => 1, "f_DET" => 1, "f_TNC" => 1, "f_SP" => 1, "f_CHR" => 1, "f_RND" => 1];
        $all_buff_list = [];
        $barrier_lists = [];


        foreach ($datas["job_name_list"] as $job_name) {
            $array_temp = [$job_name => $buff_base_list];
            $all_buff_list += $array_temp;

            //不屈
            $ten = $datas["all_job_status"][$job_name]["tenacity"];
            $status_data = Buffsimulator_statusdata::where("TEN_stat", "<=", $ten)->orderByDesc("TEN_stat")->select("f_TEN")->first();
            $ten_gain = $status_data["f_TEN"];
            array_push($f_ten, $ten_gain);
        }


        $special_skill_flags = [];

        // リターンするデータ
        foreach ($select_skill_data_alljob as $skill_data_list) {
            //特別スキルのデータ調整
            $temp = $this->specialSkillAdjust($skill_data_list, $select_skill_data_alljob, $all_buff_list);
            // 取り出し
            $skill_data_list = $temp[0];
            $all_buff_list = $temp[1];

            // 調整結果をもとに調整フラグ（秘策など）
            if ($skill_data_list["skill_name"] == "秘策") {
                if ($skill_data_list["heal"] == 1) {
                    array_push($special_skill_flags, "1_hisaku1");
                } else if ($skill_data_list["heal"] == 2) {
                    array_push($special_skill_flags, "1_hisaku2");
                }
            }

            if ($skill_data_list["skill_name"] == "展開戦術") {
                if ($skill_data_list["heal"] == 1) {
                    array_push($special_skill_flags, "2_tenkai1");
                }
            }

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
                case "barrier_hp":
                    $decoded_data = json_decode($skill_data_list, true);
                    array_push($barrier_lists, $decoded_data);
                    break;


                case "boss_attack_reduct":
                    $de_buff_boss = $this->skillUseBossAttackReduct($who, $target, $efect_size, $datas["job_name_list"], $de_buff_boss, $target_one);
                    break;

                case "hp_up":
                    $all_buff_list = $this->skillUseHpUp($who, $target, $efect_size, $datas["job_name_list"], $all_buff_list, $target_one);
                    break;

                case "heal_efect_up":
                    $all_buff_list = $this->skillUseHealEfectUp($who, $target, $efect_size, $datas["job_name_list"], $all_buff_list, $target_one);
                    break;

                case "magic_damege_reduct":
                    $all_buff_list = $this->skillUseDamageReduct($who, $target, $efect_size, $datas["job_name_list"], $all_buff_list, $target_one);
                    break;

                case "heal_vol_up":
                    $all_buff_list = $this->skillUseHealVolUp($who, $target, $efect_size, $datas["job_name_list"], $all_buff_list, $target_one);
                    break;

                case "special_ability":
                    break;
            }
        }

        // 優先順で並び替え
        asort($special_skill_flags);

        // スペシャルアビリティーのためにもう一度回す
        foreach ($special_skill_flags as $special_skill_flag) {
            switch ($special_skill_flag) {
                case "1_hisaku1":
                    $nameArray  = array_column($barrier_lists, "skill_name");
                    $result = array_search("鼓舞激励の策", $nameArray);
                    $barrier_lists[$result]["crit"] = 1;
                    $barrier_lists[$result + 1]["crit"] = 1; //激励分もクリティカル扱いは不明
                    $barrier_lists[$result + 1]["efect_size"] = 1.8;
                    break;

                case "1_hisaku2":
                    $nameArray  = array_column($barrier_lists, "skill_name");
                    $result = array_search("士気高揚の策", $nameArray);
                    $barrier_lists[$result]["crit"] = 1;
                    break;

                case "2_tenkai1":
                    $nameArray  = array_column($barrier_lists, "skill_name");
                    $kobu = array_search("鼓舞激励の策", $nameArray);
                    $nameArray  = array_column($barrier_lists, "skill_name");
                    $tenkai = array_search("展開戦術", $nameArray);

                    $barrier_lists[$tenkai]["heal"] = $barrier_lists[$kobu]["heal"]; //鼓舞の状態を展開にコピー
                    $barrier_lists[$tenkai]["crit"] = $barrier_lists[$kobu]["crit"];
                    $barrier_lists[$tenkai]["efect_size"] = $barrier_lists[$kobu]["efect_size"];
                    $barrier_lists[$tenkai]["efect_time"] = $barrier_lists[$kobu]["efect_time"];
                    $barrier_lists[$tenkai]["target_one"] = $barrier_lists[$kobu]["target_one"];
                    break;
            }
        }

        // バリア計算あとからやる
        foreach ($barrier_lists as $barrier_list) {
            // 誰が
            $who =  $barrier_list["job_e"];
            // 誰に
            $target = $barrier_list["target"];
            // 効果量
            $efect_size = $barrier_list["efect_size"];
            //サブターゲット
            $target_one = $barrier_list["target_one"];
            // 回復力
            $heal = $barrier_list["heal"];
            // クリティカル
            $crit = $barrier_list["crit"];
            // メインステータス（いったんmindのままで進行）
            $main_st = $datas["all_job_status"][$who]["mind"];
            //物理（魔法）基本性能
            $basic_p = $datas["all_job_status"][$who]["weapon_damage"];
            //意志力
            $det = $datas["all_job_status"][$who]["determination"];
            //不屈
            $ten = $datas["all_job_status"][$who]["tenacity"];
            //スキル名
            $skill_name = $barrier_list["skill_name"];



            if ($barrier_list["element"] == "barrier") {

                // 回復量計算
                $recovery_amount_nobuff =  $this->CalculateRecoveryAmount($basic_p, $heal, $who, $main_st, $det, $ten, $crit);

                //回復量アップバフ計算
                if ($barrier_list["attack_type"] == "magic") {
                    $recovery_amount_healup =  $this->HealUpBuffAmount($recovery_amount_nobuff, $all_buff_list[$who]);
                } else {
                    $recovery_amount_healup = $recovery_amount_nobuff;
                }

                //回復量の〇％分のダメージを軽減適応
                $recovery_amount_barrier = floor($recovery_amount_healup * $efect_size);

                //dump($recovery_amount_barrier);

                $all_buff_list = $this->skillUseBarrier($who, $target, $target_one, $datas["job_name_list"], $all_buff_list, $recovery_amount_barrier, $skill_name);
            } else if ($barrier_list["element"] == "barrier_hp") {
                // hp依存バリア
                $all_buff_list = $this->skillUseBarrierHP($who, $target, $target_one, $efect_size, $datas["job_name_list"], $all_buff_list, $datas["all_job_status"], $skill_name);
            }
        }

        //dump($all_buff_list);

        $return_data = [
            "all_buff_list" => $all_buff_list,
            "de_buff_boss" =>  $de_buff_boss,
            "f_ten" =>  $f_ten,
        ];

        return $return_data;
    }

    // 回復量計算
    public function CalculateRecoveryAmount($basic_p, $heal, $who, $main_st, $det, $ten, $crit)
    {
        $basic_performance = $basic_p; //基本性能

        $job_data = Buffsimulator_jobdata::where("job", $who)->first();
        $main_status_job_correction = $job_data["h_mnd"]; //ジョブ別メインステ補正

        $heal_status["f_PTC"] = $heal / 100;
        $heal_status["f_WD"] = floor((390 * $main_status_job_correction / 1000) + $basic_performance);

        $status_data = Buffsimulator_statusdata::where("main_Value", "<=", $main_st)->orderByDesc("main_Value")->select("f_AP")->first();
        $heal_status["f_HMP"] = $status_data["f_AP"];
        $status_data = Buffsimulator_statusdata::where("DET_stat", "<=", $det)->orderByDesc("DET_stat")->select("f_DET")->first();
        $heal_status["f_DET"] = $status_data["f_DET"];
        $status_data = Buffsimulator_statusdata::where("TEN_stat", "<=", $ten)->orderByDesc("TEN_stat")->select("f_TEN")->first();
        $heal_status["f_TEN"] = $status_data["f_TEN"];

        $heal_status["f_SP"] = $job_data["sp"];

        if ($crit == 1) {
            $heal_status["f_CHR"] = 1.6; //クリティカル2300相当（最終装備参考）
        } else {
            $heal_status["f_CHR"] = 1.0;
        }

        $heal_status["f_RND"] = 1.0;
        $recovery_amount_samp = floor($heal_status["f_PTC"] * $heal_status["f_WD"] * $heal_status["f_HMP"] * $heal_status["f_DET"] * $heal_status["f_TEN"]);
        $recovery_amount_samp = floor($recovery_amount_samp * $heal_status["f_CHR"]);
        $recovery_amount_samp = floor($recovery_amount_samp * $heal_status["f_SP"]);
        $recovery_amount_samp = floor($recovery_amount_samp * $heal_status["f_RND"]);

        $recovery_amount = $recovery_amount_samp;
        return $recovery_amount;
    }

    // 回復アップバフ適応
    public function HealUpBuffAmount($recovery_amount_nobuff, $all_buff_list)
    {
        $heal_val = $recovery_amount_nobuff;

        foreach ($all_buff_list["f_HEALV"] as $buff_late) {
            $heal_val = floor($heal_val * $buff_late);
        }

        return $heal_val;
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
                array_push($all_buff_list[$target_one]["f_BUF"], $efect_size);
                return  $all_buff_list;

            case "other_than_oneself":
                foreach ($pt_job_lists as $pt_job) {
                    if ($pt_job != $who) {
                        array_push($all_buff_list[$pt_job]["f_BUF"], $efect_size);
                    }
                }
                return  $all_buff_list;


            case  "pt_member":
                foreach ($pt_job_lists as $pt_job) {
                    array_push($all_buff_list[$pt_job]["f_BUF"], $efect_size);
                }

                return  $all_buff_list;
        }
    }

    public function skillUseBarrier($who, $target, $target_one, $pt_job_lists, $all_buff_list, $recovery_amount_barrier, $skill_name)
    {
        $barrier_val = $recovery_amount_barrier;

        switch ($target) {
            case "one_self":
                // 回復効果アップバフ適応
                foreach ($all_buff_list[$who]["f_HEALE"] as $val) {
                    $barrier_val = floor($barrier_val * $val);
                }
                array_push($all_buff_list[$who]["f_BRR"], $barrier_val);
                return  $all_buff_list;

            case "pt_target":
            case "other_than_oneself":
                foreach ($all_buff_list[$target_one]["f_HEALE"] as $val) {
                    $barrier_val = floor($barrier_val * $val);
                }
                array_push($all_buff_list[$target_one]["f_BRR"], $barrier_val);
                return  $all_buff_list;


            case  "pt_member":
                if ($skill_name == "展開戦術") {

                    foreach ($pt_job_lists as $pt_job) {
                        $barrier_val = $recovery_amount_barrier;
                        foreach ($all_buff_list[$pt_job]["f_HEALE"] as $val) {
                            $barrier_val = floor($barrier_val * $val);
                        }
                        if ($pt_job != $target_one) {
                            array_push($all_buff_list[$pt_job]["f_BRR"], $barrier_val);
                        }
                    }
                    return  $all_buff_list;
                }

                //通常バフの場合
                foreach ($pt_job_lists as $pt_job) {
                    $barrier_val = $recovery_amount_barrier;
                    foreach ($all_buff_list[$pt_job]["f_HEALE"] as $val) {
                        $barrier_val = floor($barrier_val * $val);
                    }
                    array_push($all_buff_list[$pt_job]["f_BRR"], $barrier_val);
                }
                return  $all_buff_list;
        }
    }

    public function skillUseBarrierHP($who, $target, $target_one, $efect_size, $pt_job_lists, $all_buff_list, $all_pt_status, $skill_name)
    {
        $barrier_val = 0;

        switch ($target) {
            case "one_self":
                // HPアップ適応
                $max_hp = $all_pt_status[$who]["hit_point"];
                foreach ($all_buff_list[$who]["f_HP"] as $val) {
                    $max_hp = $max_hp * $val;
                }
                $barrier_val = floor($max_hp * $efect_size);
                array_push($all_buff_list[$who]["f_BRR"], $barrier_val);
                return  $all_buff_list;

            case "other_than_oneself":
                return  $all_buff_list;

            case "pt_target":
                // HPアップ適応
                $max_hp = $all_pt_status[$target_one]["hit_point"];
                foreach ($all_buff_list[$target_one]["f_HP"] as $val) {
                    $max_hp = $max_hp * $val;
                }
                $barrier_val = floor($max_hp * $efect_size);
                array_push($all_buff_list[$target_one]["f_BRR"], $barrier_val);
                return  $all_buff_list;

            case  "pt_member":
                if ($skill_name == "ディヴァインヴェール") {
                    // HPアップ適応
                    $max_hp = $all_pt_status[$who]["hit_point"];
                    foreach ($all_buff_list[$who]["f_HP"] as $val) {
                        $max_hp = $max_hp * $val;
                    }
                    $barrier_val = floor($max_hp * $efect_size);

                    foreach ($pt_job_lists as $pt_job) {
                        if ($pt_job != "paladin") {
                            array_push($all_buff_list[$pt_job]["f_BRR"], $barrier_val);
                        }
                    }
                    return  $all_buff_list;
                }

                //通常バフの場合
                foreach ($pt_job_lists as $pt_job) {
                    // HPアップ適応
                    $max_hp = $all_pt_status[$pt_job]["hit_point"];
                    foreach ($all_buff_list[$pt_job]["f_HP"] as $val) {
                        $max_hp = $max_hp * $val;
                    }
                    $barrier_val = floor($max_hp * $efect_size);
                    array_push($all_buff_list[$pt_job]["f_BRR"], $barrier_val);
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

    public function skillUseHealEfectUp($who, $target, $efect_size, $pt_job_lists, $all_buff_list, $target_one)
    {
        switch ($target) {
            case "one_self":
                array_push($all_buff_list[$who]["f_HEALE"], 2 - $efect_size);
                return  $all_buff_list;

            case "pt_target":
                array_push($all_buff_list[$target_one]["f_HEALE"], 2 - $efect_size);
                return  $all_buff_list;


            case  "pt_member":
                foreach ($pt_job_lists as $pt_job) {
                    array_push($all_buff_list[$pt_job]["f_HEALE"], 2 - $efect_size);
                }

                return  $all_buff_list;
        }
    }

    public function skillUseHealVolUp($who, $target, $efect_size, $pt_job_lists, $all_buff_list, $target_one)
    {
        switch ($target) {
            case "one_self":
                array_push($all_buff_list[$who]["f_HEALV"], 2 - $efect_size);
                return  $all_buff_list;

            case  "pt_member":
                foreach ($pt_job_lists as $pt_job) {
                    array_push($all_buff_list[$pt_job]["f_HEALV"], 2 - $efect_size);
                }

                return  $all_buff_list;
        }
    }



    // 特別スキルの値調整
    public function specialSkillAdjust($skill_data_list, $select_skill_data_alljob, $all_buff_list)
    {
        switch ($skill_data_list["skill_name"]) {
            case "インターベンション":
                if ($skill_data_list["efect_size"] == 0) {
                    $key1 = array_search('ランパート', array_column($select_skill_data_alljob, 'skill_name'));
                    $key2 = array_search('センチネル', array_column($select_skill_data_alljob, 'skill_name'));
                    if ($key1 > -1 || $key2 > -1) {
                        $skill_data_list["efect_size"] = 0.1;
                    }
                }
                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;

            case "シェイクオフ":
                if ($skill_data_list["efect_size"] == 0.15) {
                    $key1 = array_search('スリル・オブ・バトル', array_column($select_skill_data_alljob, 'skill_name'));
                    $key2 = array_search('ヴェンジェンス', array_column($select_skill_data_alljob, 'skill_name'));
                    $key3 = array_search('原初の血気', array_column($select_skill_data_alljob, 'skill_name'));

                    if ($key1 > -1) {
                        $skill_data_list["efect_size"] += 0.02;
                        array_push($all_buff_list["warrior"]["f_HP"], 1 / 1.2);
                        array_push($all_buff_list["warrior"]["f_HEALE"], 1 / 1.2);
                    }
                    if ($key2 > -1) {
                        $skill_data_list["efect_size"] += 0.02;
                        array_push($all_buff_list["warrior"]["f_BUF"], 1 / 0.7);
                    }
                    if ($key3 > -1) {
                        $skill_data_list["efect_size"] += 0.02;
                        array_push($all_buff_list["warrior"]["f_BUF"], 1 / 0.9);
                    }
                }

                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;

            case "ハート・オブ・コランダム":
                if ($skill_data_list["efect_size"] == 0) {
                    $key1 = array_search('ブルータルシェル', array_column($select_skill_data_alljob, 'skill_name'));
                    if ($key1 > -1) {
                        $skill_data_list["efect_size"] = 1;
                    }
                }
                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;

            case "インプロビゼーション・フィニッシュ":
                switch ($skill_data_list["target_one"]) {
                    case "0":
                        $skill_data_list["efect_size"] = 0.05;
                        break;
                    case "1":
                        $skill_data_list["efect_size"] = 0.06;
                        break;
                    case "2":
                        $skill_data_list["efect_size"] = 0.07;
                        break;
                    case "3":
                        $skill_data_list["efect_size"] = 0.08;
                        break;
                    case "4":
                        $skill_data_list["efect_size"] = 0.1;
                        break;
                }
                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;

            case "秘策":
                $key1 = array_search('鼓舞激励の策', array_column($select_skill_data_alljob, 'skill_name'));
                $key2 = array_search('士気高揚の策', array_column($select_skill_data_alljob, 'skill_name'));
                if ($key1 > -1) {
                    $skill_data_list["heal"] = 1;
                } else if ($key2 > -1) {
                    $skill_data_list["heal"] = 2;
                }
                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;

            case "展開戦術":
                $key1 = array_search('鼓舞激励の策', array_column($select_skill_data_alljob, 'skill_name'));
                if ($key1 > -1) {
                    $skill_data_list["heal"] = 1;
                }

                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;

            case "アスペクト・ベネフィク":
            case "アスペクト・ヘリオス":
                $key1 = array_search('ニュートラルセクト', array_column($select_skill_data_alljob, 'skill_name'));
                if ($key1 > -1) {

                    $skill_data_list["heal"] = 250;
                }
                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;

            case "タウロコレ":
                $key1 = array_search('ケーラコレ', array_column($select_skill_data_alljob, 'skill_name'));
                if ($key1 > -1) {
                    $skill_data_list["efect_size"] = 0;
                }
                $array_temp = [$skill_data_list, $all_buff_list];
                return $array_temp;
        }
        $array_temp = [$skill_data_list, $all_buff_list];
        return $array_temp;
    }

    public function Ajax_access_timeline(Request $request)
    {
        // リクエストからデータを取得
        $data = $request->all();
        $phase_name = $data["phase_name"];

        // データベースにアクセス
        $search_data = Buffsimulator_timeline::where("contents", $phase_name)->get();

        return $search_data;
    }


    public function Ajax_access_skilldata_only(Request $request)
    {

        // ジョブのデータを抽出
        $search_data = Buffsimulator_skilldata::get();

        return $search_data;
    }
}

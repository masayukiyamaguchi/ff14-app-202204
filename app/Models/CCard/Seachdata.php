<?php

namespace App\Models\CCard;

use Illuminate\Database\Eloquent\Model;
use XIVAPI\XIVAPI;
use GuzzleHttp\Client;

class Seachdata extends Model
{
    // 基本情報
    public function searchdata($id){

        // データが取得できなかった場合の処理
        if($data = @file_get_contents("https://xivapi.com/character/".$id."?data=AC")){
            $seach_datas = json_decode($data);
        }else{
            $seach_datas = "error";
        }
        return $seach_datas;
    }


    public function searchworld($sever){
        switch($sever){
            case "Adamantoise":
            case "Cactuar":
            case "Faerie":
            case "Gilgamesh":
            case "Jenova":
            case "Midgardsormr":
            case "Sargatanas":
            case "Siren":
                return "Aether";
                break;

            case "Cerberus":
            case "Louisoix":
            case "Moogle":
            case "Omega":
            case "Ragnarok":
            case "Spriggan":
                return "Chaos";
                break;

            case "Balmung":
            case "Brynhildr":
            case "Coeurl":
            case "Diabolos":
            case "Goblin":
            case "Malboro":
            case "Mateus":
            case "Zalera":
                return "Crystal";
                break;

            case "Aegis":
            case "Atomos":
            case "Carbuncle":
            case "Garuda":
            case "Gungnir":
            case "Kujata":
            case "Ramuh":
            case "Tonberry":
            case "Typhon":
            case "Unicorn":
                return "Elemental";
                break;

            case "Alexander":
            case "Bahamut":
            case "Durandal":
            case "Fenrir":
            case "Ifrit":
            case "Ridill":
            case "Tiamat":
            case "Ultima":
            case "Valefor":
            case "Yojimbo":
            case "Zeromus":
                return "Gaia";
                break;

            case "초코보":
            case "모그리":
            case "카벙클":
            case "톤베리":
                return "Korea";
                break;

            case "Lich":
            case "Odin":
            case "Phoenix":
            case "Shiva":
            case "Zodiark":
            case "Twintania":
                return "Light";
                break;

            case "Anima":
            case "Asura":
            case "Belias":
            case "Chocobo":
            case "Hades":
            case "Ixion":
            case "Mandragora":
            case "Masamune":
            case "Pandaemonium":
            case "Shinryu":
            case "Titan":
                return "Mana";
                break;

            case "Behemoth":
            case "Excalibur":
            case "Exodus":
            case "Famfrit":
            case "Hyperion":
            case "Lamia":
            case "Leviathan":
            case "Ultros":
                return "Primal";
                break;

            case "ZiShuiZhanQiao":
            case "YanXia":
            case "JingYuZhuangYuan":
            case "MoDuNa":
            case "HaiMaoChaWu":
            case "RouFengHaiWan":
            case "HuPoYuan":
                return "猫小胖";
                break;

            case "BaiYinXiang":
            case "BaiJinHuanXiang":
            case "ShenQuanHen":
            case "ChaoFengTing":
            case "LvRenZhanQiao":
            case "FuXiaoZhiJian":
            case "Longchaoshendian":
            case "MengYuBaoJing":
                return "莫古力";
                break;

            case "HongYuHai":
            case "ShenYiZhiDi":
            case "LaNuoXiYa":
            case "HuanYingQunDao":
            case "MengYaChi":
            case "YuZhouHeYin":
            case "WoXianXiRan":
            case "ChenXiWangZuo":
                return "陆行鸟";
                break;

        }
    }

    public function searchrace($race){
        
        switch($race){
            case "1":
                return "ヒューラン";
                break;

            case "2":
                return "エレゼン";
                break;            
        
            case "3":
                return "ララフェル";
                break;
                
            case "4":
                return "ミコッテ";
                break;

            case "5":
                return "ルガディン";
                break;

            case "6":
                return "アウラ";
                break;

            case "7":
                return "ロスガル";
                break;

            case "8":
                return "ヴィエラ";
                break;
        }
    }

    public function searchtribe($tribe){
        switch($tribe){
            case "1":
                return "ミッドランダー";
                break;

            case "2":
                return "ハイランダー";
                break;

            case "3":
                return "フォレスター";
                break;

            case "4":
                return "シェーダー";
                break;

            case "5":
                return "プレーンフォーク";
                break;

            case "6":
                return "デューンフォーク";
                break;

            case "7":
                return "サンシーカー";
                break;

            case "8":
                return "ムーンキーパー";
                break;

            case "9":
                return "ゼーヴォルフ";
                break;

            case "10":
                return "ローエンガルデ";
                break;

            case "11":
                return "アウラ・レン";
                break;

            case "12":
                return "アウラ・ゼラ";
                break;

            case "13":
                return "ヘリオン";
                break;

            case "14":
                return "ロスト";
                break;

            case "15":
                return "ラヴァ・ヴィエラ";
                break;

            case "16":
                return "ヴィナ・ヴィエラ";
                break;

        }
    }

    public function searchgender($gender){
        switch($gender){
            case "1":
                return "♂";
                break;
            
            case "2":
                return "♀";
                break;
        }
    }
    
    // ジョブレベルのサーチ
    public function searchjoblevel($id){

        // キャラデータ抽出
        $seach_datas = file_get_contents("https://xivapi.com/character/".$id);
        $seach_datas = json_decode($seach_datas);
        
        // ジョブ情報を抽出
        $classJobs = $seach_datas->Character->ClassJobs;

        // 格納配列を定義
        $job_level_list = array();
        $i=0;

        // 各ジョブ情報ごとに配列に追加
        foreach($classJobs as $classJob){
            $job_id = $classJob->UnlockedState->ID;
            // ジョブIDに合致したジョブアイコンの画像ファイル名を取得
            $job_icon_img = $this->id_img($job_id);
            $job_level = $classJob->Level;

            $job_level_list[$i] = array("icn"=>$job_icon_img,"level"=>$job_level);
            
            $i++;           
        }        
        return $job_level_list;
    }

    public static function id_img($id){
        switch($id){
            case "1":
                return "gladiator";
                break;

            case "19":
                return "paladin";
                break;

            case "3":
                return "marauder";
                break;

            case "21":
                return "warrior";
                break;

            case "32":
                return "darkknight";
                break;

            case "37":
                return "gunbreaker";
                break;

            case "2":
                return "pugilist";
                break;

            case "20":
                return "monk";
                break;

            case "4":
                return "lancer";
                break;

            case "22":
                return "dragoon";
                break;

            case "29":
                return "rogue";
                break;

            case "30":
                return "ninja";
                break;

            case "34":
                return "samurai";
                break;

            case "6":
                return "conjurer";
                break;

            case "24":
                return "whitemage";
                break;

            case "26":
                return "arcanist";
                break;

            case "28":
                return "scholar";
                break;

            case "33":
                return "astrologian";
                break;

            case "5":
                return "archer";
                break;

            case "23":
                return "bard";
                break;

            case "31":
                return "machinist";
                break;

            case "38":
                return "dancer";
                break;

            case "7":
                return "thaumaturge";
                break;

            case "25":
                return "blackmage";
                break;

            case "26":
                return "arcanist";
                break;

            case "27":
                return "summoner";
                break;

            case "35":
                return "redmage";
                break;

            case "36":
                return "bluemage";
                break;

            case "8":
                return "carpenter";
                break;

            case "9":
                return "blacksmith";
                break;

            case "10":
                return "armorer";
                break;

            case "11":
                return "goldsmith";
                break;

            case "12":
                return "leatherworker";
                break;

            case "13":
                return "weaver";
                break;

            case "14":
                return "alchemist";
                break;

            case "15":
                return "culinarian";
                break;

            case "16":
                return "miner";
                break;

            case "17":
                return "botanist";
                break;

            case "18":
                return "fisher";
                break;
            
            default:
                return "bluemage";
                break;
        }
    }

    public function searchachievement($char_achievements,$char_gender){

        $data = array();

        if($char_gender == 1){
            $Lucky = "Lucky Lord";
            $Waters = "Lord of Far Waters";
        }else{
            $Lucky = "Lucky Lady";
            $Waters = "Lady of Far Waters";
        }

        // アチーブメントID配列を作る
        $achievement_lists = array(
            array('ID'=>1987,'title'=>$Lucky,'name'=>'ウズネアカナル深層の覇者：ランク4'),
            array('ID'=>2747,'title'=>'Gaolbreaker','name'=>'リェー・ギア・ダンジョン祭殿の覇者：ランク4'),
            array('ID'=>2056,'title'=>'Hoarder','name'=>'埋もれた財宝：ランク5'),
            array('ID'=>854,'title'=>'Alpha Wolf','name'=>'鋭き牙'),
            array('ID'=>2012,'title'=>'Eversharp','name'=>'鋭爪の群狼'),
            array('ID'=>1088,'title'=>'High Roller','name'=>'ハイローラー'),
            array('ID'=>1921,'title'=>'Ultimate Thrillseeker','name'=>'超大物殺し：ランク6'),
            array('ID'=>2356,'title'=>'the Fabulously Feral','name'=>'ナッツモブハンター'),
            array('ID'=>2474,'title'=>'Unbound Blue','name'=>'大迷宮を極めし青魔道士'),
            array('ID'=>2475,'title'=>'Blue Justice','name'=>'機工城を極めし青魔道士'),
            array('ID'=>2739,'title'=>'the Azure and Omega','name'=>'次元の狭間を極めし青魔道士'),
            array('ID'=>1993,'title'=>'the Legend','name'=>'絶バハムートを狩りし者'),
            array('ID'=>2107,'title'=>'the Ultimate Legend','name'=>'絶アルテマウェポンを破壊せし者'),
            array('ID'=>2444,'title'=>'the Perfect Legend','name'=>'絶アレキサンダーを破壊せし者'),
            array('ID'=>1952,'title'=>'the Necromancer','name'=>'孤独なる挑戦者：ランク3'),
            array('ID'=>2055,'title'=>'Lone Hero','name'=>'孤高なる挑戦者：ランク2'),
            array('ID'=>2182,'title'=>'Mahjong Master','name'=>'月下の雀士'),
            array('ID'=>2686,'title'=>'Sword of the South','name'=>'南方ボズヤ戦線の英雄'),
            array('ID'=>2880,'title'=>'Hero of Zadnor','name'=>'ザトゥノル高原の英雄'),
            array('ID'=>2881,'title'=>"Gunnhildr's Blade",'name'=>'グンヒルドの剣'),
            array('ID'=>2766,'title'=>'Delubrum Delver','name'=>'グンヒルド・ディルーブラムを完全制覇せし者：ランク2'),
            array('ID'=>2245,'title'=>'Ebisu','name'=>'太公望への道：ランク16'),
            array('ID'=>2833,'title'=>$Waters,'name'=>'第一世界の太公望：ランク5'),
            array('ID'=>2524,'title'=>'the Hand of Creation','name'=>'蒼天街の製作王'),
            array('ID'=>2525,'title'=>'Divine Provider','name'=>'蒼天街の採集王'),
                
        );

            foreach($achievement_lists as $achievement_list){
                $search = $achievement_list["ID"];
                $key = in_array($search,array_column($char_achievements,"ID"));
                if($key){
                     array_push($data,$achievement_list);
                }
            }

        return($data);
    }


    public function fflogsdata(){

        $url = "https://www.fflogs.com:443/v1/parses/character/Felyne Melynx/anima/JP?api_key=0c0e448d159f40ee459905102e3f052b";
        $method = "GET";
        //接続
        $client = new Client();
        $response = $client->request($method, $url);
        $posts = $response->getBody();
        $posts = json_decode($posts, true);

        return $posts;

    }
    
  


    
}

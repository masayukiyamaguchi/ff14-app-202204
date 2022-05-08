// ロード画面
window.onload = function() {
  const spinner = document.getElementById('load');
  spinner.classList.add('loaded');
}

$(function() {

// トップページ
/* aタグをサブミット */

$('.btn-shine').click( function(){
  var action = $( this ).attr("href");
  $('#formInput').attr({"action":action}).submit();
  $("#load").removeClass("loaded");
});

   



// 初期値
var default_setting = {
  'char_comment_span_x':'28',
  'char_comment_span_y':'50',
  'char_favorite_span_x':'26',
  'char_favorite_span_y':'-28',
  'char_freecompany_span_x':'-12',
  'char_freecompany_span_y':'-12',
  'char_job_icon_span_x':'28',
  'char_job_icon_span_y':'16',
  'char_main_job_span_x':'28',
  'char_main_job_span_y':'1',
  'char_message_x':'495',
  'char_message_y':'171',
  'first_last_name_x':'36',
  'first_last_name_y':'18',
  'first_name_x':'36',
  'first_name_y':'18',
  'last_name_x':'182',
  'last_name_y':'18',
  'char_race_span_x':'26',
  'char_race_span_y':'-11',
  'char_server_span_x':'-14',
  'char_server_span_y':'0',
  'copyright_span_black_x':'3',
  'copyright_span_black_y':'527',
  'copyright_span_white_x':'3',
  'copyright_span_white_y':'527',
  'white_cambas_x':'-1',
  'white_cambas_y':'-547',
  'main_job_bg_c':'1',
  'server_bg_c':'1',
  'race_bg_c':'1',
  'freecompany_bg_c':'1',
  'favorite_bg_c':'1',
  'comment_bg_c':'1',
  'job_bg_c':'1',
  'copy_white_bg_c':'0',
  'copy_black_bg_c':'0',
  'white_cambas_b':'rgba(255, 255, 255, 0.59)',
  'char_name_f':'"Noto Sans JP", sans-serif',
  'job_icon_list_font_name_f':'"Noto Sans JP", sans-serif',
  'char_name_d':'7',
  'char_name_s':'35.7px',
  'char_name_b':'rgba(0, 0, 0)',
  'char_name_c':'0',
  'select_main_job_p':'paladin ナイト img/jobicon/01/paladin.png',
  'char_info_d':'0',
  'char_info_b':'rgb(0, 0, 0)',
  'char_main_name_b':'rgb(0, 0, 0)',
  'text001_c':'1',
  'text015_c':'1',
  'text002_c':'1',
  'text003_c':'0',
  'text004_c':'0',
  'text005_c':'0',
  'text006_c':'0',
  'text009_c':'0',
  'text008_c':'0',
  'text007_c':'0',
  'text010_c':'0',
  'text011_c':'0',
  'text012_c':'0',
  'text013_c':'0',
  'text014_c':'0',
  'char_favorite_b':'rgb(0, 0, 0)',
  'char_favorite_name_b':'rgb(0, 0, 0)',
  'char_comment_text_t':'まったり楽しんでます(*´∀｀)<br>よろしくおねがします！<br>',
  'char_comment_b':'rgb(0, 0, 0)',
  'char_comment_name_b':'rgb(0, 0, 0)',
  'job_icon_img_d':'0',
  'button_up_n':'0',
  'button_left_n':'0',
  'button_minus_n':'0',
  'button_line_minus_n':'0',
  'job_icon_list_color_const_e':'#ff5722',
  'job_icon_list_color_e':'#000000',
  'position_radio_r':'0',
  'char_info_c':'0',
  'white_cambas_w':'481',
  'white_cambas_h':'540',
  'char_flame_div_c':'0',
  'char_flame_div_d':'4',
}

// テンプレート初期値設定
localStorage.setItem("layout91", JSON.stringify({"copyright_span_white_x":"3","char_main_job_span_x":"28","freecompany_bg_c":"1","main_job_bg_c":"1","char_main_job_span_y":"1","job_bg_c":"1","text004_c":"0","char_favorite_b":"rgb(0, 0, 0)","select_main_job_p":"paladin ナイト img/jobicon/01/paladin.png","favorite_bg_c":"1","server_bg_c":"1","char_name_s":"35.7px","text006_c":"0","first_name_x":"36","char_comment_b":"rgb(0, 0, 0)","text005_c":"0","char_comment_span_x":"28","char_freecompany_span_y":"-12","text007_c":"0","button_line_minus_n":"0","text010_c":"0","text011_c":"0","char_name_b":"rgba(0, 0, 0)","first_last_name_x":"36","copyright_span_white_y":"527","copyright_span_black_y":"527","race_bg_c":"1","button_left_n":"0","char_comment_name_b":"rgb(0, 0, 0)","char_comment_span_y":"50","char_message_x":"495","text003_c":"0","text014_c":"0","first_last_name_y":"18","char_favorite_span_x":"26","char_race_span_x":"26","text001_c":"1","job_icon_list_color_const_e":"#ff5722","job_icon_list_font_name_f":"\"Noto Sans JP\", sans-serif","white_cambas_x":"-1","comment_bg_c":"1","white_cambas_b":"rgba(255, 255, 255, 0.59)","job_icon_img_d":"0","char_job_icon_span_y":"16","char_freecompany_span_x":"-12","text002_c":"1","char_server_span_x":"-14","char_flame_div_d":"4","first_name_y":"18","char_name_f":"\"Noto Sans JP\", sans-serif","char_main_name_b":"rgb(0, 0, 0)","char_info_c":"0","char_job_icon_span_x":"28","text015_c":"1","copy_black_bg_c":"0","char_name_d":"7","copyright_span_black_x":"3","position_radio_r":"0","char_name_c":"0","text009_c":"0","text008_c":"0","char_message_y":"171","copy_white_bg_c":"0","text013_c":"0","last_name_x":"182","char_favorite_name_b":"rgb(0, 0, 0)","char_race_span_y":"-11","last_name_y":"18","text012_c":"0","white_cambas_h":"540","char_info_b":"rgb(0, 0, 0)","button_up_n":"0","button_minus_n":"0","white_cambas_y":"-547","job_icon_list_color_e":"#000000","char_comment_text_t":"まったり楽しんでます(*´∀｀)<br>よろしくおねがします！<br>","white_cambas_w":"481","char_flame_div_c":"0","char_info_d":"0","char_favorite_span_y":"-28","char_server_span_y":"0"}));
localStorage.setItem("layout92", JSON.stringify({"copyright_span_white_x":"3","char_main_job_span_x":"28","freecompany_bg_c":"1","main_job_bg_c":"1","char_main_job_span_y":"1","job_bg_c":"1","text004_c":"0","char_favorite_b":"rgb(255, 255, 255)","select_main_job_p":"paladin ナイト img/jobicon/01/paladin.png","favorite_bg_c":"1","server_bg_c":"1","char_name_s":"35.7px","text006_c":"0","first_name_x":"36","char_comment_b":"rgb(255, 255, 255)","text005_c":"0","char_comment_span_x":"28","char_freecompany_span_y":"-12","text007_c":"0","button_line_minus_n":"0","text010_c":"0","text011_c":"0","char_name_b":"rgb(255, 255, 255)","first_last_name_x":"36","copyright_span_white_y":"527","copyright_span_black_y":"527","race_bg_c":"1","button_left_n":"-1","char_comment_name_b":"rgb(255, 255, 255)","char_comment_span_y":"50","char_message_x":"495","text003_c":"0","text014_c":"0","first_last_name_y":"18","char_favorite_span_x":"26","char_race_span_x":"26","text001_c":"1","job_icon_list_color_const_e":"#ff5722","job_icon_list_font_name_f":"\"Noto Sans JP\", sans-serif","white_cambas_x":"-1","comment_bg_c":"1","white_cambas_b":"rgba(0, 0, 0, 0.59)","job_icon_img_d":"0","char_job_icon_span_y":"16","char_freecompany_span_x":"-12","text002_c":"1","char_server_span_x":"-14","char_flame_div_d":"4","first_name_y":"18","char_name_f":"\"Noto Sans JP\", sans-serif","char_main_name_b":"rgb(255, 255, 255)","char_info_c":"0","char_job_icon_span_x":"28","text015_c":"1","copy_black_bg_c":"0","char_name_d":"7","copyright_span_black_x":"3","position_radio_r":"0","char_name_c":"0","text009_c":"0","text008_c":"0","char_message_y":"171","copy_white_bg_c":"0","text013_c":"0","last_name_x":"182","char_favorite_name_b":"rgb(255, 255, 255)","char_race_span_y":"-11","last_name_y":"18","text012_c":"0","white_cambas_h":"540","char_info_b":"rgb(255, 255, 255)","button_up_n":"0","button_minus_n":"0","white_cambas_y":"-547","job_icon_list_color_e":"#ffebee","char_comment_text_t":"まったり楽しんでます(*´∀｀)<br>よろしくおねがします！<br>","white_cambas_w":"481","char_flame_div_c":"0","char_info_d":"0","char_favorite_span_y":"-28","char_server_span_y":"0"}));
localStorage.setItem("layout93", JSON.stringify({"copyright_span_white_x":"3","char_main_job_span_x":"28","freecompany_bg_c":"1","main_job_bg_c":"1","char_main_job_span_y":"1","job_bg_c":"1","text004_c":"0","char_favorite_b":"rgb(136, 14, 79)","select_main_job_p":"paladin ナイト img/jobicon/01/paladin.png","favorite_bg_c":"1","server_bg_c":"1","char_name_s":"35.7px","text006_c":"0","first_name_x":"36","char_comment_b":"rgb(136, 14, 79)","text005_c":"0","char_comment_span_x":"28","char_freecompany_span_y":"-12","text007_c":"0","button_line_minus_n":"0","text010_c":"0","text011_c":"0","char_name_b":"rgb(233, 30, 99)","first_last_name_x":"35","copyright_span_white_y":"527","copyright_span_black_y":"527","race_bg_c":"1","button_left_n":"3","char_comment_name_b":"rgb(236, 64, 122)","char_comment_span_y":"50","char_message_x":"495","text003_c":"0","text014_c":"0","first_last_name_y":"12","char_favorite_span_x":"26","char_race_span_x":"26","text001_c":"1","job_icon_list_color_const_e":"#e91e63","job_icon_list_font_name_f":"\"Hachi Maru Pop\", cursive","white_cambas_x":"-1","comment_bg_c":"1","white_cambas_b":"rgba(248, 187, 208, 0.85)","job_icon_img_d":"2","char_job_icon_span_y":"16","char_freecompany_span_x":"-12","text002_c":"1","char_server_span_x":"-14","char_flame_div_d":"4","first_name_y":"18","char_name_f":"\"Hachi Maru Pop\", cursive","char_main_name_b":"rgb(236, 64, 122)","char_info_c":"1","char_job_icon_span_x":"28","text015_c":"1","copy_black_bg_c":"0","char_name_d":"9","copyright_span_black_x":"3","position_radio_r":"0","char_name_c":"0","text009_c":"0","text008_c":"0","char_message_y":"171","copy_white_bg_c":"0","text013_c":"0","last_name_x":"182","char_favorite_name_b":"rgb(236, 64, 122)","char_race_span_y":"-11","last_name_y":"18","text012_c":"0","white_cambas_h":"540","char_info_b":"rgb(136, 14, 79)","button_up_n":"0","button_minus_n":"0","white_cambas_y":"-547","job_icon_list_color_e":"#ffffff","char_comment_text_t":"まったり楽しんでます(*´∀｀)<br>よろしくおねがします！<br>","white_cambas_w":"481","char_flame_div_c":"0","char_info_d":"4","char_favorite_span_y":"-28","char_server_span_y":"0"}));
localStorage.setItem("layout94", JSON.stringify({"copyright_span_white_x":"3","char_main_job_span_x":"28","freecompany_bg_c":"1","main_job_bg_c":"1","char_main_job_span_y":"1","job_bg_c":"1","text004_c":"0","char_favorite_b":"rgb(1, 87, 155)","select_main_job_p":"paladin ナイト img/jobicon/01/paladin.png","favorite_bg_c":"1","server_bg_c":"1","char_name_s":"35.7px","text006_c":"0","first_name_x":"36","char_comment_b":"rgb(1, 87, 155)","text005_c":"0","char_comment_span_x":"28","char_freecompany_span_y":"-12","text007_c":"0","button_line_minus_n":"0","text010_c":"0","text011_c":"0","char_name_b":"rgb(13, 71, 161)","first_last_name_x":"37","copyright_span_white_y":"527","copyright_span_black_y":"527","race_bg_c":"1","button_left_n":"3","char_comment_name_b":"rgb(2, 136, 209)","char_comment_span_y":"50","char_message_x":"495","text003_c":"0","text014_c":"0","first_last_name_y":"24","char_favorite_span_x":"26","char_race_span_x":"26","text001_c":"1","job_icon_list_color_const_e":"#03a9f4","job_icon_list_font_name_f":"\"Hachi Maru Pop\", cursive","white_cambas_x":"-1","comment_bg_c":"1","white_cambas_b":"rgba(187, 222, 251, 0.85)","job_icon_img_d":"1","char_job_icon_span_y":"16","char_freecompany_span_x":"-12","text002_c":"1","char_server_span_x":"-14","char_flame_div_d":"3","first_name_y":"18","char_name_f":"Righteous, cursive","char_main_name_b":"rgb(2, 136, 209)","char_info_c":"1","char_job_icon_span_x":"28","text015_c":"1","copy_black_bg_c":"0","char_name_d":"9","copyright_span_black_x":"3","position_radio_r":"0","char_name_c":"0","text009_c":"0","text008_c":"0","char_message_y":"171","copy_white_bg_c":"0","text013_c":"0","last_name_x":"182","char_favorite_name_b":"rgb(2, 136, 209)","char_race_span_y":"-11","last_name_y":"18","text012_c":"0","white_cambas_h":"540","char_info_b":"rgb(13, 71, 161)","button_up_n":"0","button_minus_n":"0","white_cambas_y":"-547","job_icon_list_color_e":"#000000","char_comment_text_t":"まったり楽しんでます(*´∀｀)<br>よろしくおねがします！<br>","white_cambas_w":"481","char_flame_div_c":"0","char_info_d":"6","char_favorite_span_y":"-28","char_server_span_y":"0"}));
localStorage.setItem("layout95", JSON.stringify({"copyright_span_white_x":"3","char_main_job_span_x":"460","freecompany_bg_c":"0","main_job_bg_c":"1","char_main_job_span_y":"210","job_bg_c":"1","text004_c":"0","char_favorite_b":"rgb(255, 255, 255)","select_main_job_p":"paladin ナイト img/jobicon/01/paladin.png","favorite_bg_c":"1","server_bg_c":"1","char_name_s":"70.7px","text006_c":"0","first_name_x":"465","char_comment_b":"rgb(255, 255, 255)","text005_c":"0","char_comment_span_x":"47","char_freecompany_span_y":"-19","text007_c":"0","button_line_minus_n":"-7","text010_c":"0","text011_c":"0","char_name_b":"rgb(213, 0, 249)","first_last_name_x":"37","copyright_span_white_y":"527","copyright_span_black_y":"527","race_bg_c":"1","button_left_n":"3","char_comment_name_b":"rgb(255, 255, 255)","char_comment_span_y":"-83","char_message_x":"495","text003_c":"0","text014_c":"0","first_last_name_y":"24","char_favorite_span_x":"43","char_race_span_x":"713","text001_c":"1","job_icon_list_color_const_e":"#03a9f4","job_icon_list_font_name_f":"\"Reggae One\", cursive","white_cambas_x":"42","comment_bg_c":"1","white_cambas_b":"rgba(103, 58, 183, 0.41)","job_icon_img_d":"2","char_job_icon_span_y":"26","char_freecompany_span_x":"-167","text002_c":"1","char_server_span_x":"444","char_flame_div_d":"2","first_name_y":"277","char_name_f":"\"Rock Salt\", cursive","char_main_name_b":"rgb(255, 111, 0)","char_info_c":"1","char_job_icon_span_x":"38","text015_c":"1","copy_black_bg_c":"0","char_name_d":"10","copyright_span_black_x":"3","position_radio_r":"0","char_name_c":"1","text009_c":"0","text008_c":"0","char_message_y":"171","copy_white_bg_c":"0","text013_c":"0","last_name_x":"590","char_favorite_name_b":"rgb(255, 248, 225)","char_race_span_y":"-105","last_name_y":"373","text012_c":"0","white_cambas_h":"195","char_info_b":"rgb(191, 54, 12)","button_up_n":"12","button_minus_n":"5","white_cambas_y":"-501","job_icon_list_color_e":"#bf360c","char_comment_text_t":"まったり楽しんでます(*´∀｀)<br>よろしくおねがします！<br>","white_cambas_w":"353","char_flame_div_c":"0","char_info_d":"7","char_favorite_span_y":"-172","char_server_span_y":"217"}));

  // ストレージの内容を読み込み
  var storage_object = loadStorage();
  function loadStorage(){
    var object = {};
    for(var i = 0 ; i < localStorage.length ; i++) {
      var key = localStorage.key(i);
      if(key.startsWith("layout")){

      }else{
        object[key] = localStorage.getItem(key);
      }
    }
    return object;
  }

// 初期値設定
// デフォルトの設定を画面とストレージに設定
stolageHuck(default_setting);

// ストレージの内容を反映
stolageHuck(storage_object);
 
  
  // ライトメニューの表示セット（ストレージからデータ読み込み）
  function setStolage(object){
    Object.keys(object).forEach(function(key) {
      var last = key.slice(-1);
      switch(last){
        // X座標
        case "x":          
          classkey = key.slice(0,-2);
          $("."+classkey).css("left",object[key]+"px");
          break;
        // Y座標
        case "y":
          classkey = key.slice(0,-2);
          $("."+classkey).css("top",object[key]+"px");
          break;
        
        // 寄せ
        case "r":
          classkey = key.slice(0,-2);
          var v = object[key];
          if(v=="0"){
            $('input[name=position_radio]:eq(0)').prop('checked', true); 
            $(".position_radio_left").prop('disabled', true);
            $(".position_radio_right").prop('disabled', false);
          }else{
            $('input[name=position_radio]:eq(1)').prop('checked', true);
            $(".position_radio_right").prop('disabled', true); 
            $(".position_radio_left").prop('disabled', false);
          }
          break;

        // ジョブアイコン
        case "d":
          classkey = key.slice(0,-2);
          if(classkey == "char_info"){
            $('input[name=char_info_radio]:eq('+object[key]+')').prop('checked', true);
          }else if(classkey == "job_icon_img"){
            $('input[name=job_icon_list]:eq('+object[key]+')').prop('checked', true);
          }else if(classkey == "char_name"){
            $('input[name=char_name_radio]:eq('+object[key]+')').prop('checked', true);
          }else if(classkey == "char_flame_div"){
            $('input[name=flame_radio]:eq('+object[key]+')').prop('checked', true);
          }
          break;

        // サイズ変更
        case "c":
          classkey = key.slice(0,-2);
          if(classkey == "char_name"){
            var v = Number( localStorage.getItem(key));
            if(v){
              $('input[name=name_split]:eq(0)').prop('checked',true); 
            }
          // 太字
          }else if(classkey == "char_info"){
            var v = Number( localStorage.getItem(key));
            if(v){
              $('input[name=font_bold_check]:eq(0)').prop('checked',true); 
            }
          // コンテンツ
          }else if(classkey.startsWith("text")){
            var v = Number( localStorage.getItem(key));
            var num = classkey.slice(-3);
            if(v){
              $('input[class=favorite_contents][name='+num+']').prop('checked',true); 
            }else{
              $('input[class=favorite_contents][name='+num+']').prop('checked',false); 
            }
          // データ表示
          }else if(classkey.match(/bg/)){
            var v = Number( localStorage.getItem(key));
            if(v){
              $("[data="+classkey+"]").prop('checked',true); 
            }else{
              $("[data="+classkey+"]").prop('checked',false);
            }
          // フレーム
          }else if(classkey == "char_flame_div"){
            var v = Number( localStorage.getItem(key));
            if(v){
              $(".char_flame_div").children("img").addClass("display_none");
              $('[name=flame_onoff]').prop('checked',true);
            }else{
              $(".char_flame_div").children("img").removeClass("display_none");
              $('[name=flame_onoff]').prop('checked',false); 

            }
          }
          break;

        // ホワイトキャンパス
        case "h":
          classkey = key.slice(0,-2);
          var v =localStorage.getItem(key);
          $("."+classkey).css("height",v);
          break;

        case "w":
          classkey = key.slice(0,-2);
          var v =localStorage.getItem(key);
          $("."+classkey).css("width",v);
          break;

        // 色
        case "b":
          classkey = key.slice(0,-2);
          // ホワイトキャンバス
          if(classkey == "white_cambas"){
            var v =localStorage.getItem(key);
            $("."+classkey).css("background",v);   
            //　ライトメニューカラー選択         
            var v_split = rgbaSplit(v);
            var v_hex = RGB2Color(v_split[0],v_split[1],v_split[2]);
            $('#colorPicker_white').val(v_hex);
          
          // キャラ名
          }else  if(classkey == "char_name"){
            var v =localStorage.getItem(key);
            $("."+classkey).css("color",v);   

          // 情報
          }else if(classkey == "char_info"){
            var v =localStorage.getItem(key);
            $(".char_main_job").css("color",v);
            $(".char_server").css("color",v);
            $(".char_race").css("color",v);
            $(".char_freecompany").css("color",v);            
          // 情報テキスト
          }else if(classkey == "char_main_name"){
            var v =localStorage.getItem(key);
            $(".char_main_name").css("color",v);
            $(".char_server_name").css("color",v);
            $(".char_race_name").css("color",v);
            $(".char_tribe_name").css("color",v);
            $(".char_freecompany_name").css("color",v);
          // コンテンツ
          }else if(classkey.startsWith("char_favorite")){
            var v =localStorage.getItem(key);
            $("."+classkey).css("color",v);
          // コメント
          }else if(classkey.startsWith("char_comment")){
            var v =localStorage.getItem(key);
            $("."+classkey).css("color",v);
          }
          break;

        case "f":
          // ジョブレベルフォント
          classkey = key.slice(0,-2);
          if(classkey == "job_icon_list_font_name"){
            var v =localStorage.getItem(key);
            $("[class^=job_level]").css("font-family",v);
          }else{
             // キャラ名フォント
            var v =localStorage.getItem(key);
            $("."+classkey).css("font-family",v);
          }
          break;
        
        case "s":
          // キャラ名フォントサイズ
          classkey = key.slice(0,-2);
          var v =localStorage.getItem(key);
          $("."+classkey).css("font-size",v);
          break;

        case "p":
          // ジョブ選択
          var data = localStorage.getItem(key).split(" ");
          $(".select_main_job_name").text(data[1]);
          $(".select_main_job_img_change").attr("src",data[2]);         
          break;
        
        case "t":
          // コメント
          classkey = key.slice(0,-2);
          var v =localStorage.getItem(key);
          var v_split = v.split("<br>");
          var v_split_n="";
          for(var i=0;i<v_split.length;i++){
            v_split_n += v_split[i]+"\n";
          }
          $("#char_comment").text(v_split_n);
          $("."+classkey).html(v);
          break;

        case "e":
          // ジョブレベル色
          var nomal =localStorage.getItem("job_icon_list_color_e");
          var cunst =localStorage.getItem("job_icon_list_color_const_e");
          $('#job_icon_list_color').val(nomal);
          $('#job_icon_list_color_const').val(cunst);
          break;

        default :
          break;
      }

    });

    // テンプレートの初期化と代入


  }

  // データの内容にストレージを上書き
  function saveStolage(object){
    Object.keys(object).forEach(function(key) {
      localStorage.setItem(key,object[key]);
    });
  }

  //データを受け取り、表示とストレージの上書きを行う
  function stolageHuck(object){
    saveStolage(object);
    setStolage(object);    
  }

  // もとに戻す
  $("#default_setting").click(function(){

    if(!confirm('レイアウトを初期化します。\n編集中の内容は失われますがよろしいですか？')){
      /* キャンセルの時の処理 */
      return false;
    }else{
    /*　OKの時の処理 */
    $("#load").removeClass("loaded");

    // 保存したものも削除されるため1つ1つ削除する
    // localStorage.clear();
    localStorage.removeItem('copyright_span_white_x');
    localStorage.removeItem('char_main_job_span_x');
    localStorage.removeItem('freecompany_bg_c');
    localStorage.removeItem('main_job_bg_c');
    localStorage.removeItem('char_main_job_span_y');
    localStorage.removeItem('job_bg_c');
    localStorage.removeItem('text004_c');
    localStorage.removeItem('char_favorite_b');
    localStorage.removeItem('select_main_job_p');
    localStorage.removeItem('favorite_bg_c');
    localStorage.removeItem('server_bg_c');
    localStorage.removeItem('char_name_s');
    localStorage.removeItem('text006_c');
    localStorage.removeItem('first_name_x');
    localStorage.removeItem('char_comment_b');
    localStorage.removeItem('text005_c');
    localStorage.removeItem('char_comment_span_x');
    localStorage.removeItem('char_freecompany_span_y');
    localStorage.removeItem('text007_c');
    localStorage.removeItem('button_line_minus_n');
    localStorage.removeItem('text010_c');
    localStorage.removeItem('text011_c');
    localStorage.removeItem('char_name_b');
    localStorage.removeItem('first_last_name_x');
    localStorage.removeItem('copyright_span_white_y');
    localStorage.removeItem('copyright_span_black_y');
    localStorage.removeItem('race_bg_c');
    localStorage.removeItem('button_left_n');
    localStorage.removeItem('char_comment_name_b');
    localStorage.removeItem('char_comment_span_y');
    localStorage.removeItem('char_message_x');
    localStorage.removeItem('text003_c');
    localStorage.removeItem('text014_c');
    localStorage.removeItem('first_last_name_y');
    localStorage.removeItem('char_favorite_span_x');
    localStorage.removeItem('char_race_span_x');
    localStorage.removeItem('text001_c');
    localStorage.removeItem('job_icon_list_color_const_e');
    localStorage.removeItem('job_icon_list_font_name_f');
    localStorage.removeItem('white_cambas_x');
    localStorage.removeItem('comment_bg_c');
    localStorage.removeItem('white_cambas_b');
    localStorage.removeItem('job_icon_img_d');
    localStorage.removeItem('char_job_icon_span_y');
    localStorage.removeItem('char_freecompany_span_x');
    localStorage.removeItem('text002_c');
    localStorage.removeItem('char_server_span_x');
    localStorage.removeItem('char_flame_div_d');
    localStorage.removeItem('first_name_y');
    localStorage.removeItem('char_name_f');
    localStorage.removeItem('char_main_name_b');
    localStorage.removeItem('char_info_c');
    localStorage.removeItem('char_job_icon_span_x');
    localStorage.removeItem('text015_c');
    localStorage.removeItem('copy_black_bg_c');
    localStorage.removeItem('char_name_d');
    localStorage.removeItem('copyright_span_black_x');
    localStorage.removeItem('position_radio_r');
    localStorage.removeItem('char_name_c');
    localStorage.removeItem('text009_c');
    localStorage.removeItem('text008_c');
    localStorage.removeItem('char_message_y');
    localStorage.removeItem('copy_white_bg_c');
    localStorage.removeItem('text013_c');
    localStorage.removeItem('last_name_x');
    localStorage.removeItem('char_favorite_name_b');
    localStorage.removeItem('char_race_span_y');
    localStorage.removeItem('last_name_y');
    localStorage.removeItem('text012_c');
    localStorage.removeItem('white_cambas_h');
    localStorage.removeItem('char_info_b');
    localStorage.removeItem('button_up_n');
    localStorage.removeItem('button_minus_n');
    localStorage.removeItem('white_cambas_y');
    localStorage.removeItem('job_icon_list_color_e');
    localStorage.removeItem('char_comment_text_t');
    localStorage.removeItem('white_cambas_w');
    localStorage.removeItem('char_flame_div_c');
    localStorage.removeItem('char_info_d');
    localStorage.removeItem('char_favorite_span_y');
    localStorage.removeItem('char_server_span_y');

    location.reload();
    // stolageHuck(default_setting);
    // triggers();
    // // 左にマーク
    // $('input[name=position_radio]:eq(0)').prop('checked', true); 
    // // フリック不可付与
    // $(".position_radio_left").prop('disabled', true); 
    // $(".position_radio_right").prop('disabled', false);    
  }

  });


  // 種族の色判別、変更
  var gender = $(".char_gender").text();
  if(gender == "♂"){
    $(".char_gender").css("color","rgb(56, 109, 255)");
  }

  var nomal =localStorage.getItem("job_icon_list_color_e");
  var cunst =localStorage.getItem("job_icon_list_color_const_e");
  job_color_change(nomal,cunst);
  function job_color_change(nomal,counst){
    if($('.job_level_gladiator').text()=='0'){$('.job_level_gladiator').text('－').css('color',nomal);}else if(Number($('.job_level_gladiator').text())<=9 && Number($('.job_level_gladiator').text())>0){$('.job_level_gladiator').css('left','+=2').css('color',nomal);}else if($('.job_level_paladin').text()=='80'){$('.job_level_paladin').css('color',counst);}else{$('.job_level_paladin,.job_level_gladiator').css('color',nomal);}
    if($('.job_level_marauder').text()=='0'){$('.job_level_marauder').text('－').css('color',nomal);}else if(Number($('.job_level_marauder').text())<=9 && Number($('.job_level_marauder').text())>0){$('.job_level_marauder').css('left','+=2').css('color',nomal);}else if($('.job_level_warrior').text()=='80'){$('.job_level_warrior').css('color',counst);}else{$('.job_level_warrior,.job_level_marauder').css('color',nomal);}
    if($('.job_level_darkknight').text()=='0'){$('.job_level_darkknight').text('－').css('color',nomal);}else if(Number($('.job_level_darkknight').text())<=9 && Number($('.job_level_darkknight').text())>0){$('.job_level_darkknight').css('left','+=2').css('color',nomal);}else if($('.job_level_darkknight').text()=='80'){$('.job_level_darkknight').css('color',counst);}else{$('.job_level_darkknight,.job_level_darkknight').css('color',nomal);}
    if($('.job_level_gunbreaker').text()=='0'){$('.job_level_gunbreaker').text('－').css('color',nomal);}else if(Number($('.job_level_gunbreaker').text())<=9 && Number($('.job_level_gunbreaker').text())>0){$('.job_level_gunbreaker').css('left','+=2').css('color',nomal);}else if($('.job_level_gunbreaker').text()=='80'){$('.job_level_gunbreaker').css('color',counst);}else{$('.job_level_gunbreaker,.job_level_gunbreaker').css('color',nomal);}
    if($('.job_level_pugilist').text()=='0'){$('.job_level_pugilist').text('－').css('color',nomal);}else if(Number($('.job_level_pugilist').text())<=9 && Number($('.job_level_pugilist').text())>0){$('.job_level_pugilist').css('left','+=2').css('color',nomal);}else if($('.job_level_monk').text()=='80'){$('.job_level_monk').css('color',counst);}else{$('.job_level_monk,.job_level_pugilist').css('color',nomal);}
    if($('.job_level_lancer').text()=='0'){$('.job_level_lancer').text('－').css('color',nomal);}else if(Number($('.job_level_lancer').text())<=9 && Number($('.job_level_lancer').text())>0){$('.job_level_lancer').css('left','+=2').css('color',nomal);}else if($('.job_level_dragoon').text()=='80'){$('.job_level_dragoon').css('color',counst);}else{$('.job_level_dragoon,.job_level_lancer').css('color',nomal);}
    if($('.job_level_rogue').text()=='0'){$('.job_level_rogue').text('－').css('color',nomal);}else if(Number($('.job_level_rogue').text())<=9 && Number($('.job_level_rogue').text())>0){$('.job_level_rogue').css('left','+=2').css('color',nomal);}else if($('.job_level_ninja').text()=='80'){$('.job_level_ninja').css('color',counst);}else{$('.job_level_ninja,.job_level_rogue').css('color',nomal);}
    if($('.job_level_samurai').text()=='0'){$('.job_level_samurai').text('－').css('color',nomal);}else if(Number($('.job_level_samurai').text())<=9 && Number($('.job_level_samurai').text())>0){$('.job_level_samurai').css('left','+=2').css('color',nomal);}else if($('.job_level_samurai').text()=='80'){$('.job_level_samurai').css('color',counst);}else{$('.job_level_samurai,.job_level_samurai').css('color',nomal);}
    if($('.job_level_conjurer').text()=='0'){$('.job_level_conjurer').text('－').css('color',nomal);}else if(Number($('.job_level_conjurer').text())<=9 && Number($('.job_level_conjurer').text())>0){$('.job_level_conjurer').css('left','+=2').css('color',nomal);}else if($('.job_level_whitemage').text()=='80'){$('.job_level_whitemage').css('color',counst);}else{$('.job_level_whitemage,.job_level_conjurer').css('color',nomal);}
    if($('.job_level_scholar').text()=='0'){$('.job_level_scholar').text('－').css('color',nomal);}else if(Number($('.job_level_scholar').text())<=9 && Number($('.job_level_scholar').text())>0){$('.job_level_scholar').css('left','+=2').css('color',nomal);}else if($('.job_level_scholar').text()=='80'){$('.job_level_scholar').css('color',counst);}else{$('.job_level_scholar,.job_level_scholar').css('color',nomal);}
    if($('.job_level_astrologian').text()=='0'){$('.job_level_astrologian').text('－').css('color',nomal);}else if(Number($('.job_level_astrologian').text())<=9 && Number($('.job_level_astrologian').text())>0){$('.job_level_astrologian').css('left','+=2').css('color',nomal);}else if($('.job_level_astrologian').text()=='80'){$('.job_level_astrologian').css('color',counst);}else{$('.job_level_astrologian,.job_level_astrologian').css('color',nomal);}
    if($('.job_level_archer').text()=='0'){$('.job_level_archer').text('－').css('color',nomal);}else if(Number($('.job_level_archer').text())<=9 && Number($('.job_level_archer').text())>0){$('.job_level_archer').css('left','+=2').css('color',nomal);}else if($('.job_level_bard').text()=='80'){$('.job_level_bard').css('color',counst);}else{$('.job_level_bard,.job_level_archer').css('color',nomal);}
    if($('.job_level_machinist').text()=='0'){$('.job_level_machinist').text('－').css('color',nomal);}else if(Number($('.job_level_machinist').text())<=9 && Number($('.job_level_machinist').text())>0){$('.job_level_machinist').css('left','+=2').css('color',nomal);}else if($('.job_level_machinist').text()=='80'){$('.job_level_machinist').css('color',counst);}else{$('.job_level_machinist,.job_level_machinist').css('color',nomal);}
    if($('.job_level_dancer').text()=='0'){$('.job_level_dancer').text('－').css('color',nomal);}else if(Number($('.job_level_dancer').text())<=9 && Number($('.job_level_dancer').text())>0){$('.job_level_dancer').css('left','+=2').css('color',nomal);}else if($('.job_level_dancer').text()=='80'){$('.job_level_dancer').css('color',counst);}else{$('.job_level_dancer,.job_level_dancer').css('color',nomal);}
    if($('.job_level_thaumaturge').text()=='0'){$('.job_level_thaumaturge').text('－').css('color',nomal);}else if(Number($('.job_level_thaumaturge').text())<=9 && Number($('.job_level_thaumaturge').text())>0){$('.job_level_thaumaturge').css('left','+=2').css('color',nomal);}else if($('.job_level_blackmage').text()=='80'){$('.job_level_blackmage').css('color',counst);}else{$('.job_level_blackmage,.job_level_thaumaturge').css('color',nomal);}
    if($('.job_level_arcanist').text()=='0'){$('.job_level_arcanist').text('－').css('color',nomal);}else if(Number($('.job_level_arcanist').text())<=9 && Number($('.job_level_arcanist').text())>0){$('.job_level_arcanist').css('left','+=2').css('color',nomal);}else if($('.job_level_summoner').text()=='80'){$('.job_level_summoner').css('color',counst);}else{$('.job_level_summoner,.job_level_arcanist').css('color',nomal);}
    if($('.job_level_redmage').text()=='0'){$('.job_level_redmage').text('－').css('color',nomal);}else if(Number($('.job_level_redmage').text())<=9 && Number($('.job_level_redmage').text())>0){$('.job_level_redmage').css('left','+=2').css('color',nomal);}else if($('.job_level_redmage').text()=='80'){$('.job_level_redmage').css('color',counst);}else{$('.job_level_redmage,.job_level_redmage').css('color',nomal);}
    if($('.job_level_bluemage').text()=='0'){$('.job_level_bluemage').text('－').css('color',nomal);}else if(Number($('.job_level_bluemage').text())<=9 && Number($('.job_level_bluemage').text())>0){$('.job_level_bluemage').css('left','+=2').css('color',nomal);}else if($('.job_level_bluemage').text()=='70'){$('.job_level_bluemage').css('color',counst);}else{$('.job_level_bluemage,.job_level_bluemage').css('color',nomal);}
    if($('.job_level_carpenter').text()=='0'){$('.job_level_carpenter').text('－').css('color',nomal);}else if(Number($('.job_level_carpenter').text())<=9 && Number($('.job_level_carpenter').text())>0){$('.job_level_carpenter').css('left','+=2').css('color',nomal);}else if($('.job_level_carpenter').text()=='80'){$('.job_level_carpenter').css('color',counst);}else{$('.job_level_carpenter,.job_level_carpenter').css('color',nomal);}
    if($('.job_level_blacksmith').text()=='0'){$('.job_level_blacksmith').text('－').css('color',nomal);}else if(Number($('.job_level_blacksmith').text())<=9 && Number($('.job_level_blacksmith').text())>0){$('.job_level_blacksmith').css('left','+=2').css('color',nomal);}else if($('.job_level_blacksmith').text()=='80'){$('.job_level_blacksmith').css('color',counst);}else{$('.job_level_blacksmith,.job_level_blacksmith').css('color',nomal);}
    if($('.job_level_armorer').text()=='0'){$('.job_level_armorer').text('－').css('color',nomal);}else if(Number($('.job_level_armorer').text())<=9 && Number($('.job_level_armorer').text())>0){$('.job_level_armorer').css('left','+=2').css('color',nomal);}else if($('.job_level_armorer').text()=='80'){$('.job_level_armorer').css('color',counst);}else{$('.job_level_armorer,.job_level_armorer').css('color',nomal);}
    if($('.job_level_goldsmith').text()=='0'){$('.job_level_goldsmith').text('－').css('color',nomal);}else if(Number($('.job_level_goldsmith').text())<=9 && Number($('.job_level_goldsmith').text())>0){$('.job_level_goldsmith').css('left','+=2').css('color',nomal);}else if($('.job_level_goldsmith').text()=='80'){$('.job_level_goldsmith').css('color',counst);}else{$('.job_level_goldsmith,.job_level_goldsmith').css('color',nomal);}
    if($('.job_level_leatherworker').text()=='0'){$('.job_level_leatherworker').text('－').css('color',nomal);}else if(Number($('.job_level_leatherworker').text())<=9 && Number($('.job_level_leatherworker').text())>0){$('.job_level_leatherworker').css('left','+=2').css('color',nomal);}else if($('.job_level_leatherworker').text()=='80'){$('.job_level_leatherworker').css('color',counst);}else{$('.job_level_leatherworker,.job_level_leatherworker').css('color',nomal);}
    if($('.job_level_weaver').text()=='0'){$('.job_level_weaver').text('－').css('color',nomal);}else if(Number($('.job_level_weaver').text())<=9 && Number($('.job_level_weaver').text())>0){$('.job_level_weaver').css('left','+=2').css('color',nomal);}else if($('.job_level_weaver').text()=='80'){$('.job_level_weaver').css('color',counst);}else{$('.job_level_weaver,.job_level_weaver').css('color',nomal);}
    if($('.job_level_alchemist').text()=='0'){$('.job_level_alchemist').text('－').css('color',nomal);}else if(Number($('.job_level_alchemist').text())<=9 && Number($('.job_level_alchemist').text())>0){$('.job_level_alchemist').css('left','+=2').css('color',nomal);}else if($('.job_level_alchemist').text()=='80'){$('.job_level_alchemist').css('color',counst);}else{$('.job_level_alchemist,.job_level_alchemist').css('color',nomal);}
    if($('.job_level_culinarian').text()=='0'){$('.job_level_culinarian').text('－').css('color',nomal);}else if(Number($('.job_level_culinarian').text())<=9 && Number($('.job_level_culinarian').text())>0){$('.job_level_culinarian').css('left','+=2').css('color',nomal);}else if($('.job_level_culinarian').text()=='80'){$('.job_level_culinarian').css('color',counst);}else{$('.job_level_culinarian,.job_level_culinarian').css('color',nomal);}
    if($('.job_level_miner').text()=='0'){$('.job_level_miner').text('－').css('color',nomal);}else if(Number($('.job_level_miner').text())<=9 && Number($('.job_level_miner').text())>0){$('.job_level_miner').css('left','+=2').css('color',nomal);}else if($('.job_level_miner').text()=='80'){$('.job_level_miner').css('color',counst);}else{$('.job_level_miner,.job_level_miner').css('color',nomal);}
    if($('.job_level_botanist').text()=='0'){$('.job_level_botanist').text('－').css('color',nomal);}else if(Number($('.job_level_botanist').text())<=9 && Number($('.job_level_botanist').text())>0){$('.job_level_botanist').css('left','+=2').css('color',nomal);}else if($('.job_level_botanist').text()=='80'){$('.job_level_botanist').css('color',counst);}else{$('.job_level_botanist,.job_level_botanist').css('color',nomal);}
    if($('.job_level_fisher').text()=='0'){$('.job_level_fisher').text('－').css('color',nomal);}else if(Number($('.job_level_fisher').text())<=9 && Number($('.job_level_fisher').text())>0){$('.job_level_fisher').css('left','+=2').css('color',nomal);}else if($('.job_level_fisher').text()=='80'){$('.job_level_fisher').css('color',counst);}else{$('.job_level_fisher,.job_level_fisher').css('color',nomal);}
  }

  // 初期値にチェックを入れておく
  // $('input[name=char_name_radio]:eq(7)').prop('checked', true);
  // $('input[name=char_info_radio]:eq(0)').prop('checked', true);
  // $('input[name=job_icon_list]:eq(0)').prop('checked', true);
  // $('input[name=position_radio]:eq(0)').prop('checked', true);  
  // $('input[name=data_display]:eq(0)').prop('checked', true);  
  // $('input[name=data_display]:eq(1)').prop('checked', true);  
  // $('input[name=data_display]:eq(2)').prop('checked', true);  
  // $('input[name=data_display]:eq(3)').prop('checked', true);  
  // $('input[name=data_display]:eq(4)').prop('checked', true);  
  // $('input[name=data_display]:eq(5)').prop('checked', true);
  // $('input[name=data_display]:eq(6)').prop('checked', true);   

  // コンテンツチェックを入れておく
  // $('input[class=favorite_contents]:eq(0)').prop('checked', true);
  // $('input[class=favorite_contents]:eq(1)').prop('checked', true);
  // $('input[class=favorite_contents]:eq(2)').prop('checked', true);



  // 初期画面
  $(".img_button").change(function(e){
      //ファイルオブジェクトを取得する
      var file = e.target.files[0];
      var reader = new FileReader();
   
      //アップロードした画像を設定する
      reader.onload = (function(file){
        return function(e){
          $(".img_preview").attr("src", e.target.result);
          $(".img_preview").attr("title", file.name);
        };
      })(file);
      reader.readAsDataURL(file);     
  });

  // 画像保存
  $("#camvas_button").click(function(){
    // ロード画面出す
    $("#load").removeClass("loaded");

    // テキスト調整
    var name_num = font_fix("fontfix_name");
    var info_num = font_fix("fontfix_info");
    var level_num = font_fix("fontfix_level");
    html2canvas(document.querySelector("#camvas"), {
    
    // 画像調整
    width: 960,
    height: 540
    }).then(canvas => {      
      canvas.toBlob(blob => {
        $("#download").attr("download", `${document.title}.png`).attr("href", window.URL.createObjectURL(blob));
        $('a#download')[0].click();
    });
    });

    font_retun("fontfix_name",name_num);
    font_retun("fontfix_info",info_num);
    font_retun("fontfix_level",level_num);

    // ロード画面消す
    $("#load").delay(5000).queue(function(){
      $(this).addClass("loaded").dequeue();
    });
    
    
  });




  // 保存前の文字位置調整
  function font_fix(fontfix){
    slide_point = font2slide(parseInt($("."+fontfix).css("font-size")),$("."+fontfix).css("font-family"),fontfix);
    // なんか文字が移動しなくなったので入れる
    slide_point = 0.0;
    $("."+fontfix).css("top","-="+slide_point+"px");
    return slide_point;
  }

  function font_retun(fontfix,slide_point){
    $("."+fontfix).css("top","+="+slide_point+"px");
  }

  function font2slide(i,f,fontfix){
    switch(f){
      case 'Alice, serif':
        num = Math.round(i*0.035893754);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 0;
        }
        return num;

      case '"Bungee Inline", cursive':
        num = Math.round(i*0.782483848);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 13;
        }
        return num;

      case '"Elsie Swash Caps", cursive':
        num = Math.round(i*0.043072505);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 0;
        }
        return num;

      case '"IM Fell English", serif':
        num = Math.round(i*0.078966260);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 1;
        }
        return num;

      case 'Kalam, cursive':
        num = Math.round(i*0.208183776);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 4;
        }
        return num;

      case '"Leckerli One", cursive':
        num = Math.round(i*0.093323762);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 1;
        }
        return num;

      case 'Metamorphous, cursive':
        num = Math.round(i*0.064608758);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 0;
        }
        return num;      

      case '"Noto Sans JP", sans-serif':
        num = Math.round(i*0.165111271);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num;  

      case 'Nunito, sans-serif':
        num = Math.round(i*0.100502513);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 1;
        }
        return num;  

      case 'Righteous, cursive':
        num = Math.round(i*0.064608758);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 0;
        }
        return num;  

      case '"Rock Salt", cursive':
        console.log("kitayo");
        num = Math.round(i*0.545585068);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 7;
        }
        return num; 

      case 'Sacramento, cursive':
        num = Math.round(i*0.172290022);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }
        return num;       

      case '"Sorts Mill Goudy", serif':
        num = Math.round(i*0.150753769);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }
        return num;

      case '"Sawarabi Mincho", sans-serif':
        num = Math.round(i*0.165111271);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 

      case '"Kosugi Maru", sans-serif':
        num = Math.round(i*0.000000000);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= -1;
        }else if(fontfix == "fontfix_info"){
          num -= -1;
        }
        return num; 

      case '"Potta One", cursive':
        num = Math.round(i*0.172290022);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 3;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 

      case '"Hachi Maru Pop", cursive':
        num = Math.round(i*0.165111271);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 

      case '"Yusei Magic", sans-serif':
        num = Math.round(i*0.172290022);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 

      case '"RocknRoll One", sans-serif':
        num = Math.round(i*0.172290022);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 

      case '"Reggae One", cursive':
        num = Math.round(i*0.165111271);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 

      case 'Stick, sans-serif':
        num = Math.round(i*0.172290022);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 

      case 'DotGothic16, sans-serif':
        num = Math.round(i*0.172290022);
        // 調整値
        if(fontfix == "fontfix_level"){
          num -= 2;
        }else if(fontfix == "fontfix_info"){
          num -= 1;
        }
        return num; 
      
    }
  }


  // 基本
  // データ位置
  $("[name=position_radio]").click(function(){
    if($('input[name=position_radio]:eq(0)').prop('checked')){
      $('input[name=position_radio]:eq(0)').prop('checked', true);
      $(".position").css("left","-=460px");
      $(".position_bg").css("left","-=480px");
      var object = positionStorageLeft();
      saveStolage(object);
      $(".position_radio_left").prop('disabled', true);
      $(".position_radio_right").prop('disabled', false);
      var key = $(this).attr('name').split(" ")[0];
      localStorage.setItem(key+"_r", 0);

    }else if($('input[name=position_radio]:eq(1)').prop('checked')){
      $('input[name=position_radio]:eq(1)').prop('checked', true);
      $(".position").css("left","+=460px");
      $(".position_bg").css("left","+=480px");
      var object = positionStorageRight();
      saveStolage(object);
      $(".position_radio_left").prop('disabled', false);
      $(".position_radio_right").prop('disabled', true);
      var key = $(this).attr('name').split(" ")[0];
      localStorage.setItem(key+"_r", 1);
    }
  });

  // ストレージの内容を書き換え
  function positionStorageRight(){
    var object = {};
    for(var i = 0 ; i < localStorage.length ; i++) {
      var key = localStorage.key(i);
      var last = key.slice(-1);
      if(last == "y"){
      }else if(key.startsWith("layout")){
      }else if(key.startsWith("white_cambas_x")){
        object[key] = Number(localStorage.getItem(key))+480;
      }else if(last == "x"){
        object[key] = Number(localStorage.getItem(key))+460;
      }else{

      }
    }
    return object;
  }

  function positionStorageLeft(){
    var object = {};
    for(var i = 0 ; i < localStorage.length ; i++) {
      var key = localStorage.key(i);
      var last = key.slice(-1);
      if(last == "y"){
      }else if(key.startsWith("layout")){
      }else if(key.startsWith("white_cambas_x")){
        object[key] =Number( localStorage.getItem(key))-480;
      }else if(last == "x"){
        object[key] =Number( localStorage.getItem(key))-460;
      }else{

      }
    }
    return object;
  }

  // 表示
  $("[name=data_display]").click(function(){
    var e = $(this).prop("checked");
    var v = $(this).attr("data");
    if(e){
      $('.'+v).removeClass("display_none");
      $('.'+v+"_h").removeClass("display_none");
      localStorage.setItem(v+"_c", 1);
    }else{
      $('.'+v).addClass("display_none");
      $('.'+v+"_h").addClass("display_none");
      localStorage.setItem(v+"_c", 0); 
    }
  });
  

  // 背景色基本
   // 色
   $('#colorPicker_white').on('change', function(e){
    // 選択した色の情報を取得
    var color = e.detail[0];
    $(this).val(color);
    // rgbにして1つ1つのデータで解析
    var color_rgb = hex2rgb(color); 
    // 透明度を取得
    num = $("#transparent_value_white").text();
    $(".white_cambas").css("background","rgba("+color_rgb[0]+","+color_rgb[1]+","+color_rgb[2]+","+num*0.01+")");      
    $("#colorPicker_color_white").html(color);
    // ストレージ保存
    var key = "white_cambas"
    var v = $(".white_cambas").css("background-color");
    localStorage.setItem(key+"_b", v);
  });

  // 透明度
  $("#transparent_value2_white").slider({
    max:100, //最大値
    min: 0, //最小値
    value: 40, //初期値
    step: 1, //幅
 
    // スライドしたとき
    slide: function( event, ui ) {
      $("#transparent_value_white").html(ui.value);
      var num = $(this).slider( "value" );
      // 調整
      if(num <= 1 ){
        $(".white_cambas").css("display","none");
        num = 0;
      }else if(num >= 99 ){
        $(".white_cambas").css("display","block");
        num = 100;
      }else{
        $(".white_cambas").css("display","block");
      }
      // 現在の色を取得
      var name_color = $(".white_cambas").css("background");
      // rgbの1つ1つの色を解析し、透明度をプラスして表示
      rgb = rgb2hex(name_color);
      $(".white_cambas").css("background","rgba("+rgb[1]+","+rgb[2]+","+rgb[3]+","+num*0.01+")");
    
      // ストレージ保存
      var key = "white_cambas"
      var v = $(".white_cambas").css("background-color");
      localStorage.setItem(key+"_b", v);
    
    },
    create: function( event, ui ) {
      $("#transparent_value_white").html($(this).slider( "value" ));
    },
    change: function( event, ui ) {
      $("#transparent_value_white").html(ui.value);
    }

  });

  // サイズを変更する
  $("[name=white_cambas]").click(function(){
    var e = $(this).prop("checked");
    if(e){
      $(".white_cambas").draggable( "enable" );
      $(".white_cambas").resizable( "enable" );
      $(".white_cambas").css( "z-index","5" );
    }else{
      $(".white_cambas").draggable( "disable" );
      $(".white_cambas").resizable( "disable" );
      $(".white_cambas").css( "z-index","" );
    }
  });


  // フレーム
  // フレームを消す
  $("[name=flame_onoff]").click(function(){
    var e = $(this).prop("checked");
    if(e){
      $(".char_flame_div").children("img").addClass("display_none");
      // ストレージ保存
      var key = "char_flame_div"
      var v = 1;
      localStorage.setItem(key+"_c", v);
    }else{
      $(".char_flame_div").children("img").removeClass("display_none");
      // ストレージ保存
      var key = "char_flame_div"
      var v = 0;
      localStorage.setItem(key+"_c", v);

    }
  });

  // フレーム選択
  $("[name=flame_radio]").click(function(){
    if($('input[name=flame_radio]:eq(0)').prop('checked')){
       $('input[name=flame_radio]:eq(0)').prop('checked', true);
       $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+1+".png");
        // ストレージ保存
      localStorage.setItem("char_flame_div"+"_d",0);

    }else if($('input[name=flame_radio]:eq(1)').prop('checked')){
      $('input[name=flame_radio]:eq(1)').prop('checked', true);
      $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+2+".png");
      localStorage.setItem("char_flame_div"+"_d",1);

    }else if($('input[name=flame_radio]:eq(2)').prop('checked')){
      $('input[name=flame_radio]:eq(2)').prop('checked', true);
      $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+3+".png");
      localStorage.setItem("char_flame_div"+"_d",2);

    }else if($('input[name=flame_radio]:eq(3)').prop('checked')){
      $('input[name=flame_radio]:eq(3)').prop('checked', true);
      $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+4+".png");
      localStorage.setItem("char_flame_div"+"_d",3);

    }else if($('input[name=flame_radio]:eq(4)').prop('checked')){
      $('input[name=flame_radio]:eq(4)').prop('checked', true);
      $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+5+".png");
      localStorage.setItem("char_flame_div"+"_d",4);

    }else if($('input[name=flame_radio]:eq(5)').prop('checked')){
      $('input[name=flame_radio]:eq(5)').prop('checked', true);
      $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+6+".png");
      localStorage.setItem("char_flame_div"+"_d",5);

    }else if($('input[name=flame_radio]:eq(6)').prop('checked')){
      $('input[name=flame_radio]:eq(6)').prop('checked', true);
      $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+7+".png");
      localStorage.setItem("char_flame_div"+"_d",6);

    }else if($('input[name=flame_radio]:eq(7)').prop('checked')){
      $('input[name=flame_radio]:eq(7)').prop('checked', true);
      $(".char_flame_div").children("img").attr("src","/img/flame/flame00"+8+".png");
      localStorage.setItem("char_flame_div"+"_d",7);

    }         
  });


  // キャラ名
  // フォント
  $("[name=char_name_radio]").click(function(){
    if($('input[name=char_name_radio]:eq(0)').prop('checked')){
       $('input[name=char_name_radio]:eq(0)').prop('checked', true);
       $(".char_name").css("font-family","'Alice', serif");
        // ストレージ保存
       localStorage.setItem("char_name"+"_d",0);

    }else if($('input[name=char_name_radio]:eq(1)').prop('checked')){
      $('input[name=char_name_radio]:eq(1)').prop('checked', true);
      $(".char_name").css("font-family","'Bungee Inline', cursive");
      localStorage.setItem("char_name"+"_d",1);

    }else if($('input[name=char_name_radio]:eq(2)').prop('checked')){
      $('input[name=char_name_radio]:eq(2)').prop('checked', true);
      $(".char_name").css("font-family","'Elsie Swash Caps', cursive");
      localStorage.setItem("char_name"+"_d",2);

    }else if($('input[name=char_name_radio]:eq(3)').prop('checked')){
      $('input[name=char_name_radio]:eq(3)').prop('checked', true);
      $(".char_name").css("font-family","'IM Fell English', serif");
      localStorage.setItem("char_name"+"_d",3);

    }else if($('input[name=char_name_radio]:eq(4)').prop('checked')){
      $('input[name=char_name_radio]:eq(4)').prop('checked', true);
      $(".char_name").css("font-family","'Kalam', cursive");
      localStorage.setItem("char_name"+"_d",4);

    }else if($('input[name=char_name_radio]:eq(5)').prop('checked')){
      $('input[name=char_name_radio]:eq(5)').prop('checked', true);
      $(".char_name").css("font-family","'Leckerli One', cursive");
      localStorage.setItem("char_name"+"_d",5);

    }else if($('input[name=char_name_radio]:eq(6)').prop('checked')){
      $('input[name=char_name_radio]:eq(6)').prop('checked', true);
      $(".char_name").css("font-family","'Metamorphous', cursive");
      localStorage.setItem("char_name"+"_d",6);

    }else if($('input[name=char_name_radio]:eq(7)').prop('checked')){
      $('input[name=char_name_radio]:eq(7)').prop('checked', true);
      $(".char_name").css("font-family","'Noto Sans JP', sans-serif");
      localStorage.setItem("char_name"+"_d",7);

    }else if($('input[name=char_name_radio]:eq(8)').prop('checked')){
      $('input[name=char_name_radio]:eq(8)').prop('checked', true);
      $(".char_name").css("font-family","'Nunito', sans-serif");
      localStorage.setItem("char_name"+"_d",8);

    }else if($('input[name=char_name_radio]:eq(9)').prop('checked')){
      $('input[name=char_name_radio]:eq(9)').prop('checked', true);
      $(".char_name").css("font-family","'Righteous', cursive");
      localStorage.setItem("char_name"+"_d",9);

    }else if($('input[name=char_name_radio]:eq(10)').prop('checked')){
      $('input[name=char_name_radio]:eq(10)').prop('checked', true);
      $(".char_name").css("font-family","'Rock Salt', cursive");
      localStorage.setItem("char_name"+"_d",10);

    }else if($('input[name=char_name_radio]:eq(11)').prop('checked')){
      $('input[name=char_name_radio]:eq(11)').prop('checked', true);
      $(".char_name").css("font-family","'Sacramento', cursive");
      localStorage.setItem("char_name"+"_d",11);

    }else if($('input[name=char_name_radio]:eq(12)').prop('checked')){
      $('input[name=char_name_radio]:eq(12)').prop('checked', true);
      $(".char_name").css("font-family","'Sorts Mill Goudy', serif");
      localStorage.setItem("char_name"+"_d",12);

    }

    // ストレージ保存
    var v = $(".char_name").css("font-family");
    localStorage.setItem("char_name"+"_f",v);
    
  });

  // 大きさ
  $("#wkSlider2").slider({
    max:200, //最大値
    min: 0, //最小値
    value: 50, //初期値
    step: 1, //幅
 
    slide: function( event, ui ) {
      $("#wkValue").html(ui.value);
      num = $(this).slider( "value" )/50;
      $(".char_name").css("font-size",35*num+"px")
    },
    create: function( event, ui ) {
      $("#wkValue").html($(this).slider( "value" ));
    },
    change: function( event, ui ) {
      $("#wkValue").html(ui.value);            
      // ストレージ保存
      var v = $(".char_name").css("font-size");
      localStorage.setItem("char_name"+"_s",v);
    } 
  });

  // 色
  $('#colorPicker').on('change', function(e){
    // 選択した色の情報を取得
    var color = e.detail[0];
    $(this).val(color);
    // rgbにして1つ1つのデータで解析
    var color_rgb = hex2rgb(color); 
    // 透明度を取得
    num = $("#transparent_value").text();
    $(".char_name").css("color","rgba("+color_rgb[0]+","+color_rgb[1]+","+color_rgb[2]+","+num*0.01+")");      
    $("#colorPicker_color").html(color);

    // ストレージ保存
    var key = "char_name";
    var v = $(".char_name").css("color");
    localStorage.setItem(key+"_b", v);
  });

  // 透明度
  $("#transparent_value2").slider({
    max:100, //最大値
    min: 0, //最小値
    value: 100, //初期値
    step: 1, //幅
 
    // スライドしたとき
    slide: function( event, ui ) {
      $("#transparent_value").html(ui.value);
      var num = $(this).slider( "value" );
      // 現在の色を取得
      var name_color = $(".char_name").css("color");
      // rgbの1つ1つの色を解析し、透明度をプラスして表示
      rgb = rgb2hex(name_color);
      $(".char_name").css("color","rgba("+rgb[1]+","+rgb[2]+","+rgb[3]+","+num*0.01+")");
    },
    create: function( event, ui ) {
      $("#transparent_value").html($(this).slider( "value" ));
    },
    change: function( event, ui ) {
      $("#transparent_value").html(ui.value);
      // ストレージ保存
      var key = "char_name";
      var v = $(".char_name").css("color");
      localStorage.setItem(key+"_b", v);
    }

  });

  // 名前分割
  $("[name=name_split]").click(function(){
    var e = $(this).prop("checked");
    if(e){
      $(".first_last_name").addClass("display_none");
      $(".first_name").removeClass("display_none");
      $(".last_name").removeClass("display_none");
      // ストレージ保存
      var key = "char_name";
      localStorage.setItem(key+"_c", 1);
    }else{
      $(".first_last_name").removeClass("display_none");
      $(".first_name").addClass("display_none");
      $(".last_name").addClass("display_none");
      // ストレージ保存
      var key = "char_name";
      localStorage.setItem(key+"_c", 0);
    }
  });


  // hex to rgb
  function hex2rgb ( hex ) {
    if ( hex.slice(0, 1) == "#" ) hex = hex.slice(1) ;
    if ( hex.length == 3 ) hex = hex.slice(0,1) + hex.slice(0,1) + hex.slice(1,2) + hex.slice(1,2) + hex.slice(2,3) + hex.slice(2,3) ;
    return [ hex.slice( 0, 2 ), hex.slice( 2, 4 ), hex.slice( 4, 6 ) ].map( function ( str ) {
    return parseInt( str, 16 ) ;
    } ) ;
  }
  // rgb to hex 
  function rgb2hex(orig){
    var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return rgb;
   }

  // rgba split
  function rgbaSplit(rgba){
    var num = rgba.split("(")[1].split(")")[0];
    num = num.split(",");
    return num;
  }

  // RGB2Color
  function RGB2Color(r,g,b)
  {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }
  
  function byte2Hex (n)
  {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

//キャラ情
// メインジョブ
$('.select_job_tank').hover(
  function() {
    $(this).addClass("job_color_tank");
    $(this).addClass("figure");
  },
  function() {
    $(this).removeClass("job_color_tank");
    $(this).removeClass("figure");
  }
);
$('.select_job_healer').hover(
  function() {
    $(this).addClass("job_color_healer");
    $(this).addClass("figure");
  },
  function() {
    $(this).removeClass("job_color_healer");
    $(this).removeClass("figure");
  }
);
$('.select_job_dps').hover(
  function() {
    $(this).addClass("job_color_dps");
    $(this).addClass("figure");
  },
  function() {
    $(this).removeClass("job_color_dps");
    $(this).removeClass("figure");
  }
);
$('.select_job_crafter').hover(
  function() {
    $(this).addClass("job_color_crafter");
    $(this).addClass("figure");
  },
  function() {
    $(this).removeClass("job_color_crafter");
    $(this).removeClass("figure");
  }
);
$('.select_job_gatherer').hover(
  function() {
    $(this).addClass("job_color_gatherer");
    $(this).addClass("figure");
  },
  function() {
    $(this).removeClass("job_color_gatherer");
    $(this).removeClass("figure");
  }
);

// プルダウンジョブを選んだ際に起こるアクション
$('li[class^="select_job_"]').click(function(){
  var job_name = $(this).text();
  var name = $(this).attr("name");
  $(".select_main_job_name").text(job_name);
  $(".char_main_name").text(job_name);
  $(".select_main_job_img_change").attr("src",'/img/jobicon/01/'+name+'.png');
  $(".char_main_job_icon_img").attr("src",'/img/jobicon/mainjob/'+name+'.png');
  
  var url = $(".select_main_job_img_change").attr("src");

  // ストレージの保存
  localStorage.setItem("select_main_job"+"_p", name+" "+job_name+" "+url); 

});



// プルダウンの表示と非表示
$(document).click(function(event) {
  if($(event.target).closest('.select_main_job').length) {
    $(".main_job_select_font").removeClass("display_none");
    $(".select_main_job_plus").text("－");
  }else{
    $(".main_job_select_font").addClass("display_none");
    $(".select_main_job_plus").text("+");   
  }
});


// フォント
$("[name=char_info_radio]").click(function(){
  if($('input[name=char_info_radio]:eq(0)').prop('checked')){
     $('input[name=char_info_radio]:eq(0)').prop('checked', true);
     $(".char_info").css("font-family","'Noto Sans JP', sans-serif");
    //  ストレージ保存
     localStorage.setItem("char_info"+"_d", 0);
  }else if($('input[name=char_info_radio]:eq(1)').prop('checked')){
    $('input[name=char_info_radio]:eq(1)').prop('checked', true);
    $(".char_info").css("font-family","'Sawarabi Mincho', sans-serif");
    localStorage.setItem("char_info"+"_d", 1);
  }else if($('input[name=char_info_radio]:eq(2)').prop('checked')){
    $('input[name=char_info_radio]:eq(2)').prop('checked', true);
    $(".char_info").css("font-family","'Kosugi Maru', sans-serif");
    localStorage.setItem("char_info"+"_d", 2);
  }else if($('input[name=char_info_radio]:eq(3)').prop('checked')){
    $('input[name=char_info_radio]:eq(3)').prop('checked', true);
    $(".char_info").css("font-family","'Potta One', cursive");
    localStorage.setItem("char_info"+"_d", 3);
  }else if($('input[name=char_info_radio]:eq(4)').prop('checked')){
    $('input[name=char_info_radio]:eq(4)').prop('checked', true);
    $(".char_info").css("font-family","'Hachi Maru Pop', cursive")
    localStorage.setItem("char_info"+"_d", 4);
  }else if($('input[name=char_info_radio]:eq(5)').prop('checked')){
    $('input[name=char_info_radio]:eq(5)').prop('checked', true);
    $(".char_info").css("font-family","'Yusei Magic', sans-serif");
    localStorage.setItem("char_info"+"_d", 5);
  }else if($('input[name=char_info_radio]:eq(6)').prop('checked')){
    $('input[name=char_info_radio]:eq(6)').prop('checked', true);
    $(".char_info").css("font-family","'RocknRoll One', sans-serif");
    localStorage.setItem("char_info"+"_d", 6);
  }else if($('input[name=char_info_radio]:eq(7)').prop('checked')){
    $('input[name=char_info_radio]:eq(7)').prop('checked', true);
    $(".char_info").css("font-family","'Reggae One', cursive");
    localStorage.setItem("char_info"+"_d", 7);
  }else if($('input[name=char_info_radio]:eq(8)').prop('checked')){
    $('input[name=char_info_radio]:eq(8)').prop('checked', true);
    $(".char_info").css("font-family","'Stick', sans-serif");
    localStorage.setItem("char_info"+"_d", 8);
  }else if($('input[name=char_info_radio]:eq(9)').prop('checked')){
    $('input[name=char_info_radio]:eq(9)').prop('checked', true);
    $(".char_info").css("font-family","'DotGothic16', sans-serif");
    localStorage.setItem("char_info"+"_d", 9);
    // 本来これ以下はない
  }else if($('input[name=char_info_radio]:eq(10)').prop('checked')){
    $('input[name=char_info_radio]:eq(10)').prop('checked', true);
    $(".char_info").css("font-family","'Rock Salt', cursive");
    localStorage.setItem("char_info"+"_d", 10);
  }else if($('input[name=char_info_radio]:eq(11)').prop('checked')){
    $('input[name=char_info_radio]:eq(11)').prop('checked', true);
    $(".char_info").css("font-family","'Sacramento', cursive");
    localStorage.setItem("char_info"+"_d", 11);
  }else if($('input[name=char_info_radio]:eq(12)').prop('checked')){
    $('input[name=char_info_radio]:eq(12)').prop('checked', true);
    $(".char_info").css("font-family","'Sorts Mill Goudy', serif");
    localStorage.setItem("char_info"+"_d", 12);
  }
  
});

// 太字にする
$("[name=font_bold_check]").click(function(){
  var e = $(this).prop("checked");
  if(e){
    $(".char_info").css("font-weight","bold");
    // ストレージ保存
    localStorage.setItem("char_info"+"_c", 1);

  }else{
    $(".char_info").css("font-weight","");
    localStorage.setItem("char_info"+"_c", 0);

  }
});


// キャラ名にも情報のフォントを適応
$(".char_info_font_toname").click(function(){
  var font = $(".char_info").css("font-family");
  $(".char_name").css("font-family",font);
  
  // ストレージ保存  
  var v = $(".char_name").css("font-family");  
  localStorage.setItem("char_name"+"_f",v);

});

// 見出し色 キャラ情報
$('#char_info_h').on('change', function(e){
  // 選択した色の情報を取得
  var color = e.detail[0];
  $(this).val(color);
  $(".char_main_job").css("color",color);
  $(".char_server").css("color",color);
  $(".char_race").css("color",color);
  $(".char_freecompany").css("color",color);     
  $("#char_info_h_span").html(color);

  // ストレージ保存
  var key = "char_info";
  var v = $(".char_info").css("color");
  localStorage.setItem(key+"_b", v);

});

// テキスト色
$('#char_text_h').on('change', function(e){
  // 選択した色の情報を取得
  var color = e.detail[0];
  $(this).val(color);
  $(".char_main_name").css("color",color);
  $(".char_server_name").css("color",color);
  $(".char_race_name").css("color",color);
  $(".char_tribe_name").css("color",color);
  $(".char_freecompany_name").css("color",color);       
  $("#char_text_h_span").html(color);

  // ストレージ保存
  var key = "char_main_name";
  var v = $(".char_main_name").css("color");
  localStorage.setItem(key+"_b", v);

});

// コンテンツ
// コンテンツ選択
$("[class=favorite_contents]").change(function(){
  // チェックオンオフ取得
  var favorite_check = $(this).prop('checked');
  // 要素取得
    var name = $(this).attr("name");
    var text = $(this).val();
    var img = $(this).next().attr('src');
    var key = name;
  if(favorite_check){
    var favorite_html = '<span name="text'+name+'" class="char_info fontfix_info"><img src="'+img+'" alt="">'+text+'</span>'
    // 要素追加
    $(".char_favorite_name").append(favorite_html);
    // ストレージ保存
    localStorage.setItem("text"+key+"_c", 1);
  }else{
    // 要素削除
    $('[name=text'+name+']').remove();
    localStorage.setItem("text"+key+"_c", 0);
  }
});

// 見出し色
$('#char_favorite_h').on('change', function(e){
  // 選択した色の情報を取得
  var color = e.detail[0];
  $(this).val(color);
  $(".char_favorite").css("color",color);
  $("#char_favorite_h_span").html(color);

  // ストレージ保存
  var key = "char_favorite";
  var v = $(".char_favorite").css("color");
  localStorage.setItem(key+"_b", v);

});

// テキスト色
$('#char_favorite_text_h').on('change', function(e){
  // 選択した色の情報を取得
  var color = e.detail[0];
  $(this).val(color);
  $(".char_favorite_name").css("color",color);
  $("#char_favorite_text_h_span").html(color);

    // ストレージ保存
    var key = "char_favorite_name";
    var v = $(".char_favorite_name").css("color");
    localStorage.setItem(key+"_b", v);

});


// コメント
// テキストエリア
$("#char_comment").change(function(){
  var view_comment = "";
  var text = $(this).val();
  var split=text.split(/\r\n|\r|\n/);
  split.forEach(function(data){
  view_comment += data+"<br>"
  });
  $(".char_comment_text").html(view_comment);
  var v = view_comment;
  var key = "char_comment_text"
  localStorage.setItem(key+"_t", v);

});

// 見出し
$('#char_comment_h').on('change', function(e){
  // 選択した色の情報を取得
  var color = e.detail[0];
  $(this).val(color);
  $(".char_comment").css("color",color);
  $("#char_comment_h_span").html(color);

  // ストレージ保存
  var key = "char_comment";
  var v = $(".char_comment").css("color");
  localStorage.setItem(key+"_b", v);

});
// テキスト
$('#char_comment_text_h').on('change', function(e){
  // 選択した色の情報を取得
  var color = e.detail[0];
  $(this).val(color);
  $(".char_comment_name").css("color",color);
  $("#char_comment_text_h_span").html(color);

  // ストレージ保存
  var key = "char_comment_name";
  var v = $(".char_comment_name").css("color");
  localStorage.setItem(key+"_b", v);
});




// ジョブアイコン
$("[name=job_icon_list]").click(function(){
  if($('input[name=job_icon_list]:eq(0)').prop('checked')){
     $('input[name=job_icon_list]:eq(0)').prop('checked', true);
     $("[class^=job_icon_img_]").each(function(job){
       var job_icon_value = $(this).attr("value");
        $(this).attr("src",'/img/jobicon/01/'+job_icon_value+'.png');
        // ストレージ保存
        var key = "job_icon_img"
        localStorage.setItem(key+"_d",0);
     });

  }else if($('input[name=job_icon_list]:eq(1)').prop('checked')){
    $('input[name=job_icon_list]:eq(1)').prop('checked', true);
    $("[class^=job_icon_img_]").each(function(job){
      var job_icon_value = $(this).attr("value");
       $(this).attr("src",'/img/jobicon/02/'+job_icon_value+'.png');
       var key = "job_icon_img"
       localStorage.setItem(key+"_d",1);
    });

  }else if($('input[name=job_icon_list]:eq(2)').prop('checked')){
    $('input[name=job_icon_list]:eq(2)').prop('checked', true);
    $("[class^=job_icon_img_]").each(function(job){
      var job_icon_value = $(this).attr("value");
       $(this).attr("src",'/img/jobicon/03/'+job_icon_value+'.png');
       var key = "job_icon_img"
       localStorage.setItem(key+"_d",2);
    });

  }else if($('input[name=job_icon_list]:eq(3)').prop('checked')){
    $('input[name=job_icon_list]:eq(3)').prop('checked', true);
    $("[class^=job_icon_img_]").each(function(job){
      var job_icon_value = $(this).attr("value");
       $(this).attr("src",'/img/jobicon/04/'+job_icon_value+'.png');
       var key = "job_icon_img"
       localStorage.setItem(key+"_d",3);
    });
  }
  
});

// ジョブアイコンレベルフォント
$(".job_icon_list_font_name").click(function(){
  var char_name_font = $(".char_name").css("font-family");
  $("[class^=job_level_]").css("font-family",char_name_font);
  // ストレージ保存
  var v = $("[class^=job_level_]").css("font-family");
  var key = "job_icon_list_font_name"
  localStorage.setItem(key+"_f", v);
});

$(".job_icon_list_font_info").click(function(){
  var char_name_font = $(".char_freecompany_name").css("font-family");
  $("[class^=job_level_]").css("font-family",char_name_font);
  var v = $("[class^=job_level_]").css("font-family");
  var key = "job_icon_list_font_name"
  localStorage.setItem(key+"_f", v);
});


// 位置調整
$(".button_up").click(function(){
  $("[class^=job_level_]").css("top","-=1px");
  // ストレイージ保存
  var key = $(this).attr('class').split(" ")[0];
  var v =Number(localStorage.getItem(key+"_n")) + 1;
  localStorage.setItem(key+"_n", v);
});
$(".button_down").click(function(){
  $("[class^=job_level_]").css("top","+=1px");
  var key = "button_up";
  var v =Number(localStorage.getItem(key+"_n")) - 1;
  localStorage.setItem(key+"_n", v);
});
$(".button_left").click(function(){
  $("[class^=job_level_]").css("left","-=1px");
  // ストレイージ保存
  var key = $(this).attr('class').split(" ")[0];
  var v =Number(localStorage.getItem(key+"_n")) + 1;
  localStorage.setItem(key+"_n", v);
});
$(".button_rigth").click(function(){
  $("[class^=job_level_]").css("left","+=1px");
  var key = "button_left";
  var v =Number(localStorage.getItem(key+"_n")) - 1;
  localStorage.setItem(key+"_n", v);
});
// 大きさ
$(".button_minus").click(function(){
  if(localStorage.getItem("button_minus_n")>-6){
    $("[class^=job_level_]").css("font-size","-=1px");
    var key = $(this).attr('class').split(" ")[0];
    var v =Number(localStorage.getItem(key+"_n")) - 1;
    localStorage.setItem(key+"_n", v);
  }
});
$(".button_puls").click(function(){
  $("[class^=job_level_]").css("font-size","+=1px");
  var key = "button_minus";
  var v =Number(localStorage.getItem(key+"_n")) + 1;
  localStorage.setItem(key+"_n", v); 
});

// 行間
$(".button_line_minus").click(function(){
  $("[class^=job_icon_img_]:eq(0)").css("top","+=1px");  
  $("[class^=job_level_]:eq(0)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(1)").css("top","+=1px");  
  $("[class^=job_level_]:eq(1)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(2)").css("top","+=1px");  
  $("[class^=job_level_]:eq(2)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(3)").css("top","+=1px");  
  $("[class^=job_level_]:eq(3)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(8)").css("top","+=1px");  
  $("[class^=job_level_]:eq(8)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(9)").css("top","+=1px");  
  $("[class^=job_level_]:eq(9)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(10)").css("top","+=1px");  
  $("[class^=job_level_]:eq(10)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(18)").css("top","-=1px");  
  $("[class^=job_level_]:eq(18)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(19)").css("top","-=1px");  
  $("[class^=job_level_]:eq(19)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(20)").css("top","-=1px");  
  $("[class^=job_level_]:eq(20)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(21)").css("top","-=1px");  
  $("[class^=job_level_]:eq(21)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(22)").css("top","-=1px");  
  $("[class^=job_level_]:eq(22)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(23)").css("top","-=1px");  
  $("[class^=job_level_]:eq(23)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(24)").css("top","-=1px");  
  $("[class^=job_level_]:eq(24)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(25)").css("top","-=1px");  
  $("[class^=job_level_]:eq(25)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(26)").css("top","-=1px");  
  $("[class^=job_level_]:eq(26)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(27)").css("top","-=1px");  
  $("[class^=job_level_]:eq(27)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(28)").css("top","-=1px");  
  $("[class^=job_level_]:eq(28)").css("top","-=1px");
  // ストレージ保存
  var key = $(this).attr('class').split(" ")[0];
  var v =Number(localStorage.getItem(key+"_n")) - 1;
  localStorage.setItem(key+"_n", v);

});
$(".button_line_puls").click(function(){
  $("[class^=job_icon_img_]:eq(0)").css("top","-=1px");  
  $("[class^=job_level_]:eq(0)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(1)").css("top","-=1px");  
  $("[class^=job_level_]:eq(1)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(2)").css("top","-=1px");  
  $("[class^=job_level_]:eq(2)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(3)").css("top","-=1px");  
  $("[class^=job_level_]:eq(3)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(8)").css("top","-=1px");  
  $("[class^=job_level_]:eq(8)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(9)").css("top","-=1px");  
  $("[class^=job_level_]:eq(9)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(10)").css("top","-=1px");  
  $("[class^=job_level_]:eq(10)").css("top","-=1px");
  $("[class^=job_icon_img_]:eq(18)").css("top","+=1px");  
  $("[class^=job_level_]:eq(18)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(19)").css("top","+=1px");  
  $("[class^=job_level_]:eq(19)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(20)").css("top","+=1px");  
  $("[class^=job_level_]:eq(20)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(21)").css("top","+=1px"); 
  $("[class^=job_level_]:eq(21)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(22)").css("top","+=1px");
  $("[class^=job_level_]:eq(22)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(23)").css("top","+=1px");  
  $("[class^=job_level_]:eq(23)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(24)").css("top","+=1px");  
  $("[class^=job_level_]:eq(24)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(25)").css("top","+=1px");  
  $("[class^=job_level_]:eq(25)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(26)").css("top","+=1px");  
  $("[class^=job_level_]:eq(26)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(27)").css("top","+=1px");  
  $("[class^=job_level_]:eq(27)").css("top","+=1px");
  $("[class^=job_icon_img_]:eq(28)").css("top","+=1px");  
  $("[class^=job_level_]:eq(28)").css("top","+=1px");
  var key = "button_line_minus";
  var v =Number(localStorage.getItem(key+"_n")) + 1;
  localStorage.setItem(key+"_n", v);
});


// ジョブレベル色
$('#job_icon_list_color').on('change', function(e){
  // 選択した色の情報を取得
  var nomal_color = e.detail[0];
  // チェックを入れる
  $(this).val(nomal_color);
  // 文字表記
  $("#job_icon_list_color_const_span").text(nomal_color);
  cunst = $('#job_icon_list_color_const').val();
  nomal = $('#job_icon_list_color').val();
  // 色を変える
  job_color_change(nomal,cunst);
  // ストレージ保存
  var key = "job_icon_list_color";
  localStorage.setItem(key+"_const_e", cunst);
  localStorage.setItem(key+"_e", nomal);  
});

$('#job_icon_list_color_const').on('change', function(e){
  // 選択した色の情報を取得
  var cunst_color = e.detail[0];
  $(this).val(cunst_color);
  $("#job_icon_list_color_span").html(cunst_color);
  cunst = $('#job_icon_list_color_const').val();
  nomal = $('#job_icon_list_color').val();
  job_color_change(nomal,cunst);
  var key = "job_icon_list_color";
  localStorage.setItem(key+"_const_e", cunst);
  localStorage.setItem(key+"_e", nomal);  
});


// ドラッグ要素付与
$(".dragg").draggable({
    stop: function(e, ui) {
      // ドラッグしたらストレージに位置を保存
      var key = $(this).attr('class').split(" ")[0];
      localStorage.setItem(key+"_x", ui.position.left);
      localStorage.setItem(key+"_y", ui.position.top);
      // // 寄せを使えなくする
      // $("input[name=position_radio]").prop('disabled', true);

    }
});

// 初期値設定
$(".white_cambas").draggable( "disable" );

// リサイズ要素付与
$(".resize").resizable({
  minHeight:10,
  minWidth:10,
  maxWidth:960,
  maxHeight:560,
  stop: function(e, ui) {
    var key = $(this).attr('class').split(" ")[0];
    localStorage.setItem(key+"_w", ui.size.width);
    localStorage.setItem(key+"_h", ui.size.height);
  }

});
$(".white_cambas").resizable( "disable" );


// 枠線
// 汎用
$("[class=mhover_bg]").hover(
  function(){
    var v = $(this).attr("data");
    var str = v.split(" ");
    str.forEach(v => {
      $("."+v).addClass("mouse_hover_bg");
      $("."+v+"_h").addClass("mouse_hover_bg");
    });
  },
  function(){
    var v = $(this).attr("data");
    var str = v.split(" ");
    str.forEach(v => {
      $("."+v).removeClass("mouse_hover_bg");
      $("."+v+"_h").removeClass("mouse_hover_bg");
    });
  },
);

// テキストだけ
$("[class=mhover_bg_text]").hover(
  function(){
    var v = $(this).attr("data");
    var str = v.split(" ");
    str.forEach(v => {
      $("."+v).addClass("mouse_hover_bg");
    });
  },
  function(){
    var v = $(this).attr("data");
    var str = v.split(" ");
    str.forEach(v => {
      $("."+v).removeClass("mouse_hover_bg");
    });
  },
);

// 現在のレイアウトをストレージへ保存
$(".save_layout").click(function(){
  var layout_text = $(this).val();
  if(!confirm('現在のレイアウトを保存します。\n'+layout_text+'の内容は上書きされますがよろしいですか？')){
    /* キャンセルの時の処理 */
    return false;
  }else{
    /* OKの時の処理 */
    var layout = $(this).attr("name");
    object = JSON.stringify(loadStorage());
    localStorage.removeItem(layout);
    localStorage.setItem(layout,object);
    $(this).next().next().text("保存しました");
  }
});


// 保存してあるレイアウトを反映
$(".reflect_layout").click(function(){
  var layout_text = $(this).attr("lavel");
  if(!confirm(layout_text+'を反映させます。\n編集中の内容は失われますがよろしいですか？')){
    /* キャンセルの時の処理 */
    return false;
  }else{
    /*　OKの時の処理 */
   // 　ストレージのレイアウトを読み込む
    $("#load").removeClass("loaded");
    var layout = $(this).attr("name");
    object = JSON.parse(localStorage.getItem(layout));
    
    if(object == null){
      $(this).next().text("保存されているデータがありません");
      $("#load").addClass("loaded");
    }else{
      // ストレージの内容にハック
      stolageHuck(object);
      // 念の為リロード
      location.reload();
      // triggers();
      $(this).next().text("反映中・・・");
    }
  }
});

// トリガー実行
triggers();
function triggers(){

// 各種トリガー実行
// $('li[class^=select_job_][name="warrior"]').trigger('click');

// ジョブアイコン
var v = localStorage.getItem("job_icon_img_d");  
$('[name=job_icon_list]:eq('+v+')').trigger('click');

// キャラ名を分割(クリックトリガーうまく発動しないので、こちらで)
var v =  Number( localStorage.getItem("char_name_c"));
if(v){
  $(".first_last_name").addClass("display_none");
  $(".first_name").removeClass("display_none");
  $(".last_name").removeClass("display_none");
}

// 太字
var v =  Number( localStorage.getItem("char_info_c"));
if(v){
  $(".char_info").css("font-weight","bold");
}

// コンテンツ
$(".char_favorite_name").empty();
for(var i=1 ; i<=15 ;i++ ){  
  var v =  Number( localStorage.getItem("text00"+i+"_c"));
  var vv =  Number( localStorage.getItem("text0"+i+"_c"));
  if(v){
    $('.favorite_contents[name="00'+i+'"]').trigger('click');
    $('.favorite_contents[name="00'+i+'"]').trigger('click');
  }else if(vv){
    $('.favorite_contents[name="0'+i+'"]').trigger('click');
    $('.favorite_contents[name="0'+i+'"]').trigger('click');
  }
}

// 情報フォント
var v = localStorage.getItem("char_info_d");  
$('[name=char_info_radio]:eq('+v+')').trigger('click');


// データ表示
// データの配列
var targets = ["main_job_bg","server_bg","race_bg","freecompany_bg","favorite_bg","comment_bg","job_bg","copy_white_bg","copy_black_bg",];

// displaynoneを付与
targets.forEach(function(target){
  var v =  Number( localStorage.getItem(target+"_c"));
  if(v){
    $('.'+target).removeClass("display_none");
    $('.'+target+"_h").removeClass("display_none");
  }else{
    $('.'+target).addClass("display_none");
    $('.'+target+"_h").addClass("display_none");
  }
});

// メインジョブ選択
var data = localStorage.getItem("select_main_job_p").split(" ");
$('li[class^=select_job_][name='+data[0]+']').trigger('click');

// ジョブレベル色変更
var nomal =localStorage.getItem("job_icon_list_color_e");
var cunst =localStorage.getItem("job_icon_list_color_const_e");
job_color_change(nomal,cunst);

// 背景透明度バー
var v =localStorage.getItem("white_cambas_b");
var v_split = rgbaSplit(v);
var v_parse = v_split[3]*100+"%";
if(v_parse == "NaN%"){
  v_parse = "100%";
}
$("#transparent_value2_white").children('span').css("left",v_parse);
$("#transparent_value_white").text(Math.floor(v_parse.slice(0,-1)));

// キャラ名大きさバー
var v =localStorage.getItem("char_name_s");
v = v.slice(0,-2);
v_parse = Math.round(v/140*100)+"%";
$("#wkSlider2").children('span').css("left",v_parse);
$("#wkValue").text(Math.floor(v_parse.slice(0,-1))*2);

// キャラ名透明度バー
var v =localStorage.getItem("char_name_b");
var v_split = rgbaSplit(v);
var v_parse = v_split[3]*100+"%";
if(v_parse == "NaN%"){
  v_parse = "100%";
}
$("#transparent_value2").children('span').css("left",v_parse);
$("#transparent_value").text(Math.floor(v_parse.slice(0,-1)));

// 微調整
var button_up =localStorage.getItem("button_up_n");
var button_left =localStorage.getItem("button_left_n");
var button_minus =localStorage.getItem("button_minus_n");
var button_line_minus =localStorage.getItem("button_line_minus_n");

// 位置
if(button_up>0){
  for(var i=0;i<button_up;i++){
    $(".button_up").trigger('click');
  }
  localStorage.setItem("button_up_n",button_up);
}else{
  button_down =  button_up*(-1);
  for(var i=0;i<button_down;i++){
    $(".button_down").trigger('click');
  }
  localStorage.setItem("button_up_n",button_up);
}
// 位置
if(button_left>0){
  for(var i=0;i<button_left;i++){
    $(".button_left").trigger('click');
  }
  localStorage.setItem("button_left_n",button_left);
}else{
  button_rigth =  button_left*(-1);
  for(var i=0;i<button_rigth;i++){
    $(".button_rigth").trigger('click');
  }
  localStorage.setItem("button_left_n",button_left);
}

// 大きさ
if(button_minus>0){
  for(var i=0;i<button_minus;i++){
    $(".button_puls").trigger('click');
  }
  localStorage.setItem("button_minus_n",button_minus);
}else{
  localStorage.setItem("button_minus_n",0);
  button_puls =  button_minus*(-1);
  for(var i=0;i<button_puls;i++){
    $(".button_minus").trigger('click');
  }
}

// 行間
if(button_line_minus>0){
  for(var i=0;i<button_line_minus;i++){
    $(".button_line_puls").trigger('click');
  }
  localStorage.setItem("button_line_minus_n",button_line_minus);
}else{
  button_line_puls =  button_line_minus*(-1);
  for(var i=0;i<button_line_puls;i++){
    $(".button_line_minus").trigger('click');
  }
  localStorage.setItem("button_line_minus_n",button_line_minus);
}

// 情報フォント
var v = localStorage.getItem("char_flame_div_d");  
$('[name=flame_radio]:eq('+v+')').trigger('click');



}
// トリガーここまで





});

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">
    <title>FF14キャラクターカード|Final Fantasy Xiv Character card generator</title>

    <!-- jqueryUI -->
    
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    

    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/tab.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/sunny/jquery-ui.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
    <script src="/js/tab.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/imageview.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/material-design-inspired-color-picker@1.7.2/dist/md-color-picker.min.js"></script> 
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
    <!-- <script src="{{asset('/js/coffee_cookie.js') }}"></script> -->
    
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-J8RKSP7S6W"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-J8RKSP7S6W');
    </script>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4147546043750345"crossorigin="anonymous">
    </script>


</head>

<body>
<!-- ローディング画面 -->
<div id="load">
　<div>L</div>
  <div>O</div>
  <div>A</div>
  <div>D</div>
  <div>I</div>
  <div>N</div>
  <div>G</div>
</div>

<div id="dragArea">


<!-- ヘッダー -->
<div class="header_div_generate">
    <div class="title_div">
        <a href="{{route('index')}}"><img class="header_generate" src="/img/header_bg3.png" alt=""></a>
    </div>
</div>

<!-- メイン部分 -->
<div class="main_generate_div">

    <!-- レフトメニュー -->
    <div class="left_menu">
        <p></p>
    </div>


<div class="contents">


    <div class="ccard_div">
    <div id=camvas>
        <span class="main_image" id="js-getVariable" data-name={{$save_dir}}></span>
        <canvas id="myCanvas" width="960" height="540"></canvas>
        <!-- <img class="ccard_preview" src="{{$save_dir}}" alt=""> -->
        <div class="white_cambas back_img_bg position_bg dragg resize"></div>
        <!-- <div class="white_cambas back_img_bg position_bg dragg resize display_none"></div> -->

        <!-- <img class="white_cambas" src="/img/white_cambas.png" alt=""> -->


        <!-- キャラ名 -->
        <div class="char_name_div">
            <span class="first_last_name char_name dragg position first_last_name char_name_bg fontfix_name">{{$char_name}}</span>
            <span class="first_name char_name dragg position display_none char_name_bg fontfix_name" >{{$char_first_name}}</span>
            <span class="last_name char_name dragg position display_none char_name_bg fontfix_name" >{{$char_last_name}}</span>
        </div>
        <!-- メインジョブ -->
        <div class="char_main_job_span dragg position">
            <span class="char_main_job char_info main_job_bg_h fontfix_info">メインジョブ</span>
            <span class="char_main_job_icon"><img class="char_main_job_icon_img main_job_bg" src="/img/jobicon/mainjob/paladin.png" alt=""></span>
            <span class="char_main_name char_info main_job_bg fontfix_info">ナイト</span>
        </div>

        <!-- サーバー -->
        <div class="char_server_span dragg position">
            <span class="char_server char_info server_bg_h fontfix_info">サーバー</span>
            <span class="char_server_name char_info server_bg fontfix_info">{{$char_server}}({{$char_world}})</span>
        </div>

        <!-- 種族 -->
        <div class="char_race_span dragg position">
            <span class="char_race char_info race_bg_h fontfix_info">種族/性別</span>
            <span class="char_race_name char_info race_bg fontfix_info">{{$char_race}}<span class="char_gender race_bg fontfix_info">{{$char_gender}}</span></span>
            <span class="char_tribe_name char_info race_bg fontfix_info">({{$char_tribe}})</span>
        </div>

        <!-- フリーカンパニー -->
        <div class="char_freecompany_span dragg position">
            <span class="char_freecompany char_info freecompany_bg_h fontfix_info">フリーカンパニー</span>
            <span class="char_freecompany_name char_info freecompany_bg fontfix_info">{{$char_freecompany}}</span>
        </div>


        <!-- 好きなこと --> 
        <div class="char_favorite_span dragg position">       
        <div class="char_favorite_div">
            <span class="char_favorite char_info favorite_bg_h fontfix_info">お気に入りコンテンツ</span>
            <span class="char_favorite_name favorite_bg">
                <span name=text001 class="char_info"><img src="/img/faveriteicon/faverite001.png" alt="">レベリング・</span>
                <span name=text015 class="char_info"><img src="/img/faveriteicon/faverite015.png" alt="">メインストーリー・</span>
                <span name=text002 class="char_info"><img src="/img/faveriteicon/faverite002.png" alt="">クラフター・</span>
            </span>
        </div>
        </div>

        <!-- コメント -->
        <div class="char_comment_span dragg position"> 
        <div class="char_comment_div">
            <span class="char_comment char_info comment_bg_h fontfix_info">コメント</span>
            <span class="char_comment_name comment_bg char_info fontfix_info">
                <span class="char_comment_text">まったり楽しんでます(*´∀｀)<br>よろしくおねがいします！<br></span>
            </span>
        </div>
        </div>
        
       
        <!-- ジョブアイコン -->
        <div class="char_job_icon_span dragg position">  
        <div class="char_job_icon_div">
            @foreach($job_levels as $job_level)
                <img class="job_icon_img_{{$job_level['icn']}} job_bg_h" value={{$job_level['icn']}} src="/img/jobicon/01/{{$job_level['icn']}}.png" alt="">
            @endforeach

            @foreach($job_levels as $job_level)
                <span class="job_level_{{$job_level['icn']}} job_bg fontfix_level">{{$job_level['level']}}</span>            
            @endforeach
        </div>
        </div>

        <!-- フレーム -->
        <div class="char_flame">  
        <div class="char_flame_div">
            <img src="/img/flame/flame005.png" alt="">
        </div>
        </div>

        <!-- 保存ボタン -->
        <!-- <div class="save_img">
            <button id="camvas_button">保存</button>
            <a id="download" href=""></a>
        </div> -->



        <div class="save_img">
            <div class="btn-shine" id="camvas_button">Save Image</div>
            <a id="download" href=""></a>
        </div>

        <div class="twitter-share_div">
            <!-- Twitterボタン -->
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="https://ff14-app.com/" data-text="キャラクターカード更新しました！" data-via="" data-size="default" data-related="" data-count="" data-hashtags="FF14 #キャラクターカード #キャラカ #フレンド募集">Tweet</a> 
        </div>


        <!-- コピーライト -->
        <span class="copyright_span_white display_none  copy_white_bg dragg position">(C) SQUARE ENIX CO., LTD. All Rights Reserved.</span>        
        <span class="copyright_span_black display_none  copy_black_bg dragg position">(C) SQUARE ENIX CO., LTD. All Rights Reserved.</span>        



        
        <!-- アチーブメント -->
        <!-- <div class="achievements_div">
            <span  class="achievements_title achievements_span">-Achievements-</span>
        @foreach($char_achievements as $char_achievement)
            <span class="achievements_span">{{$char_achievement["title"]}}<img src="img\achievements\{{$char_achievement['ID']}}.png" alt=""></span>
        @endforeach
        </div> -->          
    
    </div>
    </div>

</div>
<!-- コンテンツココまで -->


<!-- ライトメニュー -->
<div class="rigth_menu">
<div id='container'>   
    
<!-- コメント -->
<div class='widget'>
<div id='使い方' class="tab-content">
    <h2>【使い方】</h2>
    <div class="howto_text">
        <p>①テンプレートを選択</p>
        <p>②「基本」以下のタブで編集！</p>
        <p>②【SAVE IMAGE】ボタンで画像を保存</p>
        <p>③Twitterボタンでつぶやく！</p>
        <p>※画像内ドラッグ＆ドロップで位置を調整できます</p>
    </div>
    <div class="howto_movie">
        <h2>【動画】</h2>
        <p>~準備中~</p>
    </div>
    <div class="howto_movie">
        <h2>【テンプレート】</h2>

        <div class="template_div">
            <table class="template_table">
                <tr class="template_img">
                    <td><img name="layout91" lavel="Usual"  class="reflect_layout"  src="/img/template/template1.png" alt=""><p>Usual</p></td>
                    <td><img name="layout92" lavel="Darkness"  class="reflect_layout"  src="/img/template/template2.png" alt=""><p>Darkness</p></td>
                    <td></td>                    
                </tr>
            
                <tr class="template_img">
                    <td><img name="layout93" lavel="Cute"  class="reflect_layout"  src="/img/template/template3.png" alt=""><p>Cute</p></td>
                    <td><img name="layout94" lavel="Cool"  class="reflect_layout"  src="/img/template/template4.png" alt=""><p>Cool</p></td>
                    <td><img name="layout95" lavel="Rock"  class="reflect_layout" src="/img/template/template5.png" alt=""><p>Rock</p></td>
                </tr>         
            </table>   
        </div>

    </div>
</div>
</div>

<div class='widget'>
  <div id='基本' class="tab-content">

<button id="default_setting">全て元に戻す</button>
<span class="slyder_attention">(レイアウトが崩れた場合はこのボタンで初期化してください)</span>
  <!-- 位置 -->
  
    <h2>【データ位置】</h2>
    <div class="menu_indent">
        <input type="radio" class="position_radio_left" name="position_radio" value="left">左寄せ
        <input type="radio" class="position_radio_right" name="position_radio" value="rigth">右寄せ
    </div>

    <h2>【データ表示】</h2>
    <div class="menu_indent">
        <input class="mhover_bg" type="checkbox" name="data_display" data="main_job_bg"><span class="mhover_bg" name="data_display" data="main_job_bg">メインジョブ</span>
        <input class="mhover_bg" type="checkbox" name="data_display" data="server_bg"><span class="mhover_bg" name="data_display" data="server_bg">サーバー</span>
        <input class="mhover_bg" type="checkbox" name="data_display" data="race_bg"><span class="mhover_bg" name="data_display" data="race_bg">種族</span>
        <input class="mhover_bg" type="checkbox" name="data_display" data="freecompany_bg"><span class="mhover_bg" name="data_display" data="freecompany_bg">FC</span><br>
        <input class="mhover_bg" type="checkbox" name="data_display" data="favorite_bg"><span class="mhover_bg" name="data_display" data="favorite_bg">コンテンツ</span>
        <input class="mhover_bg" type="checkbox" name="data_display" data="comment_bg"><span class="mhover_bg" name="data_display" data="comment_bg">コメント</span>
        <input class="mhover_bg" type="checkbox" name="data_display" data="job_bg"><span class="mhover_bg" name="data_display" data="job_bg">ジョブレベル</span><br>
        <input class="mhover_bg" type="checkbox" name="data_display" data="copy_white_bg"><span class="mhover_bg" name="data_display" data="copy_white_bg">コピーライト(白)</span>
        <input class="mhover_bg" type="checkbox" name="data_display" data="copy_black_bg"><span class="mhover_bg" name="data_display" data="copy_black_bg">コピーライト(黒)</span>
    </div>

    <!-- 色変更 -->
    <h2 class="mhover_bg" data="back_img_bg">【背景色】</h2>
        <!-- <span id="colorPicker_color_white"></span> -->
    <div class="menu_indent">    
        <input type="checkbox" name="white_cambas">サイズを変更する
        <span class="slyder_attention">※右下のつまみで調整できます</span>    
        <span class="char_name_fontsize_span_white">
        <md-color-picker id="colorPicker_white" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
        </span>
    </div>

    <!-- 透明度変更 -->
    <h2>【背景透明度】<span id="transparent_value_white"></span></h2>
    <div class="char_name_transparent_value_span_white">
        <div id="transparent_value2_white"></div>
        <p class="slyder_attention">※ゆっくり動かしてね！</p>        
    </div>
    


    <h2>
        <span class="mhover_bg" data="flame_bg">【フレーム】</span>
    </h2>

    <!-- フレームを消す -->
    <div class="menu_indent">  
        <input type="checkbox" name="flame_onoff">フレームを消す
        <span class="flame_span">
            <p class="flame_p">
                <input type="radio" name="flame_radio" value="001"><img class="flame_s" src="/img/flame/flame_s/flame001.png" alt="">
                <input type="radio" name="flame_radio" value="002"><img class="flame_s" src="/img/flame/flame_s/flame002.png" alt="">
                <input type="radio" name="flame_radio" value="003"><img class="flame_s" src="/img/flame/flame_s/flame003.png" alt="">
                <input type="radio" name="flame_radio" value="004"><img class="flame_s" src="/img/flame/flame_s/flame004.png" alt="">
            </p>
            <p class="flame_p">
                <input type="radio" name="flame_radio" value="005"><img class="flame_s" src="/img/flame/flame_s/flame005.png" alt="">
                <input type="radio" name="flame_radio" value="006"><img class="flame_s" src="/img/flame/flame_s/flame006.png" alt="">
                <input type="radio" name="flame_radio" value="007"><img class="flame_s" src="/img/flame/flame_s/flame007.png" alt="">
                <input type="radio" name="flame_radio" value="008"><img class="flame_s" src="/img/flame/flame_s/flame008.png" alt="">
            </p>
        </span>
    </div>



  </div>
</div>



<div class='widget'>
  <div id='キャラ名' class="tab-content" data="char_name_bg">
    <!-- キャラ名 -->
    <!-- フォント変更 -->
    <h2 class="mhover_bg" data="char_name_bg">【フォント】</h2>
    <div class="menu_indent">  
        <span class="char_name_font_span">
            <p class="char_name_font_p">
                <input type="radio" name="char_name_radio" value="Alice"><span class="Alice">Alice</span>
                <input type="radio" name="char_name_radio" value="Bungee"><span class="Bungee">Bungee</span>
                <input type="radio" name="char_name_radio" value="Elsie"><span class="Elsie">Elsie</span>
                <input type="radio" name="char_name_radio" value="IMFell"><span class="IMFell">IMFell</span>
                <input type="radio" name="char_name_radio" value="Kalam"><span class="Kalam">Kalam</span>
            </p>
            <p class="char_name_font_p">
                <input type="radio" name="char_name_radio" value="Leckerli"><span class="Leckerli">Leckerli</span>
                <input type="radio" name="char_name_radio" value="Metamorphous"><span class="Metamorphous">Metamo</span>
                <input type="radio" name="char_name_radio" value="Noto"><span class="Noto">Noto</span>
                <input type="radio" name="char_name_radio" value="Nunito"><span class="Nunito">Nunito</span>
                <input type="radio" name="char_name_radio" value="Righteous"><span class="Righteous">Right</span>
            </p>
            <p class="char_name_font_p">
                <input type="radio" name="char_name_radio" value="Rock"><span class="Rock">Rock</span>
                <input type="radio" name="char_name_radio" value="Sacramento"><span class="Sacramento">Sacrame</span>
                <input type="radio" name="char_name_radio" value="Sorts"><span class="Sorts">Sorts</span>
            </p>
        </span>
    </div>


    <!-- 大きさ変更 -->
    <h2>
        <p class="mhover_bg" data="char_name_bg">【大きさ】<span id="wkValue"></span></p>
    </h2>
    <div class="char_name_fontsize_span">
        <div id="wkSlider2"></div>
    </div>


    <!-- 色変更 -->
    <h2>
        <p class="mhover_bg" data="char_name_bg">【キャラ名の色】</p>
    </h2>
    <div class="char_name_fontcolor_span">
        <md-color-picker id="colorPicker" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
    </div>


    <!-- 透明度変更 -->
    <h2>
        <p class="mhover_bg" data="char_name_bg">【透明度】<span id="transparent_value"></span></p>
        <span class="char_name_transparent_value_span"></span>
    </h2>
    <div class="char_name_fonta">
        <div id="transparent_value2"></div>
    </div>
    

    <!-- 名前分割 -->
    <h2>【キャラ名分割】</h2>
    <div class="menu_indent">  
        <input type="checkbox" name="name_split">キャラ名を分割する
    </div>

</div>
</div>


<div class='widget'>
  <div id='情報' class="tab-content">

  <!-- メインジョブ -->
    <h2 class="mhover_bg" data="main_job_bg">【メインジョブ】</h2>
    <div class="main_job_select_div">
        <ul class="main_job_select_ul">   
    		<li>
                <div class="select_main_job">
                    <img class="select_main_job_img select_main_job_img_change" src="/img/jobicon/01/paladin.png" alt="">
                    <plus class="select_main_job_name">ナイト</plus>
                    <plus class="select_main_job_plus">+</plus></div>

    			<ul class="main_job_select_ul main_job_select_font display_none">
                    <li>-TANK-</li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>
    				<li class="select_job_tank" name="paladin"><img class="select_main_job_img" src="/img/jobicon/01/paladin.png" alt=""><plus class="select_main_job_name_li">ナイト</plus></li>
    				<li class="select_job_tank" name="warrior"><img class="select_main_job_img" src="/img/jobicon/01/warrior.png" alt=""><plus class="select_main_job_name_li">戦士</plus></li>
                    <li class="select_job_tank" name="darkknight"><img class="select_main_job_img" src="/img/jobicon/01/darkknight.png" alt=""><plus class="select_main_job_name_li">暗黒騎士</plus></li>
                    <li class="select_job_tank" name="gunbreaker"><img class="select_main_job_img" src="/img/jobicon/01/gunbreaker.png" alt=""><plus class="select_main_job_name_li">ガンブレイカー</plus></li>
                    <li>-HEALER-</li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>                    
                    <li class="select_job_healer" name="whitemage"><img class="select_main_job_img" src="/img/jobicon/01/whitemage.png" alt=""><plus class="select_main_job_name_li">白魔道士</plus></li>
                    <li class="select_job_healer" name="scholar"><img class="select_main_job_img" src="/img/jobicon/01/scholar.png" alt=""><plus class="select_main_job_name_li">学者</plus></li>
                    <li class="select_job_healer" name="astrologian"><img class="select_main_job_img" src="/img/jobicon/01/astrologian.png" alt=""><plus class="select_main_job_name_li">占星術士</plus></li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>
                    <li>-DPS-</li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>
                    <li class="select_job_dps" name="monk"><img class="select_main_job_img" src="/img/jobicon/01/monk.png" alt=""><plus class="select_main_job_name_li">モンク</plus></li>
                    <li class="select_job_dps" name="dragoon"><img class="select_main_job_img" src="/img/jobicon/01/dragoon.png" alt=""><plus class="select_main_job_name_li">竜騎士</plus></li>
                    <li class="select_job_dps" name="ninja"><img class="select_main_job_img" src="/img/jobicon/01/ninja.png" alt=""><plus class="select_main_job_name_li">忍者</plus></li>
                    <li class="select_job_dps" name="samurai"><img class="select_main_job_img" src="/img/jobicon/01/samurai.png" alt=""><plus class="select_main_job_name_li">侍</plus></li>
                    <li class="select_job_dps" name="bard"><img class="select_main_job_img" src="/img/jobicon/01/bard.png" alt=""><plus class="select_main_job_name_li">吟遊詩人</plus></li>
                    <li class="select_job_dps" name="machinist"><img class="select_main_job_img" src="/img/jobicon/01/machinist.png" alt=""><plus class="select_main_job_name_li">機工士</plus></li>
                    <li class="select_job_dps" name="dancer"><img class="select_main_job_img" src="/img/jobicon/01/dancer.png" alt=""><plus class="select_main_job_name_li">踊り子</plus></li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>
                    <li class="select_job_dps" name="blackmage"><img class="select_main_job_img" src="/img/jobicon/01/blackmage.png" alt=""><plus class="select_main_job_name_li">黒魔道士</plus></li>
                    <li class="select_job_dps" name="summoner"><img class="select_main_job_img" src="/img/jobicon/01/summoner.png" alt=""><plus class="select_main_job_name_li">召喚士</plus></li>
                    <li class="select_job_dps" name="redmage"><img class="select_main_job_img" src="/img/jobicon/01/redmage.png" alt=""><plus class="select_main_job_name_li">赤魔道士</plus></li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>
                    <!-- <li class="select_job_dps" name="bluemage"><img class="select_main_job_img" src="/img/jobicon/01/bluemage.png" alt=""><plus class="select_main_job_name_li">青魔道士</plus></li> -->
                    <li>-CRAFTER-</li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>
                    <li class="select_job_crafter" name="carpenter"><img class="select_main_job_img" src="/img/jobicon/01/carpenter.png" alt=""><plus class="select_main_job_name_li">木工師</plus></li>
                    <li class="select_job_crafter" name="blacksmith"><img class="select_main_job_img" src="/img/jobicon/01/blacksmith.png" alt=""><plus class="select_main_job_name_li">鍛冶師</plus></li>
                    <li class="select_job_crafter" name="armorer"><img class="select_main_job_img" src="/img/jobicon/01/armorer.png" alt=""><plus class="select_main_job_name_li">甲冑師</plus></li>
                    <li class="select_job_crafter" name="goldsmith"><img class="select_main_job_img" src="/img/jobicon/01/goldsmith.png" alt=""><plus class="select_main_job_name_li">彫金師</plus></li>
    				<li class="select_job_crafter" name="leatherworker"><img class="select_main_job_img" src="/img/jobicon/01/leatherworker.png" alt=""><plus class="select_main_job_name_li">革細工師</plus></li>
    				<li class="select_job_crafter" name="weaver"><img class="select_main_job_img" src="/img/jobicon/01/weaver.png" alt=""><plus class="select_main_job_name_li">裁縫師</plus></li>
    				<li class="select_job_crafter" name="alchemist"><img class="select_main_job_img" src="/img/jobicon/01/alchemist.png" alt=""><plus class="select_main_job_name_li">錬金術師</plus></li>
    				<li class="select_job_crafter" name="culinarian"><img class="select_main_job_img" src="/img/jobicon/01/culinarian.png" alt=""><plus class="select_main_job_name_li">調理師</plus></li>
                    <li>-GATHERER-</li>
                    <li><img class="select_main_job_img" src="/img/jobicon/01/1dot.png" alt=""><plus class="select_main_job_name_li"></plus></li>
    				<li class="select_job_gatherer" name="miner"><img class="select_main_job_img" src="/img/jobicon/01/miner.png" alt=""><plus class="select_main_job_name_li">採掘師</plus></li>
                    <li class="select_job_gatherer" name="botanist"><img class="select_main_job_img" src="/img/jobicon/01/botanist.png" alt=""><plus class="select_main_job_name_li">園芸師</plus></li>
                    <li class="select_job_gatherer" name="fisher"><img class="select_main_job_img" src="/img/jobicon/01/fisher.png" alt=""><plus class="select_main_job_name_li">釣師</plus></li>

    			</ul>

    		</li>		
    	</ul>
    </div>

    <!-- <select  class="main_job_select" name="main_job_select">
        <option class="main_job_select" value="ナイト">ナイト</option>
        <option class="main_job_select" value="戦士">戦士</option>
        <option class="main_job_select" value="ガンブレイカー">ガンブレイカー</option>
        <option class="main_job_select" value="モンク">モンク</option>
        <option class="main_job_select" value="竜騎士">竜騎士</option>
        <option class="main_job_select" value="忍者">忍者</option>
        <option class="main_job_select" value="白魔道士">白魔道士</option>
        <option class="main_job_select" value="学者">学者</option>
        <option class="main_job_select" value="占星術士">占星術士</option>
        <option class="main_job_select" value="吟遊詩人">吟遊詩人</option>
        <option class="main_job_select" value="機工士">機工士</option>
        <option class="main_job_select" value="踊り子">踊り子</option>
        <option class="main_job_select" value="黒魔道士">黒魔道士</option>
        <option class="main_job_select" value="召喚士">召喚士</option>
        <option class="main_job_select" value="赤魔道士">赤魔道士</option>
        <option class="main_job_select" value="青魔道士">青魔道士</option>
        <option class="main_job_select" value="木工師">木工師</option>
        <option class="main_job_select" value="鍛冶師">鍛冶師</option>
        <option class="main_job_select" value="甲冑師">甲冑師</option>
        <option class="main_job_select" value="彫金師">彫金師</option>
        <option class="main_job_select" value="革細工師">革細工師</option>
        <option class="main_job_select" value="裁縫師">裁縫師</option>
        <option class="main_job_select" value="錬金術師">錬金術師</option>
        <option class="main_job_select" value="調理師">調理師</option>
        <option class="main_job_select" value="採掘師">採掘師</option>
        <option class="main_job_select" value="園芸師">園芸師</option>
        <option class="main_job_select" value="釣師">釣師</option>
    </select> -->
 

  <!-- 文字情報 -->
  <h2 class="mhover_bg" data="main_job_bg server_bg race_bg freecompany_bg favorite_bg comment_bg">【フォント】</h2>
  <div class="menu_indent">   
    <input type="checkbox" name="font_bold_check">太字にする
  </div>　
  
    <div class="char_info_font_div">
        <span class="char_info_font_span">
            <p class="char_info_font_p">
                <input type="radio" name="char_info_radio" value="Noto"><span class="Noto">Noto</span>
                <input type="radio" name="char_info_radio" value="Sawarabi"><span class="Sawarabi">Sawarabi</span>
                <input type="radio" name="char_info_radio" value="Kosugi"><span class="Kosugi">Kosugi</span>
                <input type="radio" name="char_info_radio" value="Potta"><span class="Potta">Potta</span>
                <input type="radio" name="char_info_radio" value="Hachi"><span class="Hachi">Hachi</span>
            </p>
            <p class="char_name_font_p">
                <input type="radio" name="char_info_radio" value="Yusei"><span class="Yusei">Yusei</span>
                <input type="radio" name="char_info_radio" value="RocknRol"><span class="RocknRol">RocknRol</span>
                <input type="radio" name="char_info_radio" value="Reggae"><span class="Reggae">Reggae</span>
                <input type="radio" name="char_info_radio" value="Stick"><span class="Stick">Stick</span>
                <input type="radio" name="char_info_radio" value="Dot"><span class="Dot">Dot</span>
            </p>
            <p>
                <button class="char_info_font_toname">キャラ名にも同じフォントを反映</button>
            </p>
        </span>
    </div>
    
  <h2 class="mhover_bg" data="main_job_bg_h server_bg_h race_bg_h freecompany_bg_h">【見出しの色】</h2>
  <!-- <p>色:<span id="char_info_h_span"></span></p> -->
 <div class="char_info_h_span">
   <md-color-picker id="char_info_h" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
 </div>

 <h2 class="mhover_bg_text" data="main_job_bg server_bg race_bg freecompany_bg">【テキストの色】</h2>
 <div class="char_text_h_span">
    <md-color-picker id="char_text_h" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
 </div>

  </div>
</div>



<!-- コンテンツ -->
<div class='widget'>
<div id='コンテンツ' class="tab-content">

    <h2 class="mhover_bg" data="favorite_bg">【お気に入りコンテンツ】</h2>
    <div class="menu_indent_favorite">  
        <span class="favorite_contents_span">
            <input class="favorite_contents" type="checkbox" name="001" value="レベリング・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite001.png" alt="">レベリング
            <input class="favorite_contents" type="checkbox" name="015" value="メインストーリー・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite015.png" alt="">メインストーリー
            <input class="favorite_contents" type="checkbox" name="002" value="クラフター・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite002.png" alt="">クラフター<br>
            <input class="favorite_contents" type="checkbox" name="003" value="ギャザラー・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite003.png" alt="">ギャザラー
            <input class="favorite_contents" type="checkbox" name="004" value="グルポ・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite004.png" alt="">グルポ
            <input class="favorite_contents" type="checkbox" name="005" value="ミラプリ・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite005.png" alt="">ミラプリ
            <input class="favorite_contents" type="checkbox" name="006" value="おしゃべり・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite006.png" alt="">おしゃべり<br>
            <input class="favorite_contents" type="checkbox" name="007" value="ハウジング・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite007.png" alt="">ハウジング
            <input class="favorite_contents" type="checkbox" name="008" value="ゴールドソーサー・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite008.png" alt="">ゴールドソーサー
            <input class="favorite_contents" type="checkbox" name="009" value="演奏・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite009.png" alt="">演奏<br>
            <input class="favorite_contents" type="checkbox" name="010" value="トレハン・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite010.png" alt="">トレハン
            <input class="favorite_contents" type="checkbox" name="011" value="討伐/討滅戦・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite011.png" alt="">討伐/討滅戦
            <input class="favorite_contents" type="checkbox" name="012" value="零式・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite012.png" alt="">零式
            <input class="favorite_contents" type="checkbox" name="013" value="絶・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite013.png" alt="">絶
            <input class="favorite_contents" type="checkbox" name="014" value="PvP・"><img class="favorite_contents_img" src="/img/faveriteicon/faverite014.png" alt="">PvP
        </span>  
    </div>  

    <h3 class="mhover_bg" data="favorite_bg_h">見出しの色</h3>
    <div class="char_favorite_h_span">
      <md-color-picker id="char_favorite_h" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
   </div>

   <h3 class="mhover_bg_text" data="favorite_bg">テキストの色</h3>
   <div class="char_favorite_text_h_span">
     <md-color-picker id="char_favorite_text_h" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
   </div>


   <h2 class="mhover_bg" data="comment_bg">【コメント】</h2>
    <div class="menu_indent_comment">  
    <span class="comment_contents_span">
        <textarea name="char_comment" id="char_comment" cols="40" rows="3">
まったり楽しんでます(*´∀｀)
よろしくおねがします！</textarea>
    </span>
    </div>

    <h3 class="mhover_bg" data="comment_bg_h">見出しの色</h3>
    <div class="char_comment_h_span">
        <md-color-picker id="char_comment_h" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
    </div>

    <h3 class="mhover_bg_text" data="comment_bg">テキストの色</h3>
    <div class="char_comment_text_h_span">
        <md-color-picker id="char_comment_text_h" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
    </div>

</div>
</div>


<!-- ジョブ -->
<div class='widget'>
  <div id='ジョブ' class="tab-content">
  <h2 class="mhover_bg" data="job_bg_h">【ジョブアイコン】</h2>
  <div class="job_icon_list_span">
        <div class="job_icon_list_p">
            <input type="radio" name="job_icon_list" value="01"><span class="job_icon_list"><img src="/img/jobicon/01/paladin.png" alt=""></span>
            <input type="radio" name="job_icon_list" value="02"><span class="job_icon_list"><img src="/img/jobicon/02/paladin.png" alt=""></span>
            <input type="radio" name="job_icon_list" value="03"><span class="job_icon_list"><img src="/img/jobicon/03/paladin.png" alt=""></span>
            <input type="radio" name="job_icon_list" value="04"><span class="job_icon_list"><img src="/img/jobicon/04/paladin.png" alt=""></span>
        </div> 
  </div>

    <h2 class="mhover_bg_text" data="job_bg">【フォント】</h2>
    <div class="job_icon_list_font_div">
        <button class="job_icon_list_font_name">キャラ名　と同じフォントにする</button>
        <button class="job_icon_list_font_info">キャラ情報と同じフォントにする</button>
    </div>

 <h2 class="mhover_bg" data="job_bg">【微調整】</h2><span class="job_level_attention">フォントによってズレるので微調整してください</span>
  <table class="tweak_table">
    <tr>
        <td class="mhover_bg_text" data="job_bg">位置</td>
        <td class="mhover_bg_text" data="job_bg">大きさ</td>
        <td class="mhover_bg" data="job_bg">行間</td>
    </tr>
    <tr>
        <td>
            <button class="button_up">△</button>
        </td>     
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>
            <button class="button_left">◁</button>
            <button class="button_rigth">▷</button>
        </td>
        <td>
            <button class="button_minus">－</button>
            <button class="button_puls">＋</button>
        </td>
        <td>
            <button class="button_line_minus">－</button>
            <button class="button_line_puls">＋</button>
        </td>
        </td>
    </tr>
    <tr>
        <td>
            <button class="button_down">▽</button>
        </td>
        <td></td>
        <td></td>
    </tr>
  </table>


  <h2 class="mhover_bg_text" data="job_bg">【LV.80以下の色】</h2>
    <div class="job_icon_list_color">
      <md-color-picker id="job_icon_list_color" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
    </div>

  <h2 class="mhover_bg_text" data="job_bg">【カンストLV.の色】</h2>
    <div class="job_icon_list_color_const">
      <md-color-picker id="job_icon_list_color_const" color-margin="4" colors-per-row="11" color-size="30" default-tint="500" fixedMinHeight="true" palette="material-full" use-spectrum-picker="true" value="#000000"></md-color-picker>
    </div>

    <p>※色を変更すると、1ケタレベルの位置がズレる不具合が確認されています。ズレた場合はページの更新（F5キー）をすると正式な位置へ戻ります。m_ _m<br>（設定は保存されたまま反映されます）</p>


</div>
</div>




<!-- 保存 -->
<div class='widget'>
    <div id='保存' class="tab-content">
        <p>
          <h2 class="save_layout_span">【レイアウト1】</h2>
          <div class="menu_indent">  
            <button name="layout01" value="レイアウト1" class="save_layout">保存</button>
            <button name="layout01" lavel="レイアウト1"  class="reflect_layout">反映</button>
            <span class="save_layout_span_comment01"></span>
          </div>
        </p>
        <p>
          <h2 class="save_layout_span">【レイアウト2】</h2>
          <div class="menu_indent">  
            <button name="layout02" value="レイアウト2"  class="save_layout">保存</button>
            <button name="layout02" lavel="レイアウト2"  class="reflect_layout">反映</button>
            <span class="save_layout_span_comment02"></span>
          </div>
        </p>
        <p>
          <h2 class="save_layout_span">【レイアウト3】</h2>
          <div class="menu_indent">  
            <button name="layout03" value="レイアウト3"  class="save_layout">保存</button>
            <button name="layout03" lavel="レイアウト3"  class="reflect_layout">反映</button>
            <span class="save_layout_span_comment03"></span>
          </div>
        </p>
        <p>
          <h2 class="save_layout_span">【レイアウト4】</h2>
          <div class="menu_indent">  
            <button name="layout04" value="レイアウト4"  class="save_layout">保存</button>
            <button name="layout04" lavel="レイアウト4"  class="reflect_layout">反映</button>
            <span class="save_layout_span_comment04"></span>
          </div>
        </p>

        <p class="save_comment">
            【保存】をすると、現在のレイアウトを保存しておけます。<br>
            【反映】で保存したレイアウトを呼び出せます。<br><br>
            別のスクリーンショットで、同じレイアウトを<br>
            適応したい場合などにご活用ください。
        </p>

    </div>
</div>







</div>
<!-- End of container -->


</div>


</div>
<!-- maindivここまで -->



<!-- フッター -->
<div class="footer">
    <div class="generate_footer_div">
    <hr class="footer_hr" color="#ffb744">
        <div>Copyright (C) 2021 SQUARE ENIX CO., LTD. All Rights Reserved. </div>
    </div>
</div>
<!-- フッターココまで -->







</div>
</body>
</html>
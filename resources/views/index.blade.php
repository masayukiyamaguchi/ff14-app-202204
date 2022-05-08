<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FF14キャラクターカード|Final Fantasy Xiv Character card generator</title>
    <link rel="stylesheet" href="/css/main.css">
    <link href="/css/lightbox.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/main.js"></script>

    <!-- jqueryUI -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

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

<!-- ヘッダー -->
<div class="header_div"><img src="/img/header_bg.png" alt=""></div>

<!-- メイン部分 -->
<div class="main_div">

    <!-- レフトメニュー -->
    <div class="left_menu">
        <p></p>
    </div>

    

<div class="contents">




    <form id=formInput action="{{route('generate')}}" method="post" enctype="multipart/form-data">
        @csrf
        <div class="input_data_div">
        <div class="input_data_div_div">

        <table class="input_data_table">
            <tr>
                <th><img class="index_icon_img" src="/img/indexicon.png" alt="">Lodestone ID</th>
                <!-- <td>現在調整中です。リリースまでしばらくお待ち下さい</td> -->
                <td><input type="text" class="id_input" name="loadstone_id"></td>            

            </tr>

            <tr>
                <th><img class="index_icon_img" src="/img/indexicon.png" alt="">スクリーンショット選択</th>
                <td><input type="file" class="img_button" name="file_upload"></td>
            </tr>

            <tr>
                <th></th>
                <td><img class="img_preview" style="width:200px;"></td>
            </tr>


        </table>

        <p class="error_text">{{$error}}</p>

        </div>
        </div>

        <!-- この下のクラスでポスト送信をする
        参考
        https://whitewood-hp.com/web-tips/archives/3958 -->
        <div class="generate_button">
            <a href="#" class="btn-shine">GENERATE CARD</a>
        </div>
       

        
    </form>



</div>

<!-- コンテンツココまで -->


<!-- ライトメニュー -->
    <div class="rigth_menu">
        <div class="top_right_menu">
    
            <span class="how_to_use">
                <img class="how_to_use_img" src="/img/wakaba.png" alt="">
                <span  class="how_to_use_text">使い方！</span>
            </span>


            <p>①LoadStone IDを入力</p>
            <span class="top_right_menu_help">
                <a href="images/lodestoneidimage.png" data-lightbox="image-1" data-title="My caption" style="text-decoration:none;">    
                    <img class="help_icon_img" src="/img/helpicon.png" alt=""><span style="color:rgb(110, 110, 255);">Lodestone IDとは？？</span>
                </a>
            </span>
            <p>②スクリーンショットを選択</p>                    
                <span class="ss_size">適正サイズ：1920px ☓ 1080px</span>
            <p>③【GENERAT CARD】ボタンをクリック！</p>            

        </div>
    </div>


</div>
<!-- maindivここまで -->



<!-- フッター -->
<div class="footer">
    <div class="footer_div">
    <hr class="footer_hr" color="#ffb744">
        <div>現在Bata版となります。不具合、リクエストがございましたらご連絡ください。<a href="mailto:info@ff14-app.com">お問い合わせ</a><br></div>
        <div>Copyright (C) 2021 SQUARE ENIX CO., LTD. All Rights Reserved. </div>
    </div>
</div>
 

<script src="/js/lightbox.js"></script>
</body>
</html>
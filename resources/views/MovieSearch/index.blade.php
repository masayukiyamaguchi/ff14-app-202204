<!DOCTYPE html>
<html lang="jp">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">

    <link rel="stylesheet" href="/css/moviesearch/top.css">
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">
    <link rel="stylesheet" href="/css/moviesearch/mainmenu.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/moviesearch/main.js"></script>
    <script src="/js/moviesearch/bodyScrollLock.js"></script>




    <script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">

    @component('components.meta.moviesearch.moviesearch')
    @endcomponent

</head>

<body id="body">

    <div class="backgroundimage">

        <!--共通ヘッダー-->
        @component('components.commonHeaderMenu')
        @endcomponent

        <div id="mainContents">
            <div class="backgroundimage">
                <div class="mainContents_container">

                    <!-- レフト　-->
                    <div class="mainContents_container_left globalMenuSp" id="globalMenu">

                        <!-- メインメニュー　-->
                        @component('components.commonMainMenu')
                        @endcomponent

                        <div class="sp_scroll_area">

                            <div id="endwalker">
                                <p class="left_menu_h1 pc_left_menu_h1"><img src="\images\moviesearch\endwalker.png"
                                        alt=""></p>
                                <p class="left_menu_h1 sp_left_menu_h1"><img src="\images\moviesearch\sp_endwalker.jpg"
                                        alt=""></p>

                                <p class="left_menu_h2 endwalker"> <span data-activePart="UltimateDragoonWar"
                                        class="left_menu_h2_span">絶・竜詩戦争</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="UltimateDragoonWar00"><img
                                            src="\images\moviesearch\boss\bossimage061.png" alt="全フェーズ">全フェーズ（通し）
                                    </li>
                                    <li data-contents="UltimateDragoonWar01"><img
                                            src="\images\moviesearch\boss\bossimage063.png" alt="蒼天騎士">蒼天騎士</li>
                                    <li data-contents="UltimateDragoonWar02"><img
                                            src="\images\moviesearch\boss\bossimage064.png" alt="トールダン">トールダン</li>
                                    <li data-contents="UltimateDragoonWar03"><img
                                            src="\images\moviesearch\boss\bossimage065.png" alt="ニーズヘッグ">ニーズヘッグ</li>
                                    <li data-contents="UltimateDragoonWar04"><img
                                            src="\images\moviesearch\boss\bossimage066.png" alt="邪眼">邪眼</li>
                                    <li data-contents="UltimateDragoonWar05"><img
                                            src="\images\moviesearch\boss\bossimage067.png" alt="教皇庁if">教皇庁if</li>
                                    <li data-contents="UltimateDragoonWar06"><img
                                            src="\images\moviesearch\boss\bossimage068.png" alt="偽典">偽典トールダン</li>
                                    <li data-contents="UltimateDragoonWar07"><img
                                            src="\images\moviesearch\boss\bossimage069.png" alt="二天竜">二天竜</li>
                                    <li data-contents="UltimateDragoonWar08"><img
                                            src="\images\moviesearch\boss\bossimage070.png" alt="Pトールダン">Pトールダン</li>

                                </ul>

                                <p class="left_menu_h2 endwalker"> <span data-activePart="Asphodelos"
                                        class="left_menu_h2_span">万魔殿パンデモニウム：辺獄編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="Asphodelos01"><img
                                            src="\images\moviesearch\boss\bossimage055.png" alt="エリクトニオス">エリクトニオス</li>
                                    <li data-contents="Asphodelos02"><img
                                            src="\images\moviesearch\boss\bossimage056.png" alt="ヒッポカムポス">ヒッポカムポス</li>
                                    <li data-contents="Asphodelos03"><img
                                            src="\images\moviesearch\boss\bossimage057.png" alt="フェネクス">フェネクス</li>
                                    <li data-contents="Asphodelos04"><img
                                            src="\images\moviesearch\boss\bossimage058.png" alt="ヘスペロス">ヘスペロス</li>
                                    <li data-contents="Asphodelos05"><img
                                            src="\images\moviesearch\boss\bossimage059.png" alt="ヘスペロス">ヘスペロス(後半)
                                    </li>
                                </ul>

                                <p class="left_menu_h2 endwalker"> <span data-activePart="Purgatory"
                                        class="left_menu_h2_span">万魔殿パンデモニウム：煉獄編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="Purgatory01"><img src="\images\moviesearch\boss\bossimage071.png"
                                            alt="プロトカーバンクル">プロトカーバンクル
                                    </li>
                                    <li data-contents="Purgatory02"><img src="\images\moviesearch\boss\bossimage072.png"
                                            alt="ヘーゲモネー">ヘーゲモネー
                                    </li>
                                    <li data-contents="Purgatory03"><img src="\images\moviesearch\boss\bossimage073.png"
                                            alt="アグディスティス">アグディスティス
                                    </li>
                                    <li data-contents="Purgatory04"><img src="\images\moviesearch\boss\bossimage074.png"
                                            alt="ヘファイストス">ヘファイストス
                                    </li>
                                    <li data-contents="Purgatory05"><img
                                            src="\images\moviesearch\boss\bossimagesecret.png"
                                            alt="ヘファイストス">ヘファイストス（後半）
                                    </li>
                                </ul>



                                <p class="left_menu_h2 endwalker"> <span data-activePart="EndwalkerExtreme"
                                        class="left_menu_h2_span">極討滅戦</span> </p>

                                <ul class="left_menu_ul">
                                    <li data-contents="EndwalkerExtreme01"><img
                                            src="\images\moviesearch\boss\bossimage053.png" alt="極ゾディアーク">極ゾディアーク
                                    </li>
                                    <li data-contents="EndwalkerExtreme02"><img
                                            src="\images\moviesearch\boss\bossimage054.png" alt="極ハイデリン">極ハイデリン</li>
                                    <li data-contents="EndwalkerExtreme03"><img
                                            src="\images\moviesearch\boss\bossimage060.png" alt="極ハイデリン">終焉を謳うもの
                                    </li>
                                    <li data-contents="EndwalkerExtreme04"><img
                                            src="\images\moviesearch\boss\bossimagesecret.png" alt="極ハイデリン">？？？？？
                                    </li>
                                </ul>

                                <p class="left_menu_h2 endwalker"> <span data-activePart="EndwalkerUnreal"
                                        class="left_menu_h2_span">幻討滅戦</span> </p>

                                <ul class="left_menu_ul">
                                    <li data-contents="EndwalkerUnreal01"><img
                                            src="\images\moviesearch\boss\bossimage062.png" alt="幻魔人セフィロト">幻魔人セフィロト
                                    </li>
                                </ul>

                            </div>

                            <div id="shadowbringers">
                                <p class="left_menu_h1 pc_left_menu_h1"><img
                                        src="\images\moviesearch\shadowbringers.png" alt=""></p>
                                <p class="left_menu_h1 sp_left_menu_h1"><img
                                        src="\images\moviesearch\sp_shadowbringers.jpg" alt=""></p>
                                <p class="left_menu_h2 shadowbringers"> <span data-activePart="EdensPromise"
                                        class="left_menu_h2_span">希望の園エデン：再生編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="EdensPromise01"><img
                                            src="\images\moviesearch\boss\bossimage048.jpg" alt="暗闇の雲">暗闇の雲</li>
                                    <li data-contents="EdensPromise02"><img
                                            src="\images\moviesearch\boss\bossimage049.jpg" alt="影の王">影の王</li>
                                    <li data-contents="EdensPromise03"><img
                                            src="\images\moviesearch\boss\bossimage050.jpg" alt="フェイトブレイカー">フェイトブレイカー
                                    </li>
                                    <li data-contents="EdensPromise04"><img
                                            src="\images\moviesearch\boss\bossimage051.jpg"
                                            alt="プロミス・オブ・エデン">プロミス・オブ・エデン</li>
                                    <li data-contents="EdensPromise05"><img
                                            src="\images\moviesearch\boss\bossimage052.jpg" alt="闇の巫女">闇の巫女</li>
                                </ul>

                                <p class="left_menu_h2 shadowbringers"> <span data-activePart="EdensVerse"
                                        class="left_menu_h2_span">希望の園エデン：共鳴編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="EdensVerse01"><img
                                            src="\images\moviesearch\boss\bossimage044.jpg" alt="ラムウ">ラムウ</li>
                                    <li data-contents="EdensVerse02"><img
                                            src="\images\moviesearch\boss\bossimage045.jpg" alt="イフリート ガルーダ">イフリート
                                        ガルーダ</li>
                                    <li data-contents="EdensVerse03"><img
                                            src="\images\moviesearch\boss\bossimage046.jpg" alt="ダークアイドル">ダークアイドル
                                    </li>
                                    <li data-contents="EdensVerse04"><img
                                            src="\images\moviesearch\boss\bossimage047.jpg" alt="シヴァ">シヴァ</li>
                                </ul>

                                <p class="left_menu_h2 shadowbringers"> <span data-activePart="EdensGate"
                                        class="left_menu_h2_span">希望の園エデン：覚醒編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="EdensGate01"><img
                                            src="\images\moviesearch\boss\bossimage040.jpg" alt="エデン・プライム">エデン・プライム
                                    </li>
                                    <li data-contents="EdensGate02"><img
                                            src="\images\moviesearch\boss\bossimage041.jpg" alt="ヴォイドウォーカー">ヴォイドウォーカー
                                    </li>
                                    <li data-contents="EdensGate03"><img
                                            src="\images\moviesearch\boss\bossimage040.jpg" alt="リヴァイアサン">リヴァイアサン
                                    </li>
                                    <li data-contents="EdensGate04"><img
                                            src="\images\moviesearch\boss\bossimage043.jpg" alt="タイタン">タイタン</li>
                                </ul>
                            </div>

                            <div id="stormblood">
                                <p class="left_menu_h1 pc_left_menu_h1"><img src="\images\moviesearch\stormblood.png"
                                        alt=""></p>
                                <p class="left_menu_h1 sp_left_menu_h1"><img
                                        src="\images\moviesearch\sp_stormblood.jpg" alt=""></p>
                                <p class="left_menu_h2 stormblood"> <span data-activePart="Alphascape"
                                        class="left_menu_h2_span">次元の狭間オメガ：アルファ編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="Alphascape01"><img
                                            src="\images\moviesearch\boss\bossimage035.jpg" alt="カオス">カオス</li>
                                    <li data-contents="Alphascape02"><img
                                            src="\images\moviesearch\boss\bossimage036.jpg" alt="ミドガルズオルム">ミドガルズオルム
                                    </li>
                                    <li data-contents="Alphascape03"><img
                                            src="\images\moviesearch\boss\bossimage037.jpg" alt="オメガ">オメガ</li>
                                    <li data-contents="Alphascape04"><img
                                            src="\images\moviesearch\boss\bossimage038.jpg" alt="オメガM オメガF">オメガM オメガF
                                    </li>
                                    <li data-contents="Alphascape05"><img
                                            src="\images\moviesearch\boss\bossimage039.jpg" alt="オメガ最終形態">オメガ最終形態
                                    </li>
                                </ul>

                                <p class="left_menu_h2 stormblood"> <span data-activePart="Sigmascape"
                                        class="left_menu_h2_span">次元の狭間オメガ：シグマ編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="Sigmascape01"><img
                                            src="\images\moviesearch\boss\bossimage030.jpg" alt="魔列車">魔列車</li>
                                    <li data-contents="Sigmascape02"><img
                                            src="\images\moviesearch\boss\bossimage031.jpg" alt="チャダルヌーク">チャダルヌーク
                                    </li>
                                    <li data-contents="Sigmascape03"><img
                                            src="\images\moviesearch\boss\bossimage032.jpg" alt="ガーディアン">ガーディアン</li>
                                    <li data-contents="Sigmascape04"><img
                                            src="\images\moviesearch\boss\bossimage033.jpg" alt="ケフカ">ケフカ</li>
                                    <li data-contents="Sigmascape05"><img
                                            src="\images\moviesearch\boss\bossimage034.jpg" alt="ゴッド・ケフカ">ゴッド・ケフカ
                                    </li>
                                </ul>

                                <p class="left_menu_h2 stormblood"> <span data-activePart="Deltascape"
                                        class="left_menu_h2_span">次元の狭間オメガ：デルタ編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="Deltascape01"><img
                                            src="\images\moviesearch\boss\bossimage025.jpg" alt="アルテ・ロイテ">アルテ・ロイテ
                                    </li>
                                    <li data-contents="Deltascape02"><img
                                            src="\images\moviesearch\boss\bossimage026.jpg" alt="カタストロフィー">カタストロフィー
                                    </li>
                                    <li data-contents="Deltascape03"><img
                                            src="\images\moviesearch\boss\bossimage027.jpg" alt="ハリカルナッソス">ハリカルナッソス
                                    </li>
                                    <li data-contents="Deltascape04"><img
                                            src="\images\moviesearch\boss\bossimage028.jpg" alt="エクスデス">エクスデス</li>
                                    <li data-contents="Deltascape05"><img
                                            src="\images\moviesearch\boss\bossimage029.jpg" alt="ネオ・エクスデス">ネオ・エクスデス
                                    </li>
                                </ul>
                            </div>

                            <div id="heavensward">
                                <p class="left_menu_h1 pc_left_menu_h1"><img src="\images\moviesearch\heavensward.png"
                                        alt=""></p>
                                <p class="left_menu_h1 sp_left_menu_h1"><img
                                        src="\images\moviesearch\sp_heavensward.jpg" alt=""></p>
                                <p class="left_menu_h2 heavensward"> <span data-activePart="TheSouloftheCreator"
                                        class="left_menu_h2_span">機工城アレキサンダー：天動編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="TheSouloftheCreator01"><img
                                            src="\images\moviesearch\boss\bossimage021.jpg" alt="リファビッシャー">リファビッシャー
                                    </li>
                                    <li data-contents="TheSouloftheCreator02"><img
                                            src="\images\moviesearch\boss\bossimage022.jpg"
                                            alt="傭兵のレイムブリクス">傭兵のレイムブリクス</li>
                                    <li data-contents="TheSouloftheCreator03"><img
                                            src="\images\moviesearch\boss\bossimage023.jpg" alt="クルーズチェイサー">クルーズチェイサー
                                    </li>
                                    <li data-contents="TheSouloftheCreator04"><img
                                            src="\images\moviesearch\boss\bossimage024.jpg"
                                            alt="アレキサンダー・プライム">アレキサンダー・プライム</li>
                                </ul>

                                <p class="left_menu_h2 heavensward"> <span data-activePart="TheBurdenoftheSon"
                                        class="left_menu_h2_span">機工城アレキサンダー：律動編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="TheBurdenoftheSon01"><img
                                            src="\images\moviesearch\boss\bossimage017.jpg"
                                            alt="奇才のラットフィンクス">奇才のラットフィンクス</li>
                                    <li data-contents="TheBurdenoftheSon02"><img
                                            src="\images\moviesearch\boss\bossimage018.jpg" alt="4体">4体</li>
                                    <li data-contents="TheBurdenoftheSon03"><img
                                            src="\images\moviesearch\boss\bossimage019.jpg"
                                            alt="万能のクイックシンクス">万能のクイックシンクス</li>
                                    <li data-contents="TheBurdenoftheSon04"><img
                                            src="\images\moviesearch\boss\bossimage020.jpg"
                                            alt="ブルートジャスティス">ブルートジャスティス</li>
                                </ul>

                                <p class="left_menu_h2 heavensward"> <span data-activePart="TheFistoftheFather"
                                        class="left_menu_h2_span">機工城アレキサンダー：起動編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="TheFistoftheFather01"><img
                                            src="\images\moviesearch\boss\bossimage013.jpg" alt="オプレッサー">オプレッサー</li>
                                    <li data-contents="TheFistoftheFather02"><img
                                            src="\images\moviesearch\boss\bossimage014.jpg" alt="機工兵団">機工兵団</li>
                                    <li data-contents="TheFistoftheFather03"><img
                                            src="\images\moviesearch\boss\bossimage015.jpg" alt="リビングリキッド">リビングリキッド
                                    </li>
                                    <li data-contents="TheFistoftheFather04"><img
                                            src="\images\moviesearch\boss\bossimage016.jpg" alt="マニピュレーター">マニピュレーター
                                    </li>
                                </ul>
                            </div>


                            <div id="arealmreborn">
                                <p class="left_menu_h1 pc_left_menu_h1"><img
                                        src="\images\moviesearch\arealmreborn.png" alt=""></p>
                                <p class="left_menu_h1 sp_left_menu_h1"><img
                                        src="\images\moviesearch\sp_arealmreborn.jpg" alt=""></p>
                                <p class="left_menu_h2 arealmreborn"> <span data-activePart="TheFinalCoilofBahamut"
                                        class="left_menu_h2_span">大迷宮バハムート：真成編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="TheFinalCoilofBahamut01"><img
                                            src="\images\moviesearch\boss\bossimage009.jpg" alt="イムドゥグド">イムドゥグド</li>
                                    <li data-contents="TheFinalCoilofBahamut02"><img
                                            src="\images\moviesearch\boss\bossimage010.jpg" alt="カーリア">カーリア</li>
                                    <li data-contents="TheFinalCoilofBahamut03"><img
                                            src="\images\moviesearch\boss\bossimage011.jpg" alt="フェニックス">フェニックス</li>
                                    <li data-contents="TheFinalCoilofBahamut04"><img
                                            src="\images\moviesearch\boss\bossimage012.jpg"
                                            alt="バハムート・プライム">バハムート・プライム</li>
                                </ul>

                                <p class="left_menu_h2 arealmreborn"> <span data-activePart="TheSecondCoilofBahamut"
                                        class="left_menu_h2_span">大迷宮バハムート：侵攻編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="TheSecondCoilofBahamut01"><img
                                            src="\images\moviesearch\boss\bossimage005.jpg" alt="ラフレシア">ラフレシア</li>
                                    <li data-contents="TheSecondCoilofBahamut02"><img
                                            src="\images\moviesearch\boss\bossimage006.jpg" alt="メリュジーヌ">メリュジーヌ</li>
                                    <li data-contents="TheSecondCoilofBahamut03"><img
                                            src="\images\moviesearch\boss\bossimage007.jpg" alt="アバター">アバター</li>
                                    <li data-contents="TheSecondCoilofBahamut04"><img
                                            src="\images\moviesearch\boss\bossimage008.jpg"
                                            alt="ネール・デウス・ダーナス">ネール・デウス・ダーナス</li>
                                </ul>

                                <p class="left_menu_h2 arealmreborn"> <span data-activePart="TheBindingCoilofBahamut"
                                        class="left_menu_h2_span">大迷宮バハムート：邂逅編</span> </p>
                                <ul class="left_menu_ul">
                                    <li data-contents="TheBindingCoilofBahamut01"><img
                                            src="\images\moviesearch\boss\bossimage001.jpg" alt="カドゥケウス">カドゥケウス</li>
                                    <li data-contents="TheBindingCoilofBahamut02"><img
                                            src="\images\moviesearch\boss\bossimage002.jpg" alt="防疫システム">防疫システム</li>
                                    <li data-contents="TheBindingCoilofBahamut03"><img
                                            src="\images\moviesearch\boss\bossimage003.jpg" alt="雑魚戦">雑魚戦</li>
                                    <li data-contents="TheBindingCoilofBahamut04"><img
                                            src="\images\moviesearch\boss\bossimage004.jpg" alt="ツインタニア">ツインタニア</li>
                                </ul>
                            </div>


                            <div class="menu_contact">
                                <a href="mailto:info@ff14-app.com">お問い合わせ</a>
                            </div>

                            <div class="main_top_header_menu_logo_sp">
                                <a href="/">
                                    <img class="main_top_header_menu_logo_img" src="\images\Top\logo.png"
                                        alt="">
                                </a>
                            </div>


                        </div>


                    </div>


                    <!-- センター　-->
                    <div class="mainContents_container_center">

                        <div class="movie_list_filter">
                            <ul class="movie_list_filter_ul">
                                <div class="movie_list_filter_ul_div filter_div">
                                    <li class="movie_list_filter_icon"><img
                                            src="\images\moviesearch\filtericonimage.png" alt=""></li>
                                    <li class="movie_list_filter_button" id="filter_play_job">ジョブ:ALL</li>
                                    <li class="movie_list_filter_button" id="filter_bool_vc">VC：ALL</li>
                                    <li class="movie_list_filter_button" id="filter_string_guide">解説:ALL</li>
                                    <li class="movie_list_filter_button" id="filter_bool_act">DPS表示:ALL</li>
                                    <li class="movie_list_filter_button" id="filter_bool_clear">クリアー:ALL</li>
                                    <li class="movie_list_filter_button" id="filter_language">言語:ALL</li>
                                    <li class="movie_list_filter_button" id="filter_delete">×</li>
                                    <!--</div>
                            <div class="movie_list_filter_ul_div sort_div">-->
                                    <li class="movie_list_filter_icon movie_list_sort_icon"><img
                                            src="\images\moviesearch\sorticonimage.png" alt=""></li>
                                    <li class="movie_list_filter_button" id="sort_view_count">再生回数：多い</li>
                                    <li class="movie_list_filter_button" id="sort_published_at">投稿日</li>
                                </div>
                            </ul>
                        </div>

                        <!-- 動画リスト部分　-->
                        <div class="movie_list">

                        </div>


                        {{-- 個別プルダウン --}}
                        <!-- ジョブ　-->
                        <div class="filter_play_job_menu">
                            <div class="filter_play_job_menu_div">
                                <div class="filter_play_job_menu_div_top">
                                    <div class="filter_play_job_menu_div_tank">
                                        <div class="filter_play_job_menu_div_titletank">
                                            タンク
                                        </div>
                                        <div class="filter_play_job_menu_div_icontank">
                                            <ul>
                                                <li data-stat="on" data-job="paladin" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\paladin.png" alt=""></li>
                                                <li data-stat="on" data-job="warrior" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\warrior.png" alt=""></li>
                                                <li data-stat="on" data-job="darkknight" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\darkknight.png" alt=""></li>
                                                <li data-stat="on" data-job="gunbreaker" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\gunbreaker.png" alt=""></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="filter_play_job_menu_div_healer">
                                        <div class="filter_play_job_menu_div_titlehealer">
                                            ヒーラー
                                        </div>
                                        <div class="filter_play_job_menu_div_iconhealer">
                                            <ul>
                                                <li data-stat="on" data-job="whitemage" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\whitemage.png" alt=""></li>
                                                <li data-stat="on" data-job="scholar" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\scholar.png" alt=""></li>
                                                <li data-stat="on" data-job="astrologian" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\astrologian.png" alt=""></li>
                                                <li data-stat="on" data-job="sage" class="play_job_icon"><img
                                                        class="filter_play_job_menu_img"
                                                        src="\images\moviesearch\sage.png" alt=""></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="filter_play_job_menu_div_middle">
                                    <div class="filter_play_job_menu_div_titledps">
                                        アタッカー
                                    </div>
                                    <div class="filter_play_job_menu_div_dps">
                                        <div class="filter_play_job_menu_div_melee">
                                            <div class="filter_play_job_menu_div_titlemelee">
                                                近接DPS
                                            </div>
                                            <div class="filter_play_job_menu_div_iconmelee">
                                                <ul>
                                                    <li data-stat="on" data-job="dragoon" class="play_job_icon"><img
                                                            class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\dragoon.png" alt=""></li>
                                                    <li data-stat="on" data-job="monk" class="play_job_icon"><img
                                                            class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\monk.png" alt=""></li>
                                                    <li data-stat="on" data-job="ninja" class="play_job_icon"><img
                                                            class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\ninja.png" alt=""></li>
                                                    <li data-stat="on" data-job="samurai" class="play_job_icon"><img
                                                            class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\samurai.png" alt=""></li>
                                                    <li data-stat="on" data-job="reaper" class="play_job_icon"><img
                                                            class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\reaper.png" alt=""></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="filter_play_job_menu_div_range">
                                            <div class="filter_play_job_menu_div_titlerange">
                                                レンジ
                                            </div>
                                            <div class="filter_play_job_menu_div_iconrange">
                                                <ul>
                                                    <li data-stat="on" data-job="bard" class="play_job_icon"><img
                                                            class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\bard.png" alt=""></li>
                                                    <li data-stat="on" data-job="machinist" class="play_job_icon">
                                                        <img class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\machinist.png" alt="">
                                                    </li>
                                                    <li data-stat="on" data-job="dancer" class="play_job_icon"><img
                                                            class="filter_play_job_menu_img"
                                                            src="\images\moviesearch\dancer.png" alt=""></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="filter_play_job_menu_div_bottom">
                                        <div class="filter_play_job_menu_div_dps">
                                            <div class="filter_play_job_menu_div_caster">
                                                <div class="filter_play_job_menu_div_titlecaster">
                                                    キャスター
                                                </div>
                                                <div class="filter_play_job_menu_div_iconcaster">
                                                    <ul>
                                                        <li data-stat="on" data-job="blackmage"
                                                            class="play_job_icon"><img
                                                                class="filter_play_job_menu_img"
                                                                src="\images\moviesearch\blackmage.png"
                                                                alt=""></li>
                                                        <li data-stat="on" data-job="summoner" class="play_job_icon">
                                                            <img class="filter_play_job_menu_img"
                                                                src="\images\moviesearch\summoner.png" alt="">
                                                        </li>
                                                        <li data-stat="on" data-job="redmage" class="play_job_icon">
                                                            <img class="filter_play_job_menu_img"
                                                                src="\images\moviesearch\redmage.png" alt="">
                                                        </li>
                                                        <li data-stat="on" data-job="bluemage" class="play_job_icon">
                                                            <img class="filter_play_job_menu_img"
                                                                src="\images\moviesearch\bluemage.png" alt="">
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="filter_play_job_menu_all_button">
                                            <div class="filter_play_job_menu_all_button_active">
                                                <div class="filter_play_job_menu_all_button_active_button">全て選択</div>
                                            </div>
                                            <div class="filter_play_job_menu_all_button_inactive">
                                                <div class="filter_play_job_menu_all_button_inactive_button">全て解除</div>
                                            </div>
                                        </div>
                                        <div class="filter_play_job_menu_enter">
                                            <div class="filter_play_job_menu_enter_button">
                                                <div class="enter_text">決定</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- 解説 --}}
                        <div class="filter_string_guide_menu">
                            <ul>
                                <li data-value="NONE" id="guide_none">ALL</li>
                                <li data-value="yukkuri" id="guide_yukkuri">　ゆっくり</li>
                                <li data-value="jigoe" id="guide_jigoe">　本人解説</li>
                                <li data-value="jimaku" id="guide_jimaku">　字幕のみ</li>
                                <li data-value="nonevoice" id="guide_nonevoice">　解説なし</li>
                            </ul>
                        </div>




                    </div>
                </div>
            </div>

        </div>




        <!--共通フッター-->
        @component('components.commonFooterMenu')
        @endcomponent


</body>

</html>

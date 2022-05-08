<!DOCTYPE html>
<html lang="jp">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/Top/top.css">
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">

    @component('components.meta.top.topmeta')
    @endcomponent
    

</head>

<body id="body">

    <!--共通ヘッダー-->
    @component('components.commonHeaderMenu')
    @endcomponent

    <div id="mainContents">
        <div class="backgroundimage">
            <div class="mainContents_container">
                
                <!-- レフト　-->
                <div class="mainContents_container_left"></div>


                <!-- センター　-->
                <div class="mainContents_container_center">
                    <div class="mainContents_container_center_outer">

                        <h1>WEBアプリ</h1>
                        
                        <div class="mainContents_container_center_inner">
                            
                            <ul class="contents_card">
                                {{-- <li class="contents_card_li">
                                    <a href="/ccard">
                                        <img src="\images\Top\template3.png" alt="">
                                    </a>
                                    <h2>キャラクターカードジェネレーター</h2>
                                    <p>スクリーンショットを使ってオリジナルのキャラクターカードを制作できます！</p>
                                </li> --}}
                                <li class="contents_card_li">
                                    <a href="/moviesearch">
                                        <img src="\images\Top\moviesearchsamneil.jpg" alt="">
                                    </a>
                                    <h2>攻略動画検索</h2>
                                    <p>レイド・討伐討滅戦などの攻略動画をFF14に特化して検索できます！※現在、動画登録作業中です</p>
                                </li>
                                <li class="contents_card_li">
                                    <a href="/checkleve">
                                        <img src="\images\Top\checklevesamneil.png" alt="">
                                    </a>
                                    <h2>ただリーヴ券が溢れないようにしてくれるツール</h2>
                                    <p>リーヴ券がいつ溢れてしまうかを計算してくれるツールです！</p>
                                </li>
                                <li class="contents_card_li">
                                    <a href="/">
                                        <img src="\images\Top\nowcreating.jpg" alt="">
                                    </a>
                                    <h2>Comming Soon</h2>
                                    <p>現在制作中！</p>
                                </li>
                                <li class="contents_card_li">
                                    <a href="/">
                                        <img src="\images\Top\nowcreating.jpg" alt="">
                                    </a>
                                    <h2>Comming Soon</h2>
                                    <p>現在制作中！</p>
                                </li>
                            </ul>
                            
                        </div>


                        <h1>木人練習場</h1>
                        
                        <div class="mainContents_container_center_inner">
                            
                            <ul class="contents_card">
                                <li class="contents_card_li">
                                    <a href="/avoidsnakes" target="_blank">
                                        <img src="\images\Top\AvoidsnakesSamneil.jpg" alt="">
                                    </a>
                                    <h2>木人練習場～へびよけ～</h2>
                                    <p>〇〇〇討滅戦練習！？へびをよけよう！（PC用です！）</p>
                                </li>
                                <li class="contents_card_li">
                                    <a href="/">
                                        <img src="\images\Top\nowcreating.jpg" alt="">
                                    </a>
                                    <h2>Comming Soon</h2>
                                    <p>現在制作中！</p>
                                </li>
                                <li class="contents_card_li">
                                    <a href="/">
                                        <img src="\images\Top\nowcreating.jpg" alt="">
                                    </a>
                                    <h2>Comming Soon</h2>
                                    <p>現在制作中！</p>
                                </li>
                                <li class="contents_card_li">
                                    <a href="/">
                                        <img src="\images\Top\nowcreating.jpg" alt="">
                                    </a>
                                    <h2>Comming Soon</h2>
                                    <p>現在制作中！</p>
                                </li>
                            </ul>
                            
                        </div>


                    </div>
                    
                </div>

                <!-- ライト　-->
                <div class="mainContents_container_right"></div>


            </div>
        </div>
    </div>

    <!--共通フッター-->
    @component('components.commonFooterMenu')
    @endcomponent
    

</body>
</html>
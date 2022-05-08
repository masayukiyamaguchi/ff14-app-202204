<!DOCTYPE html>
<html lang="jp">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">

    <link rel="stylesheet" href="/css/moviesearch/favorite.css">
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">
    <link rel="stylesheet" href="/css/moviesearch/mainmenu.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/moviesearch/favorite.js"></script>
    <script src="/js/moviesearch/bodyScrollLock.js"></script>

    <script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">

    @component('components.meta.moviesearch.moviesearch')
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
               <div class="mainContents_container_left globalMenuSp" id="globalMenu">

                    <!-- メインメニュー　-->
                    @component('components.commonMainMenu')
                    @endcomponent


                    <div id="favoritelist">
                        @if( $all_datas["formController"] == "index")
                        <ul class="left_menu_ul">
                            <a href="/moviesearch/favorite">
                                <li id="list_fix">
                                    <form action="" method="post">
                                        @csrf
                                        <input type="hidden" name="favorite_list" value="">
                                    </form>                            
                                    リスト更新
                                </li>
                            </a>

                            <li class="share_url_button" id="list_share">
                                共有URL作成
                            </li>
                            <div class="favorite_share_url_div">                            
                                <div class="favorite_share_url">
                                    <input type="text" name="favorite_share_url" id="" value="">                                
                                </div>
                                <div class="favorite_share_url_copy">
                                    <button>コピーする</button>
                                </div>
                            </div>                           
                        </ul>

                        @elseif( $all_datas["formController"] == "shorturl")

                        <div class="list_id_div">
                            <div>このページは<br><br>リストID：{{ $all_datas["id_data"] }}<br><br>のお気に入りリストを<br>表示しています！<br><br>★マークは　あなた　の<br>登録内容です</div>
                        </div>
                        
                        
                        <ul class="left_menu_ul">


                        </ul>
                        
                        @endif
                        
                                                
                    </div>

                </div>


                <!-- センター　-->
                <div class="mainContents_container_center">

                    <div class="sp_h1">
                        お気に入りリスト
                        @if( $all_datas["formController"] == "shorturl")
                        <div class="sp_h1_listid">リストID：{{ $all_datas["id_data"] }}</div>
                        @endif
                    </div>
                    

                     <!-- 動画リスト部分　-->
                     <div class="movie_list">

                        @for($indexfor = 0;$indexfor < count($all_datas["searchdatas"]); $indexfor++)
                            <div class="contents_header">{{$all_datas["contentsDatas"][$indexfor]}}</div>

                            @foreach ($all_datas["searchdatas"][$indexfor] as $index => $searchdata)                               
                            
                            @if ($index%5 == 0)
                                <ul class="movie_list_ul">
                            @endif                        
                                <div class="movie_list_div">
                                    <li>
                                        <div class="movie_list_samneil">
                                            <a href="/moviesearch/{{ $searchdata["movie_id"] }}">
                                                <img src="{{ $searchdata["samneil_img"] }}" alt="{{ $searchdata["movie_title"] }}">
                                            </a>
                                        </div>
                                        <div class="movie_list_detail">
                                            <div class="movie_list_detail_channelicon">
                                                <img src="{{ $searchdata["channel_img"] }}" alt="{{ $searchdata["channel_name"] }}">
                                            </div>
                                            <div class="movie_list_detail_text">                                        
                                                <div class="movie_list_detail_text_title">                                                    
                                                    <a href="/moviesearch/{{ $searchdata["movie_id"] }}">
                                                        <div class="movie_list_detail_text_channelname">
                                                            {{ $searchdata["movie_title"] }}
                                                        </div>                                                       
                                                    </a>                                                          
                                                </div>
                                                <div class="movie_list_detail_text_channelname_div">
                                                    <div class="movie_list_detail_text_channelname">
                                                        {{ $searchdata["channel_name"] }}
                                                    </div>
                                                    <div class="movie_list_favorite_div">
                                                        <div data-id="{{ $searchdata["movie_id"] }}" class="movie_list_favorite">
                                                            ★
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="movie_list_detail_view_count">
                                                    {{ $searchdata["view_count_str"] }}・{{ $searchdata["published_at_str"] }}
                                                </div>
                                            </div>
                                        </div>                            
                                    </li>
                                </div>
                            
                            @if ($index%5 == 4)
                                </ul>
                            @endif 

                            @endforeach

                            @if ($index%5 < 4)
                                </ul>
                            @endif   
                        
                        
                        @endfor
                    </div>

            </div>
        </div>
    </div>

    
    

    <!--共通フッター-->
    @component('components.commonFooterMenu')
    @endcomponent
    

</body>
</html>
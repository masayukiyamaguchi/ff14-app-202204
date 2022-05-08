<!DOCTYPE html>
<html lang="jp">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">

    <link rel="stylesheet" href="/css/moviesearch/channel.css">
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">
    <link rel="stylesheet" href="/css/moviesearch/mainmenu.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/moviesearch/channel.js"></script>
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

                </div>


                <!-- センター　-->
                <div class="mainContents_container_center">

                    

                     <!-- 動画リスト部分　-->
                     <div class="movie_list">

                        <div class="channel_header">
                            <div class="channel_header_box">
                                <img src="{{ $searchdatas[0]["channel_header_img"] }}" alt="">
                            </div>
                        </div>

                        <div class="channel_channelname">
                            <div class="channel_channelname_detail">
                                <div class="channel_channelname_detail_samneil">
                                    <img src="{{ $searchdatas[0]["channel_img"] }}" alt="">                                    
                                </div>
                                <div  class="channel_channelname_detail_text">
                                    <div   class="channel_channelname_detail_text_channelname">
                                        {{ $searchdatas[0]["channel_name"] }}　さんの登録動画一覧
                                    </div>
                                    <div   class="channel_channelname_detail_text_channelnum">
                                        チャンネル登録者数　{{ $searchdatas[0]["member_num_str"] }}
                                    </div>
                                </div>
                            </div>                           
                        </div>

                            <div class="movie_list_num">
                                登録動画数　{{ count($searchdatas) }}件
                            </div>

                            @foreach ($searchdatas as $index => $searchdata)
                            
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
                                                        <div data-id="{{ $searchdata["movie_id"] }}" class="movie_list_favorite" style="color: rgb(251, 255, 0);">
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
                        
                        
                        
                    </div>

            </div>
        </div>
    </div>

    
    

    <!--共通フッター-->
    @component('components.commonFooterMenu')
    @endcomponent
    

</body>
</html>
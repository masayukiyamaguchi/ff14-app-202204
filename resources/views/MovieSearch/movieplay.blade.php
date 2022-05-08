<!DOCTYPE html>
<html lang="jp">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">

    <link rel="stylesheet" href="/css/moviesearch/movieplay.css">
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/moviesearch/movieplay.js"></script>



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
                <div class="mainContents_container_left">

                    <div class="mainContents_container_left_contents">
                        
                        
                        <div  class="main_movie_iflame_wrap">
                        <div class="main_movie_iflame">
                            <iframe 
                                id="main_movie_iflame_id"
                                width="1280" 
                                height="720" 
                                src="https://www.youtube.com/embed/{{ $id }}?enablejsapi=1&autoplay=1"
                                title="YouTube video player" 
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        </div>

                        {{-- ヌルディヴ --}}
                        <div id="iflame_null_div">↓スワイプでTOPへ</div>
                        <div class="iflame_fullscreen_guide">動画右下<br>□から<br>ﾌﾙｽｸﾘｰﾝ<br>推奨です</div>

                        <div class="main_movie_detail">

                            <div class="main_movie_detail_title">
                                {{ $all["movie_title"] }}
                            </div>

                            <div class="main_movie_detail_undertitle">
                                <div class="main_movie_detail_view_count">
                                    {{ $all["view_count_numformat"] }} 回視聴・{{ $all["published_at_str"] }}
                                </div>
                                <div data-id="{{ $all["movie_id"] }}" class="movie_list_favorite">
                                    <span class="movie_list_favorite_span">お気に入りに登録</span>
                                </div>
                            </div>

                            <div class="main_movie_detail_channelinfo_border">
                                <div class="main_movie_detail_channelinfo">                                
                                    <div class="main_movie_detail_channelinfo_channelicon">
                                        <img src="{{ $all["channel_img"] }}" alt="">
                                    </div>

                                    <div class="main_movie_detail_channelinfo_text">                                    
                                        <div class="main_movie_detail_channelinfo_text_channelname">                                            
                                            <a href="/moviesearch/channnel/{{ $all["channel_id"] }}">
                                                {{ $all["channel_name"] }}
                                            </a>
                                        </div>

                                        <div class="main_movie_detail_channelinfo_member_num">
                                            チャンネル登録者数 {{ $all["member_num_str"] }}
                                        </div>
                                    
                                        <div class="channelinfo_text_moviediscription_display_button">動画概要を表示</div>

                                        <div class="main_movie_detail_channelinfo_text_moviediscription">
                                            {!! nl2br(e($all["movie_discription"])) !!}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                        </div>


                        <div class="channel_list_div">
                            
                            <!--ムービーリスト　-->
                            <div class="channel_list">

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
                                                        <div class="movie_list_favoritestar_div">
                                                            <div data-id="{{ $searchdata["movie_id"] }}" class="movie_list_favoritestar">
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
                


                <!-- センター　-->
                <div class="mainContents_container_center">

                    <div class="searchlist_h1">
                        フィルター済み動画リスト
                    </div>

                    <div class="searchlist">
                        <div class="searchlist_contents">

                            


                        </div>

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
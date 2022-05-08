$(function() {

    var leftMenuColor = "rgb(24, 24, 24)";
    var leftMenuColrOnMouse = "rgb(56, 56, 56)";
    var mainContentsColor = "rgb(33, 33, 33)";
    var colorRed = "rgb(165, 42, 42)";
    var colorBlue = "rgb(42, 50, 165)";
    var colorGray = "#444444";

    //コンテンツを検索
    var activeSeries = $(".sp_scroll_area div").eq(0).attr("id");
    var activePart = $(".left_menu_h2 span").attr("data-activePart");
    var activeLeftMenu = 0;
    var dataContents = $(".left_menu_ul li").eq(0).attr("data-contents");

    var sort_view_count = "DESC";
    var sort_published_at = "NONE";
    var filter_bool_vc = "NONE";
    var filter_string_guide = "NONE";
    var filter_bool_clear = "NONE";
    var filter_bool_act = "NONE";
    var filter_language = "NONE";

    var filter_play_job = [
        "paladin",
        "warrior",
        "darkknight",
        "gunbreaker",
        "monk",
        "dragoon",
        "ninja",
        "samurai",
        "reaper",
        "whitemage",
        "scholar",
        "astrologian",
        "sage",
        "bard",
        "machinist",
        "dancer",
        "blackmage",
        "summoner",
        "redmage",
        "bluemage",
        "NONE"
    ];

    var all_jobs = ["paladin","warrior","darkknight","gunbreaker","monk","dragoon","ninja","samurai","reaper","whitemage","scholar","astrologian","sage","bard","machinist","dancer","blackmage","summoner","redmage","bluemage","NONE"];
    var jobNum = all_jobs.length;


    var favorite_movie_array = ["NONE"];


    //レフトメニューオンマウス
    $(".left_menu_h2").hover(
        function(){
            $(this).css("background-color",leftMenuColrOnMouse);
        },
        function(){
            if($(this).next("ul").css("display")!="block")
            {
                $(this).css("background-color",leftMenuColor);
            }            
    });


    //レフトメニューオンマウス(子要素)
    $(".left_menu_ul li").hover(
        function(){
            $(this).css("background-color",leftMenuColrOnMouse);
        },
        function(){
            if($(".left_menu_ul li").index(this) != activeLeftMenu)
            {
                $(this).css("background-color",leftMenuColor);
            }
    });

    //レフトメニュークリック(子要素)
    $(".left_menu_ul li").click(function()
    {
        //アクティブの位置を記憶
        activeLeftMenu = $(".left_menu_ul li").index(this);
        //とりあえず自分以外の全部のメニューの背景を消す
        $(".left_menu_ul li").css("background-color",leftMenuColor);
        //自分だけ色を付ける
        $(this).css("background-color",leftMenuColrOnMouse);

        //何をクリックされたかを取得
        activeSeries = $(this).parent().parent().attr("id");
        activePart = $(this).parent().prev().find("span").attr("data-activePart");
        dataContents = $(this).attr("data-contents");

        //ローカルストレージ保存
        localStorage["activeSeries"] = activeSeries;
        localStorage["activePart"] = activePart;
        localStorage["dataContents"] = dataContents;

        //ajax
        AjaxMenuClick();

    })

   
    //レフトメニュークリック
    $(".left_menu_h2").click(function()
    {
        //とりあえず自分以外の全部のメニューの背景を消す
        $(this).siblings(".left_menu_h2").css("background-color",leftMenuColor);

        //開いていたら
        if($(this).next("ul").css("display")=="block")
        {
            //動かないほうがかっこいいのでこれで
            //$(this).next("ul").slideUp(200);

        //閉じてたら
        }else{
            
            $(".left_menu_ul").slideUp(200);
            $(this).next("ul").slideDown(200);
        }
    
    });


    //非同期処理
    function AjaxMenuClick()
    {
        localStorage["sort_view_count"] = sort_view_count;
        localStorage["sort_published_at"] = sort_published_at;
        localStorage["filter_bool_vc"] = filter_bool_vc;
        localStorage["filter_string_guide"] = filter_string_guide;
        localStorage["filter_bool_clear"] = filter_bool_clear;
        localStorage["filter_bool_act"] = filter_bool_act;
        localStorage["filter_language"] = filter_language;
        filter_play_job_json = JSON.stringify(filter_play_job, undefined, 1);
        localStorage["filter_play_job"] =  filter_play_job_json;

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },//Headersを書き忘れるとエラーになる
            url: '/moviesearch/moviesearchajax',
            type: 'post',
            dataType: "json",
            data: {
                dataContents:dataContents,
                sort_view_count:sort_view_count,
                sort_published_at:sort_published_at,
                filter_bool_vc:filter_bool_vc,
                filter_bool_act:filter_bool_act,
                filter_play_job:filter_play_job,
                filter_string_guide:filter_string_guide,
                filter_bool_clear:filter_bool_clear,
                filter_language:filter_language,
              },
        })
        // Ajaxリクエスト成功時の処理
        .done(function(data) {
            // Laravel内で処理された結果がdataに入って返ってくる
            RemakeMovieList(data);

            //内容を記録しておく
            filterData = data;

        })
        // Ajaxリクエスト失敗時の処理
        .fail(function(data) {
            //alert('Ajaxリクエスト失敗');
        });
    }

    //ajax後にページを再生成
    function RemakeMovieList(data)
    {
        $(".movie_list").empty();

        $.each(data,function(index,data){

        //枠形成
        if(index%4==0){
            $('.movie_list').last().append('<ul class="movie_list_ul">');
        }        
        $('.movie_list_ul').last().append('<div class="movie_list_div">');
        $('.movie_list_div').last().append('<li>');
        $('.movie_list_div li').last().append('<div class="movie_list_samneil">');
        $('.movie_list_samneil').last().after('<div class="movie_list_detail">');
        $('.movie_list_detail').last().append('<div class="movie_list_detail_channelicon">');
        $('.movie_list_detail_channelicon').last().after('<div class="movie_list_detail_text">');
        $('.movie_list_detail_text').last().append('<div class="movie_list_detail_text_title">');


        $('.movie_list_detail_text').last().append('<div class="movie_list_detail_text_channelname_div">');

        $('.movie_list_detail_text_channelname_div').last().append('<div class="movie_list_detail_text_channelname">');
        $('.movie_list_detail_text_channelname_div').last().after('<div class="movie_list_detail_view_count">');
        $('.movie_list_detail_text_channelname').last().after('<div class="movie_list_favorite_div">');
        $('.movie_list_favorite_div').last().append('<div data-id="'+data["movie_id"]+'" class="movie_list_favorite">');

        //コンテンツ生成
        $('.movie_list_samneil').last().append('<img src="'+data["samneil_img"]+'" alt="'+data["movie_title"]+'">');
        $('.movie_list_samneil img').last().wrap('<a href="/moviesearch/'+data["movie_id"]+'/">');

        $('.movie_list_detail_channelicon').last().append('<img src="'+data["channel_img"]+'" alt="'+data["movie_title"]+'">');

        $('.movie_list_detail_text_title').last().append('<a href="/moviesearch/'+data["movie_id"]+'/">'+data["movie_title"]+'</a>');
        
        $('.movie_list_detail_text_channelname').last().append(data["channel_name"]);
        $(".movie_list_favorite").last().append("★");

        $('.movie_list_detail_view_count').last().append(data["view_count_str"]+"・"+data["published_at_str"]);

        

        });

        //スターに色を付ける
        StarCheck();

    }

    //スターに色を付ける
    function StarCheck(){
        if(localStorage["favorite_movie"] != null){
            favorite_movie_json = localStorage["favorite_movie"];
            favorite_movie = JSON.parse(favorite_movie_json);        
            
            favorite_movie.forEach(movie_id => {     
                $('[data-id="'+movie_id+'"]').css("color","rgb(251, 255, 0)");
            });
        }
    }


    //★マーククリック
    $(document).on("click",".movie_list_favorite",function(){        

        favorite_movie_json = localStorage["favorite_movie"];

        if(favorite_movie_json == null){
            favorite_movie_array = ["NONE"];
        }else{
            favorite_movie_array = JSON.parse(favorite_movie_json);
        }

        //off
        if($(this).css("color") == "rgb(251, 255, 0)")
        {
            $(this).css("color","rgb(107, 107, 107)");

            var removals = [$(this).attr("data-id")];
            favorite_movie_array = favorite_movie_array.filter(function(v){
              return ! removals.includes(v);
            });

            $("#pop").text("★解除しました。");
            $("#pop").css("background-color",colorBlue);

        //on
        }else{
            $(this).css("color","rgb(251, 255, 0)");

            //バグ防止のため存在を確認
            if($.inArray($(this).attr("data-id"), favorite_movie_array)<0){
                favorite_movie_array.push($(this).attr("data-id"));
            };
            
            $("#pop").text("★追加しました！");
            $("#pop").css("background-color",colorRed);
        }

        //ストレージに保存
        favorite_movie_array.sort();
        favorite_movie_json = JSON.stringify(favorite_movie_array, undefined, 1);
        localStorage["favorite_movie"] =  favorite_movie_json;

    });

    //★hoverポップ
    $(document).on("mouseenter", ".movie_list_favorite", function (eo) {
        var text = '<div id="pop">★お気に入りに追加します</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", ".movie_list_favorite", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //お気に入りリスト
    $(document).on("mouseenter", "#left_menu_favorite", function (eo) {
        var text = '<div id="pop">登録した「お気に入り」リスト一覧ページ</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#left_menu_favorite", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});


    //フィルタージョブ
    $(document).on("mouseenter", "#filter_play_job", function (eo) {
        var text = '<div id="pop">プレイしているジョブを選択できます</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#filter_play_job", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルターVC
    $(document).on("mouseenter", "#filter_bool_vc", function (eo) {
        var text = '<div id="pop">ボイスチャットが動画にあり／なし</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#filter_bool_vc", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

     //フィルター解説
     $(document).on("mouseenter", "#filter_string_guide", function (eo) {
        var text = '<div id="pop">攻略の解説が動画にあり／なし</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#filter_string_guide", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルター解説ALL
    $(document).on("mouseenter", "#guide_none", function (eo) {
        var text = '<div id="pop">すべての動画を選択</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#guide_none", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルター解説ゆっくり
    $(document).on("mouseenter", "#guide_yukkuri", function (eo) {
        var text = '<div id="pop">ゆっくり音源による解説です。</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#guide_yukkuri", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルター本人解説
    $(document).on("mouseenter", "#guide_jigoe", function (eo) {
        var text = '<div id="pop">投稿者の声による音声解説です。</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#guide_jigoe", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルター字幕のみ
    $(document).on("mouseenter", "#guide_jimaku", function (eo) {
        var text = '<div id="pop">字幕のみで音声はない解説です。</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#guide_jimaku", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルター解説なし
    $(document).on("mouseenter", "#guide_nonevoice", function (eo) {
        var text = '<div id="pop">解説はないプレイ動画です。</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#guide_nonevoice", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルターDPS表示
    $(document).on("mouseenter", "#filter_bool_act", function (eo) {
        var text = '<div id="pop">DPS（ACT）の表示が動画にあり／なし</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#filter_bool_act", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルターDPS表示
    $(document).on("mouseenter", "#filter_bool_clear", function (eo) {
        var text = '<div id="pop">クリアー動画か、全滅または時間切れ動画か</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#filter_bool_clear", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルターDPS表示
    $(document).on("mouseenter", "#filter_language", function (eo) {
        var text = '<div id="pop">動画の言語表記が日本語／ENGLISH</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#filter_language", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルターDPS表示
    $(document).on("mouseenter", "#sort_view_count", function (eo) {
        var text = '<div id="pop">再生回数（多い／少ない）順に並び替えをします</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#sort_view_count", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

     //フィルターDPS表示
     $(document).on("mouseenter", "#sort_published_at", function (eo) {
        var text = '<div id="pop">投稿日（新しい／古い）順に並び替えをします</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#sort_published_at", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

    //フィルター×
    $(document).on("mouseenter", "#filter_delete", function (eo) {
        var text = '<div id="pop">全てのフィルターを解除します（全ての動画を表示）</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", "#filter_delete", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});


    //ポップアクション　関数
    function MouseHoverText(eo,text){
        $('body').append(text);
        $('#pop').show();
        $(window).mousemove( function(e){
            var x = e.pageX;
            var y = e.pageY-40;
            $('#pop').css({left:x+'px',top:y+'px','z-index':'100'});
        });
    }



    $(".left_menu_h1").click(function(){

        var clickVarsionName = $(this).parent().attr("id");

        //前ぐ暗くしてから、クリックを明るくする
        $(".left_menu_h1 img").css("opacity","");
        $(this).children("img").css("opacity","1.0");
        
        //開いていたら
        if($("#"+clickVarsionName+" .left_menu_h2").css("display")=="block")
        {
            //動かないほうがかっこいいのでこれで
            //$("#"+clickVarsionName+" .left_menu_h2,.left_menu_ul").slideUp(200);
        
        //閉じてたら
        }else
        {
            $(".left_menu_h2,.left_menu_ul").slideUp(200);
            $("#"+clickVarsionName+" .left_menu_h2").slideDown(200);

        }


    });


    //クラス名を受け取り、displayを逆に変更
    function ChangeDisplayCss(className)
    {
        if($(className).css("display")=="none")
        {
            $(className).css("display","block");
        }else
        {
            $(className).css("display","none");
        }
    }


    //moviepostページのjs
    //コンテンツの変更
    $(".contents_input_version").change(function()
    {
        //１段目バージョンを変更　取得
        var dataVersion =  $('.contents_input_version option:selected').val();

        //いったん全部消す
        $(".contents_input_contentsname option").css("display","none");
        //選んだバージョンだけ表示
        $(".contents_input_contentsname").find("."+dataVersion).css("display","block");
        //一番上の選択肢をセット
        var contentsname = $(".contents_input_contentsname").find("."+dataVersion).first().val();
        $("#contentsname").val(contentsname);
        $(".contents_input_contentsname").change();
    });

    $(".contents_input_contentsname").change(function ()
    {
        //１段目バージョンを変更　取得
        var contentsname =  $('.contents_input_contentsname option:selected').val();
        //いったん全部消す
        $(".contents_input_contents option").css("display","none");
        //選んだバージョンだけ表示
        $(".contents_input_contents").find("."+contentsname).css("display","block");
        //一番上の選択肢をセット
        var contents = $(".contents_input_contents").find("."+contentsname).first().val();
        $("#contents").val(contents);  
    });


    //ボタンホバーアニメーション
    $(".movie_list_filter_button").hover(function(){
        if($(this).css("background-color") != 'rgb(165, 42, 42)' && $(this).css("background-color") != 'rgb(42, 50, 165)')
        {
            $(this).animate(
                {
                  'backgroundColor': '#636363'
                }, 1
              );
        }        
    },
    function(){
        if($(this).css("background-color") != 'rgb(165, 42, 42)' && $(this).css("background-color") != 'rgb(42, 50, 165)')
        {
            $(this).animate(
                {
                  'backgroundColor': '#444444'
                }, 1
              );
        }        
    });



    //フィルターメニュー
    //ソート：ジョブ
    $(document).on('click',function(e) {

        if(!$(e.target).closest('#filter_play_job,.filter_play_job_menu').length) {

            //ターゲット外で例外を追加　↓これはajaxしない
            if(e.target.className == "movie_list_favorite")
            {
                return 0;
            }
            
            // ターゲット要素の外側をクリックした時の操作            
            $(".filter_play_job_menu > div").slideUp(100);
            
            //スクロール解除
            bodyFixReset(); 
            
            //フィルターの表示を変更
            FilterJobChange();

            //ajax
            AjaxMenuClick();

        } else {
            // ターゲット要素をクリックした時の操作
            //決定ボタンは無視する
            if(e.target.className == "enter_text" || e.target.className == "filter_play_job_menu_enter_button")
            {
                //スクロール解除
                bodyFixReset(); 
            }else{
                $(".filter_play_job_menu > div").slideDown(100);
                //スクロール禁止
                bodyFix();
            }            
        }
    });

    //以下、bodyを固定する関数
    var bodyElm = $('body');
    var scrollPosi;

    function bodyFix() {
      scrollPosi = $(window).scrollTop();
      bodyElm.css({
        'position': 'fixed',
        'width': '100%',
        'z-index': '1',
        'top': -scrollPosi
      });
    }
    
    //以下、body固定を解除する関数
    function bodyFixReset() {
      bodyElm.css({
        'position': 'relative',
        'width': 'auto',
        'top': 'auto'
      });
      //scroll位置を調整
      $('html, body').scrollTop(scrollPosi);
    }






    //フィルターの表示を変更
    function FilterJobChange(){
        if(filter_play_job.length < jobNum)
        {
            $("#filter_play_job").text("ジョブ:一部");
            $("#filter_play_job").css("background-color","rgb(42, 50, 165)");            
        }else{
            $("#filter_play_job").text("ジョブ:ALL");
            $("#filter_play_job").css("background-color","#444444");
            
        }
    }



    //引数の配列のジョブを削除
    function DeleteJobList(deletejoblist)
    {
        filter_play_job = filter_play_job.filter(function(v){
            return ! deletejoblist.includes(v);
        });
    }

    //引数の配列のジョブを追加
    function AddJobList(addjoblist)
    {
        filter_play_job = filter_play_job.concat(addjoblist);
    }

    //アイコンクリック
    $(".play_job_icon").click(function(){

        //裏の変数の調整
        var jobdata = $(this).attr("data-job");
        JobListScrutiny(jobdata);

        //アイコンの見え方変更
        PlayJobIconChange(jobdata);
          
   });

   //アイコン見た目変更
   function PlayJobIconChange(jobdata)
   {
        //アイコン見た目変更
        if($("[data-job="+jobdata+"]").attr("data-stat") == "on")
        {
            $("[data-job="+jobdata+"]").attr("data-stat","off");
            $("[data-job="+jobdata+"]").css("filter","opacity(20%)")
        }else{
            $("[data-job="+jobdata+"]").attr("data-stat","on");
            $("[data-job="+jobdata+"]").css("filter","opacity(100%)")
        }      
   }



   //アイコンホバー
   $(".play_job_icon").hover(function(){
       if($(this).attr("data-stat") == "on"){
           //オンの時　のる
            $(this).css("filter","brightness(200%) opacity(100%)");
       }else{
           //オフの時　のる
            $(this).css("filter","brightness(200%) opacity(20%)");
       }
        
   },
   function(){
       if($(this).attr("data-stat") == "on"){
            //オンの時　はなれる
            $(this).css("filter","brightness(100%) opacity(100%)");
       }else{
            //オフの時　はなれる
            $(this).css("filter","brightness(100%) opacity(20%)");
       }
        
   });


   //アイコンホバー 見出し
   //アイコンホバー 見出し
   $(".filter_play_job_menu_div_titletank").hover(function(){
        //オンの時　のる
        $(this).css("background-color","rgb(47, 0, 255)");
   },
   function(){
        //オンの時　はなれる
        $(this).css("background-color","rgb(25, 0, 134)");
       }        
   );

   $(".filter_play_job_menu_div_titlehealer").hover(function(){
    //オンの時　のる
        $(this).css("background-color","rgb(0, 155, 46)");
    },
    function(){
        //オンの時　はなれる
        $(this).css("background-color","rgb(0, 116, 35)");
       }        
    );

    $(".filter_play_job_menu_div_titledps").hover(function(){
    //オンの時　のる
        $(this).css("background-color","rgb(255, 0, 0)");
    },
    function(){
        //オンの時　はなれる
        $(this).css("background-color","rgb(141, 0, 0)");
       }        
    );
    
    $(".filter_play_job_menu_div_titlemelee,.filter_play_job_menu_div_titlerange,.filter_play_job_menu_div_titlecaster").hover(function(){
    //オンの時　のる
        $(this).css("background-color","rgba(255, 0, 0)");
    },
    function(){
        //オンの時　はなれる
        $(this).css("background-color","rgba(128, 0, 0, 0.5)");
       }        
    );

    $(".filter_play_job_menu_all_button_active_button").hover(function(){
    //オンの時　のる
        $(this).css("background-color","rgb(255, 0, 0)");
    },
    function(){
        //オンの時　はなれる
        $(this).css("background-color","rgba(255, 0, 0, 0.25)");
       }        
    );

    $(".filter_play_job_menu_all_button_inactive_button").hover(function(){
    //オンの時　のる
        $(this).css("background-color","rgba(4, 0, 255)");
    },
    function(){
        //オンの時　はなれる
        $(this).css("background-color","rgba(4, 0, 255, 0.25)");
       }        
    );

    $(".filter_play_job_menu_enter_button").hover(function(){
    //オンの時　のる
        $(this).css("background-color","rgb(255, 255, 255)");
    },
    function(){
        //オンの時　はなれる
        $(this).css("background-color","rgba(255, 255, 255, 0.377)");
       }        
    );



   
    //存在するかどうか確認と削除
    function JobListScrutiny(jobdata)
    {
        //存在する
        if($.inArray(jobdata,filter_play_job)>-1)
        {
            DeleteJobList(jobdata);
            return true;

        //存在しない
        }else{
            AddJobList(jobdata);
            return false;
        }
    }


    //見出しクリック時のアクション
    $(".filter_play_job_menu_div_titletank").click(function(){
        var JobList = ["paladin","warrior","darkknight","gunbreaker"];
        HClickAction(JobList,0);
    });

    $(".filter_play_job_menu_div_titlehealer").click(function(){
        var JobList = ["whitemage","scholar","astrologian","sage"];
        HClickAction(JobList,0);
    });

    $(".filter_play_job_menu_div_titledps").click(function(){
        var JobList =  ["monk","dragoon","ninja","samurai","reaper","bard","machinist","dancer","blackmage","summoner","redmage","bluemage"];
        HClickAction(JobList,0);
    });

    $(".filter_play_job_menu_div_titlemelee").click(function(){
        var JobList = ["monk","dragoon","ninja","samurai","reaper"];
        HClickAction(JobList,0);
    });

    $(".filter_play_job_menu_div_titlerange").click(function(){
        var JobList = ["bard","machinist","dancer",];
        HClickAction(JobList,0);
    });

    $(".filter_play_job_menu_div_titlecaster").click(function(){
        var JobList = ["blackmage","summoner","redmage","bluemage"];
        HClickAction(JobList,0);
    });

    $(".filter_play_job_menu_all_button_active_button").click(function(){
        var JobList = ["paladin","warrior","darkknight","gunbreaker","monk","dragoon","ninja","samurai","reaper","whitemage","scholar","astrologian","sage","bard","machinist","dancer","blackmage","summoner","redmage","bluemage"];
        HClickAction(JobList,1);
    });

    $(".filter_play_job_menu_all_button_inactive_button").click(function(){
        var JobList = ["paladin","warrior","darkknight","gunbreaker","monk","dragoon","ninja","samurai","reaper","whitemage","scholar","astrologian","sage","bard","machinist","dancer","blackmage","summoner","redmage","bluemage"];
        HClickAction(JobList,2);
    });

    $(".filter_play_job_menu_enter_button div").click(function(){
        
        //フィルターの表示を変更
        FilterJobChange();

        //ajax
        AjaxMenuClick();
        $(".filter_play_job_menu > div").slideUp(100);

    });



    //見出しクリックの動作関数
    function HClickAction(JobList,allFlag){

        var existCount = 0;
        var existJob = [];
        var notExistJob = [];
        
        JobList.forEach(job => {
            if(JobListScrutinyArray(job))
            {
                existJob.push(job);
                existCount++
            }else
            {                
                notExistJob.push(job);
            }            
        });

        //全て〇〇の場合
        if(allFlag == 1)
        {
            //notExistJobをオンにする
            AddJobList(notExistJob);
            JobIconChange(notExistJob);
            return 0;
        }else if(allFlag == 2){
            //existJobをオフにする
            DeleteJobList(existJob);
            JobIconChange(existJob);
            return 0;
        }



        if(existCount == 0)
        {
            //全部オンにする
            AddJobList(JobList);
            JobIconChange(JobList);

        }else if(existCount == JobList.length)
        {
            //全部オフにする
            DeleteJobList(JobList);
            JobIconChange(JobList);

        }else
        {
            //notExistJobをオンにする
            AddJobList(notExistJob);
            JobIconChange(notExistJob);
        }

    };

    
    //存在するかどうか(配列)
    function JobListScrutinyArray(jobdatas)
    {
        //存在する
        if($.inArray(jobdatas,filter_play_job)>-1)
        {
            return true;

        //存在しない
        }else{
            return false;
        }

    }

    //配列を受け取って、アイコンを　オン⇔オフにする
    function JobIconChange(joblist)
    {
        joblist.forEach(job => {
            //スペースを削除
            job = job.replace(/ /g, "");

            //オンの時　オフにする
            if($("[data-job="+job+"]").attr("data-stat") == "on"){
                $("[data-job="+job+"]").attr("data-stat","off");
                $("[data-job="+job+"]").css("filter","brightness(100%) opacity(20%)");
            }else{
            //オフの時　オンにする
                $("[data-job="+job+"]").attr("data-stat","on");
                $("[data-job="+job+"]").css("filter","brightness(100%) opacity(100%)");
            }
            
        });
    }




    //ソート：再生回数
    $("#sort_view_count").click(function(){
        
        //ソートステータスを１つ進める
        sort_view_count = sortButtonCheck(sort_view_count);
        
        //表示の変更
        SortViewCountDisplay(sort_view_count);

        //ほかのソートを調整        
        sort_published_at = "NONE";
        $("#sort_published_at").text("投稿日");
        $("#sort_published_at").css("background-color",colorGray);


        //ajax
        AjaxMenuClick();
    
    });

    //表示の変更
    function SortViewCountDisplay(sort_view_count)
    {
        //表示の変更
        switch(sort_view_count)
        {            
            case "DESC":
                $("#sort_view_count").text("再生回数：多い");
                $("#sort_view_count").css("background-color",colorRed);
                break;

            case "ASC":
                $("#sort_view_count").text("再生回数：少い");
                $("#sort_view_count").css("background-color",colorBlue);
                break;   
                
            case "NONE":
                $("#sort_view_count").text("再生回数");
                $("#sort_view_count").css("background-color",colorGray);
                break;
        }
    }


    
    //ソート：投稿日
    $("#sort_published_at").click(function(){

        sort_published_at = sortButtonCheck(sort_published_at);

        SortPublishedAtDisplay(sort_published_at);

        sort_view_count = "NONE";
        $("#sort_view_count").text("再生回数");
        $("#sort_view_count").css("background-color",colorGray);

        //ajax
        AjaxMenuClick();

    });


    //表示の変更
    function SortPublishedAtDisplay(sort_published_at)
    {
        switch(sort_published_at)
        {            
            case "DESC":
                $("#sort_published_at").text("投稿日：新しい");
                $("#sort_published_at").css("background-color",colorRed);
                SortViewCountDisplay("NONE");
                break;

            case "ASC":
                $("#sort_published_at").text("投稿日：古い");
                $("#sort_published_at").css("background-color",colorBlue);
                SortViewCountDisplay("NONE");
                break;       
                
            case "NONE":
                $("#sort_published_at").text("投稿日");
                $("#sort_published_at").css("background-color",colorGray);
                break;
        }
    }




    //フィルター：ボイスチャット
    $("#filter_bool_vc").click(function(){

        filter_bool_vc = filterButtonCheckBool(filter_bool_vc);

        BoolDisplayChange(filter_bool_vc,"#filter_bool_vc","VC：ALL","VC:あり","VC:なし");

        //ajax
        AjaxMenuClick();

    });    


    //フィルター：DPS表示
    $("#filter_bool_act").click(function(){

        filter_bool_act = filterButtonCheckBool(filter_bool_act);

        BoolDisplayChange(filter_bool_act,"#filter_bool_act","DPS表示:ALL","DPS表示:あり","DPS表示:なし");

        //ajax
        AjaxMenuClick();

    });

    //フィルター：クリアー
    $("#filter_bool_clear").click(function(){

        filter_bool_clear = filterButtonCheckBool(filter_bool_clear);

        BoolDisplayChange(filter_bool_clear,"#filter_bool_clear","クリアー:ALL","クリアー:踏破","クリアー:未クリア");

        //ajax
        AjaxMenuClick();

    });


    //フィルター：解説
    $(document).on('click',function(e) {
        if(!$(e.target).closest('#filter_string_guide').length) {
          // ターゲット要素の外側をクリックした時の操作
          $(".filter_string_guide_menu ul").slideUp(100);

           　//ここで例外を設定（ジョブアイコン部分）
            if(e.target.className.indexOf("filter_play_job_menu") >= 0 || e.target.className=="movie_list_filter_button"){                
                return 0;
            }else{
                bodyFixReset(); 
            }
                
          
        } else {
          // ターゲット要素をクリックした時の操作
          $(".filter_string_guide_menu ul").slideDown(100);
          bodyFix();
        }
     });

    //小メニュークリック時の動作
    $(".filter_string_guide_menu li").click(function(){
        var clickButtonValue = $(this).attr("data-value");

        StringGuideMenu(clickButtonValue);

        //ajax
        AjaxMenuClick();

    })

    //ディスプレイ変更(解説)
    function StringGuideMenu(clickButtonValue){        

        switch(clickButtonValue)
        {
            case "NONE":
                $("#filter_string_guide").css("background-color","#444444");
                filter_string_guide = "NONE";
                $("#filter_string_guide").text("解説:ALL");
                break;
            
            case "yukkuri":
                $("#filter_string_guide").css("background-color","rgb(165, 42, 42)");
                filter_string_guide = "yukkuri";
                $("#filter_string_guide").text("解説:ゆっくり");
                break;
            
            case "jigoe":
                $("#filter_string_guide").css("background-color","rgb(165, 42, 42)");
                filter_string_guide = "jigoe";
                $("#filter_string_guide").text("解説:本人");
                break;

            case "jimaku":
                $("#filter_string_guide").css("background-color","rgb(165, 42, 42)");
                filter_string_guide = "jimaku";
                $("#filter_string_guide").text("解説:字幕");
                break;

            case "nonevoice":
                $("#filter_string_guide").css("background-color","rgb(42, 50, 165)");
                filter_string_guide = "nonevoice";
                $("#filter_string_guide").text("解説:なし");
                break            
        }
    }

    //小メニューアニメーション
    $(".filter_string_guide_menu li").hover(function(){        
        var index = $(".filter_string_guide_menu li").index(this);
            if(index == 0)
            {
                $(this).animate(
                    {
                      'backgroundColor': '#636363'
                    }, 70
                  );
            }else if(index == 4)
            {
                $(this).animate(
                    {
                      'backgroundColor': 'rgb(42, 50, 165)'
                    }, 70
                  );
            }else{
                $(this).animate(
                    {
                      'backgroundColor': 'rgb(165, 42, 42)'
                    }, 70
                  );
            }
    },
    function(){
        $(this).animate(
            {
                'backgroundColor': '#444444'
            }, 70
        );
    });


    //フィルター：言語
    $("#filter_language").click(function(){

        filter_language = filterButtonCheckBool(filter_language);

        BoolDisplayChange(filter_language,"#filter_language","言語:ALL","言語:日本語","言語:ENGLISH");

        //ajax
        AjaxMenuClick();

    });

    //ディスプレイ変更関数
    function BoolDisplayChange(filter_bool,id_filter,c_none,c_true,c_false){
        switch(filter_bool)
        {            
            case "NONE":
                $(id_filter).text(c_none);
                $(id_filter).css("background-color","#444444");
                break;

            case "true":
                $(id_filter).text(c_true);
                $(id_filter).css("background-color","rgb(165, 42, 42)");
                break;
                
            case "false":
                $(id_filter).text(c_false);
                $(id_filter).css("background-color","rgb(42, 50, 165)");
                break;
        }
    }


    //フィルタークリアー
    $("#filter_delete").click(function(){
        filter_bool_vc = "NONE";
        filter_play_job = filter_play_job = ["paladin","warrior","darkknight","gunbreaker","monk","dragoon","ninja","samurai","reaper","whitemage","scholar","astrologian","sage","bard","machinist","dancer","blackmage","summoner","redmage","bluemage","NONE"];
        filter_string_guide = "NONE";
        filter_bool_clear = "NONE";
        filter_bool_act = "NONE";
        filter_language = "NONE";

        $("#filter_bool_vc").text("VC：ALL");
        $("#filter_bool_vc").css("background-color","#444444");
        $("#filter_string_guide").text("解説:ALL");
        $("#filter_string_guide").css("background-color","#444444");
        $("#filter_bool_act").text("DPS表示:ALL");
        $("#filter_bool_act").css("background-color","#444444");
        $("#filter_bool_clear").text("クリアー:ALL");
        $("#filter_bool_clear").css("background-color","#444444");
        $("#filter_language").text("言語:ALL");
        $("#filter_language").css("background-color","#444444");
        $(".play_job_icon").attr("data-stat","on");
        $(".play_job_icon").css("filter","opacity(100%)");

        //ajax
        AjaxMenuClick();
    })



    //ボタンの状態を逆にする
    function sortButtonCheck(sort_)
    {
        if(sort_ == "NONE")
        {
            sort_ = "DESC";
        }else if(sort_ == "DESC")
        {
            sort_ = "ASC";
        }else
        {
            sort_ = "DESC";
        }
        return sort_;
    }
    

    //ボタンの状態を変更する
    function filterButtonCheckBool(filter_)
    {
        if(filter_ == "NONE")
        {
            filter_ = "true";
        }else if(filter_ == "true")
        {
            filter_ = "false";
        }else
        {
            filter_ = "NONE";
        }
        return filter_;
    }



    //初回実行
    //最初のソートの色を調整
    $("#sort_view_count").css("background-color","rgb(165, 42, 42)");

    //ローカルストレージの内容を読み込む
    if(localStorage["activeSeries"] != null){
        activeSeries = localStorage["activeSeries"];
        $("#"+activeSeries).find("img").css("opacity","1.0");
        //$("#"+activeSeries+" img").trigger("click");
    }else{
        localStorage["activeSeries"] = activeSeries;
    }
    if(localStorage["activePart"] != null){
        activePart = localStorage["activePart"];
        //$("[data-activePart = "+activePart+" ]").trigger("click");
    }else{
        localStorage["activePart"] = activePart;
    }
    if(localStorage["dataContents"] != null){
        dataContents = localStorage["dataContents"];
        //$("[data-contents = "+dataContents+" ]").trigger("click");
        activeLeftMenu = $(".left_menu_ul li").index($("[data-contents = "+dataContents+" ]"));
    }else{
        localStorage["dataContents"] = dataContents;
    }
    if(localStorage["sort_view_count"] != null){
        sort_view_count = localStorage["sort_view_count"];
        SortViewCountDisplay(sort_view_count);
    }
    if(localStorage["sort_published_at"] != null){
        sort_published_at = localStorage["sort_published_at"];
        SortPublishedAtDisplay(sort_published_at);
    }
    if(localStorage["filter_bool_vc"] != null){
        filter_bool_vc = localStorage["filter_bool_vc"];
        BoolDisplayChange(filter_bool_vc,"#filter_bool_vc","VC：ALL","VC:あり","VC:なし");
    }
    if(localStorage["filter_string_guide"] != null){
        filter_string_guide = localStorage["filter_string_guide"];
        StringGuideMenu(filter_string_guide);
    }
    if(localStorage["filter_bool_clear"] != null){
        filter_bool_clear = localStorage["filter_bool_clear"];
        BoolDisplayChange(filter_bool_clear,"#filter_bool_clear","クリアー:ALL","クリアー:踏破","クリアー:未クリア");
    }
    if(localStorage["filter_bool_act"] != null){
        filter_bool_act = localStorage["filter_bool_act"];
        BoolDisplayChange(filter_bool_act,"#filter_bool_act","DPS表示:ALL","DPS表示:あり","DPS表示:なし");
    }
    if(localStorage["filter_language"] != null){
        filter_language = localStorage["filter_language"];
        BoolDisplayChange(filter_language,"#filter_language","言語:ALL","言語:日本語","言語:ENGLISH");
    }
    if(localStorage["filter_play_job"] != null){
        filter_play_job_json = localStorage["filter_play_job"];
        filter_play_job = JSON.parse(filter_play_job_json);
        
        all_jobs.forEach(job => {
            var num = 0            
            if($.inArray(job, filter_play_job)<0){
                PlayJobIconChange(job);
            }
        });

        if(filter_play_job.length < all_jobs.length){
            $("#filter_play_job").text("ジョブ:一部");
            $("#filter_play_job").css("background-color","rgb(42, 50, 165)");     
        }        
    }

    if(localStorage["favorite_movie"] == null){
        favorite_movie = ["NONE"];
        favorite_movie_json = JSON.stringify(favorite_movie, undefined, 1);
        localStorage["favorite_movie"] = favorite_movie_json;
    }


    //メインメニュー色付け
    $(".left_menu_home").css("background-color","rgb(56,56,56)");
    

    //最初のメニューは開いておく
    ChangeDisplayCss("#"+activeSeries+" .left_menu_h2"); 
    $("[data-activePart = "+activePart+" ]").parent().next().css("display","block");

    //最初のメニューは色を変える
    $("[data-activePart = "+activePart+" ]").parent().css("background-color",leftMenuColrOnMouse);
    $("[data-contents = "+dataContents+" ]").css("background-color",leftMenuColrOnMouse);
    
    //入力フォーム最初のバージョンをセット
    var version =  $('.contents_input_version option:selected').val();
    $("#version").val(version);
    $(".contents_input_version").change();

    //ajax
    AjaxMenuClick();

    $(".testbutton").click(function(){
        $('input[name="favorite_list"]').val("favorite_movie");
    });

    

    /* aタグpost */
    $('#favoritelist a').on('click', function(){

        favorite_movie_json = localStorage["favorite_movie"];
        favorite_movie = $.parseJSON(favorite_movie_json);
        
        $("input[name='favorite_list']").val(favorite_movie);

        var pageURL = $(this).attr('href');
        $('form').attr('action',pageURL);
        $('form').submit();

        return false;

    });



    // スマホメインメニュー
    //const targetElement = document.getElementById('globalMenu');

    $('.hamburger').click(function() {
        $(this).toggleClass('active');
 
        if ($(this).hasClass('active')) {
            $('.globalMenuSp').addClass('active');
            bodyScrollLock.disableBodyScroll(".globalMenuSp"); 
        } else {
            $('.globalMenuSp').removeClass('active');
            bodyScrollLock.clearAllBodyScrollLocks();
        }
    });


    $(".left_menu_ul li").click(function(){
        $('.hamburger').toggleClass('active');
        $('.globalMenuSp').removeClass('active');
        bodyScrollLock.clearAllBodyScrollLocks();
    });


    
    
});





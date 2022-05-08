$(function() {

    var colorRed = "rgb(165, 42, 42)";
    var colorBlue = "rgb(42, 50, 165)";
    var colorGray = "#444444";

    var favorite_movie_array = ["NONE"];


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

//リスト更新
$(document).on("mouseenter", "#list_fix", function (eo) {
    var text = '<div id="pop">★マークを整理した後にクリックすると内容が更新されます</div>';
    MouseHoverText(eo,text);
});
$(document).on("mouseleave", "#list_fix", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});

//リスト更新
$(document).on("mouseenter", "#list_share", function (eo) {
    var text = '<div id="pop">自分のお気に入りリストを他の人と共有できます。<br>固定の参考動画の共有などにご利用ください！</div>';
    MouseHoverText(eo,text);
});
$(document).on("mouseleave", "#list_share", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});


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


//共有URLボタン
$(".share_url_button").click(function(){
    
   AjaxMenuClick();


});


//非同期処理
function AjaxMenuClick()
{   
    var favorite_list_json = localStorage["favorite_movie"];
    favorite_list = JSON.parse(favorite_list_json);
    //localStorage["filter_play_job"] =  filter_play_job_json;

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },//Headersを書き忘れるとエラーになる
        url: '/moviesearch/favoriteajax',
        type: 'post',
        dataType: "json",
        data: {
            favorite_list:favorite_list,
          },
    })
    // Ajaxリクエスト成功時の処理
    .done(function(data) {
        // Laravel内で処理された結果がdataに入って返ってくる
        //内容を記録しておく
        filterData = data;

        //テキストエリアに共有URL表示
        favorite_share_url_active(filterData);


    })
    // Ajaxリクエスト失敗時の処理
    .fail(function(data) {
        //alert('Ajaxリクエスト失敗');
    });
}


//テキストエリアに共有URL表示
function favorite_share_url_active(){
    $('input[name="favorite_share_url"]').val("https://ff14-app.com/ms/"+filterData["random_url"]);
}

$(".favorite_share_url_copy button").click(function(){
    //　テキストエリアを選択
    $('input[name="favorite_share_url"]').select();
    // コピー
    document.execCommand('copy');
});


//★を黄色くする
function StarMarking(){
    favorite_movie = localStorage["favorite_movie"];
    favorite_movie = JSON.parse(favorite_movie);
    
    favorite_movie.forEach(movie_id => {
        $('[data-id="'+movie_id+'"]').css("color","rgb(251, 255, 0)");
    });    
}



    //読み込み時実行

    //メインメニュー色付け
    $(".left_menu_favorite").css("background-color","rgb(56,56,56)");


    //favorite_movie ストレージの内容は星に色を
    StarMarking();



    // スマホメインメニュー
    //const targetElement = document.getElementById('globalMenu');

    $('.hamburger').click(function() {
        $(this).toggleClass('active');
 
        if ($(this).hasClass('active')) {
            $('.globalMenuSp').addClass('active');
            bodyScrollLock.disableBodyScroll(".globalMenuSp"); 

        } else {
            $('.globalMenuSp').removeClass('active');
            bodyScrollLock.enableBodyScroll(".globalMenuSp");                       
            
        } 
    });


    $(".left_menu_ul li").click(function(){       
        if($(this).attr("class") != "share_url_button"){
            $('.hamburger').trigger("click");
        }
        
    });











});










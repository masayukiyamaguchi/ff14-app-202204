$(function () {

    var version;
    var contentsname;
    var contents;

    version = $("[name=version]").val();
    contentsname = $("[name=contentsname]").val();
    contents = $("[name=contents]").val();

    //初期設定
    $("." + version).removeClass("displaynone");
    $("." + contentsname).removeClass("displaynone");


    //バージョンを変更したら
    $("[name=version]").change(function () {
        ChangeSelectBoxVersion();
    });

    //コンテンツ名を変更したら
    $("[name=contentsname]").change(function () {
        ChangeSelectBoxContentsname();
    });


    function ChangeSelectBoxVersion() {
        //一回今の設定を削除
        $("." + version).addClass("displaynone");
        $("." + contentsname).addClass("displaynone");

        //新しく読み込み
        version = $("[name=version]").val();

        //新しくセット
        ChangeContentsName();
        ChangeContents();
    }

    function ChangeSelectBoxContentsname() {
        //一回今の設定を削除
        $("." + contentsname).addClass("displaynone");

        //新しく読み込み
        contentsname = $("[name=contentsname]").val();

        //新しくセット
        ChangeContents();
    }


    function ChangeContentsName() {
        $("." + version).removeClass("displaynone");
        $("[name=contentsname]").val($("." + version + ":first").val());
        contentsname = $("[name=contentsname]").val();
    }

    function ChangeContents() {
        $("." + contentsname).removeClass("displaynone");
        $("[name=contents]").val($("." + contentsname + ":first").val());
        contents = $("[name=contents]").val();
    }



    $(".search_word_button").on("click", function () {

        var search_text = $(".search_word_input").val();

        //ajaxでデータを受け渡し
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        $.ajax({
            //POST通信
            type: "post",
            //ここでデータの送信先URLを指定します。
            url: "/moviesearch/postlistdataaccess",
            dataType: "json",
            data: {
                search_text,
            },
        })

            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                console.log(data);

                for (i = 0; i < 50; i++) {
                    $(".samneil_div" + i).children("img").attr("src", data[i]["thumbnail"]);
                    $(".play_time" + i).text(data[i]["play_time"]);
                    $(".playlist_title" + i).text(data[i]["title"]);
                    $(".channnel_samneil" + i).children("img").attr("src", data[i]["channel_icon"]);
                    $(".playlist_detail_title" + i).text(data[i]["name"]);
                    $(".view_count" + i).text(data[i]["view_count"]);
                    $(".published_at" + i).text(data[i]["published_at"]);
                    $(".view_url" + i).text(data[i]["view_url"]);
                    $(".movie_id" + i).text(data[i]["id"]);
                }



            })

            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");
            });


    })




    // 動画を選択したら中央へ動画表示＆データ入力
    $('[class ^= "playlist_contents"]').on("click", function () {

        // クリックNO
        var clicknum = $(this).attr("click_num");

        // 動画URL
        var movie_id = $(".movie_id" + clicknum).text();
        $(".play_moniter").children("iframe").attr("src", "https://www.youtube.com/embed/" + movie_id);
        $(".input_movie_url_input").children("input").val("https://www.youtube.com/watch?v=" + movie_id);




    })


    // list送信
    $(".formfield_submit_button").on("click", function () {

        // 動作リセット
        $(".ajax_done").css("display", "none");
        $(".ajax_error").css("display", "none");


        var movie_url = $(".input_movie_url_input").children("input").val();

        var string_guide = $("#string_guide").val();
        var language = $("#language").val();

        if ($('input[name="bool_vc"]').prop('checked')) {
            var bool_vc = "on"
        }
        if ($('input[name="bool_clear"]').prop('checked')) {
            var bool_clear = "on"
        }
        if ($('input[name="bool_act"]').prop('checked')) {
            var bool_act = "on"
        }

        var play_job = $("#play_job").val();
        var version = $("#version").val();
        var contentsname = $("#contentsname").val();
        var contents = $("#contents").val();

        var bool_list = true;


        //ajaxでデータを受け渡し
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        $.ajax({
            //POST通信
            type: "post",
            //ここでデータの送信先URLを指定します。
            url: "/moviesearch/postcontents/create",
            dataType: "json",
            data: {
                movie_url,
                string_guide,
                language,
                bool_vc,
                bool_clear,
                bool_act,
                play_job,
                version,
                contentsname,
                contents,
                bool_list,
            },
        })

            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                console.log("done");
                $(".ajax_done").css("display", "block");

            })

            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");
                console.log(data);
                $(".ajax_error").css("display", "block");
            });


    })






    // 操作盤を移動
    var _isMoving = false; //移動中かどうかのフラグ true:移動中 false:停止中
    var _clickX, _clickY; //クリックされた位置
    var _position;         //クリックされた時の要素の位置

    //mousedownイベント
    $("#target").on("mousedown", function (e) {

        console.log("on");

        if (_isMoving) return; //移動中の場合は処理しない

        _isMoving = true; //移動中にする

        //クリックされた座標を保持します
        _clickX = e.screenX;
        _clickY = e.screenY;

        //クリックされた時の要素の座標を保持します
        _position = $("#target").position();
    });

    //mousemoveイベント
    $("#root").on("mousemove", function (e) {
        if (_isMoving == false) return; //移動中でない場合は処理しない

        //クリックされた時の要素の座標に、移動量を加算したものを、座標として設定します
        $("#target").css("left", (_position.left + e.screenX - _clickX) + "px");
        $("#target").css("top", (_position.top + e.screenY - _clickY) + "px");
    });

    //mouseupイベント
    $("#target").on("mouseup", function (e) {
        if (_isMoving == false) return; //移動中でない場合は処理しない

        _isMoving = false; //停止中にする
    });




});





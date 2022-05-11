$(function () {

    // 左メニュークリック時の動作
    $(".left_menu").children("div").click(function () {

        // 左メニューの動作
        var clickClass = $(this).attr("class");
        $(".left_menu").children().removeClass("left_menu_active");
        $("." + clickClass).addClass("left_menu_active");

        // 中央コンテンツの動作
        var tags = $(this).attr("tags");
        $(".mainContents_container_center").children().css("display", "none");
        $("." + tags).css("display", "block");

    });


    //PTジョブ設定
    $(".pt_membere_select").change(function () {
        var array_select_job = [];

        for (i = 1; i < 9; i++) {
            if ($("[name=pt_member" + i + "_job]").val() != null) {
                array_select_job.push($("[name=pt_member" + i + "_job]").val());
            }
        }

        console.log(array_select_job);

        if (existsSameValue(array_select_job)) {
            alert("ジョブの重複は対応していません");
            $(this).val('');
        }
    });


    // 重複確認
    function existsSameValue(a) {
        var s = new Set(a);
        return s.size != a.length;
    }


    // ボタンを押した時の動作
    $('button[class^="member_button"]').click(function () {
        var pt_num = $(this).attr("class").substr(-1);
        var select_job = $('[name=pt_member' + pt_num + '_job]').val();

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
            url: "/buffsimulator/ajax_access",
            dataType: "json",
            data: {
                select_job: select_job,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                // Laravel内で処理された結果がdataに入って返ってくる

                $("[name=pt_member" + pt_num + "_hit_point]").val(data["hp"]);
                $("[name=pt_member" + pt_num + "_physical_defenses]").val(data["pd"]);
                $("[name=pt_member" + pt_num + "_magical_defenses]").val(data["md"]);
                $("[name=pt_member" + pt_num + "_tenacity]").val(data["ten"]);
                $("[name=pt_member" + pt_num + "_mind]").val(data["mnd"]);
                $("[name=pt_member" + pt_num + "_weapon_damage]").val(data["wd"]);


            })
            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");

            });

    });


    // ストレージ保存
    $(".input_info_button").click(function () {

        for (i = 1; i < 9; i++) {
            localStorage.setItem("bs_pt_member" + i + "_job", $("[name=pt_member" + i + "_job]").val());
            localStorage.setItem("bs_pt_member" + i + "_hit_point", $("[name=pt_member" + i + "_hit_point]").val());
            localStorage.setItem("bs_pt_member" + i + "_physical_defenses", $("[name=pt_member" + i + "_physical_defenses]").val());
            localStorage.setItem("bs_pt_member" + i + "_magical_defenses", $("[name=pt_member" + i + "_magical_defenses]").val());
            localStorage.setItem("bs_pt_member" + i + "_tenacity", $("[name=pt_member" + i + "_tenacity]").val());
            localStorage.setItem("bs_pt_member" + i + "_mind", $("[name=pt_member" + i + "_mind]").val());
            localStorage.setItem("bs_pt_member" + i + "_weapon_damage", $("[name=pt_member" + i + "_weapon_damage]").val());
        }

    })



    // メニュー１クリック
    $(".left_menu1").click(function () {

        // スキルリストの情報を読み込み
        skillIconListFirstDone();

        // スキル対象リストを初期化
        $("[name=skill_list_one_select_name] > option").remove();
        $("[name=skill_list_one_select_name]").append($('<option selected disabled>').html("").val(""));

        // 使用スキル表示
        for (i = 1; i < 9; i++) {
            // PTメンバートップがジョブの名前になる
            var job_name = $("[name=pt_member" + i + "_job] option:selected").text();
            $(".contents1_job" + i).text(job_name);

            //スキルアイコン読み込み
            var dase_ual = "/images/buffsimulator/skillicon/";
            var job_eng = $("[name=pt_member" + i + "_job]").val();

            // スキル対象リストを挿入
            $("[name=skill_list_one_select_name]").append($('<option>').html(job_name).val(job_eng));

            //あとはここを1-12で回して、画像を設置する
            for (j = 1; j < 13; j++) {
                $(".skill_icon" + i).eq(j - 1).children("img").attr("src", dase_ual + job_eng + j + ".png");

            }
        }




    })


    // スキルボタンクリック
    $('button[class^="use_skl_button"]').click(function () {

        //クリックされたパーティーのナンバーを取得
        var pt_num = $(this).attr("class").substr(-1);


        //画像があるかどうか確認
        var skl_list_bool = $(".use_skl_bg" + pt_num).css("display");

        // 無い画像要素は削除
        judgeExistImage($("[name=pt_member" + pt_num + "_job]").val(), pt_num);



        if (skl_list_bool == "none") {
            $(".use_skl_bg" + pt_num).css("display", "block");
        } else {
            $(".use_skl_bg" + pt_num).css("display", "none");
        }
    });


    // 決定ボタンクリック
    $(".use_skl_done_button").click(function () {
        var pt_num = $(this).attr("class").substr(-1);
        $(".use_skl_bg" + pt_num).css("display", "none");
    })



    //特定エリア以外のクリックで実行
    $(".mainContents_container_center").on('click', function (e) {
        if (!$(e.target).closest('div[class^= "use_skl_bg"]').length) {
            if (!$(e.target).closest('button[class^= "use_skl_button"]').length) {
                // ターゲット要素の外側をクリックした時の操作
                $("div[class^='use_skl_bg']").css("display", "none");
            } else {
                // ターゲット要素をクリックした時の操作
            }
        } else {
            // ターゲット要素をクリックした時の操作
        }
    });


    // スキルアイコンのクリック
    $(".skill_icon").click(function () {

        // パーティーNO
        var pt_num = $(this).attr("class").substr(-1);

        // スキルNO
        var click_skill = $(this).children("img").attr("src");
        click_skill = click_skill.slice(0, -4);

        //2桁判定
        var skill_no = click_skill.substr(-2);
        if (!Number.isInteger(Number(skill_no))) {
            skill_no = skill_no.substr(-1);
        }

        if ($(this).children("img").hasClass("use_skl_click")) {
            $(this).children("img").removeClass("use_skl_click");

            // リストに表示
            $(".skill_icon_list" + pt_num).eq(skill_no - 1).css("display", "none");

        } else {
            $(this).children("img").addClass("use_skl_click");

            // リストに表示
            $(".skill_icon_list" + pt_num).eq(skill_no - 1).css("display", "block");

        }

    })


    // マウスの位置を監視
    document.body.addEventListener("mousemove", function (e) {

        //座標を取得する
        var mX = e.pageX;  //X座標
        var mY = e.pageY;  //Y座標
        var X_ad = 0; //調整

        //画面半分以上来たら表示の方向を変える
        if (mX > 960) {
            var X_ad = 410;
        }

        $(".skl_icon_sub").css("top", mY - 35);
        $(".skl_icon_sub").css("left", mX + 5 - X_ad);

    });


    // スキルアイコンのホバー
    $(".skill_icon").hover(function () {
        var icon_url = $(this).children("img").attr("src");

        icon_url = icon_url.slice(0, -4);
        iconsub_url = icon_url + "sub.png";

        $(".skl_icon_sub").children("img").attr("src", iconsub_url);
        $(".skl_icon_sub").css("visibility", "visible");

    }, function () {

        $(".skl_icon_sub").css("visibility", "hidden");

    });

    // スキルアイコンリストのホバー
    $(".skill_icon_l").hover(function () {
        var icon_url = $(this).attr("src");

        icon_url = icon_url.slice(0, -4);
        iconsub_url = icon_url + "sub.png";

        $(".skl_icon_sub").children("img").attr("src", iconsub_url);
        $(".skl_icon_sub").css("visibility", "visible");

    }, function () {

        $(".skl_icon_sub").css("visibility", "hidden");

    });

    // 元ダメージ計算
    $(".result_button_done").click(function () {

        // ログのダメージ（基本は最大HP-残HP）
        var damage_log = $("[name=pt_member1_hit_point]").val() - $("[name=pt_member1_Remain_hit_point]").val();

        // ダメージの属性
        var damage_att = $("#damage_att_select_id").val();
        // 属性に伴う防御力
        if (damage_att == "magic") {
            var damage_att_defense = $("[name=pt_member1_physical_defenses]").val()
        } else {
            var damage_att_defense = $("[name=pt_member1_magical_defenses]").val()
        }

        //防御力軽減率
        var f_DEF = Math.round(15 * damage_att_defense / 1900, 0) / 100

        //不屈軽減率
        var f_TEN = 1;

        //ダメージ乱数
        var f_RND = 1;

        //ダメージ軽減バフ
        var f_BUF = [1, 1, 1, 1];

        //与ダメ低下デバフ
        var f_DBUF = [1, 1, 1, 1];

        //バリア
        var f_BAR = [0, 0, 0, 0];

        // 次回このあたりのダメージ計算
        // 特に、バフデバフの考慮

        var original_damage_noBuff = Math.round(Math.round(damage_log / (1 - f_DEF) / (2 - f_TEN)) / f_RND);







    });
















    //ロード時の処理
    for (i = 1; i < 9; i++) {
        $("[name=pt_member" + i + "_job]").val(localStorage.getItem("bs_pt_member" + i + "_job"));
        $("[name=pt_member" + i + "_hit_point]").val(localStorage.getItem("bs_pt_member" + i + "_hit_point"));
        $("[name=pt_member" + i + "_physical_defenses]").val(localStorage.getItem("bs_pt_member" + i + "_physical_defenses"));
        $("[name=pt_member" + i + "_magical_defenses]").val(localStorage.getItem("bs_pt_member" + i + "_magical_defenses"));
        $("[name=pt_member" + i + "_tenacity]").val(localStorage.getItem("bs_pt_member" + i + "_tenacity"));
        $("[name=pt_member" + i + "_mind]").val(localStorage.getItem("bs_pt_member" + i + "_mind"));
        $("[name=pt_member" + i + "_weapon_damage]").val(localStorage.getItem("bs_pt_member" + i + "_weapon_damage"));
    }



    // スキル一覧
    function skillIconListFirstDone() {
        for (i = 1; i < 9; i++) {
            // PTメンバートップがジョブの名前になる
            var job_name = $("[name=pt_member" + i + "_job] option:selected").text();
            $(".contents1_job" + i).text(job_name);

            //スキルアイコン読み込み
            var job_eng = $("[name=pt_member" + i + "_job]").val();
            skillIconListDisplay(job_eng, i);

        }
    }

    function skillIconListDisplay(job_eng, pt_num) {

        var dase_ual = "/images/buffsimulator/skillicon/"

        //あとはここを1-12で回して、画像を設置する
        for (j = 1; j < 13; j++) {

            var image = new Image();
            image.src = dase_ual + job_eng + j + ".png";
            var result = image.width;

            if (!result) {
                $(".skill_icon_list" + i).eq(j - 1).find("img").attr("src", dase_ual + job_eng + j + ".png");

                // 補助選択肢の表示判断
                var aux_option = job_eng + j;

                switch (aux_option) {
                    case "paladin3":
                    case "warrior4":
                    case "darkknight3":
                    case "darkknight5":
                    case "gunbreaker5":
                    case "bard2":
                    case "whitemage2":
                    case "whitemage4":
                    case "scholar1":
                    case "scholar9":
                    case "scholar11":
                    case "astrologian3":
                    case "astrologian4":
                    case "astrologian5":
                    case "sage1":
                    case "sage6":
                    case "sage7":
                    case "sage10":
                        $(".skill_icon_list" + pt_num).eq(j - 1).find(".skill_list_target").css("display", "flex");
                        break;
                }

            } else {
                break;
            }





        }


    }



    function judgeExistImage(job_name, pt_num) {



        var base_url = "/images/buffsimulator/skillicon/";

        var img_array = new Array();

        for (i = 1; i < 13; i++) {
            img_array.push(base_url + job_name + i + ".png");
        }

        for (var i = 0; i < img_array.length; i++) {
            var image = new Image();
            image.src = img_array[i];
            var result = image.width;

            // 初期化
            $(".skill_icon" + pt_num).eq(i).css("display", "block");

            if (!result) {
                $(".skill_icon" + pt_num).eq(i).css("display", "none");
                //$(".skill_icon").eq(i).children("img").attr("src", "/images/buffsimulator/skillicon/null.png");
            }

        }
    }







});

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
                $("[name=pt_member" + pt_num + "_determination]").val(data["det"]);
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
            localStorage.setItem("bs_pt_member" + i + "_determination", $("[name=pt_member" + i + "_determination]").val());
            localStorage.setItem("bs_pt_member" + i + "_mind", $("[name=pt_member" + i + "_mind]").val());
            localStorage.setItem("bs_pt_member" + i + "_weapon_damage", $("[name=pt_member" + i + "_weapon_damage]").val());
            localStorage.setItem("bs_pt_member" + i + "_Remain_hit_point", $("[name=pt_member" + i + "_Remain_hit_point]").val());
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
        var click_skill_url = $(this).children("img").attr("src");

        var skill_no = skillNumberSearch(click_skill_url);


        if ($(this).children("img").hasClass("use_skl_click")) {
            $(this).children("img").removeClass("use_skl_click");

            // リストから消す
            $(".skill_icon_list" + pt_num).eq(skill_no - 1).css("display", "none");

        } else {
            $(this).children("img").addClass("use_skl_click");

            // リストに表示
            $(".skill_icon_list" + pt_num).eq(skill_no - 1).css("display", "block");
        }

    })

    // URLを拾ってNOを返す
    function skillNumberSearch(click_skill_url) {

        click_skill_url = click_skill_url.slice(0, -4);

        //2桁判定
        var skill_no = click_skill_url.substr(-2);

        if (!Number.isInteger(Number(skill_no))) {
            skill_no = skill_no.substr(-1);
        }

        return skill_no;
    }




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

        // どのスキルが選択されているかを抽出
        var all_done_skill_list = [];
        var all_done_skill_list_sub = [];
        var job_name_list = [];
        var all_job_status = {};
        var damage_element = $("#damage_att_select_id").val();



        for (i = 1; i < 9; i++) {

            var job_name = $(".pt_membere_select").eq(i - 1).val();
            var skill_no_list = [];
            var skill_no_list_sub = [];

            //ジョブ名だけリスト化し渡す。
            job_name_list.push(job_name);

            // 表示されているスキルアイコンをもとに抽出
            $(".skill_icon_list" + i).each(function () {

                if ($(this).css("display") == "block") {
                    var skill_url = $(this).find(".skill_icon_l").attr("src")
                    var skill_no = skillNumberSearch(skill_url);

                    skill_no_list.push(skill_no);

                    // 補助項目の有無
                    if ($(this).find(".skill_list_target").css("display") == "flex") {
                        // 内容取得
                        var target = $(this).find(".skill_list_one_select").val();
                        var dict = { [skill_no]: target };
                        skill_no_list_sub.push(dict);


                    }


                }

            });

            // PTジョブ設定の値を配列化
            var hit_point = $("[name='pt_member" + i + "_hit_point']").val();
            var physical_defenses = $("[name='pt_member" + i + "_physical_defenses']").val();
            var magical_defenses = $("[name='pt_member" + i + "_magical_defenses']").val();
            var tenacity = $("[name='pt_member" + i + "_tenacity']").val();
            var determination = $("[name='pt_member" + i + "_determination']").val();
            var mind = $("[name='pt_member" + i + "_mind']").val();
            var weapon_damage = $("[name='pt_member" + i + "_weapon_damage']").val();

            all_job_status[job_name] = {};
            all_job_status[job_name]["hit_point"] = hit_point;
            all_job_status[job_name]["physical_defenses"] = physical_defenses;
            all_job_status[job_name]["magical_defenses"] = magical_defenses;
            all_job_status[job_name]["tenacity"] = tenacity;
            all_job_status[job_name]["determination"] = determination;
            all_job_status[job_name]["mind"] = mind;
            all_job_status[job_name]["weapon_damage"] = weapon_damage;


            // 配列作成とallにpush
            var dict = { [job_name]: skill_no_list };
            all_done_skill_list.push(dict);

            var dict = { [job_name]: skill_no_list_sub };
            all_done_skill_list_sub.push(dict);

        }


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
            url: "/buffsimulator/ajax_access_skilldata",
            dataType: "json",
            data: {
                all_done_skill_list,
                all_done_skill_list_sub,
                job_name_list,
                damage_element,
                all_job_status,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                // Laravel内で処理された結果がdataに入って返ってくる

                console.log("done");

                var all_buff_list = data["all_buff_list"];
                var de_buff_boss = data["de_buff_boss"];
                var f_ten = data["f_ten"];
                var index = 1;
                var original_damage = [];

                job_name_list.forEach(job_name => {
                    // 最大HP
                    var max_hp = $("[name=pt_member" + index + "_hit_point]").val();
                    all_buff_list[job_name]["f_HP"].forEach(f_HP => {
                        max_hp *= Number(f_HP);
                    });

                    var Remain_hp = $("[name=pt_member" + index + "_Remain_hit_point]").val();
                    var barrier = 0;
                    var hit_damage;

                    all_buff_list[job_name]["f_BRR"].forEach(val => {
                        barrier += Number(val);
                    });

                    // ヒットダメージ
                    hit_damage = barrier + Number(max_hp) - Number(Remain_hp);

                    // 防御効果計算
                    var damage_att = $("#damage_att_select_id").val();
                    if (damage_att == "magic") {
                        var damage_att_defense = $("[name=pt_member" + index + "_physical_defenses]").val()
                    } else {
                        var damage_att_defense = $("[name=pt_member" + index + "_magical_defenses]").val()
                    }
                    var f_DEF = Math.round(15 * damage_att_defense / 1900, 0) / 100;

                    var f_TNC = f_ten[index - 1];
                    var f_RND = 1;
                    var f_BUF = all_buff_list[job_name]["f_BUF"];
                    var f_DBUF = de_buff_boss["f_DBUF"];

                    // バフ入りダメージ
                    var damage_onbuff = Math.ceil(hit_damage / (1 - f_DEF) / (2 - f_TNC));
                    damage_onbuff = Math.ceil(damage_onbuff * f_RND);

                    // バフ/デバフを抜く
                    var damage_nobuff = damage_onbuff;
                    f_BUF.forEach(buf => {
                        damage_nobuff = Math.ceil(damage_nobuff / buf);
                    });

                    f_DBUF.forEach(dbuf => {
                        damage_nobuff = Math.ceil(damage_nobuff / dbuf);
                    });

                    original_damage.push(damage_nobuff);

                    index++;

                });

                // 平均値計算
                let sum = 0;
                original_damage.forEach(function (v) {
                    sum += v;
                });
                avr_original_damage = Math.ceil(sum / original_damage.length);
                $(".result_text_num").text(avr_original_damage);

            })


            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");

            });












        // ログのダメージ（基本は最大HP-残HP）
        //var damage_log = $("[name=pt_member1_hit_point]").val() - $("[name=pt_member1_Remain_hit_point]").val();

        // // ダメージの属性
        // var damage_att = $("#damage_att_select_id").val();
        // // 属性に伴う防御力
        // if (damage_att == "magic") {
        //     var damage_att_defense = $("[name=pt_member1_physical_defenses]").val()
        // } else {
        //     var damage_att_defense = $("[name=pt_member1_magical_defenses]").val()
        // }

        // //防御力軽減率
        // var f_DEF = Math.round(15 * damage_att_defense / 1900, 0) / 100

        // //不屈軽減率
        // var f_TEN = 1;

        // //ダメージ乱数
        // var f_RND = 1;

        // //ダメージ軽減バフ
        // var f_BUF = [1];

        // //与ダメ低下デバフ
        // var f_DBUF = [0.7, 0.8];

        // //バリア
        // var f_BAR = 1000;


        // // ダメージ名命名
        // var damage_original_DEF_TEN_RND_BUF_DBUF_BAR = damage_log;

        // // バリア量適応ダメージ
        // var damage_original_DEF_TEN_RND_BUF_DBUF = damage_original_DEF_TEN_RND_BUF_DBUF_BAR + f_BAR;

        // // バフなしダメージ計算
        // var damage_original_TEN_RND_BUF_DBUF = Math.round(Math.round(damage_original_DEF_TEN_RND_BUF_DBUF / (1 - f_DEF) / (2 - f_TEN), 0) / f_RND, 0);

        // //バフ軽減適応
        // var temp_damage = damage_original_TEN_RND_BUF_DBUF;
        // f_BUF.forEach(element => {

        //     temp_damage = Math.round(temp_damage / element, 0);

        // });
        // var damage_original_TEN_RND_DBUF = temp_damage;

        // //与ダメ軽減適応
        // var temp_damage = damage_original_TEN_RND_DBUF;
        // f_DBUF.forEach(element => {

        //     temp_damage = Math.round(temp_damage / element, 0);

        // });
        // var damage_original_TEN_RND = temp_damage;

        // // 不屈適応
        // var damage_original_RND = Math.round(damage_original_TEN_RND * f_TEN, 0);

        // // 乱数適応
        // var damage_original = Math.round(damage_original_RND * f_RND, 0);


    });







    //ロード時の処理
    for (i = 1; i < 9; i++) {
        $("[name=pt_member" + i + "_job]").val(localStorage.getItem("bs_pt_member" + i + "_job"));
        $("[name=pt_member" + i + "_hit_point]").val(localStorage.getItem("bs_pt_member" + i + "_hit_point"));
        $("[name=pt_member" + i + "_physical_defenses]").val(localStorage.getItem("bs_pt_member" + i + "_physical_defenses"));
        $("[name=pt_member" + i + "_magical_defenses]").val(localStorage.getItem("bs_pt_member" + i + "_magical_defenses"));
        $("[name=pt_member" + i + "_tenacity]").val(localStorage.getItem("bs_pt_member" + i + "_tenacity"));
        $("[name=pt_member" + i + "_determination]").val(localStorage.getItem("bs_pt_member" + i + "_determination"));
        $("[name=pt_member" + i + "_mind]").val(localStorage.getItem("bs_pt_member" + i + "_mind"));
        $("[name=pt_member" + i + "_weapon_damage]").val(localStorage.getItem("bs_pt_member" + i + "_weapon_damage"));
        $("[name=pt_member" + i + "_Remain_hit_point]").val(localStorage.getItem("bs_pt_member" + i + "_Remain_hit_point"));

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
                    case "dancer2":
                    case "whitemage2":
                    case "whitemage4":
                    case "scholar1":
                    case "scholar9":
                    case "scholar11":
                    case "astrologian1":
                    case "astrologian5":
                    case "astrologian7":
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


    // 選択肢調整
    $(".skill_icon").click(function () {
        var src = $(this).children("img").attr("src");

        // 踊り子インプロ
        if (src == "/images/buffsimulator/skillicon/dancer2.png") {
            var pt_lit_no = $(this).attr("class").slice(-1);
            $(".skill_icon_list" + pt_lit_no).find(".skill_list_one_select > option").remove();
            $(".skill_icon_list" + pt_lit_no).find(".skill_list_one_select").append($('<option>').html("0").val("0"));
            $(".skill_icon_list" + pt_lit_no).find(".skill_list_one_select").append($('<option>').html("1").val("1"));
            $(".skill_icon_list" + pt_lit_no).find(".skill_list_one_select").append($('<option>').html("2").val("2"));
            $(".skill_icon_list" + pt_lit_no).find(".skill_list_one_select").append($('<option>').html("3").val("3"));
            $(".skill_icon_list" + pt_lit_no).find(".skill_list_one_select").append($('<option>').html("4").val("4"));

            $(".skill_icon_list" + pt_lit_no).find(".skill_list_target_text").text("ｽﾀｯｸ：")

        }


    })







});

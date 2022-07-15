$(function () {


    // ロード画面
    $(window).on('load', function () {
        $("#loading").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
        $("#loading_box").delay(1200).fadeOut('slow');//ローディングテキストを1.2秒（1200ms）待機してからフェードアウト
    });



    // マウス位置
    var mX;
    var mY;
    var scroll_top = 0;

    var all_skill_data = [];
    var all_skill_data_job_num = [];

    // アクティブにしたスキルリスﾄの位置を記録
    var active_tline_trtd = "";

    // すべてのジョブのリスト
    var all_job_list_parents = [];

    // contents4ヘッダーのリスト
    var header_text_list = [];

    // contents4対象リストの最大値
    var max_select_num = 0;

    // contents4タイムラインの長さ
    var timeline_length = 0;

    // contents4バリアスキル一覧
    var barrier_skill_list = [];
    var barrier_skill_list_job_num = [];

    // contents4票の見出し宣言
    var job_key_no = 4;//列が増えたらここを編集
    var damage_type;
    var damage_resits;
    var damage_key_no;
    var remainhp_key_no;
    var targettype_no;
    var targetjob_no;
    var total_barrier_no;
    var total_buff_no;


    // セーブIDありなしでの動作
    if ($(".save_id").text() === "") {
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
    } else {
        var save_url = $(".save_id").text();
        ptMemberSaveDataLoad(save_url);


    }




    // ジョブをリスト化
    var tank_list = [];
    var melee_list = [];
    var range_list = [];
    var caster_list = [];
    var dps_list = [];
    var healer_list = [];

    // パーティメンバーをリスト化（初期動作）
    ptMemberListRefresh();

    function ptMemberListRefresh() {

        // リスト初期化
        all_job_list_parents = [];
        tank_list = [];
        melee_list = [];
        range_list = [];
        caster_list = [];
        dps_list = [];
        healer_list = [];

        for (i = 1; i < 9; i++) {
            var job_name_eng_temp = $(".pt_membere_select").eq(i - 1).val();
            all_job_list_parents.push(job_name_eng_temp);
        }

        $.each(all_job_list_parents, function (index, element) {
            switch (element) {
                case "paladin":
                case "warrior":
                case "darkknight":
                case "gunbreaker":
                    tank_list.push(element);
                    break;
                case "monk":
                case "dragoon":
                case "ninja":
                case "samurai":
                case "reaper":
                    melee_list.push(element);
                    dps_list.push(element);
                    break;
                case "bard":
                case "machinist":
                case "dancer":
                    range_list.push(element);
                    dps_list.push(element);
                    break;
                case "blackmage":
                case "summoner":
                case "redmage":
                    caster_list.push(element);
                    dps_list.push(element);
                    break;
                case "whitemage":
                case "scholar":
                case "astrologian":
                case "sage":
                    healer_list.push(element);
                    break;
            }

        });
    }

    //タイムライン初期設置
    timeLineDisplay5($(".timeline_select_phase").children("select").val());

    // バリアスキル一覧を取得+ついでに全スキルのジョブごとの数も返してもらう
    getBarrierSkillList();
    function getBarrierSkillList() {

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
            url: "/buffsimulator/ajax_access_barrier",
            dataType: "json",
            data: {
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {

                //すべてのスキルデータを格納
                all_skill_data = data[1];

                // ジョブ別スキルの数を格納
                all_skill_data_job_num = data[2];

                // バリアのリストをまとめる
                barrier_skill_list = data[0];
                barrier_skill_list.forEach(element => {
                    barrier_skill_list_job_num.push(element["job_e"] + element["skill_no"]);
                });

            })
            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");

            });
    }


    // 左メニュークリック時の動作
    $(".left_menu").children("div").click(function () {

        // ボタン押したらどこが表示されるか

        if ($(this).attr("tags") == "contents1") {
            var tags = $(this).attr("tags");
            contents1MemuClick();
        } else if ($(this).attr("tags") == "contents2") {
            var tags = "contents1";
            contents2MemuClick();
        } else {
            var tags = $(this).attr("tags");
        }

        // 中央コンテンツの動作
        $(".mainContents_container_center").children().css("display", "none");
        $("." + tags).css("display", "block");

        // 左メニューの動作
        var clickClass = $(this).attr("class");
        $(".left_menu").children().removeClass("left_menu_active");
        $("." + clickClass).addClass("left_menu_active");

    });

    function contents2MemuClick() {
        $(".member_Rhp").addClass("contents_visibility_hidden");
        $("[name$=_Remain_hit_point]").addClass("contents_visibility_hidden");
        $(".result_conteiner1").addClass("contents_display_none");
        $(".result_conteiner2").removeClass("contents_display_none");
        $(".pt_member_remain_hp").removeClass("contents_visibility_hidden");
    }

    function contents1MemuClick() {
        $(".member_Rhp").removeClass("contents_visibility_hidden");
        $("[name$=_Remain_hit_point]").removeClass("contents_visibility_hidden");
        $(".result_conteiner1").removeClass("contents_display_none");
        $(".result_conteiner2").addClass("contents_display_none");
        $(".pt_member_remain_hp").addClass("contents_visibility_hidden");
    }


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

        // メンバーリスト更新
        ptMemberListRefresh();

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
    $(".left_menu1,.left_menu2").click(function () {

        // スキルリストの情報を読み込み
        skillIconListFirstDone();
        damageTargetListDone();
        skillDisplay();

    })

    function skillDisplay() {
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
    }


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

    // スキルIDを拾ってNOを返す
    function skillNumberSearchId(element) {

        //2桁判定
        var skill_no = element.substr(-2);

        if (!Number.isInteger(Number(skill_no))) {
            skill_no = skill_no.substr(-1);
        }

        return skill_no;
    }




    // マウスの位置を監視
    $(window).scroll(function () {
        scroll_top = $(this).scrollTop();
    });
    document.body.addEventListener("mousemove", function (e) {

        //座標を取得する
        mX = e.pageX;  //X座標
        mY = e.pageY;  //Y座標
        var X_ad = 0; //調整

        //画面半分以上来たら表示の方向を変える
        if (mX > 960) {
            var X_ad = 420;
        }

        $(".skl_icon_sub").css("top", mY - 35 - scroll_top);
        $(".skl_icon_sub").css("left", mX + 15 - X_ad);

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

    // あとから追加されたタイムラインのアイコンのホバー
    $(document).on({
        "mouseenter": function () {

            $(".skl_icon_sub").css("top", scroll_top);

            var icon_url = $(this).children("img").attr("src");

            icon_url = icon_url.slice(0, -4);
            iconsub_url = icon_url + "sub.png";

            $(".skl_icon_sub").children("img").attr("src", iconsub_url);
            $(".skl_icon_sub").css("visibility", "visible");
        },
        "mouseleave": function () {
            $(".skl_icon_sub").css("visibility", "hidden");
        }
    }, ".tline_skill_icon_div");




    // 元ダメージ計算
    $(".result_button_done").click(function () {

        // どのスキルが選択されているかを抽出
        var all_done_skill_list = [];
        var all_done_skill_list_sub = [];
        var job_name_list = [];
        var all_job_status = {};
        var damage_element = $("#damage_att_select_id").val();
        var damage_target = $("#damage_target_select_id").val();
        var damage_log_list = $("#damage_log_list_text_id").val();
        var damage_log_bool = false;


        // ダメージログリストを取得
        var damage_log_line = damage_log_list.split('\n');
        var damage_log_array = new Array();

        for (var i = 0; i < damage_log_line.length; i++) {
            // 空行は無視する
            if (damage_log_line[i] == '') {
                continue;
            }
            damage_log_array.push(damage_log_line[i]);
        }

        if (damage_log_array.length > 0) {
            damage_log_bool = true;
        }



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
                var job_name_list_pub = [];
                var one_job_damage = [];



                // ジョブ指定で調べる場合
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


                    // テキストエリアに入力がある場合
                    var attack_target_job = $("#damage_target_select_id").val();

                    if (damage_log_bool && job_name == attack_target_job) {
                        damage_log_array.forEach(damage_log => {
                            hit_damage = Number(damage_log) + barrier;

                            var damage_nobuff = oparateDamageNoBuff(hit_damage, f_ten, all_buff_list, de_buff_boss, index, job_name);
                            one_job_damage.push(damage_nobuff);
                        });

                    } else {
                        // ヒットダメージ
                        hit_damage = barrier + Number(max_hp) - Number(Remain_hp);
                    }

                    var damage_nobuff = oparateDamageNoBuff(hit_damage, f_ten, all_buff_list, de_buff_boss, index, job_name);

                    original_damage.push(damage_nobuff);
                    job_name_list_pub.push(job_name);

                    index++;

                });

                // 平均値計算
                var job_num = $.inArray(damage_target, job_name_list_pub);

                if (damage_target == "all") {
                    avr_original_damage = oparateAVR(original_damage);
                    $(".result_text_num").text(avr_original_damage);

                } else if (damage_log_bool) {
                    // テキストエリアに入力がある場合
                    avr_one_job_damage = oparateAVR(one_job_damage);
                    median_one_job_damage = oparateMedian(one_job_damage)
                    //$(".result_text_num").text(avr_one_job_damage);　//平均値
                    $(".result_text_num").text(median_one_job_damage); //中央値

                } else {
                    // 対象が１人の場合
                    var damage_nobuff = original_damage[job_num];
                    $(".result_text_num").text(damage_nobuff);
                }

            })


            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");

            });
    });

    // ダメージを計算
    function oparateDamageNoBuff(hit_damage, f_ten, all_buff_list, de_buff_boss, index, job_name) {
        // 防御効果計算
        var damage_att = $("#damage_att_select_id").val();
        if (damage_att == "magic") {
            var damage_att_defense = $("[name=pt_member" + index + "_magical_defenses]").val();
        } else {
            var damage_att_defense = $("[name=pt_member" + index + "_physical_defenses]").val();
        }
        var f_DEF = Math.floor(15 * damage_att_defense / 1900, 0) / 100;
        var f_TNC = f_ten[index - 1];
        var f_RND = 1;
        var f_BUF = all_buff_list[job_name]["f_BUF"];
        var f_DBUF = de_buff_boss["f_DBUF"];

        // console.log(job_name);
        // console.log("f_DEF:" + f_DEF);
        // console.log("f_TNC:" + f_TNC);
        // console.log("f_BUF:" + f_BUF);
        // console.log("f_DBUF:" + f_DBUF);

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

        return damage_nobuff;
    }

    // 平均値を計算
    function oparateAVR(job_damage) {
        let sum = 0;
        job_damage.forEach(function (v) {
            sum += v;
        });
        avr_original_damage = Math.ceil(sum / job_damage.length);

        return avr_original_damage;
    }

    // 中央値を計算
    function oparateMedian(array) {
        if (array.length === 0) {
            return 0;
        }

        array.sort(function (a, b) {
            return a - b;
        });

        var half = Math.floor(array.length / 2);

        if (array.length % 2) {
            return array[half];
        } else {
            return (array[half - 1] + array[half]) / 2;
        }
    };


    // ダメージ模擬計算
    $(".result_button_sim_damage_done").click(function () {

        // どのスキルが選択されているかを抽出
        var all_done_skill_list = [];
        var all_done_skill_list_sub = [];
        var job_name_list = [];
        var all_job_status = {};
        var damage_element = $("#damage_att_sim_select_id").val();


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
                        max_hp = Math.floor(max_hp * Number(f_HP));
                    });

                    //var Remain_hp = $("[name=pt_member" + index + "_Remain_hit_point]").val();
                    var barrier = 0;
                    var hit_damage = $(".result_sim").val();

                    all_buff_list[job_name]["f_BRR"].forEach(val => {
                        barrier += Number(val);
                    });

                    // ヒットダメージ
                    //hit_damage = barrier + Number(max_hp) - Number(Remain_hp);

                    // 防御効果計算
                    var damage_att = $("#damage_att_sim_select_id").val();
                    if (damage_att == "magic") {
                        var damage_att_defense = $("[name=pt_member" + index + "_magical_defenses]").val();
                    } else {
                        var damage_att_defense = $("[name=pt_member" + index + "_physical_defenses]").val();
                    }
                    var f_DEF = Math.floor(15 * damage_att_defense / 1900, 0) / 100;
                    var f_TNC = f_ten[index - 1];
                    var f_RND = 1;
                    var f_BUF = all_buff_list[job_name]["f_BUF"];
                    var f_DBUF = de_buff_boss["f_DBUF"];

                    // バフ入りダメージ
                    var damage_onbuff = Math.floor(hit_damage * (1 - f_DEF) * (2 - f_TNC));
                    damage_onbuff = Math.floor(damage_onbuff * f_RND);

                    // バフ/デバフを抜く
                    var damage_nobuff = damage_onbuff;
                    f_BUF.forEach(buf => {
                        damage_nobuff = Math.floor(damage_nobuff * buf);
                    });

                    f_DBUF.forEach(dbuf => {
                        damage_nobuff = Math.floor(damage_nobuff * dbuf);
                    });

                    original_damage.push(damage_nobuff);


                    // 残HP表示
                    var Remain_hp = max_hp - damage_nobuff + barrier;
                    $(".pt_member_remain_hp_num" + index).text(Remain_hp);

                    //マイナスなら色を赤くする
                    if (Remain_hp < 0) {
                        $(".pt_member_remain_hp_num" + index).css("color", "red");
                    } else {
                        $(".pt_member_remain_hp_num" + index).css("color", "white");
                    }

                    index++;

                });




            })


            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");

            });
    });





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

    // 攻撃対象リスト作成
    function damageTargetListDone() {

        // 初期化
        $("[name=damage_target_select_name] > option").remove();
        $("[name=damage_target_select_name]").append($('<option>').html("全員").val("all"));

        for (i = 1; i < 9; i++) {
            // PTジョブ設定のジョブ名が入る
            var job_name = $("[name=pt_member" + i + "_job] option:selected").text();
            var job_name_eng = $("[name=pt_member" + i + "_job] option:selected").val();
            $("[name=damage_target_select_name]").append($('<option>').html(job_name).val(job_name_eng));
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
            $(".skill_icon_list" + pt_lit_no).find(".skill_list_target_text").text("ｽﾀｯｸ：");
        }
    })


    $(".damage_log_list_button").click(function () {
        if ($("#damage_log_list_text_id").css("display") == "none") {
            $("#damage_log_list_text_id").css("display", "block");
        } else {
            $("#damage_log_list_text_id").css("display", "none");
        }

    })




    //元ダメージリスト
    // コンテンツに変更があると、内容を変更する
    $(".timeline_select_contents").children("select").change(function () {
        var content_name = $(this).val();

        $(".timeline_select_phase").children("select").css("display", "none");
        $("[select_id=" + content_name + "]").css("display", "inline-block");

        // 初期化
        $(".timeline_table_table").empty();
        $("[select_id=" + content_name + "]").val("");

    })

    // フェーズに変更があると、内容を変更する
    $(".timeline_select_phase").children("select").change(function () {
        timeLineDisplay5($(this).val());

    })


    // データベースにアクセスしタイムラインをリターン
    function timeLineDisplay5(phase_name) {

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
            url: "/buffsimulator/ajax_access_timeline",
            dataType: "json",
            data: {
                phase_name,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {

                // 初期化
                $(".timeline_table_table").empty();


                // ヘッダー
                $(".timeline_table_table").append("<tr>");
                $(".timeline_table_table").children("tr").last().append(
                    "<td>時間</td>",
                    "<td>スキル名</td>",
                    "<td>元ダメージ</td>",
                    "<td>解説</td>",
                );

                //データを表にする
                data.forEach(timeline => {

                    if (timeline["damage"] == 0) {
                        timeline["damage"] = "NoData";
                    }

                    $(".timeline_table_table").append("<tr>");
                    $(".timeline_table_table").children("tr").last().append(
                        "<td>" + timeline["time"] + "</td>",
                        "<td>" + timeline["skill"] + "</td>",
                        "<td>" + timeline["damage"] + "</td>",
                        "<td>" + timeline["detail"] + "</td>",
                    );
                });


            })
            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");
            });
    }


    //軽減タイムライン
    // コンテンツに変更があると、内容を変更する
    $(".timeline_select_contents4").children("select").change(function () {
        var content_name = $(this).val();
        $(".timeline_select_phase_contents4").children("select").css("display", "none");
        $("[select_id=" + content_name + "]").css("display", "inline-block");

        // 初期化
        //$(".timeline_table_table").empty();
        $("[select_id=" + content_name + "]").val("");

    })

    // フェーズに変更があると、内容を変更する
    $(".timeline_select_phase_contents4").children("select").change(function () {
        timeLineDisplay($(this).val());

    })


    // データベースにアクセスしタイムラインをリターン
    function timeLineDisplay(phase_name) {

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
            url: "/buffsimulator/ajax_access_timeline",
            dataType: "json",
            data: {
                phase_name,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {

                // タイムラインが入っていない行は消す
                var table_length = $(".time_line_timekeyper_table").find("tr").length;
                // 初期化
                $(".time_line_timekeyper_table").find("tr").css("visibility", "visible");
                for (i = 1; i < table_length + 1; i++) {
                    for (j = 1; j < 20; j++) {
                        // 列が増えたらここを編集
                        if (j != 12) {
                            $(".tr" + i + "td" + j).empty();
                        } else {
                            $(".tr" + i + "td" + j).find("[class^='ptmem_hp_']").css("display", "none");
                        }
                    }
                }

                //データを表にする
                for (i = 1; i < data.length + 1; i++) {
                    for (j = 1; j < 20; j++) {
                        if (j == 1) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["time"]);
                        } else if (j == 2) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["skill"]);
                        } else if (j == 13) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["damage"]);
                        } else if (j == 14) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["総バリア量"]);
                        } else if (j == 15) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["総軽減率"]);
                        } else if (j == 16) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["resist"]);
                        } else if (j == 17) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["type"]);
                        } else if (j == 18) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["targettype"]);
                        } else if (j == 19) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["targetjob"]);
                        } else if (j == 3) {
                            switch (data[i - 1]["targettype"]) {
                                case "all":
                                    $(".tr" + i + "td" + j).append($("<div  target_job_id='all' class='target_icon'><img src=/images/buffsimulator/skillicon/alljobicon.png></div>"));
                                    break;

                                case "selectone":
                                    var k = 1;
                                    var joblist = returnJobList(data[i - 1]["targetjob"]);
                                    appnedJobIcon(i, j, k, joblist);
                                    break;

                                case "selecttwo":
                                    var k = 2;
                                    var joblist = returnJobList(data[i - 1]["targetjob"]);
                                    appnedJobIcon(i, j, k, joblist);
                                    break;

                                case "selectthree":
                                    var k = 3;
                                    var joblist = returnJobList(data[i - 1]["targetjob"]);
                                    appnedJobIcon(i, j, k, joblist);
                                    break;

                                case "selectfour":
                                    var k = 4;
                                    var joblist = returnJobList(data[i - 1]["targetjob"]);
                                    appnedJobIcon(i, j, k, joblist);
                                    break;

                                case "selectfive":
                                    var k = 5;
                                    var joblist = returnJobList(data[i - 1]["targetjob"]);
                                    appnedJobIcon(i, j, k, joblist);
                                    break;

                                case "selectsix":
                                    var k = 6;
                                    var joblist = returnJobList(data[i - 1]["targetjob"]);
                                    appnedJobIcon(i, j, k, joblist);
                                    break;

                                case "selectseven":
                                    var k = 7;
                                    var joblist = returnJobList(data[i - 1]["targetjob"]);
                                    appnedJobIcon(i, j, k, joblist);
                                    break;

                                case "tank":
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + tank_list[0] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + tank_list[0] + "_jobicon.png></div>"));
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + tank_list[1] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + tank_list[1] + "_jobicon.png></div>"));
                                    break;

                                case "dps":
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + dps_list[0] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + dps_list[0] + "_jobicon.png></div>"));
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + dps_list[1] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + dps_list[1] + "_jobicon.png></div>"));
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + dps_list[2] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + dps_list[2] + "_jobicon.png></div>"));
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + dps_list[3] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + dps_list[3] + "_jobicon.png></div>"));
                                    break;

                                case "healer":
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + healer_list[0] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + healer_list[0] + "_jobicon.png></div>"));
                                    $(".tr" + i + "td" + j).append($("<div target_job_id=" + healer_list[1] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + healer_list[1] + "_jobicon.png></div>"));
                                    break;

                                default:
                                    break;

                            }
                        }
                    }
                }

                for (i = data.length + 3; i < table_length; i++) {
                    $(".time_line_timekeyper_table").find("tr").eq(i).css("visibility", "hidden");
                }

            })
            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");
            });
    }

    // ジョブを判定し、リストを返す
    function returnJobList(targetjob) {
        switch (targetjob) {
            case "tank":
                return tank_list;
            case "dps":
                return dps_list;
            case "healer":
                return healer_list;
            case "melee":
                return melee_list;
            case "range":
                return range_list;
            case "caster":
                return caster_list;
            case "dps_healer":
                var result = dps_list.concat(healer_list);
                return result;
            case "tank_healer":
                var result = tank_list.concat(healer_list);
                return result;
            case "tank_dps":
                var result = tank_list.concat(dps_list);
                return result;
            case "all":
                var result = [];
                return result;
            default:
                var result = dps_list.concat(healer_list).concat(tank_list);
                return result;
        }

    }

    // 指定回数アイコンを入れる
    function appnedJobIcon(i, j, k, joblist) {
        for (l = 0; l < k; l++) {
            $(".tr" + i + "td" + j).append($("<div target_job_id=" + joblist[l] + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + joblist[l] + "_jobicon.png></div>"));
        }
        return 0;
    }




    //リキャストタイム表示
    $("#cbox_recasttime").click(function () {
        $(".tline_skill_icon_bg_recast").css("opacity", "0.0");

        $(':checkbox[name="cbox_recasttime"]:checked').each(function () {
            $(".tline_skill_icon_bg_recast").css("opacity", "0.5");
        });
    })


    //残HP表示
    $("#cbox_remain_hp").click(function () {
        $(".time_line_timekeyper_table").find('td:nth-child(12)').hide();
        $(':checkbox[name="cbox_remain_hp"]:checked').each(function () {
            $(".time_line_timekeyper_table").find('td:nth-child(12)').show();
        });
    })


    // メニューを開いた動作
    $(".left_menu4").click(function () {

        timeLineDisplay($(".timeline_select_phase").children("select").val());

        var job_name_list = [];
        var job_name_list_eng = [];

        $(".time_line_timekeyper_table").find('td:nth-child(16)').css("visibility", "hidden");
        $(".time_line_timekeyper_table").find('td:nth-child(17)').css("visibility", "hidden");
        $(".time_line_timekeyper_table").find('td:nth-child(18)').css("visibility", "hidden");
        $(".time_line_timekeyper_table").find('td:nth-child(19)').css("visibility", "hidden");

        for (i = 1; i < 9; i++) {

            var job_name = $(".pt_membere_select option:selected").eq(i - 1).text();
            var job_name_eng = $(".pt_membere_select").eq(i - 1).val();

            //ジョブ名だけリスト化し渡す。
            job_name_list.push(job_name);
            job_name_list_eng.push(job_name_eng);
        }


        // ヘッダーリストの調整
        job_name_list.unshift("time", "スキル名", "対象");


        var img = new Image();

        //スキルアイコン読み込み
        for (i = 1; i < 9; i++) {
            $(".tline_skill_icon" + i).children().remove();// 初期化
            var dase_ual = "/images/buffsimulator/skillicon/";
            var job_eng = $("[name=pt_member" + i + "_job]").val();

            //あとはここを1-12で回して、画像を設置する
            for (j = 1; j < all_skill_data_job_num[job_eng] + 1; j++) {

                img.src = dase_ual + job_eng + j + ".png";

                $(".tline_skill_icon" + i).eq(j - 1).append($("<img src=" + dase_ual + job_eng + j + ".png" + ">"));
                $(".tline_skill_icon" + i).eq(j - 1).append($("<div class='recast_time_text'>Recast</div>"));
                $(".tline_skill_icon" + i).eq(j - 1).append($("<div class='recast_time_num'>120</div>"));
            }
        }

        //ジョブ名挿入
        for (j = 1; j < 12; j++) {
            $(".tr0td" + j).text(job_name_list[j - 1]);
        }
        $(".tr0td" + 12).text("残HP予測");
        $(".tr0td" + 13).text("damage");
        $(".tr0td" + 14).text("総バリア量");
        $(".tr0td" + 15).text("総軽減率");
        $(".tr0td" + 16).text("resits");
        $(".tr0td" + 17).text("type");
        $(".tr0td" + 18).text("targettype");
        $(".tr0td" + 19).text("targetjob");

        // ジョブアイコン挿入
        var trtd_hp_div = $(".trtd_hp").html();
        var tr_length = $(".time_line_timekeyper_table").find("tr").length;

        for (i = 1; i < tr_length; i++) {
            $(".tr" + i + "td12").children().remove();
            $(".tr" + i + "td12").append(trtd_hp_div);
        }

        // 画像変更(残HPと対象)
        for (i = 1; i < 9; i++) {
            $(".ptmem_hp_" + i).children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[i - 1] + "_jobicon.png");
            $(".tline_job_icon" + i).children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[i - 1] + "_jobicon.png");
            $(".tline_job_icon" + i).children("img").attr("jobicon_id", job_name_list_eng[i - 1]);
        }


        // ターゲット対象リスト作成
        // タイムラインの内容が変わったらここを修正！！

        // スキル対象リストを初期化
        $("[name=timeline_skill_targetselect] > option").remove();
        $("[name=timeline_skill_targetselect]").append($('<option selected disabled>').html("").val(""));

        for (i = 0; i < 8; i++) {
            $("[name=timeline_skill_targetselect]").append($('<option>').html(job_name_list[i + 3]).val(job_name_list_eng[i]));
        }

        // ヘッダー情報を格納
        for (i = 0; i < $(".time_line_timekeyper_table")[0].rows[0].cells.length; i++) {
            header_text_list.push($(".tr0td" + (i + 1)).text());
        }

        // ジョブの設定
        job_key_no = 4;//列が増えたらここを編集
        damage_type = header_text_list.indexOf("type") + 1;
        damage_resits = header_text_list.indexOf("resist") + 1;
        damage_key_no = header_text_list.indexOf("damage") + 1;
        remainhp_key_no = header_text_list.indexOf("残HP予測") + 1;
        targettype_no = header_text_list.indexOf("targettype") + 1;
        targetjob_no = header_text_list.indexOf("targetjob") + 1;
        total_barrier_no = header_text_list.indexOf("総バリア量") + 1;
        total_buff_no = header_text_list.indexOf("総軽減率") + 1;


    })


    //選択のテーブルをクリック
    $(document).on("click", ".time_line_timekeyper_table td", function () {

        // スキルの設定
        // 同じ場所をクリックしても初期化しない
        if (active_tline_trtd != $(this).attr("class")) {
            $("[class^=tline_skl_list]").find("img").removeClass("use_skl_click"); //リスト初期化
        }

        // ジョブ名リスト作成
        var job_name_list = [];
        for (i = 1; i < 9; i++) {

            var job_name = $(".pt_membere_select option:selected").eq(i - 1).text();
            //ジョブ名だけリスト化し渡す。
            job_name_list.push(job_name);
        }

        // 行を取得
        var table_class = $(this).attr("class");
        active_tline_trtd = table_class;

        var pt_num = table_class.slice(-2);
        if (Number(pt_num) > 9) {
        } else {
            var pt_num = table_class.slice(-1);
        }

        // 行に対応するスキルリストを表示
        var h_pt_num = $(".tr0td" + pt_num).text();
        var job_num = job_name_list.indexOf(h_pt_num) + 1;

        var off = $(this).offset();

        // ほかのリストは非表示
        $("[class^=tline_skl_list]").css("display", "none");
        $("[class^=tline_job_list]").css("display", "none");

        // リスト表示
        $(".tline_skl_list" + job_num).css("left", off.left);//ここ調整
        $(".tline_skl_list" + job_num).css("top", off.top - scroll_top + 33);
        $(".tline_skl_list" + job_num).css("display", "block");


        //選択済みのスキルリスト
        var active_tline_trtd_exist = [];

        //スキルテーブルにすでにあるスキルを抽出
        $("." + active_tline_trtd).children("div").children("img").each(function () {
            active_tline_trtd_exist.push($(this).attr("src"));
        });

        // 開いたリストの中のアイコンをリスト化
        $(".tline_skl_list" + job_num).find(".skill_icon").each(function () {
            // クリックしたアイコンが存在するか確認
            var active_tline_trtd_exist_bool = $.inArray($(this).children("img").attr("src"), active_tline_trtd_exist);

            if (active_tline_trtd_exist_bool > -1) {
                $(this).children("img").addClass("use_skl_click");
            } else {
                $(this).children("img").removeClass("use_skl_click");
            }

        });


        // 選択したタイムラインのtimeを取得
        var use_time = active_tline_trtd.slice(0, active_tline_trtd.indexOf("td") + 2);
        var use_time_num = Number($("." + use_time + "1").text());



        //リキャスト中のスキル一覧
        var recast_time_exist = [];
        var recast_id_array = [];

        $("." + active_tline_trtd).find(".recast_time").each(function () {
            recast_time_exist.push($(this).attr("name"));
            recast_id_array.push($(this).attr("recast_id"));
        });

        // 開いたリストの中のアイコンをリスト化
        $(".tline_skl_list" + job_num).find(".skill_icon").each(function () {

            // スキルナンバー,ジョブ名取得
            var image_url = $(this).children("img").attr("src");

            if (image_url != undefined) {
                var skill_num = image_url.slice(image_url.indexOf(".") - 2, -4);
                if (Number(skill_num) > 9) {
                    var job_name = image_url.slice(image_url.lastIndexOf("/") + 1, -6);
                } else {
                    skill_num = image_url.slice(image_url.indexOf(".") - 1, -4);
                    var job_name = image_url.slice(image_url.lastIndexOf("/") + 1, -5);
                }
                // 選択したスキル情報を取得
                var aryCheck = all_skill_data.filter(value => {
                    if (value.job_e == job_name && value.skill_no == skill_num) {
                        return true;
                    }
                });
                var select_skill = aryCheck[0];


                // リキャスト中のスキルがが存在するか確認
                var recast_time_exist_bool = $.inArray($(this).children("img").attr("src"), recast_time_exist);

                if (recast_time_exist_bool > -1) {
                    // スキルを使ってからの経過時間を取得
                    var elapsed_time = use_time_num - recast_id_array[recast_time_exist_bool];
                    // リキャストタイムから残り時間を算出
                    var cool_down_time = select_skill["recast_time"] - elapsed_time;

                    if (cool_down_time > select_skill["recast_time"]) {
                        cool_down_time = select_skill["recast_time"] + elapsed_time;
                    }

                    $(this).children("img").css("opacity", "0.5");
                    $(this).css("pointer-events", "none");
                    $(this).find(".recast_time_text").css("display", "block");
                    $(this).find(".recast_time_num").css("display", "block");
                    $(this).find(".recast_time_num").text(cool_down_time);
                } else {
                    $(this).children("img").css("opacity", "1.0");
                    $(this).css("pointer-events", "all");
                    $(this).find(".recast_time_text").css("display", "none");
                    $(this).find(".recast_time_num").css("display", "none");
                }
            }

        });



        if (h_pt_num == "対象") {

            // ターゲットタイプなどを取得
            var targettype = $("." + use_time + targettype_no).text();
            var targetjob = $("." + use_time + targetjob_no).text();


            // アイコンいくつまで選べるか
            max_select_num = getMaxSelectNum(targettype);

            var active_tline_trtd_exist = [];

            //スキルテーブルにすでにあるスキルを抽出
            $("." + active_tline_trtd).children("div").children("img").each(function () {
                active_tline_trtd_exist.push($(this).attr("src"));
            });

            // リスト表示
            $(".tline_job_list").css("left", off.left);//ここ調整
            $(".tline_job_list").css("top", off.top - scroll_top + 33);
            $(".tline_job_list").css("display", "block");


            // リスト内容初期化
            $(".job_icon_t").children("img").removeClass("use_skl_click");
            $(".job_icon_t").children("img").css('opacity', '0.2');
            $(".job_icon_t").children("img").css('pointer-events', 'all');
            $(".job_icon_t").css('pointer-events', 'all');



            // リストのジョブの状態を調整
            $(".job_icon_t").each(function () {
                var img_url = $(this).children("img").attr("src");
                var element_job = img_url.slice(img_url.lastIndexOf("/") + 1, -12);

                // クリックしたアイコンが存在するか確認
                var active_tline_trtd_exist_bool = $.inArray(img_url, active_tline_trtd_exist);

                if (active_tline_trtd_exist_bool > -1) {
                    //存在する
                    $(this).children("img").addClass("use_skl_click")

                } else {
                    //存在しない
                }

                // ジョブのリストを取得
                var target_job_list = []

                switch (targettype) {
                    case "all":
                    case "":
                        target_job_list = returnJobList("all");
                        break;

                    case "tank":
                        target_job_list = returnJobList("tank");
                        break;

                    case "dps":
                        target_job_list = returnJobList("dps");
                        break;

                    case "healer":
                        target_job_list = returnJobList("healer");
                        break;

                    default:
                        target_job_list = returnJobList(targetjob);
                        break;

                }


                // elementのジョブがリストに存在するか
                var active_tline_trtd_exist_bool = $.inArray(element_job, target_job_list);

                if (active_tline_trtd_exist_bool > -1) {
                    //存在する
                    $(this).children("img").css('opacity', '1.0');
                } else {
                    //存在しない
                    $(this).children("img").css('pointer-events', 'none');
                    $(this).closest(".job_icon_t").css('pointer-events', 'none');
                }


            })
        }

    })


    // ターゲットタイプのselectmaxをリターン
    function getMaxSelectNum(targettype) {
        switch (targettype) {
            case "selectone":
                return 1;
            case "selecttwo":
                return 2;
            case "selectthree":
                return 3;
            case "selectfour":
                return 4;
            case "selectfive":
                return 5;
            case "selectsix":
                return 6;
            case "selectseven":
                return 7;
            case "tank":
                return 2;
            case "dps":
                return 4;
            case "healer":
                return 2;
            default:
                return 8;

        }
    }






    // 決定ボタンの動作
    $("[class^=use_tline_done_button]").click(function () {
        var pt_num = $(this).attr("class").slice(-1);
        $(".tline_skl_list" + pt_num).css("display", "none");
        $(".tline_job_list").css("display", "none");
    })


    //特定エリア以外のクリックで実行
    $(".mainContents_container_center").on('click', function (e) {

        // クリックが該当なら＋になる
        var target_bool_trtd = $(e.target).closest('[class^= "tr"]').length;
        var target_bool_contents = $(e.target).closest('div[class^= "tline_skl_list"]').length + $(e.target).closest('div[class^= "tline_job_list"]').length;

        if (!target_bool_trtd) {
            if (!target_bool_contents) {
                // 完全に外の要素
                $("[class^=tline_skl_list]").css("display", "none");
                $("[class^=tline_job_list]").css("display", "none");

            } else {
                // アイコンリスト内
            }
        } else {
            // trtdのマス（スキルだったら）
            TimeLineSkillTarget(e);
        }
    });


    // 対象を選ぶスキルの選択しをクリックした場合
    function TimeLineSkillTarget(e) {

        var select_box = $(e.target).closest('.timeline_skill_targetselect');

        if (select_box.length) {
            $("[class^=tline_skl_list]").css("display", "none");

            if (select_box.val() != null) {
                var select_val = select_box.val();
                select_box.css("visibility", "hidden").css("position", "absolute");

                if (select_val >= 0) {
                    select_box.parents('.tline_skill_icon_div').find(".select_target_job_icon").children("img").attr("src", "/images/buffsimulator/skillicon/impro" + select_val + ".png");

                } else {
                    select_box.parents('.tline_skill_icon_div').find(".select_target_job_icon").children("img").attr("src", "/images/buffsimulator/skillicon/" + select_val + "_jobicon.png");
                }
                select_box.parents('.tline_skill_icon_div').find(".select_target_job_icon").css("display", "block");



                // invにサブターゲットのアイコンをつける
                var inv_id = select_box.parents('.tline_skill_icon_div').attr("icon_num");

                var select_target_job_icon_html = select_box.parents('.tline_skill_icon_div').find(".select_target_job_icon").prop('outerHTML');
                var now_trtd = select_box.parent("div").parent("div").parent("td").attr("class");

                var select_tr = Number(now_trtd.slice(2, active_tline_trtd.indexOf("td")));
                var select_td = Number(now_trtd.slice(active_tline_trtd.indexOf("td") + 2));

                for (i = select_tr; true; i++) {
                    if ($(".tr" + (i + 1) + "td" + select_td).find("[inv_id=" + inv_id + "]").length > 0) {
                        $(".tr" + (i + 1) + "td" + select_td).find("[inv_id=" + inv_id + "]").append(select_target_job_icon_html);
                    } else {
                        break;
                    }
                }

                remain_ph_trigger_function();
            }

        }





    }


    // ジョブアイコンをクリックしたときの動作
    $(".job_icon_t").click(function () {

        // クリックされたジョブを特定
        var image_url = $(this).children("img").attr("src");
        var job_name = image_url.slice(image_url.lastIndexOf("/") + 1, -12);

        var active_tline_trtd_exist = [];

        //スキルテーブルにすでにあるスキルを抽出
        $("." + active_tline_trtd).children("div").children("img").each(function () {
            active_tline_trtd_exist.push($(this).attr("src"));
        });


        // 最大数までしか選択できない

        // クリックしたアイコンが存在するか確認
        var active_tline_trtd_exist_bool = $.inArray($(this).children("img").attr("src"), active_tline_trtd_exist);

        if (active_tline_trtd_exist_bool > -1) {
            // 存在する

            // アイコンを消す
            $("." + active_tline_trtd).children().eq(active_tline_trtd_exist_bool).remove();
            $(this).children("img").removeClass("use_skl_click");


        } else {
            // 存在しない

            // 最大数までしか選択できない
            if (active_tline_trtd_exist.length < max_select_num) {

                $("." + active_tline_trtd).append($("<div target_job_id=" + job_name + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + job_name + "_jobicon.png></div>"));
                $(this).children("img").addClass("use_skl_click");
            } else {
                alert("攻撃対象が" + max_select_num + "人の攻撃です")
            }

        }


        //最終的なテーブル上のスキルを確認
        // テーブルの中のジョブを抽出
        active_tline_trtd_exist = [];
        $("." + active_tline_trtd).children("div").each(function (index) {
            var target_job_id = $(this).attr("target_job_id");
            active_tline_trtd_exist.push(target_job_id);
        })

        // いったん全て消す
        $("." + active_tline_trtd).children("div").remove();

        //並び替えをする
        var job_list_array = jobSortFunction(active_tline_trtd_exist);

        job_list_array.forEach(job_name => {
            $("." + active_tline_trtd).append($("<div target_job_id=" + job_name + " class='target_icon'><img src=/images/buffsimulator/skillicon/" + job_name + "_jobicon.png></div>"));
        });

    })


    function jobSortFunction(active_tline_trtd_exist) {
        var all_job_list = ["paladin", "warrior", "darkknight", "gunbreaker", "monk", "dragoon", "ninja", "samurai", "reaper", "bard", "machinist", "dancer", "blackmage", "summoner", "redmage", "whitemage", "scholar", "astrologian", "sage"]
        var return_job_list = [];

        all_job_list.forEach(element => {

            if (active_tline_trtd_exist.indexOf(element) > -1) {
                return_job_list.push(element);
            }

        });

        return return_job_list;

    }





    // スキルアイコンをクリックしたときの動作
    $("[class*=tline_skill_icon]").click(function () {
        // 残HP計算用の配列を殻にする
        efect_time_tr = [];

        var image_url = $(this).children("img").attr("src");

        // スキルナンバー,ジョブ名取得
        var skill_num = image_url.slice(image_url.indexOf(".") - 2, -4);
        if (Number(skill_num) > 9) {
            var job_name = image_url.slice(image_url.lastIndexOf("/") + 1, -6);

        } else {
            skill_num = image_url.slice(image_url.indexOf(".") - 1, -4);
            var job_name = image_url.slice(image_url.lastIndexOf("/") + 1, -5);
        }

        var active_tline_trtd_exist = [];

        //スキルテーブルにすでにあるスキルを抽出
        $("." + active_tline_trtd).children("div").children("img").each(function () {
            active_tline_trtd_exist.push($(this).attr("src"));
        });

        // クリックしたアイコンが存在するか確認
        var active_tline_trtd_exist_bool = $.inArray($(this).children("img").attr("src"), active_tline_trtd_exist);

        if (active_tline_trtd_exist_bool > -1) {
            // 存在する

            // アクティブのtrtdの位置を抽出
            var next_select_tr = Number(active_tline_trtd.slice(2, active_tline_trtd.indexOf("td")));
            var next_select_td = Number(active_tline_trtd.slice(active_tline_trtd.indexOf("td") + 2));



            var for_bool = 1;
            var for_bool2 = 1;
            next_select_tr++;//調整

            //自分が何番目のスキル要素か取得
            var icon_num_array = [];
            $("." + active_tline_trtd).find(".tline_skill_icon_div").each(function () {
                icon_num_array.push($(this).attr("icon_num"));
            });

            var active_div_icon_num = icon_num_array.indexOf(job_name + skill_num) + 1;
            var count_skill_num = active_div_icon_num + $("." + active_tline_trtd).find(".tline_skill_icon_inv").length


            // アイコンを消す
            $("." + active_tline_trtd).children().eq(active_tline_trtd_exist_bool).remove();

            // 効果時間のinvdivを消す
            for (i = 0; for_bool; i++) {
                var next_trtd = "tr" + next_select_tr + "td" + next_select_td;

                // アクティブのtrの情報を残HP用の配列にpush（調整で-1）
                efect_time_tr.push(next_select_tr - 1);

                for_bool = $("." + next_trtd).find(".tline_skill_icon_inv").eq(count_skill_num - 1).remove().length;
                next_select_tr++;

                // 空き部分を埋めたinvdivを消す
                if (!for_bool) {
                    var prev_select_tr = next_select_tr - 1;


                    // 後ろからinvdivを確認
                    for (i = 0; for_bool2; i++) {
                        prev_select_tr--;
                        var prev_trtd = "tr" + prev_select_tr + "td" + next_select_td;

                        // 自分より後ろに効果時間があればその場所で終わり(消すかどうかのチェック)
                        for (i = active_div_icon_num; i < $("." + prev_trtd).children("div").length; i++) {
                            if ($("." + prev_trtd).children(".tline_skill_icon_inv").eq(i - 1).attr("class") == "tline_skill_icon_inv") {
                                for_bool2 = false;
                                break;
                            };
                        }

                        if (for_bool2) {
                            for_bool2 = $("." + prev_trtd).children('[inv_id=' + job_name + skill_num + ']').remove().length;
                        }

                    }

                }

            }

            var for_bool3 = true;
            // 残りinvを特殊invへ変換
            for (i = 0; for_bool3; i++) {

                // 特殊invにidを変換
                $("." + prev_trtd).children('[inv_id=' + job_name + skill_num + ']').attr("inv_id", "invisible").length;

                // 逆順に確認
                $($("." + prev_trtd).children("[class^='tline_skill_icon_']").get().reverse()).each(function () {
                    if ($(this).attr("inv_id") == "invisible") {
                        $(this).remove();
                    } else {
                        return false;
                    }

                });

                if (prev_trtd == active_tline_trtd) {
                    for_bool3 = false;
                }

                prev_select_tr--;
                prev_trtd = "tr" + prev_select_tr + "td" + next_select_td;

            }

            // リキャスト時間のinvdivを消す
            $(".time_line_timekeyper_table").find("[recast_active_tl=" + active_tline_trtd + "]" + "[recast_job_num=" + job_name + skill_num + "]").remove();


            // HP残の計算
            remain_ph_trigger_function();

        } else {
            //存在しない
            $("." + active_tline_trtd).append($("<div class='tline_skill_icon_div' icon_num='" + job_name + skill_num + "'><img src=" + image_url + "></div>"));
            $("." + active_tline_trtd).children(".tline_skill_icon_div").last().append($('<div class="tline_skill_icon_bg ' + job_name + skill_num + '"></div>'));
            $("." + active_tline_trtd).children(".tline_skill_icon_div").last().append($('<div class="tline_skill_icon_bg_recast recast_' + job_name + skill_num + '"></div>'));
            $("." + active_tline_trtd).children(".tline_skill_icon_div").last().append($("<div class='select_target_job_icon'><img src='/'></div>"));

            // サブリストがあるスキルかどうか
            var sub_list_bool = false;

            // アクティブのtrの情報を残HP用の配列にpush
            efect_time_tr.push(Number(active_tline_trtd.slice(2, active_tline_trtd.indexOf("td"))));

            // ターゲットリスト追加
            var trtd_target_list = $(".timeline_skill_targetselect_div").html();
            var aux_option = job_name + skill_num;
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
                case "astrologian1":
                case "astrologian5":
                case "astrologian7":
                case "sage1":
                case "sage6":
                case "sage7":
                case "sage10":
                    $("." + active_tline_trtd).children(".tline_skill_icon_div").last().append(trtd_target_list);
                    sub_list_bool = true;
                    break;

                case "dancer2":
                    $("." + active_tline_trtd).children(".tline_skill_icon_div").last().append(trtd_target_list);
                    var target_one = $("." + active_tline_trtd).children(".tline_skill_icon_div");
                    target_one.find(".timeline_skill_targetselect > option").remove();
                    target_one.find(".timeline_skill_targetselect").append($('<option selected disabled value>').html(""));
                    target_one.find(".timeline_skill_targetselect").append($('<option>').html("0").val("0"));
                    target_one.find(".timeline_skill_targetselect").append($('<option>').html("1").val("1"));
                    target_one.find(".timeline_skill_targetselect").append($('<option>').html("2").val("2"));
                    target_one.find(".timeline_skill_targetselect").append($('<option>').html("3").val("3"));
                    target_one.find(".timeline_skill_targetselect").append($('<option>').html("4").val("4"));
                    sub_list_bool = true;

            }


            // リキャストタイムの表示
            $(':checkbox[name="cbox_recasttime"]:checked').each(function () {
                $(".tline_skill_icon_bg_recast").css("opacity", "0.5");
            });


            // 選択したスキル情報を取得
            var aryCheck = all_skill_data.filter(value => {
                if (value.job_e == job_name && value.skill_no == skill_num) {
                    return true;
                }
            });
            var select_skill = aryCheck[0];


            // 選択したタイムラインのtimeを取得
            var use_time = active_tline_trtd.slice(0, active_tline_trtd.indexOf("td") + 2);
            var use_time_num = Number($("." + use_time + "1").text()); //スキル開始地点の時間

            var use_time_next_tr_temp = Number(use_time.slice(2, active_tline_trtd.indexOf("td"))); //選択の次の値を取得
            var use_time_next_tr = use_time_next_tr_temp;
            use_time_next_tr += 1;

            var use_time_next_trtd = "tr" + use_time_next_tr + "td1";
            var use_time_next = Number($("." + use_time_next_trtd).text()); //スキル開始地点の時間

            // 透明スキルの位置
            var inv_skill_tr;
            var inv_skill_td = active_tline_trtd.slice(-2);
            if (Number(inv_skill_td) > 9) {
            } else {
                var inv_skill_td = active_tline_trtd.slice(-1);
            }



            // 効果時間を測定
            var skill_efect_time = select_skill["efect_time"];

            var tr_length = $(".time_line_timekeyper_table").find("tr").length - 1;

            var bool_prev_skill = false;


            // 効果時間div挿入
            use_time_next_tr++;
            for (i = 0; use_time_next - use_time_num < skill_efect_time; use_time_next_tr++) {



                // バリアの場合、ダメージがあったら終わり
                var skill_job_num = job_name + skill_num;
                var barrier_skill_bool = barrierListExist(skill_job_num);

                if (barrier_skill_bool) {
                    var now_time = use_time_next_tr - 2;
                    if ($(".tr" + now_time + "td" + damage_type).text() == "hit") {

                        break;
                    }
                }




                // 透明スキルを挿入
                //単純に挿入
                inv_skill_tr = use_time_next_tr - 1;

                // アクティブのtrの情報を残HP用の配列にpush
                efect_time_tr.push(inv_skill_tr);

                //透明スキルがいくつ入っているか
                var count_inv_skill_num = $(".tr" + inv_skill_tr + "td" + inv_skill_td).find("[class^='tline_skill_icon_']").length;

                //自分が何番目のスキル要素か取得
                var count_skill_num = $("." + active_tline_trtd).find(".tline_skill_icon_div").length + $("." + active_tline_trtd).find(".tline_skill_icon_inv").length;


                // スキル挿入よりも前にスキルがある場合の処理
                if (count_skill_num <= count_inv_skill_num) {
                    $(".tr" + inv_skill_tr + "td" + inv_skill_td).children("[class^='tline_skill_icon_']").eq(count_skill_num - 1).before("<div class='tline_skill_icon_inv' inv_id='" + job_name + skill_num + "' ><img src=/images/buffsimulator/skillicon/" + job_name + skill_num + ".png></div>");
                    bool_prev_skill = true;

                    var loop_bool = true;

                    // 使用時間より左側にすでにinvがある場合自分に染める（ただしコピー品のみ）
                    for (i = count_skill_num - 2; i >= 0 && loop_bool; i--) {

                        var temp_trtd_eqi = $(".tr" + inv_skill_tr + "td" + inv_skill_td).children("[class^='tline_skill_icon_']").eq(i);

                        if (temp_trtd_eqi.attr("class") == "tline_skill_icon_inv" && temp_trtd_eqi.attr("prepend_id") == "copy") {
                            temp_trtd_eqi.attr("inv_id", job_name + skill_num);
                            temp_trtd_eqi.children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name + skill_num + ".png");

                        } else {

                            loop_bool = false;
                        }

                    }


                } else {

                    // スタンダードに効果時間のinvを挿入する部分
                    for (i = count_inv_skill_num; i < count_skill_num; i++) {
                        if (i < count_skill_num - 1) {
                            $(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='tline_skill_icon_inv' inv_id='" + job_name + skill_num + "' ><img src=/images/buffsimulator/skillicon/skilliconnull.png></div>"));
                            //$(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='tline_skill_icon_inv' inv_id='" + job_name + skill_num + "' ><img src=/images/buffsimulator/skillicon/" + job_name + skill_num + ".png></div>"));
                            // デバッグ用

                        } else {
                            $(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='tline_skill_icon_inv' inv_id='" + job_name + skill_num + "' ><img src=/images/buffsimulator/skillicon/skilliconnull.png></div>"));
                            //$(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='tline_skill_icon_inv' inv_id='" + job_name + skill_num + "' ><img src=/images/buffsimulator/skillicon/" + job_name + skill_num + ".png></div>"));
                            // デバッグ用
                        }

                    }
                }


                use_time_next_trtd = "tr" + use_time_next_tr + "td1";
                use_time_next = Number($("." + use_time_next_trtd).text()); //スキル開始地点の時間

                // 最後の行でやめる
                if (use_time_next == 0) {
                    break;
                }


            }


            // invを調整、すでにあるスキルの前に入れる場合(効果時間後の空きに前の分のinvを挿入)
            if (bool_prev_skill) {

                //自分が何番目のスキル要素か取得
                var count_skill_num = $("." + active_tline_trtd).find(".tline_skill_icon_div").length + $("." + active_tline_trtd).find(".tline_skill_icon_inv").length;

                var next_trtd = "tr" + (inv_skill_tr + 1) + "td" + inv_skill_td;
                var next_trtd_first = $("." + next_trtd).children("[class^='tline_skill_icon_']").eq(count_skill_num - 1);
                var loop_bool = true;


                for (i = 2; loop_bool; i++) {

                    if (next_trtd_first.attr("class") == "tline_skill_icon_inv") {
                        next_trtd_first.before(next_trtd_first.prop("outerHTML"));
                        $("." + next_trtd).children("[class^='tline_skill_icon_']").eq(count_skill_num - 1).attr("prepend_id", "copy");
                    } else {

                        loop_bool = false;
                    }



                    next_trtd = "tr" + (inv_skill_tr + i) + "td" + inv_skill_td;
                    next_trtd_first = $("." + next_trtd).children("[class^='tline_skill_icon_']").eq(count_skill_num - 1);

                }
            }

            var minus = $("." + use_time_next_trtd).offset().top - $("." + active_tline_trtd).find(".tline_skill_icon_div").offset().top;
            $("." + active_tline_trtd).find("." + job_name + skill_num).css("height", minus + "px");


            // リキャスト時間を測定
            var skill_recast = select_skill["recast_time"];

            var use_time_next_tr = use_time_next_tr_temp;
            use_time_next_tr += 1;

            var use_time_prev_tr = use_time_next_tr_temp;
            use_time_prev_tr -= 1;

            var use_time_next_trtd = "tr" + use_time_next_tr + "td1";
            var use_time_prev_trtd = "tr" + use_time_prev_tr + "td1";
            var use_time_next = Number($("." + use_time_next_trtd).text()); //スキル開始地点の時間
            var use_time_prev = Number($("." + use_time_prev_trtd).text()); //スキル開始地点の時間

            use_time_next_tr++;
            use_time_prev_tr--;


            // リキャストdiv挿入
            for (i = 1; use_time_next - use_time_num < skill_recast; use_time_next_tr++) {

                // 透明スキルを挿入
                //単純に挿入
                inv_skill_tr = use_time_next_tr - 1;

                $(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='recast_time' recast_id=" + use_time_num + " name=" + image_url + " recast_active_tl =" + active_tline_trtd + " recast_job_num =" + job_name + skill_num + "><img src=/images/buffsimulator/skillicon/skilliconnull.png></div>"));
                //$(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='recast_time' recast_id='" + active_tline_trtd + "' name='" + job_name + skill_num + "'><img src=/images/buffsimulator/" + job_name + skill_num + ".png></div>"));
                //デバッグ用

                use_time_next_trtd = "tr" + use_time_next_tr + "td1";
                use_time_next = Number($("." + use_time_next_trtd).text()); //スキル開始地点の時間

                // 最後の行でやめる
                if (use_time_next == 0) {
                    break;
                }

            }

            // リキャストdiv挿入（逆）
            for (i = 1; use_time_num - use_time_prev < skill_recast; use_time_prev_tr--) {

                // 透明スキルを挿入
                //単純に挿入
                inv_skill_tr = use_time_prev_tr + 1;

                $(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='recast_time' recast_id=" + use_time_num + " name=" + image_url + " recast_active_tl =" + active_tline_trtd + " recast_job_num =" + job_name + skill_num + "><img src=/images/buffsimulator/skillicon/skilliconnull.png></div>"));
                //$(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='recast_time' recast_id='" + active_tline_trtd + "' name='" + job_name + skill_num + "'><img src=/images/buffsimulator/" + job_name + skill_num + ".png></div>"));
                //デバッグ用

                use_time_prev_trtd = "tr" + use_time_prev_tr + "td1";
                use_time_prev = Number($("." + use_time_prev_trtd).text()); //スキル開始地点の時間

                // 最後の行でやめる
                if (use_time_prev == 0) {
                    break;
                }

            }



            var minus_recast = $("." + use_time_next_trtd).offset().top - $("." + active_tline_trtd).find(".tline_skill_icon_div").offset().top;
            $("." + active_tline_trtd).find(".recast_" + job_name + skill_num).css("height", minus_recast - minus + "px");
            $("." + active_tline_trtd).find(".recast_" + job_name + skill_num).css("top", minus + "px");

        }

        if (!sub_list_bool) {
            remain_ph_trigger_function();
        }


    });


    function barrierListExist(skill_job_num) {

        if (barrier_skill_list_job_num.indexOf(skill_job_num) > -1) {
            return true;
        } else {
            return false;
        }

    }



    var efect_time_tr = [];

    // タイムライン・ダメージ模擬計算
    $(".contents4_remain_ph, .remain_ph_trriger").click(function () {
        remain_ph_trigger_function();
    });

    function remain_ph_trigger_function() {
        var target_tr = 0;

        // どのスキルが選択されているかを抽出
        var all_done_skill_list = [];
        var all_done_skill_list_sub = [];
        var job_name_list = [];
        var all_job_status = {};

        timelineDataForEach(job_key_no, damage_key_no, remainhp_key_no, target_tr, all_done_skill_list, all_done_skill_list_sub, job_name_list, all_job_status, damage_resits, damage_type)

    }

    async function timelineDataForEach(job_key_no, damage_key_no, remainhp_key_no, target_tr, all_done_skill_list, all_done_skill_list_sub, job_name_list, all_job_status, damage_resits, damage_type) {

        var timeline_index = 1;
        efect_time_tr.forEach(async element => {

            // 初期化
            target_tr = element;
            all_done_skill_list = [];
            all_done_skill_list_sub = [];
            job_name_list = [];

            // ダメージタイプhitのときのみ計算


            if ($(".tr" + target_tr + "td" + damage_resits).text() == "Magical") {
                var damage_element = "magic";
            } else {
                var damage_element = "physics";
            }

            for (i = 1; i < 9; i++) {

                var job_name = $(".pt_membere_select").eq(i - 1).val();
                var skill_no_list = [];
                var skill_no_list_sub = [];

                //ジョブ名だけリスト化し渡す。
                job_name_list.push(job_name);


                // 表示されているスキルアイコンをもとに抽出
                var td_temp = i + job_key_no - 1;
                $(".tr" + target_tr + "td" + td_temp).children(".tline_skill_icon_div").each(function () {

                    var skill_url = $(this).children("img").attr("src");
                    var skill_no = skillNumberSearch(skill_url);
                    skill_no_list.push(skill_no);

                    // 補助項目の有無
                    var target = $(this).children(".timeline_skill_targetselect_one").children(".timeline_skill_targetselect").val();
                    if (target === null) {
                        target = all_job_list_parents[0];
                    }
                    var dict = { [skill_no]: target };
                    skill_no_list_sub.push(dict);

                });

                // 表示されているスキルアイコンをもとに抽出(inv)
                $(".tr" + target_tr + "td" + td_temp).children(".tline_skill_icon_inv").each(function () {

                    var skill_id = $(this).attr("inv_id");
                    var skill_no = skillNumberSearchId(skill_id);

                    if ($.inArray(skill_no, skill_no_list) > -1) {
                    } else {
                        skill_no_list.push(skill_no);
                    }

                    //補助項目の有無
                    var job_src = $(this).children(".select_target_job_icon").children("img").attr("src");


                    if (job_src === undefined) {
                    } else if (job_src.slice(job_src.lastIndexOf("/") + 1, -5) == "impro") {
                        var sub_target_job = job_src.slice(job_src.lastIndexOf("impro") + 5, -4);
                    } else {
                        var sub_target_job = job_src.slice(job_src.lastIndexOf("/") + 1, -12);
                    }

                    var target = sub_target_job;
                    if (target === null) {
                        target = all_job_list_parents[0];
                    }
                    var dict = { [skill_no]: target };
                    skill_no_list_sub.push(dict);

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

            if ($(".tr" + target_tr + "td" + damage_type).text() == "hit") {

                // 対象だけ表示する用のリスト
                var target_job_list = targetCharHpDisplay(target_tr);
                await timeLineDataAjax(all_done_skill_list, all_done_skill_list_sub, job_name_list, damage_element, all_job_status, target_tr, damage_key_no, remainhp_key_no, target_job_list);

            } else {
                // hitではなかった時の処理


            }

        });

    }



    async function timeLineDataAjax(all_done_skill_list, all_done_skill_list_sub, job_name_list, damage_element, all_job_status, target_tr, damage_key_no, remainhp_key_no, target_job_list) {

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

                console.log("now");

                var all_buff_list = data["all_buff_list"];
                var de_buff_boss = data["de_buff_boss"];
                var f_ten = data["f_ten"];
                var index = 1;
                var original_damage = [];

                // 総バリア量初期化
                $(".tr" + target_tr + "td" + total_barrier_no).text("0");
                // 総軽減率初期化
                $(".tr" + target_tr + "td" + total_buff_no).text("0");

                job_name_list.forEach(job_name => {

                    // 最大HP
                    var max_hp = $("[name=pt_member" + index + "_hit_point]").val();
                    all_buff_list[job_name]["f_HP"].forEach(f_HP => {
                        max_hp = Math.floor(max_hp * Number(f_HP));
                    });

                    //var Remain_hp = $("[name=pt_member" + index + "_Remain_hit_point]").val();
                    var barrier = 0;
                    var hit_damage = Number($(".tr" + target_tr + "td" + damage_key_no).text());

                    all_buff_list[job_name]["f_BRR"].forEach(val => {
                        barrier += Number(val);
                    });


                    // ヒットダメージ
                    //hit_damage = barrier + Number(max_hp) - Number(Remain_hp);

                    // 防御効果計算
                    var damage_att = damage_element;
                    if (damage_att == "magic") {
                        var damage_att_defense = $("[name=pt_member" + index + "_magical_defenses]").val();
                    } else {
                        var damage_att_defense = $("[name=pt_member" + index + "_physical_defenses]").val();
                    }
                    var f_DEF = Math.floor(15 * damage_att_defense / 1900, 0) / 100;
                    var f_TNC = f_ten[index - 1];
                    var f_RND = 1;
                    var f_BUF = all_buff_list[job_name]["f_BUF"];
                    var f_DBUF = de_buff_boss["f_DBUF"];

                    // バフ入りダメージ
                    var damage_onbuff = Math.floor(hit_damage * (1 - f_DEF) * (2 - f_TNC));
                    damage_onbuff = Math.floor(damage_onbuff * f_RND);

                    // バフ/デバフを抜く
                    var damage_nobuff = damage_onbuff;
                    f_BUF.forEach(buf => {
                        damage_nobuff = Math.floor(damage_nobuff * buf);
                    });

                    f_DBUF.forEach(dbuf => {
                        damage_nobuff = Math.floor(damage_nobuff * dbuf);
                    });

                    original_damage.push(damage_nobuff);


                    // 残HP表示
                    var Remain_hp = max_hp - damage_nobuff + barrier;

                    // いったん全部表示させてHPに色付け
                    $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("display", "flex");

                    if (Remain_hp <= 0) {
                        // ０以下なら
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("color", "red");
                    } else if (Remain_hp <= 999) {
                        // ０以上なら
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("color", "#ff7b00");
                    } else {
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("color", "white");
                    }

                    //表示ジョブリストの中に対象ジョブがいるか
                    var job_exist = $.inArray(job_name, target_job_list);

                    if (job_exist > -1 || target_job_list[0] == "all") {
                        //いる
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("display", "flex");
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).children(".ptmem_hpnum").text(Remain_hp);



                        // バリア量を”総バリア量”に表示
                        // 場所を特定
                        var total_barrier_num = Number($(".tr" + target_tr + "td" + total_barrier_no).text());

                        // バリアー最小値を表示
                        if (total_barrier_num == 0) {
                            $(".tr" + target_tr + "td" + total_barrier_no).text(barrier);
                        } else if (total_barrier_num > barrier) {
                            $(".tr" + target_tr + "td" + total_barrier_no).children("div").text(barrier);
                        }


                        // 軽減率を”総軽減率”に表示
                        // 場所を特定
                        var total_buff_num = Number($(".tr" + target_tr + "td" + total_buff_no).text().slice(0, -1));
                        var effect_buff_dbuff = 1;

                        f_BUF.forEach(buf => {
                            effect_buff_dbuff = effect_buff_dbuff * buf;
                        });

                        f_DBUF.forEach(dbuf => {
                            effect_buff_dbuff = effect_buff_dbuff * dbuf;
                        });

                        var effect_buff_dbuff_num = 1 - effect_buff_dbuff;
                        effect_buff_dbuff_num = Math.round(effect_buff_dbuff_num * 1000) / 10;//四捨五入しながら%にする

                        // 軽減率最小値を表示
                        if (total_buff_num == 0) {
                            $(".tr" + target_tr + "td" + total_buff_no).text(effect_buff_dbuff_num + "%");
                        } else if (total_buff_num > effect_buff_dbuff_num) {
                            $(".tr" + target_tr + "td" + total_buff_no).text(effect_buff_dbuff_num + "%");
                        }

                    } else {
                        //いない
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("display", "none");
                    }

                    index++;

                });

                return true;

            })


            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fallout");
                alert("エラーが発生しています。\n「OK」を押してしばらく待ってから再度お試しください（5分くらい）\nこのメッセージは何度か表示されることがあります。")
                return false;
            });

    }


    var remain_hp_all_display_bool = false;
    function targetCharHpDisplay(target_tr) {
        if (!remain_hp_all_display_bool) {

            // 対象の位置を特定
            var party_target_no = header_text_list.indexOf("対象") + 1;
            // var use_time = active_tline_trtd.slice(0, active_tline_trtd.indexOf("td") + 2);
            var target_job_id_array = [];

            // 対象の中身を取得
            var target_trtd = "tr" + target_tr + "td" + party_target_no;

            $("." + target_trtd).children("div").each(function (index) {
                var target_job_id = $(this).attr("target_job_id");
                target_job_id_array.push(target_job_id);
            })
            return target_job_id_array;

        }
    }


    // ジョブアイコンをクリックしたときの動作
    $("[class*=job_icon_t]").click(function () {

        // 効果時間の疑似的な値を渡す
        efect_time_tr = [];
        var select_tr = Number(active_tline_trtd.slice(2, active_tline_trtd.indexOf("td")));
        efect_time_tr.push(select_tr);

        remain_ph_trigger_function();
    })


    // 残HPをすべて計算
    function allRemainHpCalc() {
        // 現在の状態でいったん残HP予測を処理する
        // 効果時間の疑似的な値を渡す
        efect_time_tr = [];
        var bool = "done";

        for (i = 2; bool != ""; i++) {
            efect_time_tr.push(i);
            bool = $(".tr" + i + "td1").text();

        }

        remain_ph_trigger_function();

    }

    // 隠したボタン動作（残HP計算）
    $(".button_all_remain_hp_calc_button").click(function () {
        var result = window.confirm('時間がかかることがありますがよろしいですか？');

        if (result) {
            allRemainHpCalc();
        }
    })


    // 現在の状態の保存する
    $(".button_data_save_div_button").click(function () {

        // タイムラインのhtmlを取得
        var timeline_data = $(".timeline_div").html();

        var pt_data = dataSearchFunc();

        // 多次元連想配列がajaxできないので仕方なく分解する
        var job_status0 = pt_data[0][pt_data[1][0]];
        var job_status1 = pt_data[0][pt_data[1][1]];
        var job_status2 = pt_data[0][pt_data[1][2]];
        var job_status3 = pt_data[0][pt_data[1][3]];
        var job_status4 = pt_data[0][pt_data[1][4]];
        var job_status5 = pt_data[0][pt_data[1][5]];
        var job_status6 = pt_data[0][pt_data[1][6]];
        var job_status7 = pt_data[0][pt_data[1][7]];

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
            url: "/buffsimulator/ajax_save_data",
            dataType: "json",
            data: {
                timeline_data: timeline_data,
                job_name_list: pt_data[1],
                all_job_status1: job_status0,
                all_job_status2: job_status1,
                all_job_status3: job_status2,
                all_job_status4: job_status3,
                all_job_status5: job_status4,
                all_job_status6: job_status5,
                all_job_status7: job_status6,
                all_job_status8: job_status7,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                console.log("done");
                alert("http://localhost:8000/buffsimulator/" + data[0]);


            })
            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");
            });
    })


    // 状態保存で必要な情報を集める
    function dataSearchFunc() {

        // 初期化
        var job_name_list = [];
        var all_job_status = [];

        for (i = 1; i < 9; i++) {

            var job_name = $(".pt_membere_select").eq(i - 1).val();

            //ジョブ名だけリスト化し渡す。
            job_name_list.push(job_name);

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

        }

        var return_data = [];
        return_data.push(all_job_status);
        return_data.push(job_name_list);

        return return_data;



    }


    //PTメンバー情報を反映
    async function ptMemberSaveDataLoad(save_url) {

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
            url: "/buffsimulator/ajax_load_savedata",
            dataType: "json",
            data: {
                save_url: save_url,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                console.log("done");

                var pt_job = data[0];
                var pt_status = data[1];

                pt_job.forEach(function (job_name, index) {
                    $("[name=pt_member" + (index + 1) + "_job]").val(job_name);
                    $("[name=pt_member" + (index + 1) + "_hit_point]").val(pt_status[job_name]["hit_point"]);
                    $("[name=pt_member" + (index + 1) + "_physical_defenses]").val(pt_status[job_name]["physical_defenses"]);
                    $("[name=pt_member" + (index + 1) + "_magical_defenses]").val(pt_status[job_name]["magical_defenses"]);
                    $("[name=pt_member" + (index + 1) + "_tenacity]").val(pt_status[job_name]["tenacity"]);
                    $("[name=pt_member" + (index + 1) + "_determination]").val(pt_status[job_name]["determination"]);
                    $("[name=pt_member" + (index + 1) + "_mind]").val(pt_status[job_name]["mind"]);
                    $("[name=pt_member" + (index + 1) + "_weapon_damage]").val(pt_status[job_name]["weapon_damage"]);
                    $("[name=pt_member" + (index + 1) + "_Remain_hit_point]").val(pt_status[job_name]["Remain_hit_point"]);

                });

                // メンバーリスト更新
                ptMemberListRefresh();

                // 軽減タイムラインに
                $(".left_menu4").trigger("click");

                // タイムライン反映
                saveDataLoad(data[2]);


            })


            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");

            });

    }


    // タイムラインを反映
    function saveDataLoad(save_url) {

        $(".timeline_div").children().remove();

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
            url: "/buffsimulator/ajax_load_timelinedatadata",
            dataType: "json",
            data: {
                save_url: save_url,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                console.log("done");

                $(".timeline_div").append(data[0]);

            })
            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");


            });


    }






});

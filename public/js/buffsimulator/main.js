$(function () {

    // マウス位置
    var mX;
    var mY;
    var scroll_top = 0;

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




    // マウスの位置を監視
    document.body.addEventListener("mousemove", function (e) {

        //座標を取得する
        mX = e.pageX;  //X座標
        mY = e.pageY;  //Y座標
        var X_ad = 0; //調整

        //画面半分以上来たら表示の方向を変える
        if (mX > 960) {
            var X_ad = 410;
        }

        $(".skl_icon_sub").css("top", mY - 35);
        $(".skl_icon_sub").css("left", mX + 5 - X_ad);

    });

    $(window).scroll(function () {
        scroll_top = $(this).scrollTop();
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

    //タイムライン初期設置
    timeLineDisplay($(".timeline_select_phase").children("select").val());




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


    var all_skill_data = [];





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
                    for (j = 1; j < 11; j++) {
                        if (j == 1) {
                            $(".tr" + i + "td" + j).text("");
                        } else if (j == 2) {
                            $(".tr" + i + "td" + j).text("");
                        }
                    }
                }

                //データを表にする
                for (i = 1; i < data.length + 1; i++) {
                    for (j = 1; j < 18; j++) {
                        if (j == 1) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["time"]);
                        } else if (j == 2) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["skill"]);
                        } else if (j == 13) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["damage"]);
                        } else if (j == 14) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["resist"]);
                        } else if (j == 15) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["type"]);
                        } else if (j == 16) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["targettype"]);
                        } else if (j == 17) {
                            $(".tr" + i + "td" + j).text(data[i - 1]["targetjob"]);
                        } else if (j == 3) {

                            switch (data[i - 1]["targettype"]) {
                                case "all":
                                    $(".tr" + i + "td" + j).append($("<div class='target_icon'><img src=/images/buffsimulator/skillicon/alljobicon.png></div>")); break;
                                case "selectone":
                                case "selecttwo":
                                case "selectthree":
                                case "selectfour":
                                case "selectfive":
                                case "selectsix":
                                case "selectseven":
                                case "tank":
                                case "dps":
                                case "healer":
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
    $(".left_menu4").one("click", function () {

        var job_name_list = [];
        var job_name_list_eng = [];

        $(".time_line_timekeyper_table").find('td:nth-child(14)').css("visibility", "hidden");
        $(".time_line_timekeyper_table").find('td:nth-child(15)').css("visibility", "hidden");

        for (i = 1; i < 9; i++) {

            var job_name = $(".pt_membere_select option:selected").eq(i - 1).text();
            var job_name_eng = $(".pt_membere_select").eq(i - 1).val();
            var skill_no_list = [];
            var skill_no_list_sub = [];

            //ジョブ名だけリスト化し渡す。
            job_name_list.push(job_name);
            job_name_list_eng.push(job_name_eng);
        }


        // ヘッダーリストの調整
        job_name_list.unshift("time", "スキル名", "対象");


        //スキルアイコン読み込み
        for (i = 1; i < 9; i++) {
            var dase_ual = "/images/buffsimulator/skillicon/";
            var job_eng = $("[name=pt_member" + i + "_job]").val();

            //あとはここを1-12で回して、画像を設置する
            for (j = 1; j < 13; j++) {
                $(".tline_skill_icon" + i).eq(j - 1).append($("<img src=" + dase_ual + job_eng + j + ".png" + " >"));
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
        $(".tr0td" + 14).text("resits");
        $(".tr0td" + 15).text("type");
        $(".tr0td" + 16).text("targettype");
        $(".tr0td" + 17).text("targetjob");

        // ジョブアイコン挿入
        var trtd_hp_div = $(".trtd_hp").html();
        var tr_length = $(".time_line_timekeyper_table").find("tr").length;

        for (i = 1; i < tr_length; i++) {
            $(".tr" + i + "td12").append(trtd_hp_div);
        }

        // 画像変更
        $(".ptmem_hp_1").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[0] + "_jobicon.png");
        $(".ptmem_hp_2").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[1] + "_jobicon.png");
        $(".ptmem_hp_3").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[2] + "_jobicon.png");
        $(".ptmem_hp_4").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[3] + "_jobicon.png");
        $(".ptmem_hp_5").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[4] + "_jobicon.png");
        $(".ptmem_hp_6").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[5] + "_jobicon.png");
        $(".ptmem_hp_7").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[6] + "_jobicon.png");
        $(".ptmem_hp_8").children("img").attr("src", "/images/buffsimulator/skillicon/" + job_name_list_eng[7] + "_jobicon.png");



        // ターゲット対象リスト作成
        // タイムラインの内容が変わったらここを修正！！

        // スキル対象リストを初期化
        $("[name=timeline_skill_targetselect] > option").remove();
        $("[name=timeline_skill_targetselect]").append($('<option selected disabled>').html("").val(""));

        for (i = 0; i < 8; i++) {
            $("[name=timeline_skill_targetselect]").append($('<option>').html(job_name_list[i + 3]).val(job_name_list_eng[i]));
        }




        // スキルデータを取得
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
            url: "/buffsimulator/ajax_access_skilldata_only",
            dataType: "json",
            data: {
                dase_ual,
            },
        })
            // Ajaxリクエスト成功時の処理
            .done(function (data) {
                console.log("done");
                all_skill_data = data;
            })
            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");
            });
    })


    // アクティブにしたスキルリスﾄの位置を記録
    var active_tline_trtd = "";


    // スキル選択のテーブルをクリック
    $(".time_line_timekeyper_table").find("td").click(function () {

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

        });


    })


    // 決定ボタンの動作
    $("[class^=use_tline_done_button]").click(function () {
        var pt_num = $(this).attr("class").slice(-1);
        $(".tline_skl_list" + pt_num).css("display", "none");
    })


    //特定エリア以外のクリックで実行
    $(".mainContents_container_center").on('click', function (e) {
        if (!$(e.target).closest('[class^= "tr"]').length) {
            if (!$(e.target).closest('div[class^= "tline_skl_list"]').length) {
                // ターゲット要素の外側をクリックした時の操作
                $("[class^=tline_skl_list]").css("display", "none");
            } else {
                // ターゲット要素をクリックした時の操作　内

            }
        } else {
            // ターゲット要素をクリックした時の操作　外
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

                $(".contents4_remain_ph").trigger("click");

            }

        }
    }





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
            $(".contents4_remain_ph").trigger("click");


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
                            //$(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='tline_skill_icon_inv' prepend_id='copy' inv_id='" + job_name + skill_num + "' ><img src=/images/buffsimulator/skillicon/" + job_name + skill_num + ".png></div>"));
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
            $(".contents4_remain_ph").trigger("click");
        }


    });



    var efect_time_tr = [];
    // タイムライン・ダメージ模擬計算
    $(".contents4_remain_ph").click(function () {

        var job_key_no = 4;//列が増えたらここを編集
        var damage_type = 15;//列が増えたらここを編集
        var damage_resits = 14;//列が増えたらここを編集
        var damage_key_no = 13;//列が増えたらここを編集
        var remainhp_key_no = 12;//列が増えたらここを編集
        var target_tr = 0;

        // どのスキルが選択されているかを抽出
        var all_done_skill_list = [];
        var all_done_skill_list_sub = [];
        var job_name_list = [];
        var all_job_status = {};

        timelineDataForEach(job_key_no, damage_key_no, remainhp_key_no, target_tr, all_done_skill_list, all_done_skill_list_sub, job_name_list, all_job_status, damage_resits, damage_type)


    });

    async function timelineDataForEach(job_key_no, damage_key_no, remainhp_key_no, target_tr, all_done_skill_list, all_done_skill_list_sub, job_name_list, all_job_status, damage_resits, damage_type) {

        var timeline_index = 1;

        efect_time_tr.forEach(async element => {

            target_tr = element;
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

                await timeLineDataAjax(all_done_skill_list, all_done_skill_list_sub, job_name_list, damage_element, all_job_status, target_tr, damage_key_no, remainhp_key_no);

            } else {
                // hitではなかった時の処理


            }

        });

    }



    async function timeLineDataAjax(all_done_skill_list, all_done_skill_list_sub, job_name_list, damage_element, all_job_status, target_tr, damage_key_no, remainhp_key_no) {

        // 計算中表示
        $(".trtd_hp_cal_message").css("display", "block");

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

                    if (Remain_hp <= 10000000) {
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("display", "flex");
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("color", "red");
                    } else {
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("display", "none");
                        $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).css("color", "white");
                    }

                    $(".tr" + target_tr + "td" + remainhp_key_no).find(".ptmem_hp_" + index).children(".ptmem_hpnum").text(Remain_hp);

                    index++;

                });

                // 計算中表示
                $(".trtd_hp_cal_message").css("display", "none");

                return true;
            })


            // Ajaxリクエスト失敗時の処理
            .fail(function (data) {
                console.log("fall");
                return true;
            });

    }







});

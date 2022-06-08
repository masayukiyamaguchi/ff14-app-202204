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
                console.log(original_damage);
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

            $(".skill_icon_list" + pt_lit_no).find(".skill_list_target_text").text("ｽﾀｯｸ：")

        }
    })


    $(".damage_log_list_button").click(function () {
        if ($("#damage_log_list_text_id").css("display") == "none") {
            $("#damage_log_list_text_id").css("display", "block");
        } else {
            $("#damage_log_list_text_id").css("display", "none");
        }

    })


    // 軽減タイムライン




    //元ダメージリスト
    // コンテンツに変更があると、内容を変更する
    $(".timeline_select_contents").children("select").change(function () {
        var content_name = $(this).val();
        $(".timeline_select_phase").children("select").css("display", "none");
        $("#" + content_name).css("display", "inline-block");

        // 初期化
        $(".timeline_table_table").empty();
        $("#" + content_name).val("");

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

    //リキャストタイム表示
    $("#cbox_recasttime").click(function () {
        $(".tline_skill_icon_bg_recast").css("opacity", "0.0");

        $(':checkbox[name="cbox_recasttime"]:checked').each(function () {
            $(".tline_skill_icon_bg_recast").css("opacity", "0.5");
        });
    })

    $(".left_menu4").one("click", function () {

        var job_name_list_eng = [];
        var job_name_list = [];

        for (i = 1; i < 9; i++) {

            var job_name = $(".pt_membere_select option:selected").eq(i - 1).text();
            var job_name_eng = $(".pt_membere_select").eq(i - 1).val();
            var skill_no_list = [];
            var skill_no_list_sub = [];

            //ジョブ名だけリスト化し渡す。
            job_name_list.push(job_name);
        }

        // ヘッダーリストの調整
        job_name_list.unshift("time", "スキル名");


        for (j = 1; j < 11; j++) {
            $(".tr0td" + j).text(job_name_list[j - 1]);
        }

        for (i = 1; i < 200; i++) {
            for (j = 1; j < 11; j++) {
                if (j == 1) {
                    $(".tr" + i + "td" + j).text(i * 3 - 2);
                } else if (j == 2) {
                    $(".tr" + i + "td" + j).text("アスカロンメルシー");
                }
            }
        }


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
        $(".tline_skl_list" + job_num).css("left", off.left);
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
                // ターゲット要素をクリックした時の操作
            }
        } else {
            // ターゲット要素をクリックした時の操作
        }

    });


    $("[class*=tline_skill_icon]").click(function () {

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
            $("." + active_tline_trtd).children().eq(active_tline_trtd_exist_bool).remove();

        } else {
            //存在しない
            $("." + active_tline_trtd).append($("<div class='tline_skill_icon_div'><img src=" + image_url + "></div>"));
            $("." + active_tline_trtd).children(".tline_skill_icon_div").last().append($('<div class="tline_skill_icon_bg ' + job_name + skill_num + '"></div>'));
            $("." + active_tline_trtd).children(".tline_skill_icon_div").last().append($('<div class="tline_skill_icon_bg_recast recast_' + job_name + skill_num + '"></div>'));

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
            var inv_skill_td = active_tline_trtd.slice(-1);



            // 効果時間を測定
            var skill_efect_time = select_skill["efect_time"];

            var tr_length = $(".time_line_timekeyper_table").find("tr").length - 1;

            use_time_next_tr++;
            for (i = 0; use_time_next - use_time_num < skill_efect_time; use_time_next_tr++) {

                //自分が何番目のスキル要素か取得
                var count_skill_num = $("." + active_tline_trtd).children("div").length;

                // 透明スキルを挿入
                //単純に挿入
                inv_skill_tr = use_time_next_tr - 1;

                var count_inv_skill_num = $(".tr" + inv_skill_tr + "td" + inv_skill_td).children("div").length;

                for (i = count_inv_skill_num; i < count_skill_num; i++) {
                    $(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='tline_skill_icon_inv'><img src=/images/buffsimulator/skillicon/skilliconnull.png></div>"));
                }


                use_time_next_trtd = "tr" + use_time_next_tr + "td1";
                use_time_next = Number($("." + use_time_next_trtd).text()); //スキル開始地点の時間

                // 最後の行でやめる
                if (use_time_next == tr_length) {
                    break;
                }

            }

            var minus = $("." + use_time_next_trtd).offset().top - $("." + active_tline_trtd).offset().top;
            $("." + active_tline_trtd).find("." + job_name + skill_num).css("height", minus + "px");



            // リキャスト時間を測定
            var skill_recast = select_skill["recast_time"];

            var use_time_next_tr = use_time_next_tr_temp;
            use_time_next_tr += 1;

            var use_time_next_trtd = "tr" + use_time_next_tr + "td1";
            var use_time_next = Number($("." + use_time_next_trtd).text()); //スキル開始地点の時間

            use_time_next_tr++;
            for (i = 0; use_time_next - use_time_num < skill_recast; use_time_next_tr++) {


                // 透明スキルを挿入
                //単純に挿入
                inv_skill_tr = use_time_next_tr - 1;
                $(".tr" + inv_skill_tr + "td" + inv_skill_td).append($("<div class='recast_time' recast_id='" + use_time_num + "' name='" + image_url + "'><img src=/images/buffsimulator/skillicon/skilliconnull.png></div>"));


                use_time_next_trtd = "tr" + use_time_next_tr + "td1";
                use_time_next = Number($("." + use_time_next_trtd).text()); //スキル開始地点の時間

                // 最後の行でやめる
                if (use_time_next == tr_length) {
                    break;
                }

            }

            var minus_recast = $("." + use_time_next_trtd).offset().top - $("." + active_tline_trtd).offset().top;
            $("." + active_tline_trtd).find(".recast_" + job_name + skill_num).css("height", minus_recast - minus + "px");
            $("." + active_tline_trtd).find(".recast_" + job_name + skill_num).css("top", minus + "px");

        }





    });




});

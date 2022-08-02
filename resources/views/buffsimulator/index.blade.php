<!DOCTYPE html>
<html lang="jp">

<head>
    <meta charset="UTF-8">

    <!-- CSRFトークン -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!--共通のCSS-->
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">

    <!--コンテンツのCSS-->
    <link rel="stylesheet" href="/css/buffsimulator/contents.css">

    <!-- JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="/js/buffsimulator/main.js"></script>





</head>

<body id="body">

    <div id="loading">
        <div id="loading_box">
            <div class="loading-one animation_loading">
                <p class="loading-txt">Loading</p>
            </div>
        </div>
    </div>
    <div class="section">

        <!--共通ヘッダー-->
        @component('components.commonHeaderMenu')
        @endcomponent

        <div id="mainContents">
            <div class="backgroundimage">
                <div class="mainContents_container">

                    {{-- openボタン --}}
                    <div class="open_button_div">
                        <div class="open_button" tags="close">▶▶</div>
                    </div>

                    <!-- レフト　-->
                    <div class="mainContents_container_left">

                        <div class="close_button_div">
                            <div class="close_button" tags="close">×</div>
                        </div>



                        <div class="left_menu">
                            {{-- メニューの固定 left_menu_active　を移動 --}}

                            <div class="left_menu0 left_menu_active" tags="contents0">PTジョブ設定</div>
                            <div class="left_menu4" tags="contents4">軽減タイムライン</div>
                            {{-- <div class="left_menu1" tags="contents1">元ダメージ計算</div>
                            <div class="left_menu2" tags="contents2">ダメージ模擬計算</div>
                            <div class="left_menu3" tags="contents3">軽減比較</div>
                            <div class="left_menu5" tags="contents5">元ダメージリスト</div> --}}
                            <div class="left_menu6" tags="contents6">
                                <div class="contents6_menu_img">
                                    <img src="\images\buffsimulator\skillicon\tutrialmark.png" alt="">
                                </div>
                                <div class="contents6_menu_text">
                                    使い方
                                </div>
                            </div>

                        </div>

                        @if ($save_id === 'none')
                            <div class="save_id"></div>
                        @else
                            <div class="save_id_div">
                                <div class="save_id_h">【セーブID】</div>
                                <div class="save_id">{{ $save_id }}</div>
                                <div class="save_ow"><button>上書き保存</button></div>
                            </div>
                        @endif

                        <div class="left_menu">

                            <div class="left_menu7" tags="contents7">ダメージ計算について</div>

                        </div>

                    </div>


                    <!-- センター　-->
                    <div class="mainContents_container_center">

                        <div class="contents0">

                            <div class="contents0_div">

                                @for ($i = 1; $i < 9; $i++)
                                    <div class="contents0_container{{ $i }}">
                                        <div class="pt_member_h member_heder">メンバー{{ $i }}</div>
                                        <div class="pt_member_h member_job">ジョブ</div>

                                        @if ($i < 3)
                                            <select class="pt_membere_select" name="pt_member{{ $i }}_job"
                                                pt_id="{{ $i }}">
                                                <option value="" selected disabled></option>
                                                <option class="tank" value="paladin">ナイト</option>
                                                <option class="tank" value="warrior">戦士</option>
                                                <option class="tank" value="darkknight">暗黒騎士</option>
                                                <option class="tank" value="gunbreaker">ガンブレイカー</option>
                                            </select>
                                        @elseif($i < 5)
                                            <select class="pt_membere_select" name="pt_member{{ $i }}_job"
                                                pt_id="{{ $i }}">
                                                <option value="" selected disabled></option>
                                                <option class="dps" value="monk">モンク</option>
                                                <option class="dps" value="dragoon">竜騎士</option>
                                                <option class="dps" value="ninja">忍者</option>
                                                <option class="dps" value="samurai">侍</option>
                                                <option class="dps" value="reaper">リーパー</option>
                                            </select>
                                        @elseif($i < 6)
                                            <select class="pt_membere_select" name="pt_member{{ $i }}_job"
                                                pt_id="{{ $i }}">
                                                <option value="" selected disabled></option>
                                                <option class="dps" value="bard">吟遊詩人</option>
                                                <option class="dps" value="machinist">機工士</option>
                                                <option class="dps" value="dancer">踊り子</option>
                                            </select>
                                        @elseif($i < 7)
                                            <select class="pt_membere_select" name="pt_member{{ $i }}_job"
                                                pt_id="{{ $i }}">
                                                <option value="" selected disabled></option>
                                                <option class="dps" value="blackmage">黒魔道士</option>
                                                <option class="dps" value="summoner">召喚士</option>
                                                <option class="dps" value="redmage">赤魔道士</option>
                                                {{-- <option class="dps" value="bluemage">青魔道士</option> --}}
                                            </select>
                                        @else
                                            <select class="pt_membere_select" name="pt_member{{ $i }}_job"
                                                pt_id="{{ $i }}">
                                                <option value="" selected disabled></option>
                                                <option class="healer" value="whitemage">白魔道士</option>
                                                <option class="healer" value="scholar">学者</option>
                                                <option class="healer" value="astrologian">占星術師</option>
                                                <option class="healer" value="sage">賢者</option>
                                            </select>
                                        @endif
                                        <div class="pt_member_h member_hp">HP</div>
                                        <input name="pt_member{{ $i }}_hit_point">
                                        <div class="pt_member_h">物理防御力</div>
                                        <input name="pt_member{{ $i }}_physical_defenses">
                                        <div class="pt_member_h">魔法防御力</div>
                                        <input name="pt_member{{ $i }}_magical_defenses">
                                        <div class="pt_member_h member_ten">不屈(TEN)</div>
                                        <input name="pt_member{{ $i }}_tenacity">
                                        <div class="pt_member_h member_det">意志力(DET)</div>
                                        <input name="pt_member{{ $i }}_determination">
                                        <div class="pt_member_h">メインステータス</div>
                                        <input name="pt_member{{ $i }}_mind">
                                        <div class="pt_member_h">物理（魔法）基本性能</div>
                                        <input name="pt_member{{ $i }}_weapon_damage">

                                        <button class="member_button{{ $i }}">LV.90の適正値を反映</button>

                                    </div>
                                @endfor



                            </div>

                            <div class="input_info">
                                <button class="input_info_button">情報をブラウザに保存</button>
                            </div>

                        </div>

                        {{-- メニューの固定 contents_display_none　を移動 --}}
                        <div class="contents1 contents_display_none">

                            <div class="contents1_div">

                                @for ($i = 1; $i < 9; $i++)
                                    <div class="contents1_container{{ $i }}">

                                        <div class="pt_member_h member_heder">メンバー{{ $i }}</div>
                                        <div class="contents1_job{{ $i }} member_job">ジョブ</div>

                                        <div class="pt_member_h member_Rhp">残HP</div>
                                        <input name="pt_member{{ $i }}_Remain_hit_point">

                                        <div class="use_skl_div">

                                            <div class="use_skl">
                                                <div class="pt_member_h member_skl">使用スキル</div>
                                                <button class="use_skl_button{{ $i }}">▼</button>
                                            </div>


                                            <div class="skl_icon_sub">
                                                <img src="\" alt="">
                                            </div>



                                            <div class="use_skl_bg{{ $i }}">
                                                <div class="use_skl_list{{ $i }}">
                                                    <div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="skill_icon skill_icon{{ $i }}">
                                                            <img src="" alt="">
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button
                                                            class="use_skl_done_button use_skl_done_button{{ $i }}">決定</button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div class="skill_list_div">

                                            @for ($j = 0; $j < 13; $j++)
                                                <div class="skill_icon_list{{ $i }}">
                                                    <div class="skill_list_one">

                                                        <div>
                                                            <img class="skill_icon_l" src="" alt="">
                                                        </div>

                                                        <div class="skill_list_one_contents">

                                                            <div class="skill_list_target">
                                                                <div class="skill_list_target_text">
                                                                    対象：
                                                                </div>
                                                                <div>
                                                                    <select class="skill_list_one_select"
                                                                        name="skill_list_one_select_name">
                                                                        <option value="" selected disabled>
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="skill_list_">
                                                                <div class="skill_list_target_text">
                                                                    対象：
                                                                </div>
                                                                <div>
                                                                    <select class="skill_list_one_select"
                                                                        name="skill_list_one_select_name">
                                                                        <option value="" selected disabled>
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>


                                                        </div>




                                                    </div>
                                                </div>
                                            @endfor

                                        </div>


                                        <div class="pt_member_remain_hp">
                                            <div class="pt_member_remain_hp_text">残HP</div>
                                            <div class="pt_member_remain_hp_num{{ $i }}">-</div>
                                        </div>


                                    </div>
                                @endfor



                            </div>


                            <div class="result_conteiner1">
                                <div class="damage_att">
                                    <div class="damage_att_text">ダメージ属性：</div>
                                    <div class="damage_att_select_div"><select name="damage_att_select_name"
                                            id="damage_att_select_id">
                                            <option value="magic">魔法</option>
                                            <option value="physics">物理</option>
                                        </select></div>
                                </div>

                                <div class="damage_target">
                                    <div class="damage_target_text">攻撃対象：</div>
                                    <div class="damage_target_select_div">
                                        <select name="damage_target_select_name"
                                            id="damage_target_select_id"></select>
                                    </div>
                                    <div class="damage_log_list"><button class="damage_log_list_button">★</button>
                                    </div>
                                    <textarea name="damage_log_list_text_name" id="damage_log_list_text_id" cols="30" rows="10"></textarea>
                                </div>

                                <div class="result_button">
                                    <button class="result_button_done">元ダメージ計算</button>
                                </div>


                                <div class="result_text">
                                    元ダメージ：<div class="result_text_num"></div>
                                </div>

                            </div>

                            <div class="result_conteiner2 contents_display_none">
                                <div class="result_sim_div">
                                    <div class="result_sim_div_text">元ダメージ</div>
                                    <input class="result_sim" type="text">
                                </div>

                                <div class="damage_att_sim">
                                    <div class="damage_att_sim_text">ダメージ属性：</div>
                                    <div class="damage_att_sim_select_div"><select name="damage_att_select_name"
                                            id="damage_att_sim_select_id">
                                            <option value="magic">魔法</option>
                                            <option value="physics">物理</option>
                                        </select></div>
                                </div>

                                <div class="result_button_sim_damage">
                                    <button class="result_button_sim_damage_done">ダメージ模擬計算</button>
                                </div>


                            </div>



                        </div>





                        <div class="contents2 contents_display_none">
                        </div>

                        <div class="contents3 contents_display_none">準備中1</div>

                        <div class="contents4 contents_display_none">

                            <div class="skl_icon_sub">
                                <img src="\" alt="">
                            </div>

                            <div class="trtd_hp_cal_message">
                                <div>--「残HP予測」計算中--</div>
                            </div>

                            <div class="time_line_contents_option_div">
                                <div class="time_line_contents_option_div_first">
                                    <div class="timeline_select_contents4">
                                        <div>コンテンツ選択：</div>
                                        <select name="timeline_select_contents4" id="timeline_select_contents4">
                                            <option value="Dragonsongs_Reprise">絶竜詩戦争</option>
                                            <option value="test">テスト</option>
                                        </select>
                                    </div>

                                    <div class="timeline_select_phase_div_contents4">
                                        <div>フェーズ選択：</div>
                                        <div class="timeline_select_phase_contents4">
                                            <select name="Dragonsongs_Reprise" select_id="Dragonsongs_Reprise"
                                                id="phase_name_4">
                                                <option value="kyoukou1">教皇庁</option>
                                                <option value="toldan1">トールダン</option>
                                                <option value="neaz">ニーズヘッグ</option>
                                                <option value="jagan">邪眼</option>
                                                <option value="kyoukouif">教皇庁if</option>
                                                <option value="giten">偽典</option>
                                                <option value="niten">二天竜</option>
                                                <option value="toldan2">Pトールダン</option>
                                            </select>
                                            <select name="test" select_id="test" id="phase_name_4">
                                                <option value="test">テスト</option>
                                                <option value="test">テスト</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="time_line_contents_option_div_second">
                                    <div class="cbox_recasttime_div">
                                        <input type="checkbox" id="cbox_recasttime" name="cbox_recasttime">
                                        <div>リキャストタイム表示</div>
                                    </div>
                                    <div class="cbox_remain_hp_div">
                                        <input type="checkbox" id="cbox_remain_hp" name="cbox_remain_hp"
                                            checked="checked">
                                        <div>残HP表示</div>
                                    </div>
                                </div>

                                <div class="time_line_contents_option_div_third">
                                    <div class="button_all_remain_hp_calc_div">
                                        <button class="button_all_remain_hp_calc_button">残HPを再計算する</button>
                                    </div>
                                    <div class="button_data_save_div">
                                        <button class="button_data_save_div_button">現在の状態を保存する</button>
                                    </div>
                                </div>


                            </div>

                            {{-- スキルリスト待機 --}}
                            @for ($i = 1; $i < 9; $i++)
                                <div class="tline_skl_list{{ $i }}">
                                    <div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                    </div>
                                    <div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                    </div>

                                    <div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                        <div class="skill_icon tline_skill_icon{{ $i }}">
                                        </div>
                                    </div>

                                    <div>
                                        <button class="use_tline_done_button{{ $i }}">決定</button>
                                    </div>

                                    {{-- HP計算をするトリガー --}}
                                    <div class="remain_ph_trriger"></div>

                                    <div class="contents4_remain_ph"></div>


                                </div>
                            @endfor

                            {{-- ジョブリスト待機 --}}

                            <div class="tline_job_list">
                                <div>
                                    <div class="job_icon_t tline_job_icon1">
                                        <img src="" alt="">
                                    </div>
                                    <div class="job_icon_t tline_job_icon2">
                                        <img src="" alt="">
                                    </div>
                                    <div class="job_icon_t tline_job_icon7">
                                        <img src="" alt="">
                                    </div>
                                    <div class="job_icon_t tline_job_icon8">
                                        <img src="" alt="">
                                    </div>
                                </div>
                                <div>
                                    <div class="job_icon_t tline_job_icon3">
                                        <img src="" alt="">
                                    </div>
                                    <div class="job_icon_t tline_job_icon4">
                                        <img src="" alt="">
                                    </div>
                                    <div class="job_icon_t tline_job_icon5">
                                        <img src="" alt="">
                                    </div>
                                    <div class="job_icon_t tline_job_icon6">
                                        <img src="" alt="">
                                    </div>
                                </div>

                                <div>
                                    <button class="use_tline_done_button">決定</button>
                                </div>

                            </div>



                            <div class="timeline_div">
                                <div class="time_line_timekeyper">
                                    <table class="time_line_timekeyper_table">

                                        <thead>
                                            <tr class="tr0">
                                                @for ($j = 1; $j < 21; $j++)
                                                    <th class="tr0td{{ $j }}"></th>
                                                @endfor
                                            </tr>
                                        </thead>

                                        <tbody>
                                            @for ($i = 1; $i < 200; $i++)
                                                <tr class="tr{{ $i }}">

                                                    @for ($j = 1; $j < 2; $j++)
                                                        <th class="tr{{ $i }}td{{ $j }}"></th>
                                                    @endfor
                                                    @for ($j = 2; $j < 21; $j++)
                                                        <td class="tr{{ $i }}td{{ $j }}"></td>
                                                    @endfor

                                                </tr>
                                            @endfor
                                        </tbody>

                                    </table>
                                </div>
                            </div>


                        </div>

                        {{-- 残HP --}}
                        <div div class="trtd_hp">
                            <div div class="trtd_hp_div">

                                <div class="trtd_hp_cal_button">
                                    <button>計算</button>
                                </div>

                                <div class="trtd_hp_icon_div">
                                    <div class="trtd_hp_div_up">
                                        <div class="tank_hp">
                                            <div class="ptmem_hp_1">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                            <div class="ptmem_hp_2">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="healer_hp">
                                            <div class="ptmem_hp_3">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                            <div class="ptmem_hp_4">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="trtd_hp_div_down">
                                        <div class="melee_hp">
                                            <div class="ptmem_hp_5">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                            <div class="ptmem_hp_6">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="range_hp">
                                            <div class="ptmem_hp_7">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                            <div class="ptmem_hp_8">
                                                <img src="/images/buffsimulator/skillicon/darkknight_jobicon.png">
                                                <div class="ptmem_hpnum">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {{-- 対象選択 --}}
                        <div class="timeline_skill_targetselect_div">
                            <div class="timeline_skill_targetselect_one">
                                <select class="timeline_skill_targetselect" name="timeline_skill_targetselect">

                                </select>
                            </div>
                        </div>



                        <div class="contents5 contents_display_none">

                            <div class="timeline_select_contents">
                                <div>コンテンツ選択：</div>
                                <select name="timeline_select_contents" id="timeline_select_contents">
                                    <option value="Dragonsongs_Reprise">絶竜詩戦争</option>
                                    <option value="test">テスト</option>
                                </select>
                            </div>

                            <div class="timeline_select_phase_div">
                                <div>フェーズ選択：</div>
                                <div class="timeline_select_phase">
                                    <select name="Dragonsongs_Reprise" select_id="Dragonsongs_Reprise">
                                        <option value="kyoukou1">教皇庁</option>
                                        <option value="toldan1">トールダン</option>
                                        <option value="neaz">ニーズヘッグ</option>
                                        <option value="jagan">邪眼</option>
                                        <option value="kyoukouif">教皇庁if</option>
                                        <option value="giten">偽典</option>
                                        <option value="niten">二天竜</option>
                                        <option value="toldan2">Pトールダン</option>
                                    </select>
                                    <select name="test" select_id="test">
                                        <option value="test">テスト</option>
                                        <option value="test">テスト</option>
                                    </select>
                                </div>
                            </div>


                            <div class="timeline_table">
                                <table class="timeline_table_table">

                                </table>
                            </div>

                        </div>



                        <div class="contents6">

                            <div class="contents6_div">
                                <h1>
                                    <img src="\images\buffsimulator\skillicon\tutrialmark.png" alt="">
                                    <div>使い方の紹介</div>
                                </h1>

                                <h2>
                                    ０．もくじ
                                </h2>

                                <div class="contents6_index">

                                    <div class="contents6_index_h2"><a href="#area-1">１．このサイトでできること! </a></div>
                                    <div class="contents6_index_h2"><a href="#area-2">２．初期設定 </a></div>
                                    <div class="contents6_index_h2"><a href="#area-3">３．軽減タイムライン</a></div>
                                    <div class="contents6_index_h3"><a href="#area-3-1">３－１.基本的な使い方 </a></div>
                                    <div class="contents6_index_h3"><a href="#area-3-2">３－２.効果時間/リキャストタイム</a></div>
                                    <div class="contents6_index_h3"><a href="#area-3-3">３－３.対象を選択するスキル</a> </div>
                                    <div class="contents6_index_h3"><a href="#area-3-4">３－４.被ダメージ対象を変更する</a> </div>
                                    <div class="contents6_index_h3"><a href="#area-3-5">３－５.データを保存する</a> </div>
                                    <div class="contents6_index_h3"><a href="#area-3-6">３－６.データを上書きする</a> </div>
                                    <div class="contents6_index_h3"><a href="#area-3-7">３－７.その他</a> </div>

                                </div>

                                <section id="area-1">
                                    <h2>
                                        １．このサイトでできること!
                                    </h2>
                                </section>

                                <div class="contents6_text">
                                    <ul class="contents6_ul">
                                        <li>
                                            コンテンツのタイムラインがわかる!
                                        </li>
                                        <li>
                                            攻撃の威力（ダメージ）がわかる!
                                        </li>
                                        <li>
                                            軽減（バリア）スキルを使った時の、残りHPがわかる!
                                        </li>
                                        <li>
                                            攻撃の属性（魔法/物理）がわかる!
                                        </li>
                                        <li>
                                            スキルのタイムラインが組める!
                                        </li>
                                        <li>
                                            組んだタイムラインを共有できる!
                                        </li>

                                    </ul>
                                </div>

                                <section id="area-2">
                                    <h2>
                                        ２．初期設定
                                    </h2>
                                </section>

                                <div class="contents6_text">
                                    まずは、「PTジョブ設定」の項目でPTのジョブ設定を行います。<br><br>
                                    左のメニューから「PTジョブ設定」を選択します。<br>
                                    開いたページの「ジョブ」の項目でＰＴのジョブを選択します。<br>
                                    <img src="\images\buffsimulator\tutorial\tutorial001.png" alt=""><br><br>

                                    「ジョブ」を選択すると自動的に「ステータス」が挿入されます。<br>
                                    これは「最大レベル」(パッチ6.XならLV90)における、最新パッチの「最終装備」を想定したステータスになります。<br>
                                    必要があれば、各項目を「手動で」編集してください！<br>

                                    <div class="tutorial_group001">
                                        <div class="tutorial_group001_div1">
                                            <img src="\images\buffsimulator\tutorial\tutorial002.png"
                                                alt=""><br><br>
                                        </div>
                                        <div class="tutorial_group001_div2">
                                            設定不要なステータスは「グレーアウト」されます。<br>
                                            <img src="\images\buffsimulator\tutorial\tutorial003.png"
                                                alt=""><br><br>

                                            「情報をブラウザに保存」ボタンをおせば、記録しておくことができます。<br>
                                            <img src="\images\buffsimulator\tutorial\tutorial004.png"
                                                alt=""><br><br>

                                            現在（2022/8）は同ジョブPT構成には対応をしていませんのでご注意ください！

                                        </div>

                                    </div>

                                </div>

                                <section id="area-3">
                                    <h2>
                                        ３．軽減タイムライン
                                    </h2>
                                </section>

                                <div class="contents6_text">
                                    ここでは、各コンテンツのタイムラインにそって、軽減バフを選択することで<br>
                                    各攻撃を受けた際の「残HP予想」を確認することができます。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial005.png"
                                        alt=""><br><br><br>

                                    <section id="area-3-1">
                                        <h3>３－１.基本的な使い方</h3>
                                    </section>

                                    右上の項目で「コンテンツ」と「フェーズ」を選択できます。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial006.png"
                                        alt=""><br><br><br>


                                    タイムラインの攻撃に対して、各ジョブの「マス」をクリックすると「スキルリスト」が表示されます。<br><br>
                                    <div class="tutorial_group002">
                                        <div class="tutorial_group002_div1">

                                            <img src="\images\buffsimulator\tutorial\tutorial007.png"
                                                alt=""><br><br><br>
                                        </div>

                                        <div class="tutorial_group002_div2">
                                            スキルアイコンをクリックすると、タイムラインにスキルアイコンが表示されます。<br>
                                            ※もう一度クリックすると消えます。<br><br>
                                            <img src="\images\buffsimulator\tutorial\tutorial009.png"
                                                alt=""><br><br><br>


                                        </div>

                                    </div>


                                    バフが選択されると自動的に「残HP予測」が計算されます。<br><br>
                                    <div class="tutorial_group003">
                                        <div class="tutorial_group003_div1">
                                            <img src="\images\buffsimulator\tutorial\tutorial010.png"
                                                alt=""><br><br>
                                        </div>

                                        <div class="tutorial_group003_div2">
                                            最大HPを超えてダメージを受ける場合は「マイナス」で表示されます。<br>
                                            <img src="\images\buffsimulator\tutorial\tutorial011.png"
                                                alt=""><br><br>

                                            「残HP予想」がマイナスにならないように、バフを組み合わせよう！<br>
                                            <img src="\images\buffsimulator\tutorial\tutorial012.png"
                                                alt=""><br><br><br>

                                        </div>


                                    </div>


                                    <section id="area-3-2">
                                        <h3>３－２.効果時間/リキャストタイム</h3>
                                    </section>

                                    スキルの効果時間は「青いライン」で表示されます。<br>
                                    このラインまではバフの効果が効いています。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial013.png"
                                        alt=""><br><br><br>

                                    上部メニューの「リキャストタイムを表示」にチェックを入れると、リキャストタイムが表示されます。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial014.png"
                                        alt=""><br><br><br>

                                    リキャストタイムは「赤いライン」で表示されます。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial015.png"
                                        alt=""><br><br><br>

                                    また、リキャスト中の場合、スキルリスト内でもの残りのクールタイムが表示されます。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial016.png"
                                        alt=""><br><br><br>


                                    <section id="area-3-3">
                                        <h3>３－３.対象を選択するスキル</h3>
                                    </section>
                                    PTメンバー１人を対象とする場合は、選択肢が表示されます。<br>
                                    プルダウンから１人選んで下さい。<br>
                                    ※選びなおす場合は、「スキルリスト」からスキルをクリックして「一度消してから」再度選択してください！<br>
                                    ※「自分以外のPTメンバー」という条件が適応されていないのでご注意ください（調整中）<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial017.png"
                                        alt=""><br><br><br>

                                    <section id="area-3-4">
                                        <h3>３－４.被ダメージ対象を変更する</h3>
                                    </section>
                                    初期設定では「PTジョブ設定」で設定した順に自動で選択されています<br>
                                    攻略に合わせて、変更をしてください！<br><br>

                                    変更方法は、まず「対象」の「ジョブアイコン」をクリックします。「ジョブリスト」が表示されます。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial018.png"
                                        alt=""><br><br><br>

                                    外したいジョブをクリックします（アイコンが消えます）<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial019.png"
                                        alt=""><br><br><br>

                                    対象としたいジョブアイコンをクリックします（アイコンが追加されます）<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial020.png"
                                        alt=""><br><br><br>

                                    通常、対象となりえないジョブはグレーアウトされています。<br><br>
                                    <img src="\images\buffsimulator\tutorial\tutorial021.png"
                                        alt=""><br><br><br>

                                    通常の攻略法で受けるべきジョブが選択できるようになっています。<br>
                                    制限を解除できる仕様を調整中です。<br>
                                    ※頭割り攻撃は、人数を減らしても１人当たりのダメージは変わりません（調整中）基本的な必要人数選んでください。<br><br><br>



                                    <section id="area-3-5">
                                        <h3>３－５.データを保存する</h3>
                                    </section>
                                    上部メニューの「現在の状態を保存する」をクリックすると現在の内容が再現できる「URLが発行されます」<br>
                                    URLは「コピー」された状態になるので、どこかへ「貼り付け」をして、保管してください。<br><br>
                                    <div class="tutorial_group004">
                                        <img src="\images\buffsimulator\tutorial\tutorial022.png" alt="">
                                        <img src="\images\buffsimulator\tutorial\tutorial023.png"
                                            alt=""><br><br><br>


                                    </div>

                                    【保存されるもの】<br>
                                    ・「PTジョブ設定」<br>
                                    ・選択された「タイムライン」<br>
                                    ・選択した「スキル」<br>
                                    ・選択した「対象」<br>
                                    ※各フェーズごとに保存が必要です。<br>
                                    保存前にフェーズを変更すると内容が失われますのでご注意ください。<br><br><br>


                                    <section id="area-3-6">
                                        <h3>３－６.データを上書きする</h3>
                                    </section>
                                    発行されたURLにアクセスすると、「左メニュー」に「セーブID」と「上書き保存」ボタンが表示されます。<br>
                                    「上書き保存」ボタンをクリックすると、現在のURLに保存されている内容が上書きされます。<br>
                                    ※元には戻せないのでご注意ください。<br>
                                    <img src="\images\buffsimulator\tutorial\tutorial024.png"
                                        alt=""><br><br><br>


                                    <section id="area-3-7">
                                        <h3>３－７.その他</h3>
                                    </section>
                                    リストの各ヘッダーはマウスを乗せるとその項目の詳細が確認できます。<br>
                                    ※調整中<br><br>

                                    ダメージ：大元のダメージ（予測値）です。このダメージを元に、各ジョブの装備防御力、バフ、デバフ、バリアを計算し受けるダメージが計算されます。<br>
                                    属性：攻撃の属性（魔法（Magical）/物理（Physical））の表記。noneは通常ダメージを受けない攻撃。<br>
                                    ※Darknessは「無属性」のため「魔法攻撃」「物理攻撃」に対して軽減効果のあるバフ、デバフは効果が０になります（入れても軽減されません）<br>
                                    総バリア量：使用した総バリア量です。「対象」の中での「最小値」が表示されます。<br>
                                    総軽減率：使用した総軽減率です。「対象」の中での「最小値」が表示されます。<br>



                                    {{-- <img src="\images\buffsimulator\tutorial\tutorial025.png"
                                        alt=""><br><br><br> --}}
                                    <br><br><br><br><br><br>


                                </div>







                            </div>

                        </div>


                        <div class="contents7">

                            <div class="contents7_div">

                                <h3>ダメージ計算について</h3><br>

                                <div><a href="https://www.akhmorning.com/allagan-studies/" target="blank">ALLAGEN
                                        STUDIES</a>のデータを元に計算しています。</div><br><br>


                                <h3>被ダメージ計算</h3><br>

                                【物理ダメージ】<br>
                                PDT = ⌊ オリジナルダメージ × ( 1 - f(def) ) × ( 2 - f(tnc) ) × ( 1 - f(blk) ) ⌋ × 乱数 ⌋ × ( 1 -
                                バフ1 ) ⌋ × ( 1 - バフ2・・・ ) ⌋<br>

                                【魔法ダメージ】<br>
                                MDT = ⌊ オリジナルダメージ × ( 1 - f(mdef) ) × ( 1 - f(res) ) × ( 2 - f(tnc) ) × ( 1 -
                                f(blk) ) ⌋ × rand[ 0.95, 1.05 ] ⌋ × ( 1 - バフ1 ) ⌋ × ( 1 - バフ2・・・ ) ⌋<br><br>

                                f(def)：装備効果を含めたジョブ別軽減率（物理）<br>
                                f(mdef)：装備効果を含めたジョブ別軽減率（魔法）<br>
                                f(tnc)：不屈によるダメージ軽減率<br>
                                f(blk)：ブロックによるダメージ軽減率（発生していなければ0）<br>
                                乱数：ダメージのランダム性。0.95～1.05になる。<br>
                                バフ：軽減のバフデバフによる軽減率<br>
                                f(res)：ダメージ属性による軽減率（基本的に0）火属性ダメージ抵抗低下デバフなど受けるとこの上りがマイナスの軽減率（ダメージ増加）になると思われる。
                                <br>
                                ⌊：切り捨て<br><br><br>

                                <h3>被ダメージ計算（詳細）</h3><br>
                                f(def),f(mdef) = 100 - ⌊ 15 × Def()/ Level Lv, DIV ⌋<br>
                                Def():各装備の物理（魔法）防御力<br>
                                Level Lv, DIV：<a href="https://www.akhmorning.com/allagan-studies/modifiers/levelmods/"
                                    target="blank">各レベルに合わせた補正値</a><br>

                                f(tnc):<a
                                    href="https://www.akhmorning.com/allagan-studies/stats/ten/#explaining-tenacity"
                                    target="blank">不屈効果</a><br><br><br>



                                <h3>計算例</h3><br>
                                レベル：90<br>
                                魔法防御力：4437
                                不屈：654<br>
                                オリジナルダメージ：100000<br>
                                バフ；ランパード（20%）、センチネル（30%）<br>
                                乱数はなし（1として計算）<br>
                                の場合<br><br>

                                【魔法ダメージ】<br>
                                MDT（受けるダメージ） = ⌊ オリジナルダメージ × ( 1 - f(mdef) ) × ( 1 - f(res) ) × ( 2 - f(tnc) ) × ( 1 -
                                f(blk) ) ⌋ × rand[ 0.95, 1.05 ] ⌋ × ( 1 - バフ1 ) ⌋ × ( 1 - バフ2・・・ ) ⌋<br><br>

                                = ⌊100000　×　（1-（100 - ⌊ 15 × 4437/ 1900 ⌋/100））× (1)× ( 2 - 1.013 )× (1) ⌋×
                                rand[1.0] ⌋
                                × (
                                1 - 0.2 ) ⌋ × ( 1 - 0.3 ) ⌋<br>

                                = 100000 × (1 - 0.35) × (2 - 1.013) × 0.8 × 0.7<br>
                                =35926<br>

                                ※基本的に各軽減の乗算を施したら小数点以下は切り捨てられます。<br><br>

                                よって、この場合「35926」のダメージを受けることになります。<br><br><br>


                                <h3>オリジナルダメージ</h3><br>
                                ダメージ計算が単体で分かったところで、「オリジナルダメージ」がわからないと意味がありません。<br>
                                これは、実際に受けたダメージのログから逆算して求めています。<br>
                                上記の式を用いて、受けたダメージや張られてバリア量を考慮して計算します。<br><br>


                                MDT（受ける（た）ダメージ）　＝　ログ表示されたダメージ　＋　バリア量<br><br>
                                よってオリジナルダメージは　<br><br>

                                ⌊ オリジナルダメージ × ( 1 - f(mdef) ) × ( 1 - f(res) ) × ( 2 - f(tnc) ) × (
                                1 -
                                f(blk) ) ⌋ × rand[ 0.95, 1.05 ] ⌋ × ( 1 - バフ1 ) ⌋ × ( 1 - バフ2・・・ )
                                ⌋　＝　ログ表示されたダメージ　＋　バリア量<br>
                                ⇔オリジナルダメージ　＝　（ログ表示されたダメージ　＋　バリア量）/( 1 - f(mdef) ) × ( 1 - f(res) ) × ( 2 - f(tnc) ) × (
                                1 -
                                f(blk) ) ⌋ × rand[ 0.95, 1.05 ] ⌋ × ( 1 - バフ1 ) ⌋ × ( 1 - バフ2・・・ ) ⌋<br>

                                として計算可能となります。<br><br>
                                「バリア量」も同様にサイトのデータを元に計算しています。
                                <br><br><br><br>

                                本サイトでは、上記の計算式の元、最低20以上のサンプリング値の平均値を「オリジナルダメージ」として採用しています。
                                <br><br><br><br><br><br>

                                <h3>調整中項目</h3><br>
                                ・対象が「ALL」の攻撃において「タンク」ロールのダメージが低く見積もられる<br><br><br><br><br>


                            </div>
                        </div>



                    </div>

                    <!-- ライト　-->
                    <div class="mainContents_container_right">

                    </div>


                </div>
            </div>
        </div>

        <!--共通フッター-->
        @component('components.commonFooterMenu')
        @endcomponent
    </div>

</body>

</html>

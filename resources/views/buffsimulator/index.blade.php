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

                                        @for ($i = 0; $i < 200; $i++)
                                            <tr class="tr{{ $i }}">
                                                @for ($j = 1; $j < 20; $j++)
                                                    <td class="tr{{ $i }}td{{ $j }}"></td>
                                                @endfor
                                            </tr>
                                        @endfor



                                    </table>
                                </div>
                            </div>





                            <div id="copied">
                                <dl>
                                    <dt>コピー：</dt>
                                    <dd><input class="copy" type="text" value="Into the Program" readonly></dd>
                                    <dt>ペースト：</dt>
                                    <dd><input class="paste" type="text" value="" readonly></dd>
                                </dl>
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

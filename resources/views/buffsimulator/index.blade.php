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

    <!--共通ヘッダー-->
    @component('components.commonHeaderMenu')
    @endcomponent

    <div id="mainContents">
        <div class="backgroundimage">
            <div class="mainContents_container">

                <!-- レフト　-->
                <div class="mainContents_container_left">

                    <div class="left_menu">
                        {{-- メニューの固定 left_menu_active　を移動 --}}
                        <div class="left_menu0 left_menu_active" tags="contents0">PTジョブ設定</div>
                        <div class="left_menu1" tags="contents1">元ダメージ計算</div>
                        <div class="left_menu2" tags="contents2">ダメージ模擬計算</div>
                        <div class="left_menu3" tags="contents3">軽減比較</div>
                        <div class="left_menu4" tags="contents4">軽減タイムライン</div>
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

                                    <select name="pt_member{{ $i }}_job">
                                        <option value="" selected disabled></option>
                                        <option class="tank" value="paladin">ナイト</option>
                                        <option class="tank" value="warrior">戦士</option>
                                        <option class="tank" value="darkknight">暗黒騎士</option>
                                        <option class="tank" value="gunbreaker">ガンブレイカー</option>
                                        <option class="dps" value="monk">モンク</option>
                                        <option class="dps" value="dragoon">竜騎士</option>
                                        <option class="dps" value="ninja">忍者</option>
                                        <option class="dps" value="samurai">侍</option>
                                        <option class="dps" value="reaper">リーパー</option>
                                        <option class="dps" value="bard">吟遊詩人</option>
                                        <option class="dps" value="machinist">機工士</option>
                                        <option class="dps" value="dancer">踊り子</option>
                                        <option class="dps" value="blackmage">黒魔道士</option>
                                        <option class="dps" value="summoner">召喚士</option>
                                        <option class="dps" value="redmage">赤魔道士</option>
                                        {{-- <option class="dps" value="bluemage">青魔道士</option> --}}
                                        <option class="healer" value="whitemage">白魔道士</option>
                                        <option class="healer" value="scholar">学者</option>
                                        <option class="healer" value="astrologian">占星術師</option>
                                        <option class="healer" value="sage">賢者</option>
                                    </select>

                                    <button class="member_button{{ $i }}">LV.90の適正値を反映</button>

                                    <div class="pt_member_h member_hp">HP</div>
                                    <input name="pt_member{{ $i }}_hit_point">
                                    <div class="pt_member_h">物理防御力</div>
                                    <input name="pt_member{{ $i }}_physical_defenses">
                                    <div class="pt_member_h">魔法防御力</div>
                                    <input name="pt_member{{ $i }}_magical_defenses">
                                    <div class="pt_member_h member_ten">不屈(TEN)</div>
                                    <input name="pt_member{{ $i }}_tenacity">
                                    <div class="pt_member_h">精神力(MND)</div>
                                    <input name="pt_member{{ $i }}_mind">
                                    <div class="pt_member_h">物理（魔法）基本性能</div>
                                    <input name="pt_member{{ $i }}_weapon_damage">



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





                                </div>
                            @endfor



                        </div>

                        <div class="input_info">
                            <button class="input_info_button">情報をブラウザに保存</button>
                        </div>





                    </div>








                    <div class="contents2 contents_display_none">


                        <div class="contents1_container1">

                            <div>物理防御力</div>
                            <input type="physical_defenses">

                            <div>魔法防御力</div>
                            <input type="magical_defenses">

                            <div>不屈</div>
                            <input type="tenacity">

                            <div class="original_damage">元ダメージ量</div>
                            <input type="physical_defenses">

                            <div>攻撃属性</div>
                            <select name="attribute">
                                <option value="physical">物理</option>
                                <option value="magical">魔法</option>
                            </select>

                        </div>
                    </div>
                    <div class="contents3 contents_display_none">contents3</div>
                    <div class="contents4 contents_display_none">contents4</div>

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


</body>

</html>

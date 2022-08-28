<!DOCTYPE html>
<html lang="jp">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="/css/moviesearch/postcontents.css">
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/moviesearch/post.js"></script>


    <title>FF14-APP|FinalFantasyXIVのアプリサイト</title>

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



                </div>


                <!-- センター　-->
                <div class="mainContents_container_center">

                    <div class="formfield">

                        <div class="formfield_h1">
                            <h1>動画投稿画面</h1>
                        </div>

                        <div class="formfield_inputfield">

                            <div class="error_messase">
                                @if ($errors->any())
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                @endif
                            </div>

                            <form action="/moviesearch/postcontents/create" method="post"
                                class="formfield_inputfield_form">

                                @csrf

                                <div class="input_movie_url">
                                    <div class="input_movie_url_text">
                                        動画URL
                                    </div>
                                    <div class="input_movie_url_input">
                                        <input type="text" name="movie_url">
                                    </div>
                                </div>

                                <div class="string_guide">
                                    <div class="string_guide_input">
                                        <div class="string_guide_text">
                                            解説
                                        </div>
                                        <select name="string_guide" id="string_guide">
                                            <option class="nonevoice" value="nonevoice">なし</option>
                                            <option class="yukkuri" value="yukkuri">ゆっくり</option>
                                            <option class="jigoe" value="jigoe">本人解説</option>
                                            <option class="jimaku" value="jimaku">字幕のみ</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="language">
                                    <div class="language_input">
                                        <div class="language_text">
                                            言語
                                        </div>
                                        <select name="language" id="language">
                                            <option class="language_jp" value="language_jp">日本語</option>
                                            <option class="language_en" value="language_en">英語</option>
                                            <option class="language_ot" value="language_ot">その他</option>
                                        </select>
                                    </div>
                                </div>

                                <!--
                                <div class="bool_guide">
                                    <div class="bool_guide_input">
                                        <input type="checkbox" name="bool_guide" id="bool_guide">
                                        <div class="bool_guide_text">
                                            解説
                                        </div>
                                    </div>
                                </div>
                            -->

                                <div class="bool_vc">
                                    <div class="bool_vc_input">
                                        <input type="checkbox" name="bool_vc" id="bool_vc">
                                        <div class="bool_vc_text">
                                            ボイスチャット
                                        </div>
                                    </div>
                                </div>

                                <div class="bool_clear">
                                    <div class="bool_clear_input">
                                        <input type="checkbox" name="bool_clear" id="bool_clear" checked>
                                        <div class="bool_clear_text">
                                            クリアー動画
                                        </div>
                                    </div>
                                </div>

                                <div class="bool_act">
                                    <div class="bool_act_input">
                                        <input type="checkbox" name="bool_act" id="bool_act">
                                        <div class="bool_act_text">
                                            DPS表示
                                        </div>
                                    </div>
                                </div>

                                <!--
                                <div class="gimick_process">

                                </div>
                                -->

                                <div class="play_job">
                                    <div class="play_job_text">
                                        視点ジョブ
                                    </div>
                                    <div class="play_job_input">
                                        <select name="play_job" id="play_job">
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
                                            <option class="dps" value="bluemage">青魔道士</option>
                                            <option class="healer" value="whitemage">白魔道士</option>
                                            <option class="healer" value="scholar">学者</option>
                                            <option class="healer" value="astrologian">占星術士</option>
                                            <option class="healer" value="sage">賢者</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="contents">
                                    <div class="contents_text">
                                        コンテンツ
                                    </div>

                                    <div class="contents_input_version">
                                        <select name="version" id="version">
                                            <option value="endwalker">暁月</option>
                                            <option value="shadowbringers">漆黒</option>
                                            <option value="stormblood">紅蓮</option>
                                            <option value="heavensward">蒼天</option>
                                            <option value="arealmreborn">新生</option>
                                        </select>
                                    </div>

                                    <div class="contents_input_contentsname">
                                        <select name="contentsname" id="contentsname">
                                            <option value="UltimateDragoonWar" class="endwalker displaynone">絶・竜詩戦争
                                            </option>
                                            <option value="Asphodelos" class="endwalker displaynone">辺獄編</option>

                                            <option value="Purgatory" class="endwalker displaynone">煉獄編</option>

                                            <option value="EndwalkerExtreme" class="endwalker displaynone">極討滅戦
                                            </option>
                                            <option value="EndwalkerUnreal" class="endwalker displaynone">幻討滅戦
                                            </option>
                                            <option value="EdensPromise" class="shadowbringers displaynone">再生編
                                            </option>
                                            <option value="EdensVerse" class="shadowbringers displaynone">共鳴編</option>
                                            <option value="EdensGate" class="shadowbringers displaynone">覚醒編</option>
                                            <option value="Alphascape" class="stormblood displaynone">アルファ編</option>
                                            <option value="Sigmascape" class="stormblood displaynone">シグマ編</option>
                                            <option value="Deltascape" class="stormblood displaynone">デルタ編</option>
                                            <option value="TheSouloftheCreator" class="heavensward displaynone">天動編
                                            </option>
                                            <option value="TheBurdenoftheSon" class="heavensward displaynone">律動編
                                            </option>
                                            <option value="TheFistoftheFather" class="heavensward displaynone">起動編
                                            </option>
                                            <option value="TheFinalCoilofBahamut" class="arealmreborn displaynone">真成編
                                            </option>
                                            <option value="TheSecondCoilofBahamut" class="arealmreborn displaynone">
                                                侵攻編</option>
                                            <option value="TheBindingCoilofBahamut" class="arealmreborn displaynone">
                                                邂逅編</option>
                                        </select>
                                    </div>

                                    <div class="contents_input_contents">
                                        <select name="contents" id="contents">
                                            <option value="UltimateDragoonWar00"
                                                class="UltimateDragoonWar displaynone">全フェーズ（通し）</option>
                                            <option value="UltimateDragoonWar01"
                                                class="UltimateDragoonWar displaynone">蒼天騎士</option>
                                            <option value="UltimateDragoonWar02"
                                                class="UltimateDragoonWar displaynone">トールダン</option>
                                            <option value="UltimateDragoonWar03"
                                                class="UltimateDragoonWar displaynone">ニーズヘッグ</option>
                                            <option value="UltimateDragoonWar04"
                                                class="UltimateDragoonWar displaynone">邪眼</option>
                                            <option value="UltimateDragoonWar05"
                                                class="UltimateDragoonWar displaynone">教皇庁if</option>
                                            <option value="UltimateDragoonWar06"
                                                class="UltimateDragoonWar displaynone">偽典トールダン</option>
                                            <option value="UltimateDragoonWar07"
                                                class="UltimateDragoonWar displaynone">二天竜</option>
                                            <option value="UltimateDragoonWar08"
                                                class="UltimateDragoonWar displaynone">Pトールダン</option>

                                            <option value="Asphodelos01" class="Asphodelos displaynone">1層</option>
                                            <option value="Asphodelos02" class="Asphodelos displaynone">2層</option>
                                            <option value="Asphodelos03" class="Asphodelos displaynone">3層</option>
                                            <option value="Asphodelos04" class="Asphodelos displaynone">4層前半</option>
                                            <option value="Asphodelos05" class="Asphodelos displaynone">4層後半</option>
                                            <option value="Asphodelos06" class="Asphodelos displaynone">4層前後半</option>

                                            <option value="Purgatory01" class="Purgatory displaynone">1層</option>
                                            <option value="Purgatory02" class="Purgatory displaynone">2層</option>
                                            <option value="Purgatory03" class="Purgatory displaynone">3層</option>
                                            <option value="Purgatory04" class="Purgatory displaynone">4層前半</option>
                                            <option value="Purgatory05" class="Purgatory displaynone">4層後半</option>
                                            <option value="Purgatory06" class="Purgatory displaynone">4層前後半</option>

                                            <option value="EndwalkerExtreme01" class="EndwalkerExtreme displaynone">
                                                極ゾディアーク</option>
                                            <option value="EndwalkerExtreme02" class="EndwalkerExtreme displaynone">
                                                極ハイデリン</option>
                                            <option value="EndwalkerExtreme03" class="EndwalkerExtreme displaynone">
                                                終焉を謳うもの</option>
                                            <option value="EndwalkerExtreme04" class="EndwalkerExtreme displaynone">
                                                極バルバリシア</option>
                                            <option value="EndwalkerUnreal01" class="EndwalkerUnreal displaynone">
                                                幻魔人セフィロト</option>
                                            <option value="EdensPromise01" class="EdensPromise displaynone">1層
                                            </option>
                                            <option value="EdensPromise02" class="EdensPromise displaynone">2層
                                            </option>
                                            <option value="EdensPromise03" class="EdensPromise displaynone">3層
                                            </option>
                                            <option value="EdensPromise04" class="EdensPromise displaynone">4層前半
                                            </option>
                                            <option value="EdensPromise05" class="EdensPromise displaynone">4層後半
                                            </option>
                                            <option value="EdensPromise06" class="EdensPromise displaynone">4層前後半
                                            </option>
                                            <option value="EdensVerse01" class="EdensVerse displaynone">1層</option>
                                            <option value="EdensVerse02" class="EdensVerse displaynone">2層</option>
                                            <option value="EdensVerse03" class="EdensVerse displaynone">3層</option>
                                            <option value="EdensVerse04" class="EdensVerse displaynone">4層</option>
                                            <option value="EdensGate01" class="EdensGate displaynone">1層</option>
                                            <option value="EdensGate02" class="EdensGate displaynone">2層</option>
                                            <option value="EdensGate03" class="EdensGate displaynone">3層</option>
                                            <option value="EdensGate04" class="EdensGate displaynone">4層</option>
                                            <option value="Alphascape01" class="Alphascape displaynone">1層</option>
                                            <option value="Alphascape02" class="Alphascape displaynone">2層</option>
                                            <option value="Alphascape03" class="Alphascape displaynone">3層</option>
                                            <option value="Alphascape04" class="Alphascape displaynone">4層前半</option>
                                            <option value="Alphascape05" class="Alphascape displaynone">4層後半</option>
                                            <option value="Alphascape06" class="Alphascape displaynone">4層前後半</option>
                                            <option value="Sigmascape01" class="Sigmascape displaynone">1層</option>
                                            <option value="Sigmascape02" class="Sigmascape displaynone">2層</option>
                                            <option value="Sigmascape03" class="Sigmascape displaynone">3層</option>
                                            <option value="Sigmascape04" class="Sigmascape displaynone">4層前半</option>
                                            <option value="Sigmascape05" class="Sigmascape displaynone">4層後半</option>
                                            <option value="Sigmascape06" class="Sigmascape displaynone">4層前後半</option>
                                            <option value="Deltascape01" class="Deltascape displaynone">1層</option>
                                            <option value="Deltascape02" class="Deltascape displaynone">2層</option>
                                            <option value="Deltascape03" class="Deltascape displaynone">3層</option>
                                            <option value="Deltascape04" class="Deltascape displaynone">4層前半</option>
                                            <option value="Deltascape05" class="Deltascape displaynone">4層後半</option>
                                            <option value="Deltascape06" class="Deltascape displaynone">4層前後半</option>
                                            <option value="TheSouloftheCreator01"
                                                class="TheSouloftheCreator displaynone">1層</option>
                                            <option value="TheSouloftheCreator02"
                                                class="TheSouloftheCreator displaynone">2層</option>
                                            <option value="TheSouloftheCreator03"
                                                class="TheSouloftheCreator displaynone">3層</option>
                                            <option value="TheSouloftheCreator04"
                                                class="TheSouloftheCreator displaynone">4層</option>
                                            <option value="TheBurdenoftheSon01" class="TheBurdenoftheSon displaynone">
                                                1層</option>
                                            <option value="TheBurdenoftheSon02" class="TheBurdenoftheSon displaynone">
                                                2層</option>
                                            <option value="TheBurdenoftheSon03" class="TheBurdenoftheSon displaynone">
                                                3層</option>
                                            <option value="TheBurdenoftheSon04" class="TheBurdenoftheSon displaynone">
                                                4層</option>
                                            <option value="TheFistoftheFather01"
                                                class="TheFistoftheFather displaynone">1層</option>
                                            <option value="TheFistoftheFather02"
                                                class="TheFistoftheFather displaynone">2層</option>
                                            <option value="TheFistoftheFather03"
                                                class="TheFistoftheFather displaynone">3層</option>
                                            <option value="TheFistoftheFather04"
                                                class="TheFistoftheFather displaynone">4層</option>
                                            <option value="TheFinalCoilofBahamut01"
                                                class="TheFinalCoilofBahamut displaynone">1層</option>
                                            <option value="TheFinalCoilofBahamut02"
                                                class="TheFinalCoilofBahamut displaynone">2層</option>
                                            <option value="TheFinalCoilofBahamut03"
                                                class="TheFinalCoilofBahamut displaynone">3層</option>
                                            <option value="TheFinalCoilofBahamut04"
                                                class="TheFinalCoilofBahamut displaynone">4層</option>
                                            <option value="TheSecondCoilofBahamut01"
                                                class="TheSecondCoilofBahamut displaynone">1層</option>
                                            <option value="TheSecondCoilofBahamut02"
                                                class="TheSecondCoilofBahamut displaynone">2層</option>
                                            <option value="TheSecondCoilofBahamut03"
                                                class="TheSecondCoilofBahamut displaynone">3層</option>
                                            <option value="TheSecondCoilofBahamut04"
                                                class="TheSecondCoilofBahamut displaynone">4層</option>
                                            <option value="TheBindingCoilofBahamut01"
                                                class="TheBindingCoilofBahamut displaynone">1層</option>
                                            <option value="TheBindingCoilofBahamut02"
                                                class="TheBindingCoilofBahamut displaynone">2層</option>
                                            <option value="TheBindingCoilofBahamut03"
                                                class="TheBindingCoilofBahamut displaynone">3層</option>
                                            <option value="TheBindingCoilofBahamut04"
                                                class="TheBindingCoilofBahamut displaynone">4層</option>
                                        </select>
                                    </div>
                                </div>


                                <div class="formfield_submit">
                                    <input type="submit" value="送信">
                                </div>




                            </form>

                        </div>


                    </div>





                </div>


            </div>
        </div>
    </div>

    <!--共通フッター-->
    @component('components.commonFooterMenu')
    @endcomponent


</body>

</html>

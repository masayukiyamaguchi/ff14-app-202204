<header id="main_top_header">
    <div class="main_top_header">
        <div class="main_top_header_menu">
            
            
            <div class="main_top_header_menu_logo">
                <a href="/">
                    <img class="main_top_header_menu_logo_img" src="\images\Top\logo.png" alt="">
                </a>
            </div>


            <!--　moviesearch  -->
            @if(strpos($_SERVER['REQUEST_URI'],'/moviesearch') !== false || strpos($_SERVER['REQUEST_URI'],'/ms') !== false)    
            <div class="main_top_header_menu_logo_movieseach">
                <a href="/moviesearch">
                    <img class="main_top_header_menu_logo_img_movieseach" src="\images\moviesearch\logomoviesearch.png" alt="">
                </a>
            </div>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            @endif


            <div class="main_top_header_menu_button">
                <ul class="main_top_header_menu_button_ul">
                    
                    <!--メニューを作る
                    <li><span>作る</span><span>^</span></li>
                    <li>調べる</li>
                    <li>その他</li>
                    -->

                </ul>
            </div>

        </div>
    </div>
</header>
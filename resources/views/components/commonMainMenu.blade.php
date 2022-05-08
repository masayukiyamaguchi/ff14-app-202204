<div class="left_main_menu">
                    
    <div class="left_menu_home">
        <a href="/moviesearch">                      
        <div class="left_menu_home_text">
            <i class="material-icons">home</i>
            <div>ホーム</div>
        </div>     
        </a>                     
    </div>
    
    <div class="left_menu_favorite">
        <div id="favoritelist">
            <form action="" method="POST">
                @csrf
                <input type="hidden" name="favorite_list" value="">
            </form>                            
            <a href="/moviesearch/favorite">
                <div class="left_menu_favorite">                        
                    <div class="left_menu_favorite_text" id="left_menu_favorite">
                        <i class="material-icons">star_rate</i>
                        <div>お気に入りリスト</div>
                    </div>                        
                </div>
            </a>
        </div>
    </div>


</div>
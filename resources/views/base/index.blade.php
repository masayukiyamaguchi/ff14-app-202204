<!DOCTYPE html>
<html lang="jp">

<head>    
    <meta charset="UTF-8">

    <!--共通のCSS-->
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">

    <!--コンテンツのCSS-->
    <link rel="stylesheet" href="/css/base/contents.css">


 
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

                    <p>test</p>

                </div>


                <!-- センター　-->
                <div class="mainContents_container_center">
                    
                    <p>test</p>
                    
                </div>

                <!-- ライト　-->
                <div class="mainContents_container_right">

                    <p>test</p>

                </div>


            </div>
        </div>
    </div>

    <!--共通フッター-->
    @component('components.commonFooterMenu')
    @endcomponent
    

</body>
</html>
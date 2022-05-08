$(function() {

    var version;
    var contentsname;
    var contents;

    version = $("[name=version]").val();
    contentsname = $("[name=contentsname]").val();
    contents = $("[name=contents]").val();

    //初期設定
    $("."+version).removeClass("displaynone");
    $("."+contentsname).removeClass("displaynone");


    //バージョンを変更したら
    $("[name=version]").change(function(){
        ChangeSelectBoxVersion();
    }); 

    //コンテンツ名を変更したら
    $("[name=contentsname]").change(function(){
        ChangeSelectBoxContentsname();
    });    

    
    function ChangeSelectBoxVersion(){
        //一回今の設定を削除
        $("."+version).addClass("displaynone");
        $("."+contentsname).addClass("displaynone");

        //新しく読み込み
        version = $("[name=version]").val();

        //新しくセット
        ChangeContentsName();
        ChangeContents();        
    }

    function ChangeSelectBoxContentsname(){
        //一回今の設定を削除
        $("."+contentsname).addClass("displaynone");

        //新しく読み込み
        contentsname = $("[name=contentsname]").val();

        //新しくセット
        ChangeContents();
    }


    function ChangeContentsName(){
        $("."+version).removeClass("displaynone");
        $("[name=contentsname]").val($("."+version+":first").val());
        contentsname = $("[name=contentsname]").val();
    }

    function ChangeContents(){
        $("."+contentsname).removeClass("displaynone");
        $("[name=contents]").val($("."+contentsname+":first").val());
        contents = $("[name=contents]").val();       
    }





    
});





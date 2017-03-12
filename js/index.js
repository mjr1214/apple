$(function(){

    $(window).on("mousemove",false)

    var mask=$(".top .mask")
    var searchboxH =  $(".search-box").outerHeight()
    var smamaskH=$(".mobi-mask ul").outerHeight()
    $(window).on("resize",function(){
        var domH=$(window).innerHeight()
        mask.height(domH)
       if(smamaskH  > domH ){
           $(".mobi-mask ul").addClass("over")
           $(".mobi-mask ul").height(domH - 96)
       }else{
           $(".mobi-mask ul").removeClass("over")
           $(".mobi-mask ul").height("auto")
       }
        // $(".search-box").height(domH)
        // if(searchboxH + 40 > domH ){
        //     console.log(domH,searchboxH)
        //     console.log(1)
        //     $(".search-box .card").addClass("over")
        //     $(".search-box .card").height(domH - 65)
        //     // $("body").css("overflow","hidden")
        // }else{
        //     $(".search-box .card").removeClass("over")
        //     $(".search-box .card").height("auto")
        //     // $("body").css("overflow","auto")
        // }
    })

    $(window).trigger("resize")

    var guanbi = $(".top .mobi-item .guanbi")
    var mobiMask=$(".mobi-mask")
    var dianji = $(".top .bro-item .dianji")
    var close = $(".top .bro-item .close")
    var searchMask=$(".search-box")
    mobiMask.hide()
    guanbi.on("click",function(){

        mobiMask.toggleClass("zk")
        if(!($(".top").hasClass("open"))){
          mobiMask.slideDown()
            $("body").css("overflow","hidden");
        }else{
            mobiMask.slideUp()
            $("body").css("overflow","auto");
        }
        $(this).closest(".top").toggleClass("open")

    })


    dianji.on("click",function(){
        searchMask.addClass("xianshi")
        $("body").css("overflow","hidden");
    })
    close.on("click",function(){
        searchMask.removeClass("xianshi")
        $("body").css("overflow","auto");
    })


    var wheelbtn=$(".wheel .btn li")
    var wheelimg=$(".wheel .ban-img")
    var wheelflag=false
    var leftjt=$(".wheel .jt .zjt")
    var rightjt=$(".wheel .jt .yjt")

    wheelbtn.find("div span").eq(0).addClass("now")

    var moveTo = function(el,dir){

        if(!wheelflag){
            wheelflag = true
            if(dir === "right"){
                var now=wheelimg.filter(".active")
                now.removeClass("active").addClass("leave").delay(1900).queue(function(){
                    now.removeClass("leave").dequeue()
                })
                el.addClass("right").delay(1900).queue(function(){
                    wheelflag=false
                    el.removeClass("right").addClass("active").dequeue()
                })

            }else if(dir == "left"){
                var now=wheelimg.filter(".active")
                now.removeClass("active").addClass("enter").delay(1900).queue(function(){
                    now.removeClass("enter").dequeue()
                })
                el.addClass("left").delay(1900).queue(function(){
                    wheelflag=false
                    el.removeClass("left").addClass("active").dequeue()
                })
            }
        }

    }

    //右侧图片显示出来当前向左走
    var moveright = function(){
        var el = wheelimg.filter(".active").next().length ? wheelimg.filter(".active").next() : wheelimg.eq(0)
        moveTo(el,"right")
        if(wheelimg.index(el) == 0){
            wheelbtn.find("div span").removeClass("now").delay(10).queue(function(){
                wheelbtn.find("div span").eq(wheelimg.index(el)).addClass("now").dequeue()
            })
        }else{
            wheelbtn.find("div span").eq(wheelimg.index(el)).addClass("now")
        }


    }
    var moveleft = function(){
        var el = wheelimg.filter(".active").prev().length ? wheelimg.filter(".active").prev() : wheelimg.eq(3)
        moveTo(el,"left")
        wheelbtn.find("div span").removeClass("now").delay(10).queue(function(){
            wheelbtn.find("div span").eq(wheelimg.index(el)).addClass("now").dequeue()
        })
    }
    leftjt.on("click",moveleft)
    rightjt.on("click",moveright)
    var t = setInterval(moveright,4000)
    wheelbtn.on("click",function(){
        if(wheelflag){
            return
        }
        var n = wheelimg.filter(".active").index()
        var c = $(this).index()
        if(n==c){
            return
        }
        wheelbtn.find("div span").removeClass("dq").delay(200)
        clearInterval(t)
        wheelbtn.find("div span").removeClass("now")
        var el = wheelimg.eq($(this).index())
        if(n > c){
            moveTo(el,"left")
            $(this).find("div span").addClass("dq")
        }else{
           moveTo(el,"right")
            $(this).find("div span").addClass("dq")
        }

    })

    $(".wheel").on("mouseenter",function(){
        $(this).find(".jt li").css("opacity",1)
    })
    $(".wheel").on("mouseleave",function(){
        $(this).find(".jt li").css("opacity",0)
    })

    var smalllis=$(".small-an")
    var lisclass=["fir","sec","tir","four","five","six","seven"]
    smalllis.on("click",function(){
        $(this).toggleClass(lisclass[$(this).index()])
    })

    var biaotis=$(".small-an")
    biaotis.on("mouseup",function(){
        $(this).closest(".small-an").toggleClass("dian")
    })

})
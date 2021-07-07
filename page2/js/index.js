$(()=>{

    let slider_img = ["./img/s1.jpg","./img/s2.jpg","./img/s3.jpg","./img/s4.jpg","./img/s5.jpg","./img/s6.jpg","./img/s7.jpg","./img/s8.jpg","./img/s9.jpg","./img/s10.jpg"];
    let i = 1;
    let time = null;
    let seconds = 2;
    slider_img.forEach(()=>{
        $(".option").append("<li></li>")
    })

    $("li:eq(0)").attr("class","active")
    $("#slider").css("background-image",`url(${slider_img[0]})`)

    $("#option li").each((index,item)=>{

        $(item).on("mouseover",function () {
            changeImg(index)
        })
        // $(".slide-left").on("click",function(){
        //     changeImg(index+1)
        //
        // })
        // $(".slide-right").on("click",function(){
        //     start(index+1)
        // })
        $(item).on("mouseout",function () {
            start(index)
        })
    })

    function changeImg(flag=false) {
        $("#option li").each((index,item)=>{
            $(item).attr("class","")
        })
        if(flag!==false){
            window.clearInterval(time)
            i=flag
        }
        if (flag === false){
            i++;
            if(i>=slider_img.length){
                i=0
            }
        }
        $("#option li:eq("+i+")").attr("class","active")
        $("#slider").css("background-image",`url(${slider_img[i]})`)


    }

    function start(index) {
        window.clearInterval(time)
        i=index+1
        time=setInterval(changeImg,1000*seconds)
    }

        start(-1)

    var login_data = null
    $.ajax({
        url:"./php/link_login.php",
        type:"get",
        async:false,
        data:{},
        dataType:"json",
        success:function (data) {
            login_data = data
        }
    })

    console.log(login_data)
     if(login_data != null){
        $(".login-img").attr("src","../../page3/img/5e595f56-e4ac-4eb8-98a4-98f56408d620.png")

            $("#name").html(login_data.name)
             $(".login-img").on("mouseenter",()=>{
                 $(".personage-box").show()
             })
             $(".personage-box").on("mouseleave",()=>{
                 $(".personage-box").hide()
             })

     }
    //退出登录
    $("#exit").on("click",function () {
        $(".login-img").attr({"src":"./img/header-userImg-default-green.png"})
        $.post("../php/change_login2.php",login_data,function (data) {

        })
        location.href = "index.html"
    })

    //

    //搜全网找日不落酒店
    $(".search-base").on("click",function () {
        if($("#search-input").val() == "日不落酒店"){
            window.open("../page3/index.html")
        }else{
            alert("当前只有《日不落酒店》一部电影")
            console.log($("#search_input").val())
        }
    })


})
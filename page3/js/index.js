$(()=>{
    $.get("./php/sidelights.php",{},function (data) {
        data = JSON.parse(data)
        data.forEach((item,index)=>{
            $("#sidelights").append(`<li><div class="sidelights-time">${item.time}</div><img src="${item.img}" alt=""><a href="">${item.title}</a></li>`)
        })
    })
    $.get("./php/actor.php",{},function (data) {
        data = JSON.parse(data)
        data.forEach((item,index)=>{
            $("#actor").append(`<li><div class="actor"><img src="${item.img}" alt=""><div class="actor-text"><a href="">${item.actor}</a> <p>${item.shi}</p></div></div></li>`)
            $("#movie").append(`<li><img src="${item.movie1}" alt=""><div class="movie-text"><a href="">${item.title1}</a><p>${item.text1}</p></div></li><li><img src="${item.movie2}" alt=""><div class="movie-text"><a href="">${item.title2}</a> <p>${item.text2}</p></div> </li><li><img src="${item.movie3}" alt=""><div class="movie-text"><a href="">${item.title3}</a><p>${item.text3}</p></div></li>`)
        })
    })


    var login_data = null
    $.ajax({
        url:"../page2/php/link_login.php",
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
        $(".c_login").attr("src","../../page3/img/5e595f56-e4ac-4eb8-98a4-98f56408d620.png")
        $(".login").hide()
        if(login_data.name != null){
            $("#name").html(login_data.name)
            $(".c_login").on("mouseenter",()=>{
                $(".personage-box").show()
            })
            $(".personage-box").on("mouseleave",()=>{
                $(".personage-box").hide()
            })
        }
    }
    //退出登录
    $("#exit").on("click",function () {
        $(".c_login").attr({"src":"../img/header-userImg-default-dark.png"})
        $.post("../php/change_login2.php",login_data,function (data) {

        })
        location.href = "index.html"
    })
//发布评论
    //时间
    var date = new Date()
    var month = date.getMonth()+1
    var day = date.getDate()
    $("#issue").on("click",function () {
        if (login_data == null){
            alert("请登录")
            console.log($("#issue-content").val())
        }else{
            $.post("./php/pinglun.php",{id:login_data.id,username:login_data.username,name:login_data.name,movie:$(".play-sdc-title").html(),content:$("#issue-content").val(),head_img:login_data.head_img},function (data) {
                $("#bg-content").prepend(`<li><img src="${login_data.head_img}" alt=""><span>${login_data.name}</span><p>${$("#issue-content").val()}</p><span>${month}-${day}</span><i class="fa fa-heart-o"></i><span>0</span><i class="fa fa-comment-o"></i></li>`)
            })

        }
    })

    //拿评论
    var pl_data = null
    $.get("./php/show-comment.php",{},function (data) {
        data = JSON.parse(data)
        pl_data = data
        pl_data.forEach((item,index)=>{
            $("#bg-content").prepend(`<li><img src="${item.head_img}" alt=""><span>${item.name}</span><p>${item.content}</p><span>05-18</span><i class="fa fa-heart-o"></i><span>67</span><i class="fa fa-comment-o"></i></li>`)
        })

    })




})
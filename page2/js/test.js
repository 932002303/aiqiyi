$(()=>{
    $.get("./php/test.php",{},function (data) {
        data = JSON.parse(data)
        data.forEach((item,index)=>{
            if(index<6){
                $("#new-line-list").append(`<li><img src="${item.img}"><div class="top-list-title"><a href="">${item.title}</a><span class="l-score">${item.score}</span><p class="top-list-text">${item.text}</p></div></li>`)
            }else if(5<index<13){
                $("#net-movie-list").append(`<li><img src="${item.img}"><div class="top-list-title"><a href="">${item.title}</a><span class="l-score">${item.score}</span><p class="top-list-text">${item.text}</p></div></li>`)
            }
        })

    })

    $.get("./php/upcoming_movie.php",{},function (data) {
        data = JSON.parse(data)
        data.forEach((item,index)=>{
            $("#upcoming-movie-list").append(`<li><div class="upcoming-movie-data">${item.data}</div><div class="upcoming-movie-box-line"></div><div class="upcoming-movie-box-dot"></div><img src="${item.img}" alt=""><div class="top-list-title"><a href="">${item.title}</a><p class="top-list-text">${item.text}</p><div class="top-list-but">预约</div></div></li>`)
        })
    })
    // console.log($("#upcoming-movie-list").css("left"))

// 预告开始
    function jt(x) {
        if (x == 0) {
            console.log($("#upcoming-movie-list").css("left"))
            $(".upcoming-movie-box-left").hide()
            $(".upcoming-movie-box-right").show()
        }

        if (x == -1104){
            $(".upcoming-movie-box-left").show()
            $(".upcoming-movie-box-right").show()
        }
        if (x == -2208){
            $(".upcoming-movie-box-left").show()
            $(".upcoming-movie-box-right").hide()

        }
    }



    var up = 0;
    jt(up)
    $(".upcoming-movie-box-right").on("click",function () {

        up -= 1104
        jt(up)
        $("#upcoming-movie-list").css({"left":`${up}px`,"transition":"all 1s"})


    })
    $(".upcoming-movie-box-left").on("click",function () {

        up += 1104
        jt(up)
        $("#upcoming-movie-list").css({"left":`${up}px`,"transition":"all 1s"})

    })
// 预告结束

//小图片开始
    $.get("./php/limg.php",{},function (data) {
        data = JSON.parse(data)
        data.forEach((item,index)=>{
            $("#ls-list").append(`<li><img src='${item.img}' alt=''><div class="ls-list-title"><a href="">${item.title}</a><span class="ls-list-text">${item.text}</span></div></li>`)
        })
    })
//小图片结束

})
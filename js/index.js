
$(()=>{
	window.onscroll = function(){
		if($("html")[0].scrollTop > 850){
			$(".h_head").show();
			$(".elevator").show();
		}else{
			$(".h_head").hide();
			$(".elevator").hide();
		}
		console.log($("html")[0].scrollTop)
		if($("html")[0].scrollTop >= 200){
			$(".text_list").hide();
		}else{
			$(".text_list").show();
		}
	}
	$(".c_login").on("mouseenter",()=>{
		$(".c_show_login").show()
	})
	$(".c_show_login ").on("mouseleave",()=>{
		$(".c_show_login").hide()
	})


	//打开登陆窗口
	$(".click_login").on("click",()=>{
		$(".c_l_login").show()
		$(".c_show_login").hide()
	})

	//打开注册窗口
	$(".click_login").next().on("click",()=>{
        $(".c_l_login").show()
        $(".c_show_login").hide()
        $(".c_l_login_form").hide()
        $(".dx_zc_page").show()
        $(".c_l_login").css("height","390px")
	})
	//关闭登录窗口
	$(".icon-close").on("click",()=>{
		$(".c_l_login").hide()
	})
	//点击密码登录
	$(".c_l_pw_login").on("click",()=>{
		$(".c_l_pw_login").addClass("c_l_login_color")
		$(".c_l_pw_line").addClass("c_l_pw_line_color")

		$(".c_l_dx_login").removeClass("c_l_login_color")
		$(".c_l_dx_line").removeClass("c_l_dx_line_color")

		$(".dx_login_page").hide()
		$(".pw_login_page").show()

	})
	//点击短信登陆
	$(".c_l_dx_login").on("click",()=>{
		$(".c_l_dx_login").addClass("c_l_login_color")
		$(".c_l_dx_line").addClass("c_l_dx_line_color")

		$(".c_l_pw_login").removeClass("c_l_login_color")
		$(".c_l_pw_line").removeClass("c_l_pw_line_color")

        $(".dx_login_page").show()
        $(".pw_login_page").hide()
	})

    //点击注册
	$(".pw_login_form_foot a:eq(0)").on("click",function () {
		$(".c_l_login_form").hide()
		$(".dx_zc_page").show()
		$(".c_l_login").css("height","390px")
    })


	//点击注册页面的返回
	$(".c_l_zc_exit").on("click",function () {
        $(".c_l_login_form").show()
        $(".dx_zc_page").hide()
        $(".c_l_login").css("height","440px")
    })


	//注册
	//注册用户名验证
	//注册页面 用户名 获得焦点
	$("#zc_username").on("focus",()=>{
		$(".zc_check").hide()
	})
	//注册页面 用户名 失去焦点
	function checkUserName(val){
        var regexp = /^1[3,5,7,8,9]\d{9}$/
		var res = true
        if (regexp.test(val)) {
			$.ajax({
				url:"./php/user.php",
				data:{username: val},
				type:'post',
				async:false,
				success:function (data) {
					data = JSON.parse(data)
                    console.log(val)
					console.log(data)
					if(data != null ){
                        try {
                            data.forEach((item) => {
                                if (item.username == val) {
                                    console.log(item.username)
                                    $(".zc_check").html("该账号已存在")
                                    $(".zc_check").show()
									res = false
                                    throw new Error("x")
                                } //else {
                                //     $(".zc_check").hide()
                                //     console.log(item.username)
                                //     res = true
                                // }
                            })
                        }catch (e) {
                            if (e.message == "x") throw e
                        }
					}else{
                        // $(".zc_check").hide()
                        // res = true
					}


                }
			})
			console.log(res)
            return res
        }else{
            $(".zc_check").show()
			return false
        }
	}

	$("#zc_username").on("blur",(event)=>{
		checkUserName($(event.target).val())
	})

	//注册页面 密码 失去焦点

	function checkPwd(val){
        var regexp = /^\w{6}$/
		if (regexp.test(val)){
			return true
        } else{
			return false
        }
	}
	$("#zc_password").on("blur",(event)=>{
		checkPwd($(event.target).val())

        //当 账号 密码 都正确的时候 注册按钮 变颜色
        if(checkUserName($("#zc_username").val()) && checkPwd($("#zc_password").val())){
            console.log(1)
            $(".pw_login_but #zc_but").css("background","linear-gradient(90deg, #00CC4C 0%, #00D098 100%)")
        }else{
            $(".pw_login_but #zc_but").css("background","rgba(0,0,0,.2)")
		}
	})


	$("#zc_but").on("click",()=>{
        if(checkUserName($("#zc_username").val()) && checkPwd($("#zc_password").val())){

        	$.post("./php/zc.php",{username:$("#zc_username").val(),pwd:$("#zc_password").val(),head_img:"http://www.zhaozhiqun520.com/page3/img/5e595f56-e4ac-4eb8-98a4-98f56408d620.png"},function (data) {
				data = JSON.parse(data)
				if(data.code == 2){
					console.log(data.msg)
					alert("注册成功")
                    location.href = "index.html"

				}
            })
		}else{
        	console.log(checkUserName($("#zc_username").val()))
        	console.log(checkPwd($("#zc_password").val()))
        	console.log("有问题")
		}
	})

	//小眼睛
	$("#eye").on("click",()=>{
		if($("#eye>i").attr("class") == "fa fa-eye"){
            $("#eye>i").attr("class","fa fa-eye-slash")
			$("#password").attr("type","password")
		}else{
            $("#eye>i").attr("class","fa fa-eye")
            $("#password").attr("type","text")
		}

	})

	//登录验证
	//登陆账号获得焦点事件
    $(".pw_login_page #username").on("focus",(event)=>{
        $("#login_user_check").hide()
	})

    //登陆账户失去焦点事件
	var login_data = null
	$(".pw_login_page #username").on("blur",(event)=>{
		var regexp = /^1[3,5,7,8,9]\d{9}$/
		if(regexp.test($(event.target).val())){
			$.post("./php/login_user.php",{username:$(".pw_login_page #username").val()},function (data) {
			    console.log($(".pw_login_page #username").val())
				data = JSON.parse(data)
                login_data = data
                console.log(login_data)


                        if (login_data.username == $(".pw_login_page #username").val()) {
                            $("#login_user_check").hide()
                        } else {
                            $("#login_user_check").html("账号不存在")
                            $("#login_user_check").show()
                        }
			})

		}else{

			$("#login_user_check").html("账号格式错误")
            $("#login_user_check").show()
		}
	})

	//登录密码框获得焦点事件
    $(".pw_login_page #password").on("focus",()=>{
        $("#login_pw_check").hide()
        console.log(login_data.pasword)
        console.log(login_data.username)
	})
	//登录密码框失去焦点事件
	$(".pw_login_page #password").on("blur",()=>{

			if(login_data.pasword == $.md5($(".pw_login_page #password").val()) && login_data.username == $(".pw_login_page #username").val()){
				$("#pw_but").css("background","linear-gradient(90deg, #00CC4C 0%, #00D098 100%)")
                //点击登录按钮事件
                $("#pw_but").on("click",()=>{
                    if(login_data.name == null){
                        $("#name").html("用户"+login_data.id)
                    }else{
                        $("#name").html(login_data.name)
                    }
                    $(".c_l_login").hide()
                    $("#login").hide()
                    $(".cc_login").attr({"src":"../page3/img/5e595f56-e4ac-4eb8-98a4-98f56408d620.png","id":"top-img2"})
                    if($(".cc_login").attr("id") == "top-img2"){
                        $("#top-img2").on("mouseenter",()=>{
                            $(".personage-box").show()
                        })
                        $(".personage-box").on("mouseleave",()=>{
                            $(".personage-box").hide()
                        })
                    }
                    //改变数据库中用户的登陆状态
                    $.post("./php/change_login.php",login_data,function (data) {
                    })
                })
			} else{
				// console.log(login_data.password)
				// console.log($.md5($(".pw_login_page #password").val()))
				$("#login_pw_check").html("密码错误")
                $("#login_pw_check").show()
                $("#pw_but").css("background","rgba(0,0,0,.2)")
			}

	})


    //退出登录
    $("#exit").on("click",function () {
        $(".login").show()
        $("#top-img2").attr({"src":"img/header-userImg-default-dark.png","id":"top-img"})

        // $.ajax({
        //     url: "./php/change_login2.php",
        //     type: "post",
        //     async: false,
        //     data: {username:login_data.username},
        //     dataType: "json",
        //     success: function (data) {
        //         location.href = "index.html"
        //     }
        // })
        console.log(login_data.username)
        $.post("./php/change_login2.php",{username:login_data.username},function (data) {
            location.href = "index.html"
        })

    })


    //轮播图
    let time = null
    let i = 1
    let seconds = 2
    let slider_img = ["./img/da1.jpg","./img/da2.jpg","./img/d3.jpg","./img/da4.jpg","./img/da5.jpg","./img/da6.jpg","./img/da7.jpg","./img/da8.jpg","./img/da9.jpg","./img/da10.jpg",]

    $(".slider").css("background-image",`url(${slider_img[0]})`)

    $(".text_list ul li").each(function (index,element) {
        $(element).on("mouseover",()=>{
            changeImg(index)
        })
        $(element).on("mouseout",()=>{
            start(index)
        })
    })

    function changeImg(flag=false) {
        if(flag !== false){
            window.clearInterval(time)
            i=flag
        }
        $(".text_list li").each((index,item)=>{
        	$(".text_list li:eq("+index+") a").css({"color":"rgba(126,128,128)","font-size":"12px"})
		})

        if(flag === false){
            i++
            if(i>=slider_img.length){
                i=0
            }
        }
        $(".text_list li:eq("+i+") a").css({"font-size":"16px","color":"#FFFFFF"})

        $(".slider").css("background-image",`url(${slider_img[i]})`)
    }
    function start(index) {
        window.clearInterval(time)
        i=index+1
        time=setInterval(changeImg,1000*seconds)
    }


    start(-2)



	//推广广告
	$(".tg_gg:eq(0)").on("mouseenter",()=>{
        $(".tg_gg:eq(0)").css({"width":"100%","left":"0"})
        $(".tg_gg:eq(1)").css({"left":"994px","width":"0","height":"85px","transition":"all 0.4s"})
        $(".tg_gg:eq(2)").css({"left":"994px","width":"0","height":"85px","transition":"all 0.4s"})
        $(".tg_gg:eq(3)").css({"left":"994px","width":"0","height":"85px","transition":"all 0.4s"})
        $(".tg_gg:eq(4)").css({"left":"994px","width":"0","height":"85px","transition":"all 0.4s"})

        $(".tg_gg:eq(2)").css({"left":"994px","width":"0","height":"85px","transition":"all 0.4s"})

        $(".tg_right:eq(0)").css("opacity","1")
		$(".tg_right:eq(0)").css({"width":"792px","transition":"all 0.4s"})


		$(".tg_left:eq(1)").css({"left":"0","width":"0","height":"85px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0","width":"0","height":"85px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0","width":"0","height":"85px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0","width":"0","height":"85px","transition":"all 0.4s"})

	})

    $(".tg_gg:eq(0)").on("mouseleave",()=>{
        $(".tg_gg:eq(0)").css({"width":"186px","left":"0"})
        $(".tg_gg:eq(1)").css({"width":"186px","left":"202px","transition":"all 0.4s"})
        $(".tg_gg:eq(2)").css({"width":"186px","left":"404px","transition":"all 0.4s"})
        $(".tg_gg:eq(3)").css({"width":"186px","left":"606px","transition":"all 0.4s"})
        $(".tg_gg:eq(4)").css({"width":"186px","left":"808px","transition":"all 0.4s"})

        $(".tg_right:eq(0)").css({"width":"0px","opacity":"0","transition":"all 0.4s"})

        $(".tg_left:eq(1)").css({"left":"0px","width":"186px","height":"85px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0px","width":"186px","height":"85px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0px","width":"186px","height":"85px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0px","width":"186px","height":"85px","transition":"all 0.4s"})

    })

    $(".tg_gg:eq(1)").on("mouseover",()=>{
    	$(".tg_gg:eq(0)").css({"width":"0","left":"0"})
    	$(".tg_gg:eq(2)").css({"width":"0","left":"994px","transition":"all 0.4s"})
    	$(".tg_gg:eq(3)").css({"width":"0","left":"994px","transition":"all 0.4s"})
    	$(".tg_gg:eq(4)").css({"width":"0","left":"994px","transition":"all 0.4s"})
        $(".tg_gg:eq(1)").css("width","100%")
		$(".tg_gg:eq(1)").css({"left":"0","width":"100%","transition":"all 0.4s"})


    	$(".tg_left:eq(0)").css({"width":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"width":"0px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"width":"0px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"width":"0px","left":"0px","transition":"all 0.4s"})

		$(".tg_right:eq(1)").css({"width":"792px","left":"186px","transition":"all 0.4s"})
        $(".tg_right:eq(1)").css("opacity","1")


    })

    $(".tg_gg:eq(1)").on("mouseout",()=>{
        $(".tg_gg:eq(0)").css({"width":"186px","left":"0"})
        $(".tg_gg:eq(2)").css({"width":"186px","left":"404px"})
        $(".tg_gg:eq(3)").css({"width":"186px","left":"606px"})
        $(".tg_gg:eq(4)").css({"width":"186px","left":"808px"})
        $(".tg_gg:eq(1)").css({"left":"202px","width":"186px","transition":"all 0.4s"})

        $(".tg_left:eq(0)").css({"width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"width":"186px","transition":"all 0.4s"})


        $(".tg_right:eq(1)").css({"width":"0px","opacity":"0","left":"186px","transition":"all 0.4s"})
    })

    $(".tg_gg:eq(2)").on("mouseover",()=>{
        $(".tg_gg:eq(0)").css({"width":"0","left":"0"})
        $(".tg_gg:eq(1)").css({"width":"0","left":"0","transition":"all 0.4s"})
        $(".tg_gg:eq(3)").css({"width":"0","left":"994px","transition":"all 0.4s"})
        $(".tg_gg:eq(4)").css({"width":"0","left":"994px","transition":"all 0.4s"})
        $(".tg_gg:eq(2)").css("width","100%")
        $(".tg_gg:eq(2)").css({"left":"0","width":"100%","transition":"all 0.4s"})


        $(".tg_left:eq(0)").css({"left":"0","width":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0","width":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0","width":"186px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0","width":"0px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0","width":"0px","left":"0px","transition":"all 0.4s"})

        $(".tg_right:eq(2)").css({"width":"792px","left":"186px","transition":"all 0.4s"})
        $(".tg_right:eq(2)").css("opacity","1")


    })

    $(".tg_gg:eq(2)").on("mouseout",()=>{
        $(".tg_gg:eq(0)").css({"width":"186px","left":"0"})
        $(".tg_gg:eq(1)").css({"width":"186px","left":"202px"})
        $(".tg_gg:eq(3)").css({"width":"186px","left":"606px"})
        $(".tg_gg:eq(4)").css({"width":"186px","left":"808px"})
        $(".tg_gg:eq(2)").css({"left":"404px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(0)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0px","width":"186px","transition":"all 0.4s"})


        $(".tg_right:eq(2)").css({"width":"0px","opacity":"0","left":"186px","transition":"all 0.4s"})
    })


    $(".tg_gg:eq(3)").on("mouseover",()=>{
        $(".tg_gg:eq(0)").css({"width":"0","left":"0"})
        $(".tg_gg:eq(1)").css({"width":"0","left":"0","transition":"all 0.4s"})
        $(".tg_gg:eq(2)").css({"width":"0","left":"0","transition":"all 0.4s"})
        $(".tg_gg:eq(4)").css({"width":"0","left":"994px","transition":"all 0.4s"})
        $(".tg_gg:eq(3)").css("width","100%")
        $(".tg_gg:eq(3)").css({"left":"0","width":"100%","transition":"all 0.4s"})
        $(".tg_left:eq(0)").css({"left":"0","width":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0","width":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0","width":"0px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0","width":"186px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0","width":"0px","left":"0px","transition":"all 0.4s"})

        $(".tg_right:eq(3)").css({"width":"792px","left":"186px","transition":"all 0.4s"})
        $(".tg_right:eq(3)").css("opacity","1")


    })

    $(".tg_gg:eq(3)").on("mouseout",()=>{
        $(".tg_gg:eq(0)").css({"width":"186px","left":"0"})
        $(".tg_gg:eq(1)").css({"width":"186px","left":"202px"})
        $(".tg_gg:eq(2)").css({"width":"186px","left":"404px"})
        $(".tg_gg:eq(4)").css({"width":"186px","left":"808px"})
        $(".tg_gg:eq(3)").css({"left":"606px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(0)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0px","width":"186px","transition":"all 0.4s"})


        $(".tg_right:eq(3)").css({"width":"0px","opacity":"0","left":"186px","transition":"all 0.4s"})
    })


    $(".tg_gg:eq(4)").on("mouseover",()=>{
        $(".tg_gg:eq(0)").css({"width":"0","left":"0"})
        $(".tg_gg:eq(1)").css({"width":"0","left":"0","transition":"all 0.4s"})
        $(".tg_gg:eq(2)").css({"width":"0","left":"0","transition":"all 0.4s"})
        $(".tg_gg:eq(3)").css({"width":"0","left":"0","transition":"all 0.4s"})
        $(".tg_gg:eq(4)").css("width","100%")
        $(".tg_gg:eq(4)").css({"left":"0","width":"100%","transition":"all 0.4s"})


        $(".tg_left:eq(0)").css({"left":"0","width":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0","width":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0","width":"0px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0","width":"0px","left":"0px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0","width":"186px","left":"0px","transition":"all 0.4s"})

        $(".tg_right:eq(4)").css({"width":"792px","left":"186px","transition":"all 0.4s"})
        $(".tg_right:eq(4)").css("opacity","1")


    })

    $(".tg_gg:eq(4)").on("mouseout",()=>{
        $(".tg_gg:eq(0)").css({"width":"186px","left":"0"})
        $(".tg_gg:eq(1)").css({"width":"186px","left":"202px"})
        $(".tg_gg:eq(2)").css({"width":"186px","left":"404px"})
        $(".tg_gg:eq(3)").css({"width":"186px","left":"606px"})
        $(".tg_gg:eq(4)").css({"left":"808px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(0)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(1)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(2)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(3)").css({"left":"0px","width":"186px","transition":"all 0.4s"})
        $(".tg_left:eq(4)").css({"left":"0px","width":"186px","transition":"all 0.4s"})


        $(".tg_right:eq(4)").css({"width":"0px","opacity":"0","left":"186px","transition":"all 0.4s"})
    })

    //搜全网找日不落酒店
    $(".search_text").on("click",function () {
        if($(".search_box_input").val() == "日不落酒店"){
            window.open("page3/index.html")
        }else{
            alert("当前只有《日不落酒店》一部电影")
        }
    })

    // 获取登录状态
    $.post("./page2/php/link_login.php",{},function (data) {
        data = JSON.parse(data)
        console.log(data)
        login_data = data
        if(login_data.name == null){
            $("#name").html("用户"+login_data.id)
        }else{
            $("#name").html(login_data.name)
        }
        if(data.state == 1){
            $(".c_l_login").hide()
            $("#login").hide()
            $(".cc_login").attr({"src":"../page3/img/5e595f56-e4ac-4eb8-98a4-98f56408d620.png","id":"top-img2"})
            if($(".cc_login").attr("id") == "top-img2"){
                $("#top-img2").on("mouseenter",()=>{
                    $(".personage-box").show()
                })
                $(".personage-box").on("mouseleave",()=>{
                    $(".personage-box").hide()
                })
            }
        }
    })

    $(".personage-one-line span:eq(1)").on("click",function () {
        window.open("person_page1/index.html")
    })


})
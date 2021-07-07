$(()=>{
    var login_data = null
    $.post("../page2/php/link_login.php",{},function (data) {
        data = JSON.parse(data)
        login_data = data
        console.log(data)
        $("#name span").html(login_data.name)
    })

    $("#set_name").on("click",function () {
        $(".set-box").show()
    })
    $("#name_input").on("dbclick",function () {
        $(".set-box").hide()
    })
    $("#save_name").on("click",function () {
        $("#name span").html($("#name_input").val())
        $("#name_input").val("")
        $(".set-name").hide()
        $.post("./php/setName.php",{name:$("#name span").html(),username:login_data.username},function (data) {
            $(".set-box").hide()
        })
    })
    
//修改密码开始
    $(".set-password-title button").on("click",function () {
        $(".set-password").show()
    })
    $("#save_password").on("click",function () {
        $.post("./php/setPassword.php",{password:$("#password-set").val(),username:login_data.username},function (data) {
            console.log(data)

        })
        $(".set-password").hide()
    })

//修改密码结束
})

//进度条功能
$(document).ajaxStart(function(){
   NProgress.start();
});
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    });
});

if( location.href.indexOf('login.html') === -1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            console.log(info);
            if( info.success){
                console.log("用户已登录");
            }
            if( info.error === 400){
                location.href = "login.html";
            }
        }
    });
}

$(function(){
    //1.分类管理功能
    $('.nav .category').click(function(){
        $('.nav .child').stop().slideToggle();
    });

    //2.左侧侧边栏切换功能
    $('.icon_menu').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');

    });
    //3.弹出模态框
    $('.icon_logout').click(function(){
        $('#logoutModal').modal('show');
    });
    //4.
    $('#logoutBtn').click(function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                console.log(info);
                if( info.success ){
                    location.href = "login.html";
                }
            }
        })
    })


});
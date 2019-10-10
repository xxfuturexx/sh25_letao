// 2019/10/10
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var  htmlStr = template( 'tpl' , info);
                $('tbody').html(htmlStr);

                //分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil( info.total/info.size),
                    currentPage: info.page,
                    onPageClicked: function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }

                })
            }
        })
    }

});

$(function(){
    var currentPage =1;
    var  pageSize = 5;
   render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType:"json",
            success:function( info ){
                console.log( info );
                var htmlStr = template('tpl',info);
                $('tbody').html( htmlStr );

                //分页
                $('#Paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil( info.total/ info.size),
                    onPageClicked: function( a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })

            }
        })
    }
});
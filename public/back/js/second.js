$(function(){

    var currentPage = 1;
    var pageSize = 5;
    render();
    //1.
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType:"json",
            success:function( info ){
                console.log( info );
                var htmlStr = template( 'secondTpl', info);
                $('.lt_content tbody').html( htmlStr );

            //    2.分页
                $('#Paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil( info.total / info.size),
                    onPageClicked( a,b,c,page){
                        currentPage = page;
                        render();

                    }
                })
            }

        })
    }
});
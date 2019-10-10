// 2019/10/10
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var currentId ;
    var isDelete ;
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


    //2.禁用按钮
    $('tbody').on('click','.btn',function(){
          $('#userModal').modal('show');
          currentId = $(this).parent().data('id');
          isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    });

    //3.确认按钮
      $('#submitBtn').click(function(){
         $.ajax({
             type:"post",
             url:"/user/updateUser",
             data:{
                 id: currentId,
                 isDelete : isDelete
             },
             dataType:"json",
             success:function(info){
                 console.log( info );
                 if( info.success ){
                     $('#userModal').modal('hide');
                     render();
                 }
             }
         })
      })

});
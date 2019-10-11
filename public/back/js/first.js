
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

    //3.添加分类模态框
    $('#addBtn').click(function(){
        $('#addModal').modal('show');
    })

    //4.添加表单校验插件
    $('#form').bootstrapValidator({
        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },
        fields:{
            categoryName:{
                validators: {
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            }
        }

    })


    //5.添加表单校验成功事件
    $('#form').on("success.form.bv",function( e ){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data: $('#form').serialize(),
            dataType:"json",
            success:function( info ){
                console.log( info );
                if( info.success ){
                    $('#addModal').modal('hide');
                    render();
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
            }
        })

    })
});
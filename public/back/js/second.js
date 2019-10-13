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

//    2.添加分类按钮,显示模态框
    $('#addBtn').click(function(){
            $('#addModal').modal('show');

    //        ajax请求
            $.ajax({
                type: "get",
                url:"/category/querySecondCategoryPaging",
                data:{
                    page: 1,
                    pageSize: 100
                },
                dataType:"json",
                success:function( info ){
                    console.log( info );
                    var htmlStr = template( "dropdownTpl",info);
                    $('.dropdown-menu').html( htmlStr );
                }
            })

    })

        //3.给下拉列表的a添加点击事件
   $('.dropdown-menu').on("click","a",function(){
        var  txt = $(this).text();
        $('#dropdownText').text( txt );
        //
       var id = $(this).data('id');
       $('[name="categoryId"]').val( id );

       $("#form").data('bootstrapValidator').updateStatus("categoryId",'VALID');
   });

    //4.图片预览
    $('#fileInput').fileupload({
        dataType:"json",
        done:function( e, data){
            // console.log( data.result.picAddr);
            var imgUrl = data.result.picAddr;
            $('#imgBox img').attr('src',imgUrl);
            $('[name="brandLogo"]').val( imgUrl );

            $('#form').data('bootstrapValidator').updateStatus("brandLogo",'VALID');
    }
    })
    //5.表单校验
    //使用表单校验插件
    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            //categoryId 选择的一级分类 id
            //brandName  二级分类名称
            //brandLogo  上传的图片地址
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一级分类'
                    },

                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类'
                    },

                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请添加图片'
                    },

                }
            },
        }

    });
    //6.注册表单校验成功事件
    $('#form').on("success.form.bv",function( e ){
        e.preventDefault();

        //通过ajax提交
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$('#form').serialize(),
            dataType:"json",
            success:function( info ){
                console.log( info );
                if( info.success ){
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                    //重置表单
                    $('#form').data('bootstrapValidator').resetForm( true);
                    //
                    $('#dropdownText').text("请输入一级分类");
                    $('#imgBox img').attr( "src","./images/none.png")
                }
            }
        })
    })


});
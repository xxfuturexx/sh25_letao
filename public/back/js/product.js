

//2019/10/14凌晨
$(function(){
    var currentPage = 1;
    var pageSize = 2;
    //定义图片数组
    var picArr = [];
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType:"json",
            success:function( info ){
                console.log( info );
                var htmlStr = template( "productTpl", info );
                $('.lt_content tbody').html( htmlStr );

            //    分页渲染
                $('#Paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil( info.total/info.size),
                    size:"small",
                    itemTexts:function( type,page,current ) {
                        switch( type ){
                            case "page":
                                return page;
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                 return "上一页";
                            case "next":
                                return "下一页";
                        }
                    },
                    tooltipTitles: function( type ,page,current){
                        switch( type ){
                            case "page":
                                return "前往第" + page + "页";
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                        }
                    },
                    useBootstrapTooltip: true,

                    //分页点击渲染
                    onPageClicked:function( a,b,c,page){
                        currentPage =  page;
                        render();
                    }
                })

            }
        })
    }

// 2.添加模态框
$('#addBtn').click(function(){
    $('#addModal').modal("show");

    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page: 1,
            pageSize: 100
        },
        dataType:"json",
        success:function( info ){
            console.log( info )
            var htmlStr = template( "tpl_2" , info);
            $('.dropdown-menu').html( htmlStr);

        }

    })

})


    //3.a点击
    $('.dropdown-menu').on("click","a",function(){
        var txt = $(this).text();
        $('#dropdownText').text( txt );

        //设置id给隐藏域, name="brandId"
        var id = $( this ).data("id");
        $('[name="brandId"]').val( id );
        //手动更新表单校验
        $('#form').data("bootstrapValidator").updateStatus("brandId","VALID");
    })



    //4.文件上传初始化
    $('#fileupload').fileupload({
        dataType:"json",
        done:function( e,data ){
            // console.log( data.result );
        picArr.unshift( data.result );
        $('#imgBox').prepend('<img src="'+data.result.picAddr+'" width="100">')
            if( picArr.length > 3){
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }
        if( picArr.length === 3){
            //手动表单校验
            $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID");
        }
        }



    })

    //5.表单校验
    $('#form').bootstrapValidator({
        excluded:[],
        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            // 产品名称
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },

            // 产品描述
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入产品描述"
                    }
                }
            },

            // 产品库存
            // 除了非空之外, 要求必须是非零开头的数字
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    //正则校验
                    // \d 表示数字 0-9
                    // + 表示出现一次或多次
                    // * 表示出现0次或多次
                    // ? 表示出现0次或1次
                    regexp: {
                        // regexp: /^[1-9]\d*$/,
                         regexp:/^[1-9]\d*$/ ,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },

            // 尺码, 还要求必须是 xx-xx 的格式, x为数字
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        // regexp: /^\d{2}-\d{2}$/,
                        regexp:/^\d{2}-\d{2}$/,
                        message: '尺码必须是 xx-xx 的格式, 例如: 32-40'
                    }
                }
            },

            // 原价
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },

            // 现价
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },

            // 图片校验
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请选择三张图片"
                    }
                }
            }


        }


    })


    //6.表单校验成功
    $('#form').on("success.form.bv",function( e ){
        e.preventDefault();

        var paramsStr = $('#form').serialize();
        paramsStr += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
        paramsStr += "&picName1="+picArr[1].picName+"&picAddr1="+picArr[1].picAddr;
        paramsStr += "&picName1="+picArr[2].picName+"&picAddr1="+picArr[2].picAddr;

        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:paramsStr,
            dataType:"json",
            success:function( info ){
                console.log( info );
                if( info.success ){
                    currentPage =1;
                    render();

                    $('#addModal').modal('hide');
                    //
                    $('#form').data("bootstrapValidator").resetForm(true);
                    $('#dropdownText').text("请输入二级分类");
                    $('#imgBox img').remove();
                }
            }
        })

    })
});
//使用表单校验插件
$('#form').bootstrapValidator({


    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
        //校验用户名，对应name表单的name属性
        username: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '用户名不能为空'
                },
                //长度校验
                stringLength: {
                    min: 2,
                    max: 6,
                    message: '用户名长度必须在2-6位之间'
                },

            }
        },
       password: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '密码不能为空'
                },
                //长度校验
                stringLength: {
                    min: 6,
                    max: 12,
                    message: '密码长度必须在6到12位之间'
                },

            }
        },
    }

});
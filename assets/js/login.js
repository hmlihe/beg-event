$(function () {
    // 点击 “去注册”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 “去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui中获取form对象
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],

        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致"
            }

        }
    });

    // 监听注册页面
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // let input= $(this).serialize()
        $.ajax({
            url: '/api/reguser',
            method: 'post',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    //   return console.log(res.message);
                    return layer.msg(res.message || '注册失败')
                }
                layer.msg(res.message || '注册成功')
                $('#link_login').click();
            }
        })
    })

    //  // 监听登录页面
    $('#form_login').submit(function (e) {
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(layer.message || '登录失败')
                }

                layer.msg(layer.message || '登录成功');
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        })
    })
})
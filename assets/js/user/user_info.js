$(function () {
    // var form=layui.form
    // var layer=layui.layer
    var { form, layer } = layui;
    // console.log(layui);
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserinfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();

    })

    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo();
            }
        })
    })
})
$(function(){
    getUserInfo()
    //点击按钮，实现退出功能
    $('#btnLogout').on('click',function(){
        // 弹出框
        layer.confirm('确认退出嘛?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 2.跳转到登录页面
            location.href='/login.html'

            
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token'),
        },
        success(res){
            // console.log(res);
            if(res.status !==0){
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },

    })
}

function renderAvatar(user){
    const name =user.nickname || user.username;
    $('#welcome').html(`欢迎${name}`)

    if(user.user_pic !==null){
        // 图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        // 文字头像
        const first=name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img   ').hide();

    }

}
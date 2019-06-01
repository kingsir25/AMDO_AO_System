function login(){
    if ($("userName")=='') {
        vm.error = true;
        vm.errorMsg = "用户名不能为空!";
        vm.userfocus = true;
        return;
    }
    if (!vm.form.password) {
        vm.error = true;
        vm.errorMsg = "密码不能为空!";
        vm.pwdfocus = true;
        return;
    }
    $.ajax({
        type : "POST",
        url : baseUrl + "sys/login",
        data : {
            "username":vm.form.username,
            "password":vm.form.password
        },
        dataType : "json",
        success : function(result) {
            if (result.code == 0) {// 登录成功
                localStorage.setItem('token',result.Authorization);
                localStorage.setItem('username',result.username);
                parent.location.href = 'index.html';
            } else {
                vm.error = true;
                vm.errorMsg = result.msg;
            }
        }
    });
}

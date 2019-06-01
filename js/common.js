// 后台地址
var baseUrl = "http://localhost:8080/";

//工具集合Tools
window.T = {};
// 获取当前页面名称(不带后缀名)
var pageName = function() {
	var a = location.href;
	var b = a.split("/");
	var c = b.slice(b.length - 1, b.length).toString(String).split(".");
	return c.slice(0, 1);
};
T.pageName = pageName;

// token
var token = localStorage.getItem("token");
if (isEmpty(token)) 
{
	if (T.pageName() != 'login') 
	{
		parent.location.href = 'login.html';
	}
}

//ajax全局配置
$.ajaxSetup({
	dataType : "json",
	cache : false,
	 headers: {
	        "token": token
	    },
	xhrFields : 
	{
		withCredentials : true
	},
	complete : function(xhr) {
		if(this.type=='OPTIONS'){return;}
		// 未登录或者token过期，则跳转到登录页面
		if (xhr.responseJSON == null || xhr.responseJSON.code == 401) 
		{
			localStorage.removeItem('token');
			localStorage.removeItem('username');
			parent.location.href = 'login.html';
		}
	}
});

//判断是否为空
function isEmpty(value) {
	return !value || !/\S/.test(value)
}
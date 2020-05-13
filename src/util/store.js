/*
* @Author: SongShuhang
* @Date:   2020-05-12 10:39:25
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-12 16:10:21
*/

var Hogan = require('hogan.js');

var conf = {
	serverHost : ''
};

var _store = {
	//网络请求处理
	request :function(param){
		var _this = this;
		$.ajax({
			type 	  :    param.method  || 'get',
			url 	  :    param.url 	 || '',
			dataType  :    param.type 	 || 'json',
			data 	  :    param.data 	 || '',
			success	  :    function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				//没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error	  :    function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam : function(name){
		var reg 	=   new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result  =   window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染HTML模板，将传入的模板和数据拼接到HTML页面
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
    	alert(msg || '操作成功');
    },
    //错误提示
    errorTips : function(msg){
    	alert(msg || '操作失败,Try Again~');
    },
    //表单验证,字段的验证，支持非空判断、手机验证、邮箱验证
    validate : function(value, type){
    	//去除左右空格
    	var value  = $.trim(value);
    	//非空判断
    	if('require' === type){
    		return !!value;
    	}
    	//手机验证
    	if('phone' === type){
    		return /^1[3456789]\d{9}$/.test(value);
    	}
    	//邮箱验证
    	if('email' === type){
    		return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(vaule);
    	}
    },
	//统一登录处理
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//跳转主页
	goHome : function(){
		window.location.href = './index.html';
	}
};

module.exports = _store;
/*
* @Author: SongShuhang
* @Date:   2020-05-02 18:24:58
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-14 18:59:51
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _user  = require('service/user-service.js');
var _store = require('util/store.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

//page 逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//登录按钮的点击
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按下回车键，也进行提交
		$('.user-content').keyup(function(e){
			//keyCode == 13 表示回车键
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	//提交表单
	submit : function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		//验证成功
		if (validateResult.status) {
			//提交(三个参数：需要提交的数据集合，响应成功方法，响应失败方法)
			_user.login(formData, function(res){
				window.location.href = _store.getUrlParam('redirect') || './index.html';
			}, function(errMsg){
				formError.show(errMsg);
			});
		}
		//验证失败
		else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单验证
	formValidate : function(formData){
		var result = {
			status  : false,
			msg		: ''
		};
		//验证用户名是否为空
		if (!_store.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		//验证密码是否为空
		if (!_store.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		//通过验证，返回正确提示
		result.status 	= true;
		result.msg 		= '验证通过';
		return result;
	}

};
$(function(){
	page.init();
});
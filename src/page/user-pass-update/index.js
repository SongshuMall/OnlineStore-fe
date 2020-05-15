/*
* @Author: SongShuhang
* @Date:   2020-05-15 09:54:38
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-15 10:30:14
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _store 			= require('util/store.js');
var _user           = require('service/user-service.js');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    //事件响应
    bindEvent : function(){
    	var _this = this;
    	//点击提交按钮的事件响应
    	$(document).on('click', '.btn-submit', function(){
    		var userInfo = {
    			password  	  		:     $.trim($('#password').val()),
    			passwordNew  		:     $.trim($('#password-new').val()),
    			passwordConfirm     :     $.trim($('#password-confirm').val())
    		},
    		//验证传入的数据
    		validateResult = _this.validateForm(userInfo);
    		if (validateResult.status) {
    			//验证通过，更新用户密码
    			//(三个参数：需要提交的数据集合，响应成功方法，响应失败方法)
    			_user.updatePassword({
    				passwordOld  :  userInfo.password,
    				passwordNew  :  userInfo.passwordNew
    			}, function(res, msg){
    				_store.successTips(msg);
    			}, function(errMsg){
    				_store.errorTips(errMsg);
    			});
    		}
    		else {
    			//验证未通过，返回错误信息
    			_store.errorTips(validateResult.msg);
    		}
    	});
    },
    //验证字段信息
    validateForm : function(formData){
    	var result = {
			status  : false,
			msg		: ''
		};
		//验证原密码是否为空
		if (!_store.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		//验证新密码长度
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '密码长度不能小于6位';
			return result;
		}
		//验证两次输入的密码是否一致
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
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

/*
* @Author: SongShuhang
* @Date:   2020-05-14 16:26:35
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-15 09:36:04
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _store 			= require('util/store.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    //事件响应
    bindEvent : function(){
    	var _this = this;
    	//点击提交按钮的事件响应
    	$(document).on('click', '.btn-submit', function(){
    		var userInfo = {
    			phone  	  :     $.trim($('#phone').val()),
    			email  	  :     $.trim($('#email').val()),
    			question  :     $.trim($('#question').val()),
    			answer    :     $.trim($('#answer').val())
    		},
    		//验证传入的数据
    		validateResult = _this.validateForm(userInfo);
    		if (validateResult.status) {
    			//验证通过，更新用户信息
    			//(三个参数：需要提交的数据集合，响应成功方法，响应失败方法)
    			_user.updateUserInfo(userInfo, function(res, msg){
    				_store.successTips(msg);
    				window.location.href = './user-center.html';
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
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
		//获取用户信息(两个参数：响应成功方法，响应失败方法)
        _user.getUserInfo(function(res){
            userHtml = _store.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
			_store.errorTips(errMsg);
        });
    },
    //验证字段信息
    validateForm : function(formData){
    	var result = {
			status  : false,
			msg		: ''
		};
		//验证手机格式
		if (!_store.validate(formData.phone, 'phone')) {
			result.msg = '手机格式不正确';
			return result;
		}
		//验证邮箱格式
		if (!_store.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		//验证密码提示问题是否为空
		if (!_store.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		//验证密码提示问题答案是否为空
		if (!_store.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题答案不能为空';
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

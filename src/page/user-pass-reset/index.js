/*
* @Author: SongShuhang
* @Date:   2020-05-14 15:07:55
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-14 16:11:03
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
	//存储后端返回的数据
	data : {
		username : '',
		question : '',
		answer	 : '',
		token	 : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadSetpUsername();
	},
	bindEvent : function(){
		var _this = this;
		//输入用户名之后的按钮点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//用户已输入
			if (username) {
				//(三个参数：需要提交的数据集合，响应成功方法，响应失败方法)
				_user.getQuestion(username, function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadSetpQuestion();
				}, function(errMsg){
					formError.show(errMsg);
				})
			}
			//用户名未输入
			else{
				formError.show('请输入用户名');
			}
		});
		//输入密码提示问题答案之后的按钮点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			//密码提示问题的答案已输入
			if (answer) {
				//检查密码提示问题答案
				//(三个参数：需要提交的数据集合，响应成功方法，响应失败方法)
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer 	 : answer
				}, function(res){
					_this.data.answer = answer;
					_this.data.token  = res;
					_this.loadSetpPassword();
				}, function(errMsg){
					formError.show(errMsg);
				})
			}
			//密码提示问题的答案未输入
			else{
				formError.show('请输入密码提示问题的答案');
			}
		});
		//输入新密码之后的按钮点击
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			//新密码已输入
			if (password && password.length >= 6) {
				//更新密码
				//(三个参数：需要提交的数据集合，响应成功方法，响应失败方法)
				_user.resetPassword({
					username 		 : _this.data.username,
					passwordNew 	 : password,
					forgetToken 	 : _this.data.token
				}, function(res){
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg){
					formError.show(errMsg);
				})
			}
			//新密码未输入
			else{
				formError.show('请输入长度大于5的新密码');
			}
		});
	},
	//加载输入用户名的一步
	loadSetpUsername :function(){
		$('.step-username').show();
	},
	//加载输入密码提示问题答案的一步
	loadSetpQuestion :function(){
		//隐藏错误提示
		formError.hide();
		//切换到第二步操作
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	//加载输入新密码的一步
	loadSetpPassword :function(){
		//隐藏错误提示
		formError.hide();
		//切换到第二步操作
		$('.step-question').hide()
			.siblings('.step-password').show();
	}

};
$(function(){
	page.init();
});
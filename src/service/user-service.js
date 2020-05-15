/*
* @Author: SongShuhang
* @Date:   2020-05-14 11:10:47
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-14 20:31:07
*/
var _store = require('util/store.js');

var _user = {
	//用户登录
	login : function(userInfo, resolve, reject){
		_store.request({
			url 	:  _store.getServerUrl('/user/login.do'),
			data	:  userInfo,
			method	:  'POST',
			success :  resolve,
			error 	:  reject
		});
	},
	//用户名是否存在
	checkUsername : function(username, resolve, reject){
		_store.request({
			url 	:  _store.getServerUrl('/user/check_valid.do'),
			data	:  {
				type : 'username',
				str  : username
			},
			method	:  'POST',
			success :  resolve,
			error 	:  reject
		});
	},
	//获取密码提示问题
	getQuestion : function(username, resolve, reject){
		_store.request({
			url 	:  _store.getServerUrl('/user/forget_get_question.do'),
			data	:  {
				username : username
			},
			method	:  'POST',
			success :  resolve,
			error 	:  reject
		});
	},
	//检查密码提示问题答案
	checkAnswer : function(userInfo, resolve, reject){
		_store.request({
			url 	:  _store.getServerUrl('/user/forget_check_answer.do'),
			data	:  userInfo,
			method	:  'POST',
			success :  resolve,
			error 	:  reject
		});
	},
	//重置密码
	resetPassword : function(userInfo, resolve, reject){
		_store.request({
			url 	:  _store.getServerUrl('/user/forget_reset_password.do'),
			data	:  userInfo,
			method	:  'POST',
			success :  resolve,
			error 	:  reject
		});
	},
	//用户注册
	register : function(userInfo, resolve, reject){
		_store.request({
			url 	:  _store.getServerUrl('/user/register.do'),
			data	:  userInfo,
			method	:  'POST',
			success :  resolve,
			error 	:  reject
		});
	},
	//获取用户信息
	getUserInfo : function(resolve, reject){
		_store.request({
			url 	:  _store.getServerUrl('/user/get_information.do'),
			method	:  'POST',
			success :  resolve,
			error 	:  reject
		});
	},
	// 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _user;
/*
* @Author: SongShuhang
* @Date:   2020-05-14 16:19:32
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-14 20:18:27
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
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
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
    }
};

$(function(){
    page.init();
});
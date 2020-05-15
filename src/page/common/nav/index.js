/*
* @Author: SongShuhang
* @Date:   2020-05-12 17:33:15
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-14 17:19:27
*/

require('./index.css');
var _store     = require('util/store.js');
var _user   = require('service/user-service.js');
// 导航
var nav = {
    init : function(){
        this.bindEvent();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _store.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _store.errorTips(errMsg);
            });
        });
    }
};

module.exports = nav.init();

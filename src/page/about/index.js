/*
* @Author: SongShuhang
* @Date:   2020-05-26 09:35:09
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-26 09:43:44
*/

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide  = require('page/common/nav-side/index.js');

// page 逻辑部分
var page = {
    init: function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'about'
        });
    }
};

$(function(){
    page.init();
});

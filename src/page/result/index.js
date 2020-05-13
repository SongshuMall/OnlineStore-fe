/*
* @Author: SongShuhang
* @Date:   2020-05-13 10:53:27
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-13 11:23:34
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _store = require('util/store.js');

$(function(){
    var type        = _store.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})
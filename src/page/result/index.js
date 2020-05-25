/*
* @Author: SongShuhang
* @Date:   2020-05-13 10:53:27
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 22:02:41
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _store = require('util/store.js');

$(function(){
    var type        = _store.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if (type === 'payment') {
    	var orderNumber = _store.getUrlParam('orderNumber'),
    		$orderNumber = $element.find('.order-number');
    	$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
})
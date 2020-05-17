/*
* @Author: SongShuhang
* @Date:   2020-05-02 18:04:08
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-15 17:18:46
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var templateBanner = require('./banner.string');
var _store = require('util/store.js');

$(function(){
	//渲染banner的html
	var bannerHtml = _store.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	//初始化banner
	var $slider = $('.banner').unslider({
		dots: true
	});
	//前一张和后一张按钮的事件绑定
	$('.banner-con .banner-arrow').click(function(){
		var forward = $(this).hasClass('prev') ? 'prev' : 'next';
		$slider.data('unslider')[forward]();
	});
});


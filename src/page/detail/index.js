/*
* @Author: SongShuhang
* @Date:   2020-05-17 08:22:05
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-18 19:21:17
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _store          = require('util/store.js');
var _product        = require('service/product-service.js');
var _cart        	= require('service/cart-service.js');
var templateIndex   = require('./index.string');

//页面逻辑
var page = {
	data : {
        /* 商品ID */
        productId  : _store.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	//判断productId是否传递过来了
    	if (!this.data.productId) {
    		//若未传递，则跳回首页
    		_store.goHome();
    	}
    	//加载商品详情
    	this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        //图片预览
 		$(document).on('mouseenter', '.p-img-item', function(){
 			var imageUrl = $(this).find('.p-img').attr('src');
 			$('.main-img').attr('src', imageUrl);
 		});
 		//count操作
  		$(document).on('click', '.p-count-btn', function(){
 			var type 		= $(this).hasClass('plus') ? 'plus' : 'minus',
 				$pCount 	= $('.p-count'),
 				currCount 	= parseInt($pCount.val()),
 				minCount 	= 1,
 				maxCount 	= _this.data.detailInfo.stock || 1;
 			//点击+号按钮
 			if (type === 'plus') {
 				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
 			}
 			//点击-号按钮
 			else if (type === 'minus') {
 				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
 			}
 		});		
 		//加入购物车按钮
  		$(document).on('click', '.cart-add', function(){
  			//商品加入购物车(三个参数：商品id和数量，响应成功方法，响应失败方法)
  			_cart.addToCart({
  				productId : _this.data.productId,
  				count 	  : $('.p-count').val()
  			}, function(res){
  				window.location.href = 'result.html?type=cart-add';
  			},function(errMsg){
  				_store.errorTips(errMsg);
  			})
  		});
    },
	//加载商品详情
	loadDetail : function(){
		var _this 		= this,
			html 		= '',
			$pageWrap 	= $('.page-wrap');
		//loading
		$pageWrap.html('<div class="loading"></div>');
		//获取商品详细信息(三个参数：商品id，响应成功方法，响应失败方法)
		_product.getProductDetail(this.data.productId, function(res){
			_this.filter(res);
			//缓存detail的数据
			_this.data.detailInfo = res;
			//渲染Html页面
			html = _store.renderHtml(templateIndex, res);
			$('.page-wrap').html(html);
		}, function(errMsg){
			$('.page-wrap').html('<p class="err-tip">此商品可能已经下架，无法添加到购物车</p>');
		})
	},
	//数据匹配
	filter : function(data){
		data.subImages = data.subImages.split(',');
	}
};

$(function(){
    page.init();
});
/*
* @Author: SongShuhang
* @Date:   2020-05-18 10:26:35
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-18 19:31:26
*/

require('./index.css');
require('page/common/header/index.js');
var _store          = require('util/store.js');
var nav 			= require('page/common/nav/index.js');
var _cart        	= require('service/cart-service.js');
var templateIndex   = require('./index.string');

//页面逻辑
var page = {
	data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	//加载购物车详情
    	this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        //商品的选择  /  取消选择
 		$(document).on('click', '.cart-select', function(){
 			var $this = $(this),
 				productId = $this.parents('.cart-table').data('product-id');
 			//切换到选中状态(三个参数：商品id，响应成功方法，响应失败方法)
 			if ($this.is(':checked')) {
 				_cart.selectProduct(productId, function(res){
 					_this.renderCart(res);
 				},function(errMsg){
 					_this.showCartError();
 				});
 			} 
 			//取消选中状态(三个参数：商品id，响应成功方法，响应失败方法)
 			else{
 				_cart.unselectProduct(productId, function(res){
 					_this.renderCart(res);
 				},function(errMsg){
 					_this.showCartError();
 				});
 			}
 		});
        //商品的全选  /  取消全选
 		$(document).on('click', '.cart-select-all', function(){
 			var $this = $(this);
 			//切换到全选状态(两个参数：响应成功方法，响应失败方法)
 			if ($this.is(':checked')) {
 				_cart.selectAllProduct(function(res){
 					_this.renderCart(res);
 				},function(errMsg){
 					_this.showCartError();
 				});
 			} 
 			//取消全选状态(两个参数：响应成功方法，响应失败方法)
 			else{
 				_cart.unselectAllProduct(function(res){
 					_this.renderCart(res);
 				},function(errMsg){
 					_this.showCartError();
 				});
 			}
 		});
 		//商品数量的变化
 		$(document).on('click', '.count-btn', function(){
 			var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if (type === 'plus') {
            	if (currCount >= maxCount) {
            		_store.errorTips('该商品达到上限');
            		return;
            	}
            	newCount = currCount + 1;
            } else if (type === 'minus') {
            	if (currCount <= minCount) {
            		return;
            	}
            	newCount = currCount - 1;
            }
            //更新购物车商品数量(三个参数：商品id和新数量，响应成功方法，响应失败方法)
            _cart.updateProduct({
            	productId 	: productId,
            	count 		: newCount
            }, function(res){
            	_this.renderCart(res);
            }, function(errMsg){
            	_this.showCartError();
            });
 		});
 		//删除单个商品
 		$(document).on('click', '.cart-delete', function(){
 			if (window.confirm('确认要删除该商品？')) {
 				var productId = $(this).parents('.cart-table').data('product-id');
 				_this.deleteCartProduct(productId);
 			}
 		});
 		//删除选中商品
 		$(document).on('click', '.delete-selected', function(){
 			if (window.confirm('确认要删除选中商品？')) {
 				var arrProductIds = [],
 					$selectedItem = $('.cart-select:checked');
 				//循环查找选中的productIds
 				for (var i = 0, iLength = $selectedItem.length; i < iLength; i++){
 					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
 				} 
 				if (arrProductIds.length) {
 					//join方法是将数组拼接成一个用','分割的字符串
 					_this.deleteCartProduct(arrProductIds.join(','));
 				}
 				else{
 					_store.errorTips('你还没有选中要删除的商品');
 				}
 			}
 		});
 		//去结算按钮事件
 		$(document).on('click', '.btn-submit', function(){
 			//总价大于0，就进行提交
 			if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
 				window.location.href = './confirm.html'
 			} else {
 				_store.errorTips('请选择商品之后再提交');
 			}
 		});
    },
	//加载购物车详情信息
	loadCart : function(){
		var _this 		= this;
		//获取购物车列表(两个参数：响应成功方法，响应失败方法)
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});
	},
	//渲染购物车页面
	renderCart : function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成HTML
		var cartHtml = _store.renderHtml(templateIndex, data);
		$('.page-wrap').html(cartHtml);
		//通知导航的购物车更新数量
		nav.loadCartCount();
	},
	//数据匹配
	filter : function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	//删除指定商品，支持批量删除，需将productId用逗号分割
	deleteCartProduct : function(productIds){
		var _this = this;
		//删除购物车中的商品(三个参数：商品id，响应成功方法，响应失败方法)
		_cart.deleteProduct(productIds, function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		});
	},
	//显示错误信息
	showCartError : function(){
		$('.page-wrap').html('<p class="err-tip">哪里不太对，刷新一下试试</p>');
	}
};

$(function(){
    page.init();
});
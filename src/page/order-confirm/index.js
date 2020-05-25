/*
* @Author: SongShuhang
* @Date:   2020-05-24 09:26:44
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 10:05:24
*/
require('./index.css');
require('page/common/header/index.js');
var _store          	= require('util/store.js');
var nav 				= require('page/common/nav/index.js');
var _order        		= require('service/order-service.js');
var _address       		= require('service/address-service.js');
var addressModal       	= require('./address-modal.js');
var templateAddress   	= require('./address-list.string');
var templateProduct   	= require('./product-list.string');

//页面逻辑
var page = {
	data : {
		selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	//加载地址列表
    	this.loadAddressList();
    	//加载商品清单
    	this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        //地址的选择
 		$(document).on('click', '.address-item', function(){
 			$(this).addClass('active')
 				.siblings('.address-item').removeClass('active');
 			_this.data.selectedAddressId = $(this).data('id');
 		});
        //订单的提交
 		$(document).on('click', '.order-submit', function(){
 			var shippingId = _this.data.selectedAddressId;
 			//若有地址被选中了
 			if (shippingId) {
 				//创建订单（三个参数：地址id，响应成功方法，响应失败方法）
 				_order.createOrder({
 					shippingId : shippingId
 				}, function(res){
 					window.location.href = './payment.html?orderNumber=' + res.orderNo;
 				}, function(errMsg){
 					_store.errorTips(errMsg);
 				});
 			} else {
 				_store.errorTips("请选择地址之后再提交");
 			}
 		});
 		//地址的添加
 		$(document).on('click', '.address-add', function(){
 			addressModal.show({
 				isUpdate 	: false,
 				onSuccess 	: function(){
 					_this.loadAddressList();
 				} 
 			});
 		});
 		//地址的编辑
 		$(document).on('click', '.address-update', function(e){
 			//停止让事件往上冒泡
 			e.stopPropagation();
 			var shippingId = $(this).parents('.address-item').data('id');
 			//获取要编辑地址的详细信息（三个参数：地址id，响应成功方法，响应失败方法）
 			_address.getAddress(shippingId, function(res){
	 			addressModal.show({
	 				isUpdate 	: true,
	 				data		: res,
	 				onSuccess 	: function(){
	 					_this.loadAddressList();
	 				} 
	 			});
 			}, function(errMsg){
 				_store.errorTips(errMsg);
 			});
 		});
 		//地址的删除
 		$(document).on('click', '.address-delete', function(e){
 			//停止让事件往上冒泡
 			e.stopPropagation();
 			var shippingId = $(this).parents('.address-item').data('id');
 			if (window.confirm('确认要删除这个地址吗?')) {
 				//删除地址（三个参数：地址id，响应成功方法，响应失败方法）
				_address.deleteAddress(shippingId, function(res){
					_this.loadAddressList();
				}, function(errMsg){
					_store.errorTips(errMsg);
				}); 				
 			}
 		});
    },
	//加载地址列表
	loadAddressList : function(){
		var _this 		= this;
		$('.address-con').html('<div class="loading"></div>');
		//获取地址列表(两个参数：响应成功方法，响应失败方法)
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var addressListHtml = _store.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		},function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
		});
	},
	//处理地址列表的选中状态
	addressFilter : function(data){
		if (this.data.selectedAddressId) {
			var selectedAddressIdFlag = false;
			for (var i = 0, length = data.list.length; i < length; i++) {
				if (data.list[i].id === this.data.selectedAddressId) {
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			};
			//如果以前选中的地址不在列表中，则将其删除
			if (!selectedAddressIdFlag) {
				this.data.selectedAddressId = null;
			}
		}
	},
	//加载商品清单
	loadProductList : function(){
		var _this 		= this;
		$('.product-con').html('<div class="loading"></div>');
		//获取地址列表(两个参数：响应成功方法，响应失败方法)
		_order.getProductList(function(res){
			var productListHtml = _store.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		},function(errMsg){
			$('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
		});
	},
};

$(function(){
    page.init();
});
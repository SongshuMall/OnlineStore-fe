/*
* @Author: SongShuhang
* @Date:   2020-05-25 21:11:23
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 22:00:25
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _store 			= require('util/store.js');
var _payment        = require('service/payment-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
	data : {
		orderNumber : _store.getUrlParam('orderNumber')
	},
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        //加载订单支付信息
    	this.loadPaymentInfo();
    },
    //加载订单支付信息
    loadPaymentInfo : function(){
    	var _this 			= this,
    		pyamentHtml 	= '',
    		$pageWrap		= $('.page-wrap');
    	$pageWrap.html('<div class="loading"></div>');
    	//获取订单支付信息（三个参数：订单号，响应成功方法，响应失败方法）
    	_payment.getPaymentInfo(this.data.orderNumber, function(res){
    		//渲染订单支付信息页的html页面
    		pyamentHtml = _store.renderHtml(templateIndex, res);
    		$pageWrap.html(pyamentHtml);
    		//监听订单状态
    		_this.listenOrderStatus();
    	}, function(errMsg){
    		$pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
    	});
    },
    //监听订单状态
    listenOrderStatus : function(){
    	var _this = this;
    	//设置每五秒检查一次订单状态
    	this.paymentTimer = window.setInterval(function(){
    		//检查订单支付状态（三个参数：订单号，响应成功方法，响应失败方法）
    		_payment.getPaymentStatus(_this.data.orderNumber, function(res){
    			if (res == true) {
    				window.location.href = 
    					'./result.html?type=payment&orderNumber=' + _this.data.orderNumber;
    			}
    		});
    	}, 5e3);
    }
};

$(function(){
    page.init();
});
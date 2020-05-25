/*
* @Author: SongShuhang
* @Date:   2020-05-25 15:33:01
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 16:44:15
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _store 			= require('util/store.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
	data : {
		orderNumber : _store.getUrlParam('orderNumber')
	},
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        //加载订单详情
    	this.loadDetail();
    },
    //事件处理
    bindEvent : function(){
    	var _this = this;
    	//取消订单按钮的点击事件
    	$(document).on('click', '.order-cancel', function(){
    		if (window.confirm('确认要取消该订单吗？')) {
	    		_order.cancelOrder(_this.data.orderNumber, function(res){
	    			_store.successTips('该订单取消成功');
	    			_this.loadDetail();
	    		}, function(errMsg){
	    			_store.errorTips(errMsg);
	    		});
    		}
    	});
    },
    //加载订单详情
    loadDetail : function(){
    	var _this 			= this,
    		orderDetailHtml = '',
    		$content		= $('.content');
    	$content.html('<div class="loading"></div>');
    	//获取订单列表（三个参数：分页信息，响应成功方法，响应失败方法）
    	_order.getOrderDetail(this.data.orderNumber, function(res){
    		_this.dataFilter(res);
    		//渲染订单列表的html页面
    		orderDetailHtml = _store.renderHtml(templateIndex, res);
    		$content.html(orderDetailHtml);
    	}, function(errMsg){
    		$listCon.html('<p class="err-tip">'+ errMsg +'</p>');
    	});
    },
    //数据的适配
    dataFilter : function(data){
    	data.needPay 		= data.status == 10;
    	data.isCancelable 	= data.status == 10;
    }
};

$(function(){
    page.init();
});
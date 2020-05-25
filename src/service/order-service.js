/*
* @Author: SongShuhang
* @Date:   2020-05-24 09:55:35
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 16:42:29
*/
var _store = require('util/store.js');

var _order = {
    // 获取商品清单
    getProductList : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    //提交订单
    createOrder : function(orderInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/order/create.do'),
            data	: orderInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    //获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;
/*
* @Author: SongShuhang
* @Date:   2020-05-25 21:13:41
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 21:43:52
*/

var _store = require('util/store.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo : function(orderNumber, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/order/pay.do'),
            data    : {
            	orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 查询支付信息
    getPaymentStatus : function(orderNumber, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
            	orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;
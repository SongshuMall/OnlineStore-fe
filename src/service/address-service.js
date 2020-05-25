/*
* @Author: SongShuhang
* @Date:   2020-05-24 11:25:37
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 09:51:00
*/
var _store = require('util/store.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/shipping/list.do'),
            data	: {
            	pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取某个收货地址详细信息
    getAddress : function(shippingId, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/shipping/select.do'),
            data	: {
            	shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    //新增收货地址
    save : function(addressInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/shipping/add.do'),
            data	: addressInfo,
            success : resolve,
            error   : reject
        });
    },
    //更新收货地址信息
    updateAddress : function(addressInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/shipping/update.do'),
            data	: addressInfo,
            success : resolve,
            error   : reject
        });
    },
    //删除收货地址
    deleteAddress : function(shippingId, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/shipping/delete.do'),
            data	: {
            	shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _address;
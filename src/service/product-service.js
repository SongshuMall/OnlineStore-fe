/*
* @Author: SongShuhang
* @Date:   2020-05-16 10:19:56
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-16 14:56:50
*/

var _store = require('util/store.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;
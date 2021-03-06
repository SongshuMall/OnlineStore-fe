/*
* @Author: SongShuhang
* @Date:   2020-05-17 08:25:40
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-18 19:01:19
*/

var _store = require('util/store.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
	// 获取购物车列表
    getCartList : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteProduct : function(productIds, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量
    updateProduct : function(productInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 选中购物车商品
    selectProduct : function(productId, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选中购物车商品
    unselectProduct : function(productId, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 全选购物车商品
    selectAllProduct : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消全选购物车商品
    unselectAllProduct : function(resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _cart;
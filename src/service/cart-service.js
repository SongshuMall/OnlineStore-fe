/*
* @Author: SongShuhang
* @Date:   2020-05-17 08:25:40
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-17 10:45:15
*/

var _store = require('util/store.js');

var _cart = {
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _store.request({
            url     : _store.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _cart;
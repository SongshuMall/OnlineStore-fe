/*
* @Author: SongShuhang
* @Date:   2020-05-16 10:16:42
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-17 08:30:06
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _store          = require('util/store.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

//页面逻辑
var page = {
    data : {
        listParam : {
        	/* 关键字 */
            keyword         : _store.getUrlParam('keyword')    || '',
            /* 商品分类ID */
            categoryId      : _store.getUrlParam('categoryId') || '',
            /* 排序规则 */
            orderBy         : _store.getUrlParam('orderBy')    || 'default',
            /* 页码 */
            pageNum         : _store.getUrlParam('pageNum')    || 1,
            /* 每页数据大小 */
            pageSize        : _store.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
	//加载list数据
	loadList : function(){
		var _this 		= this,
			listHtml 	= '',
			listParam 	= _this.data.listParam,
			$pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
		//获取商品列表(三个参数：商品分页信息，响应成功方法，响应失败方法)
        _product.getProductList(listParam, function(res){
            listHtml = _store.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);
            //加载分页信息
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            _store.errorTips(errMsg);
        });
	},
	//加载分页信息
	loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                /* 重新加载list页面信息 */
                _this.loadList();
            }
        }));		
	}
};

$(function(){
    page.init();
});
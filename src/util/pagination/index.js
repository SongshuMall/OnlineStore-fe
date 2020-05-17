/*
* @Author: SongShuhang
* @Date:   2020-05-16 14:53:08
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-16 17:22:43
*/
require('./index.css');
var _store                 = require('util/store.js');
var templatePagination  = require('./index.string');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        /* 分页按钮页码的个数（已经选定的按钮不包括）*/
        pageRange       : 4,
        onSelectPage    : null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        //判断onSelectPage是不是一个事件，若是则将按钮的值（页码号）传入方法
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],
        /* 设置第一个页码的数字 */
        start       = option.pageNum - option.pageRange > 0 
            ? option.pageNum - option.pageRange : 1,
        /* 设置最后一个页码的数字 */
        end         = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !this.option.hasPreviousPage
    });
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    /* 渲染分页模块的HTML的代码 */
    html = _store.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return html;
};

module.exports = Pagination;
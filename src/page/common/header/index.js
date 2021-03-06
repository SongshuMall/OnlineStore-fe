/*
* @Author: SongShuhang
* @Date:   2020-05-13 08:36:13
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-16 10:25:14
*/

require('./index.css');

var _store = require('util/store.js');
//通用页面头部
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _store.getUrlParam('keyword');
		//keyword存在，则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			//13是回车键的keyCode
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	//搜索框的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交的时候有keyword，正常跳转到list页面
		if (keyword) {
			window.location.href = './list.html?keyword='+keyword;
		}
		//如果keyword为空，直接返回首页
		else {
			_store.goHome();
		}
	}

};

header.init();
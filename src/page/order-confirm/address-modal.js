/*
* @Author: SongShuhang
* @Date:   2020-05-24 15:53:12
* @Last Modified by:   SongShuhang
* @Last Modified time: 2020-05-25 09:39:21
*/
var _store          		= require('util/store.js');
var _cities       			= require('util/cities/index.js');
var _address       			= require('service/address-service.js');
var templateAddressModal	= require('./address-modal.string');

//新增和修改地址的弹窗的页面逻辑
var addressModal = {
	show : function(option){
		//option的绑定
		this.option 		= option;
		this.option.data 	= option.data || {};
		this.$modalWrap 	= $('.modal-wrap');
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	//绑定事件
	bindEvent : function(){
		var _this = this;
		//省份选择框的改变事件(省份和城市的二级联动)
		this.$modalWrap.find('#receiver-province').change(function(){
			var selectedProvince = $(this).val();
			_this.loadCities(selectedProvince);
		});
		//提交收货地址
		this.$modalWrap.find('.address-btn').click(function(){
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate	 = _this.option.isUpdate;
			//新增收货地址并且验证通过
			if (!isUpdate && receiverInfo.status) {
				//保存新的收货地址(三个参数：收货地址数据，响应成功方法，响应失败方法)
				_address.save(receiverInfo.data, function(res){
					_store.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' 
						&& _this.option.onSuccess(res);
				}, function(errMsg){
					_store.errorTips(errMsg);
				});
			}
			//更新收货地址并且验证通过
			else if (isUpdate && receiverInfo.status) {
				_address.updateAddress(receiverInfo.data, function(res){
					_store.successTips('地址修改成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' 
						&& _this.option.onSuccess(res);
				}, function(errMsg){
					_store.errorTips(errMsg);
				});
			}
			//验证不通过
			else {
				_store.errorTips(receiverInfo.errMsg || '系统君发了一下呆，请刷新一下吧');
			}
		});
		//设置当点击modal内容区域的时候不会关闭弹窗
		this.$modalWrap.find('.modal-container').click(function(e){
			e.stopPropagation();
		});
		//点击右上角×号或者蒙版区域，关闭弹窗
		this.$modalWrap.find('.close').click(function(){
			_this.hide();
		});

	},
	//渲染页面
	loadModal : function(){
		var addressModalHtml = _store.renderHtml(templateAddressModal, {
			isUpdate : this.option.isUpdate,
			data 	 : this.option.data
		});
		this.$modalWrap.html(addressModalHtml);
		//加载省份
		this.loadProvince();
	},
	//加载省份
	loadProvince : function(){
		var provinces = _cities.getProvinces() || [],
			$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));
		//若是更新操作并且省份信息有值，此时做省份的回填
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			//加载城市
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	//加载城市
	loadCities : function(provinceName){
		var cities 		= _cities.getCities(provinceName) || [],
			$citySelect = this.$modalWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOption(cities));
		//若是更新操作并且城市信息有值，此时做城市的回填
		if(this.option.isUpdate && this.option.data.receiverCity){
			$citySelect.val(this.option.data.receiverCity);
		}
	},
	//获取表单里的收件人信息，并且做表单验证
	getReceiverInfo : function(){
		var receiverInfo = {},
			result		 = {
				status  :  false
			};
		receiverInfo.receiverName 		= $.trim(this.$modalWrap.find('#receiver-name').val());
		receiverInfo.receiverProvince 	= this.$modalWrap.find('#receiver-province').val();
		receiverInfo.receiverCity 		= this.$modalWrap.find('#receiver-city').val();
		receiverInfo.receiverAddress 	= $.trim(this.$modalWrap.find('#receiver-address').val());
		receiverInfo.receiverPhone 		= $.trim(this.$modalWrap.find('#receiver-phone').val());
		receiverInfo.receiverZip 		= $.trim(this.$modalWrap.find('#receiver-zip').val());
		//若是更新操作，则需要传递id
		if (this.option.isUpdate) {
			receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
		}
		//验证字段
		if (!receiverInfo.receiverName) {
			result.errMsg = '请输入收件人姓名';
		} else if (!receiverInfo.receiverProvince) {
			result.errMsg = '请选择收件人所在省份';
		} else if (!receiverInfo.receiverCity) {
			result.errMsg = '请选择收件人所在城市';
		} else if (!receiverInfo.receiverAddress) {
			result.errMsg = '请输入详细地址，并精确到门牌号';
		} else if (!receiverInfo.receiverPhone) {
			result.errMsg = '请输入收件人电话';
		} else if (!_store.validate(receiverInfo.receiverPhone, 'phone')) {
			result.errMsg = '手机格式不正确';
		}
		//所有验证都通过了
		else {
			result.status 	= true;
			result.data 	= receiverInfo; 
		}
		return result;
	},
	//获取select框的选项，输入array，输出HTML
	getSelectOption : function(optionArray){
		var html = '<option value="">请选择</option>';
		for(var i = 0, length = optionArray.length; i < length; i++){
			html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>';
		}
		return html;
	},
	//关闭弹窗
	hide : function(){
		this.$modalWrap.empty();
	}
};

module.exports = addressModal;
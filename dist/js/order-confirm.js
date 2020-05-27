webpackJsonp([3],{0:function(e,r,t){e.exports=t(66)},2:function(e,r,t){var s=t(1),i={login:function(e,r,t){s.request({url:s.getServerUrl("/user/login.do"),data:e,method:"POST",success:r,error:t})},checkUsername:function(e,r,t){s.request({url:s.getServerUrl("/user/check_valid.do"),data:{type:"username",str:e},method:"POST",success:r,error:t})},getQuestion:function(e,r,t){s.request({url:s.getServerUrl("/user/forget_get_question.do"),data:{username:e},method:"POST",success:r,error:t})},checkAnswer:function(e,r,t){s.request({url:s.getServerUrl("/user/forget_check_answer.do"),data:e,method:"POST",success:r,error:t})},resetPassword:function(e,r,t){s.request({url:s.getServerUrl("/user/forget_reset_password.do"),data:e,method:"POST",success:r,error:t})},register:function(e,r,t){s.request({url:s.getServerUrl("/user/register.do"),data:e,method:"POST",success:r,error:t})},getUserInfo:function(e,r){s.request({url:s.getServerUrl("/user/get_information.do"),method:"POST",success:e,error:r})},updateUserInfo:function(e,r,t){s.request({url:s.getServerUrl("/user/update_information.do"),data:e,method:"POST",success:r,error:t})},updatePassword:function(e,r,t){s.request({url:s.getServerUrl("/user/reset_password.do"),data:e,method:"POST",success:r,error:t})},checkLogin:function(e,r){s.request({url:s.getServerUrl("/user/get_user_info.do"),method:"POST",success:e,error:r})},logout:function(e,r){s.request({url:s.getServerUrl("/user/logout.do"),method:"POST",success:e,error:r})}};e.exports=i},3:function(e,r,t){var s=t(1),i={getCartCount:function(e,r){s.request({url:s.getServerUrl("/cart/get_cart_product_count.do"),success:e,error:r})},getCartList:function(e,r){s.request({url:s.getServerUrl("/cart/list.do"),success:e,error:r})},addToCart:function(e,r,t){s.request({url:s.getServerUrl("/cart/add.do"),data:e,success:r,error:t})},deleteProduct:function(e,r,t){s.request({url:s.getServerUrl("/cart/delete_product.do"),data:{productIds:e},success:r,error:t})},updateProduct:function(e,r,t){s.request({url:s.getServerUrl("/cart/update.do"),data:e,success:r,error:t})},selectProduct:function(e,r,t){s.request({url:s.getServerUrl("/cart/select.do"),data:{productId:e},success:r,error:t})},unselectProduct:function(e,r,t){s.request({url:s.getServerUrl("/cart/un_select.do"),data:{productId:e},success:r,error:t})},selectAllProduct:function(e,r){s.request({url:s.getServerUrl("/cart/select_all.do"),success:e,error:r})},unselectAllProduct:function(e,r){s.request({url:s.getServerUrl("/cart/un_select_all.do"),success:e,error:r})}};e.exports=i},4:function(e,r){},5:function(e,r){},6:function(e,r,t){t(4);var s=t(1),i={init:function(){this.onLoad(),this.bindEvent()},onLoad:function(){var e=s.getUrlParam("keyword");e&&$("#search-input").val(e)},bindEvent:function(){var e=this;$("#search-btn").click(function(){e.searchSubmit()}),$("#search-input").keyup(function(r){13===r.keyCode&&e.searchSubmit()})},searchSubmit:function(){var e=$.trim($("#search-input").val());e?window.location.href="./list.html?keyword="+e:s.goHome()}};i.init()},7:function(e,r,t){t(5);var s=t(1),i=t(2),o=t(3),a={init:function(){return this.bindEvent(),this.loadUserInfo(),this.loadCartCount(),this},bindEvent:function(){$(".js-login").click(function(){s.doLogin()}),$(".js-register").click(function(){window.location.href="./user-register.html"}),$(".js-logout").click(function(){i.logout(function(e){window.location.href="./user-login.html"},function(e){s.errorTips(e)})})},loadUserInfo:function(){i.checkLogin(function(e){$(".user.not-login").hide().siblings(".user.login").show().find(".username").text(e.username)},function(e){})},loadCartCount:function(){o.getCartCount(function(e){$(".nav .cart-count").text(e||0)},function(e){$(".nav .cart-count").text(0)})}};e.exports=a.init()},13:function(e,r,t){var s=t(1),i={getProductList:function(e,r){s.request({url:s.getServerUrl("/order/get_order_cart_product.do"),success:e,error:r})},createOrder:function(e,r,t){s.request({url:s.getServerUrl("/order/create.do"),data:e,success:r,error:t})},getOrderList:function(e,r,t){s.request({url:s.getServerUrl("/order/list.do"),data:e,success:r,error:t})},getOrderDetail:function(e,r,t){s.request({url:s.getServerUrl("/order/detail.do"),data:{orderNo:e},success:r,error:t})},cancelOrder:function(e,r,t){s.request({url:s.getServerUrl("/order/cancel.do"),data:{orderNo:e},success:r,error:t})}};e.exports=i},18:function(e,r,t){var s=t(1),i={getAddressList:function(e,r){s.request({url:s.getServerUrl("/shipping/list.do"),data:{pageSize:50},success:e,error:r})},getAddress:function(e,r,t){s.request({url:s.getServerUrl("/shipping/select.do"),data:{shippingId:e},success:r,error:t})},save:function(e,r,t){s.request({url:s.getServerUrl("/shipping/add.do"),data:e,success:r,error:t})},updateAddress:function(e,r,t){s.request({url:s.getServerUrl("/shipping/update.do"),data:e,success:r,error:t})},deleteAddress:function(e,r,t){s.request({url:s.getServerUrl("/shipping/delete.do"),data:{shippingId:e},success:r,error:t})}};e.exports=i},27:function(e,r){},46:function(e,r){e.exports='{{#list}} {{#isActive}} <div class="address-item active" data-id="{{id}}"> {{/isActive}} {{^isActive}} <div class="address-item" data-id="{{id}}"> {{/isActive}} <div class="address-title"> {{receiverProvince}} {{receiverCity}}&nbsp;（ {{receiverName}}&nbsp; 收 ） </div> <div class="address-detail"> {{receiverAddress}} &nbsp; {{receiverPhone}} </div> <div class="address-opera"> <span class="link address-update">编辑</span> <span class="link address-delete">删除</span> </div> </div> {{/list}} <div class="address-add"> <div class="address-new"> <i class="fa fa-plus"></i> <div class="text">使用新地址</div> </div> </div></div>'},47:function(e,r){e.exports='<div class="modal close"> <div class="modal-container"> <div class="modal-header"> {{#isUpdate}} <h1 class="modal-title">更新地址</h1> {{/isUpdate}} {{^isUpdate}} <h1 class="modal-title">使用新地址</h1> {{/isUpdate}} <i class="fa fa-close close"></i> </div> <div class="modal-body"> <div class="form"> <div class="form-line"> <label for="receiver-name" class="label"> <span class="required">*</span> 收件人姓名： </label> <input type="text" class="form-item" id="receiver-name" value="{{data.receiverName}}" placeholder="请输入收件人姓名"/> </div> <div class="form-line"> <label for="receiver-province" class="label"> <span class="required">*</span> 所在城市： </label> <select id="receiver-province" class="form-item cityOption"> <option value="">请选择</option> </select> <select id="receiver-city" class="form-item cityOption"> <option value="">请选择</option> </select> </div> <div class="form-line"> <label for="receiver-address" class="label"> <span class="required">*</span> 详细地址： </label> <input type="text" class="form-item" id="receiver-address" value="{{data.receiverAddress}}" placeholder="请精确到门牌号"/> </div> <div class="form-line"> <label for="receiver-phone" class="label"> <span class="required">*</span> 收件人手机： </label> <input type="tel" class="form-item" id="receiver-phone" value="{{data.receiverPhone}}" placeholder="请输入11位手机号"/> </div> <div class="form-line"> <label for="receiver-zip" class="label">邮政编码：</label> <input type="tel" class="form-item" id="receiver-zip" placeholder="如：425600" value="{{data.receiverZip}}"/> </div> <div class="form-line"> <input type="hidden" value="{{data.id}}" id="receiver-id"/> <a class="btn address-btn">保存收货地址</a> </div> </div> </div> </div> </div>'},48:function(e,r){e.exports='<table class="product-table"> <tr> <th class="cell-img">&nbsp;</th> <th class="cell-info">商品描述</th> <th class="cell-price">价格</th> <th class="cell-count">数量</th> <th class="cell-total">小计</th> </tr> {{#orderItemVoList}} <tr> <td class="cell-img"> <a href="./detail.html?productId={{productId}}" target="_blank"> <img src="{{imageHost}}{{productImage}}" alt="{{productName}}" class="p-img"> </a> </td> <td class="cell-info"> <a href="./detail.html?productId={{productId}}" target="_blank" class="link">{{productName}}</a> </td> <td class="cell-price">￥{{currentUnitPrice}}</td> <td class="cell-count">{{quantity}}</td> <td class="cell-total">￥{{totalPrice}}</td> </tr> {{/orderItemVoList}} </table> <div class="submit-con"> <span>订单总价: </span> <span class="submit-total">￥{{productTotalPrice}}</span> <span class="btn order-submit">提交订单</span> </div>'},65:function(e,r,t){var s=t(1),i=t(78),o=t(18),a=t(47),c={show:function(e){this.option=e,this.option.data=e.data||{},this.$modalWrap=$(".modal-wrap"),this.loadModal(),this.bindEvent()},bindEvent:function(){var e=this;this.$modalWrap.find("#receiver-province").change(function(){var r=$(this).val();e.loadCities(r)}),this.$modalWrap.find(".address-btn").click(function(){var r=e.getReceiverInfo(),t=e.option.isUpdate;!t&&r.status?o.save(r.data,function(r){s.successTips("地址添加成功"),e.hide(),"function"==typeof e.option.onSuccess&&e.option.onSuccess(r)},function(e){s.errorTips(e)}):t&&r.status?o.updateAddress(r.data,function(r){s.successTips("地址修改成功"),e.hide(),"function"==typeof e.option.onSuccess&&e.option.onSuccess(r)},function(e){s.errorTips(e)}):s.errorTips(r.errMsg||"系统君发了一下呆，请刷新一下吧")}),this.$modalWrap.find(".modal-container").click(function(e){e.stopPropagation()}),this.$modalWrap.find(".close").click(function(){e.hide()})},loadModal:function(){var e=s.renderHtml(a,{isUpdate:this.option.isUpdate,data:this.option.data});this.$modalWrap.html(e),this.loadProvince()},loadProvince:function(){var e=i.getProvinces()||[],r=this.$modalWrap.find("#receiver-province");r.html(this.getSelectOption(e)),this.option.isUpdate&&this.option.data.receiverProvince&&(r.val(this.option.data.receiverProvince),this.loadCities(this.option.data.receiverProvince))},loadCities:function(e){var r=i.getCities(e)||[],t=this.$modalWrap.find("#receiver-city");t.html(this.getSelectOption(r)),this.option.isUpdate&&this.option.data.receiverCity&&t.val(this.option.data.receiverCity)},getReceiverInfo:function(){var e={},r={status:!1};return e.receiverName=$.trim(this.$modalWrap.find("#receiver-name").val()),e.receiverProvince=this.$modalWrap.find("#receiver-province").val(),e.receiverCity=this.$modalWrap.find("#receiver-city").val(),e.receiverAddress=$.trim(this.$modalWrap.find("#receiver-address").val()),e.receiverPhone=$.trim(this.$modalWrap.find("#receiver-phone").val()),e.receiverZip=$.trim(this.$modalWrap.find("#receiver-zip").val()),this.option.isUpdate&&(e.id=this.$modalWrap.find("#receiver-id").val()),e.receiverName?e.receiverProvince?e.receiverCity?e.receiverAddress?e.receiverPhone?s.validate(e.receiverPhone,"phone")?(r.status=!0,r.data=e):r.errMsg="手机格式不正确":r.errMsg="请输入收件人电话":r.errMsg="请输入详细地址，并精确到门牌号":r.errMsg="请选择收件人所在城市":r.errMsg="请选择收件人所在省份":r.errMsg="请输入收件人姓名",r},getSelectOption:function(e){for(var r='<option value="">请选择</option>',t=0,s=e.length;t<s;t++)r+='<option value="'+e[t]+'">'+e[t]+"</option>";return r},hide:function(){this.$modalWrap.empty()}};e.exports=c},66:function(e,r,t){t(27),t(6);var s=t(1),i=(t(7),t(13)),o=t(18),a=t(65),c=t(46),d=t(48),n={data:{selectedAddressId:null},init:function(){this.onLoad(),this.bindEvent()},onLoad:function(){this.loadAddressList(),this.loadProductList()},bindEvent:function(){var e=this;$(document).on("click",".address-item",function(){$(this).addClass("active").siblings(".address-item").removeClass("active"),e.data.selectedAddressId=$(this).data("id")}),$(document).on("click",".order-submit",function(){var r=e.data.selectedAddressId;r?i.createOrder({shippingId:r},function(e){window.location.href="./payment.html?orderNumber="+e.orderNo},function(e){s.errorTips(e)}):s.errorTips("请选择地址之后再提交")}),$(document).on("click",".address-add",function(){a.show({isUpdate:!1,onSuccess:function(){e.loadAddressList()}})}),$(document).on("click",".address-update",function(r){r.stopPropagation();var t=$(this).parents(".address-item").data("id");o.getAddress(t,function(r){a.show({isUpdate:!0,data:r,onSuccess:function(){e.loadAddressList()}})},function(e){s.errorTips(e)})}),$(document).on("click",".address-delete",function(r){r.stopPropagation();var t=$(this).parents(".address-item").data("id");window.confirm("确认要删除这个地址吗?")&&o.deleteAddress(t,function(r){e.loadAddressList()},function(e){s.errorTips(e)})})},loadAddressList:function(){var e=this;$(".address-con").html('<div class="loading"></div>'),o.getAddressList(function(r){e.addressFilter(r);var t=s.renderHtml(c,r);$(".address-con").html(t)},function(e){$(".address-con").html('<p class="err-tip">地址加载失败，请刷新后重试</p>')})},addressFilter:function(e){if(this.data.selectedAddressId){for(var r=!1,t=0,s=e.list.length;t<s;t++)e.list[t].id===this.data.selectedAddressId&&(e.list[t].isActive=!0,r=!0);r||(this.data.selectedAddressId=null)}},loadProductList:function(){$(".product-con").html('<div class="loading"></div>'),i.getProductList(function(e){var r=s.renderHtml(d,e);$(".product-con").html(r)},function(e){$(".product-con").html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>')})}};$(function(){n.init()})},78:function(e,r){var t={cityInfo:{"北京":["东城","西城","朝阳","丰台","石景山","海淀","门头沟","房山","通州","顺义","昌平","大兴","平谷","怀柔","密云","延庆"],"上海":["崇明","黄浦","卢湾","徐汇","长宁","静安","普陀","闸北","虹口","杨浦","闵行","宝山","嘉定","浦东","金山","松江","青浦","南汇","奉贤"],"广东省":["广州","深圳","珠海","东莞","中山","佛山","惠州","河源","潮州","江门","揭阳","茂名","梅州","清远","汕头","汕尾","韶关","顺德","阳江","云浮","湛江","肇庆"],"江苏省":["南京","常熟","常州","海门","淮安","江都","江阴","昆山","连云港","南通","启东","沭阳","宿迁","苏州","太仓","泰州","同里","无锡","徐州","盐城","宜兴","仪征","张家港","镇江","周庄"],"浙江省":["杭州","安吉","慈溪","定海","奉化","海盐","黄岩","湖州","嘉兴","金华","临安","临海","丽水","宁波","瓯海","平湖","千岛湖","衢州","江山","瑞安","绍兴","嵊州","台州","温岭","温州","余姚","舟山"],"重庆":["万州","涪陵","渝中","大渡口","江北","沙坪坝","九龙坡","南岸","北碚","万盛","双桥","渝北","巴南","黔江","长寿","綦江","潼南","铜梁","大足","荣昌","璧山","梁平","城口","丰都","垫江","武隆","忠县","开县","云阳","奉节","巫山","巫溪","石柱","秀山","酉阳","彭水","江津","合川","永川","南川"],"安徽省":["合肥","安庆","蚌埠","亳州","巢湖","滁州","阜阳","贵池","淮北","淮南","黄山","九华山","六安","马鞍山","宿州","铜陵","屯溪","芜湖","宣城"],"福建省":["福州","厦门","泉州","漳州","龙岩","南平","宁德","莆田","三明"],"甘肃省":["兰州","白银","定西","敦煌","甘南","金昌","酒泉","临夏","平凉","天水","武都","武威","西峰","张掖"],"广西省":["南宁","百色","北海","桂林","防城港","贵港","河池","贺州","柳州","钦州","梧州","玉林"],"贵州省":["贵阳","安顺","毕节","都匀","凯里","六盘水","铜仁","兴义","玉屏","遵义"],"海南省":["海口","儋县","陵水","琼海","三亚","通什","万宁"],"河北省":["石家庄","保定","北戴河","沧州","承德","丰润","邯郸","衡水","廊坊","南戴河","秦皇岛","唐山","新城","邢台","张家口"],"黑龙江省":["哈尔滨","北安","大庆","大兴安岭","鹤岗","黑河","佳木斯","鸡西","牡丹江","齐齐哈尔","七台河","双鸭山","绥化","伊春"],"河南省":["郑州","安阳","鹤壁","潢川","焦作","济源","开封","漯河","洛阳","南阳","平顶山","濮阳","三门峡","商丘","新乡","信阳","许昌","周口","驻马店"],"湖北省":["武汉","恩施","鄂州","黄冈","黄石","荆门","荆州","潜江","十堰","随州","武穴","仙桃","咸宁","襄阳","襄樊","孝感","宜昌"],"湖南省":["长沙","常德","郴州","衡阳","怀化","吉首","娄底","邵阳","湘潭","益阳","岳阳","永州","张家界","株洲"],"江西省":["南昌","抚州","赣州","吉安","景德镇","井冈山","九江","庐山","萍乡","上饶","新余","宜春","鹰潭"],"吉林省":["长春","吉林","白城","白山","珲春","辽源","梅河","四平","松原","通化","延吉"],"辽宁省":["沈阳","鞍山","本溪","朝阳","大连","丹东","抚顺","阜新","葫芦岛","锦州","辽阳","盘锦","铁岭","营口"],"内蒙古省":["呼和浩特","阿拉善盟","包头","赤峰","东胜","海拉尔","集宁","临河","通辽","乌海","乌兰浩特","锡林浩特"],"宁夏省":["银川","固源","石嘴山","吴忠"],"青海省":["西宁","德令哈","格尔木","共和","海东","海晏","玛沁","同仁","玉树"],"山东省":["济南","滨州","兖州","德州","东营","菏泽","济宁","莱芜","聊城","临沂","蓬莱","青岛","曲阜","日照","泰安","潍坊","威海","烟台","枣庄","淄博"],"山西省":["太原","长治","大同","侯马","晋城","离石","临汾","宁武","朔州","沂州","阳泉","榆次","运城"],"陕西省":["西安","安康","宝鸡","汉中","渭南","商州","绥德","铜川","咸阳","延安","榆林"],"四川省":["成都","巴中","达川","德阳","都江堰","峨眉山","涪陵","广安","广元","九寨沟","康定","乐山","泸州","马尔康","绵阳","眉山","南充","内江","攀枝花","遂宁","汶川","西昌","雅安","宜宾","自贡","资阳"],"天津":["天津","和平","东丽","河东","西青","河西","津南","南开","北辰","河北","武清","红桥","塘沽","汉沽","大港","宁河","静海","宝坻","蓟县"],"新疆省":["乌鲁木齐","阿克苏","阿勒泰","阿图什","博乐","昌吉","东山","哈密","和田","喀什","克拉玛依","库车","库尔勒","奎屯","石河子","塔城","吐鲁番","伊宁"],"西藏省":["拉萨","阿里","昌都","林芝","那曲","日喀则","山南"],"云南省":["昆明","大理","保山","楚雄","东川","个旧","景洪","开远","临沧","丽江","六库","潞西","曲靖","思茅","文山","西双版纳","玉溪","中甸","昭通"],"香港":["香港","九龙","新界"],"澳门":["澳门"],"台湾省":["台北","基隆","台南","台中","高雄","屏东","南投","云林","新竹","彰化","苗栗","嘉义","花莲","桃园","宜兰","台东","金门","马祖","澎湖"],"海外":["俄罗斯","美国","日本","英国","法国","德国","澳大利亚","东南亚","阿拉伯半岛","非洲","南美洲"]},getProvinces:function(){var e=[];for(var r in this.cityInfo)e.push(r);return e},getCities:function(e){return this.cityInfo[e]||[]}};e.exports=t}});
function getQueryString(name){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)")
	var r = window.location.search.substr(1).match(reg)
	if(r!=null){
		return decodeURI(r[2])
	}
	return null
}
//获取商品id
var id = getQueryString('goodsID');
$(function(){
	
	getDetailData(id);
	
	$('footer .foot-btn').on('touchstart',function(){
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).index()==1){
			$('section>div').eq($(this).index()).css('display','block').siblings().css('display','none');
		}else{
			
			$('section>div').eq($(this).index()).css('display','flex').siblings().css('display','none');
		}
	})
})

function getDetailData(id){
	//显示  “介绍页面数据”
	$.ajax({
		type:"get",
		url:" http://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:"jsonp",
		data:{
			goodsID:id
		},
		success:function(data){
			console.log(data[0]);
			console.log(data[0]);
			var buyNum = data[0].buynumber;
			var oldPrice = data[0].price;
			var discount = data[0].discount;
			var newPrice = parseFloat(oldPrice)*parseFloat(discount);
			var goodsName = data[0].goodsName;
			var goodsListImg = data[0].goodsListImg;
			document.getElementById('tit-r').innerHTML=`<p>
										<span>￥${newPrice}</span>
										<span>${goodsName}</span>
									</p>`;
			document.getElementById("bot").innerHTML = `<p class="bot-l">
										市场价:<span>￥${oldPrice}</span><span>${discount}折</span>
									</p>
									<p class="bot-r">
										${buyNum}人购买
									</p>`;
			document.getElementById('img-box').innerHTML=`<img src="${goodsListImg}" width="100%" />`;
			
			//获取产品参数
			var detailArr = data[0].detail.split('。');
			console.log(detailArr);
			
			
		}
	});
}

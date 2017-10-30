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
	  
	//显示内容
	getDetailData(id);
	
})

	
function getDetailData(id){
	var goodsDetail = {};
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
			//产品参数
			var detailArr = data[0].detail.split('。');
			//详情图数组
			var spImgs = JSON.parse(data[0].goodsBenUrl);
			//实拍图数组
			var xqImgs = JSON.parse(data[0].imgsUrl);
			
			goodsDetail = {
				buyNum: data[0].buynumber,
				oldPrice: data[0].price,
				discount: data[0].discount,
				newPrice: parseFloat(oldPrice)*parseFloat(discount),
				goodsName: data[0].goodsName,
				goodsListImg: data[0].goodsListImg,
				//产品参数
				detailArr: data[0].detail.split('。'),
				//详情图数组
				spImgs: JSON.parse(data[0].goodsBenUrl),
				//实拍图数组
				xqImgs: JSON.parse(data[0].imgsUrl)
			}
//			console.log(goodsDetail);
			//打开页面显示
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
				
			console.log(detailArr);
			
			
			
			$('footer .foot-btn').on('touchstart',function(){
				$(this).addClass('active').siblings().removeClass('active');
		
				if(this.id === 'xiangqing'){
					console.log('详情');
					var oDiv = document.createElement('div');
					$(oDiv).addClass('detail-con');
					$(oDiv).addClass('section2');
					$('#detail-section').empty();
					$('#detail-section').append(oDiv);
					
					//文字介绍
					$.each(detailArr, function(index) {
						var oP = document.createElement('p');
						oP.innerHTML = detailArr[index];
						$(oDiv).append(oP);
					});
					
					$.each(xqImgs, function(index) {
						console.log()
						var oDivpic = document.createElement('div');
						$(oDivpic).addClass('pic');
						oDivpic.innerHTML = `<img src="${xqImgs[index]}" width="100%" />`
						$(oDiv).append(oDivpic);
					});
					
				}else if(this.id === 'jieshao'){
					console.log('介绍');
					var oSection1Div = document.createElement('div');
					$(oSection1Div).addClass('section1');
					oSection1Div.innerHTML = `<div class="warn">
						<p>距离结束时间：01天03时34分32秒</p>
						</div>
						<div class="content">
							<div class="img" id="img-box">
								<img src="${goodsListImg}" width="100%" />
							</div>
							<div class="tit-pic">
								<div class="left"></div>
								<div class="right" id="tit-r">
									<p>
										<span>￥${newPrice}</span>
										<span>${goodsName}</span>
									</p>
								</div>
							</div>
							<div class="bot" id="bot">
								<p class="bot-l">
									市场价:<span>￥${oldPrice}</span><span>${discount}折</span>
								</p>
								<p class="bot-r">
									${buyNum}人购买
								</p>
							</div>
						</div>`;
						$('#detail-section').empty();
						$('#detail-section').append(oSection1Div);
						
				}else if(this.id === 'shipai'){
					
					console.log('实拍');
					var oSection3Div = document.createElement('div');
					$(oSection3Div).addClass('section3');
					var oSwiperDiv = document.createElement('div');
					$(oSwiperDiv).addClass('swiper-container');
					var oSwiperwrapper = document.createElement('div');
					$(oSwiperwrapper).addClass('swiper-wrapper');
					//swiper分页
					var oSwiperPag = document.createElement('div');
					$(oSwiperPag).addClass('swiper-pagination');
					$.each(spImgs,function(index){
						var oSwiperslide = $('<div class="swiper-slide" style="font-size:30px;text-indent:0.2rem">图片加载中..</div>')
						var theImg = $('<img src="'+ spImgs[index] +'" width="100%" height="100%" />') ;
						
						theImg.on('load',function(){
							$(oSwiperslide).empty();			
							$(oSwiperslide).append(theImg);
						})
						
						$(oSwiperwrapper).append(oSwiperslide);
					});
					
					$(oSwiperDiv).append(oSwiperwrapper);
					$(oSwiperDiv).append(oSwiperPag);//分页器
					$(oSection3Div).append(oSwiperDiv);
					//清空并添加
					$('#detail-section').empty();
					$('#detail-section').append(oSection3Div);
					
					//添加轮播效果
					var swiper = new Swiper('.swiper-container',{
						pagination: '.swiper-pagination',
//						loop:true
					})
				}
			});
		}
	});
	
	//根据点击底部显示不同内容
//	function getDetailSection(id,)
}

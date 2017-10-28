$(function(){
	var myScroll;
	iscroll();
	var iclassId = 1;
	
	//获取轮播图
	getBanner();
	//获取数据
    getData();
    
  	function iscroll(){
  		myScroll = new IScroll("#scroll",{
  			mouseWheel:true,
  			scrollbars:true
  		});
  	}
  	
	//点击搜索
	$('#secBtn').on('touchstart',function(){
//		console.log($('#secIpt').val());
		//用户输入了内容
		if($('#secIpt').val().length >0 || $('#secIpt').val()){
//			console.log($('#secIpt').val())
			var sectxt = $('#secIpt').val();
			//转到浏览记录，显示商品列表
			window.location.href = "16lljl.html?goods="+encodeURI(sectxt);
		}else{
//			console.log(0)
		}
	})
	
	//添加触摸下拉事件
    document.addEventListener("touchend",function(){
//    	上拉刷新
		if(myScroll.y > 0){
			//清空当前内容
			$("#M-goodsList").empty();
			//重新加载数据
			getData();
		}

		//下拉加载更多
		//根据类别显示
		if(myScroll.y < myScroll.maxScrollY -50){
			getData(iclassId);
			iclassId++;
		}
	});
	var mySwiper = new Swiper ('.swiper-container', {
    	autoplay : 3000,//自动切换
    	// 如果需要分页器
    	pagination: '.swiper-pagination'
	})
    function getBanner(){
    	$.ajax({
    		type:"get",
    		url:"http://datainfo.duapp.com/shopdata/getBanner.php",
    		dataType:"jsonp",
    		success:function(data){
    			console.log(data);
    			$.each(data, function(index) {
    				var arrImg = JSON.parse(data[index].goodsBenUrl);
    			
    				console.log(JSON.parse(data[index].goodsBenUrl)[0]);
    				var swiperslider = $("<div class='swiper-slide'>加载中...<div>");
    				var img = $("<img src='"+JSON.parse(data[index].goodsBenUrl)[0]+"' width='100%' height='100%' />");
    				img.on('load',function(){
    					swiperslider.empty();
    					swiperslider.append(img);
    					//更新轮播图
    					mySwiper.update();
    				});
    				$('.swiper-wrapper').append(swiperslider);
    				
//  				<div class="swiper-wrapper">
//				        <div class="swiper-slide" style="background:yellow ;">
//				        	
//				        	<img src="img/main_10.jpg" width="100%" height="100%" />
//				        </div>
//				        <div class="swiper-slide" style="background: greenyellow;">
//				        	<img src="img/main_10.jpg" width="100%" height="100%" />
//				        </div>
//				        <div class="swiper-slide" style="background: orangered;">
//				        	<img src="img/main_10.jpg" width="100%" height="100%" />
//				        </div>
//				        <div class="swiper-slide" style="background: greenyellow;">
//				        	<img src="img/main_10.jpg"  width="100%" height="100%" />
//				        </div>
//				    </div>
    			});
    		}
    	});
    }
	//读取数据显示到页面
	function getData(classid){
		//从后台获取数据
		$.ajax({
			type:"get",
			dataType:"jsonp",
			data:{
				classID:classid
			},
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			success:function(data){
				if(data.length){
					$.each(data,function(index){
						//获取后台信息
						var goodsName = data[index].goodsName.slice(0,26);
						var oldPrice = data[index].price;
						var discount = data[index].discount;
						var newPrice = parseFloat(discount)*parseFloat(oldPrice);
						var imgsrc = data[index].goodsListImg;
						//添加到页面中
						var oLi = document.createElement('li');
						
						//商品图片
						var oImg = $("<div class='goodsImg'>图片加载中...</div>");
						var thisImg = $("<img src='"+ imgsrc +"' width='100%' height='100%'/>");
						thisImg.on('load',function(){
							oImg.empty();
							oImg.append(thisImg);
						})
						
						//文字部分
						var oText = document.createElement('div');
						oText.className = 'goodsText';
						var oTit = document.createElement('h5');
						$(oTit).addClass('goodsTit');
						oTit.innerHTML = `<a href="">${goodsName}</a>`;
						var oPrice = document.createElement('div');
						oPrice.className = 'goodsBot';
						oPrice.innerHTML = `<div class="goodsPrice">
												<p class="price"><span>￥${newPrice}</span><i>￥${oldPrice}</i></p>
												<p class="zhe">${discount}折</p>
											</div>
											<div class="addCart" data-goodsId=${data[index].goodsID}>
												<img src="img/17_03.jpg" width="100%" />
											</div>`;
						$(oText).append(oTit);
						$(oText).append(oPrice);
						
						$(oLi).append(oImg);
						$(oLi).append(oText);
	//  					console.log(data[index].goodsName);
						//li添加进ul
						$('#M-goodsList').append(oLi);
						
						//重新添加滚动样式
						myScroll.refresh();
						
	//  					console.log(data[index].goodsID);
						//点击商品进入详情页
						$(oImg).on("touchstart",function(){
			               	window.location.href = "18goodsproduct.html?goodsID="+encodeURI(data[index].goodsID)
			           });
					});
					
					var numIncart = 1;
					var userId = localStorage.getItem("zxwUserID");
					
					//点击加入购物车
					$('.addCart').on('touchstart',function(){
						if(userId == null){
							alert("请先登录");
						}else{
							console.log(this);
							var goodsId = $(this).attr('data-goodsId');
							
							console.log(userId,goodsId,numIncart);
							//获取此商品在购物车中的信息
							$.ajax({
								type:"get",
								url:"http://datainfo.duapp.com/shopdata/getCar.php",
								dataType:"jsonp",
								data:{
									userID: userId
								},
								success:function(data){
									console.log("获取购物车信息：");
									console.log(data);
									var bool = true;
									$.each(data, function(index) {
										if(data[index].goodsID == goodsId){
											numIncart = parseInt(data[index].number)+1;
											console.log("num:"+numIncart);
											bool = false;
										}
	//									console.log(data[index].goodsID,data[index].number);
									});
									
									if(bool === true){
										numIncart = 1;
									}
									//添加进入购物车
									$.ajax({
										type:"post",
										url:"http://datainfo.duapp.com/shopdata/updatecar.php",
										data:{
				//userID:用户名（必须参数）	数据成功更新：1
				//goodsID:要更新的商品ID（必须参数）	数据更新失败：0
				//number
											userID:userId,
											goodsID:goodsId,
											number:numIncart
										},
										success:function(data){
											console.log(data);
											if(parseInt(data) === 1){
												alert("已加入购物车");
											}else if(parseInt(data) === 0){
												alert('亲，网络不顺畅哦，没有添加成功呢')
											}
										}
									});
								}//end success
							});//end ajax for 
						}
					})//end addCart()
				}
			}
		});
	}
});


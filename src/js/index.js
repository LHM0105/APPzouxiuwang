$(function(){
	var myScroll;
	iscroll();
	var iclassId = 1;
	var mySwiper = new Swiper ('.swiper-container', {
    	autoplay : 3000,//自动切换
    	// 如果需要分页器
    	pagination: '.swiper-pagination'
	})

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
											<div class="addCart">
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
				}
			}
		});
	}
});


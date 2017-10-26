$(function(){
	var myScroll;
	iscroll();
	var mySwiper = new Swiper ('.swiper-container', {
    	autoplay : 3000,//自动切换
    	// 如果需要分页器
    	pagination: '.swiper-pagination'
  	})       
  	function iscroll(){
  		myScroll = new IScroll("#scroll",{
  			mouseWheel:true,
  			scrollbars:true
  		});
  	}
  	
	var iclassId = 1;
	
	//添加触摸下拉事件
    document.addEventListener("touchend",function(){
    	//上拉刷新
//		if(myScroll.y > 0){
//			//window.location.reload()
//			$("#scrollbars").empty()
//			//$("loading").show()
//			getData()
//		}

		//下拉加载更多
		if(myScroll.y < myScroll.maxScrollY -50){
			getData(iclassId);
			iclassId++;
		}
		
		//分页
//		if(myScroll.y<myScroll.maxScrollY-50){
//			//分页功能
//			var page = $("#page").val()
//			console.log(page)
//			var i = parseInt(page)+1;
//			getData(i)
//			$("#page").val(i)
//		}
	})	  
		  
	//设置跟根字体大小，使用rem
	var bw = (document.documentElement.clientWidth/6.4)+"px";       //=100px 
    var htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.style.fontSize=bw;
    
    getData();
    
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
    			console.log(data);
    			if(data.length){
    				$.each(data,function(index){
    					//获取后台信息
    					var goodsName = data[index].goodsName;
    					var oldPrice = data[index].price;
    					var discount = data[index].discount;
    					var newPrice = parseFloat(discount)*parseFloat(oldPrice);
    					var imgsrc = data[index].goodsListImg;
    					//添加到页面中
						var oLi = document.createElement('li');
						
						//商品图片				
						var oImg = document.createElement('div');
						oImg.className = 'goodsImg';
						oImg.innerHTML = `<img src="${imgsrc}" width="100%" />`;
						
						
						//文字部分
						var oText = document.createElement('div');
						oText.className = 'goodsText';
						var oTit = document.createElement('h5');
						$(oTit).attr('id','goodsTit');
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
						
    					console.log(data[index].goodsName);
    					//li添加进ul
    					$('#M-goodsList').append(oLi);
    					
    					console.log(data[index].goodsID);
    					
    					//点击商品进入详情页
						$(oImg).add($(oTit)).on("touchstart",function(){
			               	window.location.href = "18goodsproduct.html?goodsID="+encodeURI(data[index].goodsID)
			           	});
						
    				});
    			}
    		}
    	});
    }
});

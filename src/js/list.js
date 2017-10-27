function getQueryString(name){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)")
	var r = window.location.search.substr(1).match(reg)
	if(r!=null){
		return decodeURI(r[2])
	}
	return null;
}
//获取商品分类id
var classId = getQueryString('classID');
//用户id（显示用户的浏览记录）
var userId = getQueryString('userid');
//显示符合搜索条件的商品
var selectText = getQueryString('goods');
//浏览记录
//var browLog = 
var myScroll;
$(function(){
	//添加滚动事件
	iscroll();
	//获取当前页面id
//	var iclassId = 1;	
	console.log(classId);
	console.log(userId);
	console.log(selectText);
	//根据点击商品类别得到的列表
	if(classId || classId != null){
		//修改头部内容
    	$("#headText").text('商品列表');
		//获取数据
	    getData("http://datainfo.duapp.com/shopdata/getGoods.php",null,classId);
	}
	//搜索商品得到的商品列表
	if(selectText || selectText!=null){
		$("#headText").text('商品列表');
		getData("http://datainfo.duapp.com/shopdata/selectGoodes.php",null,null,selectText);
	}
	//用户的浏览记录商品列表
	if(userId || userId != null){
		getData("http://datainfo.duapp.com/shopdata/getCar.php",userId);
	}
    
 	//添加滚动效果
  	function iscroll(){
  		myScroll = new IScroll("#scroll",{
  			mouseWheel:true,
  			scrollbars:true
  		});
  	}
  	
  	//分页功能
	var page = 0;
	//添加触摸下拉事件
    document.addEventListener("touchend",function(){
//    	上拉刷新
		if(myScroll.y > 0){
			//清空当前内容
			$("#SortgoodsList").empty();
			//重新加载数据
			getData("http://datainfo.duapp.com/shopdata/getGoods.php",null,classId);
		}
		//下拉加载更多
		//根据类别显示
		if(myScroll.y < myScroll.maxScrollY -50){
			page++;
//			getData(iclassId);
			//懒加载
			getData("http://datainfo.duapp.com/shopdata/getGoods.php",null,classId,page)
		}
	});
	
	//读取数据显示到页面
	function getData(url,userid,classid,selectText,page){
		//从后台获取数据
		$.ajax({
			type:"get",
			dataType:"jsonp",
			data:{
				userID:userid,
				classID:classid,
				selectText:selectText,
				pageCode:page,
				linenumber:9//每次加载6个
			},
			url:url,
			success:function(data){
				if(data.length){
					console.log(data);
					//加入购物车时使用(商品id)
//					var goodsId;
					//获取当前登录用户的id
					var userId = localStorage.getItem("zxwUserID");
					
					
					var numIncart = 1;
					
					$.each(data,function(index){
//						console.log(data[index])
//						//获取后台信息
						var goodsName = data[index].goodsName.slice(0,23);
						var oldPrice = data[index].price;
						var discount = data[index].discount;
						var newPrice = parseFloat(discount)*parseFloat(oldPrice);
						var imgsrc = data[index].goodsListImg;
						var $li = $('<li></li>');
						var oImgbox = $('<div class="img">加载中...</div>');
						var oImg = $('<img src="'+imgsrc+'"  width="100%" />');
						
						
						oImg.on('load',function(){
							oImgbox.empty();
							oImgbox.append(oImg);
						});
						var oText = $('<div class="text"> <div class="title-box"> <p class="title" class="goodsTit">'+goodsName+'</p> <b></b> </div> <p class="youhui"></p> <div class="info"> <p class="a-price">单价：<span>￥'+newPrice+'</span></p> </div> <div class="num"> <span class="order-num sc-old-price">'+discount+'折  <i>￥'+ oldPrice +'</i></span> <i class="order-cancel-btn icon addCart" data-goodsId="'+ data[index].goodsID+'"></i> </div> </div>');
						$li.append(oImgbox);
						$li.append(oText);
						$('#SortgoodsList').append($li);
						//刷新滚动事件
						myScroll.refresh();
						$('.goodsTit').on('touchend',function(){
							console.log(111);	
						})
						
						
						//给图片添加点击事件,点击跳转到详情页
						oImg.on('touchstart',function(){
							window.location.href = "18goodsproduct.html?goodsID="+encodeURI(data[index].goodsID);
//							console.log(this);
						})
					});
					
					
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
					
				}else{
					//没有查询到内容
					var oDiv = $('<div class="no-goods"> <div class="pic"> <p>这里没有任何内容呢~</p> <div class="img"></div> </div> <p class="btn-go" id="btn-go"> 去逛逛 </p> </div>');
					$("#scroll").empty();
					$("#scroll").append(oDiv);
					//点击“去逛逛”，转到首页
					$("#btn-go").on('touchstart',function(){
						//链接到首页
						window.location.href = 'index.html';
					});
				}
			}
		});
	}
});


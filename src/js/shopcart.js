var myScroll;
$(function(){
	//添加滚动事件
	iscroll();
	var userId = localStorage.getItem('zxwUserID');
	if(userId !=null || userId){
		//读取数据库中数据呈现页面
		getdata(userId);
	}else{
		alert("亲 您还没登录呢！请先登录");
		window.location.href = "login.html";
	}
	
	//滚动效果
  	function iscroll(){
  		myScroll = new IScroll("#scroll",{
  			mouseWheel:true,
  			scrollbars:true
  		});
  	}
  	
  	function getdata(userid){
  		
  		$.ajax({
  			type:"get",
  			url:"http://datainfo.duapp.com/shopdata/getCar.php",
  			dataType:"jsonp",
  			data:{
  				userID:userid
  			},
  			success:function(data){
  				console.log(data);
  				var totalPrice = 0;
  				var totalNum = 0
  				if(data.length){
	  				$.each(data, function(index) {
	//					console.log(data[index]);
	  					var goodsName = data[index].goodsName.slice(0,24);
	  					var price = data[index].price;
	  					var num = data[index].number;
	  					var imgSrc = data[index].goodsListImg;
	  					var goodsId = data[index].goodsID;
	  					totalPrice += (num*price);
						totalNum += 1;
	  					var $li = $("<li id='"+goodsId+"'></li>");
	  					var oImgbox = $("<div class='img'>加载中...</div>")
	  					var img = $("<img src='"+ imgSrc +"' />")
	  					img.on('load',function(){
	  						oImgbox.empty();
	  						oImgbox.append(img);
	  					})
	  					var oText = $("<div class='text'></div>");
	  					
	  					oText[0].innerHTML = `<div class="title-box">
									<p class="title">${goodsName}</p>
									<b class="SC_deleteGoodsBtn" data-goodsid="${goodsId}" data-goodsPrice ="${price}" data-goodsNum="${num}"></b>
								</div>
								<div class="info">
									<p class="a-price">单价：<span>￥${price}</span></p>
									<span class="size">L</span>
								</div>
								<div class="num">
									<span>数量：</span>
									<div class="chang-num" data-goodsid="${goodsId}" data-goodsPrice ="${price}" data-goodsNum="${num}">
										<b class="add">-</b>
										<input type="number" value="${num}"  />
										<b class="differ">+</b>
									</div>
								</div>`;
						$li.append(oImgbox);
						$li.append(oText);
						$("#SC_goodsList").append($li);
						myScroll.refresh();
						
						//给图片添加点击事件,点击跳转到详情页
						img.on('touchstart',function(){
							window.location.href = "18goodsproduct.html?goodsID="+encodeURI(data[index].goodsID);
	//							console.log(this);
						})
	  				});
	  				
	  				
	  				$("#totalPrice").text(totalPrice);
	  				$("#SC_totalNum").text(totalNum);
	  				//删除商品
					$('.SC_deleteGoodsBtn').on('touchstart',function(){
						console.log("删除",$(this).attr('data-goodsid'));
						var goodsid = $(this).attr('data-goodsid');
						$.ajax({
							type:"post",
							url:"http://datainfo.duapp.com/shopdata/updatecar.php",
							data:{
								userID:userid,
								goodsID:goodsid,
								number:0 
							},
							success:function(data){
								if(data){
									alert("删除商品成功");
									//删除商品节点
									console.log($(this).parents('li'));
									//删除这条商品
									$(this).parents('li').remove();
									//总价变化
									console.log($(this).attr('data-goodsPrice')*$(this).attr('data-goodsNum'));
									
									totalPrice -= $(this).attr('data-goodsPrice')*$(this).attr('data-goodsNum');
									$("#totalPrice").text(totalPrice);
								}else{
									alert("删除商品失败")
								}
							}.bind(this)
						});
					})
	  				//购物车加减
	  				$('.differ').on('touchstart',function(){
	  					console.log("+");
	  					console.log($(this).parent().attr('data-goodsid'))
	  					console.log(parseInt($(this).siblings('input').val()) + 1)
	  					var goodsid = $(this).parent().attr('data-goodsid');
	  					
	  					var nextNum = parseInt($(this).siblings('input').val()) + 1;
	  					//更改数据库中数据
	  					$.ajax({
	  						type:"post",
	  						url:"http://datainfo.duapp.com/shopdata/updatecar.php",
	  						data:{
	//							userID:用户名（必须参数）	数据成功更新：1
	//goodsID:要更新的商品ID（必须参数）	数据更新失败：0
	//number:
								userID:userid,
								goodsID:goodsid,
								number:nextNum 
	  						},
	  						success:function(data){
	  							if(data){
	  								console.log("添加购物车成功");
	  								//更新显示数量
	  								$(this).siblings('input').val(nextNum);
	  								//更新商品数量
	  								totalPrice += parseFloat($(this).parent().attr('data-goodsPrice'));
	  								$("#totalPrice").text(totalPrice);
	  							}else{
	  								alert("添加购物车失败")
	  							}
	  						}.bind(this)
	  					});
	  					//更新显示
	  					
	  				})
	  				//数量减
	  				$('.add').on('touchstart',function(){
	  					console.log("-");
	  					var goodsid = $(this).parent().attr('data-goodsid');
	  					var nextNum = parseInt($(this).siblings('input').val()) - 1;
	  					if(nextNum === 0){
							//删除本条
							alert("不能再减少了哦！")
						}else{
		  					//更改数据库中数据
		  					$.ajax({
		  						type:"post",
		  						url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		  						data:{
		//							userID:用户名（必须参数）	数据成功更新：1
		//goodsID:要更新的商品ID（必须参数）	数据更新失败：0
		//number:
									userID:userid,
									goodsID:goodsid,
									number:nextNum 
		  						},
		  						success:function(data){
		  							if(data){
		  								console.log("更新成功");
		  								
		  								//更新显示数量
		  								$(this).siblings('input').val(nextNum);
		  								//更新商品价格
		  								totalPrice -= $(this).parent().attr('data-goodsPrice');
		  								$("#totalPrice").text(totalPrice);
		  							}else{
		  								alert("操作购物车失败")
		  							}
		  						}.bind(this)
		  					});
						}
	  				})
  					
  				}else{
					var oDiv = $("<div class='no-goods'></div>");
					oDiv[0].innerHTML = `<div class="pic">
											<p>您的购物车空空~~</p>
											<div class="img"></div>
										</div>
										<p class="btn-go" id="btn-go">
											去逛逛
										</p>`;
					$("#scroll").empty();
					$("#scroll").append(oDiv);
					$('#btn-go').on('touchstart',function(){
//						console.log("去逛逛")
						//点击去逛逛，转到首页
						window.location.href = "index.html";
					})
  				}//end if(data.length)
  			}
  			
  		})
  		
  	}
});
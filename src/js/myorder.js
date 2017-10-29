$(function(){
	var myScroll;
	//添加滚动
	iscroll();
	//从后台获取数据
	getData();
	function iscroll(){
		myScroll = new IScroll("#scroll",{
			mouseWhell:true,
			scrollbars:true
		})
	}
	
	function getData(){
		var userId = localStorage.getItem("zxwUserID");
		$.ajax({
			type:"get",
			url:"http://localhost:3000/order/"+userId,
			success:function(data){
				$.each(data, function(index) {
					var num = data[index].number;
					var goodsName = data[index].goodstitle;
					var price = data[index].price;
					var imgSrc = data[index].imgUrl;
					var size = data[index].size;
					var orderid = data[index]._id;
					console.log(orderid);
					var $li = $("<li class='Ordergoods'></li>");
					
					var imgbox = $("<div class='img'>加载中...</div>");
					var img = $("<img src='"+imgSrc+"'width='100%' />")
					img.on('load',function(){
						imgbox.empty();
						imgbox.append(img);
					})
					var textBox = $("<div class='text'></div>")
					textBox[0].innerHTML = `<div class="title-box">
								<p class="title">${goodsName}</p>
								<span class="size">${size}</span>
							</div>
							
							<div class="info">
								<p class="a-price">单价：<span>￥${price}</span></p>
								
							</div>
							<div class="num">
								<span class="order-num">数量：<b>${num}</b></span>
								<i class="order-cancel-btn" data-id="orderid">取消订单</i>
								
							</div>`;
					$li.append(imgbox);
					$li.append(textBox);
					$("#myorderList").append($li);
					myScroll.refresh();
				});
				//点击取消订单
				$(".order-cancel-btn").on('touchstart',function(){
					var orderid = $(this).attr("data-id");
					$.ajax({
						type:"post",
						url:"http://localhost:3000/deleteOrder",
						data:{
							orderID:orderid
						},
						success:function(data){
							if(parseInt(data) === 1){
								console.log("删除成功")
								alert("订单已删除");
								//删除对应节点
								console.log($(this).parents('.Ordergoods').remove())
							}else{
								alert("删除失败")
							}
						}.bind(this)
					})
				})
			}
		});
	}
})

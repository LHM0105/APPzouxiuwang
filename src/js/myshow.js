//获取通过url传来的用户id
//function getQueryString(name){
//	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)")
//	var r = window.location.search.substr(1).match(reg)
//	if(r!=null){
//		return decodeURI(r[2])
//	}
//	return null
//}
//var userid = getQueryString("userid");


$(function(){
//判断是否已经登录
  	var zxwUserId = localStorage.getItem('zxwUserID');
  	if(zxwUserId != null || zxwUserId){
  		getUser(zxwUserId);
  	}
  	
  	//点击登录转到登录页
  	$('#myshow-loginbtn').on('touchstart',function(){
  		window.location.href = "login.html";
  	})
  	//点击注册转到注册页
  	$('#myshow-register').on('touchstart',function(){
  		window.location.href = "register.html";
  	})
  	
});
function getUser(id){
	$.ajax({
		type:"get",
		url:" http://datainfo.duapp.com/shopdata/getuser.php",
		dataType:"jsonp",
		data:{
			userID:id
		},
		success:function(data){
			console.log(data[0]);
			var photoUrl = data[0].userimg_url;
			//获取用户头像
			var Ophoto = $('<img src="'+ photoUrl +'" width="100%" />');
			//图片加载出来之后。。。
			$(Ophoto).on('load',function(){
				$('#photobox').empty();
				$('#photobox').append(Ophoto);
			});
	    	//显示用户信息
			$('#namebox #username').html(id);	
	    	$('#namebox .btns').empty();	
	    	
	    	var oDiv = $('<div class="my-list"> <ul> <li id="myorder"> <span>我的订单</span> <i></i> </li> <li id="myYouhui"> <span>我的优惠券</span> <i></i> </li> <li id="browlog"> <span>浏览记录</span> <i></i> </li> <li id="mycollect"> <span>我的收藏</span> <i></i> </li> </ul> </div>');
	    	
	    	$('#MyshowSection').append(oDiv);
	    	//点击我的订单
	    	$('#myorder').on('touchend',function(){
				console.log('跳转到我的订单');
				window.location.href = "myorder.html?userid="+encodeURI(id);
		  	});
	    	//点击“浏览记录”
		  	$('#browlog').on('touchend',function(){
				console.log('跳转到浏览记录');
				window.location.href = "16lljl.html?userid="+encodeURI(id);
		  	});
		  	//点击跳转到“我的收藏”
		  	$('#mycollect').on('touchend',function(){
				console.log('跳转到wdsc');
				window.location.href = "16lljl.html?userid="+encodeURI(id)+"&collection=1";
		  	});
		  	//点击跳转到 我的优惠券
		  	$('#myYouhui').on('touchend',function(){
				window.location.href = "15myquan.html?userid="+encodeURI(id);
		  	});
		  	
//	    	<div class="my-list">
//				<ul>
//					<li>
//						<span>我的订单</span>
//						<i></i>
//					</li>
//					<li>
//						<span>我的优惠券</span>
//						<i></i>
//					</li>
//					<li id="browlog">
//						<span>浏览记录</span>
//						<i></i>
//					</li>
//					<li>
//						<span>我的收藏</span>
//						<i></i>
//					</li>
//				</ul>
//			</div>
		}
	});
}
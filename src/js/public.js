$(function(){
	
	//设置跟根字体大小，使用rem
	var bw = (document.documentElement.clientWidth/6.4)+"px";       //=100px 
    var htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.style.fontSize=bw;
    //左上角返回按钮
    $("#goodsBack").on('touchstart',function(){
//		console.log("返回")
  		window.history.back();
  	})
    //点击底部按钮（我的）
    $('#footbtn-myshow').on('touchstart',function(){
    	console.log('我的');
    	//判断是否登录
    	//获取本地是否存入
//  	var zxwUserId = localStorage.getItem('zxwUserID');
//  	if(zxwUserId != null || zxwUserId){
    		//用户已登录
    		
    		//跳转到用户信息页
			window.location.href = "myshow.html";
    		
//  	}else{
    		//跳转到登录页
//		  	window.location.href = "login.html";
//  	}
    })
    
 	//点击底部按钮（首页）
 	$('#footbtn-home').on('touchstart',function(){
  		window.location.href = "index.html";
    	
    })
 
   	//点击底部按钮（分类）
   	$('#footbtn-lei').on('touchstart',function(){
		window.location.href = "allSort.html";
    })
 	
 	//点击底部按钮（购物车）
 	$('#footbtn-cart').on('touchstart',function(){
  		window.location.href = "shopcart.html";
    	
    })
 	
 	//底部（更多）
 	$('#footbtn-more').on('touchstart',function(){
  		window.location.href = "24more.html";
    })
    
});



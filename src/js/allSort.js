$(function(){
	var myScroll;
	//添加滚动事件
	iscroll();
	//显示分类
	getSortData();
  	function iscroll(){
  		myScroll = new IScroll("#scroll",{
  			mouseWheel:true,
  			scrollbars:true
  		});
  	}
 
  	function getSortData(){
  		$.ajax({
  			type:"get",
  			url:"http://datainfo.duapp.com/shopdata/getclass.php",
  			success:function(data){
  				var sorts = JSON.parse(data);
  				console.log(sorts);
  				$.each(sorts, function(i) {
  					var li = $("<li id='"+ sorts[i].classID +"'>"+sorts[i].className+"<span class='right_icon'></span></li>");
  					$("#sortList").append(li);
  					myScroll.refresh();
  					//给每个li添加点击事件，点击后跳转到对应分类的商品列表页面（16lljl.html）
  					li.on('touchstart',function(){
//						console.log(this.id);
						window.location.href = "16lljl.html?classID="+encodeURI(sorts[i].classID);
  					});
  				});
  				
  			}
  			
  		});
  	}
});

$(function(){
	//设置跟根字体大小，使用rem
	var bw = (document.documentElement.clientWidth/6.4)+"px";       //=100px 
    var htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.style.fontSize=bw;
    
    //登录页选中记住密码
    $('#ismemory').click(function(){
    	console.log($(this).prop('checked'));
    	if($(this).prop('checked')){
    		$(this).siblings('.check-icon').removeClass('no-check')
    	}else{
    		$(this).siblings('.check-icon').addClass('no-check')
    	}
    })
    
    
});

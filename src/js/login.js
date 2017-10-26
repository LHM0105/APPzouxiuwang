$(function(){
	//设置跟根字体大小，使用rem
	var bw = (document.documentElement.clientWidth/6.4)+"px";       //=100px 
    var htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.style.fontSize=bw;
    
    
    //获取localStorage中的user
    var lsData = localStorage.getItem('user');
//  console.log(lsData)
    //如果本地存储存在这个
    if(lsData!=null || lsData){
    	//自动填入表单
    	$('#login-name').val(JSON.parse(lsData).userID);
    	$('#login-pwd').val(JSON.parse(lsData).password);
    }
    
    
    //登录页选中记住密码
    $('#ismemory').click(function(){
    	console.log($(this).prop('checked'));
    	if($(this).prop('checked')){
    		$('.check-icon').removeClass('no-check')
    	}else{
    		$('.check-icon').addClass('no-check')
    	}
    })
    
    
   $('#login-btn').on('click',function(){
   		var username = $('#login-name').val();
   		var pwd = $('#login-pwd').val();
   		
   		if(username == ""){
   			alert("请输入用户名");
   		}else if(pwd == ""){
   			alert("请输入密码");
   		}else{
   			var user = getUser(username,pwd);
   			//用户登录
   			toLogin(user);
   		}
   });
   
   function getUser(name,pwd){
   		var user={
   			id:name,
   			password:pwd
   		};
   		return user;
   }
   
   //登录函数
   function toLogin(user){
   		var check = $('#ismemory').prop('checked');
   		$.ajax({
   			type:"get",
   			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
   			data:{
   				status:"login",
   				userID:user.id,
   				password:user.password
   			},
   			
   			success:function(data){
   				//如果返回数据为对象
   				if(data.charAt(0) == "{"){
   					alert("登录成功");
					
   					//如果用户勾选了记住密码
   					if(check){
   						//把用户信息存入localStorage
   						var userStr = '{"userID":"'+user.id+'","password":"'+user.password+'"}';
   						localStorage.setItem('user',userStr);
   					}
   					
   				}else{
   					alert("亲，你的浏览器出现异常 错误代码443")
   				}
   			}
   			
   		});
   }
   
});


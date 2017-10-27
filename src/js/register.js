$(function(){
    //点击注册
    $('#register-btn').click(function(){
    	var name = $('#username').val();
    	var pwd = $('#pwd').val();
    	var repwd = $('#repwd').val();
//  	console.log(name,pwd,repwd);
	
    	if(name == ""){
    		alert('请填写用户名')
    	}else{
    		if(pwd == ""){
    			alert('请填写密码');
    		}else{
    			if(pwd === repwd){
    //				console.log('填写正确，发送数据给后台')
    				var user = {
    					id:name,
    					password:pwd
    				}
    				//发送给后台数据
    				getRegister(user);
    			}else{
    				alert("两次密码不一致")
    			}
    		}
    	}
    })
    
    function getRegister(user){
    	$.ajax({
    		type:"post",
    		url:" http://datainfo.duapp.com/shopdata/userinfo.php",
    		data:{
    			status:"register",
    			userID:user.id,
    			password:user.password
    		},
    		success:function(data){
				console.log(data);
				if(data == '0'){
					alert('用户名重复')
				}else if(data=='2'){
					alert('数据库出错')
				}else if(data =='1'){
					alert('注册成功')
				}
    		}
    	});
    }
    
});

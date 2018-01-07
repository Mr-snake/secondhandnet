// 后台登录界面
$(function(){
    // input默认value的清空与添加
	// $('input').on('focus',function(){
	// 	$(this).addClass('active');
	// 	if($(this).val()==this.defaultValue){
	// 		$(this).val("");
	// 	}
	// }).on('blur',function(){
	// 	$(this).removeClass('active');
	// 	if($(this).val()==""){
	// 		$(this).val(this.defaultValue);
	// 		$(this).siblings('span').show()
	// 	}else{
	// 		$(this).siblings('span').hide()
	// 	}
	// })
	$('.submit a').on('click',function(){
		$name=$('.name input').val();
        $pwd=$('.pwd input').val();
        $re_pwd=$('.re-pwd input').val();
		if(!$name ||!$pwd ||　!$re_pwd){
			alert('请填写管理员账号或密码！');
			return false;
		}else{
			$.ajax({
				type:'post',
				url:'/adm/login',
				data:{
					usename:$name,
					password:$pwd,
					repassword:$re_pwd
				},
				dataType:'json',
				success:function(result){
                   if(result.id==1){
                   	
                   }else{
                     $('#scs').html(result.message);
                   }
				},
				error:function(err){
                    console.log('错误为:'+err);
				}
			})
		}
	})
    
})
$(function(){
	var showbanner=function(){
		$.ajax({
		type:'post',
		url:'/adm/login/banner',
		async:true,
		dataType:'json',
		success:function(result){
           
		},
		error:function(err){
            console.log('错误为:'+err);
		}
	   })
	}
	showbanner();
})
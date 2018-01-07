$(function(){
	$('#myTabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})
	// var btn=$('#home .btn');
	// var title=$('name=['title']');
	// var des=$('name=['des']');
	// var text=$('name=['text']');
	// btn.on('click',function(){
	// 	$.ajax({
	// 	type:'post',
	// 	url:'/adm/login/banner',
	// 	data:{
 //            title:title,
 //            des:des,
 //            text:text
	// 	},
	// 	async:true,
	// 	dataType:'json',
	// 	success:function(result){
           
	// 	},
	// 	error:function(err){
 //            console.log('错误为:'+err);
	// 	}
	//    })
	// })
})

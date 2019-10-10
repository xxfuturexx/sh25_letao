// 2019/10/10
$(function(){
   $.ajax({
      type:"get",
       url:"/user/queryUser",
       data:{
          page: 1,
           pageSize: 10
       },
       dataType:"json",
       success:function(info){
          console.log(info);
          var  htmlStr = template( 'tpl' , info);
          $('tbody').html(htmlStr);
       }
   })
});
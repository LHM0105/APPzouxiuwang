"use strict";$(function(){function t(t){$.ajax({type:"get",dataType:"jsonp",data:{classID:t},url:"http://datainfo.duapp.com/shopdata/getGoods.php",success:function(t){if(t.length){$.each(t,function(a){var e=t[a].goodsName.slice(0,26),s=t[a].price,n=t[a].discount,d=parseFloat(n)*parseFloat(s),p=t[a].goodsListImg,c=document.createElement("li"),r=$("<div class='goodsImg'>图片加载中...</div>"),i=$("<img src='"+p+"' width='100%' height='100%'/>");i.on("load",function(){r.empty(),r.append(i)});var l=document.createElement("div");l.className="goodsText";var g=document.createElement("h5");$(g).addClass("goodsTit"),g.innerHTML='<a href="">'+e+"</a>";var u=document.createElement("div");u.className="goodsBot",u.innerHTML='<div class="goodsPrice">\n\t\t\t\t\t\t\t\t\t\t\t\t<p class="price"><span>￥'+d+"</span><i>￥"+s+'</i></p>\n\t\t\t\t\t\t\t\t\t\t\t\t<p class="zhe">'+n+'折</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="addCart" data-goodsId='+t[a].goodsID+'>\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/17_03.jpg" width="100%" />\n\t\t\t\t\t\t\t\t\t\t\t</div>',$(l).append(g),$(l).append(u),$(c).append(r),$(c).append(l),$("#M-goodsList").append(c),o.refresh(),$(r).on("touchstart",function(){window.location.href="18goodsproduct.html?goodsID="+encodeURI(t[a].goodsID)})});var a=1,e=localStorage.getItem("zxwUserID");$(".addCart").on("touchstart",function(){if(null==e)alert("请先登录");else{console.log(this);var t=$(this).attr("data-goodsId");console.log(e,t,a),$.ajax({type:"get",url:"http://datainfo.duapp.com/shopdata/getCar.php",dataType:"jsonp",data:{userID:e},success:function(o){console.log("获取购物车信息："),console.log(o);var s=!0;$.each(o,function(e){o[e].goodsID==t&&(a=parseInt(o[e].number)+1,console.log("num:"+a),s=!1)}),!0===s&&(a=1),$.ajax({type:"post",url:"http://datainfo.duapp.com/shopdata/updatecar.php",data:{userID:e,goodsID:t,number:a},success:function(t){console.log(t),1===parseInt(t)?alert("已加入购物车"):0===parseInt(t)&&alert("亲，网络不顺畅哦，没有添加成功呢")}})}})}})}}})}var o;o=new IScroll("#scroll",{mouseWheel:!0,scrollbars:!0});var a=1;$.ajax({type:"get",url:"http://datainfo.duapp.com/shopdata/getBanner.php",dataType:"jsonp",success:function(t){console.log(t),$.each(t,function(o){JSON.parse(t[o].goodsBenUrl),console.log(JSON.parse(t[o].goodsBenUrl)[0]);var a=$("<div class='swiper-slide'>加载中...<div>"),s=$("<img src='"+JSON.parse(t[o].goodsBenUrl)[0]+"' width='100%' height='100%' />");s.on("load",function(){a.empty(),a.append(s),e.update()}),$(".swiper-wrapper").append(a)})}}),t(),$("#secBtn").on("touchstart",function(){if($("#secIpt").val().length>0||$("#secIpt").val()){var t=$("#secIpt").val();window.location.href="16lljl.html?goods="+encodeURI(t)}}),document.addEventListener("touchend",function(){o.y>0&&($("#M-goodsList").empty(),t()),o.y<o.maxScrollY-50&&(t(a),a++)});var e=new Swiper(".swiper-container",{autoplay:3e3,pagination:".swiper-pagination"})});
"use strict";function getQueryString(o){var t=new RegExp("(^|&)"+o+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(t);return null!=e?decodeURI(e[2]):null}var classId=getQueryString("classID"),userId=getQueryString("userid"),selectText=getQueryString("goods"),collection=getQueryString("collection"),myScroll;$(function(){function o(o,e,s,l){var a=0;document.addEventListener("touchend",function(){myScroll.y>0&&($("#SortgoodsList").empty(),t(o,e,s,l)),myScroll.y<myScroll.maxScrollY-50&&(a++,console.log(a),t(o,e,s,l,a))})}function t(o,t,e,s,l){$.ajax({type:"get",dataType:"jsonp",data:{userID:t,classID:e,selectText:s,pageCode:l,linenumber:8},url:o,success:function(o){if(o.length){console.log(o);var t=localStorage.getItem("zxwUserID"),e=1;$.each(o,function(t){var e=o[t].goodsName.slice(0,23),s=o[t].price,l=o[t].discount,a=parseFloat(l)*parseFloat(s),n=o[t].goodsListImg,c=$("<li></li>"),d=$('<div class="img">加载中...</div>'),p=$('<img src="'+n+'"  width="100%" />');p.on("load",function(){d.empty(),d.append(p)});var i=$('<div class="text"> <div class="title-box"> <p class="title" class="goodsTit">'+e+'</p> <b></b> </div> <p class="youhui"></p> <div class="info"> <p class="a-price">单价：<span>￥'+a+'</span></p> </div> <div class="num"> <span class="order-num sc-old-price">'+l+"折  <i>￥"+s+'</i></span> <i class="order-cancel-btn icon addCart" data-goodsId="'+o[t].goodsID+'"></i> </div> </div>');c.append(d),c.append(i),$("#SortgoodsList").append(c),myScroll.refresh(),$(".goodsTit").on("touchend",function(){console.log(111)}),p.on("touchstart",function(){window.location.href="18goodsproduct.html?goodsID="+encodeURI(o[t].goodsID)})}),$(".addCart").on("touchstart",function(){if(null==t)alert("请先登录");else{console.log(this);var o=$(this).attr("data-goodsId");console.log(t,o,e),$.ajax({type:"get",url:"http://datainfo.duapp.com/shopdata/getCar.php",dataType:"jsonp",data:{userID:t},success:function(s){console.log("获取购物车信息："),console.log(s);var l=!0;$.each(s,function(t){s[t].goodsID==o&&(e=parseInt(s[t].number)+1,console.log("num:"+e),l=!1)}),!0===l&&(e=1),$.ajax({type:"post",url:"http://datainfo.duapp.com/shopdata/updatecar.php",data:{userID:t,goodsID:o,number:e},success:function(o){console.log(o),1===parseInt(o)?alert("已加入购物车"):0===parseInt(o)&&alert("亲，网络不顺畅哦，没有添加成功呢")}})}})}})}else{var s=$('<div class="no-goods"> <div class="pic"> <p>这里没有任何内容呢~</p> <div class="img"></div> </div> <p class="btn-go" id="btn-go"> 去逛逛 </p> </div>');$("#scroll").empty(),$("#scroll").append(s),$("#btn-go").on("touchstart",function(){window.location.href="index.html"})}}})}myScroll=new IScroll("#scroll",{mouseWheel:!0,scrollbars:!0}),console.log(classId),console.log(userId),console.log(selectText),(classId||null!=classId)&&($("#headText").text("商品列表"),t("http://datainfo.duapp.com/shopdata/getGoods.php",null,classId),o("http://datainfo.duapp.com/shopdata/getGoods.php",null,classId)),(selectText||null!=selectText)&&($("#headText").text("商品列表"),t("http://datainfo.duapp.com/shopdata/selectGoodes.php",null,null,selectText),o("http://datainfo.duapp.com/shopdata/selectGoodes.php",null,null,selectText)),(userId||null!=userId)&&(t("http://datainfo.duapp.com/shopdata/getCar.php",userId),(collection||null!=collection)&&$("#headText").text("我的收藏"),o("http://datainfo.duapp.com/shopdata/getCar.php",userId,null,null))});
var express = require('express');

//配置数据库参数
var mongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/zxw";

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//取消订单
router.post('/deleteOrder',function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	var order = req.body;
		var removeData = function(db,callback){
		var conn = db.collection("order");
		console.log(order.orderID);
		conn.remove({orderID:order.orderID},function(err,results){
		    if(err){
		        console.log("删除数据失败");
		        res.send("0");
		    }else{
		    	console.log("删除成功")
		        //删除成功
		        res.send('1');
		        //res.send('删除一条数据成功');
		    }
		})
	}
	mongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			console.log("数据库连接失败")
			res.send("数据库连接失败");
		}else{
//			res.send("数据库连接成功");
			removeData(db,function(results){
				if(err){
//					console.log(results);
					res.send("删除失败");
				}else{
					res.send(results);
				}
			})
		}
	})
})

//获取用户订单信息
router.get('/order/:id', function(req, res, next) {
	//获取用户id
	var userid = req.params.id;
	console.log(req.params.id);
	//设置请求头，允许跨域请求
	res.setHeader("Access-Control-Allow-Origin","*");
	var findData = function(db,callback){
		//链接集合
		var conn = db.collection("order");
		conn.find({userId:userid}).toArray(function(err,results){
			if(err){
				console.log("查询失败"+err)
			}else{
				callback(results);
			}
		})
	}
	//链接数据库
	mongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			console.log("数据库连接失败")
			res.send("数据库连接失败");
		}else{
//			res.send("数据库连接成功")
			findData(db,function(results){
				if(results.length>0){
//					console.log(results);
					res.send(results);
				}else{
					res.send("sorry,暂无订单信息")
				}
			})
		}
	})
  
});
module.exports = router;

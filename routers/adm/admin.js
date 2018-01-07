// 后台管理路由
const express=require('express');
const mysql = require('mysql');
const fs=require('fs');
const path=require('path');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'secondhandnet'
});
module.exports=function(){
	var route=express.Router();
	// 登录
	route.get('/',function(req,res,next){
         res.render('login.ejs');
         // next();
	})
	route.post('/',function(req,res,next){
	    // express deprecated req.param(name): Use req.params, req.body, or req.query 
        var usename=req.body.usename;
        var password=req.body.password;
        var repassword=req.body.repassword;
        var data1=[];
        // console.log(req.body)
	        // if(!usename||!password||!repassword){
         //         res.send('您的密码或账号没有填写！');
	        // }else{
	        	db.query(`SELECT * FROM admin 
        	WHERE usename='${usename}' AND password='${password}' AND
        	repassword='${repassword}'`,(err,data)=>{
	             if(err){
	             	res.status(404).send('database error');
	             }else{
	             	// console.log(data.length)
	             	if(data.length==0){
	             		// res.redirect('/adm/')
	             		data1.id=1;
	             		// res.json(data1)
	             		res.send('您没有管理员权限！')
	             	}else{
	             		data1.id=2;
	             	    res.redirect('/adm/login')
	             	}
	              }
               })
	        })
	// 获取轮播图
	// route.get('/login',function(req,res,next){
	// 	res.redirect('/adm/login');
	// })
	route.get('/login', (req, res) => {
           if (req.query.act == 'del') {
                db.query(`SELECT * FROM banner WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('database error').end();
                    } else {
                        fs.unlink('public/upload/' + data[0].src, (err, data) => {
                            if (err) {
                                console.error(err)
                                res.status(500).send('database error').end();
                            } else {
                                db.query(`DELETE FROM banner WHERE ID=${req.query.id}`, (err, data) => {
                                    if (err) {
                                        console.error(err)
                                        res.status(500).send('database error').end();
                                    } else {
                                        // res.redirect('/adm/login');
                                        res.render('admin.ejs')
                                    }
                                })
                            }
                        })
                    }
                })

            } else {
                
                db.query(`SELECT * FROM banner `, (err, data) => {
                    if (err) {
                        res.status(500).send('database error').end();
                    } else {
                        res.render('admin.ejs', { data })
                    }
                })
            }
        });
	route.post('/login',function(req,res,next){
		// [ { fieldname: 'text',
  //   originalname: 'SFSantaCon_ZH-CN11213292356_1920x1080.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: './public/upload',
  //   filename: '44687cbca53c4a6b22790901dbeb6006',
  //   path: 'public\\upload\\44687cbca53c4a6b22790901dbeb6006',
  //   size: 347383 } ]
          // console.log(req.files);
            var title=req.body.title;
            var des=req.body.des;
            var ext = path.parse(req.files[0].originalname).ext;
            console.log(req.files)
            var oldfile = req.files[0].path;
            var newfile = req.files[0].path + ext;
            var file = req.files[0].filename + ext;
             // console.log(file);
            fs.rename(oldfile,newfile,(err)=>{
              if (err) {
                    res.status(404).send('error').end()
                } else {
                    // console.log(f1)
                    // var str = req.files[0].filename + path.ext(req.files[0].originalname)
                    db.query(`INSERT INTO banner(title,description,src) VALUES(
                    '${title}','${des}','${file}')`, (err, data) => {
                        if (err) {
                        	console.log(err)
                            res.send('database error');
                        } else {
                            res.redirect('/adm/login'); 
                        }
                    })
                }
             })
          // res.render('./admin.ejs')

	})
	return route;
}
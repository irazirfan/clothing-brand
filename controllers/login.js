var express = require('express');
var db		= require.main.require('./models/db');
var router = express.Router();


router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	
	var sql = "select * from user where email='"+req.body.email+"' and password='"+req.body.password+"'";
	db.getResult(sql, function(results){

		if(results.length > 0){
			req.session.email = req.body.email;
			res.redirect('/admin');
		}else{
			res.send('invalid email/password...');
		}
	});
});


module.exports = router;
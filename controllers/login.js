var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	var data = {
		email: req.body.email,
		password: req.body.password,
	};
	user.validate(data, (result)=> {
		if(result.length>0){
			req.session.id = result[0].id;
			req.session.email = result[0].email;
			req.session.name = result[0].name;
			req.session.user_type = result[0].user_type;

			if(result[0].user_type === 'admin')
				res.redirect('/admin');
			else
				res.redirect('/customer');
		}
		else {
			res.send("Invalid email/password");
		}
	});
});


module.exports = router;
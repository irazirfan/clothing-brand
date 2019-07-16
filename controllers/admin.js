var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('*', function(req, res, next){
	if(req.session.email != null){
		if(req.session.user_type === 'admin')
			next();
		else
			res.redirect('/customer');
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	res.render('admin/index');
});

router.get('/user_list', function(req, res){
	user.getAll(function(results){
		res.render('admin/userList', {userList: results});
	});
});

router.get('/edit/:id', function(req, res){
	user.getById(req.params.id, function(result){
		res.render('admin/edit', {user: result[0]});
	});
});

router.post('/edit/:id', function(req, res){
	var data = {
		id: req.params.id,
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
	};
	user.update(data, function(status){
		if(status){
			res.redirect('/admin/user_list');
		}else{
			res.redirect('/admin/edit/'+req.params.id);
		}
	});
});

router.get('/add', function(req, res){
	res.render('admin/add');
});

router.post('/add', function(req, res){
	var data = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		user_type: 'admin',
	};
	user.insert(data, function(status){
		if(status){
			res.redirect('/admin/user_list');
		}else{
			res.redirect('/admin/add');
		}
	});

});

router.get('/delete/:id', function(req, res){
	var data = {
		id: req.params.id,
	};
	user.delete(data, function(status){
		if(status){
			res.redirect('/admin/user_list');
		}else{
			res.redirect('/admin/user_list/');
		}
	});
});

module.exports = router;
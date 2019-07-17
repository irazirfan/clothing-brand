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
	};
	user.getByEmail(data, function (results) {
		if (results.length > 0) {
			res.render('admin/add', {page: 'SignUp', menuId: 'signup', email_exist: 'yes'});
		}
		else {
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
					res.render('admin/add', {page: 'SignUp', menuId: 'signup', email_exist: 'no'});
				}
			});
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

router.get('/productList', function(req, res){
	user.getAllProduct(function(results){
		res.render('admin/productList', {productList: results});
	});
});

router.get('/add-product', function(req, res){
	res.render('admin/add-product');
});

router.post('/add-product', function(req, res){
	var data = {
		name: req.body.name,
		category: req.body.category,
		price: req.body.price,
		quantity: req.body.quantity,
		preference: req.body.preference,
		description: req.body.description,
	};
	user.insertProduct(data,function(status){
		if(status){
			res.redirect('/admin/productList');
		}else{
			res.redirect('/admin/add-product');
		}
	});
});


router.get('/edit-product/:id', function(req, res){
	var id = req.params.id;
	user.getProductById(id, function(result){
		res.render('admin/edit-product', {product: result[0]});
	});
});

router.post('/edit-product/:id', function(req, res){
	var data = {
		id: req.params.id,
		name: req.body.name,
		category: req.body.category,
		price: req.body.price,
		quantity: req.body.quantity,
		preference: req.body.preference,
		description: req.body.description,
	};
	user.updateProduct(data, function(status){
		if(status){
			res.redirect('/admin/productList');
		}else{
			res.redirect('/admin/edit-product/'+req.params.id);
		}
	});
});

router.get('/delete-product/:id', function(req, res){
	var id = req.params.id;

	user.deleteProduct(id, function(status){
		if(status){
			res.redirect('/admin/productList');
		}else{
			res.redirect('/admin/productList');
		}
	});
});


module.exports = router;
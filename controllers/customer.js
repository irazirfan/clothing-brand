var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('/signup', function(req, res){
    res.render('customer/signup');
});

router.post('/signup', function(req, res){
    var data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        user_type: 'customer',
    };
    user.insert(data, function(status){
        if(status){
            res.redirect('/login');
        }else{
            res.redirect('/customer/signup');
        }
    });

});

router.get('*', function(req, res, next){
    if(req.session.email != null){
        if(req.session.user_type === 'customer')
            next();
        else
            res.redirect('/admin');
    }else{
        res.redirect('/login');
    }
});

router.get('/', function(req, res){
    user.getAllProduct(function(results){
        res.render('customer/index', {productList: results});
    });
});

router.get('/cart', function(req, res){
    var cart = req.session.cart;

    user.getAllCart(cart ,function(results){
        res.render('customer/cart', {cartList: results});
    });
});

router.get('/cart/:id', function(req, res){

    user.getProductById(req.params.id, function(result){
        if(result.length > 0) {
            var data = {
                name: result[0].name,
                category: result[0].category,
                price: result[0].price,
            };
            user.insertCart(data, function(status){
                if(status){
                    var flag = req.session.cart;
                    flag += 1;
                    req.session.cart = flag;
                    console.log(flag);
                    res.redirect('/customer');
                }else{
                    res.send("Failed adding product to cart");
                }
            });
        }
    });
});

router.get('/cart-delete/:id', function(req, res){
    user.deleteFromCart(req.params.id, function(result){
        var cart = req.session.cart;
        cart -= 1;
        req.session.cart = cart;
        res.redirect('/customer/cart');
    });
});



module.exports = router;
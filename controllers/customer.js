var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


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
    res.render('customer/index');
});


module.exports = router;
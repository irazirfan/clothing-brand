var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('*', function(req, res, next){
    if(req.session.email != null){
            next();
    }else{
        res.redirect('/login');
    }
});

router.get('/', function(req, res){
    var data = {
            email: req.session.email,
        };
    user.getByEmail(data, function(result){
        res.render('profile/profile', {user: result[0]});
    });
});

router.post('/', function(req, res){
    var data = {
        password: req.body.password,
        name: req.body.name,
        email: req.session.email,
    };
    user.updateByEmail(data,function(status){
        if(status){
            // update session with new name to reflect changes immediately
            req.session.name = req.body.name;

            if(req.session.user_type ==='admin')
                res.redirect('/admin');
            else{
                res.redirect('/customer');
            }
        }else{
            res.redirect('/profile');
        }
    });

});


module.exports = router;
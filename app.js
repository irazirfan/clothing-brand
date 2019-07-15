//DEC
var express 		= require('express');
var ejs 			= require('ejs');
var bodyParser 		= require('body-parser');
var expressSession 	= require('express-session');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var admin 			= require('./controllers/admin');
var customer        = require('./controllers/customer');
var profile         = require('./controllers/profile');
var app 			= express();


//CONFIG
app.set('view engine', 'ejs');


//MIDDLEWARE
app.use(bodyParser.urlencoded({'extended': false}));
app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use(function(req, res, next) {
	res.locals.name = req.session.name;
	res.locals.user_type = req.session.user_type;
	res.locals.id = req.session.id;
	next();
});
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/customer', customer);
app.use('/profile', profile);


//ROUTING
app.get('/', function(req, res){
	res.redirect('/login');
});


app.get('/setcookie', function(req, res){
	res.cookie('my_cookie', 'xyxyxyxyxyxxy');
	res.send('done!');
});

app.get('/viewcookie', function(req, res){
	
	res.send(req.cookies['my_cookie']);
});


app.get('/rmcookie', function(req, res){
	res.clearCookie('my_cookie');
	res.send('removed!');
});





//SERVER STARTUP
app.listen(3000, function(){
	console.log('Server started at 3000....');
});



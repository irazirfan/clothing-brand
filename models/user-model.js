var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from user where id="+id;
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	getByEmail: function(user, callback){
		var sql = "select * from user where email='"+user.email+"' ";
		db.getResult(sql,function(result){
			callback(result);
		});
	},

	getProductById: function(id, callback){
		var sql = "select * from product where id="+id;
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	getProductByMale: function(preference, callback){
		var sql = "select * from product where preference='"+preference;
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	getProductByFemale: function(preference, callback){
		var sql = "select * from product where preference='"+preference;
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	getProductCategories: function(callback){

		var sql = "select distinct category from product";
		db.getResult(sql, function(results){
			callback(results);
		});
	},

	validate: function(user, callback){
		var sql = "select * from user where email='"+user.email+"' and password= '"+user.password+"' ";
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	getAll: function(callback){

		var sql = "select * from user";
		db.getResult(sql, function(results){
			callback(results);
		});
	},

	getAllProduct: function(callback){

		var sql = "select * from product";
		db.getResult(sql, function(results){
			callback(results);
		});
	},

	getAllCart: function(cart ,callback){

		var sql = "select * from cart order by id desc limit "+cart;
		db.getResult(sql, function(results){
			callback(results);
		});
	},

	insert: function(user, callback){
		var sql = "insert into user values ('', '"+user.email+"','"+user.password+"', '"+user.name+"', '"+user.user_type+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	insertProduct: function(product, callback){
		var sql = "insert into product values ('', '"+product.name+"','"+product.category+"', '"+product.price+"', '"+product.quantity+"', '"+product.preference+"', '"+product.description+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	insertCart: function(user, callback){
		var sql = "insert into cart values ('', '"+user.name+"','"+user.category+"', '"+user.price+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	updateByEmail: function(user, callback){
		var sql = "update user set password= '"+user.password+"', name= '"+user.name+"' where email= '"+user.email+"' ";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	updateProduct: function(product, callback){
		var sql = "update product set name='"+product.name+"', category='"+product.category+"', price='"+product.price+"', quantity= "+product.quantity+", preference='"+product.preference+"', description='"+product.description+"' where id="+product.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	delete: function(user, callback){
		var sql = "delete from user where id="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	deleteProduct: function(id, callback){
		var sql = "delete from product where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	deleteFromCart: function(id, callback){
		var sql = "delete from cart where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	},

};
var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from user where id="+id;
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
	insert: function(user, callback){
		var sql = "insert into user values ('', '"+user.email+"','"+user.password+"', '"+user.name+"', '"+user.user_type+"')";
		db.execute(sql, function(status){
			callback(status)
		});
	},
	update: function(user, callback){
		var sql = "update user set email='"+user.email+"', password='"+user.password+"', name='"+user.name+"' where id="+user.id;
		db.execute(sql, function(status){
			callback(status)
		});
	},
	delete: function(user, callback){
		var sql = "delete from user where id="+user.id;
		db.execute(sql, function(status){
			callback(status)
		});
	}
}
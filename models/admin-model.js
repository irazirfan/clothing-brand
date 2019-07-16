var db = require('./db');

module.exports = {

    getById: function(id, callback){
        var sql = "select * from product where id="+id;
        db.getResult(sql, function(result){
            callback(result);
        });
    },

    getAll: function(callback){

        var sql = "select * from product";
        db.getResult(sql, function(results){
            callback(results);
        });
    },
    insert: function(product, callback){
        var sql = "insert into product values ('', '"+product.email+"','"+product.password+"', '"+product.name+"', '"+product.product_type+"')";
        db.execute(sql, function(status){
            callback(status);
        });
    },
    update: function(product, callback){
        var sql = "update product set email='"+product.email+"', password='"+product.password+"', name='"+product.name+"' where id="+product.id;
        db.execute(sql, function(status){
            callback(status);
        });
    },
    
    delete: function(product, callback){
        var sql = "delete from product where id="+product.id;
        db.execute(sql, function(status){
            callback(status)
        });
    }
};
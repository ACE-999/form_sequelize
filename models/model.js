var dbConfig=require("../db_config/db_config");
var Sequelize=require("sequelize");
// var bodyparser=require("body-parser");


var sequelize=new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operationsAliases: false,
	pool: {
	max: dbConfig.pool.max,
	min: dbConfig.pool.min,
	acquire: dbConfig.pool.acquire,
	idle: dbConfig.pool.idle
	}
});

var db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.USERS=require("./structure")(sequelize,Sequelize);

module.exports=db;
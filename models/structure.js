// const { sequelize, Sequelize } = require("./model");

module.exports=(sequelize,Sequelize)=>{
    var temp=sequelize.define("forms", {
        uid: {
            type: Sequelize.STRING
        },
        upass: {
            type: Sequelize.STRING
        }
    });
    return temp;
}
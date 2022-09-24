module.exports={
    host: "localhost",
    user: "root",
    password: "12345",
    database: "login",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
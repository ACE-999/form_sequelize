var express = require("express");
var ejs = require("ejs");
var path = require("path");
// var bodyParser=require("body-parser");
// var mysql=require("mysql");
// var mysql2=require("mysql2");
var cors=require('cors');
var dotenv=require('dotenv').config();
var route=require("./routes/routes")
var jwt=require("jsonwebtoken");

var app=express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);


app.use("/", route);

//jwt test
app.get("/jwt", (req, res)=> {
    res.json({
        message: "This is an API"
    });
})
app.post("/jwt/post", (req,res)=>{
    res.json({
        message: "JWT Post"
    });
})

app.listen(process.env.PORT, 
    console.log('Server is running on port', process.env.PORT)
);
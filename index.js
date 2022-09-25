var express = require("express");
var ejs = require("ejs");
var path = require("path");
// var bodyParser=require("body-parser");
// var mysql=require("mysql");
// var mysql2=require("mysql2");
var cors=require('cors');
var dotenv=require('dotenv').config();
var route=require("./routes/routes")

var app=express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.engine("ejs", require("ejs").__express);
app.set("view engine", "ejs");


app.use("/", route);
app.listen(3000);
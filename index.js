var express = require("express");
var ejs = require("ejs");
var path = require("path");
// var bodyParser=require("body-parser");
// var mysql=require("mysql");
// var mysql2=require("mysql2");
var cors=require('cors');
var dotenv=require('dotenv').config();
var route=require("./routes/routes")
var nodemailer = require('nodemailer');

var app=express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.engine("ejs", require("ejs").__express);
app.set("view engine", "ejs");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adityap129btechcse2023@kccitm.edu.in',
      pass: 'adityaPrakash123'
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
  });
  
  var mailOptions = {
    from: 'adityap129btechcse2023@kccitm.edu.in',
    to: 'gam1n6.x3ro@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Hey! How you doin...'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } 
    else {
      console.log('Email sent successfully!: ' + info.response);
    }
  });

app.use("/", route);
app.listen(3000);
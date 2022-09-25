// var bodyparser=require("body-parser");
// var urlencodedparser=bodyparser.urlencoded({extended: false});

var express=require("express");
var mysql=require("mysql");
var mysql2=require("mysql2");
var dotenv=require("dotenv").config()
var db=require("../models/model");
var USERS=require("../models/structure");
var transporter=require("../controllers/nodemailer")

db.sequelize.sync();

var users=db.USERS;

// //db connection
// var connection=mysql2.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "12345",
//     database: "login"
// });

// connection.connect(function(error) {
//     if (error) throw error;
//     console.log("Connected!");
//   });

module.exports={
    registerPage: (req,res)=>{
        res.render("register", {
            message: ''
        })
    },

    checkRegister: async (req,res)=>{
        var data={
            uid: req.body.email,
            upass: req.body.password
        }

        users.create(data)
            .then(data=>{
                return res.send("Profile created!!!");
            })
            .catch(err=>{
                return res.status(500).send({
                    message: err.message || "Something went wrong while creating the profile!!!"
                });
            });
    },

    loginPage: function(req,res){
        res.render("login", {
            message: ''
        })
    },

    checkLogin: async (req,res)=>{
        // res.send("Logged in!!!")
        // console.log(req.body);
        // //res.send(req.body);

        var id=req.body.email;
        var password=req.body.password;

        var result=await users.findOne({where: {uid: id}});
        if(result===null)
        {
            res.render("login", {
                message: "User not found!"
            })
            //res.send("User not found!");
            console.log("Not Found!");
        }
        else
        {
            if(result.upass==password){
                console.log(result);
                res.send("Successfully Logged In!");
            }
            else{
                res.render("login", {
                    message: "Wrong Password!"
                })
                //res.send("Wrong Password!");
            }
        }
    },
    
    forgotPage: (req,res)=>{
        res.render("forgotPage", {
            message: ""
        })
    },

    sendmail: (req,res)=>{

        var loginId=req.body.email;
        console.log(loginId);
        
        var mailOptions = {
            from: 'adityap129btechcse2023@kccitm.edu.in',
            to: loginId,
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
    }
}
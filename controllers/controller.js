// var bodyparser=require("body-parser");
// var urlencodedparser=bodyparser.urlencoded({extended: false});

var express=require("express");
var mysql=require("mysql");
var mysql2=require("mysql2");
var dotenv=require("dotenv").config()
var db=require("../models/model");
var USERS=require("../models/structure");
var transporter=require("../controllers/nodemailer")
var jwt=require("jsonwebtoken");

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
                
                //jwt generation
                var user={
                    user: result.uid  
                } 
                var token=jwt.sign(user, "secretkey")
                console.log(token);

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

    sendmail: async (req,res)=>{

        var loginId=req.body.email;
        console.log(loginId);
        var result=await users.findOne({where: {uid: loginId}});

        if(result==null)
        {
            res.render("forgotPage", {
                message: "User NOT Found!, Please Register..."
            })
            console.log("User NOt Found!");
        }
        else
        {
            var tokenstring = randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            });
            console.log(tokenstring);
            var tokendata={
                uid: loginId,
                token: tokenstring,
                state: "ACTIVE"
            }
            emailverify
                .findOne({where: {uid: loginId}})
                .then(function(data){
                    if(data)
                    {
                        data.update({token: tokenstring})
                    }
                    else{
                        data=emailverify.create(tokendata)
                    }
                    data=JSON.parse(JSON.stringify(data));
                    var tokenstr=data.token;
                    var link="http://localhost:3000/verify-email/"+tokenstr;
                    console.log(link);
                    let info=transporter.sendMail({
                        from: "",
                        to: loginId,
                        subject: "Password Reset email",
                        template: "email",
                        context: {
                            name: "User",
                            url: link,
                            company: tokenstr
                        }
                    });
                })

                .then(tokendata=>{
                    res.render("mailsent", {
                        message: ""
                    })  
                })
                .catch(err=>{
                    console.log(err);
                    res.render("mailsent", {
                        message: "error"
                    })
                })
        }
        
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
    },

    verifyToken: async(req, res, next)=>{
        const bearerHeader=req.headers["authorization"];
        if( typeof bearerHeader !== "undefined")
        {
            const bearer=bearerHeader.split(" ");
            const bearerToken=bearer[1];
            req.token=bearerToken;
            next();
        }
        else{
            res.sendStatus(403);
        }
    }
}
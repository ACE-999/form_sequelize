var express=require("express");
var controller=require("../controllers/controller");
var router=express.Router();
var bodyparser=require("body-parser");
const { verifyToken } = require("../controllers/controller");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(bodyparser.urlencoded({extended: true}));

router.get("/", controller.loginPage);
router.get("/login", controller.loginPage);
router.post("/checkLogin", controller.verifyToken, (req,res)=>{
    jwt.verify(req.token, "secretkey", (err, authData)=>{
        if(err)
        {
            res.sendStatus(403);
        }
        else{
            res.send({
                message: "jwt verify",
                authData
            });
        }
    });
}, controller.checkLogin);

router.get("/register", controller.registerPage);
router.post("/checkRegister", controller.checkRegister);

router.get("/forgot-password", controller.forgotPage);
router.post("/forgotmail", controller.sendmail);

module.exports=router;
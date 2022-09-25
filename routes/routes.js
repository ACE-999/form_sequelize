var express=require("express");
var controller=require("../controllers/controller");
var router=express.Router();
var bodyparser=require("body-parser");

router.use(express.json());
router.use(bodyparser.urlencoded({extended: true}));

router.get("/", controller.loginPage);
router.get("/login", controller.loginPage);
router.post("/checkLogin", controller.checkLogin);

router.get("/register", controller.registerPage);
router.post("/checkRegister", controller.checkRegister);

router.get("/forgot-password", controller.forgotPage);
router.post("/forgotmail", controller.sendmail);

module.exports=router;
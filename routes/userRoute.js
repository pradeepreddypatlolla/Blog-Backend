const express=require('express')
const router=express.Router()
const {registerController,logoutController, getBlogsByUser}=require('../controllers/userController')
const {loginController} =require('../controllers/userController')
const isAuthorized = require("../middleware/auth");
router.post("/register",registerController)
router.post("/login",loginController)
router.get('/blogs',isAuthorized,getBlogsByUser)
router.get('/logout',logoutController)
module.exports=router
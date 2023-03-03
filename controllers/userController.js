const User=require('../models/userModel')
const Blog=require('../models/blogModel')
// const file=require('../views/login.html')
const path=require('path')
const registerController=async function(req,res,next){

    try {
        const {name,emailId,password}=req.body
        let user=await User.findOne({emailId:emailId})
        if(user){
           return res.status(400).json({
                success:false,
                message:"User Already exists"
            })
        }
        user=await User.create({name,emailId,password})
        res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.messages
        })
        
    }
}


const loginController=async function(req,res,next){

    try {
        
        const {emailId,password}=req.body
        console.log(emailId,password);
        let user=await User.findOne({emailId:emailId})
        if(!user){
           return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        let isMatched=await user.checkPassword(password)
        if(!isMatched){
           return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
        let token=await user.generateToken();
       let cookieOption={expies:new Date(Date.now())+5000,
       
        httpOnly: true,
        sameSite: 'None',
        secure: true,}
       console.log(token);
        res.status(200).cookie("token",token,cookieOption)
        console.log(res.cookies);
        res.json({
            success:true,
            user
        })

      //  res.status(200).cookie("token",token,cookieOption).redirect('/blog/editor')

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}
const userProfileController=async (req,res,next)=>{

    try {
        const {emailId}=req.user
        let blogs= await Blog.find({email:emailId})
        console.log(blogs);
    
        res.status(200).json(
            {success:true,
            blogs
            }
            )
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
   
}
const logoutController=async (req,res,next)=>{

  
  res.clearCookie("token").status(200).json({success:true,message:"Logged out!"})

}
module.exports={registerController,loginController,userProfileController,logoutController}
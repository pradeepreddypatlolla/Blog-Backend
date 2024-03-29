const User=require('../models/userModel')
const Blog=require('../models/blogModel')
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
        
        let user=await User.findOne({emailId:emailId});
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
        delete user.password; // to remove password so that its not sent in response
       
        res.json({
            success:true,
            user,
            token
        })

     

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}
const getBlogsByUser=async (req,res,next)=>{

    try {
        const {_id}=req.user
        let blogs= await Blog.find({userId:_id})
       
    
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
module.exports={registerController,loginController,getBlogsByUser,logoutController}
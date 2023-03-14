
const Blog =require('../models/blogModel')
const {cloudinary}=require('../config/cloudinary');
const User = require('../models/userModel');

 const blogSubmitController=async (req,res)=>{
    console.log(req.body.data);
    try {
        const {_id}=req.user
       
       let blog= new Blog({userId:_id, title:req.body.title ,content:req.body.content , comments:[],imgUrls:req.body.imgUrls})
       let newBlog=await blog.save()
       res.status(200).json({
        success:true,
        newBlog
       }
        )
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
   

}

const blogUpdateController=async(req,res,next)=>{
    console.log(req.body.data);
    try {
        const {emailId}=req.user
       
        let blogId=req.body.blogId
       let blog= await Blog.findByIdAndUpdate({_id:blogId},
        {
            title:req.body.title,content:req.body.content,imgUrls:req.body.imgUrls
       },
       )

       res.status(200).json({
        success:true,
        blog
       }
        )
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message})
        
    }

}

const blogDeleteController=async(req,res,next)=>{
   console.log("delete");
    try {
       
        let blogId=req.body.blogId
        let blog=await Blog.findById(blogId)
        let imgUrls=blog.imgUrls
        
        for(let i=0;i<imgUrls.length && imgUrls[i]!==null;i++){
            let splitURL=imgUrls[i].split('/')
            //console.log(splitURL[splitURL.length-1].split('.')[0]);
            let assetName=splitURL[splitURL.length-1].split('.')[0]
            cloudinary.uploader.destroy(assetName)
        }
       
        await Blog.findByIdAndDelete({_id:blogId})

       //console.log(blog);
      
       res.status(200).json({
        success:true,
        message:"Blog deleted successfully"
       }
        )
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message})
        
    }


}

const blogCommentsSubmitController=async (req,res)=>{
    try {
       
        const blogId=req.body.blogId
       
        let blog=await Blog.findById(blogId)
        console.log(blog);
        blog.comments.push({comment:req.body.comment,user:req.user.emailId})
        let newBlog=await blog.save()
        res.status(200).json({
            success:true,
            newBlog})
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message})
    }
}

const blogUploadPhoto=(req,res,next)=>{


   
    cloudinary.uploader.upload(req.body.data,{
        upload_preset:'aqaepvlw'
    }).then((result) => {
        res.status(200).send({
          message: "success",
          url:result.url,
        });
      }).catch((error) => {
        
        res.status(500).send({
          message: "failure",
          error,
        });
      });



}
const getBlogs=async (req,res)=>{
    try{
      
        
        let blogs=await Blog.find()
        console.log(blogs);
        res.status(200).json({
            success:true,
            blogs
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
        
    }
}



const getBlogById=async (req,res)=>{

    try {
        console.log(req.params.id);
        let blog=await Blog.findById(req.params.id)
       res.status(200).json({
        success:true,
        blog
       })
       
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message: error.message
        })
    }


  
}

 
module.exports={blogSubmitController,blogUpdateController,blogDeleteController,blogUploadPhoto,getBlogById,getBlogs,blogCommentsSubmitController}
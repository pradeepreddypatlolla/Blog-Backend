const mongoose=require('mongoose')

const blogSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'User'
    },
    
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    comments:{
        type:Array,
        
    },
    imgUrls:{
        type:Array
    }
},
{
    timestamps:true
}
)

const Blog=mongoose.model("Blog",blogSchema)
module.exports=Blog
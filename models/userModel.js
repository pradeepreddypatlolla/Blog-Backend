const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema= new mongoose.Schema(
    {
    name:{
        type:String,

        required:true
    },
    emailId:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }

},{
    timestamps:true
}
)


userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})
userSchema.methods.checkPassword=async function(password){
    console.log(password,this.password);
    let isMatched= await bcrypt.compare(password,this.password)
    console.log(isMatched);
    return isMatched
}
userSchema.methods.generateToken=async function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}
const User=mongoose.model("User",userSchema)
module.exports=User
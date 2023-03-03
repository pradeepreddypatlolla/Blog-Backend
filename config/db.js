const mongoose=require('mongoose')

const dbconnect=async()=>{
try {

  const conn =  await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        
    })

    console.log("Connected to Mongo DB: "+conn.connection.host);
    
} catch (error) {

    console.log(`Error: ${error}`);
    process.exit()
    
}
}
module.exports=dbconnect


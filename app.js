const express=require('express')
const app=express()
const dotenv=require('dotenv')
const dbconnect = require('./config/db')
const blogRouter=require('./routes/blogRoute')
const userRouter=require('./routes/userRoute')
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const cors = require('cors')
dotenv.config()
dbconnect()

app.use(cors({
    credentials: true,
    origin:['http://localhost:3000','https://blog-frontend-umjs.onrender.com']
}))

app.use(bodyParser.urlencoded({
    limit:'50mb',
    extended: true
}));
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser())
app.use('/blogs',blogRouter)
app.use('/user',userRouter)
app.listen(process.env.PORT,()=>{
    console.log("Server is running at "+process.env.PORT)
})

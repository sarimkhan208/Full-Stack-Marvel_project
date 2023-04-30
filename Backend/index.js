require("dotenv").config()
const express = require("express")
const connection = require("./connections/connection")
const userRouter = require("./routes/user.routes")
const marvelRouter = require("./routes/marvel.routes")
const auth = require("./middleware/auth.middleware")
const cors = require("cors")
const MarvelModel = require("./models/marvel.model")
const app = express()
app.use(express.json())
app.use(cors())


app.use("/user",userRouter)

app.get("/marvel",async (req,res)=>{
    try{
        const superHero = await MarvelModel.find()
        res.status(200).send(superHero)
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})
// PROTECTED ROUTES
app.use(auth)
app.use("/marvel",marvelRouter)


app.listen(process.env.PORT, async ()=>{
    try{
        await connection
        console.log("Connected to Mongo DB")
    }catch(err){
        console.log(err)
    }
    console.log("server is running")
})



// {
//     "image":"image_url",
//     "title":"batman",
//     "actor_name":"bruce wayne"
//   }

// {
//     "email":"ironman@gmail.com",
//     "pass":"ironman@123"
// }
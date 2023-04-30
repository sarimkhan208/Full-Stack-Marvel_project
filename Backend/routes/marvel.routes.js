const express = require("express")
const MarvelModel = require("../models/marvel.model")
const marvelRouter = express.Router()


marvelRouter.post("/create",async (req,res)=>{
    try{
        const superHero = new MarvelModel(req.body)
        await superHero.save()
        res.status(200).send({"msg":"Super Hero has been added"})
    }catch(err){
        res.status(400).send({"Error":err.message})
    }
})




// marvelRouter.get("/",async (req,res)=>{
//     try{
//         const superHero = await MarvelModel.find({user_id:req.body.user_id})
//         res.status(200).send(superHero)
//     }catch(err){
//         res.status(400).send({"err":err.message})
//     }
// })




marvelRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const avegerData = await MarvelModel.findOne({_id:id})
    try{
        if(req.body.user_id !== avegerData.user_id){
            res.status(200).send({"msg":"You are not authorized to do this action"})
        }else{
            await MarvelModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"Avenger data has been updated"})
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})



marvelRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const avegerData = await MarvelModel.findOne({_id:id})
    // console.log(id)
    try{
        if(req.body.user_id !== avegerData.user_id){
            res.status(200).send({"msg":"You are not authorized to do this action"})
            console.log("You are not authorized to do this action")
        }else{
            await MarvelModel.findByIdAndDelete({_id:id},req.body)
            res.status(200).send({"msg":"Avenger data has been deleted"})
            console.log("Avenger data has been deleted")
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})





module.exports = marvelRouter

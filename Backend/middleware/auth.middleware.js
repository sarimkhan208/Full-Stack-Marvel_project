const jwt = require("jsonwebtoken")

const auth = async (req,res,next) => {
    const token = req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token.split(" ")[1],"sarim")
            if(decoded){
                req.body.posted_by = decoded.posted_by
                req.body.user_id = decoded.user_id
                next()
            }else{
                res.send({"msg":"Pls Login!!!"})
            }
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.status(200).send({"msg":"Please Login first"})
    }
}

module.exports = auth
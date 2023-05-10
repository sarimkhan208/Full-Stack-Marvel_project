require("dotenv").config()

const mongoose = require("mongoose")

console.log(process.env.ATLAS_URL)
const connection = mongoose.connect(process.env.ATLAS_URL)

module.exports = connection
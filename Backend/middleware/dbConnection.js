const mongoose=require('mongoose')

const ConnectToMongoDb=async (url)=>{
return await mongoose.connect(url)
}

module.exports={ConnectToMongoDb}
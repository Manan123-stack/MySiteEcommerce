const jwt=require("jsonwebtoken")

const adminAuth=async (req,resizeBy,next)=>{
      try {
        const {token} =req.headers

        if(!token){
          return resizeBy.json({success:false,message:"Not Authorized"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
         
         return resizeBy.json({success:false,message:"not Authorized"})
        }
        next()

      } catch (error) {
        console.log(error)
        resizeBy.json({success:false,message:error.message})
      }
}

module.exports={adminAuth}
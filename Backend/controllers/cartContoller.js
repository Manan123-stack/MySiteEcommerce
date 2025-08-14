
const userModel=require('../models/userModel')

//add products to user cart

const addToCart=async (req,res)=>{
    try {
        const {userId,itemId,size}=req.body
          console.log()
          const userData=await userModel.findById(userId)
              let cartData = userData.cartData
           console.log(userData,"hello")
          if(cartData[itemId]){
            console.log(cartData,"hello")
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1
            }
            else{
                cartData[itemId][size]=1
            }
          }else{
            cartData[itemId]={}
            cartData[itemId][size]=1
          }
       await userModel.findByIdAndUpdate(userId,{cartData})
   
       res.json({success:true,message:"Added To Cart"})


    } catch (error) {
        console.log(error)
         res.json({success:false,message:error.message})
    }
}

//update user  cart

const updateCart=async (req,res)=>{
    try {
        
         const {userId,itemId,size,quantity}=req.body
         const userData=await userModel.findById(userId)
          let cartData =await userData.cartData
        
        cartData[itemId][size]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})

       res.json({success:true,message:"Cart updated"})



    } catch (error) {
        console.log(error)
         res.json({success:false,message:error.message})
    }

}

//get user cart data

const getUserCart=async (req,res)=>{
    try {
        const {userId}=req.body
        console.log(userId)
        const userData=await userModel.findById(userId)
          
        console.log(userData)
        res.json({success:true ,cartData:userData.cartData})

    } catch (error) {
        console.log(error)
         res.json({success:false,message:error.message})
        
    }

}

module.exports={
    addToCart,
    updateCart,
    getUserCart
}
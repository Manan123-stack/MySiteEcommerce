const orderModel=require('../models/orderModel.js')
const userModel = require('../models/userModel.js')


//Placing orders using COD Method
const placedOrder=async (req,res)=>{
      try {
          const {userId,items,amount,address}=req.body

          const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
          }
          const newOrder=new orderModel(orderData)
          await newOrder.save()

          await userModel.findByIdAndUpdate(userId,{cartData:{}})
            
            res.json({success:true,message:"order Placed"})

      } catch (error) {
        console.log(error)
         res.json({success:false,message:error.message})
      }

}

//Placing orders using Stripe Method
const placedOrderStripe=async (req,res)=>{
    
}

//Placing orders using Razorpay Method
const placedOrderRazorpay=async (req,res)=>{
    
}


//All Orders Data For Admin Panel
const allOrders=async (req,res)=>{
      try {
          const orders=await orderModel.find({})
          res.json({success:true,orders})
      } catch (error) {
         console.log(error)
    res.json({success:false,message:error.message})
      }
}

// User Order Data for frontend
const usersOrders=async (req,res)=>{
  try {
    const {userId}=req.body

    const orders=await orderModel.find({userId})
    res.json({success:true,orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
    
}

//update order status for ADmin panel
const updateStatus=async (req,res)=>{
      try {
          const {orderId,status}=req.body
          console.log(orderId)
          await orderModel.findByIdAndUpdate(orderId,{status})
           res.json({success:true,message:"Status Updated" ,status})
        
      } catch (error) {
        console.log(error)
    res.json({success:false,message:error.message}) 
      }
}


module.exports={
    placedOrder,
    placedOrderStripe,
    placedOrderRazorpay,
    allOrders,
    usersOrders,
    updateStatus
}

const orderModel=require('../models/orderModel.js')
const userModel = require('../models/userModel.js')
const Stripe=require('stripe')

//Global Variables
const currency='aud'
const deliveryCharges=10

//gateway initialized
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing orders using COD Method
const placedOrder=async (req,res)=>{
      try {
          const {userId,items,amount,address,paymentMethod}=req.body

          const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:paymentMethod,
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
      try {
         
         const{userId,amount,items,address}=req.body

         const {origin} =req.headers
         const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:'stripe',
            payment:false,
            date:Date.now()
          }
         const newOrder=new orderModel(orderData)
         await newOrder.save()

         const line_items=items.map((item)=>(
          {
            price_data:{
            currency:currency,
            product_data:{
               name:item.name
            },
            unit_amount:item.price*100
          },
          quantity:item.quantity
          }))

          line_items.push({
             
            price_data:{
            currency:currency,
            product_data:{
               name:"Delivery Charges"
            },
            unit_amount:deliveryCharges*100
          },
          quantity:1          

          })
          const session =await stripe.checkout.sessions.create({
             success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
             cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
             line_items,
             mode:'payment'
          })

          res.json({success:true,session_url:session.url})


        
      } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
      }
    
}

//verfiy Stripe

const verifyStripe=async (req,res)=>{
  const {orderId,success,userId}=req.body
  try {
    if(success){
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      await userModel.findByIdAndUpdate(userId,{cartData:{}})

      res.json({success:true})
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
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
    updateStatus,
    verifyStripe
}

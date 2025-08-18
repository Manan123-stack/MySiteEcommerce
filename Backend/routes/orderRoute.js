const express=require('express')
const orderRouter=express.Router()
const { placedOrder,placedOrderStripe,placedOrderRazorpay,allOrders,usersOrders,updateStatus}=require('../controllers/orderController.js')
const { adminAuth } = require('../middleware/adminAuth');
const authUser= require('../middleware/auth.js')

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//payment Feature
orderRouter.post('/place',authUser,placedOrder)
orderRouter.post('/stripe',authUser,placedOrderStripe)
orderRouter.post('/razorpay',authUser,placedOrderRazorpay)

//user Feature
orderRouter.post('/userorders',authUser,usersOrders)

module.exports=orderRouter




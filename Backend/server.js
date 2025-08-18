const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoose=require('mongoose')
const {ConnectToMongoDb}=require('./middleware/dbConnection')
const {connectCloudinary} = require('./config/cloudinary')
// App configuration
const app=express();
const port =process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Connection To MongoDb
ConnectToMongoDb('mongodb://localhost:27017/MySiteEcommerce')
.then (()=> console.log("Mongodb connected Successfully"))
.catch((err)=>console.log('Error in connection to database',err))

connectCloudinary()

// middlewares
app.use(express.json());
app.use(cors());

//Api endpoints
app.use('/api/cart',require('./routes/cartRoute'))
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/order', require('./routes/orderRoute'));

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
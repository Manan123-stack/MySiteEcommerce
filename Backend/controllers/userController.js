const dotenv = require('dotenv');
dotenv.config();
const userModel =require('../models/userModel');

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createToken =(id)=>{
  return jwt.sign({ id }, process.env.JWT_SECRET);
}


// Route fot=r user login
const loginUser =async (req, res) => {
try {
  const { email, password } = req.body;

  const user =await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      token,
    })
  }
  else{
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: error.message });
}

}

//Route for user registration
const registerUser =async (req, res) => {
try {
  const { name, email, password } = req.body;
//checking if user already exists
const exists=await userModel.findOne({email})
if (exists) {
  return res.status(400).json({success:false, message: 'User already exists' });
}
//validating strong password
if (!validator.isEmail(email)){
  return res.status(400).json({success:false, message: 'Invalid email format' });
}
if (password.length < 8){
return res.status(400).json({success:false, message: 'Password must be at least 8 characters long' });
} 
// hanshing user password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt);
//creating new user
const newUser = new userModel({
  name,
  email,
  password: hashedPassword
})
const user = await newUser.save();
const token= createToken(user._id)

res.status(201).json({
  success: true,
  token
});

} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message:error.message});
}

}

//admin login
const adminLogin = async (req, res) => {
    try {
      const {email,password}=req.body

console.log("From body:", email, password);
console.log("From env:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

        const token =jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})

      }else{
        res.json({success:false,message:"Invalid crediential"})
      }
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message
      })
      
    }
};

module.exports = {
  loginUser,
  registerUser,
  adminLogin
};
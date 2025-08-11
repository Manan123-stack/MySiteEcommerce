
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
const connectCloudinary = async () => {
 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECERET_KEY
});
};

module.exports = { connectCloudinary };

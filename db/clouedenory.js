const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// const uploadFileCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath);
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.log(error.massage)
//   }
// }
// module.exports = { cloudinary, uploadFileCloudinary }
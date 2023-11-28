const app = require("./app.js");
const pic = "./files/images/cow.png";

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// handling Uncaught Exeptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the Server due to Uncaught Exception`);
  process.exit(1);
});

//Config
dotenv.config({ path: "config/config.env" });

// Connecting to Database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.uploader.upload(pic).then(result => {
// // console.log('Arriba',result)
// })

const server = app.listen(process.env.PORT, () => {
  console.log(` 🐝 Server is working on http://localhost: ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the Server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

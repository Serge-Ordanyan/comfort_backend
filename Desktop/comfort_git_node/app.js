const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");

const dotenv = require("dotenv");
const { isAuthenticatedUser, authorizeRoles } = require("./middleware/auth");
const { body, validationResult } = require("express-validator");
// const upload = require('./middleware/upload')
const { addProduct } = require("./controllers/newProductController");

app.use(cors());
// UPLOAD IMAGE ETC>>>
// const storage = multer.diskStorage({
//     destination: './uploads', // Specify the destination folder
//     filename: (req, file, callback) => {
//       callback(null, file.originalname); // Use the original file name
//     },
//   });

//   const upload = multer({ storage });

//   app.post('/upload', upload.array('images[]'), (req, res) => {
//     console.log(req)
//     console.log(req.body.nspeakers)
//     // req.file contains the uploaded file information
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // You can now handle the uploaded file (e.g., save it to a database or serve it)
//     res.send('File uploaded.');
//   });
// END OF UPLOAD IMAGE ETC>>>

//TEMP COMMENT
//for product  files start
const storage = multer.diskStorage({
  destination: "./uploads", // Specify the destination folder
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });
// app.post(
//   "/api/v1/upload",
//   upload.fields([
//     { name: "image_am" },
//     { name: "image_en" },
//     { name: "image_ru" },
//     { name: "imageOfAccesories_am" },
//     { name: "imageOfAccesories_en" },
//     { name: "imageOfAccesories_ru" },
//     { name: "imageOfMontage_am" },
//     { name: "imageOfMontage_en" },
//     { name: "imageOfMontage_ru" },
//     { name: "imageOfColors" },
//   ]),
//   addProduct
// );
app.post(
  "/api/v1/upload",
  upload.fields([
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][images_am]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][images_en]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][images_ru]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][accessoriesImages_am]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][accessoriesImages_en]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][accessoriesImages_ru]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][montagesImages_am]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][montagesImages_en]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][montagesImages_ru]", },
    { name: "subCategory[0][nestedCategories][0][subNestedCategories][0][colorsImages]" }, // No maxCount
    // Add other fields as needed
  ]),
  addProduct
);

//for product files end
//TEMP COMMENT

// const upload = require("./middleware/upload");

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }
dotenv.config({ path: "backend/config/config.env" });

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// Route imports
//const product = require("./routes/productRoute");
const product = require("./routes/newProductRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
// const upload = require("./routes/uploadRoute");

// app.post('/api/v1/upload', (req, res) => {
//     console.log(req.files)
//   });
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
// app.use("/api/v1", upload);

//impl upload
// const path = require("path");
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         console.log('fl name is here',file)
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({ dest: './public/data/uploads/' })
// app.post('/stats', upload.single('uploaded_file'), function (req, res) {

//    console.log(req.file, req)
// });
// app.use('/profile', express.static('upload/images'));
// app.post("/uploade", upload.single('profile'), (req, res) => {
//     if (!req.file) {
//         // Handle the case where no file was uploaded
//         return res.status(400).json({
//             success: 0,
//             message: 'No file uploaded.'
//         });
//     }

//     console.log('Uploaded file:', req.file);

//     res.json({
//         success: 1,
//         profile_url: `http://localhost:4000/profile/${req.file.filename}`
//     });
// });
//end impl

// app.use('/profile', express.static('upload/images'));
// app.post("/uploade", upload.single("profile"), (req, res) => {
//     console.log("ddd", req);

//     // Add validation and sanitization checks for the uploaded image
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       // If there are validation errors, respond with an error message
//       return res.status(400).json({ errors: errors.array() });
//     }

//     res.json({
//       success: 1,
//       profile_url: `http://localhost:4000/profile/${req.file.filename}`,
//     });
//   });

// MidleWare for Errors
app.use(errorMiddleware);

module.exports = app;

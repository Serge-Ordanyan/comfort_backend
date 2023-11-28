const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: "./upload/images", // Define the destination folder for storing images.
//   filename: (req, file, cb) => {
//     console.log("inside upload", req, file);
//     cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1000000, // Set a limit for the file size (adjust as needed).
//   },
// });



  const storage = multer.diskStorage({
    destination: './uploads', // Specify the destination folder
    filename: (req, file, callback) => {
      callback(null, file.originalname); // Use the original file name
    },
  });
  
  const upload = multer({ storage }).fields([
    { name: 'image' },
    { name: 'imageOfAccesories' },
    { name: 'imageOfMontage' },
    { name: 'imageOfColors' },
  ]);

module.exports = upload;

const express = require("express");
//const multer = require('multer');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  createNewProduct,
  //   getSpecificLanguageProducts,
  addProduct,
  getProductsByCategory
} = require("../controllers/newProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { body, validationResult } = require("express-validator");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './uploads/'); // Directory where uploaded files will be stored
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + '-' + file.originalname); // Unique file name
//   },
// });

// const upload = multer({ storage: storage });

const router = express.Router();

router.route("/getProductsByCategory").post(getProductsByCategory);

router.route("/products").get(getAllProducts);

//specific languages product
// router.route("/productsSpecific").get(getSpecificLanguageProducts);

// router
// .route('/admin/upload')
// .post(upload.array('images',3),authorizeRoles("admin"),(req,res)=>{
//   const uploadedFiles = req.files
// })


// UNNCOMMENT IF ?
// router
//  .route("/upload")
//  .post( addProduct);







router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// router
//   .route("/admin/product/newProduct")
//   .post(
//     isAuthenticatedUser,
//     authorizeRoles("admin"),
//     upload.single("image"),
//     createNewProduct,
//   );

// router
//   .route("/uploade")
//   .post(
//     isAuthenticatedUser,
//     authorizeRoles("admin"),
//     upload.single("profile"),
//     (req, res) => {
//       console.log("ddd", req);
//       // Add validation and sanitization checks for the uploaded image
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         // If there are validation errors, respond with an error message
//         return res.status(400).json({ errors: errors.array() });
//       }

//       res.json({
//         success: 1,
//         profile_url: `http://localhost:4000/profile/${req.file.filename}`,
//       });
//     },
//   );

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;

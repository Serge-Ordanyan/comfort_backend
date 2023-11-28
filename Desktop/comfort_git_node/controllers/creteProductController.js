const UploadSchema = require("../models/uploadModel");
const ErrorHandler = require("../middleware/catchAsyncErrors");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

const createProduct = async (req, res) => {
    try {
        console.log('ss'.req.body)
      const { name, description, price, category } = req.body;
      const imageMetadata = {
        filename: req.file.filename, // This is the uploaded image's filename
      };
  
      const product = new UploadSchema({
        name,
        description,
        price,
        category,
        images: [imageMetadata], // Add the image metadata to the product
      });
  
      await product.save();
  
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Product creation failed' });
    }
  };
  
  module.exports = { createProduct };
const NewProduct = require("../models/newProductModel");
const ErrorHandler = require("../middleware/catchAsyncErrors");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const fs = require("fs");




exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    // Extract data from req.body and req.files
    console.log(req.files)

    // Extract data from req.body
    const {
      productName_am,
      productName_en,
      productName_ru,
      subCategory,
    } = req.body;

    // Create an array to store the nested categories
    const nestedCategories = [];

    // Iterate over the subCategory array from the request
    for (const subCat of subCategory) {
      const {
        subName_am,
        subName_en,
        subName_ru,
        nestedCategories: nestedCats,
      } = subCat;

      // Create an array to store the sub-nested categories
      const subNestedCategories = [];

      // Iterate over the nestedCategories array from the request
      for (const nestedCat of nestedCats) {
        const {
          nestedName_am,
          nestedName_en,
          nestedName_ru,
          subNestedCategories: subNestedCats,
        } = nestedCat;

        // Create an array to store the sub-nested categories
        const subNestedCategoriesData = subNestedCats.map((subNestedCat) => {
          const {
            description_am,
            description_en,
            description_ru,
            montage_am,
            montage_en,
            montage_ru,
            images_am,
            images_en,
            images_ru,
            accessoriesText_am,
            accessoriesText_en,
            accessoriesText_ru,
            accessoriesImages_am,
            accessoriesImages_en,
            accessoriesImages_ru,
            colorsCodes,
          } = subNestedCat;

          // Get the corresponding files for images_am and accessoriesImages_am
          const images_am_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][images_am]`];
          const images_en_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][images_en]`];
          const images_ru_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][images_ru]`];
          const accessoriesImages_am_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][accessoriesImages_am]`];
          const accessoriesImages_en_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][accessoriesImages_en]`];
          const accessoriesImages_ru_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][accessoriesImages_ru]`];
          const montagesImages_am_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][montagesImages_am]`];
          const montagesImages_en_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][montagesImages_en]`];
          const montagesImages_ru_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][montagesImages_ru]`];
          const colorsImages_files = req.files[`subCategory[0][nestedCategories][0][subNestedCategories][0][colorsImages]`];

          // Map file paths or filenames to the corresponding images_am and accessoriesImages_am properties
          const images_am_paths = images_am_files?.map((file) => file.path);
          const images_en_paths = images_en_files?.map((file) => file.path);
          const images_ru_paths = images_ru_files?.map((file) => file.path);
          const accessoriesImages_am_paths = accessoriesImages_am_files?.map((file) => file.path);
          const accessoriesImages_en_paths = accessoriesImages_en_files?.map((file) => file.path);
          const accessoriesImages_ru_paths = accessoriesImages_ru_files?.map((file) => file.path);
          const montagesImages_am_paths = montagesImages_am_files?.map((file) => file.path);
          const montagesImages_ru_paths = montagesImages_ru_files?.map((file) => file.path);
          const montagesImages_en_paths = montagesImages_en_files?.map((file) => file.path);
          const colorsImages_paths = colorsImages_files?.map((file) => file.path);
          // const colors = req.body['subCategory[0][nestedCategories][0][subNestedCategories][0][colorsCodes]']?.split(',');


          // Create and return a sub-nested category object with file paths
          return {
            description_am,
            description_en,
            description_ru,
            montage_am,
            montage_en,
            montage_ru,
            images_am: images_am_paths,
            images_en: images_en_paths,
            images_ru: images_ru_paths,
            accessoriesText_am,
            accessoriesText_en,
            accessoriesText_ru,
            accessoriesImages_am: accessoriesImages_am_paths,
            accessoriesImages_en: accessoriesImages_en_paths,
            accessoriesImages_ru: accessoriesImages_ru_paths,
            montagesImages_am: montagesImages_am_paths,
            montagesImages_en: montagesImages_en_paths,
            montagesImages_ru: montagesImages_ru_paths,
            colorsImages: colorsImages_paths,
            colorCodes: colorsCodes
          };
        });

        // Create and return a nested category object
        const nestedCategory = {
          nestedName_am,
          nestedName_en,
          nestedName_ru,
          subNestedCategories: subNestedCategoriesData,
        };

        // Push the nested category object to the array
        subNestedCategories.push(nestedCategory);
      }

      // Create and return a sub-category object
      const subCategoryData = {
        subName_am,
        subName_en,
        subName_ru,
        nestedCategories: subNestedCategories,
      };

      // Push the sub-category object to the array
      nestedCategories.push(subCategoryData);
    }

    // Create a new NewProduct instance with the extracted data
    const newProduct = new NewProduct({
      productName_am,
      productName_en,
      productName_ru,
      subCategory: nestedCategories,
    });

    // Save the new product to the database
    await newProduct.save();


    //console.log('lets see this', req.body);
    // let { subCategory } = req.body;
    // subCategory.map((a) => {
    //   a.nestedCategories.map((b) => {
    //     console.log('heres in', b.subNestedCategories)
    //   })

    // })
    // console.log('files', req.files);
    // const {
    //   category_am,
    //   category_en,
    //   category_ru,
    //   nestedCategory_am,
    //   nestedCategory_en,
    //   nestedCategory_ru,
    //   description_am,
    //   description_en,
    //   description_ru,
    //   montage_am,
    //   montage_en,
    //   montage_ru,
    //   titles,
    //   texts,
    //   comments,
    //   price,
    //   code,
    //   status,
    //   date_time,
    //   product_id,
    //   type,
    //   accessories,
    //   montages,
    //   colors,
    // } = req.body;
    // console.log("req", req.files);
    // const {
    //   image_am,
    //   image_en,
    //   image_ru,
    //   imageOfAccesories_am,
    //   imageOfAccesories_en,
    //   imageOfAccesories_ru,
    //   imageOfMontage_am,
    //   imageOfMontage_en,
    //   imageOfMontage_ru,
    //   imageOfColors,
    // } = req.files;

    // const imagePaths = [
    //   image_am?.path,
    //   image_en?.path,
    //   image_ru?.path,
    //   imageOfAccesories_am?.path,
    //   imageOfAccesories_en?.path,
    //   imageOfAccesories_ru?.path,
    //   imageOfMontage_am?.path,
    //   imageOfMontage_en?.path,
    //   imageOfMontage_ru?.path,
    //   imageOfColors?.path,
    // ];
    // const imagePathsArr = [];
    // function showPath(arr, path) {
    //   arr?.map((item) => {
    //     path = item.filename;
    //     imagePathsArr.push(item.filename);
    //   });
    //   return path;
    // }

    // // console.log("files", image);
    // // console.log("files arr", imagePathsArr);
    // let imageShowed = showPath(image_am);
    // let imageAccShowed = showPath(image_am);
    // let imageMonShowed = showPath(image_am);
    // let imageColShowed = showPath(image_am);
    // //  console.log('HERE',imageShowed,imageAccShowed,imageColShowed,imageMonShowed)

    // //   console.log("files", imageOfAccesories);
    // //   console.log("IMAGE files", image);
    // //   console.log("files", imageOfMontage);
    // //   console.log("files", imageOfColors);

    // const imageAmUrls = Array.from(image_am).map((file) => file.filename);
    // const imageEnUrls = Array.from(image_en).map((file) => file.filename);
    // const imageRuUrls = Array.from(image_ru).map((file) => file.filename);
    // const imageAccesoriesAmUrls = Array.from(imageOfAccesories_am).map(
    //   (file) => file.filename,
    // );
    // const imageAccesoriesEnUrls = Array.from(imageOfAccesories_en).map(
    //   (file) => file.filename,
    // );
    // const imageAccesoriesRuUrls = Array.from(imageOfAccesories_ru).map(
    //   (file) => file.filename,
    // );
    // const imageMontageAmUrls = Array.from(imageOfMontage_am).map(
    //   (file) => file.filename,
    // );
    // const imageMontageEnUrls = Array.from(imageOfMontage_en).map(
    //   (file) => file.filename,
    // );
    // const imageMontageRuUrls = Array.from(imageOfMontage_ru).map(
    //   (file) => file.filename,
    // );
    // const imageColorsUrls = Array.from(imageOfColors).map(
    //   (file) => file.filename,
    // );

    // // Create a new NewProduct instance with extracted data
    // const newProduct = new NewProduct({
    //   category_am,
    //   category_en,
    //   category_ru,
    //   nestedCategory_am,
    //   nestedCategory_en,
    //   nestedCategory_ru,
    //   images_am: imageAmUrls,
    //   images_en: imageEnUrls,
    //   images_ru: imageRuUrls,
    //   description_am,
    //   description_en,
    //   description_ru,
    //   montage_am,
    //   montage_en,
    //   montage_ru,
    //   titles,
    //   texts,
    //   comments,
    //   price,
    //   code,
    //   status,
    //   date_time,
    //   product_id,
    //   type,
    //   accessoriesImages_am: imageAccesoriesAmUrls,
    //   accessoriesImages_en: imageAccesoriesEnUrls,
    //   accessoriesImages_ru: imageAccesoriesRuUrls,
    //   montagesImages_am: imageMontageAmUrls,
    //   montagesImages_en: imageMontageEnUrls,
    //   montagesImages_ru: imageMontageRuUrls,
    //   colorsImages: imageColorsUrls,
    // });

    // // Save the new product to the database
    // await newProduct.save();

    // Respond with success
    res.status(201).json({ message: "New Product created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.getProductsByCategory = async (req, res) => {
  try {
    const targetNestedCategory = req.body.nestedCategory;
    console.log('req body', req.body)

    // Use the find method to retrieve products that match the nestedCategory
    const products = await NewProduct.find({
      nestedCategory_am: targetNestedCategory,
    });

    // Filter the products based on nestedCategory
    const filteredProducts = products.filter(
      (product) => product.nestedCategory_am === targetNestedCategory,
    );

    // Handle the filtered products as needed (e.g., send them in a response)
    console.log("Filtered products:", filteredProducts);
    res.json(filteredProducts);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  console.log("req prod", req.files);
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const newProduct = await NewProduct.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Create NewProduct -- Admin. NEW NEW 20 oct
exports.createNewProduct = catchAsyncErrors(async (req, res, next) => {
  console.log("Here ", req);
  console.log("Here    GOOOO ", req.body);
  const { name, description, price, category } = req.body;

  const imageMetadata = {
    data: req.files.image.buffer, // Assuming Multer provides the image data as a buffer.
    contentType: req.files.image.mimetype,
    filename: req.files.image.originalname,
  };

  const newProduct = new NewProduct({
    name,
    description,
    price,
    category,
    images: req.files.image.name, // Add the image metadata to the product.
    // Add other product data as needed.
  });
  await newProduct.save();

  res.status(201).json(newProduct);
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("temp error", 500));
  const resultPerPage = 10;
  const productsCount = await NewProduct.countDocuments();
  //
  console.log("prod count is ", productsCount);
  // console.log('prod count isSSS ')
  const apiFeature = new ApiFeatures(NewProduct.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  //const products = await apiFeature.query;
  const products = await NewProduct.find();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

// Get all products -- Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await NewProduct.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await NewProduct.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    // const imagesLinks = [];

    // for (let i = 0; i < images.length; i++) {
    //   const result = await cloudinary.v2.uploader.upload(images[i], {
    //     folder: "products",
    //   });

    //   imagesLinks.push({
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   });
    // }

    // req.body.images = imagesLinks;
  }
  product = await NewProduct.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await NewProduct.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await NewProduct.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    // productCount,
  });
});

// Create New Review or Update the Review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await NewProduct.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString(),
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await NewProduct.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await NewProduct.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString(),
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await NewProduct.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  );

  res.status(200).json({
    success: true,
  });
});

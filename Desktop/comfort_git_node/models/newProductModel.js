const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  filename: String
});

const languageSchema = new mongoose.Schema({
  lang: String, // Language code (e.g., "am", "en", "ru")
  title: String,
  images: [imageSchema], // Images for the language
});

// Define the subNestedCategories schema
const subNestedCategoriesSchema = new mongoose.Schema({
  id: String,
  description_am: String,
  description_en: String,
  description_ru: String,
  montage_am: String,
  montage_en: String,
  montage_ru: String,
  images_am: [String],
  images_en: [String],
  images_ru: [String],
  accessoriesText_am: String,
  accessoriesText_en: String,
  accessoriesText_ru: String,
  accessoriesImages_am: [String],
  accessoriesImages_en: [String],
  accessoriesImages_ru: [String],
  accessoriesText_am: String,
  accessoriesText_en: String,
  accessoriesText_ru: String,
  montagesImages_am: [String],
  montagesImages_en: [String],
  montagesImages_ru: [String],
  montagesText_am: String,
  montagesText_en: String,
  montagesText_ru: String,
  colorsText: String,
  colorsImages: [String],
  colorCodes: [String],

  price: String,
  code: String,
  status: String,
  date_time: {
    type: Date,
    default: Date.now,
  },
});
// Define the nestedCategories schema
const nestedCategoriesSchema = new mongoose.Schema({
  nestedName_am: String,
  nestedName_en: String,
  nestedName_ru: String,
  subNestedCategories: [subNestedCategoriesSchema],
});
// Define the subCategory schema
const subCategorySchema = new mongoose.Schema({
  subName_am: String,
  subName_en: String,
  subName_ru: String,
  nestedCategories: [nestedCategoriesSchema],
});

const newProductSchema = new mongoose.Schema({
  productName_am: String,
  productName_en: String,
  productName_ru: String,
  subCategory: [subCategorySchema],
  //   id: String,
  //   category_am: String,
  //   category_en: String,
  //   category_ru: String,
  //   nestedCategory_am:String,
  //   nestedCategory_en:String,
  //   nestedCategory_ru:String,
  //   description_am:String,
  //   description_en:String,
  //   description_ru:String,
  //   montage_am:String,
  //   montage_en:String,
  //   montage_ru:String,
  //   images_am: [String],
  //   images_en: [String],
  //   images_ru: [String],
  //   titles: [languageSchema],
  //   texts: [languageSchema],
  //   comments: [languageSchema],
  //   price: String,
  //   code: String,
  //   status: String,
  //   date_time: {
  //     type: Date,
  //     default: Date.now, 
  //   },
  //   product_id: String,
  //   type: String,
  //   stock:String,
  //   accessoriesText_am:String,
  //   accessoriesText_en:String,
  //   accessoriesText_ru:String,
  //   accessoriesImages_am: [String],
  //   accessoriesImages_en: [String],
  //   accessoriesImages_ru: [String],
  //   montagesImages_am: [String],
  //   montagesImages_en: [String],
  //   montagesImages_ru: [String],
  //  montagesText_am:String,
  //  montagesText_en:String,
  //  montagesText_ru:String,
  //   colorsText:String,
  //  colorsImages: [String], 
});

const NewProduct = mongoose.model("NewProduct", newProductSchema);

module.exports = NewProduct;

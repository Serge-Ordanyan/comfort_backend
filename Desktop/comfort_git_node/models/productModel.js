const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  translations: {
    am: {
      name: { type: String, required: [true, "Լրացրեք անվանումը"], trim: true },
      description: {
        type: String,
        required: [true, "Լրացրեք նկարագրությունը"],
      },
    },
    en: {
      name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Please Enter product description"],
      },
    },
    ru: {
      name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Please Enter product description"],
      },
    },
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    translations: {
      am: {
        name: {
          type: String,
          required: [true, "Ավելացրեք կատեգորիան"],
        },
      },
      en: {
        name: {
          type: String,
          required: [true, "Pleasse Enter Product Category"],
        },
      },
      ru: {
        name: {
          type: String,
          required: [true, "Pleasse Enter Product Category"],
        },
      },
    },
  },
  accessories: {
    am: [
      {
        name: {
          type: String,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
    en: [
      {
        name: {
          type: String,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
    ru: [
      {
        name: {
          type: String,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
  },
  montage: {
    am: [
      {
        name: {
          type: String,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
    en: [
      {
        name: {
          type: String,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
    ru: [
      {
        name: {
          type: String,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
  },
  color: {
    am: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
    en: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
    ru: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          url: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      },
    ],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const phoneListSchema = new mongoose.Schema(
  {
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    averageRating: { type: Number, default: 0 },
    sellerName: { type: String, default: "" },
    price: Number,
    enable: { type: Boolean, default: true },
    reviews: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Mongoose automatically generates `_id`
        reviewUploadTime: { type: Date, default: Date.now }, // Corrected Date type
        reviewer: String, //the _id of user
        reviewerName: { type: String, default: "" },
        rating: { type: Number, required: true, min: 1, max: 5 }, // Ensure rating is between 1-5
        comment: { type: String, required: true },
        hidden: { type: Boolean, default: false },
      },
    ],
  },
  {
    collection: "phonelistingdemo",
  }
);

module.exports = mongoose.model(
  "phonelistingdemo",
  phoneListSchema,
  "phonelistingdemo"
);

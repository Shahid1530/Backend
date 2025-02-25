import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "apartments",
        "houses",
        "offices",
        "commercial_spaces",
        "parking_lots",
        "restaurants",
        "businesses",
        "land_businesses"
      ]
    },
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    website: { type: String },
    image: { type: String },
    user: { type: String, required: false } // Reference to User model
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

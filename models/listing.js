const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [
    {
      url: String,
      filename: String,
    }
  ],
  price: { type: Number },        // monthly rent in ₹
  deposit: { type: Number },
  location: { type: String },     // full address (geocoding ke liye)
  area: { type: String },         // short locality, e.g. "Kolar Road"
  country: { type: String, default: "India" },
  roomType: {
    type: String,
    enum: ["Single Room", "1BHK", "2BHK", "3BHK", "PG", "Flat"],
  },
  furnishing: {
    type: String,
    enum: ["Unfurnished", "Semi-Furnished", "Furnished"],
  },
  preferredFor: {
    type: String,
    enum: ["Boys", "Girls", "Family", "Any"],
    default: "Any",
  },
  amenities: [String],
  availableFrom: { type: Date },
  contactNumber: { type: String },
  reviews: [
    { type: Schema.Types.ObjectId, ref: "Review" }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number] }, // [lng, lat]
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
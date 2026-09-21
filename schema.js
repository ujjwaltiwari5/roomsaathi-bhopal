const Joi = require("joi");
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    area: Joi.string().required(),
    country: Joi.string().allow("", null),
    price: Joi.number().required().min(0),
    deposit: Joi.number().allow(null, "").min(0),
    roomType: Joi.string().required(),
    furnishing: Joi.string().allow("", null),
    preferredFor: Joi.string().allow("", null),
    amenities: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ).allow(null, ""),
    availableFrom: Joi.string().allow("", null),
    contactNumber: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
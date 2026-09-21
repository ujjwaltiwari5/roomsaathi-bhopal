const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

const BHOPAL_AREAS = [
  "MP Nagar", "Kolar Road", "Arera Colony", "Ayodhya Bypass", "Bagmugaliya",
  "Hoshangabad Road", "Bittan Market", "Shahpura", "Govindpura", "Habibganj",
  "New Market", "Misrod", "Bawadiya Kalan", "Raisen Road", "Karond", "TT Nagar", "Piplani", "BHEL"
];
module.exports.BHOPAL_AREAS = BHOPAL_AREAS;

function normalizeAmenities(raw) {
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index", { allListings, areas: BHOPAL_AREAS });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new", { areas: BHOPAL_AREAS });
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you search for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      req.flash("error", "Please upload at least one photo of the room/flat.");
      return res.redirect("/listings/new");
    }

    let images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    let location = req.body.listing.location;
    let geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${location}, Bhopal`;

    let response = await fetch(geoUrl, { headers: { "User-Agent": "wanderlust-app" } });
    let data = await response.json();

    if (data.length === 0) {
      req.flash("error", "Location not found! Try a more specific address.");
      return res.redirect("/listings/new");
    }

    let lat = parseFloat(data[0].lat);
    let lng = parseFloat(data[0].lon);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.images = images;
    newListing.amenities = normalizeAmenities(req.body.listing.amenities);
    newListing.country = "India";
    newListing.geometry = { type: "Point", coordinates: [lng, lat] };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you search for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing, areas: BHOPAL_AREAS });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  if (!req.body.listing) {
    throw new ExpressError(400, "send valid data for listing");
  }

  let listing = await Listing.findById(id);

  if (req.body.listing.location !== listing.location) {
    let geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${req.body.listing.location}, Bhopal`;
    let response = await fetch(geoUrl, { headers: { "User-Agent": "wanderlust-app" } });
    let data = await response.json();
    if (data.length > 0) {
      let lat = parseFloat(data[0].lat);
      let lng = parseFloat(data[0].lon);
      listing.geometry = { type: "Point", coordinates: [lng, lat] };
    }
  }

  Object.assign(listing, req.body.listing);
  listing.amenities = normalizeAmenities(req.body.listing.amenities);

  if (req.files && req.files.length > 0) {
    let newImages = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    listing.images = [...listing.images, ...newImages];
  }

  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
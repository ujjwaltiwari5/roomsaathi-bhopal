const Listing = require("../models/listing.js");
 module.exports.index = async(req,res,)=>{
	let	allListings = await Listing.find();
	res.render("listings/index",{allListings});
};

module.exports.renderNewForm = async (req,res)=>{
	res.render("listings/new");
};

module.exports.showListing = async(req,res)=>{
	 let{id} = req.params;
	 const listing = await Listing.findById(id)
		 .populate({
		 path:"reviews",
		 populate:{
		  path:"author",
		 }
	    })
		 .populate("owner");
	 if (!listing)
	 {
       req.flash("error", "Listing you search for does not exist");
	  return res.redirect("/listings");
	 }
	 //console.log(listing);
	 res.render("listings/show.ejs",{listing});
}

module.exports.createListing = async (req, res, next) => {
  try {
    //  image data 
    let url = req.file.path;
    let filename = req.file.filename;

    //  location 
    let location = req.body.listing.location;

    //  geocoding API
    let geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;

    let response = await fetch(geoUrl ,
		{
     headers: {
       "User-Agent": "wanderlust-app"
             }
       });
	   let data = await response.json();

    if (data.length === 0) {
      req.flash("error", "Location not found!");
      return res.redirect("/listings/new");
    }

    let lat = parseFloat(data[0].lat);
    let lng = parseFloat(data[0].lon);

    //  listing create
    const newListing = new Listing(req.body.listing);

    
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // NEW: geometry add
    newListing.geometry = {
      type: "Point",
      coordinates: [lng, lat],
    };

    //  save
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    next(err);
  }
};

  module.exports.renderEditForm = async (req,res)=>{
	let{id} = req.params;
	const listing = await Listing.findById(id);
	if (!listing)
	 {
       req.flash("error", "Listing you search for does not exist");
	  return res.redirect("/listings");
	 }	
	 let originalImageUrl = listing.image.url;
	     originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");
	res.render("listings/edit.ejs",{listing,originalImageUrl});
}

 module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  if (!req.body.listing) {
    throw new ExpressError(400, "send valid data for listing");
  }

  let listing = await Listing.findById(id);

  if (req.body.listing.location !== listing.location) {
    let geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${req.body.listing.location}`;

    let response = await fetch(geoUrl, {
      headers: { "User-Agent": "wanderlust-app" },
    });

    let data = await response.json();

    if (data.length > 0) {
      let lat = parseFloat(data[0].lat);
      let lng = parseFloat(data[0].lon);

      listing.geometry = {
        type: "Point",
        coordinates: [lng, lat],
      };
    }
  }
  Object.assign(listing, req.body.listing);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
	let{id} = req.params;
	let deletedChat = await Listing.findByIdAndDelete(id);
	req.flash("success", "Listing Deleted!");
	res.redirect("/listings");
}

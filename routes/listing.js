const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");


//Index Route
router.get("/",
	wrapAsync(async(req,res,)=>{
	let	allListings = await Listing.find();
	res.render("listings/index",{allListings});
})
);


// New Route
router.get("/new",
	isLoggedIn,
	wrapAsync(async (req,res)=>{
	res.render("listings/new");
})
);

//Show Route
router.get("/:id",
	wrapAsync(async(req,res)=>{
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
	 console.log(listing);
	 res.render("listings/show.ejs",{listing});
})
);

//Create Route
router.post(
	"/",
	isLoggedIn,
	validateListing,
	wrapAsync(async(req,res,next)=>{
		
	const newListing = new Listing(req.body.listing);
	newListing.owner = req.user._id;
	await newListing.save();
	req.flash("success", "New Listing Created!");
	res.redirect("/listings");
   })
	);

//Edit Route

router.get("/:id/edit",
    isLoggedIn,
	isOwner,
	wrapAsync(async (req,res)=>{
	let{id} = req.params;
	const listing = await Listing.findById(id);
	if (!listing)
	 {
       req.flash("error", "Listing you search for does not exist");
	  return res.redirect("/listings");
	 }	
	res.render("listings/edit.ejs",{listing});
})
);

// Update Route
router.put(
	"/:id",
	isLoggedIn,
	isOwner,
    validateListing,
	wrapAsync(async(req,res)=>{
	if (!req.body.listing)
	{
		throw new ExpressError(400,"send valid data for listing");
	}
	
	await Listing.findByIdAndUpdate(id,{...req.body.listing});
	req.flash("success", "Listing Updated");
	res.redirect(`/listings/${id}`);
})
);

//Delete Route
router.delete("/:id",
	isLoggedIn,
	isOwner,
	wrapAsync(async (req,res)=>{
	let{id} = req.params;
	let deletedChat = await Listing.findByIdAndDelete(id);
	req.flash("success", "Listing Deleted!");
	res.redirect("/listings");
}
));

module.exports = router;

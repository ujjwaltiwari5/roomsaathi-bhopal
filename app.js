const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
if (process.env.NODE_ENV != "production")
{
require("dotenv").config();
}
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js"); 
const sessions = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");
const { BHOPAL_AREAS } = require("./controllers/listings.js");
//const initData = require("./init/data.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const dbUrl = process.env.ATLASDB_URL;

main()
.then(()=>{
	console.log("Connected to DB");
})
.catch((err)=>{
	console.log(err);
})
async function main() {
	await mongoose.connect(dbUrl);
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

const sessionOptions = {
	secret:"mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:
	{
		expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
	}
}
app.use(sessions(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res)=>{
	res.redirect("/listings");
});

app.use((req,res,next) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.currUser = req.user;
	res.locals.areas = BHOPAL_AREAS;
	next();
});

app.get("/demoUser", async(req,res) =>{
	let fakeUser = new User({
		email: "student@gmail.com",
        username:"delta-student"
	});
   let newUser = await User.register(fakeUser, "helloworld");
	res.send(newUser);
});
  
  app.use("/listings", listingRouter);
  app.use("/listings/:id/reviews", reviewRouter);
  app.use("/", userRouter);
  app.get("/search", async (req, res) => {
	let { destination, area, roomType, preferredFor } = req.query;
	let filter = {};

	if (destination && destination.trim() !== "") {
		filter.$or = [
			{ title: { $regex: destination, $options: "i" } },
			{ location: { $regex: destination, $options: "i" } },
			{ area: { $regex: destination, $options: "i" } },
		];
	}
	if (area && area.trim() !== "") {
		filter.area = { $regex: `^${area}$`, $options: "i" };
	}
	if (roomType && roomType.trim() !== "") {
		filter.roomType = roomType;
	}
	if (preferredFor && preferredFor.trim() !== "") {
		filter.preferredFor = preferredFor;
	}

	const BHOPAL_AREAS = require("./controllers/listings.js").BHOPAL_AREAS;
	let allListings = await Listing.find(filter);
	res.render("listings/index", { allListings, areas: BHOPAL_AREAS });
});

app.use((req,res,next) => {
	next(new ExpressError(404, "Page not found!"));
});

app.use((err,req,res,next) => {
	let{statusCode = 500 ,message = "Something went wrong"} = err;
	//res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{message});
})
app.listen(9090,()=>{
	console.log("server listening on port no: 9090");
})



const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
.then(()=>{
	console.log("Connected to DB");
})
.catch((err)=>{
	console.log(err);
})

async function main()
{
	await mongoose.connect(dbUrl);
}

const initDB = async()=>{
	let owners = await User.find();
	if (!owners || owners.length === 0) {
		console.log("No user found in the database. Please sign up in the app first, then re-run this script.");
		mongoose.connection.close();
		return;
	}
	await Listing.deleteMany({});
	initData.data = initData.data.map((obj) => {
		const randomOwner = owners[Math.floor(Math.random() * owners.length)];
		return {
			...obj,
			owner: randomOwner._id,
		};
	});
	await Listing.insertMany(initData.data);
	console.log(`data was initialized with ${owners.length} different owner(s):`, owners.map(u => u.username).join(", "));
};

initDB();
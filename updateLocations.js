const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("./models/listing");

const dbUrl = process.env.ATLASDB_URL;

async function run() {
  await mongoose.connect(dbUrl);
  console.log("Connected to DB");

  let listings = await Listing.find({});
  console.log(`Found ${listings.length} listings`);

  for (let listing of listings) {
    try {
      let hasCoords =
        listing.geometry &&
        Array.isArray(listing.geometry.coordinates) &&
        listing.geometry.coordinates.length === 2;

      if (!hasCoords) {
        let url = `https://nominatim.openstreetmap.org/search?format=json&q=${listing.location}`;

        let res = await fetch(url, {
          headers: { "User-Agent": "wanderlust-app" },
        });

        let data = await res.json();

        if (data.length > 0) {
          let lat = parseFloat(data[0].lat);
          let lng = parseFloat(data[0].lon);

          listing.geometry = {
            type: "Point",
            coordinates: [lng, lat],
          };

          await listing.save();

          console.log("FIXED:", listing.title);
        } else {
          console.log("NOT FOUND:", listing.location);
        }

        // Nominatim ko overload na kare, isliye har request ke beech thoda gap
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.log("SKIPPED (already has coordinates):", listing.title);
      }
    } catch (err) {
      console.log("ERROR:", listing.title, "-", err.message);
    }
  }

  console.log("Done.");
  mongoose.connection.close();
}

run().catch((err) => {
  console.log("FATAL ERROR:", err.message);
});
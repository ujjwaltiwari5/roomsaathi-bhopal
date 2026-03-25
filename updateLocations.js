const mongoose = require("mongoose");
const Listing = require("./models/listing");

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

  let listings = await Listing.find({});

  for (let listing of listings) {
    try {
      // ?? sirf unko update kare jisme geometry nahi hai
      if (!listing.geometry) {
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

          console.log("? FIXED:", listing.title);
        } else {
          console.log("? NOT FOUND:", listing.location);
        }
      }
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  }

  mongoose.connection.close();
}

run();
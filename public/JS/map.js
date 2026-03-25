document.addEventListener("DOMContentLoaded", () => {
  const coords = window.listingCoords;
  const title = window.listingTitle;

  console.log("Coords:", coords); // debug

  if (!coords || coords.length < 2) {
    console.log("No coordinates found");
    return;
  }

  const map = L.map("map").setView([coords[1], coords[0]], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  L.marker([coords[1], coords[0]])
    .addTo(map)
    .bindPopup(title)
    .openPopup();
});
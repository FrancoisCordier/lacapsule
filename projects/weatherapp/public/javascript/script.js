const mymap = L.map("mapid").setView([48.866667, 2.333333], 4);
const cities = document.getElementsByClassName("city");
const myIcon = L.icon({
  iconUrl: "images/leaf-green.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "images/leaf-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [7, 94],
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29sb25lbGNvcmRpZXIiLCJhIjoiY2t2YzRpaHo1Nmx0ZjJuczdscTVtdm9kdCJ9.2FTbIPUVz8bRq44cyf6jzQ",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(mymap);

for (city of cities) {
  L.marker([city.dataset.lat, city.dataset.lon], { icon: myIcon })
    .addTo(mymap)
    .bindPopup(city.dataset.name);
}

const mymap = L.map("mapid").setView([45.75, 4.85], 5);

function createButton(label, container) {
  var btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
}

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

const control = L.Routing.control({
  waypoints: [],
  routeWhileDragging: true,
  geocoder: L.Control.Geocoder.nominatim(),
}).addTo(mymap);

mymap.on("click", function (e) {
  var container = L.DomUtil.create("div"),
    startBtn = createButton("Start from this location", container),
    destBtn = createButton("Go to this location", container);

  L.popup().setContent(container).setLatLng(e.latlng).openOn(mymap);

  L.DomEvent.on(startBtn, "click", function () {
    control.spliceWaypoints(0, 1, e.latlng);
    mymap.closePopup();
  });

  L.DomEvent.on(destBtn, "click", function () {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    mymap.closePopup();
  });
});

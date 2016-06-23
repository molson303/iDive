var button = document.getElementById('btn')
var httpRequest = new XMLHttpRequest();
var userInput = document.getElementsByTagName('input')[0]
var textColumnLeft1 = document.getElementById('text-column-one')
var localDive = document.getElementById('style-nav2')
var script = document.createElement('script');
var long;
var lat;
var option;
var option1;
var option2;
var option3;
var optgroup;
var map;
var marker;


button.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      long = (object.results[0].geometry.location.lng)
      lat = (object.results[0].geometry.location.lat);
      getDiveSites(lat, long);

        }
      }
    }

    httpRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput.value +'&key=AIzaSyA42x7FNCeCrCZZiLRep6SE2sVWjT_dDrA')
    httpRequest.send();
})

function getDiveSites(lat, long){
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object2 = JSON.parse(httpRequest.responseText)
        for (var i = 0; i < object2.sites.length; i++) {
        option = document.createElement("option")
        option1 = document.createElement("option")
        option2 = document.createElement("option")
        option3 = document.createElement("option")
        optgroup = document.createElement('optgroup')
        textColumnLeft1.appendChild(optgroup)
        optgroup.innerHTML = "";
        textColumnLeft1.appendChild(option)
        option.innerHTML = object2.sites[i].name;
        textColumnLeft1.appendChild(option1)
        option1.innerHTML = "Latitude" + " " + object2.sites[i].lat + ", " + " " + "Longitude" + " " + object2.sites[i].lng;
        textColumnLeft1.appendChild(option2)
        option2.innerHTML = object2.sites[i].distance + " " + "Miles from the Longitute and Latitude of" + " " + userInput.value;
            }
          }
        }
      }
    httpRequest.open('GET', 'http://api.divesites.com/?mode=sites&lat=' + lat +'&lng=' + long + '&dist=30')
    httpRequest.send();
}

localDive.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object3 = JSON.parse(httpRequest.responseText)
      for (var i = 0; i < object3.sites.length; i++) {
        option = document.createElement("option")
        option1 = document.createElement("option")
        option2 = document.createElement("option")
        option3 = document.createElement("option")
        optgroup = document.createElement('optgroup')
        textColumnLeft1.appendChild(optgroup)
        optgroup.innerHTML = "";
        textColumnLeft1.appendChild(option)
        option.innerHTML = object3.sites[i].name;
        textColumnLeft1.appendChild(option3)
        option3.innerHTML = object3.request.loc.name;
        textColumnLeft1.appendChild(option1)
        option1.innerHTML = "Latitude" + " " + object3.sites[i].lat + ", " + " " +"Longitude" + " " + object3.sites[i].lng;
        textColumnLeft1.appendChild(option2)
        option2.innerHTML = object3.sites[i].distance + " " + "Miles from the Longitute and Latitude Coordinates"

      }
    }
  }
}
      httpRequest.open('GET', 'http://api.divesites.com/?mode=&dist=60')
      httpRequest.send();
});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });

  setMarkers(map);
}
// var beaches = [
//   ['Bondi Beach', -33.890542, 151.274856, 4],
//   ['Coogee Beach', -33.923036, 151.259052, 5],
//   ['Cronulla Beach', -34.028249, 151.157507, 3],
//   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//   ['Maroubra Beach', -33.950198, 151.259302, 1]
// ];



function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < beaches.length; i++) {
    var beach = beaches[i];
    var marker = new google.maps.Marker({
      position: {lat: beach[1], lng: beach[2]},
      map: map,
      icon: image,
      shape: shape,
      title: beach[0],
      zIndex: beach[3]
    });
  }
}

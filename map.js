var button = document.getElementById('btn')
var httpRequest = new XMLHttpRequest();
var userInput = document.getElementsByTagName('input')[0]
var textColumnLeft1 = document.getElementById('text-column-one')
var localDive = document.getElementById('style-nav2')
var script = document.createElement('script');
var long;
var lat;
var map;
var marker;
var localNames;
var latLocal;
var longLocal;




button.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      long = (object.results[0].geometry.location.lng)
      lat = (object.results[0].geometry.location.lat);
      getDiveSites(lat, long);

        }
      }    //here I am getting the latitude and Longitude from the location that requested.
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
          globalName = object2.sites[i].name
          globalLat = object2.sites[i].lat
          globalLong = object2.sites[i].lng

            }

          }  //The lat and long is then passed into the dive API to retrieve the locations.
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
          localName = object3.sites[i].name;
          localLat = Number(object3.sites[i].lat);
          localLong = Number(object3.sites[i].lng);
          console.log(localLong)
          var marker = new google.maps.Marker({
            position: {lat: localLat, lng: localLong},
            map: map
          });
      }
      marker.setMap(map)
        console.log("hit");
    }     //no lat or long needs to be passed into this since no parameters are used it defaults to the users location.
  }
}
      httpRequest.open('GET', 'http://api.divesites.com/?mode=&dist=60')
      httpRequest.send();
});






function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });

  setMarkers(map);
}


var beaches = [
  ['Bondi Beach', -33.890542, 151.274856, 4],

];

function setMarkers(map) {
  console.log("lower:"+map);
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };

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

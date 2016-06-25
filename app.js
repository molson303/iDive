var button = document.getElementById('btn')
var httpRequest = new XMLHttpRequest();
var userInput = document.getElementsByTagName('input')[0]
var textColumnLeft1 = document.getElementById('text-column-one')
var localDive = document.getElementById('style-nav2')
var script = document.createElement('script');
var bottomRight = document.getElementById('bottomRight')
var long;
var lat;
var option;
var option1;
var option2;
var option3;
var optgroup;
var map;
var globLat;
var globLong;
var globName;
var shape;
var icon;
var image;
var marker;
var localId;


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
        globName = object2.sites[i].name;
        globLat = Number(object2.sites[i].lat);
        globLong = Number(object2.sites[i].lng);
        globId = object2.sites[i].id;
        globalContent = globName +":" + " " + "Lat" + " " + globLat + ", " + "Lng" + globLong + ", " + "iDive#" + " " + globId;
          globalMarkers(map, globalContent)
          map.setZoom(9);

        option = document.createElement("option")
        option1 = document.createElement("option")
        option2 = document.createElement("option")
        option3 = document.createElement("option")
        option4 =document.createElement("option")
        optgroup = document.createElement('optgroup')
        textColumnLeft1.appendChild(optgroup)
        optgroup.innerHTML = "";
        textColumnLeft1.appendChild(option)
        option.innerHTML = object2.sites[i].name;
        textColumnLeft1.appendChild(option1)
        option1.innerHTML = "Latitude" + " " + object2.sites[i].lat + ", " + " " + "Longitude" + " " + object2.sites[i].lng;
        textColumnLeft1.appendChild(option2)
        option2.innerHTML = object2.sites[i].distance + " " + "Miles from the Longitute and Latitude of" + " " + userInput.value;
        textColumnLeft1.appendChild(option4)
        option4.innerHTML = "iDive #  " + " " + object2.sites[i].id;
            }
          }  //The lat and long is then passed into the dive API to retrieve the locations.
        }
      }
    httpRequest.open('GET', 'http://api.divesites.com/?mode=sites&lat=' + lat +'&lng=' + long + '&dist=30')
    httpRequest.send();
}
// local dive search with the localbutton click
localDive.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object3 = JSON.parse(httpRequest.responseText)
      for (var i = 0; i < object3.sites.length; i++) {
        localId = object3.sites[i].id;
        localName = object3.sites[i].name;
        localLat = Number(object3.sites[i].lat);
        localLong = Number(object3.sites[i].lng);
        contentString = localName +":" + " " + "Lat" + " " + localLat + ", " + "Lng" + localLong + ", " + "iDive#" + " " + localId;
        localMarkers(map, contentString);
        map.setZoom(8);
        option = document.createElement("option")
        option1 = document.createElement("option")
        option2 = document.createElement("option")
        option3 = document.createElement("option")
        option4 = document.createElement("option")
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
        option2.innerHTML = object3.sites[i].distance + " " + "Miles from your current location"
        textColumnLeft1.appendChild(option4)
        option4.innerHTML = "iDive #  " + " " + object3.sites[i].id;
        }


    }     //no lat or long needs to be passed into this since no parameters are used it defaults to the users location.
  }
}
      httpRequest.open('GET', 'http://api.divesites.com/?mode=&dist=60')
      httpRequest.send();
});
//end local dive search




function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: {lat: 39.7392, lng: -104.9903}
  });
  setMarkers(map);
}

function setMarkers(map) {
    shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
    icon = {
    url: "https://images-na.ssl-images-amazon.com/images/I/31%2BAsK5M7dL.jpg", // url
    scaledSize: new google.maps.Size(15, 15), // scaled size
    origin: new google.maps.Point(0,0), // origin
  };
}


function localMarkers(map, contentString){

  var infowindow = new google.maps.InfoWindow({
    content: contentString

  });


var marker = new google.maps.Marker({
    position: {lat: localLat, lng: localLong},
    map: map,
    icon: image,
    shape: shape,
    icon: icon,
    draggable: false,
    animation: google.maps.Animation.DROP
  })

  marker.addListener('click', function() {
    infowindow.open(map, marker);

  });
 map.panTo(marker.position);
}


function globalMarkers(map, globalContent){
  var infowindow = new google.maps.InfoWindow({
    content: globalContent
  });

var marker = new google.maps.Marker({
    position: {lat: globLat, lng: globLong},
    map: map,
    icon: image,
    shape: shape,
    icon: icon,
    draggable: false,
    animation: google.maps.Animation.DROP
  })
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  map.panTo(marker.position);
}




// -- ~ 20 seconds about who you are and what problem your project solves
// -- A walkthrough of your app ( ~ 1 minute )
// -- A brief discussion of how your app works under the hood (~ 1 minute )
// -- Challenges you faced and how you solved them ( ~ 1 minute )

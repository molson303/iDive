var button = document.getElementById('btn')
var httpRequest = new XMLHttpRequest();
var userInput = document.getElementsByTagName('input')[0]
var textColumnLeft1 = document.getElementById('text-column-one')
var long;
var lat;


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
        var option = document.createElement("option")
        var option1 = document.createElement("option")
        var option2 = document.createElement("option")

        textColumnLeft1.appendChild(option)
        option.innerHTML = object2.sites[i].name;
        textColumnLeft1.appendChild(option1)
        option1.innerHTML = "Latitude" + " " + object2.sites[i].lat;
        textColumnLeft1.appendChild(option2)
        option2.innerHTML = "Longitude" + " " + object2.sites[i].lng;
          }
        }
      }
    }
    httpRequest.open('GET', 'http://api.divesites.com/?mode=sites&lat=' + lat +'&lng=' + long + '&dist=30')
    httpRequest.send();
}

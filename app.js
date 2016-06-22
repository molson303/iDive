var button = document.getElementById('btn')
var httpRequest = new XMLHttpRequest();
var userInput = document.getElementsByTagName('input')[0]
var textColumnLeft1 = document.getElementById('text-column-one')
var localDive = document.getElementById('style-nav2')
var long;
var lat;
var option;
var option1;
var option2;
var option3;


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

        option.style.color = "red";


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
        console.log(object3.request.loc.name)
        option = document.createElement("option")
        option1 = document.createElement("option")
        option2 = document.createElement("option")
        option3 = document.createElement("option")


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
    })

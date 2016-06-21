var button = document.getElementById('btn')
var httpRequest = new XMLHttpRequest();
var userInput = document.getElementsByTagName('input')[0]
button.addEventListener("click", function(event) {
httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
        for (var i = 0; i < object.results.length; i++) {
          }
          var long = (object.results[0].geometry.location.lng);
          var lat = (object.results[0].geometry.location.lat);
          console.log(long)
        }
      }
    }


httpRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput.value +'&key=AIzaSyA42x7FNCeCrCZZiLRep6SE2sVWjT_dDrA')
httpRequest.send();
})

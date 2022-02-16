//global variables
var waitForUser;

const toggleButton = document.getElementsByClassName("toggles")[0]
const navbarlinks = document.getElementsByClassName("right hide-small")[0]

toggleButton.addEventListener('click', () => {
    navbarlinks.classList.toggle('active')
});

// create page to display map content
function loadDirections(string) {
    document.getElementById("location").style.display = "block";
   if (typeof google !== 'object') {
       var script = document.createElement("script");
       script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=geoTest";
       document.body.appendChild(script);
   }
 }


//use geoloaction API to load map 
function geoTest() {
	waitForUser = setTimeout(fail, 10000);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showLocation, fail, {timeout: 10000});
	} else {
		fail();
	}
}

function showLocation(position) {
	clearTimeout(waitForUser);
	var currPosLat = position.coords.latitude;
	var currPosLng = position.coords.longitude;
	var mapOptions = {
		center: new google.maps.LatLng(currPosLat, currPosLng), zoom: 10
};
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    document.getElementById("userLocation").innerHTML = "Your Longitude is  " + currPosLng + "  and your Latitude is  (" + currPosLat;}
    
//create event listeners
var submitButton = document.getElementById("locationButton");
if (submitButton.addEventListener){
    submitButton.addEventListener("click", loadDirections, false);
} else if (submitButton.attachEvent) {
    submitButton.attachEvent("onclick", loadDirections);
}

//function fires when location is in accessible 
function fail () {
    document.getElementById("map").innerHTML = "Unable to access your current location";
}
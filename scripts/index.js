//Google Geocode API
'';
// Amadeus API
var url2 = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=';
//Google Maps API - includes key
var url3 = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBELg3Rq-oCRS2ylSrWVD0WGFfHomxc7LQ&callback=initMap';

var key1 = 'AIzaSyBELg3Rq-oCRS2ylSrWVD0WGFfHomxc7LQ';
var key2 = 'LMXWGlJ5iEiMnGPICR4nrPHFNFz81uBC';
var key3 = 'AIzaSyBELg3Rq-oCRS2ylSrWVD0WGFfHomxc7LQ';

var submitButton = document.querySelector('[data-submit]');
//Establish variables from input of form in html
var lon;//necessary to call for second api
var lat;//necessary to call for second api
//Make above into non global variables
var hotelName;
var hotelAmenities;
var hotelDescription;
var hotelAddress;

function main() {
    var cityName = document.querySelector('[data-cityName]').value;
    var startDate = document.querySelector('[data-startDate]').value;
    var endDate = document.querySelector('[data-endDate]').value;
    var requestUrl = url1 + cityName + '&APPID=' + key1;


}





submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    return main();
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//MAP
var map;
    function initMap(lat, lon) {
        map = new google.maps.Map(document.querySelector('[data-map]'), {
        center: {lat: lat, lng: lon},
        zoom: 8
        });
    };


//Initialize side nav
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav,{});


//Slider
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
    indicators: false,
    height: 780,
    transition: 500,
    interval: 6000
});


//Initialize autocomplete
const ac = document.querySelector('.autocomplete');
M.Autocomplete.init(ac, {
    data: {
        "Kansas City": null,
        "Atlanta": null,
        "Chicago": null,
        "Dubuque": null,
        "Miami": null,
        "tbd": null
    }
});


//Initialize datepicker
//   $(document).ready(function () {
//     $('.datepicker').pickadate({
//       closeOnSelect: true,
//       format: "dd/mm/yyyy"
//     });
//   });


//Initialize ScrollSpy (smooth scrolling)
const ss = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(ss, {});
//Google Geocode API
var url1 = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
// Amadeus API
var url2 = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=';
//Google Maps API - includes key
var url3 = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCDOPcTmr99iuKAaytzvfyseJc5oQp0H_E';

var key1 = 'AIzaSyCDOPcTmr99iuKAaytzvfyseJc5oQp0H_E';
var key2 = 'OtgbOn0SGnzxeZ97lO270dpd7tVYX0ey';
var key3 = 'AIzaSyCDOPcTmr99iuKAaytzvfyseJc5oQp0H_E';

var submitButton = document.querySelector('[data-submit]');
//Establish variables from input of form in html
var lat;
var lon;

var hotelName;
var hotelAmenities;
var hotelDescription;
var hotelAddress;

function main() {
    var addressInput = document.querySelector('[data-addressCityState]').value;
    var requestUrl = url1 + addressInput + key1;
    // console.log(requestUrl);

    $.get(requestUrl, function (data) {
        //log full response
        console.log(data);

        lat = data.results[0].geometry.location.lat;
        lon = data.results[0].geometry.location.lng;

    }).then(function(coordinates){
        var startDate = document.querySelector('[data-startDate]').value;
        var endDate = document.querySelector('[data-endDate]').value;
        console.log(startDate);
        console.log(endDate);

        var requestUrl2 = url2 + key2 + '&latitude=' + lat + '&longitude=' + lon + '&radius=10&check_in=' + startDate + '&check_out=' + endDate + '&number_of_results=5';

        //Utilize lon and lat variables to request info through amadeus
        $.get(requestUrl2, function (data) {
            console.log(data);
            var hotelData = [];
            var keys = Object.keys(data);
            keys.forEach(function (aKey) {
                var hotelInfo = data[aKey];
                hotelData.push(hotelInfo);
            });
            console.log(keys);
            console.log(hotelData);

            initMap(lat, lon);
            //loop through data from amadeus and place in vars
            hotelData.forEach(function (info) {
                //nest a for loop in here
                for(var i=0; i < 5; i++) {
                    hotelName = hotelData[0][i].property_name;
                    hotelDescription = hotelData[0][i].rooms[0].descriptions;
                    hotelAddress = hotelData[0][i].address;
                    hotelAmenities = hotelData[0][i].amenities;
                    var hotelPrice = hotelData[0][i].total_price;
                    
                    //push into list in html and display on page
                    var resultBox = document.querySelector('[data-results]');
                    var listOfHotels = $('<ul>');//creates an unordered list and puts in a variable
                    var listedDetail1 = $('<li>', {text: `${hotelName}`});//creates a listed item to put into the ul
                    var listedDetail2 = $('<li>', {text: `${hotelDescription}`});
                    var listedDetail3 = $('<li>', {text: `${hotelAddress.line1} ${hotelAddress.city}, ${hotelAddress.region} ${hotelAddress.postal_code}`});
                    var listedDetail4 = $('<li>', {text: `$ ${hotelPrice.amount} Dollars`});
                    
                    listOfHotels.append(listedDetail1);//puts li's into ul
                    listOfHotels.append(listedDetail2);
                    listOfHotels.append(listedDetail3);
                    listOfHotels.append(listedDetail4);
                    console.log(listOfHotels);
                    listOfHotels.appendTo('[data-results]');//no clue why this works
                };
            });

            // setResultsMarkers();
        })
    });
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
        zoom: 9,
        });
        
    };

//MARKERS
// function setResultsMarkers(locations) {

//     var locations = hotelData[i].location(['latitude'],['longitude']);
//      MAY LOOK LIKE THIS hotelData[0][i].location...
//     console.log(locations);

//     var infowindow =  new google.maps.InfoWindow({});

//     var marker, count;

//     for (count = 0; count < locations.length; count++) {
//         marker = new google.maps.Marker({
//             position: new google.maps.LatLng(locations[count][1], locations[count][2]),
//             map: map,
//             title: locations[count][0],
//             animation: google.maps.Animation.DROP
//         });

//         google.maps.event.addListener(marker, 'click', (function (marker, count) {
//                 return function () {
//                 infowindow.setContent(locations[count][0]);
//                 infowindow.open(map, marker);
//                 }
        
//         })
        
//         (marker, count));

//     }
// }

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


//Initialize ScrollSpy (smooth scrolling)
const ss = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(ss, {});
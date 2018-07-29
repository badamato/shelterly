//Establish const variables for api searches

//url2 is currently set to atlanta coords
var url2 = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=';
//includes key
var url3 = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBELg3Rq-oCRS2ylSrWVD0WGFfHomxc7LQ&callback=initMap';

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


    //Utilize city input on Weather API to get long and latitude and store as a variable
    $.get(requestUrl, function (data) {
        console.log(data);
        var coordsData = [];
        var keys = Object.keys(data);
        keys.forEach(function (aKey) {
            var coordsInfo = data[aKey];
            coordsData.push(coordsInfo);//this pushes the data into the empty array
        });
        console.log(keys);
        console.log(coordsData);
        coordsData.forEach(function (info) {
            lon = coordsData[0].lon;
            lat = coordsData[0].lat;
        });
        // return {
            //     lon: lon,
            //     lat: lat
            // };
        }).then(function(coordinates){
            // console.log(coordinates);
            // debugger
            console.log(startDate);
            console.log(endDate);
            // startDate = startDate.replace(/(..).(..).(....)/, '$3-$1-$2'); might need for safari
            // endtDate = endDate.replace(/(..).(..).(....)/, '$3-$1-$2'); might need for safari
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
            })
            
        })

};

//CLICK EVENT - ON SUBMIT
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    return main();
});


//MAP RENDERING
var map;
    function initMap(lat, lon) {
        map = new google.maps.Map(document.querySelector('[data-map]'), {
        center: {lat: lat, lng: lon},
        zoom: 8
        });
    };

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
        "Italy": null,
        "Venice": null,
        "Florence": null,
        "Kansas": null,
        "Atlanta": null,
        "Florida": null,
        "Switzerland": null,
        "Europe": null
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



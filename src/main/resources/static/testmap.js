var map, infoWindow,
    url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sBHxAxMpOb3XcAAAOBSURBVDjLfZRNa1xlGIav877nY2bOzJnMR77TNIkJpSpBW4qiGGJAECpSEFz0D/gDKrp9wVVBXPkLXLkrqBtBZKJFQaqghbZp09SkTUwyH5mvMzPnvHPOcZEUumj6wL17nmvz3PdtcMoopQRg27btdpYvXQSS7N9/3NZaB0BHKTV83p3xHJAFzFQWVj4bdPjonGsXisIwm35Iy2C40dON0VHrxurD9evAvlKqfypQKeW15l9d/enI+9qr+2fWXplmcbpA0UtT6wx48OSIu4/r3Nqqkjs3tvN+/uiat31vHagppRIA8xnYBPnShRub1reiUU0vX5gnPTlKfjzPzEiKIBPg4GDFNrlmwJ2bW7O981PfXM1mP7b73T+B/wDECSwTRdHi9/L8V9t399Le3BSMT0B+BDIukWkTp1ySfIF4bJzk7ByMlfn3zl76x/RrXwohlpRSRQCplDKAs9uzF6/+/Oveh1GpyOjSAsWJUUbyOTK2hU4EDS05HNocxDYHkaQRG9Dr03hULU8vz9e9o92ttbW1ugA8YGrTz7wT6JhkbJJBdoSelaMTSGoD2O1DLYB2CD1t03dKUJyAyUmCgWbTz6w4jlMA0ibgSim9Wms4S2EEcnk6Ikd7KKkDMoaUgC5QF9CS0MWEdB68IhQK1FrRDIICkDUBUwhh+M3Aw3XBcakmKUoGuAZEBlgG9CVUTWiY0JaAnYFUBtwsfifwyJMAlglorXXsOk6bSGbBJLIk94cwAM5YYNvQT6CewKEFiQNoEwwbTBs3JduABnwT8E3T9MuOfLzRjaeIYpAJ2jJ4aMC2AVb62FrBEGILsAGRQJxAklB2zZ1EJwOgJ4DOcDjcfSnT+8XRIQwGEA6ODWXAUELfPlZsnkRBAFpDEOBEmsW0fzMMwyqgZaVSYXV1NSyFh61mbumtvX5SJpuBnAupp04FQqAHBIAP1Jqwf8DreePepc5v16WU95VSwdN1P47jB5ed29fmDO1TrUOtDZ0TSPNEPU7e3YVagzmh/feSW58KITaUUl0ACVCpVKhUKv67b7+xP1/K/NXxs282+kEhiQEtIBTQS+BIw2ELeVDl5V536wNv+xPXf/K7Uqr+oraxgdF19/Lnjyz3is6mygeYaQwYJ+5b3aC2EHa+W/F/+AJoKKX0C+vrGbABpCzLyvqzK8uJIaPcTuWfMAw10D+tD/8H7d6IDx2EfHUAAAAASUVORK5CYII=';

function initMap() {
    var toiletList = [];
    var iconBase = {
        url: 'pictures\\1.png'
    };

    var icons = {
        parking: {
            icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
            icon: iconBase + 'library_maps.png'
        },
        info: {
            icon: iconBase + 'info-i_maps.png'
        }
    };


//Get toilet coords from database and put them on the map
    $.ajax({
        url: "/markers",
        type: "get",

        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                toiletList.push(new google.maps.Marker({
                    title: response[i].address,
                    position: {
                        lat: response[i].latitude,
                        lng: response[i].longitude
                    },
                    map: map,
                    icon: iconBase,
                    animation: google.maps.Animation.DROP

                }));

                var stringContent = response[i].address;

                var infowindow = new google.maps.InfoWindow({
                    content: stringContent,
                    maxWidth: 200
                });
                bindInfowindowWithMarker(toiletList, infowindow, i);
            }
            var markerCluster = new MarkerClusterer(map, toiletList,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }
    });
// Map styling
    var uluru = {lat: 0, lng: 0},
        map = new google.maps.Map(document.getElementById('map'), {
            center: uluru,
            zoom: 14
        });
    infoWindow = new google.maps.InfoWindow;
//Get user position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker2 = new google.maps.Marker({
                position: pos,
                map: map,
                icon: marker(url, s(20, 17), p(10, 8))
            });
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // If browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function bindInfowindowWithMarker(listOfToilets, infowindow, index){
    google.maps.event.addListener(listOfToilets[index], 'click', function () {
        infowindow.open(map, this);
        setTimeout(function () { infowindow.close(); }, 5000);

    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
function s(w, h) {
    return new google.maps.Size(w, h);
}
function p(x, y) {
    return new google.maps.Point(x, y);
}
function ll(y, x) {
    return new google.maps.LatLng(y, x);
}
function marker(url, size, hotspot, origin) {
    return new google.maps.MarkerImage(url, size, origin || p(0, 0), hotspot);
}

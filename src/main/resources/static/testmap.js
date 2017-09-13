var map, infoWindow,
    url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sBHxAxMpOb3XcAAAOBSURBVDjLfZRNa1xlGIav877nY2bOzJnMR77TNIkJpSpBW4qiGGJAECpSEFz0D/gDKrp9wVVBXPkLXLkrqBtBZKJFQaqghbZp09SkTUwyH5mvMzPnvHPOcZEUumj6wL17nmvz3PdtcMoopQRg27btdpYvXQSS7N9/3NZaB0BHKTV83p3xHJAFzFQWVj4bdPjonGsXisIwm35Iy2C40dON0VHrxurD9evAvlKqfypQKeW15l9d/enI+9qr+2fWXplmcbpA0UtT6wx48OSIu4/r3Nqqkjs3tvN+/uiat31vHagppRIA8xnYBPnShRub1reiUU0vX5gnPTlKfjzPzEiKIBPg4GDFNrlmwJ2bW7O981PfXM1mP7b73T+B/wDECSwTRdHi9/L8V9t399Le3BSMT0B+BDIukWkTp1ySfIF4bJzk7ByMlfn3zl76x/RrXwohlpRSRQCplDKAs9uzF6/+/Oveh1GpyOjSAsWJUUbyOTK2hU4EDS05HNocxDYHkaQRG9Dr03hULU8vz9e9o92ttbW1ugA8YGrTz7wT6JhkbJJBdoSelaMTSGoD2O1DLYB2CD1t03dKUJyAyUmCgWbTz6w4jlMA0ibgSim9Wms4S2EEcnk6Ikd7KKkDMoaUgC5QF9CS0MWEdB68IhQK1FrRDIICkDUBUwhh+M3Aw3XBcakmKUoGuAZEBlgG9CVUTWiY0JaAnYFUBtwsfifwyJMAlglorXXsOk6bSGbBJLIk94cwAM5YYNvQT6CewKEFiQNoEwwbTBs3JduABnwT8E3T9MuOfLzRjaeIYpAJ2jJ4aMC2AVb62FrBEGILsAGRQJxAklB2zZ1EJwOgJ4DOcDjcfSnT+8XRIQwGEA6ODWXAUELfPlZsnkRBAFpDEOBEmsW0fzMMwyqgZaVSYXV1NSyFh61mbumtvX5SJpuBnAupp04FQqAHBIAP1Jqwf8DreePepc5v16WU95VSwdN1P47jB5ed29fmDO1TrUOtDZ0TSPNEPU7e3YVagzmh/feSW58KITaUUl0ACVCpVKhUKv67b7+xP1/K/NXxs282+kEhiQEtIBTQS+BIw2ELeVDl5V536wNv+xPXf/K7Uqr+oraxgdF19/Lnjyz3is6mygeYaQwYJ+5b3aC2EHa+W/F/+AJoKKX0C+vrGbABpCzLyvqzK8uJIaPcTuWfMAw10D+tD/8H7d6IDx2EfHUAAAAASUVORK5CYII=';
var toiletList = [];
var currentAddress;
function initMap() {

    var icons = {
        zero: {
            icon: 'pictures\\0.png'
        },
        three: {
            icon: 'pictures\\1.png'
        },
        five: {
            icon: 'pictures\\3.png'
        },
        seven: {
            icon: 'pictures\\4.png'
        },
        eight: {
            icon: 'pictures\\5.png'
        },
        ten: {
            icon: 'pictures\\6.png'
        },
        twelve: {
            icon: 'pictures\\8.png'
        },
        fifteen: {
            icon: 'pictures\\9.png'
        },
        broken: {
            icon: 'pictures\\trasig.png'
        }
    };
    var count = 0;
    var checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
            checkboxes[i].checked = true;
        }
        $('.sidebar').on('shown', function () {
            google.maps.event.trigger(map, 'resize');
        })
    }

//Get toilet coords from database and put them on the map
    $.ajax({
        url: "/markers",
        type: "get",

        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                var changingTable, mustPay, isHandicap;
                var toiletIcon;
                count = response[i].isHandicap + response[i].hasChangingTable + response[i].mustPay;
                switch (count) {
                    case 0:
                        toiletIcon = icons.zero.icon;
                        isHandicap = false;
                        changingTable = false;
                        mustPay = false;
                        break;
                    case 3:
                        toiletIcon = icons.three.icon;
                        isHandicap = true;
                        changingTable = false;
                        mustPay = false;
                        break;
                    case 5:
                        toiletIcon = icons.five.icon;
                        isHandicap = false;
                        changingTable = true;
                        mustPay = false;
                        break;
                    case 7:
                        toiletIcon = icons.seven.icon;
                        isHandicap = false;
                        changingTable = false;
                        mustPay = true;
                        break;
                    case 8:
                        toiletIcon = icons.eight.icon;
                        isHandicap = true;
                        changingTable = true;
                        mustPay = false;
                        break;
                    case 10:
                        toiletIcon = icons.ten.icon;
                        isHandicap = true;
                        changingTable = false;
                        mustPay = true;
                        break;
                    case 12:
                        toiletIcon = icons.twelve.icon;
                        isHandicap = false;
                        changingTable = true;
                        mustPay = true;
                        break;
                    case 15:
                        toiletIcon = icons.fifteen.icon;
                        isHandicap = true;
                        changingTable = true;
                        mustPay = true;
                        break;
                    default:
                        toiletIcon = icons.broken.icon;
                        isHandicap = false;
                        changingTable = false;
                        mustPay = false;
                }
                toiletList.push(new google.maps.Marker({
                    title: response[i].address,
                    position: {
                        lat: response[i].latitude,
                        lng: response[i].longitude
                    },
                    map: map,
                    icon: toiletIcon,
                    animation: google.maps.Animation.DROP,
                    category: response[i].isHandicap
                }));
                var stringContent = response[i].address;
                var infowindow = new google.maps.InfoWindow({
                    content: stringContent,
                    maxWidth: 200
                });
                bindInfowindowWithMarker(toiletList, i, response);
                getTrueOrFalse(toiletList, i, mustPay, isHandicap, changingTable, infowindow, response);
            }
            var markerCluster = new MarkerClusterer(map, toiletList,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }
    });
// Map styling
    var uluru = {lat: 0, lng: 0},
        map = new google.maps.Map(document.getElementById('map'), {
            center: uluru,
            zoom: 11
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
//Filter markers depending
filterMarkers = function (category) {
    for (i = 0; i < toiletList.length; i++) {
        marker = toiletList[i];
        // If is same category or category not picked
        if (marker.category == category || category.length === 0) {
            marker.setVisible(true);
        }
        // Categories don't match
        else {
            marker.setVisible(false);
        }
    }
};

function bindInfowindowWithMarker(listOfToilets, index, response) {
    google.maps.event.addListener(listOfToilets[index], 'click', function () {
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
                //map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // If browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
        $("close").show();
        $(".address").html('<span>Adress: </span>' + (response[index].address));
        $(".hours").html('<span>Öppettider: </span>' + response[index].hours);
        $(".destination").html('<a href="http://www.google.com/maps/dir/Current+Location/'+response[index].latitude+','+response[index].longitude+'" target="_blank">Hitta dit</a>');
    });
}
function getTrueOrFalse(listOfToilets, index, mustPay, isHandicap, hasChangingTable, infowindow, response) {
    google.maps.event.addListener(listOfToilets[index], 'click', function () {
        var checkboxes = document.getElementsByTagName('input');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type === 'checkbox') {

                if (checkboxes[i].checked) {
                    currentAddress = response[index].address;
                    checkboxes[i].checked = false;
                    infowindow.open(map, this);
                    setTimeout(function () {
                        infowindow.close();
                    }, 2000);
                } else if(checkboxes[i].checked === false && currentAddress !== this.title) {
                    infowindow.open(map, this);
                    currentAddress = response[index].address;
                    setTimeout(function () {
                        infowindow.close();
                    }, 2000);
                } else {
                    checkboxes[i].checked = true;
                }

                $('.sidebar').on('shown', function () {
                    google.maps.event.trigger(map, 'resize');
                })
            }
        }
        switch (mustPay) {
            case true:
                $(".mustpay").text("Pris: 5kr");
                break;
            case false:
                $(".mustpay").text("Pris: 0kr");
                break;
        }
        switch (isHandicap) {
            case true:
                $(".ishandicap").text("Handikappvänlig: Ja");
                break;
            case false:
                $(".ishandicap").text("Handikappvänlig: Nej");
                break;
        }
        switch (hasChangingTable) {
            case true:
                $(".changingtable").text("Skötbord: Ja");
                break;
            case false:
                $(".changingtable").text("Skötbord: Nej");
                break;
        }
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
// Pop-up
var $pageBody = $("body"),
    $popupTrigger = $(".popup-trigger"),
    $popupTarget = $(".popup"),
    $closeTrigger = $popupTarget.find(".close-trigger");

$popupTarget.hide();

function closeCallbackForm(e) {
    var $target = $(e.target),
        closeButton = $target.hasClass("close-trigger"),
        popup = $target.closest($popupTarget[0]).length,
        closeCondition = !popup || closeButton;
    if ( closeCondition ) {
        $pageBody.removeClass("body-lightbox");
        $popupTarget.hide();
        $pageBody.off("click", closeCallbackForm);
        $closeTrigger.off("click", closeCallbackForm);
    }
}

function openCallbackForm() {
    $pageBody.addClass("body-lightbox");
    $popupTarget.show();
    $closeTrigger.on("click", closeCallbackForm);

    setTimeout(function(){
        $pageBody.on("click", closeCallbackForm);
    }, 50)

}

$popupTrigger.on("click", openCallbackForm);



var map;
var markers = [];
var infoWindow;

function initMap() {
      var Nigeria = {
        lat:9.0820,
        lng: 8.6753        
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center: Nigeria,
    zoom: 8
  });


    
    infoWindow = new google.maps.InfoWindow();
    searchUniversities();
}


function searchUniversities(){
    var foundUniversities = [];
    var zipCode = document.getElementById('zip-code-input').value;
    if(zipCode){
        universities.forEach(function(university){
            var postal = university.name;
            if(postal == zipCode){
                foundUniversities.push(university);
            }
        });
    } else {
        foundUniversities = universities;
    }
    clearLocations()
    displayUniversities( foundUniversities);
    showUniversitiesMarkers( foundUniversities);
    setOnClickListener();
}


function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}


function setOnClickListener() {
    var universityElements = document.querySelectorAll('.uni-container');
    universityElements.forEach(function(elem, index){
        elem.addEventListener('click', function(){
            google.maps.event.trigger(markers[index], 'click');
        })
    });
}

function displayUniversities(universities) {
    var universitiesHtml = "";
    universities.forEach(function(university, index){
        var address = university.addressLines;
        var phone = university.phoneNumber;
        universitiesHtml += `
            <div class="uni-container">
                <div class="uni-container-background">
                    <div class="uni-info-container">
                        <div class="uni-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="uni-phone-number">${phone}</div>
                    </div>
                    <div class="uni-number-container">
                        <div class="uni-number">
                            ${index+1}
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    document.querySelector('.uni-list').innerHTML = universitiesHtml;
}


function showUniversitiesMarkers(universities) {
    var bounds = new google.maps.LatLngBounds();
    universities.forEach(function(university, index){
        var latlng = new google.maps.LatLng(
            university.coordinates.latitude,
            university.coordinates.longitude);
        var website = university.website;
        var name = university.name;
        var address = university.addressLines[0];
        var statusText = university.openStatusText;
        var phone = university.phoneNumber;
       
           

        bounds.extend(latlng);
        createMarker(latlng, name, website, statusText, phone, index);
    })
    map.fitBounds(bounds);
}


function createMarker(latlng, name, website, statusText, phone, index) {
    var html = `
        <div class="uni-info-window">
            <div class="uni-info-name">
                ${name}
            </div>
            <div class="uni-info-status">
                ${statusText}
            </div>
            <div class="uni-info-address">
                <div class="circle">
                <i class="fas fa-globe-africa"></i>
                </div>
                ${website}
            </div>
            <div class="uni-info-phone">
                <div class="circle">
                    <i class="fas fa-phone-alt"></i>
                </div>
                ${phone}
            </div>
        </div>
    `;


    // var icon = {
    //     path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z", //SVG path of awesomefont marker
    //     fillColor: '#333333', 
    //     fillOpacity: 1,
    //     strokeWeight: 0,
    //     scale: 0.09, 
    //     anchor: new google.maps.Point(200,510), 
    //     labelOrigin: new google.maps.Point(205,190) 
    // }

    var marker = new google.maps.Marker({
     position: latlng,
      map: map,
      label: {
        fontFamily: "'Font Awesome 5 Free'",
        text:   '\uf0f7',
        fontWeight: 'bolder', 
        color: '#000000',
      },
    });






    // var marker = new google.maps.Marker({
    //   map: map,
    //   position: latlng,
    //   label: images
    // });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}








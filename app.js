let map;
let markers = [];
let locationMarkers = [];  // To store geolocation markers
let locationData = [];  // Store location data (name, address, category)

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.2557, lng: -79.8711},  // Default to Hamilton
        zoom: 12
    });

    // Place initial markers on the map
    placeInitialMarkers();

    // Geolocation Button
    document.getElementById('geolocationBtn').addEventListener('click', function() {
        getUserLocation();
    });

    // Form Submission for Adding New Marker
    document.getElementById('addMarkerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addMarkerFromForm();
    });
}

// Place initial markers (example: parks, restaurants)
function placeInitialMarkers() {
    const locations = [
        { name: 'Park 1', lat: 43.255, lng: -79.871, category: 'parks', address: 'Address 1' },
        { name: 'Restaurant 1', lat: 43.256, lng: -79.870, category: 'restaurants', address: 'Address 2' },
        // Add 10 or more locations
    ];

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: {lat: location.lat, lng: location.lng},
            map: map,
            title: location.name,
            category: location.category
        });
        
        const infowindow = new google.maps.InfoWindow({
            content: `<h3>${location.name}</h3><p>${location.address}</p>`
        });

        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });

        markers.push(marker);
        locationData.push(location);
    });
}

// Geolocation - Show User's Current Location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const marker = new google.maps.Marker({
                position: userLatLng,
                map: map,
                title: 'Your Location',
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
            locationMarkers.push(marker);
            map.setCenter(userLatLng);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Add a New Marker from Form
function addMarkerFromForm() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const category = document.getElementById('category').value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: name,
                category: category
            });

            const infowindow = new google.maps.InfoWindow({
                content: `<h3>${name}</h3><p>${address}</p>`
            });

            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });

            markers.push(marker);
            locationData.push({ name, address, category, lat: location.lat(), lng: location.lng() });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Filter Markers
function filterMarkers(category) {
    markers.forEach(marker => {
        if (category === 'all' || marker.category === category) {
            marker.setMap(map);
        } else {
            marker.setMap(null);
        }
    });
}

// Initialize the map
window.onload = initMap;

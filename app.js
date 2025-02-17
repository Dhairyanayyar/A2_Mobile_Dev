let mapInstance;
let allMarkers = [];
let currentLocation = null;
let chosenDestination = null;

// New locations with updated names and coordinates
const predefinedLocations = [
    { title: "Corktown Park", latitude: 43.2565, longitude: -79.8662, type: "parks" },
    { title: "Mohawk College Arboretum", latitude: 43.2558, longitude: -79.8684, type: "parks" },
    { title: "Whitehern Historic House", latitude: 43.2550, longitude: -79.8690, type: "other" },
    { title: "Webster's Falls", latitude: 43.2522, longitude: -80.0153, type: "falls" },
    { title: "Royal Ontario Museum", latitude: 43.6677, longitude: -79.3948, type: "museums" },
    { title: "Tim Hortons Field", latitude: 43.2554, longitude: -79.8222, type: "other" },
    { title: "Hamilton Farmers' Market", latitude: 43.2557, longitude: -79.8720, type: "other" },
    { title: "Hamilton Public Library", latitude: 43.2553, longitude: -79.8705, type: "museums" },
    { title: "Albion Falls", latitude: 43.1990, longitude: -79.8202, type: "falls" },
    { title: "Gore Park", latitude: 43.2551, longitude: -79.8699, type: "parks" }
];

// Initialize Map
function initializeMap() {
    mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.2557, lng: -79.8711 },
        zoom: 12
    });
    placeMarkers();
}
// Function to add markers on map
function placeMarkers() {
    predefinedLocations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: mapInstance,
            title: location.title,
            category: location.type
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h5>${location.title}</h5><p>Latitude: ${location.latitude.toFixed(6)}, Longitude: ${location.longitude.toFixed(6)}</p><button onclick="setDestination(${location.latitude}, ${location.longitude})">Get Directions</button>`
        });

        marker.addListener("click", () => {
            infoWindow.open(mapInstance, marker);
        });

        allMarkers.push(marker);
        addOptionToDropdown(location); // Add location to dropdown
    });
}


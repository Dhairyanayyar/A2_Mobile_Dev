// StAuth10244: I Dhairya Nayyar, 000923784 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else
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
function placeMarkers() {
    predefinedLocations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: mapInstance,
            title: location.title,
            category: location.type
        });

        const infoWindowContent = `
            <div style="color: #000; background-color: #fff; padding: 10px; border-radius: 5px; width: 200px;">
                <h5 style="margin: 0; font-size: 1.1em; color: #333;">${location.title}</h5>
                <p style="margin: 5px 0; color: #555;">Latitude: ${location.latitude.toFixed(6)}, Longitude: ${location.longitude.toFixed(6)}</p>
                <button onclick="setDestination(${location.latitude}, ${location.longitude})" style="background-color: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px;">Get Directions</button>
            </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });

        marker.addListener("click", () => {
            infoWindow.open(mapInstance, marker);
            setDestination(location.latitude, location.longitude); // Set destination when marker is clicked
        });

        allMarkers.push(marker);
        addOptionToDropdown(location); // Add location to dropdown
    });
}



// Function to add option to the destination dropdown
function addOptionToDropdown(location) {
    const option = document.createElement("option");
    option.value = `${location.latitude},${location.longitude}`;
    option.textContent = location.title;
    option.addEventListener("click", () => {
        const [lat, lng] = option.value.split(",");
        chosenDestination = { lat: parseFloat(lat), lng: parseFloat(lng) };
        console.log("Chosen Destination from Dropdown:", chosenDestination);
    });
    document.getElementById("destination").appendChild(option);
}



function setDestination(latitude, longitude) {
    chosenDestination = { lat: latitude, lng: longitude };
    console.log("Chosen Destination:", chosenDestination); // Debug log
    alert("Destination set! Now click 'Get Directions'.");
}

// Function to get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const userMarker = new google.maps.Marker({
                position: currentLocation,
                map: mapInstance,
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });

            mapInstance.setCenter(currentLocation);
        });
    }
}
// Function to get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const userMarker = new google.maps.Marker({
                position: currentLocation,
                map: mapInstance,
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });

            mapInstance.setCenter(currentLocation);
        });
    }
}
// Function to get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const userMarker = new google.maps.Marker({
                position: currentLocation,
                map: mapInstance,
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });

            mapInstance.setCenter(currentLocation);
        });
    }
}
function getDirections() {
    if (!currentLocation || !chosenDestination) {
        alert("Please set both your location and a destination!");
        console.log("Current Location:", currentLocation); // Debug log
        console.log("Chosen Destination:", chosenDestination); // Debug log
        return;
    }

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: mapInstance });

    directionsService.route(
        {
            origin: currentLocation,
            destination: chosenDestination,
            travelMode: "DRIVING"
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                alert("Directions request failed due to " + status);
            }
        }
    );
}

// Function to add a new marker based on user input
function addMarker() {
    const address = document.getElementById("address").value;
    const name = document.getElementById("markerName").value;
    const category = document.getElementById("category").value;

    // Validate the inputs
    if (!address || !name || !category) {
        alert("Please fill out all fields!");
        return;
    }

    const geocoder = new google.maps.Geocoder();

    // Geocode the address entered by the user
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            // Create the new marker at the geocoded location
            const newMarker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: mapInstance,
                title: name,
                category: category
            });

            // Create an InfoWindow for the new marker
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <h5>${name}</h5>
                    <p>Latitude: ${results[0].geometry.location.lat().toFixed(6)}, Longitude: ${results[0].geometry.location.lng().toFixed(6)}</p>
                    <button onclick="setDestination(${results[0].geometry.location.lat()}, ${results[0].geometry.location.lng()})">Get Directions</button>
                `
            });

            // Add a listener to the marker to open the InfoWindow when clicked
            newMarker.addListener("click", () => {
                infoWindow.open(mapInstance, newMarker);
            });

            // Store the new marker in the allMarkers array
            allMarkers.push(newMarker);

            // Add this location to the destination dropdown
            addOptionToDropdown({
                title: name,
                latitude: results[0].geometry.location.lat(),
                longitude: results[0].geometry.location.lng()
            });

            // Clear the input fields after adding the location
            document.getElementById("address").value = "";
            document.getElementById("markerName").value = "";
            document.getElementById("category").value = "";
        } else {
            // Handle geocoding failure
            alert("Geocode failed due to: " + status);
        }
    });
}


// Function to filter markers based on category
function filterMarkers(category) {
    allMarkers.forEach(marker => {
        if (category === 'all' || marker.category === category) {
            marker.setMap(mapInstance);  // Show marker
        } else {
            marker.setMap(null);  // Hide marker
        }
    });
}





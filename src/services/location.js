export default function geoFindMe() {
    return new Promise((resolve, reject) => {
        
        let mapLink_href = "";
        let mapLink_textContent = "";

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            mapLink_href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink_textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

            const data = {
                textContent: "Location found",
                mapLink_href,
                mapLink_textContent,
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };

            resolve(data);
        }

        function error() {
            const data = {
                textContent: "Unable to retrieve your location",
                mapLink_href: "",
                mapLink_textContent: "",
                lat: null,
                lon: null
            };

            reject(data);
        }

        if (!navigator.geolocation) {
            const data = {
                textContent: "Geolocation is not supported by your browser",
                mapLink_href: "",
                mapLink_textContent: "",
                lat: null,
                lon: null
            };

            reject(data);
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    });
}
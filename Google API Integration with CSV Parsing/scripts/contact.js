import { API_KEY } from "../config.js";


const Contact = () => {
  const contactContent = document.createElement('div');
  contactContent.setAttribute('class', 'container');

  const contactHeader = document.createElement('h1');
  contactHeader.setAttribute('class', 'text-center my-3 pt-5 mb-5');
  contactHeader.innerHTML = 'CONTACT';

  const contactAddress = document.createElement('h5');
  contactAddress.setAttribute('id', 'contact-ad');
  contactAddress.setAttribute('class', 'text-center');
  contactAddress.innerHTML = 'Address: 2160 Haines Ave. Rapid City, SD 57701';

  const contactParagraph = document.createElement('p');
  contactParagraph.setAttribute('class', 'my-3 pb-3 text-center');
  contactParagraph.innerHTML = 'Phone: 605-394-0338';

  contactContent.appendChild(contactHeader);
  contactContent.appendChild(contactAddress);
  contactContent.appendChild(contactParagraph);

  // create the map container element
  const mapContainer = document.createElement('div');
  mapContainer.setAttribute('id', 'map');
  mapContainer.style.height = '400px';
  mapContainer.style.width = '100%';
  contactContent.appendChild(mapContainer);


  // load CSV from asset folder
  loadPapaParse(() => {
    Papa.parse('./assets/restaurant_location.csv', { download: true, complete: function(results) {
      const pointCoords = results.data[1][0];
      const coordRegex = /POINT \(([^ ]+) ([^ ]+)\)/; 
      const isMatch = pointCoords.match(coordRegex);
      
        if (isMatch) {
          const lati = parseFloat(isMatch[2]);
          const longi = parseFloat(isMatch[1]);
          window.initMap = function () { 
            const mapOptions = { zoom: 15, center: { lat: lati, lng: longi }};
            const map = new google.maps.Map(mapContainer, mapOptions);
            const marker = new google.maps.Marker({ position: { lat: lati, lng: longi }, map: map });
          }
        }
      }
    });
  });

  loadGoogleMapsAPI();

  
  // create the map
  // window.initMap = function () { 
  //   const mapOptions = {
  //     zoom: 15, center: { lat: 44.080544, lng: -103.231018 }};
  //   const map = new google.maps.Map(mapContainer, mapOptions);
  // }

  return contactContent;
};


// PapaParse Loader (for CSV parsing)
function loadPapaParse(callback) {
  const papaScript = document.createElement('script');  
  papaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js';
  papaScript.onload = callback;
  document.head.appendChild(papaScript);
}
// Google Maps API loader
function loadGoogleMapsAPI() {
  const loaderScript = document.createElement('script');
  loaderScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
  loaderScript.defer = true;
  loaderScript.async = true;
  document.head.appendChild(loaderScript);
}




export default Contact;


// psuedo code 
// create a container div element, append to contactContent
// create a function that "creates a script element, sets the src attribute to the Google Maps API URL, and appends the script element to the head of the document"
// call the function to "load the API"
// initialize the map to concatenate as a parameter to the Google Maps API URL

// no idea how to make it dynamic. csv reading and shit

# Simple Google Maps Integration

Welcome to the quick guide on integrating the Google Maps API on our restaurant's contact page. This guide covers the essentials to help you manage and update the map feature. 

## Quick Overview

We use Google Maps API to showcase the restaurant's location, which is found on a csv file (restaurant_locations.csv). This guide explains the code setup and how it intereacts with the APIs. 

## Code Structure

The setup involves:

1.  **API Key Management**
2.  **Loading the Google Maps API**
3.  **Map Initialization**

## Managing the API Key
- Location: The API Key is stored in a config.js, located in our project's root.
- Security: config.js is excluded from version control via '.gitignore to keep our key secure.

### Loading the API

The Google Maps API is loaded with the following approach:

- Method: We use 'loadGoogleMapsAPI' in our contact page's script.
- This function dynamically inserts a `<script>` tag with the Google Maps API URL, embedding our `API_KEY` and specifying `initMap` as the callback.

```javascript
   function loadGoogleMapsAPI() {
   	const script = document.createElement('script');
   	script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
   	script.defer = true;
   	script.async = true;
    	document.head.appendChild(script); 
	}
```	

### Initializing the Map

The map is set up through `initMap`:

- Setup: `initMap` configures zoom level and center coordinates. 
- Execution: It then creates a map in the designated `<div>` element.
```javascript
    window.initMap = function () {
	    const mapOptions = { zoom: 15, center: { lat: lati, lng: longi }};
	    const map = new google.maps.Map(document.getElementById('map'), mapOptions); 
	    };
```	        
	
## Customizing the Map

Adjust the map by changing:
- Zoom: Edit the `zoom` value for closer or wider views.
- Center: Update `lati` and `longi` in center to shift the map focus. This can be found in the `restaurant_location.csv` under the assets folder.

## Wrap-Up

This simplified guide should help you navigate our Google Maps setup. For more detailed information, refer to the [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript).
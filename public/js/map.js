mapboxgl.accessToken = 'pk.eyJ1IjoiYnRyYXZlcnN5IiwiYSI6ImNqenY5MThjMDBqZ3YzY3A0N3ppZTA5Y2QifQ.LrFjedgw1wG34TkWCpNtFg';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9, // starting zoom
});


mapboxgl.accessToken = 'pk.eyJ1Ijoic2h3ZXRoYXIiLCJhIjoiY2xqd2UycHRkMGJzODNlcGtrMmE1YTNqeCJ9.uXKP82O-KCqmlWG8DqgXQQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [140.07,2.4],
  zoom: 4,
});

async function getEarthquakeData() {
  try {
    const res = await fetch('/earthquakedata');
    const data = await res.json();
    console.log(data);

    const earthquakeFeatures = data.data.features.map((earth) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates:earth.geometry.coordinates,
        },
        properties: {
          Region: earth.properties.Region,
          Magnitude: earth.properties.Magnitude,
          DateTime: earth.properties.DateTime,
        },
      };
    });

    LoadMap(earthquakeFeatures);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
  }
}

function LoadMap(earthquakeFeatures) {
  map.on('load', function () {
    map.addSource('earthquakes', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: earthquakeFeatures,
      },
    });
    map.addLayer({
        id: 'earthquake-layer',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-color': 'red',
          'circle-radius': 6,
          'circle-opacity': 0.7,
        },
        
      });
      // Check if the layer is added to the map
        const layerExists = map.getLayer('earthquake-layer');
        if (layerExists) {
        console.log('Data loaded and displayed on the map');
}
//onclicking the circles to display popup 
map.on('click', 'earthquake-layer', function (e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;

    // Create popup
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<h3>Region: ${properties.Region}</h3><h4>DateTime: ${properties.DateTime}</h4><h4>Magnitude: ${properties.Magnitude}</h4>`)
      
      .addTo(map);
  });

  // Change cursor to pointer when hovering over circles
  map.on('mouseenter', 'earthquake-layer', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change cursor back to default when not hovering over circles
  map.on('mouseleave', 'earthquake-layer', function () {
    map.getCanvas().style.cursor = '';
  });
  });
}

getEarthquakeData();




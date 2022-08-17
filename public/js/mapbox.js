/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiMGtyYXNoIiwiYSI6ImNsNnZwa25heDFtM3IzaWxtaWMxZG9xdWkifQ.I6w-k90mKuuGINTgCo6nSg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/0krash/cl6vqloeh000a14p0u2tdgg67',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    interactive: true,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
    duration: 0,
  });
};

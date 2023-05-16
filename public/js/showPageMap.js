mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
    center: bhaktidham.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(bhaktidham.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${bhaktidham.title}</h3><p>${bhaktidham.location}</p>`
            )
    )
    .addTo(map)

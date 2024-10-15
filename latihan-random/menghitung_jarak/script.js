document.getElementById('distanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const lat1 = parseFloat(document.getElementById('lat1').value);
    const lon1 = parseFloat(document.getElementById('lon1').value);
    const lat2 = parseFloat(document.getElementById('lat2').value);
    const lon2 = parseFloat(document.getElementById('lon2').value);

    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    document.getElementById('result').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km';
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dlon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dlon / 2) * Math.sin(dlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
document.getElementById('costForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const lat1 = parseFloat(document.getElementById('lat1').value);
    const lon1 = parseFloat(document.getElementById('lon1').value);
    const lat2 = parseFloat(document.getElementById('lat2').value);
    const lon2 = parseFloat(document.getElementById('lon2').value);
    const costPerKm = parseFloat(document.getElementById('costPerKm').value);

    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    const travelCost = distance * costPerKm;

    document.getElementById('result').innerText = `Jarak: ${distance.toFixed(2)} km\nBiaya Perjalanan: Rp${travelCost.toFixed(2)}`;
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius Bumi dalam km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Jarak dalam km
}

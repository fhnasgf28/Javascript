function convertToHex() {
    const r = parseInt(document.getElementById('r').value);
    const g = parseInt(document.getElementById('g').value);
    const b = parseInt(document.getElementById('b').value);

    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        document.getElementById('result').innerText = 'Please enter valid RGB values.';
        return;
    }

    const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    document.getElementById('result').innerText = 'Hex: ' + hex;
}
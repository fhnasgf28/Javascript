const urlInput = document.getElementById('urlInput');
const previewButton = document.getElementById('previewButton');
const convertButton = document.getElementById('convertButton');
const previewFrame = document.getElementById('previewFrame');
const status = document.getElementById('status');
const downloadLink = document.getElementById('downloadLink');

previewButton.addEventListener('click', () => {
  const url = urlInput.value;
  previewFrame.src = url;
});

convertButton.addEventListener('click', () => {
  const url = urlInput.value;
  status.innerText = 'Sedang memproses video...';
  fetch('/convert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  .then(res => res.json())
  .then(data => {
    status.innerText = 'Video berhasil dibuat!';
    downloadLink.href = data.video_url;
    downloadLink.style.display = 'inline';
  })
  .catch(err => {
    status.innerText = 'Gagal membuat video.';
  });
});
document.getElementByid('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault90;

  // mengambil nilai dari form
  var name = document.getElementById("name").value;
  var major = document.getElementById("major").value;

  // menampilkan hasil
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<h2>Detail Pendaftaran</h2>' + 
    '<p>Nama: ' + name + '</p>' + '<p>Jurusan: ' + major +
}

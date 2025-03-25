const kota = ["Surabaya", "Bandung", "Jakarta", "Medan", "Makassar"];
const cariKota = "Jakarta";

if (kota.includes(cariKota)) {
  console.log(cariKota, "ditemukan dalam array.");
} else {
  console.log(cariKota, "tidak ditemukan dalam array.");
}
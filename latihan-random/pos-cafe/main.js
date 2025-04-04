import { menu } from "./menu.js";
import { tambahPesanan, getPesanan, getTotal, resetPesanan } from "./pos.js";

const menuDiv = document.getElementById("menu");
const totalSpan = document.getElementById("total");
const pesananList = document.getElementById("pesananList");
const checkoutButton = document.getElementById("checkoutBtn");

menu.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = `${item.nama} - Rp${item.harga}`;
    btn.onclick = () => {
        tambahPesanan(item);
        updateUi();
    }
    menuDiv.appendChild(btn);
});

function updateUi() {
    const pesanan = getPesanan();
    pesananList.innerHTML = "";
    pesanan.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nama} - Rp${p.harga}`;
        pesananList.appendChild(li);
    });
    totalSpan.textContent = `Total: Rp${getTotal()}`;
}

checkoutButton.addEventListener("click", () => {
    const pesanan = getPesanan();
    if (pesanan.length === 0) {
        alert("Tidak ada pesanan yang dapat di-checkout.");
        return;
    }

    let struk = "==== STRUK ======"
    pesanan.forEach(item => {
        struk += `\n${item.nama} - Rp${item.harga}`;
    });
    struk += `\n==================\nTotal: Rp${getTotal()}`;
    alert(struk);
    resetPesanan();
    updateUi();
})
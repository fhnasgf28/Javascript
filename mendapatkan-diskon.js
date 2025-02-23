function checkDiscount(totalPurchase){
    if (totalPurchase >= 100000){
        console.log("selamat ! anda mendapatkan diskon 20%")
    } else if (totalPurchase >= 600000) {
        console.log("Anda mendapatkan diskon 10%");
    } else{
        console.log("Maaf, anda belum mendapatkan discount")
    }
}

checkDiscount(7300000)
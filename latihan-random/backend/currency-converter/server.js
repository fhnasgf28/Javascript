const express = require('express');
const app = express();
const port = 3000;

// middleware untuk parsing JSON
app.use(express.json());

// kurs konversi tetap (dummy data)

const exchangeRates = {
    USD: {IDR: 15000, EUR: 0.85, GBP: 0.72},
    EUR: {IDR: 18000, USD: 1.2, GBP: 0.9},
    GBP: {IDR: 22000, USD: 1.5, EUR: 1.1}
};

// ENDPOINT untuk konversi mata uang 
app.post('/convert', (req, res) => {
    const {amount, fromCurrency, toCurrency} = req.body;

    // VALIDASI INPUT 
    if (!amount || !fromCurrency || !toCurrency) {
        return res.status(400).json({error: 'Amount, fromCurrency, and toCurrency are required'});
    }

    // validasi mata uang tersedia dalam kurs 
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        return res.status(400).json({error: 'Invalid currency'});
    }

    // konversi mata uang
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;

    // kirimkan response
    res.json({convertedAmount, fromCurrency, toCurrency, amount, rate});
    });

// menjalankan server di port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
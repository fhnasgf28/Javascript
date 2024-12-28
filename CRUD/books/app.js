const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// middleware untuk parsing JSON
app.use(bodyParser.json());

// data sementara untuk menyimpan buku
let books = [];

// route untuk mendapatkan semua buku
app.get('/books', (req, res) => {
    res.json(books);
});

// route untuk menambahkan buku baru
app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    };
    books.push(book);
    res.status(201).json(book);
});

// route untuk memperbaharui buku
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (book){
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.year = req.body.year || book.year;
        res.json(book);
    }else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// route untuk menghapus buku
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.status(204).send();
});

// menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

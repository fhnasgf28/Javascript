const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// const storage engine for multer 
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Init upload
const upload = multer({ storage: storage });

// Serve static files from the public folder
app.use(express.static('public'));

// Endpoint to upload file
app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
});

// Endpoint to get list of uploaded files
app.get('/files', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve files' });
        }
        res.json(files);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
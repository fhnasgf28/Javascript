const express = require('express');
const bodyParser = require('body-parser');
const {pool} = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432
})

app.use(bodyParser.json());

app.post('/add-item', async (req, res) => {
    const { name, quantity, price} = req.body;

    try {
        const client = await pool.connect();
        await client.query('INSERT INTO items (name, quantity, price) VALUES ($1, $2, $3)', [name, quantity, price]);
        client.release();
        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding item' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
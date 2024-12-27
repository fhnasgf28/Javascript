const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// middleware untuk parsing JSON
app.use(bodyParser.json());
app.use(express.static('public'));

// data sementara untuk menyimpan tugas
let todos = [];

// route untuk mendapatkan semua tugas
app.get('/todos', (req, res) => {
    res.json(todos);
})

// route untuk menambahkan tugas baru
app.post('/todos', (req, res) => {
    const todo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// route untuk memperbaharui tugas
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo){
        todo.task = req.body.task || todo.task;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    }else{
        res.status(404).json({ error: 'Todo not found' });
    }
});

// route untuk menghapus tugas
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.status(204).send();
})

// menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
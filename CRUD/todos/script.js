async function fetchTodos() {
    const response = await fetch('/todos');
    const todos = await response.json();

    const list = document.getElementById('todos');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.textContent = todo.task;
        li.onclick = () => toggleTodoCompleted(todo.id);
        list.appendChild(li);
    })
}

async function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const task = newTaskInput.value;
    if (task) {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });
        if (response.ok) {
            newTaskInput.value = '';
            fetchTodos();
        }
    }
}

async function toggleComplete(id) {
    const response = await fetch(`/todos/${id}`);
    const todo = await response.json();
    await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !todo.completed })
    });
    fetchTodos();
}

document.addEventListener('DOMContentLoaded', fetchTodos);
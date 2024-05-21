document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const taskInput = document.getElementById("taskInput");
    const todoList = document.getElementById("todoList");

    let todos = []

    function renderTodos() {
        todoList.forEach((todo, index) => {
            const li = document.createElement("li")
            li.innerHTML = `<span>${todo}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>`;

            todoList.appendChild(li)
        });
    }

    window.addTask = function(event) {
        event.preventDefault();
        const task = taskInput.value;
        if (task) {
            todos.push(task);
            taskInput.value = '';
            renderTodos();
        }
    }

    window.editTask = function(index) {
        const newTask = prompt("edit the task:", todos[index]);
        if (newTask) {
            todos[index] = newTask;
            renderTodos();
        }
    }

    window.deleteTask = function(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    todoForm.addEventListener("submit", addTask)
})
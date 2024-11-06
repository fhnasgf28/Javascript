const inputtdl = document.querySelector('textarea');
const buttontdl = document.querySelector('.buttoninput');
const listtdl = document.querySelector('.todoList');

// load todos from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTodoLists);

// Event Listeners
buttontdl.addEventListener('click', clickButton);
listtdl.addEventListener('click', okedel);

// function to handle button click 
function clickButton(e) {
    e.preventDefault();
    addTodo();
}

// function to add a new todo item 
function addTodo() {
    if (inputtdl.value === '') return;
    
    const todo = {
        text: inputtdl.value,
        id: Date.now()
    };
    
    createTodoElement(todo);
    saveTodoList(todo);

    inputtdl.value = '';
}

// function to create todo element and append to list 
function createTodoElement(todo) {
    const itemall = document.createElement('div');
    itemall.classList.add('itemall');
    itemall.setAttribute('data-id', todo.id);

    const item = document.createElement('p')
    item.classList.add('item');
    item.innerText = todo.text;
    itemall.appendChild(item);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-button');
    itemall.appendChild(checkButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    itemall.appendChild(trashButton);

    listtdl.appendChild(itemall);
}
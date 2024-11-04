const todoValue = document.getElementById('todo-value');
const todoAlert = document.getElementById('Alert');
const listItems = document.getElementById('list-items');
const addUpdate = document.getElementById('AddUpdateClick');

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
    todo = [];
}

function CreateTodoItems() {
    if (todoValue.value === "") {
        todoAlert.innerText = "Please enter your todo text";
        todoValue.focus();
    } else {
        let IsPresent = false;
        todo.forEach((element) => {
            if (element == todoValue.value) {
                IsPresent = true;
            }
        });

        if(IsPresent) {
            setAlertMessage("This item is already present in the list")
            return;
        }

        let li = document.createElement("li");
        const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://img.icons8.com/ios/50/000000/edit.png" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://img.icons8.com/ios/50/000000/trash.png" /></div></div>`;
        
        li.innerHTML = todoItems;
        listItems.appendChild(li);

        if (!todo) {
            todo = [];
        }

        let itemList = { item: todoValue.value, status: false };
        todo.push(itemList);
        setLocalStorage();
    }

    todoValue.value = "";
    setAlertMessage("Todo Item Created Successfully");
}
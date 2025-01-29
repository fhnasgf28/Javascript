let habits = JSON.parse(localStorage.getItem("habits")) || [];

const habitInput = document.querySelector(".habit-input");
const addHabitButton = document.querySelector(".add-habit-button");
const habitList = document.querySelector(".habit-list");

function renderHabit() {
    habitList.innerHTML = "";
    habits.forEach((habit, index) => {
        const habitItem = document.createElement("div");
        habitItem.classList.add("habit-item");

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("delete-habit");
        deleteBtn.innerHTML = "❌";
        deleteBtn
    });
}
class Habit {
    constructor(name) {
        this.name = name ;
        this.history = [];
    }

    markDone() {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        if (!this.history.includes(today)) {
            this.history.push(today);
            alert(`Habit "${this.name}" marked as done for today.`);
        }
    }

    getWeeklyProgress() {
        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 6);

        return this.history.filter(dateStr => {
            const date = new Date(dateStr);
            return date >= weekAgo && date <= today;
        }).length;
    }
}

class HabitTracker {
    constructor() {
        this.habits = {};
    }

    addHabit(name) {
        if(!this.habits[name]) {
            this.habits[name] = new Habit(name);
            this.render();
            alert(`Habit "${name}" added.`);
        }
    }

    markDone(name) {
        if (this.habits[name]){
            this.habits[name].markDone();
            this.render();
        }
    }

render() {
    const list = document.getElementById("habitList");
    list.innerHTML = ''; // Clear the list before rendering

    for (const name in this.habits) {
        const habit = this.habits[name];
        const card = document.createElement("div");
        card.className = "habit-card";

        const title = document.createElement("div");
        title.className = "habit-name";
        title.textContent = name;

        const right = document.createElement("div");
        const progress = document.createElement("div");
        progress.className = "habit-progress";
        progress.textContent = `Weekly Progress: ${habit.getWeeklyProgress()} days`;

        const button = document.createElement("button");
        button.textContent = "Mark Done";
        button.onclick = () => this.markDone(name);
        right.appendChild(progress);
        right.appendChild(button);
        card.appendChild(title);
        card.appendChild(right);
        list.appendChild(card);
        }
    }
}

const habitTracker = new HabitTracker();
function addHabit() {
    const habitName = document.getElementById("habitName").value.trim();
    if (!habitName) {
        alert("Please enter a habit name.");
        return;
    }
    habitTracker.addHabit(habitName);
    document.getElementById("habitName").value = ''; // Clear input field
}
function markDone() {
    const habitName = document.getElementById("habitName").value.trim();
    if (!habitName) {
        alert("Please enter a habit name.");
        return;
    }
    habitTracker.markDone(habitName);
    document.getElementById("habitName").value = ''; // Clear input field
}
function clearHabits() {
    habitTracker.habits = {};
    habitTracker.render();
    alert("All habits cleared.");
}
function deleteHabit(name) {
    if (habitTracker.habits[name]) {
        delete habitTracker.habits[name];
        habitTracker.render();
        alert(`Habit "${name}" deleted.`);
    } else {
        alert(`Habit "${name}" not found.`);
    }
}
function clearHistory() {
    for (const name in habitTracker.habits) {
        habitTracker.habits[name].history = [];
    }
    habitTracker.render();
    alert("All habits history cleared.");
}
function renderHabits() {
    const list = document.getElementById("habitList");
    list.innerHTML = ''; // Clear the list before rendering
    habitTracker.render();
}
document.addEventListener("DOMContentLoaded", () => {
    renderHabits(); // Initial render of habits
});
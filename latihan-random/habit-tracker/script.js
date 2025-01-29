// app.js

let habits = JSON.parse(localStorage.getItem('habits')) || [];

const habitInput = document.getElementById('habit-input');
const addHabitBtn = document.getElementById('add-habit');
const habitList = document.getElementById('habit-list');

function renderHabits() {
  habitList.innerHTML = '';
  habits.forEach((habit, index) => {
    const habitItem = document.createElement('div');
    habitItem.classList.add('habit-item');

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-habit');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.onclick = () => deleteHabit(index);
    habitItem.appendChild(deleteBtn);

    const habitTitle = document.createElement('div');
    habitTitle.classList.add('habit-title');
    habitTitle.textContent = habit.name;
    habitItem.appendChild(habitTitle);

    const habitCalendar = document.createElement('div');
    habitCalendar.classList.add('habit-calendar');

    for (let i = 0; i < 30; i++) {
      const day = document.createElement('div');
      day.classList.add('day');
      day.textContent = i + 1;
      if (habit.days[i]) {
        day.classList.add('checked');
      }
      day.onclick = () => toggleDay(index, i);
      habitCalendar.appendChild(day);
    }

    habitItem.appendChild(habitCalendar);
    habitList.appendChild(habitItem);
  });
}

function addHabit() {
  const habitName = habitInput.value.trim();
  if (habitName === '') return;

  const newHabit = {
    name: habitName,
    days: Array(30).fill(false)
  };

  habits.push(newHabit);
  saveHabits();
  habitInput.value = '';
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
}

function toggleDay(habitIndex, dayIndex) {
  habits[habitIndex].days[dayIndex] = !habits[habitIndex].days[dayIndex];
  saveHabits();
  renderHabits();
}

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

addHabitBtn.addEventListener('click', addHabit);
window.addEventListener('load', renderHabits);

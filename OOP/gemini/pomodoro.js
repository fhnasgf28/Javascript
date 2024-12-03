class Task {
    constructor(name) {
        this.name = name;
    }
}

class Pomodoro {
    constructor(duration) {
        this.duration = duration;
        this.isRunning = false;
        this.timeLeft = this.duration;
    }

    start() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft === 0) {
                this.stop()
            }
        }, 1000)
    }

    stop() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.timeLeft = this.duration;
    }
}

class PomodoroSession {
    constructor() {
        this.currentTask = null;
        this.pomodorosCompleted = 0;
    }

    startTask(task) {
        this.currentTask = task;
        this.pomodoro = new Pomodoro(25 * 60);
        this.pomodoro.start();
    }
}

// Contoh penggunaan:
const task1 = new Task("Belajar JavaScript");
const session = new PomodoroSession();
session.startTask(task1);



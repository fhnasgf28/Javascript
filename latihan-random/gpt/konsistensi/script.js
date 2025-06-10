class Habit {
    constructor(name) {
        this.name = name;
        this.history = [];
    }
    markDone() {
        const today = new Date().toISOString().split('T')[0];
    }
}
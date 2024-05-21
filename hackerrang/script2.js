function weekdayText(weekdays) {
    return function getText(number) {
        if (number < 0 || number >= weekdays.length) {
            throw new Error('invalid weekday number');
        }
        return weekdays[number];
    };
}

// Contoh penggunaan
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getText = weekdayText(weekdays);

console.log(getText(0));  // Output: Sunday
console.log(getText(3));  // Output: Wednesday
console.log(getText(6));  // Output: Saturday

try {
    console.log(getText(7));  // Akan melempar error
} catch (error) {
    console.error(error.message);  // Output: invalid weekday number
}

try {
    console.log(getText(-1));  // Akan melempar error
} catch (error) {
    console.error(error.message);  // Output: invalid weekday number
}

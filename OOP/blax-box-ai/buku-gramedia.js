class Book {
    constructor(title, author, publicationYear) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
    }

    // METHOD to get details of the book
    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, Publication Year: ${this.publicationYear}`;
    }

    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, Publication Year: ${this.publicationYear}`;
    }

    // method to set the due date 
    setDueDate(days) {
        const due = new Date();
        due.setDate(due.getDate() + days);
        this.dueDate = due;
    }

    // method to get the due date in a readable format
    getDueDate() {
        return this.dueDate ? `Due Date: ${this.dueDate.toDateString()}` : "No due date set";
    }
}

// example usage
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
console.log(book1.getDetails());
book1.setDueDate(7);
console.log(book1.getDueDate());
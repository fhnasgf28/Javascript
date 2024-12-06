class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

class Library {
    constructor() {
        this.books= [];
    }

    addBook(book){
        this.books.push(book);
    }

    searchBooks(keyword) {
        return this.books.filter(book => 
            book.title.toLowerCase().includes(keyword.toLowerCase())
        )
    }
}

class UI {
    static displayResults(books) {
        const results = document.getElementById('results');
        results.innerHTML = ''

        if (books.length === 0) {
            results.innerHTML = `<li>No Books found</li>`
            return;
        }

        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (${book.year})`;
            results.appendChild(li);
        });
    }
}

const library = new Library();
library.addBook(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925));
library.addBook(new Book('To Kill a Mockingbird', 'Harper Lee', 1960));
library.addBook(new Book('1984', 'George Orwell', 1949));
library.addBook(new Book('Moby Dick', 'Herman Melville', 1851));
library.addBook(new Book('Pride and Prejudice', 'Jane Austen', 1813));

// eventListener
document.getElementById('searchBtn').addEventListener('click', () => {
    const keyword = document.getElementById('searchInput').value.trim();
    const results = library.searchBooks(keyword);
    UI.displayResults(results)
})
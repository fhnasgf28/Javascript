async function fetchBooks() {
    const response = await fetch('/books');
    const books = await response.json();
    const list = document.getElementById('book-list');
    list.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} - ${book.author} - ${book.year}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteBook(book.id);
        list.appendChild(li);
    });
}

async function addBook() {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const year = document.getElementById('book-year').value;
    if (title && author && year) {
        const response = await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, year })
        });
        if (response.ok) {
            document.getElementById('book-title').value = '';
            document.getElementById('book-author').value = '';
            document.getElementById('book-year').value = '';
            fetchBooks();
        }
    }
}

async function deleteBook(id) {
    await fetch(`/books/${id}`, {
        method: 'DELETE'
    });
    fetchBooks();
}

document.addEventListener('DOMContentLoaded', fetchBooks);
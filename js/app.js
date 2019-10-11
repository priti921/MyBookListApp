//Book Class: represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class: Handle UI Tasks
class UI {
    static displayBooks() {


        const books = Store.getBooks();
        books.forEach(book => UI.addBookToLIst(book));
    }

    static addBookToLIst(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td></td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete ml-4">X</td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);
        // NOTE: vanish in 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks());
//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all the fields', 'danger');
    } else {
        //show success
        UI.showAlert('You added a book!', 'success');
        //instatiate book
        const book = new Book(title, author, isbn);

        //add book to list
        UI.addBookToLIst(book);

        //add book to store
        Store.addBook(book);

        //clear fields
        UI.clearFields();
    }

})
//Event: remove a book
document.querySelector('#book-list').addEventListener('click', e => {
    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //remove book from ui
    UI.deleteBook(e.target);

    //show remove alert
    UI.showAlert('Book removed!', 'danger');
})
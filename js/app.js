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
        const StoredBooks = [{
                title: 'Book one',
                author: 'Jhon Doe',
                isbn: '234230'
            },
            {
                title: 'Book two',
                author: 'Jane Doe',
                isbn: '9840923'
            }
        ];

        const books = StoredBooks;

        books.forEach(book => UI.addBookToLIst(book));
    }

    static addBookToLIst(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete ml-4">X</td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//Store Class: Handles Storage

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if(title === '' || author === '' || isbn === ''){
        alert('please fill in all the fields');
    }else{
        //instatiate book
    const book = new Book (title, author, isbn);

    //add book to list
    UI.addBookToLIst(book);

    //clear fields
    UI.clearFields();
    }
    
})
//Event: remove a book
document.querySelector('#book-list').addEventListener('click', e => {
    UI.deleteBook(e.target);
})
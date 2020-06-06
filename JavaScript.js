//Handle Creation of Books; factory function
const createBooks = (title, author, isbn) => {
    return {title, author, isbn};
}


//Handle UI Changes; module function
const UI = (() => {
    //Add Book
    const addBookToList = (book) => {
        const list = document.querySelector('#book-list');
    
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    //Delete Book
    const deleteBook = (el) => {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
      };

    //Show Alert
    const showAlert = (message, className) => {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
    
      // Add or Remove book message vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    };

    //Delete Form Values
    const clearFields = () => {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    return{addBookToList, deleteBook, clearFields, showAlert};
})();

//Handle Local Storage; To be Completed



//Handle Event: Create Book on 'Submit' from fillable from
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
  
    // Instatiate, aka create a new book from form values
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
      } else {
    const book =  createBooks(title, author, isbn);
      
    // Add Book to UI
    UI.addBookToList(book);

    // Clear fields
    UI.clearFields();

    // Show success message
    UI.showAlert('Book Added', 'success');
    };
});


//Handle Event: Delete Book on 'Click'
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Show success message
    UI.showAlert('Book Removed', 'success');
});
const library = [];

function Book(title, author, pages, completed_reading) {
  if (!new.target) {
    alert("This should be used with new keyword");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed_reading = completed_reading;
}

const check_equality = function (book) {
  return `${this.title} - ${this.author}` === `${book.title} - ${book.author}`;
};

Book.prototype.eq = check_equality;

function bookExistsInLibrary(book) {
  return library.find((item) => item.eq(book)) ? true : false;
}

function addBookToLibrary(book) {
  library.push(book);
}

function removeBookFromLibrary(id) {
  const index = library.findIndex((book) => book.id === id);
  if (index !== -1) {
    library.splice(index, 1);
  }
}

function updateBookInLibrary(id, book) {
  book.id = id;
  const index = library.findIndex((book) => book.id === id);
  if (index !== -1) {
    library.splice(index, 1, book);
  }
}

let book = new Book("harry potter");
library.push(book);
console.log(library);
let book2 = new Book("harry potter");
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
let book3 = new Book("Wings Of Fire");
let book4 = new Book("The Wall");
addBookToLibrary(book3);
removeBookFromLibrary(book2.id);
console.log({ library });
console.log(bookExistsInLibrary(book3));
console.log(bookExistsInLibrary(book4));

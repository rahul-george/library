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

function renderBook() {
  let bookFragment = document.createDocumentFragment();
  let bookRow = document.createElement("tr");
  bookRow.classList.add("book-row");

  let title = document.createElement("td");
  title.textContent = this.title;
  bookRow.appendChild(title);

  let author = document.createElement("td");
  author.textContent = this.author;
  bookRow.appendChild(author);

  let pages = document.createElement("td");
  pages.textContent = this.pages;
  bookRow.appendChild(pages);

  let status = document.createElement("td");
  status.appendChild(renderMarkAsReadCheckbox(this.id, this.completed_reading));
  bookRow.appendChild(status);

  let removeButton = document.createElement("td");
  removeButton.appendChild(renderDeleteButton(this.id));

  bookRow.appendChild(removeButton);
  bookFragment.appendChild(bookRow);
  return bookFragment;
}

Book.prototype.eq = check_equality;
Book.prototype.render = renderBook;

function renderDeleteButton(id) {
  const deleteButton = document.createElement("button");
  deleteButton.dataset.bookId = id;
  deleteButton.addEventListener("click", onDeleteButtonClicked);
  const deleteImg = document.createElement("img");
  deleteImg.src = "./assets/delete.svg";
  deleteImg.className = "delete-icon";
  deleteButton.appendChild(deleteImg);
  return deleteButton;
}

function renderMarkAsReadCheckbox(id, status) {
  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.checked = status;
  checkboxInput.dataset.bookId = id;
  checkboxInput.addEventListener("click", onMarkAsReadCheckboxClicked);
  return checkboxInput;
}

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
  const index = library.findIndex((item) => item.id === id);
  if (index !== -1) {
    library.splice(index, 1, book);
  }
}

function getBookFromLibraryById(id) {
  return library.find((item) => item.id === id);
}

/* Functions that touch the DOM */

function clearBookRows() {
  const book_rows = document.querySelectorAll(".book-row");
  book_rows.forEach((row) => row.remove());
}

function renderLibrary() {
  const book_rows_container = document.querySelector(".book-rows");
  const book_rows_fragment = document.createDocumentFragment();
  library.forEach((book) => book_rows_fragment.appendChild(book.render()));
  book_rows_container.appendChild(book_rows_fragment);
}

function onDeleteButtonClicked(e) {
  removeBookFromLibrary(e.target.dataset.bookId);
  clearBookRows();
  renderLibrary();
}

function onMarkAsReadCheckboxClicked(e) {
  const book = getBookFromLibraryById(e.target.dataset.bookId);
  book.completed_reading = e.target.checked;
  console.log(book);
  updateBookInLibrary(book.id, book);
  console.log(library);
}

let book = new Book("harry potter", "J k Rowling", 500, false);
library.push(book);
console.log(library);
let book2 = new Book("Atomic Habits", "James Clear", 200, true);
addBookToLibrary(book2);
addBookToLibrary(book2);
addBookToLibrary(book2);
let book3 = new Book("Wings Of Fire", "APJ", 100, false);
let book4 = new Book("The Wall", "Rahul Dravid", 250, false);
addBookToLibrary(book3);
// removeBookFromLibrary(book2.id);
console.log({ library });
console.log(bookExistsInLibrary(book3));
console.log(bookExistsInLibrary(book4));
addBookToLibrary(book4);

console.log("Render book");
renderLibrary(book4);

console.log(renderDeleteButton(4));

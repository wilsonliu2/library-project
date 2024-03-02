"use strict";

const main = document.querySelector(".main"); // Container for the books
const formContainer = document.querySelector(".form-container"); // Container for the form
const formBtn = document.querySelector(".form-btn") // Button for opening up the form
const form = document.querySelector("form"); // Form
const submitBookBtn = document.querySelector(".submit-book-btn"); // Button for submitting new book
const formCloseBtn = document.querySelector(".form-close-btn"); // Button for closing the form

const redColor = "#f87171";
const greenColor = "#4ade80";

let enabled = false; // If form is open or closed
let myLibrary = []; // Books are stored here

// Book class
class Book {
    constructor(title, author, pages, read) {
       this.title = title;
       this.author = author;
       this.pages = pages;
       this.read = read; 
    }
}

// Display the book onto the page
function addBookToLibrary(book) {
    myLibrary.push(book);

    // Creates the book using information from the book object
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = myLibrary.length - 1;
    main.appendChild(card);

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("div");
    author.classList.add("author");
    author.textContent = "By: " + book.author;
    card.appendChild(author);

    const pages = document.createElement("div");
    pages.classList.add("pages");

    if (book.pages > 1) {
        pages.textContent = book.pages + " pages";
    } else {
        pages.textContent = book.pages + " page";
    }

    card.appendChild(pages);

    const read = document.createElement("div");
    read.classList.add("read");

    if (book.read) {
        read.classList.add("completed");
        read.textContent = "completed"
    } else {
        read.classList.add("reading");
        read.textContent = "reading"
    }

    card.appendChild(read);

    // Creates a button container for the buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttons");
    card.appendChild(buttonContainer);

    // button to change read status
    const readBtn = document.createElement("img");
    readBtn.classList.add("check");

    if (book.read == false) {
        readBtn.src = "./assets/check.svg"
        readBtn.style.background = greenColor;
    } else {
        readBtn.src = "./assets/close.svg"
        readBtn.style.background = redColor;
    }

    buttonContainer.appendChild(readBtn);

    // Changes the status of the book
    readBtn.addEventListener("click", () => {
        book.read = !book.read;
        
        if (book.read == false) {
            read.textContent = "reading";
            read.classList.add("reading");
            read.classList.remove("completed");
            readBtn.src = "./assets/check.svg";
            readBtn.style.background = greenColor;
        } else {
            read.textContent = "completed";
            readBtn.src = "./assets/close.svg";
            readBtn.style.background = redColor;
            read.classList.add("completed");
            read.classList.remove("reading");
        }
    })

    // button for deleting the book
    const deleteBtn = document.createElement("img");
    deleteBtn.classList.add("delete");
    deleteBtn.src = "./assets/delete.svg"
    deleteBtn.style.background = redColor;
    buttonContainer.appendChild(deleteBtn);

    // Deletes the book and remove it from the myLibrary array
    deleteBtn.addEventListener("click", () => {
        card.remove();
        myLibrary[card.dataset.index] = undefined;
    })
}

// Get form data and add it to the library array
function getFormData() {
    if (form.reportValidity() == false) {
        return;
    }

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    form.reset();
    formContainer.style.display = "none";
    enabled = false;
}

// Closing button for form
formBtn.addEventListener("click", () => {
    if (enabled) {
        formContainer.style.display = "none";
        enabled = false
    } else {
        formContainer.style.display = "block";
        enabled = true
    }
});

// Button for submitting the form and call getFormData function
submitBookBtn.addEventListener("click", () => {
    getFormData();
})

// Prevent form from refreshing the page
function handleForm(event) {
    event.preventDefault();
}

form.addEventListener("submit", handleForm);

// Button for closing the form
formCloseBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
    enabled = false;
})
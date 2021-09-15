/* eslint-disable max-classes-per-file */
const container = document.querySelector('#books-list');

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Books {
  constructor() {
    this.list = [];
  }

  addBook(book) {
    this.list.push(book);
  }

  removeBook(book) {
    this.list.splice(this.list.indexOf(book), 1);
  }

  copyList(list) {
    this.list = list;
  }
}

const books = new Books();

function displayArticle(book) {
  const article = document.createElement('article');
  article.setAttribute('id', `article-${book.id}`);
  const title = document.createElement('p');
  title.textContent = book.title;
  article.appendChild(title);
  const author = document.createElement('p');
  author.textContent = book.author;
  article.appendChild(author);
  const remButton = document.createElement('button');
  remButton.classList.add('remove-btn');
  remButton.textContent = 'Remove';
  remButton.addEventListener('click', () => {
    article.remove();
    books.removeBook(book);
    localStorage.setItem('books', JSON.stringify(books.list));
  });
  article.appendChild(remButton);
  const hr = document.createElement('hr');
  article.appendChild(hr);
  container.appendChild(article);
}

function displayBooksList(books) {
  for (let i = 0; i < books.list.length; i += 1) {
    displayArticle(books.list[i]);
  }
}

function createArticle(books, title, author) {
  if (title !== '' && author !== '') {
    const book = new Book(books.length, title, author);
    books.addBook(book);
    displayArticle(book);
    localStorage.setItem('books', JSON.stringify(book.list));
  }
}

const titleIn = document.querySelector('#title');
const authorIn = document.querySelector('#author');
const button = document.querySelector('#add-btn');

button.addEventListener('click', () => { createArticle(books, titleIn.value, authorIn.value); });

if (localStorage.getItem('books') !== null) {
  window.addEventListener('load', () => {
    const storedList = JSON.parse(localStorage.getItem('books'));
    books.copyList(storedList);
    displayBooksList(books);
  });
}
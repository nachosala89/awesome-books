/* eslint-disable max-classes-per-file */
const container = document.querySelector('#books-list');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Books {
  constructor() {
    this.list = [];
  }

  addBook(book) {
    this.list = [...this.list, book];
  }

  removeBook(book) {
    const oldList = this.list;
    const index = this.list.indexOf(book);
    this.list = [...oldList.slice(0, index), ...oldList.slice(index + 1)];
  }

  copyList(list) {
    this.list = [...list];
  }
}

const books = new Books();

function displayArticle(book) {
  const article = document.createElement('article');
  article.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'p-2');
  const text = document.createElement('span');
  text.textContent = `"${book.title}" by ${book.author}`;
  text.classList.add('fw-bold');
  article.appendChild(text);
  const remButton = document.createElement('button');
  const divBtn = document.createElement('div');
  remButton.classList.add('remove-btn');
  remButton.textContent = 'Remove';
  remButton.addEventListener('click', () => {
    article.remove();
    books.removeBook(book);
    localStorage.setItem('books', JSON.stringify(books.list));
    if (books.list.length === 0) {
      container.classList.add('d-none');
    }
  });
  divBtn.appendChild(remButton);
  article.appendChild(divBtn);
  container.appendChild(article);
}

function displayBooksList(books) {
  for (let i = 0; i < books.list.length; i += 1) {
    displayArticle(books.list[i]);
  }
}

function createArticle(books, title, author) {
  if (title !== '' && author !== '') {
    if (books.list.length === 0) {
      container.classList.remove('d-none');
    }
    const book = new Book(title, author);
    books.addBook(book);
    displayArticle(book);
    localStorage.setItem('books', JSON.stringify(books.list));
  }
}

const titleIn = document.querySelector('#title');
const authorIn = document.querySelector('#author');
const button = document.querySelector('#add-btn');

button.addEventListener('click', () => { createArticle(books, titleIn.value, authorIn.value); });

window.addEventListener('load', () => {
  const storedList = JSON.parse(localStorage.getItem('books'));
  if (storedList.length > 0) {
    books.copyList(storedList);
    displayBooksList(books);
    container.classList.remove('d-none');
  }
});

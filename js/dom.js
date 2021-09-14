function Book(title, author) {
  this.title = title,
  this.author = author
}

function addBook(list, title, author) {
  const book = new Book(title, author);
  list.push(book);
}

let books = [new Book('title 1', 'author 1'), new Book('title 2', 'author 2')];

const container = document.querySelector('#books-list');
let removeButtons = [];

for (let i = 0; i < books.length; i += 1) {
  const article = document.createElement('article');
  article.setAttribute('id', 'article-' + i);
  const title = document.createElement('p');
  title.textContent = books[i].title;
  article.appendChild(title);
  const author = document.createElement('p');
  author.textContent = books[i].author;
  article.appendChild(author);
  const button = document.createElement('button');
  button.classList.add('remove-btn');
  button.textContent = 'Remove';
  removeButtons.push(button);
  article.appendChild(button);
  const hr = document.createElement('hr');
  article.appendChild(hr);
  container.appendChild(article);
}

function removeBook(index) {
  const art = document.querySelector('#article-' + index);
  art.remove();
  books.splice(index, 1);
}

for (let i = 0; i < removeButtons.length; i += 1) {
  removeButtons[i].addEventListener('click', () => { removeBook(i); });
}

const addTitle = document.querySelector('#title');
const addAuthor = document.querySelector('#author');
const button = document.querySelector('#add-btn');

window.addEventListener('load', () => {
  let books = JSON.parse(localStorage.getItem('books'));
});
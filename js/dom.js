const container = document.querySelector('#books-list');

function createArticle(books, index) {
  const article = document.createElement('article');
  article.setAttribute('id', 'article-' + index);
  const title = document.createElement('p');
  title.textContent = books[index].title;
  article.appendChild(title);
  const author = document.createElement('p');
  author.textContent = books[index].author;
  article.appendChild(author);
  const button = document.createElement('button');
  button.classList.add('remove-btn');
  button.textContent = 'Remove';
  button.addEventListener('click', () => { removeBook(books, index); });
  article.appendChild(button);
  const hr = document.createElement('hr');
  article.appendChild(hr);
  container.appendChild(article);
}

function addBook(books, title, author) {
  if (title != '' && author != '') {
    const book = {
      title: title,
      author: author
    };
    books.push(book);
    createArticle(books, books.length - 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

function displayBooksList(books) {
  for (let i = 0; i < books.length; i += 1) {
    createArticle(books, i);
  }
}

let books = [];

function removeBook(books, index) {
  const art = document.querySelector('#article-' + index);
  art.remove();
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));
}

const titleIn = document.querySelector('#title');
const authorIn = document.querySelector('#author');
const button = document.querySelector('#add-btn');

button.addEventListener('click', () => { addBook(books, titleIn.value, authorIn.value); });

if (localStorage.getItem('books') !== null) {
  window.addEventListener('load', () => {
    books = JSON.parse(localStorage.getItem('books'));
    displayBooksList(books);
  });
}

// const removeButtons = document.querySelectorAll();
// for (let i = 0; i < removeButtons.length; i += 1) {
  
// }
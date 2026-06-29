const myLibrary = [];

function Book(title, author, pages, genre, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, genre, read) {
    const book = new Book(title, author, pages, genre, read);
    myLibrary.push(book);
}

function updateStats() {
    const total = myLibrary.length;
    const read = myLibrary.filter(b => b.read).length;
    const unread = total - read;
    const percent = total === 0 ? 0 : Math.round((read / total) * 100);

    document.getElementById('totalBooks').textContent = total;
    document.getElementById('booksRead').textContent = read;
    document.getElementById('booksUnread').textContent = unread;
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressText').textContent = percent + '%';
}

function displayBooks() {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-meta">${book.pages} pages · ${book.genre || 'General'}</div>
            <span class="book-status ${book.read ? '' : 'unread'}">${book.read ? 'Read' : 'Unread'}</span>
            <div class="card-actions">
                <button data-id="${book.id}" class="toggle-btn">Toggle read</button>
                <button data-id="${book.id}" class="remove-btn">Remove</button>
            </div>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const book = myLibrary.find(b => b.id === btn.dataset.id);
            book.toggleRead();
            displayBooks();
            updateStats();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = myLibrary.findIndex(b => b.id === btn.dataset.id);
            myLibrary.splice(index, 1);
            displayBooks();
            updateStats();
        });
    });

    updateStats();
}

const dialog = document.getElementById('addBookDialog');
const form = document.getElementById('addBookForm');

document.getElementById('newBookBtn').addEventListener('click', () => {
    dialog.showModal();
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const genre = document.getElementById('genre').value;
    const read = document.getElementById('readStatus').checked;
    addBookToLibrary(title, author, pages, genre, read);
    displayBooks();
    form.reset();
    dialog.close();
});
let activeGenre = 'All Books';

function displayBooks() {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';

    const filtered = activeGenre === 'All Books'
        ? myLibrary
        : myLibrary.filter(b => b.genre === activeGenre);

    filtered.forEach(book => {
        // same card code as before
    });
    updateStats();
}
document.querySelectorAll('#sidebar ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#sidebar ul li a').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        activeGenre = e.target.textContent;
        displayBooks();
    });
});
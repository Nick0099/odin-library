const Library = [];

function Book(title,author,pages,genre,read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
};

function addBookToLibrary(title,author,pages,genre,read){
    const book = new Book(title,author,pages,genre,read);
    Library.push(book);
}

function updateStats(){
    const total = Library.length;
    const read  = Library.filter(b => b.read).length;
    const unread = total - read;
    const percent = total === 0 ? 0 : Math.round((read/total)*100);

    document.getElementById('totalBooks').textContent= total;
    document.getElementById('booksRead').textContent= read;
    document.getElementById('booksUnread').textContent= unread;
    document.getElementById('progressFill').textContent= percent + '%';
    document.getElementById('progressText').textContent= percent + '%';
}


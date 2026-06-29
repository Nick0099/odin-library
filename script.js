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
}


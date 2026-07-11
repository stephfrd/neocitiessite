const myBooks = [
    {
        title: "Sound and Fury",
        author: "William Faulkner"
    },
    {
      title:"The Theory of Everything",
      author:"Stephen Hawking"
    }
];

const bookShelf = document.getElementById('book-list');

myBooks.forEach(book => {
    const entry = document.createElement('article');
    entry.className = 'book-entry';
    
    entry.innerHTML = `
        <span class="status-tag">${book.status}</span>
        <span class="author">${book.author}</span>
        <h2>${book.title}</h2>
        <p class="review">${book.thought}</p>
    `;
    
    bookShelf.appendChild(entry);
});

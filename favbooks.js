const myBooks = [
    {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky"
    },
    {
        title: "Frankenstein",
        author: "Mary Shelley"
    },
    {
        title: "The Secret History",
        author: "Donna Tartt"
    },
    {
        title: "Anna Karenina",
        author: "Leo Tolstoy"
    },
    {
        title: "Steppenwolf",
        author: "Herman Hesse",
    },
    {
        title: "The Stranger",
        author: "Albert Camus",
    },
    {
        title: "Agnes Grey",
        author: "Anne Bronte",
    },
    {
        title: "The Vegetarian",
        author: "Han Kang",
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

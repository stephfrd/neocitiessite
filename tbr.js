const myBooks = [
    {
        title: "Slaughterhouse-Five",
        author: "Kurt Vonnegut Jr",
    },
    {
        title: "Faust",
        author: "Johann Wolfgang von Goethe",
    },
    {
        title: "Blood Meridian",
        author: "Cormac McCarthy",
    },
      {
        title: "A Clockwork Orange",
        author: "Anthony Burgess",
    },
      {
        title: "The Strange Case of Dr Jekyll and Mr Hyde",
        author: "Robert Louis Stevenson",
    },
      {
        title: "House of Incest",
        author: "Anais Nin",
    },
    {
        title: "Physics",
        author: "Aristotle",
    },
    {
        title: "The Art of Rethoric",
        author: "Aristotle",
    },
    {
        title: "What is time? What is space?",
        author: "Carlo Rovelli",
    },
    {
        title: "No exit",
        author: "Jean Paul Sartre",
    },
    {
        title: "On the heights of despair",
        author: "Emil Cioran",
    },
    {
        title: "La Maison du Chat-qui-Pelote",
        author: "Honore de Balzac",
    },
    {
        title: "Happening",
        author: "Annie Ernaux",
    },
    {
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
    },
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

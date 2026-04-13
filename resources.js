const resources = [
    { 
        title: "The holy grail of html programming", 
        category: "web development", 
        color: "#00606c",
        note: "https://www.w3schools.com/ -i just love everything about this site so much" 
    },
      { 
        title: "Introduction to Python is great", 
        category: "python programming", 
        color: "#008cb2",
        note: "https://www.geeksforgeeks.org/python/python-programming-language-tutorial/ -it genuienly is a great lesson for all the basics of Python from A to Z" 
    },
     { 
        title: "The documentation never hurt anyone", 
        category: "python programming", 
        color: "#008cb2",
        note: "https://www.python.org/doc/ -i mean it's literally made by the python developers so, they would know, right?"
    },
    { 
        title: "The 101 CCNA Networking website", 
        category: "network engineering", 
        color: "#682c91",
        note: "https://www.practicalnetworking.net/index/ccna/ -it has all the theory anyone would need to know" 
    },
    { 
        title: "...or if you prefer video formats", 
        category: "network engineering", 
        color: "#682c91",
        note: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ" 
    },
    { 
        title: "This is for people who like to mostly speedrun things", 
        category: "embedded systems", 
        color: "#414f00",
        note: "https://youtu.be/BLrHTHUjPuw?si=o9aagxieMP6NYfC3 -is a super great introduction to anyone looking to enter the world of arduino" 
    },
    {
        title: "You can never go wrong with literally the documentation of the microcontroller", 
        category: "embedded systems", 
        color: "#414f00",
        note: "https://www.raspberrypi.com/documentation/computers/getting-started.html" 
    },
    {
         title: "A good introduction never hurt anyone", 
        category: "Java Programming", 
        color: "#a01c00",
        note: "https://www.geeksforgeeks.org/java/java-how-to-start-learning-java/ -you can basically look up anything programming related on this site it's amazing" 
    },
    {
           title: "Another great introductive course", 
        category: "Java Programming", 
        color: "#a01c00",
        note: "https://www.learnjavaonline.org/ -i'm 80% sure this is made by Oracle(don't take my word for it though)"
    },
];

const grid = document.getElementById('resource-list');
const buttons = document.querySelectorAll('.tab');

function displayResources(filter = 'all') {
    grid.innerHTML = ''; // Clear current
    
    const filtered = filter === 'all' 
        ? resources 
        : resources.filter(r => r.category === filter);

    filtered.forEach(res => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="badge" style="background: ${res.color}">${res.category}</span>
            <h3 style="color: ${res.color}">${res.title}</h3>
            <p>${res.note}</p>
        `;
        grid.appendChild(card);
    });
}

// Button Click Events
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        displayResources(btn.getAttribute('data-filter'));
    });
});

// Initial Load
displayResources();

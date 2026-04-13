const achievements = [
    {
        title: "Not unlocked yet",
        lesson: "Oops!",
    }
];

const mainGrid = document.getElementById('achievement-scroll');

achievements.forEach((item, index) => {
    const section = document.createElement('section');
    section.className = 'frame-container';
    
    section.innerHTML = `
        <div class="frame-item">
            <img src="${item.image}" alt="${item.title}">
            <h2>Exhibit ${index + 1}: ${item.title}</h2>
            <p>${item.lesson}</p>
        </div>
    `;
    
    mainGrid.appendChild(section);
});

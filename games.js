// 1. Your Game Data
const games = [
    { name: "Genshin Impact", logo: "https://i.pinimg.com/736x/03/e7/60/03e760b8e80b4abd6026a38b3dcdeb2f.jpg", rating: "8/10" },
    { name: "Persona 3", logo: "https://i.pinimg.com/736x/8f/5b/ed/8f5bed061f510732c975dbd09368c5ef.jpg", rating: "9/10" },
    { name: "Persona 5", logo: "https://i.pinimg.com/1200x/df/66/84/df66840ecec8729ce6d77ce49bc8f6e1.jpg", rating: "9/10" },
    { name: "Sims 4", logo: "https://i.pinimg.com/736x/c8/bb/c6/c8bbc6cf520d435fd6812b2ff3636a1b.jpg", rating: "8.5/10" },
    { name: "Doki Doki Literature Club", logo: "https://i.pinimg.com/736x/63/b2/8e/63b28ec1831c1f9a4d370fa066849c3c.jpg", rating: "8/10" },
    { name: "Shadow Fight", logo: "https://i.pinimg.com/736x/2d/9c/f9/2d9cf9a7f64bb3700f48261088ca2bd9.jpg", rating: "8/10" },
    { name: "FNAF 1", logo: "https://i.pinimg.com/736x/89/b4/0b/89b40b9579c7fb03868b2a9f6691d729.jpg", rating: "8.5/10" },
    { name: "FNAF 3", logo: "https://i.pinimg.com/736x/2d/8d/42/2d8d42521d91d28bc436acaf5ed7f01c.jpg", rating: "9.5/10" },
    { name: "FNAF 4", logo: "https://i.pinimg.com/736x/5a/59/2f/5a592f6c459d761a1a0f5a5ff6c0a82c.jpg", rating: "9.5/10" }
];

// 2. Wrap everything in a 'DOMContentLoaded' listener
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('game-grid');

    // Debugging: Check if the grid was actually found
    if (!grid) {
        console.error("Error: Could not find element with ID 'game-grid'. Check your HTML!");
        return;
    }

    console.log("Terminal ready. Loading games...");

    games.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'flip-card';
        
        // We use a Template Literal to build the card
        card.innerHTML = `
            <div class="flip-card-inner">
                <div class="card-front">
                    <img src="${game.logo}" 
                         alt="${game.name}" 
                         onerror="this.src='https://via.placeholder.com/150/ff00ff/ffffff?text=LINK+BROKEN'">
                </div>
                <div class="card-back">
                    <h2>${game.name}</h2>
                    <p>SYNC_RANK: ${game.rating}</p>
                </div>
            </div>
        `;

        // Flip logic
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

        grid.appendChild(card);
    });

    console.log(`${games.length} games injected into the terminal.`);
});

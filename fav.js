const palette = ["#f2cfb6", "#b4e7b8", "#b9cfa7", "#edd0fd", "#d0d392"];

const artistData = [
    { name: "Metallica", img: "https://i.pinimg.com/1200x/c9/64/10/c964109e1aae94fd7d4969b75b089cc1.jpg"},
    { name: "Nickleback", img: "https://i.pinimg.com/1200x/4e/58/c3/4e58c3743a9490ee71cd86b132f68c8e.jpg"},
    { name: "Taylor Swift", img: "https://i.pinimg.com/736x/23/63/73/236373997407b7dd66f276509a5b31ed.jpg"},
    { name: "AC/DC", img: "https://i.pinimg.com/736x/5c/5d/89/5c5d8969620857adee28a64901e415a7.jpg"},
    { name: "Evanescence", img: "https://i.pinimg.com/736x/1b/b7/86/1bb786f54e40b96f92d9e8216a3e7209.jpg"},
    { name: "Queen", img: "https://i.pinimg.com/736x/7d/49/de/7d49de63c8e4183d39943b257952bfc8.jpg"},
    { name: "System of a Down", img: "https://i.pinimg.com/736x/38/98/54/389854fede7f4d0041725d9f76c97101.jpg"},
    { name: "Lana Del Rey", img: "https://i.pinimg.com/736x/8d/1e/76/8d1e763b82f731f4629d195687c26073.jpg" },
    { name: "Sabrina Carpenter", img: "https://i.pinimg.com/736x/59/45/e3/5945e329b56851488f1bdb8db17281bd.jpg"},
    { name: "Pantera", img: "https://i.pinimg.com/736x/52/70/cc/5270cc10cbdfdc220c9079209e3c39ce.jpg"},
    { name: "Florence Welch", img: "https://i.pinimg.com/1200x/ea/27/e6/ea27e647e3b8f812a706292de3b0e15e.jpg"},
    { name: "Panic at the Disco", img: "https://i.pinimg.com/736x/c3/f0/e2/c3f0e2d79c66e4a4bbcce3689449d2f3.jpg"}
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('artist-grid');

    artistData.forEach((artist, index) => {
        const color = palette[index % palette.length];
        const card = document.createElement('div');
        card.className = 'artist-card';
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front" style="border-color: ${color}">
                    <img src="${artist.img}" alt="artist">
                    <h3 style="color: ${color}">${artist.name}</h3>
                </div>
                <div class="card-back" style="background-color: ${color}">
                    <h3>${artist.name}</h3>
                    <div class="vinyl-icon">🎵</div> 
                </div>
            </div>
        `;

        card.addEventListener('click', () => card.classList.toggle('is-flipped'));
        grid.appendChild(card);
    });
});

const palette = ["#f2cfb6", "#b4e7b8", "#b9cfa7", "#edd0fd", "#d0d392"];

// Sample Data: Add your 24 movies here
const allMovies = [
    { title: "The Virgin Suicides", dir: "S. Coppola", cast: "K. Dunst", stars: "5/5", img: "https://i.pinimg.com/1200x/92/be/ff/92befff6c102d0f01f4b1b9252e58435.jpg" },
    { title: "Oppenheimer", dir: "C. Nolan", cast: "C. Murphy", stars: "5/5",img: "https://i.pinimg.com/736x/b4/fc/40/b4fc4089a501a80912c9bd65a6a56ef0.jpg" },
    { title: "Marie Antoinette", dir: "S. Coppola", cast: "K. Dunst", stars: "4/5",  img: "https://i.pinimg.com/736x/08/9d/95/089d95ecb3fce751121714ee7990cb2f.jpg" },
    { title: "Midsommar", dir: "Ari Aster", cast: "F. Pugh", stars: "5/5",img: "https://i.pinimg.com/originals/05/3e/1d/053e1dbb8efb2054fb651ee8ce9003cf.gif" },
    { title: "Superman", dir: "J. Gunn", cast: "D. Corenswet, R. Brosnahan", stars: "5/5", img: "https://i.pinimg.com/736x/da/7e/d6/da7ed60e808268ca3d00ff1644dad482.jpg" },
    { title: "Deadpool and Wolverine", dir: "Shawn Levy", cast: "R. Reynolds, H. Jackman", stars: "5/5", img: "https://i.pinimg.com/736x/d1/1e/02/d11e02bfc2c45e8c2a45a78e990a192e.jpg"},
    { title: "Avengers: Endgame", dir: "J. & A. Russo", cast: "R.D.J, C.Evans, C.Hemsworth, M. Ruffalo ", stars: "5/5", img: "https://i.pinimg.com/1200x/0d/af/73/0daf73d3471efc7ae0392b9255773ee9.jpg" },
    { title: "Challengers", dir: "L. Guadagnino", cast: "Zendaya, M. Faist, J. O'Connor", stars: "5/5", img: "https://i.pinimg.com/736x/8e/de/d2/8eded245f1200e400b1c10b97fb061ca.jpg" },
    { title: "Barbie", dir: "G. Gerwig", cast: "M. Robbie, R. Gosling", stars: "5/5", img: "https://i.pinimg.com/1200x/63/f3/79/63f3798074e04acdb3585a9392ce2069.jpg" },
    { title: "Guardians of the Galaxy vol 2", dir: "James Gunn", cast: "C. Pratt, Z. Saldana, D. Bautista", stars: "5/5", img: "https://i.pinimg.com/1200x/00/38/e9/0038e931615f430165f70ba4f343d93d.jpg" },
    { title: "Guardians of the Galaxy vol 3", dir: "James Gunn", cast: "C. Pratt, Z. Saldana, D. Bautista", stars: "5/5", img: "https://i.pinimg.com/1200x/5c/60/3d/5c603d8ccf7f10656efd2c0002e1fe7d.jpg" },
    { title: "Top Gun Maverick", dir: "J. Kosinski", cast: "Tom Cruise, M. Teller, Val Kilmer", stars: "5/5", img: "https://i.pinimg.com/1200x/6f/dd/66/6fdd6677369748a3669c83bbf69407f3.jpg" },
    { title: "Hidden Figures", dir: "T. Melfi", cast: "O. Spencer, T. Henson, J. Monae", stars: "5/5", img: "https://i.pinimg.com/1200x/c0/a3/4f/c0a34f0838f2a809c8735fbd2863293d.jpg" },
    { title: "Whiplash", dir: "D. Chazelle", cast: "M. Teller, J.K Simmons", stars: "5/5", img: "https://i.pinimg.com/736x/b5/f4/fd/b5f4fd18565a0a75dd3cdda447d69b95.jpg" },
    { title: "Last Night in Soho", dir: "E. Wright", cast: "A.T. Joy", stars: "5/5", img: "https://i.pinimg.com/1200x/8d/06/a5/8d06a5f1a51beed13a3032f5f667cec0.jpg" },
    { title: "Little Women", dir: "G. Gerwig", cast: "E. Watson, F. Pugh, S. Roan, T. Chalamet", stars: "5/5", img: "https://i.pinimg.com/1200x/9b/6c/3f/9b6c3f4df16d73fb5cec3dc32e8ca9b2.jpg" },
    { title: "Tick Tick Boom", dir: "Lin-Manuel Miranda", cast: "A. Garfield", stars: "5/5", img: "https://i.pinimg.com/1200x/19/26/a5/1926a5c861294cabffef0fc184056f96.jpg" },
    { title: "Once Upon a Time in Hollywood", dir: "Q. Tarantino", cast: "B. Pitt, L. DiCaprio, M. Robbie", stars: "5/5", img: "https://i.pinimg.com/736x/70/c1/93/70c1931ccb70b7ee3a80da778b5a4e6c.jpg" },
    { title: "Mr and Mrs Smith", dir: "Doug Liman", cast: "B. Pitt & A. Jolie", stars: "5/5", img: "https://i.pinimg.com/1200x/a0/df/60/a0df60aaaab13c53618739233760a6ba.jpg" },
    { title: "Avengers Infinity War", dir: "J. & A. Russo", cast: "R.D.J, C.Evans, C.Hemsworth, M. Ruffalo", stars: "5/5", img: "https://i.pinimg.com/1200x/c6/17/71/c61771dc4dfcd2c9cc98eec28191e13a.jpg" },
    { title: "Gone Girl", dir: "David Fincher", cast: "R. Pike, B. Affleck", stars: "5/5", img: "https://i.pinimg.com/736x/3c/8c/6c/3c8c6ce9e7a1e39bb57d08f46bba7ac5.jpg" },
    { title: "Interstellar", dir: "C. Nolan", cast: "M. McConaughey, A. Hathaway, M. Craine", stars: "5/5", img: "https://i.pinimg.com/1200x/f0/0e/f4/f00ef4ef28062a3ffe32c80cfa039c86.jpg" },
    { title: "Zodiac", dir: "David Fincher", cast: "R.D.J, M. Ruffalo", stars: "5/5", img: "https://i.pinimg.com/1200x/3c/51/d8/3c51d81dd52dbaaf19c8b8b0510a6c51.jpg" },
    { title: "Empires Strikes Back", dir: "Irvin Kershner", cast: "M. Hamill, H. Ford, C. Fisher", stars: "5/5", img: "https://i.pinimg.com/1200x/7a/e4/96/7ae496f95a094ead52bb93b33ca34afd.jpg" },
];

const gallery = document.getElementById('gallery-wall');

// Create 6 strips
for (let s = 0; s < 6; s++) {
    const strip = document.createElement('div');
    strip.className = 'photo-strip';
    
    // Pick 4 movies for this strip
    const stripMovies = allMovies.slice(s * 4, (s * 4) + 4);

    stripMovies.forEach(movie => {
        const frame = document.createElement('div');
        frame.className = 'movie-frame';
        
        frame.innerHTML = `
            <img src="${movie.img}" alt="Film Still">
            <div class="movie-text">
                <h3 onclick="this.parentElement.parentElement.classList.toggle('active')">${movie.title}</h3>
                <span>Dir: ${movie.dir}</span>
                <span>Cast: ${movie.cast}</span>
                <div class="review-overlay">
                    <p>${movie.stars}</p>
                </div>
            </div>
        `;
        strip.appendChild(frame);
    });

    gallery.appendChild(strip);
}

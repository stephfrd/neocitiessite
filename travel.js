const locations = [
    { 
        name: "New York", 
        top: "35%", 
        left: "58%", 
        rotate: "-10deg",
        photo: "https://i.pinimg.com/736x/db/09/86/db0986e502a06f57e2708ef59c32be39.jpg" 
    },
    { 
        name: "Washington DC", 
        top: "65%", 
        left: "22%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/a1/8f/87/a18f87d544bc9e51cd434b5ef787e544.jpg"
    },
    { 
        name: "London", 
        top: "10%", 
        left: "22%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/ba/0a/86/ba0a86c922dbbf389025a62217bbb5ac.jpg"
    },
    {
        name: "Edinburgh", 
        top: "42%", 
        left: "47%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/736x/c1/7c/ab/c17cab630be048dab372a416ee553caa.jpg"
    },
     { 
        name: "Beijing", 
        top: "18%", 
        left: "6%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/52/a5/29/52a52935d97e96dc2a9a404c85bdb3e7.jpg"
    },
     { 
        name: "Singapore", 
        top: "55%", 
        left: "10%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/ac/4b/19/ac4b19d88c1fbdc78465a10774045e24.jpg"
    },
     { 
        name: "New Delhi", 
        top: "43%", 
        left: "25%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/fe/eb/bd/feebbd567497adbf8c6a6ce9295b0697.jpg"
    },
     { 
        name: "Bern", 
        top: "10%", 
        left: "29%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/736x/ad/5b/a0/ad5ba094cd263cf8e3c8516696ed7346.jpg"
    },
     { 
        name: "Oslo", 
        top: "33%", 
        left: "77%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/3b/d4/8a/3bd48a8d40c3fa045e2a7d848f9329a5.jpg"
    },
     { 
        name: "Stockholm", 
        top: "76%", 
        left: "67%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/6d/9b/99/6d9b99825881d9332d2af1110b179876.jpg"
    },
     { 
        name: "Vancouver", 
        top: "54%", 
        left: "56%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/39/b3/33/39b33387a6e5848795811738005eca7d.jpg"
    },
     { 
        name: "Mexico City", 
        top: "48%", 
        left: "19%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/ab/1d/6c/ab1d6c6f6f86a47f889b567468a47c3a.jpg"
    },
     { 
        name: "Monaco", 
        top: "37%", 
        left: "81%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/fb/b6/4b/fbb64b7ef2962f0c16034a9f751d2a4b.jpg"
    },
     { 
        name: "Reykjavík", 
        top: "33%", 
        left: "77%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/736x/84/22/d4/8422d4281dc7a82aa62d6637bf8bb8bb.jpg"
    },
     { 
        name: "Seoul", 
        top: "41%", 
        left: "72%", 
        rotate: "5deg",
        photo: "https://i.pinimg.com/1200x/4d/f9/d4/4df9d4c76ad51b253b64a7418559d513.jpg"
    }
    
];

document.addEventListener('DOMContentLoaded', () => {
    const mapTarget = document.getElementById('map-target');

    locations.forEach(loc => {
        const pinElement = document.createElement('div');
        pinElement.className = 'pin';
        
        pinElement.style.top = loc.top;
        pinElement.style.left = loc.left;

        pinElement.innerHTML = `
            <div class="stamp-photo" style="transform: rotate(${loc.rotate})">
                <img src="${loc.photo}" alt="${loc.name}">
            </div>
            <span class="pin-marker">📍</span>
            <span class="city-label">${loc.name}</span>
        `;

        mapTarget.appendChild(pinElement);
    });
});

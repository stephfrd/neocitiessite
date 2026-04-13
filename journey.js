const journeyData = [
    { title: "Scratch", info: "Like many others I have entered the amazing path of this amazing field with none other than block programming. Was good until I was 11." },
    { title: "Python", info: "In 5th grade I started learning Python, but that only lasted 3 months and I didnt make a lot of progress." },
    { title: "C++", info: "Learned it for the first time in middle school in our computer class and thought it was fun so I learned a bit of C++ in the summer before high school. I went on to learn C++ for the next 4 years of my high school journey." },
    { title: "HTML, CSS & JavaScript", info: "I took these as an elective for my computer science class in freshman year and I did not like them at all. In 11th grade I started actually learning and..now I'm making this website!" },
    { title: "Python redemption arc", info: "In the summer between 9th and 10th grade I decided to lock in and actually do some work about it and I can now code decently in Python." },
    { title: "C", info: "I'm not very good at this and I only learned it so I can program Arduino microcontrollers." },
    { title: "C#", info: "I have tried learning it and have used it in one Unity project that I gave up on in 4 months. Would personally not learn again." },
    {title: "Dart", info: "I made an app from spring 2025-early autumn 2025 in Dart. I consider myself at an intermediate level."},
    { title: "Java", info: "I learned it fairly recent for desktop applications and robotics programming and I am a beginner." }
];

const container = document.getElementById('timeline-flow');

journeyData.forEach(item => {
    const cp = document.createElement('div');
    cp.className = 'checkpoint';
    
    cp.innerHTML = `
        <div class="point-dot"></div>
        <div class="point-title">${item.title}</div>
        <div class="point-details">${item.info}</div>
    `;

    cp.querySelector('.point-title').addEventListener('click', () => {
        cp.classList.toggle('active');
    });

    container.appendChild(cp);
});

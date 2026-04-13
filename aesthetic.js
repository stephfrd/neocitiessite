const images = [
    "https://i.pinimg.com/1200x/dd/ff/91/ddff91ca449ba711ae9eb33b10413e42.jpg",
    "https://i.pinimg.com/736x/df/5a/e4/df5ae407736879c737bb3d9a8ae5a102.jpg",
    "https://i.pinimg.com/736x/f0/36/03/f03603a7a436f99fd775f4fdf4e30b59.jpg",
    "https://i.pinimg.com/736x/f1/d7/19/f1d719548d3447cdcc99e5b8897cb775.jpg",
    "https://i.pinimg.com/736x/60/7f/1f/607f1ff2e5c5662cd4691554ecab6073.jpg",
    "https://i.pinimg.com/1200x/9a/32/94/9a3294aa904aaf809e0ef59b7a41db3e.jpg",
    "https://i.pinimg.com/originals/39/89/8d/39898dd50e84128d275189afac545e45.gif",
    "https://i.pinimg.com/736x/36/79/9f/36799fcd194959cdfeab63e451162feb.jpg",
    "https://i.pinimg.com/736x/9d/80/59/9d8059ba01eca71fa66cdff9a460d83d.jpg",
    "https://i.pinimg.com/736x/fd/f8/90/fdf8902d5f51a394177fd8e81b952867.jpg",
    "https://i.pinimg.com/736x/10/70/b7/1070b79f48d099e27ea161e06dfeb025.jpg",
    "https://i.pinimg.com/736x/60/40/72/604072222d0ae17cd8c5c0d3e59d9d70.jpg",
    "https://i.pinimg.com/736x/f2/0b/b0/f20bb0b52af1ff675b1b4e22a403d4c0.jpg",
    "https://i.pinimg.com/736x/07/96/3f/07963fe0bd8ceb8cf5544c7508c1dd4e.jpg",
    "https://i.pinimg.com/736x/55/ba/f4/55baf463b570fe0176d2b0450a6b952f.jpg",
    "https://i.pinimg.com/736x/0f/c3/f5/0fc3f56a0e3aebe2e9a1884f75780eb9.jpg",
    "https://i.pinimg.com/736x/36/e2/f1/36e2f1df458a8ab1335971461566642f.jpg",
    "https://i.pinimg.com/736x/74/3d/1f/743d1f88478986d35552181525bc107a.jpg",
    "https://i.pinimg.com/originals/b6/e9/d6/b6e9d617fb41e4ada2f1bf9b879a4c8e.gif",
    "https://i.pinimg.com/736x/49/6f/cf/496fcf51ed49f752cb77d49b9ee5ab15.jpg",
    "https://i.pinimg.com/736x/ac/06/55/ac065555b739871cd7465d743512d88b.jpg",
    "https://i.pinimg.com/736x/da/1b/10/da1b1012c0cabd86c788af61449e5f57.jpg",
    "https://i.pinimg.com/736x/c2/71/f4/c271f4a6def1d780b3afc511bdebf202.jpg",
    "https://i.pinimg.com/736x/f7/90/5a/f7905a4a486e869746e459ba1caee2ed.jpg",
    "https://blob.gifcities.org/gifcities/ZUIUZ3VYS62SP26OAFW3IYUB6ISPNAQF.gif",
    "https://blob.gifcities.org/gifcities/4X6H76XXD5S7FCXCASBNDFCRGSCC336Z.gif",
    "https://blob.gifcities.org/gifcities/T44FFNELPT3WNQFNVSGOAJQUUXW2ESEW.gif",
    "https://blob.gifcities.org/gifcities/2KDBZNU5WWZKDBEDEN4CWUXUUCDZO3GU.gif",
    "https://blob.gifcities.org/gifcities/6DGH3E3HETW7HAUFJUHKINZSK6ZEB7FH.gif",
    "https://blob.gifcities.org/gifcities/53T7I2DZ5765WMKRIYIOAVHWWSDLAU6X.gif",
    "https://blob.gifcities.org/gifcities/GBWAUJS6ZCYWK6MXSR7VVK3VIYI6ZYJI.gif",
    "https://blob.gifcities.org/gifcities/GPDIVY6DB2NVFI34CKXPBPOTY3OW3LRE.gif",
    "https://blob.gifcities.org/gifcities/GG6QW7FZH77MNTELYEZ577LYPXITR4FU.gif",
    "https://blob.gifcities.org/gifcities/ZA542KCK6WOPLFYIDBHS2GXTKEXZO4DV.gif",
    "https://blob.gifcities.org/gifcities/74K4QOJ4HQNNDONNV6KIHAJIV5IATLJV.gif",
    "https://blob.gifcities.org/gifcities/BMOE67ZQBNWK45AF2ZY7YEKCLMOYPPVG.gif",
    "https://blob.gifcities.org/gifcities/HFXTBC3FVYGED57ARPX3WAK7HNWLRXB2.gif",
    "https://legallypumpkin.neocities.org/stamps/txt-robotKisser.png",
    "https://legallypumpkin.neocities.org/stamps/txt-pink01.gif",
    "https://legallypumpkin.neocities.org/stamps/other-3ds.gif",
    "https://legallypumpkin.neocities.org/stamps/other-youAreAnIdiot.gif",
    "https://legallypumpkin.neocities.org/stamps/dolls-mh01.png",
    "https://legallypumpkin.neocities.org/stamps/dolls-mhCupid.png",
    "https://legallypumpkin.neocities.org/stamps/logos/mcsm.png",
    "https://legallypumpkin.neocities.org/stamps#sanrio",
    "https://legallypumpkin.neocities.org/stamps/logos/mlp.gif",
    "https://legallypumpkin.neocities.org/stamps/logos/monsterHigh.gif",
    "https://legallypumpkin.neocities.org/stamps/fndm-fnaf02.jpeg",
    "https://legallypumpkin.neocities.org/stamps/fndm-pkmnTapuLele01.gif",
    "https://legallypumpkin.neocities.org/stamps/fndm-mlpTwilight01.png",
    "https://legallypumpkin.neocities.org/stamps/fndm-mlpSunset03.gif",
    "https://legallypumpkin.neocities.org/stamps/logos/fnaf.gif"
];

const tapeColors = [
    "var(--tape-peach)",
    "var(--tape-mint)",
    "var(--tape-sage)",
    "var(--tape-lavender)",
    "var(--tape-yellow)"
];

const canvas = document.getElementById('chaos-canvas');

// If you don't have 1000 unique links yet, 
// this loop will repeat your images until it hits 1000.
for (let i = 0; i < 1000; i++) {
    const photo = document.createElement('div');
    photo.className = 'photo-scrap';
    
    // 1. Pick Image
    const imgUrl = images[i % images.length];
    
    // 2. Random Position (Scatter them within the 5000px canvas)
    const x = Math.random() * 4500;
    const y = Math.random() * 4500;
    
    // 3. Random Rotation
    const rot = (Math.random() * 40) - 20; // Between -20 and 20 degrees
    
    // 4. Random Tape Color
    const tapeColor = tapeColors[Math.floor(Math.random() * tapeColors.length)];

    photo.style.left = `${x}px`;
    photo.style.top = `${y}px`;
    photo.style.transform = `rotate(${rot}deg)`;
    photo.style.zIndex = Math.floor(Math.random() * 1000); // Random overlapping

    photo.innerHTML = `
        <div class="tape" style="background: ${tapeColor}"></div>
        <img src="${imgUrl}" alt="chaos-scrap">
    `;

    canvas.appendChild(photo);
}

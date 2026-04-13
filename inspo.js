const closetItems = [
    { 
        title: "DRESS_01", 
        pinImage: "https://i.pinimg.com/736x/36/55/99/365599f5ec165830375feb6c51d07637.jpg", 
        pinLink: "https://ro.pinterest.com/pin/800655640030128892/" 
    },
    { 
        title: "DRESS_02", 
        pinImage: "https://i.pinimg.com/736x/40/b9/e5/40b9e5a98ede3faf24312c51b6e604ce.jpg", 
        pinLink: "https://ro.pinterest.com/pin/3870349674020387/" 
    },
    { 
        title: "DRESS_03", 
        pinImage: "https://i.pinimg.com/736x/f4/16/de/f416deaf2c1d7cbf5ba23168ec20bdda.jpg", 
        pinLink: "https://ro.pinterest.com/pin/36591815717861584/"
    },
     { 
        title: "DRESS_04", 
        pinImage: "https://i.pinimg.com/1200x/e0/8f/2f/e08f2fd443b1f5f94b5ed0aef3c6ecaf.jpg", 
       pinLink: "https://ro.pinterest.com/pin/800655640041527372/"
    },
    { 
        title: "DRESS_05", 
        pinImage: "https://i.pinimg.com/1200x/03/36/9c/03369c13f146c4b970d8f0a4c00f9103.jpg", 
       pinLink: "https://ro.pinterest.com/pin/7740630606562437/"
    },
    { 
        title: "DRESS_06", 
        pinImage: "https://i.pinimg.com/1200x/01/9e/a8/019ea84272f8001e17ab2fe2135e2f1f.jpg", 
       pinLink: "https://ro.pinterest.com/pin/68749284984/"
    },
    { 
        title: "DRESS_07", 
        pinImage: "https://i.pinimg.com/736x/80/ba/cc/80baccc5dc4d65c0105bbe4b07ba5cdd.jpg", 
       pinLink: "https://ro.pinterest.com/pin/333618284919540488/"
    },
    { 
        title: "DRESS_08", 
        pinImage: "https://i.pinimg.com/736x/6f/36/de/6f36dec2ab2f72f501b2137350423bad.jpg", 
       pinLink: "https://ro.pinterest.com/pin/4222193395883707/"
    },
    { 
        title: "DRESS_09", 
        pinImage: "https://i.pinimg.com/736x/f3/7f/d5/f37fd5d940ca4e65e0b2a3ba1e81e8da.jpg", 
       pinLink: "https://ro.pinterest.com/pin/6544361954834875/"
    },
    { 
        title: "DRESS_10", 
        pinImage: "https://i.pinimg.com/736x/b3/c6/75/b3c675459a44599d3fc63eda4ed56991.jpg", 
       pinLink: "https://ro.pinterest.com/pin/800655640029519203/"
    },
    { 
        title: "DRESS_11", 
        pinImage: "https://i.pinimg.com/1200x/c9/50/0b/c9500b2ffa2fc842d5c9d581e710232d.jpg", 
       pinLink: "https://ro.pinterest.com/pin/800655640029862565/"
    },
    { 
        title: "DRESS_12", 
        pinImage: "https://i.pinimg.com/736x/eb/50/f8/eb50f8533218e774e70547ae4270e1eb.jpg", 
       pinLink: "https://ro.pinterest.com/pin/800655640029862564/"
    },
    { 
        title: "DRESS_13", 
        pinImage: "https://i.pinimg.com/736x/57/ea/c6/57eac662f1a2919cbdcf2e8767dad2d6.jpg", 
       pinLink: "https://ro.pinterest.com/pin/2674081026212202/"
    },
    { 
        title: "DRESS_14", 
        pinImage: "https://i.pinimg.com/1200x/7e/c8/93/7ec8932c19c52f00fd2a32f1802a943c.jpg", 
       pinLink: "https://ro.pinterest.com/pin/9077636744619706/"
    },
    { 
        title: "DRESS_15", 
        pinImage: "https://i.pinimg.com/1200x/82/56/74/825674264f3fdee2232fc3dab0950726.jpg", 
       pinLink: "https://ro.pinterest.com/pin/800655640029514967/"
    },
    { 
        title: "DRESS_16", 
        pinImage: "https://i.pinimg.com/1200x/ca/a0/25/caa025889f9e8847d1178ba7ff1cc5d4.jpg", 
       pinLink: "https://ro.pinterest.com/pin/3166662233244191/"
    },
    { 
        title: "DRESS_17", 
        pinImage: "https://i.pinimg.com/736x/64/26/66/6426668b62cbfc0aa6c7068850c45b62.jpg", 
       pinLink: "https://ro.pinterest.com/pin/140806234391968/"
    },
    { 
        title: "DRESS_18", 
        pinImage: "https://i.pinimg.com/736x/1d/70/57/1d7057fae226cbdeb588e34922c97dd5.jpg", 
       pinLink: "https://ro.pinterest.com/pin/1548181186164685/"
    }
];

const palette = ["#f2cfb6", "#b4e7b8", "#b9cfa7", "#edd0fd", "#d0d392"];
const rack = document.getElementById('closet-rack');

closetItems.forEach((item, index) => {
    const color = palette[index % palette.length];
    const div = document.createElement('div');
    div.className = 'closet-item';
    
    div.innerHTML = `
        <div class="garment-column">
            <div class="hanger"></div>
            <div class="dress-shape" style="background-color: ${color}"></div>
        </div>
        <div class="item-details">
            <div class="polaroid">
                <img src="${item.pinImage}" alt="Archive Piece">
            </div>
            <a href="${item.pinLink}" class="pinterest-btn" target="_blank">PINTEREST_LINK</a>
        </div>
    `;

    div.addEventListener('click', () => {
        // Toggle only one open at a time
        document.querySelectorAll('.closet-item').forEach(el => {
            if (el !== div) el.classList.remove('active');
        });
        div.classList.toggle('active');
    });

    rack.appendChild(div);
});

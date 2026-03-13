const data = {
    games:[
        {title:"Super Smash Bros. Melee", region:"NTSC", image:""},
        {title:"Metroid Prime", region:"NTSC", image:""},
        {title:"Mario Kart Double Dash", region:"PAL", image:""},
        {title:"F-Zero GX", region:"NTSC-J", image:""}
    ],
    packs:{
        console:[
            {title:"Mario Kart GameCube Bundle", region:"PAL", image:""},
            {title:"Pokémon XD Bundle", region:"NTSC", image:""}
        ],
        bigbox:[
            {title:"Mario Party 7 Big Box", region:"PAL", image:""},
            {title:"Donkey Konga Bundle", region:"NTSC-J", image:""}
        ]
    },
    hardware:{
        controller:[
            {title:"GameCube Controller", image:""}
        ],
        faceplate:[
            {title:"Purple Faceplate", image:""}
        ],
        accessories:[
            {title:"Memory Card 251 Blocks", image:""},
            {title:"Game Boy Player", image:""}
        ]
    },
    cards:{
        pikmin:[
            {title:"Pikmin 2 Puzzle Card 1", image:""},
            {title:"Pikmin 2 Puzzle Card 2", image:""}
        ],
        animalcrossing:[
            {title:"AC e+ Series 1", image:""},
            {title:"AC e+ Series 2", image:""}
        ]
    },
    promo:{
        store:[
            {title:"Store Display Zelda", desc:"Promo Display", image:""},
        ],
        disc:[
            {title:"Promo Disc Master Quest", desc:"Limited Promo Disc", image:""}
        ],
        poster:[
            {title:"Zelda Poster", desc:"Promotional Poster", image:""}
        ],
        other:[
            {title:"Nintendo Kiosk", desc:"Demo Kiosk Item", image:""}
        ]
    },
    kiosk:[
        {title:"Interactive Demo Disc", region:"NTSC", image:""},
        {title:"Store Kiosk Disc", region:"PAL", image:""}
    ]
};

// Hilfsfunktionen
let currentPage="games";
let currentSub="";

function showPage(page){
    currentPage=page;
    currentSub="";

    if(page==="games" || page==="kiosk"){
        renderSubNav([]);
    }else if(page==="packs"){
        renderSubNav(["console","bigbox"]);
    }else if(page==="hardware"){
        renderSubNav(["controller","faceplate","accessories"]);
    }else if(page==="cards"){
        renderSubNav(["pikmin","animalcrossing"]);
    }else if(page==="promo"){
        renderSubNav(["store","disc","poster","other"]);
    }

    renderContent();
}

function renderSubNav(subs){
    let html="";
    if(subs.length>0){
        html=subs.map(s=>`<button onclick="selectSub('${s}')">${s}</button>`).join("");
    }
    document.getElementById("subnav").innerHTML=html;
}

function selectSub(sub){
    currentSub=sub;
    renderContent();
}

function renderContent(){
    let html="";
    let filterHTML="";

    if(currentPage==="games"){
        let items=data.games;
        filterHTML=`<div class="filter">
            <button onclick="filterItems('ALL')">All</button>
            <button onclick="filterItems('PAL')">PAL</button>
            <button onclick="filterItems('NTSC')">NTSC</button>
            <button onclick="filterItems('NTSC-J')">NTSC-J</button>
        </div>`;
        html=renderGrid(items);
    }else if(currentPage==="packs"){
        let items=data.packs[currentSub] || [];
        filterHTML=`<div class="filter">
            <button onclick="filterItems('ALL')">All</button>
            <button onclick="filterItems('PAL')">PAL</button>
            <button onclick="filterItems('NTSC')">NTSC</button>
            <button onclick="filterItems('NTSC-J')">NTSC-J</button>
        </div>`;
        html=renderGrid(items);
    }else if(currentPage==="hardware"){
        let items=data.hardware[currentSub] || [];
        html=renderGrid(items);
    }else if(currentPage==="cards"){
        let items=data.cards[currentSub] || [];
        html=renderGrid(items);
    }else if(currentPage==="promo"){
        let items=data.promo[currentSub] || [];
        html=renderPromo(items);
    }else if(currentPage==="kiosk"){
        let items=data.kiosk;
        filterHTML=`<div class="filter">
            <button onclick="filterItems('ALL')">All</button>
            <button onclick="filterItems('PAL')">PAL</button>
            <button onclick="filterItems('NTSC')">NTSC</button>
            <button onclick="filterItems('NTSC-J')">NTSC-J</button>
        </div>`;
        html=renderGrid(items);
    }

    document.getElementById("content").innerHTML=filterHTML+html;
}

function filterItems(region){
    let items=[];
    if(currentPage==="games"){
        items=region==="ALL"?data.games:data.games.filter(i=>i.region===region);
    }else if(currentPage==="packs"){
        items=region==="ALL"?data.packs[currentSub]:data.packs[currentSub].filter(i=>i.region===region);
    }else if(currentPage==="kiosk"){
        items=region==="ALL"?data.kiosk:data.kiosk.filter(i=>i.region===region);
    }
    document.getElementById("content").innerHTML=renderGrid(items);
}

function renderGrid(items){
    let html=`<div class="grid">`;
    items.forEach(i=>{
        html+=`
        <div class="card">
            <div class="image-frame">
                ${i.image?`<img src="${i.image}">`:"cover"}
            </div>
            <div class="title">${i.title}</div>
            ${i.region?`<div class="region">${i.region}</div>`:""}
        </div>`;
    });
    html+="</div>";
    return html;
}

function renderPromo(items){
    let html="";
    items.forEach(i=>{
        html+=`
        <div class="card" style="display:flex;gap:15px;align-items:center;">
            <div class="image-frame" style="flex:0 0 200px; height:200px;">
                ${i.image?`<img src="${i.image}">`:"image"}
            </div>
            <div>
                <div class="title">${i.title}</div>
                <div>${i.desc || ""}</div>
            </div>
        </div><br>`;
    });
    return html;
}

// Seite initial anzeigen
showPage("games");

let currentPage="games";
let currentSub="";

// -------------------- Daten --------------------
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
        game:[
            {title:"Mario Party 7 Big Box", region:"PAL", image:""},
            {title:"Donkey Konga Bundle", region:"NTSC-J", image:""}
        ]
    },
    hardware:{
        controller:[
            {title:"GameCube Controller", image:""},
            {title:"WaveBird Wireless Controller", image:""}
        ],
        faceplate:[
            {title:"Purple Faceplate", image:""},
            {title:"Silver Faceplate", image:""}
        ],
        other:[
            {title:"Memory Card 251 Blocks", image:""},
            {title:"Game Boy Player", image:""},
            {title:"Component Cable", image:""}
        ]
    },
    cards:{
        pikmin:[
            {title:"Pikmin 2 Puzzle Card 1", image:""},
            {title:"Pikmin 2 Puzzle Card 2", image:""}
        ],
        animalcrossing:{
            series1:[{title:"AC e+ Series1 Card 1", amount:1, image:""}],
            series2:[{title:"AC e+ Series2 Card 1", amount:2, image:""}],
            series3:[{title:"AC e+ Series3 Card 1", amount:3, image:""}],
            series4:[{title:"AC e+ Series4 Card 1", amount:4, image:""}],
        }
    },
    promo:{
        store:[
            {title:"Store Display Zelda", desc:"Promo Display", image:""}
        ],
        disc:[
            {title:"Promo Disc Master Quest", desc:"Limited Promo Disc", image:""}
        ],
        poster:[
            {title:"Zelda Poster", desc:"Promotional Poster", image:""}
        ]
    },
    kiosk:[
        {title:"Interactive Demo Disc", region:"NTSC", image:""},
        {title:"Store Kiosk Disc", region:"PAL", image:""}
    ]
};

// -------------------- Seitensteuerung --------------------
function showPage(page){
    currentPage=page;
    currentSub="";

    let subs=[];
    if(page==="packs") subs=["console","game"];
    else if(page==="hardware") subs=["controller","faceplate","other"];
    else if(page==="cards") subs=["pikmin","animalcrossing"];
    else if(page==="promo") subs=["store","disc","poster"];
    else subs=[];

    renderSubNav(subs);
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

// -------------------- Inhalt rendern --------------------
function renderContent(){
    let html="";
    let filterHTML="";

    if(currentPage==="games"){
        let items=data.games;
        filterHTML=renderFilter(["ALL","PAL","NTSC","NTSC-J"]);
        html=renderGrid(items);
    }else if(currentPage==="packs"){
        let items=data.packs[currentSub] || [];
        filterHTML=renderFilter(["ALL","PAL","NTSC","NTSC-J"]);
        html=renderGrid(items);
    }else if(currentPage==="hardware"){
        let items=data.hardware[currentSub] || [];
        html=renderGrid(items);
    }else if(currentPage==="cards"){
        if(currentSub==="pikmin") html=renderGrid(data.cards.pikmin);
        else if(currentSub==="animalcrossing"){
            html="";
            const seriesList=data.cards.animalcrossing;
            for(let s in seriesList){
                html+=`<h3>${s}</h3>` + renderGrid(seriesList[s]);
            }
        }
    }else if(currentPage==="promo"){
        let items=data.promo[currentSub] || [];
        html=renderPromo(items);
    }else if(currentPage==="kiosk"){
        let items=data.kiosk;
        filterHTML=renderFilter(["ALL","PAL","NTSC","NTSC-J"]);
        html=renderGrid(items);
    }

    document.getElementById("content").innerHTML=filterHTML+html;
}

// -------------------- Filter --------------------
function renderFilter(options){
    return `<div class="filter">${options.map(r=>`<button onclick="filterItems('${r}')">${r}</button>`).join("")}</div>`;
}

function filterItems(region){
    let items=[];
    if(currentPage==="games") items=region==="ALL"?data.games:data.games.filter(i=>i.region===region);
    else if(currentPage==="packs") items=region==="ALL"?data.packs[currentSub]:data.packs[currentSub].filter(i=>i.region===region);
    else if(currentPage==="kiosk") items=region==="ALL"?data.kiosk:data.kiosk.filter(i=>i.region===region);

    document.getElementById("content").innerHTML=renderFilter(["ALL","PAL","NTSC","NTSC-J"])+renderGrid(items);
}

// -------------------- Grid / Promo Layout --------------------
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
            ${i.amount?`<div class="region">Amount: ${i.amount}</div>`:""}
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

// -------------------- Initialisierung --------------------
showPage("games");

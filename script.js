let currentPage="games";
let currentSub="";

const data = {
    games:[
        {title:"Super Smash Bros. Melee", region:"NTSC", image:"images/games/melee.jpg"},
        {title:"Metroid Prime", region:"NTSC", image:"images/games/metroid_prime.jpg"},
        {title:"Mario Kart: Double Dash!!", region:"PAL", image:"images/games/mk_dd.jpg"},
        {title:"The Legend of Zelda: The Wind Waker", region:"PAL", image:"images/games/zelda_wind_waker.jpg"},
        {title:"F-Zero GX", region:"NTSC-J", image:"images/games/fzero_gx.jpg"},
        {title:"Luigi’s Mansion", region:"PAL", image:"images/games/luigi_mansion.jpg"},
        {title:"Animal Crossing", region:"NTSC", image:"images/games/animal_crossing.jpg"},
    ],
    packs:{
        console:[
            {title:"GameCube Mario Kart Bundle (PAL)", region:"PAL", image:"images/packs/gc_mk_bundle_pal.jpg"},
            {title:"GameCube Pokémon XD Bundle (NTSC)", region:"NTSC", image:"images/packs/gc_pokemon_xd_bundle_ntsc.jpg"}
        ],
        game:[
            {title:"Mario Party 7 Big Box (PAL)", region:"PAL", image:"images/packs/mp7_bigbox_pal.jpg"},
            {title:"Donkey Konga Pack (NTSC-J)", region:"NTSC-J", image:"images/packs/donkey_konga_j.jpg"},
            {title:"Super Mario Sunshine Big Box (NTSC)", region:"NTSC", image:"images/packs/sms_bigbox_ntsc.jpg"}
        ]
    },
    hardware:{
        controller:[
            {title:"Nintendo GameCube Controller (Standard)", image:"images/hardware/controller_standard.jpg"},
            {title:"WaveBird Wireless Controller", image:"images/hardware/wavebird.jpg"}
        ],
        faceplate:[
            {title:"Indigo Faceplate", image:"images/hardware/faceplate_indigo.jpg"},
            {title:"Black Faceplate", image:"images/hardware/faceplate_black.jpg"}
        ],
        other:[
            {title:"GameCube Memory Card 251", image:"images/hardware/memorycard_251.jpg"},
            {title:"Game Boy Player", image:"images/hardware/gameboy_player.jpg"},
            {title:"Component Cable", image:"images/hardware/component_cable.jpg"}
        ]
    },
    cards:{
        pikmin:[
            {title:"Pikmin 2 Puzzle Card A", image:"images/cards/pikmin2_a.jpg"},
            {title:"Pikmin 2 Puzzle Card B", image:"images/cards/pikmin2_b.jpg"}
        ],
        animalcrossing:{
            series1:[{title:"AC e+ Series 1 Card 001", amount:1, image:"images/cards/ac_eplus_s1_001.jpg"}],
            series2:[{title:"AC e+ Series 2 Card 010", amount:10, image:"images/cards/ac_eplus_s2_010.jpg"}],
            series3:[{title:"AC e+ Series 3 Card 025", amount:25, image:"images/cards/ac_eplus_s3_025.jpg"}],
            series4:[{title:"AC e+ Series 4 Card 050", amount:50, image:"images/cards/ac_eplus_s4_050.jpg"}],
        }
    },
    promo:{
        store:[
            {title:"Zelda Store Display Sign", desc:"In‑Store Display für Zelda Promotion", image:"images/promo/zelda_display.jpg"}
        ],
        disc:[
            {title:"Demo Disc: Nintendo GameCube Sampler", desc:"Promo Demo Disc mit mehreren Titeln", image:"images/promo/demo_disc.jpg"}
        ],
        poster:[
            {title:"Super Smash Bros. Melee Poster", desc:"Werbeposter aus dem Jahr 2001", image:"images/promo/ssbm_poster.jpg"}
        ]
    },
    kiosk:[
        {title:"GameCube Interactive Demo Disc (NTSC)", region:"NTSC", image:"images/promo/kiosk_ntsc.jpg"},
        {title:"Store Kiosk Disc (PAL)", region:"PAL", image:"images/promo/kiosk_pal.jpg"}
    ]
};

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

showPage("games");

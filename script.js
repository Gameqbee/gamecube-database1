const games = [

{title:"Super Smash Bros. Melee", region:"NTSC", image:""},
{title:"Metroid Prime", region:"NTSC", image:""},
{title:"Mario Kart Double Dash", region:"PAL", image:""},
{title:"F-Zero GX", region:"NTSC-J", image:""}

];

function showPage(page){

if(page==="games"){
renderGames("ALL");
return;
}

document.getElementById("content").innerHTML="<h2>"+page+"</h2>";

}

function renderGames(region){

let list=games;

if(region!=="ALL"){
list=games.filter(g=>g.region===region);
}

let html=`
<div class="filter">
<button onclick="renderGames('ALL')">All</button>
<button onclick="renderGames('PAL')">PAL</button>
<button onclick="renderGames('NTSC')">NTSC</button>
<button onclick="renderGames('NTSC-J')">NTSC-J</button>
</div>

<div class="grid">
`;

list.forEach(game=>{

html+=`
<div class="card">

<div class="image-frame">
${game.image ? `<img src="${game.image}">` : "cover"}
</div>

<div class="title">${game.title}</div>
<div class="region">${game.region}</div>

</div>
`;

});

html+="</div>";

document.getElementById("content").innerHTML=html;

}

showPage("games");

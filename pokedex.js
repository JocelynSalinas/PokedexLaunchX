// Elementos del DOM
const pokemonData = document.getElementById("pokemon-data");
const button = document.getElementById("search-button");
const input = document.getElementById("input");


//EVENTO ONCLICK DEL BOTON 
button.onclick = () => {
    let pokeName = input.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            ChangePokeImage("./images/notFound.gif");
        }

        return res.json();
    }).then((data) => {
        if (pokeName !== "") {            
            ChangePokeImage(data.sprites.other.home.front_default);
            ChangePokeFeatures(data);
            ChangePokeStats(data);
            MoviPokeList(data);
        }
    });
}
//cambiar imagen pokemon
const ChangePokeImage = (url) => {
    const img = document.getElementById("imgPoke");
    imgPoke.src = url;
}
// Imprimir características del pokemon
const ChangePokeFeatures = (data) => {

    // Caracteristicas
    const pokeName = document.getElementById("pokemon-name");
    const pokeType = document.getElementById("pokemon-type");
    const pokeId = document.getElementById("pokemon-id");
    const pokeHeight = document.getElementById("pokemon-height");
    const pokeWeight = document.getElementById("pokemon-weight");

    pokeName.innerText = data.name.toUpperCase(); 
    pokeType.innerText = "";

    //lista dinamica si pertenece a un solo tipo o dos
    for(let i = 0; i < data.types.length; i ++) {
        const type = document.createElement("span");
        type.classList.add("pokemon_type");
        pokeType.appendChild(type);
        type.innerText = data.types[i].type.name;
    }
    pokeId.innerText = data.id;
    pokeHeight.innerText = data.height;
    pokeWeight.innerText = data.weight;
}

// Imprimir las estadísticas del pokemon
const ChangePokeStats = (data) => {

    // Datos Estadisticas
    const PokeHp = document.getElementById("hp");
    const PokeAtk = document.getElementById("atk");
    const PokeDef = document.getElementById("def");
    const PokeSatk = document.getElementById("satk");
    const PokeSdef = document.getElementById("sdef");
    const PokeSpd = document.getElementById("spd");

    //Efectuar cambio con datos API
    PokeHp.innerText = data.stats[0].base_stat;
    PokeAtk.innerText = data.stats[1].base_stat;
    PokeDef.innerText = data.stats[2].base_stat;
    PokeSatk.innerText = data.stats[3].base_stat;
    PokeSdef.innerText = data.stats[4].base_stat;
    PokeSpd.innerText = data.stats[5].base_stat;
}

const MoviPokeList = (data) => {
    // Movimientos
    const PokeMoves = document.getElementById("moves-list");
    let moves = data.moves;
    PokeMoves.innerHTML = "";

    for (let i = 0; i < moves.length; i++) {
        const movement = document.createElement("li");
        PokeMoves.appendChild(movement);

        movement.innerText = moves[i].move.name;
    }
}


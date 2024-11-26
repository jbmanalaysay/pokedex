import getPokemon from './scripts/getAllPokemon.js'
import filterByName from './scripts/filterPokemonsbyName.js'
import filterByType from './scripts/filterPokemonByType.js'

const filter = 'lit';
const types = ['normal', 'fire'];
let arrPokemon;
const filterPokemonByName = async (arrPokemon) =>  {
    arrPokemon = await getPokemon();
    arrPokemon = filterByName(arrPokemon,filter);
    console.log(arrPokemon);
}

const filterPokemonbyType = async () => {
    arrPokemon = await getPokemon();
    arrPokemon = await filterByType(arrPokemon,types);
    console.log((arrPokemon));
}
filterPokemonbyType();
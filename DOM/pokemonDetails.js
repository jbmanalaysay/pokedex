
import getPokemonTemplate from '../templates/pokemonTemplate.js';

//Change Title
const pokemonName = window.location.search.substring(1);
document.title = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);


const pokemonDetails = document.getElementById('pokemon-details');
const pokemonTemplate = await getPokemonTemplate(pokemonName);
pokemonDetails.appendChild(pokemonTemplate);

import config from '../config.js'
import getApi from './getRequestApi.js'

const getPokemon = async (pokemonName) => {
    const pokemonUrl = config.endpoints.baseEndpoint + 'pokemon/' + pokemonName;
    const pokemonJson = await getApi(pokemonUrl);
    const pokemon = {
        abilities: pokemonJson.abilities.map((x)=> x.ability.name),
        name: pokemonJson.name, 
        stats: {
            hp: filterStat(pokemonJson,'hp'),
            attack: filterStat(pokemonJson,'attack'),
            defense: filterStat(pokemonJson,'defense'),
            'special-attack': filterStat(pokemonJson,'special-attack'),
            'special-defense': filterStat(pokemonJson,'special-defense'),
            'speed': filterStat(pokemonJson,'speed')            
        },
        types: pokemonJson.types.map((x)=> x.type.name ), 
        weight: pokemonJson.weight
    }
    return pokemon;
}

function filterStat(pokemonJson,statName) {
    return pokemonJson.stats.filter((x) => x.stat.name === statName)[0].base_stat
}


(async()=>{console.log(await getPokemon('bulbasaur'));})()
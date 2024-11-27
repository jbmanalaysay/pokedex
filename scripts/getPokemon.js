import config from '../config.js'
import getApi from './getRequestApi.js'

const getPokemon = async (pokemonName) => {
    const pokemonUrl = config.endpoints.baseEndpoint + 'pokemon/' + pokemonName;
    const pokemonJson = await getApi(pokemonUrl);
    console.log(pokemonJson);
}

(async()=>{console.log(getPokemon('bulbasaur'));})()
import getApi from './getRequestApi.js'
import config from '../config.js'


const getNextandPreviousPokemon = async(pokemonId) => {
    const nextPokemonId = Number(pokemonId) + 1;
    const previousPokemonId = Number(pokemonId) - 1;
    const nextPokemonUrl = config.endpoints.baseEndpoint +'pokemon/'+ nextPokemonId;
    const previousPokemonUrl = config.endpoints.baseEndpoint +'pokemon/'+ previousPokemonId;
    const nextPokemonJson = await getApi(nextPokemonUrl);
    const previousPokemonJson = await getApi(previousPokemonUrl);
    const nextandPreviousPokemon = {
        next: nextPokemonJson ?  {
            name: nextPokemonJson.name,
            id: nextPokemonJson.id
        }: null,  
        prev: previousPokemonJson ? {
            name: previousPokemonJson.name,
            id: previousPokemonJson.id
        }: null
    }
    return nextandPreviousPokemon;
};

export default getNextandPreviousPokemon;
import config from '../config.js'
import getApi from './getRequestApi.js'

const getEvolution = async (pokemonName) => {
    const speciesUrl = config.endpoints.baseEndpoint +'pokemon-species/' + pokemonName;
    const speciesJson = await getApi(speciesUrl);
    const evolutionChainUrl = speciesJson.evolution_chain.url;
    const evolutionChainJson = await getApi(evolutionChainUrl);
    return evolutionChainJson;
}

(async () => console.log( await getEvolution('wurmple')))();
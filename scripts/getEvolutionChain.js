import config from '../config.js'
import getApi from './getRequestApi.js'

const getEvolution = async (pokemonName) => {
    const speciesUrl = config.endpoints.baseEndpoint + 'pokemon-species/' + pokemonName;
    const speciesJson = await getApi(speciesUrl);
    const evolutionChainUrl = speciesJson.evolution_chain.url;
    let evolutionChainJson = await getApi(evolutionChainUrl);
    // Create Evolution Object
    let evolutionTree = {
        name: evolutionChainJson.chain.species.name,
        isBaby: evolutionChainJson.chain.is_baby,
        evolvesTo:[]
    };

    let evolvesTo = evolutionChainJson.chain.evolves_to;
    evolutionTree.evolvesTo = transformEvolution(evolvesTo);
    
    return JSON.stringify(evolutionTree);
}

(async () => console.log(await getEvolution('eevee')))();


const transformEvolution = (evolvesTo) => {
    
    return evolvesTo.map(evolveStage =>( {
        name: evolveStage.species.name,
        evolvesTo: transformEvolution(evolveStage.evolves_to)
    }));
}
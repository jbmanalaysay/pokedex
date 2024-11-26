import getApi from './getRequestApi.js'
import config from '../config.js'

const getPokemonForm = async (pokemonName) => {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon-form/' + pokemonName
    const formJson = await getApi(pokemonUrl);
    console.log(config);
    return {
        name: formJson.name,
        id: formJson.id,
        types: formJson.types.map((x) => x.type.name),
        imageUrl: config.endpoints.imageBaseUrl.replace("{name}", formJson.name)
   }
}

export default getPokemonForm;
import getApi from './getRequestApi.js';

// Get All Pokemon with Get Request
const getAllPokemon = async () => {
  const getAllPokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10000&';
  const pokemonResponse = await getApi(getAllPokemonUrl);
  // Return Array of All Pokemon
  return pokemonResponse.results.map((x) => x.name);
};

//Filter Pokemon By Name
const filterByName = (arrPokemon, stringFilter) => {
  arrPokemon = arrPokemon.filter((x) => x.includes(stringFilter));
  return arrPokemon.sort((a, b) => {
    const indexA = a.indexOf(stringFilter);
    const indexB = b.indexOf(stringFilter);
    return indexA > indexB ? 1 : indexA < indexB ? -1 : 0;
  });
};

//Filter Pokemon By Ability
const filterByAbility = async (arrPokemon, ability) => {
  ability = ability.toLowerCase();
  if(ability.toUpperCase() === 'ALL' || !ability) return arrPokemon;
  const getAbilityUrl = 'https://pokeapi.co/api/v2/ability/' + ability;
  const abilityResponse = await getApi(getAbilityUrl);
  const pokemonWithAbility = abilityResponse.pokemon.map((x) => x.pokemon.name);
  // Return Array of All Pokemon with that Ability
  return arrPokemon.filter((x) => pokemonWithAbility.includes(x));
};

//Filter Pokemon By Type
//sometimes. Pokemon with 2 type is not appearing

const filterByType = async (arrPokemon, types) => {
    for (const type of types) {
      const typeUrl = 'https://pokeapi.co/api/v2/type/' + type;
      const typeResponse = await getApi(typeUrl);
      // Get Pokémon names for the current type
      const pokemonWithType = typeResponse.pokemon.map((x) => x.pokemon.name);
      arrPokemon = arrPokemon.filter((x) => pokemonWithType.includes(x));
    }
    return arrPokemon;
  };



// Call Get Pokemon API and Filter Functions
export default async (stringFilter, ability, types) => {
  let arrPokemon = await getAllPokemon();
  arrPokemon = await filterByName(arrPokemon, stringFilter);
  arrPokemon = await filterByAbility(arrPokemon, ability);
  arrPokemon = await filterByType(arrPokemon, types);
  console.log(arrPokemon);
};

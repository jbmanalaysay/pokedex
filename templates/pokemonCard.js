import getPokemonForm from '../scripts/getPokemonForm.js';

const getPokemonCard = async (pokemonName) => {
  const pokemonForm = await getPokemonForm(pokemonName);
  const imageUrl = '<img src="' + pokemonForm.imageUrl + '">';
  const pokemonNameUpperCase = pokemonForm.name.charAt(0).toUpperCase() +  pokemonForm.name.slice(1);
  const pokemonTypesTemplate = pokemonForm.types
    .map((x) => '<h4 class="'+x+'">' + x + '</h4>')
    .join(' ');
  const templateHtml = `<a href="./pokemonDetails.html?${pokemonForm.name}">
                <h3>${pokemonForm.id}</h3>
                <h1>${pokemonNameUpperCase}</h1>
                ${imageUrl}
                ${pokemonTypesTemplate}
                </a>`;
  return templateHtml;
};

const createPokemonTemplate = async (pokemonName) => {
  const pokemonWrapper = document.getElementById('pokemon-wrapper');
  let pokemonCard = document.createElement('div');
  pokemonCard.id = 'pokemon'
  pokemonCard.classList.add('card');
  pokemonCard.innerHTML = await getPokemonCard(pokemonName);
  pokemonWrapper.appendChild(pokemonCard);
};

export default createPokemonTemplate;

import nextAndPrev from '../scripts/getNextAndPreviousPokemon.js'
import getPokemon from '../scripts/getPokemon.js'
import getPokemonForm from '../scripts/getPokemonForm.js'

const getPokemonTemplate = async (pokemonName) => {
    const pokemon = await getPokemon(pokemonName);
    const pokemonForm = await getPokemonForm(pokemonName);
    const pokemonNextAndPrev = await nextAndPrev(pokemon.id);
    const pokemonDetails = document.createElement('div');
    const innerHtmlPrevButton = pokemonNextAndPrev.prev ? `<a href="../webpages/pokemonDetails.html?${pokemonNextAndPrev.prev.name}">← 
                               #${pokemonNextAndPrev.prev.id} <br>${pokemonNextAndPrev.prev.name} 
                                    </a>`: `<div>No Prev</div>`;
    const innerHtmlNextButton = pokemonNextAndPrev.next ? `<a href="../webpages/pokemonDetails.html?${pokemonNextAndPrev.next.name}"> 
                                #${pokemonNextAndPrev.next.id}<br>${pokemonNextAndPrev.next.name} →
                                    </a>`: `<div>No Next</div>`;
    const pokemonHtmlTemplate = `
        <div class="navigation">
            ${innerHtmlPrevButton}
            ${innerHtmlNextButton}
        </div>

        <!-- Pokémon Info -->
        <div class="pokemon-info">
            <div class="pokemon-id">#${pokemon.id}</div>
            <div class="pokemon-name">${pokemon.name}</div>
        </div>

        <!-- Pokémon Image -->
        <div class="pokemon-image">
            <img src="${pokemonForm.imageUrl}" alt="${pokemon.name}">
        </div>

        <!-- Pokémon Details -->
        <div class="pokemon-types">
            <h3>Type</h3>
            ${(pokemon.types.map((x) => `<div class="types">${x}</div>`)).join('') }
        </div>
        <div class="pokemon-abilities">
            <h3>Abilities</h3>
            <div class="abilities">
                ${pokemon.abilities.map((x) => `<div>${x}</div>`).join('')}
            </div>
        </div>

        <!-- Pokémon Stats -->
        <div class="pokemon-stats">
            <h3>Base Stats</h3>
            <div class="stat">Weight: <span>${pokemon.weight}</span></div>
            <div class="stat">HP: <span>${pokemon.stats.hp}</span></div>
            <div class="stat">Attack: <span>${pokemon.stats.attack}</span></div>
            <div class="stat">Defense: <span>${pokemon.stats.defense}</span></div>
            <div class="stat">Special Attack: <span>${pokemon.stats['special-attack']}</span></div>
            <div class="stat">Special Defense: <span>${pokemon.stats['special-defense']}</span></div>
            <div class="stat">Speed: <span>${pokemon.stats.speed}</span></div>
        </div>`


    
    ;
    pokemonDetails.innerHTML = pokemonHtmlTemplate
    return pokemonDetails;
};


export default getPokemonTemplate;
import abilityGetter from "../scripts/getAbilities.js";
import createElementJs from "./createElement.js"
import filterPokemonName from '../scripts/getPokemonByFilter.js'
import pokemonCard from '../templates/pokemonCard.js'

const abilitiesDropdown =  document.getElementById('abilities-dropdown');
const nameFilter = document.getElementById('pokemon-name');
const resetButton = document.getElementById('reset');
const pokemonWrapper = document.getElementById('pokemon-wrapper');
const advancedFilterButton = document.getElementById('advanced-filter-button');
const advancedFilter = document.getElementById('advanced-filter');

// Filter Variables
let types = [];

(async () => {
    const abilities = await abilityGetter();
    
    for(let ability of abilities) {
        createElementJs.createOption(abilitiesDropdown,ability);
    }
})();
//Event Listener for Advanced Filter
advancedFilterButton.addEventListener('click', () => advancedFilter.classList.toggle('hidden'));

//Event Listener for Type Checkboxes
const typeCheckboxes = [...(document.getElementById('types-filter').children)];

for(let typeCheckbox of typeCheckboxes) {
    typeCheckbox.addEventListener('change',checkboxAdded);
}
//Event Listener for Name Filter
nameFilter.addEventListener('blur', ( ) =>  createPokemonCard(nameFilter.value,abilitiesDropdown.value,types));
//Event Listener for Abilities Filter
abilitiesDropdown.addEventListener('change', ( ) =>  createPokemonCard(nameFilter.value,abilitiesDropdown.value,types));
//Event Listener for Reset Button
resetButton.addEventListener('click', resetFunction);



async function createPokemonCard (nameFilter,ability,types) {
    const pokemonArr = await filterPokemonName(nameFilter,ability,types);
    pokemonWrapper.innerHTML = '';    
    for (let poke of pokemonArr){
        pokemonCard(poke);
    }
}


function resetFunction() {
    console.log('reset')
    abilitiesDropdown.value = 'ALL';
    nameFilter.value = '';
    deselectAllTypes();
    createPokemonCard(nameFilter.value,abilitiesDropdown.value,types);
} 
function deselectAllTypes (){
    typeCheckboxes.forEach(x => x.checked = false)
    types = [];
}


function checkboxAdded() {
    const checkedCheckboxes = typeCheckboxes.filter((x) => x.checked) 

    //Lock checkboxes if theres 2 types
    if (checkedCheckboxes.length === 2) {
        typeCheckboxes
            .filter((x) => !x.checked)
            .forEach(x => {
                x.disabled = true;
            });
    } else {
        typeCheckboxes.forEach((x) => x.disabled = false);
    }

    types = checkedCheckboxes.map(x => x.id);
    createPokemonCard(nameFilter.value,abilitiesDropdown.value,types);
}





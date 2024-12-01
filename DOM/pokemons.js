import abilityGetter from "../scripts/getAbilities.js";
import createElementJs from "./createElement.js"
import filterPokemonName from '../scripts/getPokemonByFilter.js'

const abilitiesDropdown =  document.getElementById('abilities-dropdown');
const nameFilter = document.getElementById('pokemon-name');
const resetButton = document.getElementById('reset');


// Filter Variables
let abilityValue = abilitiesDropdown.value;
let types = [];

(async () => {
    const abilities = await abilityGetter();
    
    for(let ability of abilities) {
        createElementJs.createOption(abilitiesDropdown,ability);
    }
})();

//Event Listener for Type Checkboxes
const typeCheckboxes = [...(document.getElementById('types-filter').children)];

for(let typeCheckbox of typeCheckboxes) {
    typeCheckbox.addEventListener('change',checkboxAdded);
}
//Event Listener for Name Filter
nameFilter.addEventListener('change', ( ) =>  filterPokemonName(nameFilter.value,abilitiesDropdown.value,types));
//Event Listener for Abilities Filter
abilitiesDropdown.addEventListener('change', ( ) =>  filterPokemonName(nameFilter.value,abilitiesDropdown.value,types));
//Event Listener for Reset Button
resetButton.addEventListener('click', resetFunction);


function resetFunction() {
    console.log('reset')
    abilitiesDropdown.value = 'ALL';
    nameFilter.value = '';
    deselectAllTypes();
    filterPokemonName(nameFilter.value,abilitiesDropdown.value,types);
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
    filterPokemonName(nameFilter.value,abilitiesDropdown.value,types);
}





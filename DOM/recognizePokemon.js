import identify from '../scripts/identifyPokemon.js';
import getApi from '../scripts/getRequestApi.js';
import config from '../config.js';
import filterPokemonName from '../scripts/getPokemonByFilter.js'
import pokemonCard from '../templates/pokemonCard.js'

// Element Nodes
const fileUploaded = document.getElementById('file-upload');
const recognizeButton = document.getElementById('recognize');
const pokemonWrapper = document.getElementById('pokemon-wrapper');


//Event Listeners  
let imagePath;
fileUploaded.addEventListener('change', function (e) {
  const file = e.target.files[0];  // Get the selected file

  if (file) {
    const reader = new FileReader();


    reader.onload = function (e) {
      const base64String = e.target.result;  // This is the Base64 encoded string
      imagePath = base64String;  // Display it in the textarea
    };

    // Read the file as a data URL (Base64)
    reader.readAsDataURL(file);
  } else {
    base64Output.value = 'No file selected.';
  }
});
recognizeButton.addEventListener('click', recognizePokemon);


//Functions
async function recognizePokemon() {
  if (!imagePath) {
    alert('No Image Uploaded Yet.')
    return
  }
  let pokemonRecognize = await identify(imagePath);
  const allPokemon = await getApi(config.endpoints.baseEndpoint + 'pokemon?limit=1500');
  const checkedPokemon = allPokemon.results.filter(x =>
    pokemonRecognize.toLowerCase().includes(x.name)
  );
  console.log(checkedPokemon);
  if (checkedPokemon.length !== 0) {
    await createPokemonCard(checkedPokemon[0].name, 'ALL', [])
  }
}

async function createPokemonCard(nameFilter, ability, types) {
  const pokemonArr = await filterPokemonName(nameFilter, ability, types);
  pokemonWrapper.innerHTML = '';
  for (let poke of pokemonArr) {
    pokemonCard(poke);
  }
}
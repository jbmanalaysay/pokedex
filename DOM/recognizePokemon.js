import identify from '../scripts/identifyPokemon.js' ;
console.log(identify)
console.log('werw')

// Element Nodes
const fileUploaded = document.getElementById('file-input-pokemon');
const recognizeButton = document.getElementById('recognize');

//Event Listeners  
fileUploaded.addEventListener('change', function(){
    console.log(fileUploaded.value)
});
recognizeButton.addEventListener('click', recognizePokemon);


//Functions
function recognizePokemon () {
    if(!fileUploaded.value) {
        alert('No Image Uploaded Yet.')
        return
    }
    console.log(identify(fileUploaded.value));

}
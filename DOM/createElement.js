const elements = {
    createOption: function (parentElement, text){
        const optionElement = document.createElement('option');
        optionElement.textContent = text;
        parentElement.appendChild(optionElement);
    }
}

export default elements
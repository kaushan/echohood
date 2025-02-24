import Alpine from 'alpinejs'
import {generateSpeech} from './voice.js';
import {getPlaceDescription, getMistralAIResponse} from './ai.js';

window.Alpine = Alpine
window.generateSpeech = generateSpeech;
window.getPlaceDescription = getPlaceDescription;
window.getMistralAIResponse = getMistralAIResponse;

Alpine.start()

function checkAndStoreAPIKeys() {
    const keys = ["MISTRAL_API_KEY", "11LABS_API_KEY"];
    
    keys.forEach(key => {
        let storedValue = localStorage.getItem(key);
        if (!storedValue) {
            let userInput = prompt(`Enter your ${key}:`);
            if (userInput) {
                localStorage.setItem(key, userInput);
            } else {
                alert(`${key} is required for functionality.`);
            }
        }
    });
}

checkAndStoreAPIKeys();

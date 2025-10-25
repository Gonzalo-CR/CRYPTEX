// Definición de constantes
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

// Instrucciones para cada método
const instructions = {
    caesar: "Ingrese un número entero como clave para el desplazamiento. Por ejemplo, si ingresa '3', cada letra en el texto se desplazará 3 posiciones en el alfabeto. Use el mismo número para cifrar y descifrar.",
    vigenere: "Ingrese una palabra clave. Por ejemplo, 'CLAVE'. La palabra se repetirá para cubrir todo el mensaje. Use la misma palabra para cifrar y descifrar.",
    substitution: "Ingrese un alfabeto de sustitución de 26 letras mayúsculas, sin repetir ninguna. Este alfabeto reemplazará al alfabeto normal en orden. Por ejemplo: 'QWERTYUIOPASDFGHJKLZXCVBNM'. Use el mismo alfabeto para cifrar y descifrar.",
    transposition: "Ingrese un número entero positivo entre 2 y 19 como clave. Este número determinará el ancho de la matriz de transposición. Use el mismo número para cifrar y descifrar.",
    rot13: "No se necesita clave para ROT13.",
    xor: "Ingrese una clave de texto en minúscula. Cada carácter del mensaje se combinará con el carácter correspondiente de la clave usando la operación XOR. La clave se repetirá si es más corta que el mensaje. Use la misma clave para cifrar y descifrar.",
    base64: "No se necesita clave. El texto se codificará en Base64. Use el mismo método para descifrar.",
    atbash: "No se necesita clave. Cada letra se reemplaza por su opuesta en el alfabeto (A=Z, B=Y, etc.).",
    reverse: "No se necesita clave. El texto se invierte completamente.",
    morse: "No se necesita clave. El texto se convertirá a código Morse (solo letras, números y algunos signos de puntuación). Use el mismo método para descifrar.",
    "rail-fence": "Ingrese un número entero mayor que 1 como clave. Este número determinará el número de rieles. Use el mismo número para cifrar y descifrar."
};

// Elementos del DOM
const modeButtons = document.querySelectorAll('.mode-btn');
const phraseKeyPanel = document.getElementById('phrase-key-panel');
const multiMethodPanel = document.getElementById('multi-method-panel');
const cipherMethodSelect = document.getElementById('cipher-method');
const keyInput = document.getElementById('key');
const instructionsElement = document.getElementById('instructions');
const copyBtn = document.getElementById('copy-btn');
const resetBtn = document.getElementById('reset-btn');

// Cambio de modo
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.getAttribute('data-mode');
        
        // Actualizar botones activos
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Mostrar panel correspondiente
        if (mode === 'phrase-key') {
            phraseKeyPanel.classList.add('active');
            multiMethodPanel.classList.remove('active');
        } else {
            phraseKeyPanel.classList.remove('active');
            multiMethodPanel.classList.add('active');
            updateInstructions();
        }
    });
});

// Actualizar instrucciones
function updateInstructions() {
    const method = cipherMethodSelect.value;
    instructionsElement.innerText = instructions[method];
    keyInput.style.display = (method === 'rot13' || method === 'base64' || method === 'atbash' || method === 'reverse' || method === 'morse') ? 'none' : 'block';
}

// Cifrado con Frase Clave
function processText(text, phraseKey, encrypt = true) {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        const charIndex = CHARSET.indexOf(text[i]);
        if (charIndex !== -1) {
            const keyChar = phraseKey[keyIndex % phraseKey.length];
            const keyCharIndex = CHARSET.indexOf(keyChar);
            let newIndex;
            
            if (encrypt) {
                newIndex = (charIndex + keyCharIndex) % CHARSET.length;
            } else {
                newIndex = (charIndex - keyCharIndex + CHARSET.length) % CHARSET.length;
            }
            
            result += CHARSET[newIndex];
            keyIndex++;
        } else {
            result += text[i];
        }
    }
    
    return result;
}

// Implementaciones de los métodos de cifrado
function caesarCipher(text, shift, encrypt) {
    shift = encrypt ? shift : (26 - shift);
    return text.replace(/[a-zA-Z]/g, letter => {
        const code = letter.charCodeAt(0);
        const isUpperCase = letter === letter.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
    });
}

function vigenereCipher(text, key, encrypt) {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 65 : 97;
            const keyChar = key[keyIndex % key.length];
            const keyBase = keyChar === keyChar.toUpperCase() ? 65 : 97;
            const shift = (keyChar.charCodeAt(0) - keyBase) % 26;
            
            let newCharCode;
            if (encrypt) {
                newCharCode = (char.charCodeAt(0) - base + shift) % 26 + base;
            } else {
                newCharCode = (char.charCodeAt(0) - base - shift + 26) % 26 + base;
            }
            
            result += String.fromCharCode(newCharCode);
            keyIndex++;
        } else {
            result += char;
        }
    }
    
    return result;
}

function substitutionCipher(text, key, encrypt) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase();
    if (key.length !== 26 || new Set(key).size !== 26) {
        throw new Error("La clave de sustitución debe contener exactamente 26 letras únicas.");
    }
    return text.replace(/[A-Za-z]/g, letter => {
        const isUpperCase = letter === letter.toUpperCase();
        letter = letter.toUpperCase();
        const index = encrypt ? alphabet.indexOf(letter) : key.indexOf(letter);
        if (index === -1) return letter;
        const result = encrypt ? key[index] : alphabet[index];
        return isUpperCase ? result : result.toLowerCase();
    });
}

function transpositionCipher(text, key, encrypt) {
    const numCols = parseInt(key);
    if (isNaN(numCols) || numCols <= 0) {
        throw new Error("La clave debe ser un número entero positivo.");
    }
    
    if (encrypt) {
        // Cifrado: escribir por filas, leer por columnas
        const numRows = Math.ceil(text.length / numCols);
        let result = '';
        
        // Para cada columna
        for (let col = 0; col < numCols; col++) {
            // Para cada fila en esa columna
            for (let row = 0; row < numRows; row++) {
                const index = row * numCols + col;
                if (index < text.length) {
                    result += text[index];
                }
            }
        }
        return result;
    } else {
        // Descifrado: escribir por columnas, leer por filas
        const numRows = Math.ceil(text.length / numCols);
        const fullCols = text.length % numCols;
        const result = new Array(text.length);
        let index = 0;
        
        // Para cada columna
        for (let col = 0; col < numCols; col++) {
            // Para cada fila en esa columna
            for (let row = 0; row < numRows; row++) {
                // Si estamos en una columna que tiene todas las filas completas
                if (col < fullCols || row < numRows - 1) {
                    const pos = row * numCols + col;
                    if (index < text.length) {
                        result[pos] = text[index++];
                    }
                }
            }
        }
        
        return result.join('');
    }
}

function rot13(text) {
    return text.replace(/[a-zA-Z]/g, function(char) {
        const code = char.charCodeAt(0);
        const base = code < 91 ? 65 : 97;
        return String.fromCharCode((code - base + 13) % 26 + base);
    });
}

function xorCipher(text, key) {
    if (key.length === 0) {
        throw new Error("La clave no puede estar vacía.");
    }
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const textCharCode = text.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % key.length);
        const xorResult = textCharCode ^ keyCharCode;
        result += String.fromCharCode(xorResult);
    }
    
    return result;
}

function base64Cipher(text, encrypt) {
    if (encrypt) {
        return btoa(unescape(encodeURIComponent(text)));
    } else {
        try {
            return decodeURIComponent(escape(atob(text)));
        } catch (e) {
            throw new Error("Texto Base64 inválido");
        }
    }
}

function atbashCipher(text) {
    return text.replace(/[a-zA-Z]/g, function(char) {
        const code = char.charCodeAt(0);
        const base = code < 91 ? 65 : 97;
        return String.fromCharCode(25 - (code - base) + base);
    });
}

function reverseText(text) {
    return text.split('').reverse().join('');
}

// Nuevos métodos adicionales
function morseCipher(text, encrypt) {
    const morseMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', 
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', 
        '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', 
        "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', 
        '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', 
        '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
        ' ': '/'
    };
    
    if (encrypt) {
        return text.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
    } else {
        const reverseMorse = {};
        for (const [key, value] of Object.entries(morseMap)) {
            reverseMorse[value] = key;
        }
        
        return text.split(' ').map(code => reverseMorse[code] || code).join('');
    }
}

function railFenceCipher(text, key, encrypt) {
    const rails = parseInt(key);
    if (isNaN(rails) || rails <= 1) {
        throw new Error("La clave debe ser un número entero mayor que 1.");
    }
    
    if (encrypt) {
        let fence = [];
        for (let i = 0; i < rails; i++) fence.push([]);
        
        let rail = 0;
        let direction = 1;
        
        for (let char of text) {
            fence[rail].push(char);
            rail += direction;
            
            if (rail === 0 || rail === rails - 1) {
                direction = -direction;
            }
        }
        
        return fence.flat().join('');
    } else {
        let fence = [];
        for (let i = 0; i < rails; i++) fence.push([]);
        
        let rail = 0;
        let direction = 1;
        
        // Calcular las longitudes de cada rail
        let lengths = new Array(rails).fill(0);
        for (let i = 0; i < text.length; i++) {
            lengths[rail]++;
            rail += direction;
            if (rail === 0 || rail === rails - 1) direction = -direction;
        }
        
        // Dividir el texto en rails
        let index = 0;
        for (let i = 0; i < rails; i++) {
            fence[i] = text.slice(index, index + lengths[i]).split('');
            index += lengths[i];
        }
        
        // Leer en zigzag
        let result = '';
        rail = 0;
        direction = 1;
        let indices = new Array(rails).fill(0);
        
        for (let i = 0; i < text.length; i++) {
            result += fence[rail][indices[rail]];
            indices[rail]++;
            
            rail += direction;
            if (rail === 0 || rail === rails - 1) direction = -direction;
        }
        
        return result;
    }
}

// Funciones principales
function encryptText() {
    const input = document.getElementById('input-text').value;
    const activeMode = document.querySelector('.mode-btn.active').getAttribute('data-mode');
    let result = '';

    try {
        if (activeMode === 'phrase-key') {
            const phraseKey = document.getElementById('phrase-key').value;
            
            if (!phraseKey) {
                alert('Por favor, ingrese una frase clave.');
                return;
            }
            
            result = processText(input, phraseKey, true);
        } else {
            const method = cipherMethodSelect.value;
            const key = document.getElementById('key').value;

            switch(method) {
                case 'caesar':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado César.');
                        return;
                    }
                    result = caesarCipher(input, parseInt(key), true);
                    break;
                case 'vigenere':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado Vigenère.');
                        return;
                    }
                    result = vigenereCipher(input, key, true);
                    break;
                case 'substitution':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado de sustitución.');
                        return;
                    }
                    result = substitutionCipher(input, key, true);
                    break;
                case 'transposition':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado de transposición.');
                        return;
                    }
                    result = transpositionCipher(input, key, true);
                    break;
                case 'rot13':
                    result = rot13(input);
                    break;
                case 'xor':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado XOR.');
                        return;
                    }
                    result = xorCipher(input, key);
                    break;
                case 'base64':
                    result = base64Cipher(input, true);
                    break;
                case 'atbash':
                    result = atbashCipher(input);
                    break;
                case 'reverse':
                    result = reverseText(input);
                    break;
                case 'morse':
                    result = morseCipher(input, true);
                    break;
                case 'rail-fence':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado Rail Fence.');
                        return;
                    }
                    result = railFenceCipher(input, key, true);
                    break;
            }
        }

        displayOutput(result);
        habilitarBotones();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function decryptText() {
    const input = document.getElementById('input-text').value;
    const activeMode = document.querySelector('.mode-btn.active').getAttribute('data-mode');
    let result = '';

    try {
        if (activeMode === 'phrase-key') {
            const phraseKey = document.getElementById('phrase-key').value;
            
            if (!phraseKey) {
                alert('Por favor, ingrese una frase clave.');
                return;
            }
            
            result = processText(input, phraseKey, false);
        } else {
            const method = cipherMethodSelect.value;
            const key = document.getElementById('key').value;

            switch(method) {
                case 'caesar':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado César.');
                        return;
                    }
                    result = caesarCipher(input, parseInt(key), false);
                    break;
                case 'vigenere':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado Vigenère.');
                        return;
                    }
                    result = vigenereCipher(input, key, false);
                    break;
                case 'substitution':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado de sustitución.');
                        return;
                    }
                    result = substitutionCipher(input, key, false);
                    break;
                case 'transposition':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado de transposición.');
                        return;
                    }
                    result = transpositionCipher(input, key, false);
                    break;
                case 'rot13':
                    result = rot13(input);
                    break;
                case 'xor':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado XOR.');
                        return;
                    }
                    result = xorCipher(input, key);
                    break;
                case 'base64':
                    result = base64Cipher(input, false);
                    break;
                case 'atbash':
                    result = atbashCipher(input);
                    break;
                case 'reverse':
                    result = reverseText(input);
                    break;
                case 'morse':
                    result = morseCipher(input, false);
                    break;
                case 'rail-fence':
                    if (!key) {
                        alert('Por favor, ingrese una clave para el cifrado Rail Fence.');
                        return;
                    }
                    result = railFenceCipher(input, key, false);
                    break;
            }
        }

        displayOutput(result);
        habilitarBotones();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayOutput(text) {
    document.getElementById('output-text').value = text;
}

function copyText() {
    const outputText = document.getElementById('output-text');
    outputText.select();
    document.execCommand('copy');
    alert('Texto copiado al portapapeles');
}

function resetState() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
    document.getElementById('phrase-key').value = '';
    document.getElementById('key').value = '';
    deshabilitarBotones();
}

function habilitarBotones() {
    copyBtn.removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
}

function deshabilitarBotones() {
    copyBtn.setAttribute('disabled', 'true');
    resetBtn.setAttribute('disabled', 'true');
}

// Event Listeners
cipherMethodSelect.addEventListener('change', updateInstructions);

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    resetState();
    updateInstructions();
});
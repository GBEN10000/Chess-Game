document.addEventListener('DOMContentLoaded', function() {
    // Show the start game section initially
    document.getElementById('startGame').style.display = 'block';

    // Event listener for the Start Game button
    document.getElementById('startBtn').addEventListener('click', function() {
        // Hide the start game section
        document.getElementById('startGame').style.display = 'none';
        // Show the intro section
        document.getElementById('intro').style.display = 'flex';
    });

    // Event listener for the Skip Intro button
    document.getElementById('skipIntroBtn').addEventListener('click', function() {
        // Hide the intro section
        document.getElementById('intro').style.display = 'none';
        // Show the game page section
        document.getElementById('gamePage').style.display = 'block';
    });
});

// Function to create the chessboard with notations and chess pieces
function createChessboard() {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const chessboardContainer = document.getElementById('chessboard');

    for (let row = 1; row <= 8; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        for (let col = 0; col < 8; col++) {
            const squareDiv = document.createElement('div');
            // Update the class to match the rotated board orientation
            squareDiv.className = (row + col) % 2 === 0 ? 'square black' : 'square white';
            squareDiv.id = columns[7 - col] + (9 - row); // Adjust IDs for new orientation

            const notation = document.createElement('div');
            notation.className = 'notation';
            notation.textContent = columns[7 - col] + (9 - row); // Update notation for new orientation

            // Add class for chess piece image based on notation value
            const chessPieceClass = getChessPieceClass(columns[7 - col] + (9 - row));
            if (chessPieceClass) {
                const chessPiece = document.createElement('div');
                chessPiece.className = 'chess-piece ' + chessPieceClass;
                chessPiece.draggable = true; // Make chess pieces draggable
                chessPiece.id = columns[7 - col] + (9 - row) + '-' + chessPieceClass; // Set a unique ID for each piece
                squareDiv.appendChild(chessPiece);
            }

            squareDiv.appendChild(notation);
            rowDiv.appendChild(squareDiv);
        }

        chessboardContainer.appendChild(rowDiv);
    }
}


// Function to get the chess piece class based on notation value
function getChessPieceClass(notation) {
    switch (notation) {
        // White pieces
        case 'a1': return 'white-queen-rook';
        case 'h1': return 'white-king-rook';
        case 'b1': return 'white-queen-knight';
        case 'g1': return 'white-king-knight';
        case 'c1': return 'white-queen-bishop';
        case 'f1': return 'white-king-bishop';
        case 'd1': return 'white-queen';
        case 'e1': return 'white-king';
        case 'a2': return 'white-a-pawn';
        case 'b2': return 'white-b-pawn';
        case 'c2': return 'white-c-pawn';
        case 'd2': return 'white-d-pawn';
        case 'e2': return 'white-e-pawn';
        case 'f2': return 'white-f-pawn';
        case 'g2': return 'white-g-pawn';
        case 'h2': return 'white-h-pawn';

        // Black pieces
        case 'a8': return 'black-queen-rook';
        case 'h8': return 'black-king-rook';
        case 'b8': return 'black-queen-knight';
        case 'g8': return 'black-king-knight';
        case 'c8': return 'black-queen-bishop';
        case 'f8': return 'black-king-bishop';
        case 'd8': return 'black-queen';
        case 'e8': return 'black-king';
        case 'a7': return 'black-a-pawn';
        case 'b7': return 'black-b-pawn';
        case 'c7': return 'black-c-pawn';
        case 'd7': return 'black-d-pawn';
        case 'e7': return 'black-e-pawn';
        case 'f7': return 'black-f-pawn';
        case 'g7': return 'black-g-pawn';
        case 'h7': return 'black-h-pawn';

        default: return null;
    }
}

// Function to play a sound
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}
async function checkMoveCommentary(pieceId, targetSquareId) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY_HERE', // Replace with your actual API key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: 'user',
                    content: `analyze this chess move: ${pieceId} to ${targetSquareId}`
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Full API Response:', data); // Log the full API response

        const commentary = data.choices[0].message.content;
        console.log('Move Commentary:', commentary); // Log commentary response

        //const message = 'The commentary feature of this project requires an API key for proper functionality. For security reasons the API key is not included in this repository. To enable commentary please obtain your own API key and integrate it into the code.';

        // Display the fixed message with typing effect
        //typeText('response-box', commentary, 34); // Type out the message with a typing speed of 34 ms per character

    } catch (error) {
        document.getElementById('response-box').textContent = `Error: ${error.message}`;
        return `Error: ${error.message}`;
    }
}

// Function to move a piece and get commentary
async function movePiece(pieceId, targetSquareId) {
    console.log('Processing move:', pieceId, targetSquareId);

    const chessPiece = document.getElementById(pieceId);
    const targetSquare = document.getElementById(targetSquareId);

    if (!chessPiece || !targetSquare) {
        alert("Invalid move. Please check the piece and target square.");
        return;
    }

    // Remove the piece from its current square
    const currentSquare = chessPiece.parentElement;
    currentSquare.removeChild(chessPiece);

    // Check if the target square already has a piece
    const existingPiece = targetSquare.querySelector('.chess-piece');
    if (existingPiece) {
        // Remove the existing piece and play capture sound
        targetSquare.removeChild(existingPiece);
        playSound('capture-sound.mp3');
    } else {
        // Play move sound if there is no piece to capture
        playSound('move-sound.mp3');
    }

    // Move the piece to the target square
    targetSquare.appendChild(chessPiece);

    // Get commentary for the move
    await checkMoveCommentary(pieceId, targetSquareId);
}

const corrections = {
    'pawn': ['phone','want','point','on','want','pound', 'pan', 'porn', 'pon', 'pwn', 'paan', 'paun', 'pewn', 'pown'],
    'knight': ['kwon', 'kight', 'knite', 'knigth', 'knigt', 'kwite', 'kwight', 'kwn', 'kwno','night'],
    'rook': ['road','room','rope','roof','route','rooc', 'rock', 'rck', 'rok', 'rokk', 'rooky'],
    'bishop': ['bishup', 'bisshop', 'bishoo', 'bshp', 'bishp', 'bsp'],
    'queen': ['main','wind','twin','green','quenn', 'quinn', 'qun', 'quee', 'queeen', 'quean', 'quen', 'queon'],
    'king': ['twin','thing','kng', 'king', 'kig', 'kign', 'kin', 'kingg', 'kink'],
    'a': ['yah','aa', 'ah', 'aah'],
    'b': ['be','we','bb', 'bh', 'bbi'],
    'c': ['sheep','she', 'cc', 'ch', 'ci'],
    'd': ['dd', 'dh', 'di','the'],
    'e': ['tea','i', 'keep', 'you', 'ee', 'eh', 'ei'],
    'f': ['ff', 'fh', 'fi'],
    'g': ['gg', 'gh', 'gi'],
    'h': ['hh', 'hi'],
    'e8': ['eat'],
    'queen': ['train'],
    'to':['2','takes','text','tax','take'],
    'e3':['v3','23'],
    'king to e3':['kintu-e3'],
    'a4':['airport'],
    'a4':['before'],
    'b6':['basics'],
    'b8':['b.ed'],
    'c1':['sewer'],
    'd2':['due to','d2h'],
    'd8':['date'],
    'e1':['even'],
    'f8':['effect'],
    'g1':['jeeva'],
    'g':['jeep','j','zee'],
    'g8':['g8h'],
    'h5':['hp'],
    'd pawn':['deepan','deepon'],
    'a pawn':['earphone','apon'],
    'b-pawn':['b12','bound'],
    'queen-rook':['queen-roof','greenwood','wind-rook','green-room','twin-room','twin-rope','green-roof','windows','green-rook','twin-rook'],
    'queen-rook to':['window-to','window-take','queen-rook-to'],
    'king-knight':['twin-knight'],
    'to e4':['taxi 4'],
    'queen to':['queen-to'],
    'side':['set'],
    'castle':['cast','cat'],
    'enpassant':['10%','inpass','10 pass','enpass','n pass','and passed'],
    'c enpassant':['cn-passed','cn-pass','cn pass','sea and pass','sean-pass','cm-pass']
    
};

// Function to apply corrections to the input
function applyCorrections(input) {
    Object.keys(corrections).forEach(correctTerm => {
        corrections[correctTerm].forEach(misspelling => {
            const regex = new RegExp(`\\b${misspelling}\\b`, 'gi');
            input = input.replace(regex, correctTerm);
        });
    });
    return input;
}


// Function to handle white piece input
function movePieceByInput() {
    let userInput = document.getElementById('whiteMoveInput').value.trim();
    
    // Apply auto-corrections
    userInput = applyCorrections(userInput);
    
    // If the input doesn't specify "white-", assume "white-"
    if (!userInput.startsWith('white-') && !userInput.startsWith('black-')) {
        userInput = 'white-' + userInput;
    }
    
    const whiteRegex = /^white-(([a-h]-pawn)|(king|queen)|(king|queen)-(rook|knight|bishop))\s*to\s*[a-h][1-8]$/;
    const blackRegex = /^black-(([a-h]-pawn)|(king|queen)|(king|queen)-(rook|knight|bishop))\s*to\s*[a-h][1-8]$/;
    
    // Combine the two regexes
    const regex = new RegExp(whiteRegex.source + "|" + blackRegex.source);
    
    if (!userInput.match(regex)) {
        alert('Invalid input. Please enter in the format "e-pawn to e4" or "white-king-rook to h3".');
        return;
    }
    
    const [piece, to] = userInput.split(' to ');
    const pieceClass = piece.split('-').join('-');
    const pieceElement = document.querySelector(`.${pieceClass}`);
    
    if (!pieceElement) {
        alert('Piece not found on the board.');
        return;
    }
    
    movePiece(pieceElement.id, to);
}

// Function to handle black piece input
function moveBlackPieceByInput() {
    let userInput = document.getElementById('blackMoveInput').value.trim();
    
    // Apply auto-corrections
    userInput = applyCorrections(userInput);
    
    // If the input doesn't specify "white-" or "black-", assume "black-"
    if (!userInput.startsWith('white-') && !userInput.startsWith('black-')) {
        userInput = 'black-' + userInput;
    }
    
    const whiteRegex = /^white-(([a-h]-pawn)|(king|queen)|(king|queen)-(rook|knight|bishop))\s*to\s*[a-h][1-8]$/;
    const blackRegex = /^black-(([a-h]-pawn)|(king|queen)|(king|queen)-(rook|knight|bishop))\s*to\s*[a-h][1-8]$/;
    
    // Combine the two regexes
    const regex = new RegExp(whiteRegex.source + "|" + blackRegex.source);
    
    if (!userInput.match(regex)) {
        alert('Invalid input. Please enter in the format "e-pawn to e4" or "black-king-rook to a4".');
        return;
    }
    
    const [piece, to] = userInput.split(' to ');
    const pieceClass = piece.split('-').join('-');
    const pieceElement = document.querySelector(`.${pieceClass}`);
    
    if (!pieceElement) {
        alert('Piece not found on the board.');
        return;
    }
    
    movePiece(pieceElement.id, to);
}

// Function to start voice recognition for white pieces
function startWhiteVoiceCommand() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support voice recognition.");
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
        console.log('White voice recognition started. Speak now.');
    };

    recognition.onresult = function(event) {
        const voiceInput = event.results[0][0].transcript.toLowerCase();
        console.log('You said: ' + voiceInput);
        
        processWhiteVoiceCommand(voiceInput);
    };
    
    recognition.onerror = function(event) {
        console.error('Voice recognition error:', event.error);
    };
    
    recognition.onend = function() {
        console.log('Voice recognition ended.');
    };
    
    recognition.start();
}

// Function to start voice recognition for black pieces
function startBlackVoiceCommand() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support voice recognition.");
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
        console.log('Black voice recognition started. Speak now.');
    };
    
    recognition.onresult = function(event) {
        const voiceInput = event.results[0][0].transcript.toLowerCase();
        console.log('You said: ' + voiceInput);
        
        processBlackVoiceCommand(voiceInput);
    };
    
    recognition.onerror = function(event) {
        console.error('Voice recognition error:', event.error);
    };
    
    recognition.onend = function() {
        console.log('Voice recognition ended.');
    };
    
    recognition.start();
}

// Process voice commands for white pieces
function processWhiteVoiceCommand(voiceInput) {
    // Apply auto-corrections
    voiceInput = applyCorrections(voiceInput);
    
    // Normalize the voice input for white pieces
    let normalizedInput = voiceInput.toLowerCase().replace('to', 'to').replace(' ', '-');
    normalizedInput = normalizedInput.replace(/([white])\s*(queen(rook|bishop)|knight|bishop|queen|king)\s*([a-h][1-8])/g, '$1-$2-$3')
    .replace(/rook\s*([a-h][1-8])/g, 'rook-to-$1')
    .replace(/knight\s*([a-h][1-8])/g, 'knight-to-$1')
    .replace(/bishop\s*([a-h][1-8])/g, 'bishop-to-$1')
    .replace(/queen\s*([a-h][1-8])/g, 'queen-to-$1')
    .replace(/king\s*([a-h][1-8])/g, 'king-to-$1');
    
    const formattedInput = normalizedInput.replace(/-to-/g, ' to ');
    console.log('Normalized input for white pieces:', formattedInput);
    
    if (voiceInput.toLowerCase() === 'king side castle') {
        console.log('Executing king-side castle...');
        // Move the king-side castle
        movePiece('e1-white-king', 'g1'); // Move king to g1
        movePiece('h1-white-king-rook', 'f1'); // Move rook to f1
        playSound('castle.mp3');
    } else if (voiceInput.toLowerCase() === 'queen side castle') {
        movePiece('e1-white-king', 'c1'); // Move king to c1
        movePiece('h1-white-king-rook', 'd1'); // Move rook to d1
        playSound('castle.mp3');
    }
    // En passant moves to the right
    else if (formattedInput === 'a-enpassant to b6') {
        movePiece('a2-white-a-pawn', 'b5'); // Capture b5 piece
        movePiece('a2-white-a-pawn', 'b6'); // Move to b6
    }
    else if (formattedInput === 'b-enpassant to c6') {
        movePiece('a2-white-a-pawn', 'b5'); // Capture b5 piece
        movePiece('a2-white-a-pawn', 'b6'); // Move to b6
    }
    else if (formattedInput === 'c-enpassant to d6') {
        movePiece('c2-white-c-pawn', 'd5'); // Capture d5 piece
        movePiece('c2-white-c-pawn', 'd6'); // Move to d6
    }else if (formattedInput === 'd-enpassant to e6') {
        movePiece('a2-white-a-pawn', 'e5'); // Capture b5 piece
        movePiece('a2-white-a-pawn', 'e6'); // Move to b6 
    } else if (formattedInput === 'e-enpassant to f6') {
        movePiece('e2-white-e-pawn', 'f5'); // Capture f5 piece
        movePiece('e2-white-e-pawn', 'f6'); // Move to f6
    } else if (formattedInput === 'f-enpassant to g6') {
        movePiece('a2-white-a-pawn', 'g5'); // Capture b5 piece
        movePiece('a2-white-a-pawn', 'g6'); // Move to b6
    } 
    else if (formattedInput === 'g-enpassant to h6') {
        movePiece('g2-white-g-pawn', 'h5'); // Capture h5 piece
        movePiece('g2-white-g-pawn', 'h6'); // Move to h6
    }
    // En passant moves to the left
    else if (formattedInput === 'b-enpassant to a6') {
        movePiece('b2-white-b-pawn', 'a5'); // Capture a5 piece
        movePiece('b2-white-b-pawn', 'a6'); // Move to a6
    } else if (formattedInput === 'c-enpassant to b6') {
        movePiece('d2-white-d-pawn', 'b5'); // Capture c5 piece
        movePiece('d2-white-d-pawn', 'b6'); // Move to c6
    }  else if (formattedInput === 'd-enpassant to c6') {
        movePiece('d2-white-d-pawn', 'c5'); // Capture c5 piece
        movePiece('d2-white-d-pawn', 'c6'); // Move to c6
    }else if (formattedInput === 'e-enpassant to d6') {
        movePiece('d2-white-d-pawn', 'd5'); // Capture c5 piece
        movePiece('d2-white-d-pawn', 'd6'); // Move to c6
    } 
    else if (formattedInput === 'f-enpassant to e6') {
        movePiece('f2-white-f-pawn', 'e5'); // Capture e5 piece
        movePiece('f2-white-f-pawn', 'e6'); // Move to e6
    }else if (formattedInput === 'g-enpassant to f6') {
        movePiece('d2-white-d-pawn', 'f5'); // Capture c5 piece
        movePiece('d2-white-d-pawn', 'f6'); // Move to c6
    }  
    else if (formattedInput === 'h-enpassant to g6') {
        movePiece('h2-white-h-pawn', 'g5'); // Capture g5 piece
        movePiece('h2-white-h-pawn', 'g6'); // Move to g6
    } else {
        document.getElementById('whiteMoveInput').value = formattedInput;
        movePieceByInput();
    }
}

// Process voice commands for black pieces
function processBlackVoiceCommand(voiceInput) {
    // Apply auto-corrections
    voiceInput = applyCorrections(voiceInput);
    
    // Normalize the voice input for black pieces
    let normalizedInput = voiceInput.toLowerCase().replace('to', 'to').replace(' ', '-');
    normalizedInput = normalizedInput.replace(/([black])\s*(queen(rook|bishop)|knight|bishop|queen|king)\s*([a-h][1-8])/g, '$1-$2-$3')
    .replace(/rook\s*([a-h][1-8])/g, 'rook-to-$1')
    .replace(/knight\s*([a-h][1-8])/g, 'knight-to-$1')
    .replace(/bishop\s*([a-h][1-8])/g, 'bishop-to-$1')
    .replace(/queen\s*([a-h][1-8])/g, 'queen-to-$1')
    .replace(/king\s*([a-h][1-8])/g, 'king-to-$1');
    
    const formattedInput = normalizedInput.replace(/-to-/g, ' to ');
    if (voiceInput.toLowerCase() === 'king side castle') {
        console.log('Executing king-side castle...');
        // Move the king-side castle
        movePiece('e8-black-king', 'g8'); // Move king to g8
        movePiece('h8-black-king-rook', 'f8'); // Move rook to f8
        playSound('castle.mp3');
    }
    else if(voiceInput.toLowerCase() === 'queen side castle'){
        movePiece('e8-black-king', 'c8'); // Move king to c8
        movePiece('h8-black-king-rook', 'd8'); // Move rook to d8
        playSound('castle.mp3');
    }
    // En passant moves to the right
    else if (formattedInput === 'a-enpassant to b3') {
        movePiece('a7-black-a-pawn', 'b4'); // Capture b5 piece
        movePiece('a7-black-a-pawn', 'b3'); // Move to b6
    } else if (formattedInput === 'b-enpassant to c3') {
        movePiece('b7-black-b-pawn', 'c4'); // Capture c5 piece
        movePiece('b7-black-b-pawn', 'c3'); // Move to c6
    } else if (formattedInput === 'c-enpassant to d3') {
        movePiece('c7-black-c-pawn', 'd4'); // Capture d5 piece
        movePiece('c7-black-c-pawn', 'd3'); // Move to d6
    } else if (formattedInput === 'd-enpassant to e3') {
        movePiece('d7-black-d-pawn', 'e4'); // Capture e5 piece
        movePiece('d7-black-d-pawn', 'e3'); // Move to e6
    } else if (formattedInput === 'e-enpassant to f3') {
        movePiece('e7-black-e-pawn', 'f4'); // Capture f5 piece
        movePiece('e7-black-e-pawn', 'f3'); // Move to f6
    } else if (formattedInput === 'f-enpassant to g3') {
        movePiece('f7-black-f-pawn', 'g4'); // Capture g5 piece
        movePiece('f7-black-f-pawn', 'g3'); // Move to g6
    } else if (formattedInput === 'g-enpassant to h3') {
        movePiece('g7-black-g-pawn', 'h4'); // Capture h5 piece
        movePiece('g7-black-g-pawn', 'h3'); // Move to h6
    }
// En passant moves to the left
else if (formattedInput === 'b-enpassant to a3') {
    movePiece('b7-black-b-pawn', 'a4'); // Capture a5 piece
    movePiece('b7-black-b-pawn', 'a3'); // Move to a6
} else if (formattedInput === 'c-enpassant to b3') {
    movePiece('c7-black-c-pawn', 'b4'); // Capture b5 piece
    movePiece('c7-black-c-pawn', 'b3'); // Move to b6
} else if (formattedInput === 'd-enpassant to c3') {
    movePiece('d7-black-d-pawn', 'c4'); // Capture c5 piece
    movePiece('d7-black-d-pawn', 'c3'); // Move to c6
} else if (formattedInput === 'e-enpassant to d3') {
    movePiece('e7-black-e-pawn', 'd4'); // Capture d5 piece
    movePiece('e7-black-e-pawn', 'd3'); // Move to d6
} else if (formattedInput === 'f-enpassant to e3') {
    movePiece('f7-black-f-pawn', 'e4'); // Capture e5 piece
    movePiece('f7-black-f-pawn', 'e3'); // Move to e6
} else if (formattedInput === 'g-enpassant to f3') {
    movePiece('g7-black-g-pawn', 'f4'); // Capture f5 piece
    movePiece('g7-black-g-pawn', 'f3'); // Move to f6
} else if (formattedInput === 'h-enpassant to g3') {
    movePiece('h7-black-h-pawn', 'g4'); // Capture g5 piece
    movePiece('h7-black-h-pawn', 'g3'); // Move to g6
}
else{
    document.getElementById('blackMoveInput').value = formattedInput;
        moveBlackPieceByInput();
}
}
function typeText(elementId, text, speed) {
    const element = document.getElementById(elementId);
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Example usage
const message = 'The commentary feature of this project requires an API key for proper functionality.';
typeText('response-box', message, 50); // Adjust the speed as needed

/ Initialize the chessboard
createChessboard();

 // Adjust the speed as needed


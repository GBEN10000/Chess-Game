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

// Function to move a chess piece to a specified square
function movePiece(pieceId, targetSquareId) {
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
    }

    // Move the piece to the target square
    targetSquare.appendChild(chessPiece);

    // Play sound effect for the move
    playSound('move-sound.mp3');
}
// Correction dictionary for common typos and their corrections
const corrections = {
    // Pawn
    'pound':'pawn',
    '1':'pawn',
    'one':'pawn',
    'want':'pawn',
    'on':'pawn',
    'pan': 'pawn',
    'porn': 'pawn',
    'pon': 'pawn',
    'pound': 'pawn',
    'pwn': 'pawn',
    'paan': 'pawn',
    'paun': 'pawn',
    'pewn': 'pawn',
    'pown': 'pawn',
    'paan': 'pawn',
    'pwnk': 'pawn',
    'pawwn': 'pawn',
    'paawn': 'pawn',
    'pawnk': 'pawn',
    'pwn': 'pawn',
    'paan': 'pawn',
    'pown': 'pawn',
    'paan': 'pawn',
    'paan': 'pawn',
    'pwnk': 'pawn',
    'paan': 'pawn',
    'pwn': 'pawn',
    'paawn': 'pawn',
    'paun': 'pawn',
    'pawwn': 'pawn',
    'pown': 'pawn',
    'paan': 'pawn',
    'pwn': 'pawn',
    'paan': 'pawn',
    'paun': 'pawn',
    'pwnk': 'pawn',
    'paw': 'pawn',
    'pwn': 'pawn',
    'paan': 'pawn',

    // Knight
    'kwon': 'knight',
    'kight': 'knight',
    'knite': 'knight',
    'knigth': 'knight',
    'knigt': 'knight',
    'kight': 'knight',
    'kwite': 'knight',
    'kwight': 'knight',
    'kwight': 'knight',
    'kwn': 'knight',
    'kwno': 'knight',
    'knight': 'knight',
    'knght': 'knight',
    'knigh': 'knight',
    'knite': 'knight',
    'knigt': 'knight',
    'knigt': 'knight',
    'knigh': 'knight',
    'knigt': 'knight',
    'knignt': 'knight',
    'knit': 'knight',
    'kni': 'knight',
    'knite': 'knight',
    'kn': 'knight',

    // Rook
    'rooc': 'rook',
    'rock': 'rook',
    'rck': 'rook',
    'rok': 'rook',
    'rook': 'rook',
    'rokk': 'rook',
    'rooc': 'rook',
    'rooky': 'rook',
    'roc': 'rook',
    'rookk': 'rook',
    'rooc': 'rook',
    'rork': 'rook',
    'rokk': 'rook',
    'rooc': 'rook',
    'rooc': 'rook',
    'roc': 'rook',
    'rooc': 'rook',
    'rook': 'rook',
    'rooc': 'rook',
    'rok': 'rook',
    'rok': 'rook',
    'rook': 'rook',
    'rook': 'rook',
    'rooc': 'rook',
    'rooc': 'rook',
    'rook': 'rook',
    'rokk': 'rook',

    // Bishop
    'bishup': 'bishop',
    'bisshop': 'bishop',
    'bishoo': 'bishop',
    'bshp': 'bishop',
    'bish': 'bishop',
    'bshop': 'bishop',
    'bsp': 'bishop',
    'bishp': 'bishop',
    'bish': 'bishop',
    'bishoo': 'bishop',
    'bish': 'bishop',
    'bsh': 'bishop',
    'bishp': 'bishop',
    'bshop': 'bishop',
    'bsp': 'bishop',
    'bishup': 'bishop',
    'bisshop': 'bishop',
    'bishup': 'bishop',
    'bishp': 'bishop',
    'bshp': 'bishop',
    'bisshop': 'bishop',
    'bish': 'bishop',
    'bish': 'bishop',
    'bishoo': 'bishop',
    'bsh': 'bishop',

    // Queen
    'quenn': 'queen',
    'quinn': 'queen',
    'qun': 'queen',
    'quee': 'queen',
    'queeen': 'queen',
    'quean': 'queen',
    'quien': 'queen',
    'quen': 'queen',
    'quinn': 'queen',
    'quenn': 'queen',
    'queon': 'queen',
    'qun': 'queen',
    'que': 'queen',
    'quenn': 'queen',
    'quenn': 'queen',
    'qun': 'queen',
    'quee': 'queen',
    'qun': 'queen',
    'quenn': 'queen',
    'quinn': 'queen',
    'quean': 'queen',
    'quean': 'queen',
    'quen': 'queen',
    'quinn': 'queen',
    'queon': 'queen',
    'queen': 'queen',

    // King
    'kng': 'king',
    'king': 'king',
    'kig': 'king',
    'kign': 'king',
    'kin': 'king',
    'kng': 'king',
    'kig': 'king',
    'kingg': 'king',
    'kink': 'king',
    'king': 'king',
    'kng': 'king',
    'kng': 'king',
    'king': 'king',
    'kng': 'king',
    'kng': 'king',
    'king': 'king',
    'kingg': 'king',
    'kng': 'king',
    'kig': 'king',
    'kingg': 'king',
    'king': 'king',
    'kng': 'king',
    'kng': 'king',
    'kng': 'king',
    'kng': 'king',

    // Columns (a-h)
    'a': 'a',
    'aa': 'a',
    'ah': 'a',
    'aah': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',
    'a': 'a',

    'b': 'b',
    'bb': 'b',
    'bh': 'b',
    'bbi': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',
    'b': 'b',

    'c': 'c',
    'she':'c',
    'cc': 'c',
    'ch': 'c',
    'ci': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',
    'c': 'c',

    'd': 'd',
    'dd': 'd',
    'dh': 'd',
    'di': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',
    'd': 'd',

    'i':'e',
    'keep':'e',
    'you':'e',
    'e': 'e',
    'ee': 'e',
    'eh': 'e',
    'ei': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',
    'e': 'e',

    'f': 'f',
    'ff': 'f',
    'fh': 'f',
    'fi': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',
    'f': 'f',

    'g': 'g',
    'gg': 'g',
    'gh': 'g',
    'gi': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',
    'g': 'g',

    'h': 'h',
    'hh': 'h',
    'h': 'h',
    'hi': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h',
    'h': 'h'
};


// Function to apply corrections to the input
function applyCorrections(input) {
    Object.keys(corrections).forEach(misspelling => {
        const regex = new RegExp(`\\b${misspelling}\\b`, 'gi');
        input = input.replace(regex, corrections[misspelling]);
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
    document.getElementById('whiteMoveInput').value = formattedInput;
    movePieceByInput();
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
    document.getElementById('blackMoveInput').value = formattedInput;
    moveBlackPieceByInput();
}

// Initialize the chessboard
createChessboard();

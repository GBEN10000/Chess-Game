// Function to create the chessboard with notations and chess pieces
function createChessboard() {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const chessboardContainer = document.getElementById('chessboard');

    for (let row = 1; row <= 8; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        for (let col = 0; col < 8; col++) {
            const squareDiv = document.createElement('div');
            squareDiv.className = (row + col) % 2 === 0 ? 'square white' : 'square black';
            squareDiv.id = columns[col] + row;

            const notation = document.createElement('div');
            notation.className = 'notation';
            notation.textContent = columns[col] + row;

            // Add class for chess piece image based on notation value
            const chessPieceClass = getChessPieceClass(columns[col] + row);
            if (chessPieceClass) {
                const chessPiece = document.createElement('div');
                chessPiece.className = 'chess-piece ' + chessPieceClass;
                chessPiece.draggable = true; // Make chess pieces draggable
                chessPiece.id = columns[col] + row + '-' + chessPieceClass; // Set a unique ID for each piece
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
        case 'a1':
            return 'white-queen-rook';
        case 'h1':
            return 'white-king-rook';
        case 'b1':
            return 'white-queen-knight';
        case 'g1':
            return 'white-king-knight';
        case 'c1':
            return 'white-queen-bishop';
        case 'f1':
            return 'white-king-bishop';
        case 'd1':
            return 'white-queen';
        case 'e1':
            return 'white-king';
        case 'a2':
            return 'white-pawn-1';
        case 'b2':
            return 'white-pawn-2';
        case 'c2':
            return 'white-pawn-3';
        case 'd2':
            return 'white-pawn-4';
        case 'e2':
            return 'white-pawn-5';
        case 'f2':
            return 'white-pawn-6';
        case 'g2':
            return 'white-pawn-7';
        case 'h2':
            return 'white-pawn-8';

        // Black pieces
        case 'a8':
            return 'black-queen-rook';
        case 'h8':
            return 'black-king-rook';
        case 'b8':
            return 'black-queenknight';
        case 'g8':
            return 'black-king-knight';
        case 'c8':
            return 'black-queenbishop';
        case 'f8':
            return 'black-king-bishop';
        case 'd8':
            return 'black-queen';
        case 'e8':
            return 'black-king';
        case 'a7':
            return 'black-pawn-1';
        case 'b7':
            return 'black-pawn-2';
        case 'c7':
            return 'black-pawn-3';
        case 'd7':
            return 'black-pawn-4';
        case 'e7':
            return 'black-pawn-5';
        case 'f7':
            return 'black-pawn-6';
        case 'g7':
            return 'black-pawn-7';
        case 'h7':
            return 'black-pawn-8';

        default:
            return null;
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

// Function to move a chess piece based on user input
function movePieceByInput() {
    const userInput = document.getElementById('moveInput').value.trim();
    
    // Updated regex to match the expected input format
    const regex = /^(white|black)-(pawn-[1-8]|king|queen|(king|queen)(rook|knight|bishop))\s*to\s*[a-h][1-8]$/;
    
    if (!userInput.match(regex)) {
        alert('Invalid input. Please enter in the format "black-pawn-1 to a4" or "white-king-rook to h3".');
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

// Function to start voice recognition
function startVoiceCommand() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support voice recognition.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        console.log('Voice recognition started. Speak now.');
    };

    recognition.onresult = function(event) {
        const voiceInput = event.results[0][0].transcript.toLowerCase();
        console.log('You said: ' + voiceInput);

        processVoiceCommand(voiceInput);
    };

    recognition.onerror = function(event) {
        console.error('Voice recognition error:', event.error);
    };

    recognition.onend = function() {
        console.log('Voice recognition ended.');
    };

    recognition.start();
}

function processVoiceCommand(voiceInput) {
  // Normalize the voice input to handle common discrepancies
  let normalizedInput = voiceInput.toLowerCase().replace('to', 'to').replace(' ', '-');

  // Handle common misinterpretations
  normalizedInput = normalizedInput
    .replace(/([black|white])\s*(queen(rook|bishop)|knight|bishop|queen|king)\s*([a-h][1-8])/g, '$1-$2-$3') // Handle cases like "black queen rook to c6"
    .replace(/rook\s*([a-h][1-8])/g, 'rook-to-$1') // Handle cases like "rook c6"
    .replace(/knight\s*([a-h][1-8])/g, 'knight-to-$1') // Handle cases like "knight c6"
    .replace(/bishop\s*([a-h][1-8])/g, 'bishop-to-$1') // Handle cases like "bishop c6"
    .replace(/queen\s*([a-h][1-8])/g, 'queen-to-$1') // Handle cases like "queen c6"
    .replace(/king\s*([a-h][1-8])/g, 'king-to-$1'); // Handle cases like "king c6"

  // Format the input to match the required format
  const formattedInput = normalizedInput.replace(/-to-/g, ' to ');

  // Update the input field and move the piece
  document.getElementById('moveInput').value = formattedInput;
  movePieceByInput();
}

function printResponse(message) {
    const responseDiv = document.getElementById('response');
    responseDiv.textContent = message;
}

// Initialize the chessboard
createChessboard();

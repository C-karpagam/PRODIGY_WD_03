// Variables to track the game state
let currentPlayer = 'X'; // X starts the game
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Board state
let gameActive = true; // Game is active or not

// Get DOM elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('resetButton');

// Winning combinations (index-based)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle cell click
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    // If cell is already filled or game is over, return
    if (gameBoard[index] !== '' || !gameActive) return;

    // Mark the cell with the current player's symbol
    gameBoard[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    // Check for a winner
    checkWinner();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            gameStatus.innerText = ${currentPlayer} wins!;
            return;
        }
    }

    // Check for a draw (no empty cells)
    if (!gameBoard.includes('')) {
        gameActive = false;
        gameStatus.innerText = "It's a draw!";
    }
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.innerText = '';
    cells.forEach(cell => cell.innerText = '');
}

// Event listeners for cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const playerNamesDiv = document.getElementById('playerNames');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer;
let player1, player2;
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function getPlayerNames() {
    player1 = prompt("Ingrese el nombre del Jugador 1 (X):");
    player2 = prompt("Ingrese el nombre del Jugador 2 (O):");
    currentPlayer = 'X';
    playerNamesDiv.innerHTML = `<p>Jugador 1 (X): ${player1}</p><p>Jugador 2 (O): ${player2}</p>`;
    createBoard();
}

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.innerText = `¡${currentPlayer === 'X' ? player1 : player2} gana!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        message.innerText = '¡Es un empate!';
        gameActive = false;
    }
}

resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.innerText = '';
    createBoard();
});

getPlayerNames();

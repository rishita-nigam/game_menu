document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameActive = true;
    let mode = 'friend'; // default mode is friend

    // Winning combinations
    const WINNING_COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function to start new game
    function startGame() {
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.classList.remove('X', 'O');
            cell.textContent = '';
        });
        message.textContent = '';
        gameActive = true;
    }

    // Function to handle cell click
    function handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.getAttribute('data-cell'));

        // If cell is already filled or game is not active, do nothing
        if (!gameActive || cell.textContent !== '') return;

        // Update cell content
        cell.classList.add(currentPlayer);
        cell.textContent = currentPlayer;

        // Check for win or tie
        if (checkWin()) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} wins!`;
            return;
        } else if (checkTie()) {
            gameActive = false;
            message.textContent = "It's a tie!";
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // If playing against computer and it's computer's turn, make its move
        if (mode === 'computer' && currentPlayer === 'O') {
            makeComputerMove();
        }
    }

    // Function to check for win
    function checkWin() {
        return WINNING_COMBOS.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    // Function to check for tie
    function checkTie() {
        return [...cells].every(cell => {
            return cell.textContent !== '';
        });
    }

    // Function to make computer move
    function makeComputerMove() {
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cell = emptyCells[randomIndex];
        cell.classList.add('O');
        cell.textContent = 'O';

        // Check for win or tie after computer's move
        if (checkWin()) {
            gameActive = false;
            message.textContent = "Computer wins!";
        } else if (checkTie()) {
            gameActive = false;
            message.textContent = "It's a tie!";
        } else {
            currentPlayer = 'X'; // Switch back to player after computer's move
        }
    }

    // Add event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', startGame);

    // Listen for mode change
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            mode = this.id;
            startGame();
            if (mode === 'computer' && currentPlayer === 'O') {
                makeComputerMove();
            }
        });
    });

    // Start the game
    startGame();
});

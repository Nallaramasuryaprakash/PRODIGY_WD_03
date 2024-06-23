document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('name-form');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const gameContainer = document.getElementById('game');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const messageElement = document.getElementById('message');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;
    let player1Name = '';
    let player2Name = 'Computer'; // Default name for Player 2
    let opponent = 'computer'; // Default opponent selection
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < 8; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winner = currentPlayer === 'X' ? player1Name : player2Name;
            messageElement.textContent = `${winner} wins!`;
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            messageElement.textContent = 'Game is a draw!';
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage();
        if (currentPlayer === 'O' && opponent === 'computer') {
            makeComputerMove();
        }
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        handleResultValidation();
    };

    const handleResetGame = () => {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        messageElement.textContent = '';
        cells.forEach(cell => cell.textContent = '');
        updateMessage();
    };

    const updateMessage = () => {
        const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        messageElement.textContent = `It's ${currentPlayerName}'s turn`;
    };

    const handleOpponentChange = () => {
        opponent = document.querySelector('input[name="opponent"]:checked').value;
        player2Input.disabled = opponent === 'computer';
        player2Name = opponent === 'computer' ? 'Computer' : 'Player 2'; // Set default name for Player 2 based on opponent selection
    };

    nameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        player1Name = player1Input.value.trim();
        handleOpponentChange();
        if (opponent === 'player') {
            player2Name = player2Input.value.trim() || 'Player 2'; // Set Player 2 name if not entered
        }
        nameForm.style.display = 'none';
        gameContainer.style.display = 'block';
        updateMessage();
    });

    document.querySelectorAll('input[name="opponent"]').forEach(input => {
        input.addEventListener('change', handleOpponentChange);
    });

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);

    const makeComputerMove = () => {
        if (!isGameActive) return;

        // Simple AI to choose the first empty cell
        let chosenCellIndex = board.indexOf('');
        if (chosenCellIndex !== -1) {
            board[chosenCellIndex] = currentPlayer;
            cells[chosenCellIndex].textContent = currentPlayer;
            handleResultValidation();
        }
    };

    // Set default values on page load
    player2Input.value = player2Name;
});

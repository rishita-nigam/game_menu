document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const modeRadio = document.getElementById('friend');
    let mode = 'friend'; // default mode is friend

    let player1Choice = null;
    let player2Choice = null;

    // Function to start new game
    function startGame() {
        player1Choice = null;
        player2Choice = null;
        message.textContent = '';
        if (mode === 'computer') {
            player2Choice = computerChoice();
            message.textContent = "Computer: " + player2Choice;
        }
    }

    // Function to handle choice click
    function handleChoiceClick(e) {
        const choice = e.target.getAttribute('data-choice');

        if (!player1Choice) {
            player1Choice = choice;
            message.textContent = "Player 1: " + choice;
            if (mode === 'computer') {
                player2Choice = computerChoice();
                message.textContent += " | Computer: " + player2Choice;
                determineWinner();
            }
        } else if (!player2Choice && mode === 'friend') {
            player2Choice = choice;
            message.textContent += " | Player 2: " + choice;
            determineWinner();
        }
    }

    // Function to determine computer's choice
    function computerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Function to determine winner
    function determineWinner() {
        if (player1Choice && player2Choice) {
            if (player1Choice === player2Choice) {
                message.textContent += " | It's a tie!";
            } else if ((player1Choice === 'rock' && player2Choice === 'scissors') ||
                       (player1Choice === 'paper' && player2Choice === 'rock') ||
                       (player1Choice === 'scissors' && player2Choice === 'paper')) {
                message.textContent += " | Player 1 wins!";
            } else {
                message.textContent += " | Player 2 wins!";
            }
        }
    }

    // Add event listeners
    choices.forEach(choice => {
        choice.addEventListener('click', handleChoiceClick);
    });

    resetButton.addEventListener('click', startGame);

    modeRadio.addEventListener('change', function() {
        mode = this.checked ? 'friend' : 'computer';
        startGame();
    });

    // Start the game
    startGame();
});

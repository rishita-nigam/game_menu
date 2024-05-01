document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById("game-board");
    const scoreElement = document.getElementById("score-value");

    const gridSize = 20;
    const gridWidth = gameBoard.clientWidth / gridSize;
    const gridHeight = gameBoard.clientHeight / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = {};
    let dx = 1;
    let dy = 0;
    let score = 0;
    let intervalId;

    function draw() {
        gameBoard.innerHTML = "";

        // Draw snake
        snake.forEach(segment => {
            const snakeElement = document.createElement("div");
            snakeElement.classList.add("cell");
            snakeElement.classList.add("snake");
            snakeElement.style.left = segment.x * gridSize + "px";
            snakeElement.style.top = segment.y * gridSize + "px";
            gameBoard.appendChild(snakeElement);
        });

        // Draw food
        const foodElement = document.createElement("div");
        foodElement.classList.add("cell");
        foodElement.classList.add("food");
        foodElement.style.left = food.x * gridSize + "px";
        foodElement.style.top = food.y * gridSize + "px";
        gameBoard.appendChild(foodElement);
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Check if snake hits wall or itself
        if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight || isSnakeCollided(head)) {
            clearInterval(intervalId);
            alert("Game Over! Your score is " + score);
            resetGame();
            return;
        }

        snake.unshift(head);

        // Check if snake eats food
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function isSnakeCollided(head) {
        return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function generateFood() {
        food.x = Math.floor(Math.random() * gridWidth);
        food.y = Math.floor(Math.random() * gridHeight);

        // Regenerate food if it spawns on the snake
        while (isSnakeCollided(food)) {
            food.x = Math.floor(Math.random() * gridWidth);
            food.y = Math.floor(Math.random() * gridHeight);
        }
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        dx = 1;
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
        generateFood();
        intervalId = setInterval(moveSnake, 100);
    }

    // Control snake movement
    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "ArrowUp":
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case "ArrowDown":
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case "ArrowLeft":
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case "ArrowRight":
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    });

    resetGame();
});

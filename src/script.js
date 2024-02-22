// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // Get references to important elements in the game
    const gameContainer = document.getElementById('game-container'); // The game container
    const dinosaur = document.getElementById('dinosaur'); // The dinosaur
    let isJumping = false; // A flag to track if the dinosaur is currently jumping
    let backgroundColorInterval; // Interval variable for background color change

    // Function to create obstacles
    function createObstacle() {
        // Create a new obstacle image element
        const obstacle = document.createElement('img');
        obstacle.classList.add('obstacle'); // Add a CSS class for styling
        obstacle.src = './public/coconut-tree.png'; // Set the obstacle's image source
        gameContainer.appendChild(obstacle); // Add the obstacle to the game container

        let obstaclePosition = 1000; // Initial position of the obstacle
        obstacle.style.left = obstaclePosition + 'px'; // Set the initial left position of the obstacle

        // Interval to move the obstacle to the left
        const obstacleMoveInterval = setInterval(() => {
            if (obstaclePosition < -60) {
                // If the obstacle goes off the screen, remove it and create a new one
                clearInterval(obstacleMoveInterval);
                gameContainer.removeChild(obstacle);
                createObstacle();
            }

            obstaclePosition -= 10; // Move the obstacle to the left
            obstacle.style.left = obstaclePosition + 'px';

            // Get the bottom position of the dinosaur
            const dinosaurBottom = parseInt(dinosaur.style.bottom);

            // Check for collision with the dinosaur
            if (
                obstaclePosition > 0 &&
                obstaclePosition < 60 &&
                dinosaurBottom <= 50 // Adjust this value based on your dinosaur's height
            ) {
                clearInterval(obstacleMoveInterval); // Stop the obstacle movement
                clearInterval(backgroundColorInterval); // Stop background color change
                alert('Game over! Your score: ' + score); // Show game over message
                score = 0; // Reset the score to 0
                updateScore(); // Update the score display
                document.location.reload(); // Reload the page to restart the game
            }

            // If the obstacle passes the dinosaur, increase the score
            if (obstaclePosition === 0) {
                score++;
                updateScore();
            }
        }, 20); // Move the obstacle every 20 milliseconds
    }

    let score = 0; // Initialize the score to 0
    updateScore(); // Update the initial score display

    // Event listener for the spacebar key to make the dinosaur jump
    document.addEventListener('keydown', jump);

    // Function to update the score display
    function updateScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = 'Score: ' + score;
    }

    // Function to make the dinosaur jump
    function jump(event) {
        if (event.keyCode === 32 && !isJumping) {
            isJumping = true; // Set the jumping flag to true
            let position = 0; // Initial jump position

            // Interval for the upward jump movement
            const jumpInterval = setInterval(() => {
                if (position >= 100) {
                    // If the jump reaches its peak, start falling
                    clearInterval(jumpInterval);

                    // Interval for the downward fall movement
                    const fallInterval = setInterval(() => {
                        if (position <= 0) {
                            // If the fall is complete, clear the fall interval and reset the jump flag
                            clearInterval(fallInterval);
                            isJumping = false;
                        }
                        position -= 5; // Move the dinosaur downward
                        dinosaur.style.bottom = position + 'px';
                    }, 20);
                }
                position += 5; // Move the dinosaur upward
                dinosaur.style.bottom = position + 'px';
            }, 20);
        }
    }

    // Function to change background color
    function changeBackgroundColor() {
        // Define an array of colors you want to cycle through
        const colors = ['#ffcc00', '#ff6600', '#cc33ff', '#00ccff', '#33cc33'];
        let colorIndex = 0;

        // Change background color every 3 seconds
        backgroundColorInterval = setInterval(() => {
            gameContainer.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 3000);
    }

    // Start the game by creating the first obstacle and changing background color
    createObstacle();
    changeBackgroundColor();
});

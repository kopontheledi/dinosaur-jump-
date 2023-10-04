document.addEventListener('DOMContentLoaded', function () {
    const dinosaur = document.querySelector('.dinosaur');
    const obstacle = document.querySelector('.obstacle');
    const startButton = document.getElementById('start-button');

    let isJumping = false;
    let gameStarted = false;

    startButton.addEventListener('click', startGame);

    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            startButton.disabled = true;
            obstacle.style.animation = 'obstacleMove 2s linear infinite';
            document.addEventListener('keydown', jump);
        }
    }

    function jump(event) {
        if (event.keyCode === 32 && !isJumping) {
            isJumping = true;
            let position = 0;
            const jumpInterval = setInterval(() => {
                if (position === 150) {
                    clearInterval(jumpInterval);
                    const fallInterval = setInterval(() => {
                        if (position === 0) {
                            clearInterval(fallInterval);
                            isJumping = false;
                        }
                        position -= 10;
                        dinosaur.style.bottom = position + 'px';
                    }, 20);
                }
                position += 10;
                dinosaur.style.bottom = position + 'px';
            }, 20);
        }
    }
});

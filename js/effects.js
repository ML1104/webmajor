var startButton = document.getElementById('entry-text');

function explode() {
    startButton.style.fontSize = '400px';
    startButton.style.opacity = '0';
    startButton.style.transition = '3s';
}

function changePage() {
    document.location.href = './menu.html';
}

function playInvaders() {
    document.location.href = './invaders.html';
}

function playBomb() {
    document.location.href = './bomb.html';
}

function playSnake() {
    document.location.href = './snake.html';
}

function playHunt() {
    document.location.href = './rpg.html';
}
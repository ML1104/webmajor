var startButton = document.getElementById('entry-text');

function explode() {
    startButton.style.fontSize = '400px';
    startButton.style.opacity = '0';
    startButton.style.transition = '3s';
}

function changePage() {
    document.location.href = './menu.html';
}
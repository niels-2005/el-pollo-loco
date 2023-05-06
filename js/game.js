let canvas;
let world;
let keyboard = new Keyboard();
let arrivedEndboss = false;

function startGame() {
    startLoadingScreen();
    setTimeout(() => {
        showCanvas();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 1000);
}

// zeigt den loading Screen an
function startLoadingScreen() {
    document.getElementById('start-screen-container').classList.add('d-none');
    document.getElementById('loading-animation-container').classList.remove('d-none');
}

// zeigt Canvas
function showCanvas() {
    document.getElementById('loading-animation-container').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}

// öffnet den Container wo die Story über Pepe steht
function openStoryTextContainer() {
    document.getElementById('story-container').classList.remove('d-none');
    document.getElementById('start-screen-container').classList.add('d-none');
}

// schließt den Container wo die Story über Pepe steht
function closeStoryTextContainer() {
    document.getElementById('story-container').classList.add('d-none');
    document.getElementById('start-screen-container').classList.remove('d-none');
}

// öffnet den Container wo die Steuerungen stehen
function openControlsTextContainer() {
    document.getElementById('controls-container').classList.remove('d-none');
    document.getElementById('start-screen-container').classList.add('d-none');
}

// schließt den Container wo die Steuerungen stehen
function closeControlsTextContainer() {
    document.getElementById('controls-container').classList.add('d-none');
    document.getElementById('start-screen-container').classList.remove('d-none');
}

// wenn eine Pfeiltaste gedrückt wird (keydown), wird die Variable die in der class Keyboard definiert ist true
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

// wenn keine Pfeiltaste gedrückt wird (keyup), wird die Variable die in der class Keyboard definiert ist (wieder) false
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

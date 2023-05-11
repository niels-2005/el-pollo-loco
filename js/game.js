let canvas;
let world;
let keyboard = new Keyboard();
let arrivedEndboss = false;
let intervalIDs = [];

let bottlesCollectedInMenu = 0;
let bottlesThrowedInMenu = 0;
let coinsCollectedInMenu = 0;
let killedChickenInMenu = 0;

function startGame() {
    startLoadingScreen();
    setTimeout(() => {
        showCanvas();
        setEndgameStatisticToNull();
        gameSounds();
        initLevel();
        mobileButtons();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 1000);
}

// setzt die Statistic wieder auf Null damit es nicht vermehrt wird
function setEndgameStatisticToNull() {
    bottlesCollectedInMenu = 0;
    bottlesThrowedInMenu = 0;
    coinsCollectedInMenu = 0;
    killedChickenInMenu = 0;
}

// checkt die eingesammelten bottles im Spiel
function checkCollectedBottles() {
    bottlesCollectedInMenu++;
}

// checkt die geworfenen Bottle im Spiel
function checkThrowedBottles() {
    bottlesThrowedInMenu++;
}

// checkt die eingesammelten Coins im Spiel
function checkCollectedCoins() {
    coinsCollectedInMenu++;
}

// checkt die getöteten Chicken
function checkKilledChicken() {
    killedChickenInMenu++;
}

// pusht Intervalle in das Array intervalIDs
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

// alle Intervalle im Array intervalIDs werden gecleart
function stopGame() {
    intervalIDs.forEach(clearInterval);
}

// wenn character tod wird you-lost-container angezeigt
function gameLost() {
    stopBackgroundMusic();
    showGameLostContainer();
}

// canvas bekommt d-none, lost container wird angezeigt
function showGameLostContainer() {
    setTimeout(() => {
        gameLoseSound.play();
        showsGameLoseStatistic();
        document.getElementById('you-lost-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 500);
}

// bestimmte HTML Elemente bekommen eine kleine Statistic am Ende des Spiels
function showsGameLoseStatistic() {
    document.getElementById('collected-bottles-ingame').innerHTML = bottlesCollectedInMenu;
    document.getElementById('throwed-bottles-ingame').innerHTML = bottlesThrowedInMenu;
    document.getElementById('collected-coins-ingame').innerHTML = coinsCollectedInMenu;
    document.getElementById('killed-chicken-ingame').innerHTML = killedChickenInMenu;
}

// wenn endboss tod wird you-won-container angezeigt
function gameWon() {
    stopBackgroundMusic();
    showGameWinContainer();
}

// canvas bekommt d-none, win container wird angezeigt
function showGameWinContainer() {
    setTimeout(() => {
        showsGameWinStatistic();
        document.getElementById('you-win-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 1200);
}

// zeigt am Ende beim Win eine kleine Statistik
function showsGameWinStatistic() {
    document.getElementById('collected-bottles-ingame-win').innerHTML = bottlesCollectedInMenu;
    document.getElementById('throwed-bottles-ingame-win').innerHTML = bottlesThrowedInMenu;
    document.getElementById('collected-coins-ingame-win').innerHTML = coinsCollectedInMenu;
    document.getElementById('killed-chicken-ingame-win').innerHTML = killedChickenInMenu;
}

// stopt nach Win oder Lose die Hintergrundmusik
function stopBackgroundMusic() {
    gameBackgroundMusic.pause();
    gameEndbossMusic.pause();
}

// zeigt Canvas
function showCanvas() {
    document.getElementById('loading-animation-container').classList.add('d-none');
    document.getElementById('canvas-container').classList.remove('d-none');
}

// zeigt den loading Screen an
function startLoadingScreen() {
    document.getElementById('start-screen-container').classList.add('d-none');
    document.getElementById('loading-animation-container').classList.remove('d-none');
}

// öffnet alle Textcontainer über Funktionsparameter definiert in der index.html
function openTextContainer(id1, id2) {
    document.getElementById(id1).classList.remove('d-none');
    document.getElementById(id2).classList.add('d-none');
}

// schließt alle Textcontainer über Funktionsparameter definiert in der index.html
function closeTextContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

// zum hauptmenü gehen, Funktionsparameter definiert in der index.html
function goToMainMenu(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

// spiel neustarten
function restartGame(id) {
    document.getElementById(id).classList.add('d-none');
    startGame();
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

// Mobile Buttons
function mobileButtons() {
    document.getElementById('canvas').addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

// Fullscreen
function goToFullscreen() {
    addClassesToAllElements();
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

// fügt allen Elementen die Fullscreen Klasse hinzu, Fullscreen Icon wird geswitcht
function addClassesToAllElements() {
    document.getElementById('start-screen-container').classList.add('fullscreen');
    document.getElementById('loading-animation-container').classList.add('fullscreen');
    document.getElementById('story-container').classList.add('fullscreen');
    document.getElementById('controls-container').classList.add('fullscreen');
    document.getElementById('you-lost-container').classList.add('fullscreen');
    document.getElementById('hints-container').classList.add('fullscreen');
    document.getElementById('you-win-container').classList.add('fullscreen');
    document.getElementById('canvas-container').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('enter-fullscreen-img').classList.add('d-none');
    document.getElementById('disable-fullscreen-img').classList.remove('d-none');
    document.getElementById('loading-animation-id').classList.add('loading-animation-fullscreen');
    document.getElementById('loading-animation-id').classList.remove('loading-animation');
    document.getElementById('you-lost-button-1').classList.add('button-style-fullscreen');
    document.getElementById('you-lost-button-2').classList.add('button-style-fullscreen');
    document.getElementById('you-lost-button-3').classList.add('button-style-fullscreen');
    document.getElementById('you-win-button-1').classList.add('button-style-fullscreen');
    document.getElementById('you-win-button-2').classList.add('button-style-fullscreen');
    document.getElementById('start-game-button').classList.add('button-style-fullscreen-main-menu');
    document.getElementById('open-story-button').classList.add('button-style-fullscreen-main-menu');
    document.getElementById('open-controls-button').classList.add('button-style-fullscreen-main-menu');
}

// in den Fullscreen hinein
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

// aus den Fullscreen heraus
function goOutFromFullscreen() {
    removeClassesFromAllElements();
    exitFullscreen();
}

// switch to normal Mode
function removeClassesFromAllElements() {
    document.getElementById('start-screen-container').classList.remove('fullscreen');
    document.getElementById('loading-animation-container').classList.remove('fullscreen');
    document.getElementById('story-container').classList.remove('fullscreen');
    document.getElementById('controls-container').classList.remove('fullscreen');
    document.getElementById('you-lost-container').classList.remove('fullscreen');
    document.getElementById('hints-container').classList.remove('fullscreen');
    document.getElementById('you-win-container').classList.remove('fullscreen');
    document.getElementById('canvas-container').classList.remove('fullscreen');
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('enter-fullscreen-img').classList.remove('d-none');
    document.getElementById('disable-fullscreen-img').classList.add('d-none');
    document.getElementById('loading-animation-id').classList.remove('loading-animation-fullscreen');
    document.getElementById('loading-animation-id').classList.add('loading-animation');
    document.getElementById('you-lost-button-1').classList.remove('button-style-fullscreen');
    document.getElementById('you-lost-button-2').classList.remove('button-style-fullscreen');
    document.getElementById('you-lost-button-3').classList.remove('button-style-fullscreen');
    document.getElementById('you-win-button-1').classList.remove('button-style-fullscreen');
    document.getElementById('you-win-button-2').classList.remove('button-style-fullscreen');
    document.getElementById('start-game-button').classList.remove('button-style-fullscreen-main-menu');
    document.getElementById('open-story-button').classList.remove('button-style-fullscreen-main-menu');
    document.getElementById('open-controls-button').classList.remove('button-style-fullscreen-main-menu');
}

// exit fullscreen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

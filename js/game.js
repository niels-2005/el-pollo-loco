let canvas;
let world;
let keyboard = new Keyboard();
let arrivedEndboss = false;
let intervalIDs = [];

let bottlesCollectedInMenu = 0;
let bottlesThrowedInMenu = 0;
let coinsCollectedInMenu = 0;
let killedChickenInMenu = 0;

// The function startGame() displays a loading screen for one second.
// After that, it draws the game world, resets the statistics to zero, sets the game sounds to the beginning state, and displays mobile buttons if necessary.
function startGame() {
    switchContainer('start-screen-container', 'loading-animation-container');
    setTimeout(() => {
        switchContainer('loading-animation-container', 'canvas-container');
        setEndgameStatisticToNull();
        gameSounds();
        initLevel();
        mobileButtons();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 1000);
}

// This function pushes most of the game's intervals into an array called "intervallIDs".
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

// When the game is stopped, the intervals in the "intervallIDS" Array are also cleared.
function stopGame() {
    intervalIDs.forEach(clearInterval);
}

// This function displays the loading screen or Canvas.
function switchContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

// This function resets the statistics to zero.
function setEndgameStatisticToNull() {
    bottlesCollectedInMenu = 0;
    bottlesThrowedInMenu = 0;
    coinsCollectedInMenu = 0;
    killedChickenInMenu = 0;
}

// This function controls the collected bottles in the game to display a small statistic at the end.
function checkCollectedBottles() {
    bottlesCollectedInMenu++;
}

// This function controls the throwed bottles in the game to display a small statistic at the end.
function checkThrowedBottles() {
    bottlesThrowedInMenu++;
}

//  This function controls the collected Coins in the game to display a small statistic at the end.
function checkCollectedCoins() {
    coinsCollectedInMenu++;
}

// This function controls the killed Chicken in the game to display a small statistic at the end.
function checkKilledChicken() {
    killedChickenInMenu++;
}

//  it displays the number of collected bottles, the number of bottles thrown, the number of collected coins, and the number of chickens killed.
function showGameStatistic(id1, id2, id3, id4) {
    document.getElementById(id1).innerHTML = bottlesCollectedInMenu;
    document.getElementById(id2).innerHTML = bottlesThrowedInMenu;
    document.getElementById(id3).innerHTML = coinsCollectedInMenu;
    document.getElementById(id4).innerHTML = killedChickenInMenu;
}

// This function is executed when the character has no more energy.
function gameLost() {
    stopBackgroundMusic();
    showGameLostContainer();
}

// The background music is paused after Win / Lose
function stopBackgroundMusic() {
    gameBackgroundMusic.pause();
    gameEndbossMusic.pause();
}

// This function has a setTimeout that is executed after 500ms.
//  It plays a game lose sound, displays statistics, sets the canvas display to "none", and displays the "You Lost Container".
function showGameLostContainer() {
    setTimeout(() => {
        gameLoseSound.play();
        showGameStatistic('collected-bottles-ingame', 'throwed-bottles-ingame', 'collected-coins-ingame', 'killed-chicken-ingame');
        document.getElementById('you-lost-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 500);
}

// This function is executed when the Endboss has no more energy.
function gameWon() {
    stopBackgroundMusic();
    showGameWinContainer();
}

// This function has a setTimeout that is executed after 1200ms.
//  It displays statistics, sets the canvas display to "none", and displays the "You Win Container".
function showGameWinContainer() {
    setTimeout(() => {
        showGameStatistic('collected-bottles-ingame-win', 'throwed-bottles-ingame-win', 'collected-coins-ingame-win', 'killed-chicken-ingame-win');
        document.getElementById('you-win-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 1200);
}

// This function opens all text containers specified by the parameters id1 and id2, which are defined in the index.html file.
function openTextContainer(id1, id2) {
    document.getElementById(id1).classList.remove('d-none');
    document.getElementById(id2).classList.add('d-none');
}

// This function closes all text containers specified by the parameters id1 and id2, which are defined in the index.html file.
function closeTextContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

// This function returns to the main menu upon a win or loss. The parameters are defined in the index.html file.
function goToMainMenu(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

// This functions restarts the Game upon a win or loss. The parameters is defined in the index.html file.
// The startGame() function initializes a new game.
function restartGame(id) {
    document.getElementById(id).classList.add('d-none');
    startGame();
}

// Event listener for keyboard inputs and updating the keyboard object accordingly
// This code listens for keydown events and updates the keyboard object based on the pressed keys.
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

// Event listener for releasing keyboard keys and updating the keyboard object accordingly
// This code listens for keyup events and updates the keyboard object based on the released keys.
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

// Function for handling mobile buttons
// This function sets up event listeners for touch events on mobile buttons.
// It prevents the default behavior of touch events to ensure smooth button interactions.
// When a button is touched, the corresponding keyboard property is set to true.
// When the touch is released, the corresponding keyboard property is set to false.
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

// This function sets the image to fullscreen and adds or removes classes from specific elements to maintain a visually pleasing design.
function goToFullscreen() {
    addClassesToAllElements();
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

// adds or removes classes from specific elements to maintain a visually pleasing design. (Fullscreen)
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

// enter Fullscreen
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

// This function restores the image from fullscreen to its normal size and adds or removes classes from specific elements to maintain a visually pleasing design.
function goOutFromFullscreen() {
    removeClassesFromAllElements();
    exitFullscreen();
}

// adds or removes classes from specific elements to maintain a visually pleasing design. (No Fullscreen)
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

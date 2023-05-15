let canvas;
let world;
let keyboard = new Keyboard();
let arrivedEndboss = false;
let intervalIDs = [];

let bottlesCollectedInMenu = 0;
let bottlesThrowedInMenu = 0;
let coinsCollectedInMenu = 0;
let killedChickenInMenu = 0;

/**
 * Initializes the game by displaying a loading screen, drawing the game world,
 * resetting the statistics, and displaying mobile buttons.
 */
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

/**
 * Adds intervals controlling the game into an array.
 * @param {function} fn - The function to be called at regular intervals.
 * @param {number} time - The time in milliseconds between each call of the function.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

/**
 * Stops all intervals controlling the game.
 */
function stopGame() {
    intervalIDs.forEach(clearInterval);
}

/**
 * Switches between two container elements on the page.
 * @param {string} id1 - The ID of the first container to be hidden.
 * @param {string} id2 - The ID of the second container to be displayed.
 */
function switchContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

/**
 * Resets the game's statistics.
 */
function setEndgameStatisticToNull() {
    bottlesCollectedInMenu = 0;
    bottlesThrowedInMenu = 0;
    coinsCollectedInMenu = 0;
    killedChickenInMenu = 0;
}

/**
 * Updates the count of bottles collected in the game.
 */
function checkCollectedBottles() {
    bottlesCollectedInMenu++;
}

/**
 * Updates the count of bottles thrown in the game.
 */
function checkThrowedBottles() {
    bottlesThrowedInMenu++;
}

/**
 * Updates the count of coins collected in the game.
 */
function checkCollectedCoins() {
    coinsCollectedInMenu++;
}

/**
 * Updates the count of chickens killed in the game.
 */
function checkKilledChicken() {
    killedChickenInMenu++;
}

/**
 * Displays the game statistics.
 * @param {string} id1 - The ID of the element to display the number of collected bottles.
 * @param {string} id2 - The ID of the element to display the number of thrown bottles.
 * @param {string} id3 - The ID of the element to display the number of collected coins.
 * @param {string} id4 - The ID of the element to display the number of killed chickens.
 */
function showGameStatistic(id1, id2, id3, id4) {
    document.getElementById(id1).innerHTML = bottlesCollectedInMenu;
    document.getElementById(id2).innerHTML = bottlesThrowedInMenu;
    document.getElementById(id3).innerHTML = coinsCollectedInMenu;
    document.getElementById(id4).innerHTML = killedChickenInMenu;
}

/**
 * Executes when the character has no more energy.
 */
function gameLost() {
    stopBackgroundMusic();
    showGameLostContainer();
}

/**
 * Pauses the background music after winning or losing.
 */
function stopBackgroundMusic() {
    gameBackgroundMusic.pause();
    gameEndbossMusic.pause();
}

/**
 * Displays a game lost screen with a setTimeout after 500ms.
 */
function showGameLostContainer() {
    setTimeout(() => {
        gameLoseSound.play();
        showGameStatistic('collected-bottles-ingame', 'throwed-bottles-ingame', 'collected-coins-ingame', 'killed-chicken-ingame');
        document.getElementById('you-lost-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 500);
}

/**
 * Executes when the Endboss has no more energy.
 */
function gameWon() {
    stopBackgroundMusic();
    showGameWinContainer();
}

/**
 * Displays a game win screen with a setTimeout after 1200ms.
 */
function showGameWinContainer() {
    setTimeout(() => {
        showGameStatistic('collected-bottles-ingame-win', 'throwed-bottles-ingame-win', 'collected-coins-ingame-win', 'killed-chicken-ingame-win');
        document.getElementById('you-win-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 1200);
}

/**
 * Opens the text containers specified by the parameters.
 * @param {string} id1 - The ID of the first container to be displayed.
 * @param {string} id2 - The ID of the second container to be hidden.
 */
function openTextContainer(id1, id2) {
    document.getElementById(id1).classList.remove('d-none');
    document.getElementById(id2).classList.add('d-none');
}

/**
 * Closes the text containers specified by the parameters.
 * @param {string} id1 - The ID of the first container to be hidden.
 * @param {string} id2 - The ID of the second container to be displayed.
 */
function closeTextContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

/**
 * Returns to the main menu upon a win or loss.
 * @param {string} id1 - The ID of the first container to be hidden.
 * @param {string} id2 - The ID of the second container to be displayed.
 */
function goToMainMenu(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

/**
 * Restarts the game upon a win or loss. The parameters is defined in the index.html file.
 * The startGame() function initializes a new game.
 *
 * @param {string} id - The id of the HTML element to be manipulated.
 */
function restartGame(id) {
    document.getElementById(id).classList.add('d-none');
    startGame();
}

/**
 * Event listener for keyboard inputs. It listens for keydown events and updates
 * the keyboard object based on the keys that are pressed.
 */
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

/**
 * Event listener for releasing keyboard keys. It listens for keyup events and updates
 * the keyboard object based on the keys that are released.
 */
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

/**
 * Handles touch events for mobile buttons. Sets up event listeners for touch events
 * on mobile buttons. It prevents the default behavior of touch events to ensure smooth
 * button interactions. When a button is touched, the corresponding keyboard property
 * is set to true. When the touch is released, the corresponding keyboard property
 * is set to false.
 */
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

/**
 * Sets the image to fullscreen and adds or removes classes from specific elements
 * to maintain a visually pleasing design.
 */
function goToFullscreen() {
    addClassesToAllElements();
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

/**
 * Adds or removes classes from specific elements to maintain a visually pleasing
 * design when in fullscreen mode.
 */
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

/**
 * Enters fullscreen mode for the specified element.
 *
 * @param {HTMLElement} element - The HTML element to be set to fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Restores the image from fullscreen to its normal size and adds or removes
 * classes from specific elements to maintain a visually pleasing design.
 */
function goOutFromFullscreen() {
    removeClassesFromAllElements();
    exitFullscreen();
}

/**
 * Adds or removes classes from specific elements to maintain a visually pleasing
 * design when not in fullscreen mode.
 */
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

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

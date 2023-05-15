characterJumpSound = new Audio('audio/character-jump.wav');
characterDeadSound = new Audio('audio/character-dead.wav');
characterHurtSound = new Audio('audio/character-hurt.ogg');
ChickenDeadSound = new Audio('audio/little-chicken.mp3');
throwBottleSound = new Audio('audio/throw-bottle.wav');
collectBottleSound = new Audio('audio/collect-beer.wav');
bottleSplashSound = new Audio('audio/class-splash.flac');
collectCoinSound = new Audio('audio/collect-coin.wav');
endbossHurtSound = new Audio('audio/chicken-got-attacked.mp3');
endbossAttentionSound = new Audio('audio/chicken-attention.mp3');
endbossAttackSound = new Audio('audio/endboss-attack.wav');

gameBackgroundMusic = new Audio('audio/background-music.mp3');
gameEndbossMusic = new Audio('audio/boss-music.mp3');

gameWinSound = new Audio('audio/win-sound.mp3');
gameLoseSound = new Audio('audio/lose-sound.wav');

let game_music_off = false;

/**
 * This function resets the game and boss music to the start, checks whether the game music is on or off,
 * and if it's on, it begins to play the game music on loop.
 */
function gameSounds() {
    setSoundsAtBegin();
    checkGameMusic();
    gameBackgroundMusic.loop = true;
    gameBackgroundMusic.play();
}

/**
 * This function resets the current time of the game and end boss music to zero.
 */
function setSoundsAtBegin() {
    gameBackgroundMusic.currentTime = 0;
    gameEndbossMusic.currentTime = 0;
}

/**
 * Checks whether the game music is on or off based on the value of the global variable 'game_music_off'.
 * If the game music is on, the volume for all sounds is set to 1; if it's off, the volume is set to 0.
 */
function checkGameMusic() {
    if (!game_music_off) {
        allSoundsVolumeOne();
    } else {
        allSoundsVolumeNull();
    }
}

/**
 * Sets the global variable 'game_music_off' to true, displays the sound off button, and sets the volume of all sounds to 0.
 */
function soundOff() {
    game_music_off = true;
    showSoundOffButton();
    allSoundsVolumeNull();
}

/**
 * This function hides the sound on button and displays the sound off button.
 */
function showSoundOffButton() {
    document.getElementById('sound-on-img').classList.add('d-none');
    document.getElementById('sound-off-img').classList.remove('d-none');
}

/**
 * This function sets the volume of all game sounds to 0.
 */
function allSoundsVolumeNull() {
    characterJumpSound.volume = 0;
    characterDeadSound.volume = 0;
    characterHurtSound.volume = 0;
    ChickenDeadSound.volume = 0;
    throwBottleSound.volume = 0;
    collectBottleSound.volume = 0;
    bottleSplashSound.volume = 0;
    collectCoinSound.volume = 0;
    endbossHurtSound.volume = 0;
    endbossAttentionSound.volume = 0;
    endbossAttackSound.volume = 0;
    gameBackgroundMusic.volume = 0;
    gameEndbossMusic.volume = 0;
    gameWinSound.volume = 0;
    gameLoseSound.volume = 0;
}

/**
 * Sets the global variable 'game_music_off' to false, displays the sound on button, and sets the volume of all sounds to 1.
 */
function soundOn() {
    game_music_off = false;
    showSoundOnButton();
    allSoundsVolumeOne();
}

/**
 * This function hides the sound off button and displays the sound on button.
 */
function showSoundOnButton() {
    document.getElementById('sound-on-img').classList.remove('d-none');
    document.getElementById('sound-off-img').classList.add('d-none');
}

/**
 * This function sets the volume of all game sounds to 1.
 */
function allSoundsVolumeOne() {
    characterJumpSound.volume = 1;
    characterDeadSound.volume = 1;
    characterHurtSound.volume = 1;
    ChickenDeadSound.volume = 1;
    throwBottleSound.volume = 1;
    collectBottleSound.volume = 1;
    bottleSplashSound.volume = 1;
    collectCoinSound.volume = 1;
    endbossHurtSound.volume = 1;
    endbossAttentionSound.volume = 1;
    endbossAttackSound.volume = 1;
    gameBackgroundMusic.volume = 1;
    gameEndbossMusic.volume = 1;
    gameWinSound.volume = 1;
    gameLoseSound.volume = 1;
}

/**
 * If the character or end boss has 0 energy, this function will mute all game sounds (except for the win or lose sound)
 * after a setTimeout of 500 ms.
 */
function setGameSoundsToNull() {
    setTimeout(() => {
        characterJumpSound.volume = 0;
        characterDeadSound.volume = 0;
        characterHurtSound.volume = 0;
        ChickenDeadSound.volume = 0;
        throwBottleSound.volume = 0;
        collectBottleSound.volume = 0;
        bottleSplashSound.volume = 0;
        collectCoinSound.volume = 0;
        endbossHurtSound.volume = 0;
        endbossAttentionSound.volume = 0;
        endbossAttackSound.volume = 0;
        gameBackgroundMusic.volume = 0;
        gameEndbossMusic.volume = 0;
    }, 500);
}

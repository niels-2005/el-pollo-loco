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

// This function, in case of a direct restart, resets the background music to 0 seconds.
// It checks if the music is muted or not, and plays the background music (if it is not muted).
function gameSounds() {
    setSoundsAtBegin();
    checkGameMusic();
    gameBackgroundMusic.loop = true;
    gameBackgroundMusic.play();
}

// resets the background music to 0 seconds.
function setSoundsAtBegin() {
    gameBackgroundMusic.currentTime = 0;
    gameEndbossMusic.currentTime = 0;
}

// This function checks a global variable to determine whether the music is muted or unmuted.
function checkGameMusic() {
    if (!game_music_off) {
        allSoundsVolumeOne();
    } else {
        allSoundsVolumeNull();
    }
}

// This function sets the global variable game_music_off to true, displays the sound off button, and sets the volume of all sounds to 0.
function soundOff() {
    game_music_off = true;
    showSoundOffButton();
    allSoundsVolumeNull();
}

// The sound on button disappears, and the sound off button is displayed.
function showSoundOffButton() {
    document.getElementById('sound-on-img').classList.add('d-none');
    document.getElementById('sound-off-img').classList.remove('d-none');
}

// sets the volume of all sounds to 0.
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

// This function sets the global variable game_music_off to false, displays the sound on button, and sets the volume of all sounds to 1.
function soundOn() {
    game_music_off = false;
    showSoundOnButton();
    allSoundsVolumeOne();
}

// The sound off button disappears, and the sound on button is displayed.
function showSoundOnButton() {
    document.getElementById('sound-on-img').classList.remove('d-none');
    document.getElementById('sound-off-img').classList.add('d-none');
}

// sets the volume of all sounds to 1.
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

// There is a setTimeout defined that executes after 500ms.
// If the character or the end boss has 0 energy, all game sounds are set to 0, except for the win or lose sound.
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

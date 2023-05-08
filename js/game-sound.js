characterJumpSound = new Audio('audio/character-jump.wav');
characterDeadSound = new Audio('audio/character-dead.wav');
characterHurtSound = new Audio('audio/character-hurt.ogg');
ChickenDeadSound = new Audio('audio/dead-chicken.wav');
throwBottleSound = new Audio('audio/throw-bottle.wav');
collectBottleSound = new Audio('audio/collect-beer.wav');
bottleSplashSound = new Audio('audio/class-splash.flac');
collectCoinSound = new Audio('audio/collect-coin.wav');

gameBackgroundMusic = new Audio('audio/background-music.mp3');
gameEndbossMusic = new Audio('audio/boss-music.mp3');

gameWinSound = new Audio('audio/win-sound.wav');
gameLoseSound = new Audio('audio/lose-sound.wav');

// lässt Hintergrundmusik spielen
function gameSounds() {
    gameBackgroundMusic.play();
}

// musik aus
function soundOff() {
    showSoundOffButton();
    allSoundsVolumeNull();
}

// zeigt den Musik ist aus button auf dem canvas
function showSoundOffButton() {
    document.getElementById('sound-on-img').classList.add('d-none');
    document.getElementById('sound-off-img').classList.remove('d-none');
}

// setzt alle sounds auf volume 0
function allSoundsVolumeNull() {
    characterJumpSound.volume = 0;
    characterDeadSound.volume = 0;
    characterHurtSound.volume = 0;
    ChickenDeadSound.volume = 0;
    throwBottleSound.volume = 0;
    collectBottleSound.volume = 0;
    bottleSplashSound.volume = 0;
    collectCoinSound.volume = 0;
    gameBackgroundMusic.volume = 0;
    gameEndbossMusic.volume = 0;
    gameWinSound.volume = 0;
    gameLoseSound.volume = 0;
}

// musik an
function soundOn() {
    showSoundOnButton();
    allSoundsVolumeOne();
}

// zeigt musik an button
function showSoundOnButton() {
    document.getElementById('sound-on-img').classList.remove('d-none');
    document.getElementById('sound-off-img').classList.add('d-none');
}

// setzt die musik auf volume 1
function allSoundsVolumeOne() {
    characterJumpSound.volume = 1;
    characterDeadSound.volume = 1;
    characterHurtSound.volume = 1;
    ChickenDeadSound.volume = 1;
    throwBottleSound.volume = 1;
    collectBottleSound.volume = 1;
    bottleSplashSound.volume = 1;
    collectCoinSound.volume = 1;
    gameBackgroundMusic.volume = 1;
    gameEndbossMusic.volume = 1;
    gameWinSound.volume = 1;
    gameLoseSound.volume = 1;
}

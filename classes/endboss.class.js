class Endboss extends MovableObject {
    IMAGES_ATTENTION = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    height = 400;
    width = 300;
    y = 50;
    offset = {
        top: 50,
        bottom: 20,
        left: 30,
        right: 30,
    };

    constructor() {
        super().loadImage(this.IMAGES_ATTENTION[0]);
        this.loadImages(this.IMAGES_ATTENTION);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3200;
        this.speed = 15;
        this.endbossAnimations();
    }

    endbossAnimations() {
        setStoppableInterval(() => {
            if (this.arrivingEndboss()) {
                this.endbossAttentionAnimation();
            } else if (this.CharacterIsNearEndboss()) {
                this.endbossAttackingAnimation();
            } else if (this.endbossIsHurt()) {
                this.endbossIsHurtAnimation();
            } else if (this.isDead()) {
                this.deathAnimation();
            } else if (this.endbossCanWalk()) {
                this.walkingAnimation();
            }
        }, 130);
    }

    arrivingEndboss() {
        return this.x - world.character.x <= 800 && !arrivedEndboss;
    }

    // wenn character boss erreicht werden attention images abgespielt und durch die variable
    // arrivedEndboss nach 1s abgebrochen
    endbossAttentionAnimation() {
        this.playAnimation(this.IMAGES_ATTENTION);
        endbossAttentionSound.play();
        this.letEndbossWalk();
    }

    letEndbossWalk() {
        setTimeout(() => {
            arrivedEndboss = true;
        }, 1500);
    }

    CharacterIsNearEndboss() {
        return this.x - world.character.x < 30;
    }

    endbossAttackingAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        endbossAttackSound.play();
    }

    endbossIsHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        endbossHurtSound.play();
    }

    // zeigt die Images Death und nach 0,5s fliegt der Endboss unten aus dem Game
    deathAnimation() {
        this.endbossDeadAndSound();
        setGameSoundsToNull();
        this.endbossMovesDownFromField();
        gameWon();
        this.stopsGame();
    }

    // stoppt alle Intervalle nach 1,5s
    stopsGame() {
        setTimeout(() => {
            stopGame();
            arrivedEndboss = false;
        }, 1500);
    }

    // lässt Endboss Dead Animation & Sound abspielen
    endbossDeadAndSound() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            gameWinSound.play();
        }, 200);
    }

    // lässt Endboss vom Feld verschwinden
    endbossMovesDownFromField() {
        setTimeout(() => {
            setStoppableInterval(() => {
                this.y += 20;
            }, 50);
        }, 500);
    }

    // Endboss läuft
    endbossCanWalk() {
        return arrivedEndboss === true;
    }

    // lässt Endboss nach links laufen
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.playEndbossMusic();
        this.moveLeft();
        this.otherDirection = false;
    }

    // lässt epische Endboss Music laufen
    playEndbossMusic() {
        gameEndbossMusic.loop = true;
        gameEndbossMusic.play();
        gameBackgroundMusic.pause();
    }
}

/**
 * Endboss class defines the characteristics and behaviors of the endboss in the game.
 * @extends MovableObject
 */
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

    /**
     * The constructor for the Endboss class.
     * The constructor is a special function that is automatically called when a new instance of this class is created.
     * It initializes the properties of the Endboss object and sets up its behaviors.
     */
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

    /**
     * It uses setStoppableInterval to control the endboss's animation based on its current state.
     * It checks if the endboss is in various states like dead, hurt, attacking, attention
     * and triggers the corresponding animation function.
     * The interval is set to 130 milliseconds for smooth animation.
     */
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

    /**
     * This method checks if the endboss is arrived.
     * @returns {boolean} Returns true if the endboss is arrived.
     */
    arrivingEndboss() {
        return this.x - world.character.x <= 800 && !arrivedEndboss;
    }

    /**
     * This method plays the attention animation for the endboss.
     */
    endbossAttentionAnimation() {
        this.playAnimation(this.IMAGES_ATTENTION);
        endbossAttentionSound.play();
        this.letEndbossWalk();
    }

    /**
     * This method sets a timeout for the endboss to start walking.
     */
    letEndbossWalk() {
        setTimeout(() => {
            arrivedEndboss = true;
        }, 1500);
    }

    /**
     * This method checks if the character is near the endboss.
     * @returns {boolean} Returns true if the character is near the endboss.
     */
    CharacterIsNearEndboss() {
        return this.x - world.character.x < 30;
    }

    /**
     * This method plays the attacking animation for the endboss.
     */
    endbossAttackingAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        endbossAttackSound.play();
    }

    /**
     * This method plays the hurt animation for the endboss.
     */
    endbossIsHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        endbossHurtSound.play();
    }

    /**
     * This method handles the death animation and related events for the endboss.
     */
    deathAnimation() {
        this.endbossDeadAndSound();
        setGameSoundsToNull();
        this.endbossMovesDownFromField();
        gameWon();
        this.stopsGame();
    }

    /**
     * This method stops the game after a certain delay.
     */
    stopsGame() {
        setTimeout(() => {
            stopGame();
            arrivedEndboss = false;
        }, 1500);
    }

    /**
     * This method plays the death animation and sound for the endboss.
     */
    endbossDeadAndSound() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            gameWinSound.play();
        }, 200);
    }

    /**
     * This method moves the endboss down from the field after its death animation.
     */
    endbossMovesDownFromField() {
        setTimeout(() => {
            setStoppableInterval(() => {
                this.y += 20;
            }, 50);
        }, 500);
    }

    /**
     * This method checks if the endboss can walk.
     * @returns {boolean} Returns true if the endboss has arrived.
     */
    endbossCanWalk() {
        return arrivedEndboss === true;
    }

    /**
     * This method plays the walking animation for the endboss.
     */
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.playEndbossMusic();
        this.moveLeft();
        this.otherDirection = false;
    }

    /**
     * This method configures the gameEndbossMusic to loop continuously, plays the endboss music, and pauses the gameBackgroundMusic.
     */
    playEndbossMusic() {
        gameEndbossMusic.loop = true;
        gameEndbossMusic.play();
        gameBackgroundMusic.pause();
    }
}

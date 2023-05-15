/**
 * Class representing a character that extends MovableObject.
 * This character can move around, jump, and interact with other game objects.
 * @extends MovableObject
 */
class Character extends MovableObject {
    height = 330;
    width = 120;
    checkingLongIdle = 0;
    offset = {
        top: 120,
        bottom: 20,
        left: 15,
        right: 15,
    };
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];

    world;
    speed = 6;

    /**
     * Constructs a new Character instance.
     * Loads the image for the character in various states (walking, jumping, etc.)
     * Applies gravity to the character and starts the animation loop for the character's movement.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/long_idle/I-11.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravityCharacter();
        this.animate();
    }

    /**
     * Controls the character's movement and camera position based on keyboard input.
     * Updates the character's position and applies a vertical speed for jumping.
     * Adjusts the camera position to keep the character in focus with a slight offset.
     */
    animate() {
        setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT && this.world.character.x <= this.world.endboss.x) {
                this.moveRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.speedY = 30;
            }
            this.world.camera_x = -this.x + 70;
        }, 1000 / 60);

        /**
         * It uses setStoppableInterval to control the character's animation based on its current state.
         * It checks if the character is in various states like dead, hurt, jumping, walking, standing, or in a long idle state,
         * and triggers the corresponding animation function.
         * The interval is set to 100 milliseconds for smooth animation.
         */
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.deathAnimation();
            } else if (this.isHurt()) {
                this.hurtAnimation();
            } else if (this.isAboveGround()) {
                this.jumpAnimation();
            } else if (this.isWalking()) {
                this.walkingAnimation();
            } else if (this.isStanding()) {
                this.idleAnimation();
            } else {
                this.longIdleAnimation();
            }
        }, 100);
    }

    /**
     * Plays the animation for the character's death.
     * Triggers the characterDeadSound, stops all game sounds, calls the gameLost function, and stops the game.
     */
    deathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        characterDeadSound.play();
        setGameSoundsToNull();
        gameLost();
        this.stopsGame();
    }

    /**
     * Sets a timeout to stop the game and reset the variable arrivedEndboss to false after a short delay.
     */
    stopsGame() {
        setTimeout(() => {
            stopGame();
            arrivedEndboss = false;
        }, 700);
    }

    /**
     * Plays the hurt animation of the character.
     * Plays the character hurt sound, and resets the checkingLongIdle variable.
     */
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        characterHurtSound.play();
        this.checkingLongIdle = 0;
    }

    /**
     * Plays the jumping animation of the character.
     * Plays the character jump sound, and resets the checkingLongIdle variable.
     */
    jumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        characterJumpSound.play();
        this.checkingLongIdle = 0;
    }

    /**
     * Checks if the character is currently moving to the right or left based on the keyboard input.
     * @returns {boolean} True if the character is moving, false otherwise.
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Plays the animation for the character walking and resets the counter for checking long idle.
     */
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.checkingLongIdle = 0;
    }

    /**
     * Checks if the character is in a standing state by comparing the checkingLongIdle counter to a threshold.
     * @returns {boolean} True if the character is standing, false otherwise.
     */
    isStanding() {
        return this.checkingLongIdle < 30;
    }

    /**
     * Plays the idle animation of the character.
     * Also increments the checkingLongIdle counter to track the duration of the idle state.
     */
    idleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.checkingLongIdle++;
    }

    /**
     * Plays the long idle animation of the character.
     * This animation is used when the character remains idle for an extended period of time.
     */
    longIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }
}

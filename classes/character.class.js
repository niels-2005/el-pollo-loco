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

    // This constructor initializes the Character object by loading its different images for various states such as walking, jumping, dead, hurt, idle, and long idle.
    // It applies gravity to the character and starts the animation loop for the character's movement.
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

    // The animate function controls the character's movement and camera position based on keyboard input.
    //  It updates the character's position and applies a vertical speed for jumping if the space bar is pressed.
    //  The camera position is adjusted to keep the character in focus with a slight offset.
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

        // The setStoppableInterval function controls the character's animation based on its current state.
        // It checks if the character is dead, hurt, jumping, walking, standing, or in a long idle state, and triggers the corresponding animation function.
        // The interval is set to 100 milliseconds for smooth animation.
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

    // The deathAnimation function plays the animation for the character's death.
    //  triggers the characterDeadSound, stops all game sounds, calls the gameLost function, and stops the game.
    deathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        characterDeadSound.play();
        setGameSoundsToNull();
        gameLost();
        this.stopsGame();
    }

    // The stopsGame function sets a timeout of 700 milliseconds to stop the game and reset the variable arrivedEndboss to false.
    stopsGame() {
        setTimeout(() => {
            stopGame();
            arrivedEndboss = false;
        }, 700);
    }

    // The hurtAnimation function plays the hurt animation of the character, plays the character hurt sound, and resets the checkingLongIdle variable.
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        characterHurtSound.play();
        this.checkingLongIdle = 0;
    }

    // The jumpAnimation function plays the jumping animation of the character, plays the character jump sound, and resets the checkingLongIdle variable.
    jumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        characterJumpSound.play();
        this.checkingLongIdle = 0;
    }

    // The isWalking function returns true if the character is currently moving to the right or left based on the keyboard input.
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    // The walkingAnimation function plays the animation for the character walking and resets the counter for checking long idle.
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.checkingLongIdle = 0;
    }

    // The isStanding function checks if the character is in a standing state by comparing the checkingLongIdle counter to a threshold.
    // If the counter is below the threshold, it returns true; otherwise, it returns false.
    isStanding() {
        return this.checkingLongIdle < 30;
    }

    // The idleAnimation function plays the idle animation of the character by calling the playAnimation method with the IMAGES_IDLE array.
    // It also increments the checkingLongIdle counter to track the duration of the idle state.
    idleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.checkingLongIdle++;
    }

    // The longIdleAnimation function plays the long idle animation of the character by calling the playAnimation method with the IMAGES_LONG_IDLE array.
    // This animation is used when the character remains idle for an extended period of time.
    longIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }
}

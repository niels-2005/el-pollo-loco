/**
 * The ThrowableObject class represents an object that the character can throw.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    height = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: -8,
    };

    IMAGES_THROWING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Constructs a new throwable object.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {boolean} characterDirection - The direction the character is facing.
     */
    constructor(x, y, characterDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.characterDirection = characterDirection;
        this.throw();
        this.bottleAnimations();
    }

    /**
     * Initiates the throwing action for the throwable object.
     */
    throw() {
        this.speedY = 30;
        this.applyGravityBottle();
        this.throwingLeftOrRight();
    }

    /**
     * Determines the horizontal direction of the throw based on the character's direction.
     */
    throwingLeftOrRight() {
        throwBottleSound.play();
        this.throwingInterval = setInterval(() => {
            if (this.characterDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);

        setTimeout(() => clearInterval(this.throwingInterval), 1000);
    }

    /**
     * Handles the animations and interactions of the throwable object.
     */
    bottleAnimations() {
        this.splashOrThrowingAnimation();
        this.updateBottleCollidedWithEndboss();
    }

    /**
     * Determines whether to play the splash animation or the throwing animation based on the object's position and collision state.
     */
    splashOrThrowingAnimation() {
        this.splashAnimation = setInterval(() => {
            if (this.y > 240 || world.bottleCollidedWithEndboss) {
                this.playSplashAnimation();
            } else {
                this.playAnimation(this.IMAGES_THROWING_BOTTLE);
            }
        }, 1000 / 15);
    }

    /**
     * Updates the world.bottleCollidedWithEndboss variable after a delay.
     */
    updateBottleCollidedWithEndboss() {
        setTimeout(() => {
            world.bottleCollidedWithEndboss = false;
        }, 50);
    }

    /**
     * Plays the splash animation and adjusts the throwable object's properties accordingly.
     */
    playSplashAnimation() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        bottleSplashSound.play();
        this.speed = 0;
        this.height = 100;
        this.splashEffect();
        clearInterval(this.splashAnimation);
    }

    /**
     * Simulates a splash effect by continuously increasing the throwable object's y position.
     */
    splashEffect() {
        setInterval(() => {
            this.y += 10;
            this.deleteBottle();
        }, 70);
    }

    /**
     * Simulates the deletion of the throwable object by moving it out of the visible area after a delay.
     */
    deleteBottle() {
        setTimeout(() => {
            this.y = 500;
        }, 300);
    }
}

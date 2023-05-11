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

    // In this constructor, the class initializes an instance of the object.
    //  It loads an image for the bottle and also loads images for the throwing animation and bottle splash animation.
    // The x and y parameters specify the initial position of the bottle.
    // The characterDirection parameter indicates the direction in which the character is facing, and it is passed from the world.
    // After initializing the properties, the throw() function is called to start the throwing animation.
    // Finally, the bottleAnimations() function is invoked to handle the different animations of the bottle.
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

    // In the throw() function, the bottle's vertical speed speedY is set to 30, indicating that it is thrown upward.
    // Then, the applyGravityBottle() function is called to simulate the effect of gravity on the bottle's movement.
    // Additionally, the throwingLeftOrRight() function is called to determine the horizontal direction in which the bottle should be thrown
    // based on the characterDirection property.
    throw() {
        this.speedY = 30;
        this.applyGravityBottle();
        this.throwingLeftOrRight();
    }

    // The throwingLeftOrRight() function is responsible for playing the throw bottle sound and setting up an interval
    // to move the bottle horizontally in the appropriate direction based on the characterDirection.
    // If characterDirection is true, indicating that the character is facing left, the bottle is moved to the left (this.x -= 10) every 25 milliseconds.
    //  Otherwise, if characterDirection is false, indicating that the character is facing right, the bottle is moved to the right (this.x += 10) every 25 milliseconds.
    // The interval is cleared after a timeout of 1000 milliseconds using clearInterval(this.throwingInterval).
    // This ensures that the bottle stops moving horizontally after a certain duration.
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

    // The bottleAnimations() function manages the animations and interactions of the bottle object.
    //It handles the throwing animation and the splash animation when the bottle collides with an object.
    // It also checks for collisions with the end boss and performs appropriate actions.
    bottleAnimations() {
        this.splashOrThrowingAnimation();
        this.updateBottleCollidedWithEndboss();
    }

    //  The splashOrThrowingAnimation() function controls the animation of the bottle object.
    // It uses an interval to continuously check the position of the bottle and determine whether to play the splash animation or the throwing animation.
    // If the bottle's y-coordinate is greater than 240 or if it has collided with the end boss (tracked by the world.bottleCollidedWithEndboss variable),
    //  the function calls the playSplashAnimation() method to display the splash animation.
    //  Otherwise, it calls the playAnimation() method with the IMAGES_THROWING_BOTTLE array to display the throwing animation.
    // The interval is set to run at a rate of 15 frames per second
    splashOrThrowingAnimation() {
        this.splashAnimation = setInterval(() => {
            if (this.y > 240 || world.bottleCollidedWithEndboss) {
                this.playSplashAnimation();
            } else {
                this.playAnimation(this.IMAGES_THROWING_BOTTLE);
            }
        }, 1000 / 15);
    }

    // The updateBottleCollidedWithEndboss() function is responsible for updating the world.bottleCollidedWithEndboss variable.
    // It sets a timeout of 50 milliseconds, and after that timeout, it sets the world.bottleCollidedWithEndboss variable to false.
    updateBottleCollidedWithEndboss() {
        setTimeout(() => {
            world.bottleCollidedWithEndboss = false;
        }, 50);
    }

    // The playSplashAnimation() function plays the splash animation,
    // modifies the bottle's properties, triggers a splash sound effect, and clears the splash animation interval.
    playSplashAnimation() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        bottleSplashSound.play();
        this.speed = 0;
        this.height = 100;
        this.splashEffect();
        clearInterval(this.splashAnimation);
    }

    // The splashEffect() function continuously increases the bottle's y position by 10 units and calls the deleteBottle() function.
    // This creates a vertical downward motion for the bottle, simulating a splash effect.
    // The function is executed every 70 milliseconds.
    splashEffect() {
        setInterval(() => {
            this.y += 10;
            this.deleteBottle();
        }, 70);
    }

    // The deleteBottle() function sets the bottle's y position to 500 after a delay of 300 milliseconds.
    // This effectively removes the bottle from the visible area, giving the appearance of the bottle being deleted or removed from the scene.
    deleteBottle() {
        setTimeout(() => {
            this.y = 500;
        }, 300);
    }
}

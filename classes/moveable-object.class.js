/**
 * MovableObject is a class for objects who moves.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Applies gravity to a throwable bottle object.
     */
    applyGravityBottle() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Applies gravity to the character by updating its vertical position based on the current speed and acceleration.
     */
    applyGravityCharacter() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 105;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if an object is above the ground level.
     * @returns {boolean} Returns true if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject && this.y < 300) {
            return true;
        } else {
            return this.y < 105;
        }
    }

    /**
     * Plays an animation by updating the image of the object.
     * @param {Array} images - An array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by updating its x coordinate based on its speed property.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left by updating its x coordinate based on its speed property.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Checks if the object is colliding with another movable object (mo).
     * @param {MovableObject} mo - Another movable object.
     * @returns {boolean} Returns true if there is a collision, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Represents the action of being hit by subtracting 0.5 from the Characters energy.
     */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Represents the action of being hit by the end boss, causing a decrease of 19 in the Characters energy.
     */
    hittedByEndboss() {
        this.energy -= 19;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Represents the action of being hit by a bottle, causing a decrease of 19 in the Endboss energy.
     */
    hittedByBottle() {
        this.energy -= 19;
        if (this.energy < 10) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the character is currently in a hurt state.
     * @returns {boolean} Returns true if the object is in a hurt state, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the end boss is currently in a hurt state.
     * @returns {boolean} Returns true if the end boss is in a hurt state, false otherwise.
     */
    endbossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.3;
    }

    /**
     * Checks if the character or object is dead.
     * @returns {boolean} Returns true if the energy of the character or object is equal to 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Handles the animations for the chicken object.
     */
    chickenAnimations() {
        this.movingLeft();
        this.checkingDeath();
    }

    /**
     * Sets up an interval that triggers the chicken to move to the left repeatedly.
     */
    movingLeft() {
        this.walkingLeft = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    /**
     * Sets up an interval that checks if the chicken is dead.
     */
    checkingDeath() {
        this.Death = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.deadChicken();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    /**
     * Called when the chicken is dead. It clears the intervals for walking left and checking death after a delay of 100 milliseconds.
     */
    deadChicken() {
        setTimeout(() => {
            clearInterval(this.walkingLeft);
            clearInterval(this.Death);
        }, 100);
    }
}

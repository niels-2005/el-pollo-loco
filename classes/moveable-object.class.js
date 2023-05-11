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

    //  The applyGravityBottle function applies gravity to the bottle by updating its vertical position based on the current speed and acceleration.
    // The function is executed in a stoppable interval with 25fps.
    //  If the bottle is above the ground or its vertical speed is greater than 0, the bottle's position is adjusted by subtracting the speed.
    // The speed is then reduced by the acceleration.
    applyGravityBottle() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    // The applyGravityCharacter function applies gravity to the character by updating its vertical position based on the current speed and acceleration.
    // The function is executed in a stoppable interval with 25fps.
    // If the character is above the ground or its vertical speed is greater than 0, the character's position is adjusted by subtracting the speed.
    // The speed is then reduced by the acceleration.
    //  If the character is not above the ground, its position is set to a fixed value of 105, which represents the ground level.
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

    // The isAboveGround function checks if an object is above the ground level.
    // For throwable objects, it checks if the object's y position is less than 300.
    // For other objects, including the character, it checks if the y position is less than 105, which represents the ground level.
    //  The function returns true if the object is above the ground and false otherwise.
    isAboveGround() {
        if (this instanceof ThrowableObject && this.y < 300) {
            return true;
        } else {
            return this.y < 105;
        }
    }

    // This function plays an animation by updating the image of the object.
    //  It takes an array of image paths as input.
    // The variable "i" calculates the current image index based on the modulus of the array length, ensuring it wraps around if it exceeds the array size.
    // The path variable retrieves the image path corresponding to the current index from the image cache.
    // The object's image is then updated with the image from the cache.
    //  Finally, the currentImage counter is incremented for the next frame of the animation.
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // This function moves the object to the right by updating its x coordinate based on its speed property.
    // The otherDirection variable is set to false to indicate that the object is moving in the right direction.
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    // This function moves the object to the left by updating its x coordinate based on its speed property.
    //  The otherDirection variable is set to true to indicate that the object is moving in the left direction.
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    // // This function checks if the object is colliding with another movable object (mo).
    //  It returns true if there is a collision, and false otherwise.
    //  The collision is detected by comparing the positions and sizes of the two objects, taking into account the offsets.
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    // This function represents the action of being hit by subtracting 0.5 from the Characters energy.
    // If the energy becomes negative, it is set to 0.
    // The lastHit property is updated with the current timestamp to track the time when the object was last hit.
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // This function represents the action of being hit by the end boss, causing a decrease of 19 in the Characters energy.
    //  If the energy becomes negative, it is set to 0.
    //  The lastHit property is updated with the current timestamp to track the time when the object was last hit.
    hittedByEndboss() {
        this.energy -= 19;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // This function represents the action of being hit by a bottle, causing a decrease of 19 in the Endboss energy.
    //If the energy falls below 10, it is set to 0.
    // The lastHit property is updated with the current timestamp to track the time when the object was last hit.
    hittedByBottle() {
        this.energy -= 19;
        if (this.energy < 10) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // speichert Zeit in Zahlenform, um zu speichern wann ein object verletzt wurde
        }
    }

    // This function checks if the object is currently in a hurt state.
    //  It calculates the time passed since the last hit by subtracting the lastHit timestamp from the current timestamp.
    // The result is divided by 1000 to convert it to seconds.
    // If the time passed is less than 0.5 seconds, the object is considered to be in a hurt state and the function returns true. Otherwise, it returns false.
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    // This function checks if the end boss is currently in a hurt state.
    //  It calculates the time passed since the last hit by subtracting the lastHit timestamp from the current timestamp.
    // The result is divided by 1000 to convert it to seconds.
    // If the time passed is less than 1.3 seconds, the end boss is considered to be in a hurt state and the function returns true. Otherwise, it returns false.
    endbossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.3;
    }

    // This function checks if the character or object is dead.
    // It returns true if the energy of the character or object is equal to 0, indicating that it has no remaining energy and is considered dead. Otherwise, it returns false.
    isDead() {
        return this.energy == 0;
    }

    // This function handles the animations for the chicken object.
    // It calls two helper functions, movingLeft() and checkingDeath(), to handle specific animation behaviors.
    chickenAnimations() {
        this.movingLeft();
        this.checkingDeath();
    }

    // This function sets up an interval that triggers the chicken to move to the left repeatedly.
    // The movement is done by calling the moveLeft() function and updating the otherDirection variable to false.
    //  The interval is set to 60 frames per second.
    movingLeft() {
        this.walkingLeft = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    // This function sets up an interval that checks if the chicken is dead.
    // If the chicken is dead, it plays the death animation and calls the deadChicken() function.
    // Otherwise, it plays the walking animation. The interval is set to 150 milliseconds.
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

    // This function is called when the chicken is dead. It clears the intervals for walking left and checking death after a delay of 100 milliseconds.
    deadChicken() {
        setTimeout(() => {
            clearInterval(this.walkingLeft);
            clearInterval(this.Death);
        }, 100);
    }
}

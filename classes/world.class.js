class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = [];
    collectedBottles = 0;
    endbossNotHitable = false;
    characterNotHitable = false;
    bottleCollidedWithEndboss = false;

    // This constructor initializes the game object by setting up the canvas context,
    // storing canvas and keyboard references, and calling necessary functions for drawing,
    // setting up the game world, and running the game and bottle loops.
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runBottles();
    }

    // This function links the Character and World class.
    setWorld() {
        this.character.world = this;
    }

    // This function sets an interval that checks  60 times per second for collisions, to determine if a chicken has been killed or if the end boss has been attacked.
    run() {
        setStoppableInterval(() => {
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithEndboss();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.killChickenWithBottle();
            this.attackEndboss();
        }, 1000 / 60);
    }

    // This function sets an interval that checks every 150ms if a bottle has been thrown.
    runBottles() {
        setStoppableInterval(() => {
            this.checkThrowObjects();
        }, 150);
    }

    // This function checks for collisions between the character and chickens.
    //  If the character is positioned above a chicken and is not injured, the chicken is killed.
    // Otherwise, the character takes damage, and the health status bar is updated.
    checkCollisionsWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !this.character.isHurt()) {
                    this.killChicken(enemy);
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    // This function gives the character a speed on the y-axis.
    //  executes the function chickenIsDead, and sets a setTimeout that executes the deleteEnemy function after 500ms.
    killChicken(enemy) {
        this.character.speedY = 30;
        this.chickenIsDead(enemy);

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    // This function sets the energy of the chickens to 0 and plays a sound.
    chickenIsDead(enemy) {
        enemy.energy = 0;
        ChickenDeadSound.play();
    }

    // This function removes the respective killed chicken from an array.
    // The function checkKilledChicken() is defined for endgame statistics.
    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        if (i > -1) {
            this.level.enemies.splice(i, 1);
            checkKilledChicken();
        }
    }

    // This function checks for collisions between the character and the end boss.
    // If there is a collision and the character is vulnerable, the character is attacked by the end boss.
    // The health status bar is updated, and the character becomes invulnerable for 1.5 seconds.
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterNotHitable) {
                this.character.hittedByEndboss();
                this.statusBarHealth.setPercentage(this.character.energy);
                this.characterInvulnerable();
            }
        });
    }

    // This function sets the global variable characterNotHitable to true.
    //  after 1.5 seconds (using setTimeout), it sets the variable back to false. This makes the character invulnerable during that time.
    characterInvulnerable() {
        this.characterNotHitable = true;
        setTimeout(() => {
            this.characterNotHitable = false;
        }, 1500);
    }

    // This function checks if a bottle collides with the end boss.
    //  If there is a collision and the end boss is vulnerable, the variable bottleCollidedWithEndboss is set to true, indicating that the end boss has been attacked.
    // Finally, the health status bar of the end boss is updated.
    attackEndboss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !this.endbossNotHitable) {
                    this.bottleCollidedWithEndboss = true;
                    this.endbossGotAttacked(endboss);
                }
            });
        });
        this.statusBarEndboss.setPercentage(world.level.endboss[0].energy);
    }

    // This function indicates that the end boss has been attacked with a bottle.
    // The end boss becomes invulnerable for 1.5 seconds.
    endbossGotAttacked(endboss) {
        endboss.hittedByBottle();
        this.endbossInvulnerable();
    }

    // This function sets the global variable endbossNotHitable to true.
    //  after 1.5 seconds (using setTimeout), it sets the variable back to false. This makes the Endboss invulnerable during that time.
    endbossInvulnerable() {
        this.endbossNotHitable = true;
        setTimeout(() => {
            this.endbossNotHitable = false;
        }, 1500);
    }

    // If the "D" key on the keyboard is pressed and the variable collectedBottles is greater than 0, a bottle can be thrown.
    // The bottle status bar is updated accordingly.
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            this.throwBottle();
            this.reduceBottleBar();
        }
    }

    // This function updates the bottle status bar to reflect a negative value, indicating that a bottle has been thrown.
    reduceBottleBar() {
        this.statusBarBottle.collected--;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    // This function checks thrown bottles for endgame statistics.
    // If the character is moving to the left, the bottle will be thrown to the left.
    //  If the character is moving to the right, the bottle will be thrown to the right.
    throwBottle() {
        this.collectedBottles--;
        checkThrowedBottles();
        if (this.character.otherDirection) {
            this.bottleThrowingLeft();
        } else {
            this.bottleThrowingRight();
        }
    }

    // This function throws the bottle to the left when the character is moving to the left.
    bottleThrowingLeft() {
        let bottle = new ThrowableObject(this.character.x - 20, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    // This function throws the bottle to the right when the character is moving to the right.
    bottleThrowingRight() {
        let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    // This function checks for collisions between the character and a bottle.
    //  If a collision occurs, a sound is played, the bottle is collected, and the bottle status bar is updated to a positive value.
    checkCollisionsBottle() {
        this.level.collectableObjectBottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                collectBottleSound.play();
                this.bottleCollected(bottle);
                this.increaseBottleBar();
            }
        });
    }

    // This function checks collected bottles for endgame statistics and removes the collected bottle from the array to make it disappear from the world.
    bottleCollected(bottle) {
        checkCollectedBottles();
        this.collectedBottles++;
        let i = this.level.collectableObjectBottle.indexOf(bottle);
        this.level.collectableObjectBottle.splice(i, 1);
    }

    // This function updates the bottle status bar to reflect a positive value.
    increaseBottleBar() {
        this.statusBarBottle.collected++;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    // This function checks for collisions between a bottle and a chicken. If a collision occurs, the chicken is killed.
    killChickenWithBottle() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.chickenKilledWithBottle(enemy);
                }
            });
        });
    }

    // This function sets the chicken's energy to 0, plays a sound, and deletes the chicken after a setTimeout of 500ms.
    chickenKilledWithBottle(enemy) {
        enemy.energy = 0;
        ChickenDeadSound.play();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    // This function checks for a collision between the character and a coin.
    //  If a collision occurs, a sound is played, the coin status bar is updated to a positive value, and the coin is collected.
    checkCollisionsCoin() {
        this.level.collectableObjectCoin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                collectCoinSound.play();
                this.increaseCoinBar();
                this.coinCollected(coin);
            }
        });
    }

    // This function updates the coin status bar to reflect a positive value.
    increaseCoinBar() {
        this.statusBarCoin.collected++;
        this.statusBarCoin.setCollected(this.statusBarCoin.collected);
    }

    // This function checks collected coins for endgame statistics and removes the collected coin from an array to make it disappear from the game world.
    coinCollected(coin) {
        checkCollectedCoins();
        let i = this.level.collectableObjectCoin.indexOf(coin);
        this.level.collectableObjectCoin.splice(i, 1);
    }

    // This function draws the game world.
    // At the beginning, the canvas is cleared, then background objects, status bars, and movable objects are added.
    //  The drawingFrames() function determines the frames per second (FPS) of the game, depending on the graphics card.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart bei jedem zeichnen das canvas
        this.addBackgroundObjects();
        this.addStatusBars();
        this.addMoveableObjects();
        this.drawingFrames();
    }

    // adds Background Landscape & Clouds
    addBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    // adds the Statusbars (Health, Bottle, Coin)
    // When the end boss is reached, the function adds the end boss's status bar to the game.
    addStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (arrivedEndboss === true) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    // This function adds the character, chickens, end boss, coins, and bottles to the game.
    addMoveableObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.collectableObjectCoin);
        this.addObjectsToMap(this.level.collectableObjectBottle);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
    }

    // This function determines the frames per second (FPS) of the game based on the graphics card.
    drawingFrames() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    // This function draws and adds the specified objects to the game.
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    // Movable objects are added to the game world, and if an object has a different direction, it is drawn accordingly.
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    // This function flips the image horizontally for a movable object.
    // It saves the current canvas state, translates to the width of the object,
    // applies a scale transformation to flip the image, and adjusts the object's x-coordinate accordingly.
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    // This function restores the image to its original orientation after flipping.
    // It adjusts the object's x-coordinate to its original value before the flip,
    // and restores the previously saved canvas state to revert the transformation.
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

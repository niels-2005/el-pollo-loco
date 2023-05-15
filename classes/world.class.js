/**
 * The World class represents the game environment where all objects interact.
 */
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

    /**
     * Constructs a new game world.
     * @param {object} canvas - The canvas on which the game is drawn.
     * @param {object} keyboard - The keyboard object capturing the user inputs.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runBottles();
    }

    /**
     * Links the Character and World class.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Checks for collisions and game updates at a set interval.
     */
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

    /**
     * Checks for thrown bottles at a set interval.
     */
    runBottles() {
        setStoppableInterval(() => {
            this.checkThrowObjects();
        }, 150);
    }

    /**
     * Checks for collisions between the character and chickens.
     */
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

    /**
     * Kills a chicken enemy.
     * @param {object} enemy - The enemy to be killed.
     */
    killChicken(enemy) {
        this.character.speedY = 30;
        this.chickenIsDead(enemy);

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    /**
     * Sets the enemy's energy to 0 and plays a death sound.
     * @param {object} enemy - The enemy that is dying.
     */
    chickenIsDead(enemy) {
        enemy.energy = 0;
        ChickenDeadSound.play();
    }

    /**
     * Removes the killed enemy from the enemy array.
     * @param {object} enemy - The enemy to be removed.
     */
    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        if (i > -1) {
            this.level.enemies.splice(i, 1);
            checkKilledChicken();
        }
    }

    /**
     * Checks for collisions between the character and the end boss.
     */
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterNotHitable) {
                this.character.hittedByEndboss();
                this.statusBarHealth.setPercentage(this.character.energy);
                this.characterInvulnerable();
            }
        });
    }

    /**
     * Makes the character temporarily invulnerable.
     */
    characterInvulnerable() {
        this.characterNotHitable = true;
        setTimeout(() => {
            this.characterNotHitable = false;
        }, 1500);
    }

    /**
     * Checks if a bottle collides with the end boss.
     */
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

    /**
     * Indicates that the end boss has been attacked with a bottle and makes the boss temporarily invulnerable.
     * @param {object} endboss - The end boss that has been attacked.
     */
    endbossGotAttacked(endboss) {
        endboss.hittedByBottle();
        this.endbossInvulnerable();
    }

    /**
     * Makes the end boss temporarily invulnerable.
     */
    endbossInvulnerable() {
        this.endbossNotHitable = true;
        setTimeout(() => {
            this.endbossNotHitable = false;
        }, 1500);
    }

    /**
     * Checks if a bottle can be thrown based on keyboard input and bottle count.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            this.throwBottle();
            this.reduceBottleBar();
        }
    }

    /**
     * Updates the bottle status bar to reflect a negative value.
     */
    reduceBottleBar() {
        this.statusBarBottle.collected--;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    /**
     * Checks thrown bottles and determines the direction of the throw.
     */
    throwBottle() {
        this.collectedBottles--;
        checkThrowedBottles();
        if (this.character.otherDirection) {
            this.bottleThrowingLeft();
        } else {
            this.bottleThrowingRight();
        }
    }

    /**
     * Throws the bottle to the left.
     */
    bottleThrowingLeft() {
        let bottle = new ThrowableObject(this.character.x - 20, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    /**
     * Throws the bottle to the right.
     */
    bottleThrowingRight() {
        let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    /**
     * Checks for collisions between the character and a bottle.
     */
    checkCollisionsBottle() {
        this.level.collectableObjectBottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                collectBottleSound.play();
                this.bottleCollected(bottle);
                this.increaseBottleBar();
            }
        });
    }

    /**
     * Updates game statistics and removes the collected bottle from the game world.
     * @param {object} bottle - The bottle to be collected.
     */
    bottleCollected(bottle) {
        checkCollectedBottles();
        this.collectedBottles++;
        let i = this.level.collectableObjectBottle.indexOf(bottle);
        this.level.collectableObjectBottle.splice(i, 1);
    }

    /**
     * Updates the bottle status bar to reflect a positive value.
     */
    increaseBottleBar() {
        this.statusBarBottle.collected++;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    /**
     * Checks for collisions between a bottle and a chicken.
     */
    killChickenWithBottle() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.chickenKilledWithBottle(enemy);
                }
            });
        });
    }

    /**
     * Kills a chicken with a bottle.
     * @param {object} enemy - The enemy to be killed
     */
    chickenKilledWithBottle(enemy) {
        enemy.energy = 0;
        ChickenDeadSound.play();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    /**
     * checkCollisionsCoin() checks for a collision between the character and a coin.
     * If a collision occurs, a sound is played, the coin status bar is updated to a positive value, and the coin is collected.
     */
    checkCollisionsCoin() {
        this.level.collectableObjectCoin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                collectCoinSound.play();
                this.increaseCoinBar();
                this.coinCollected(coin);
            }
        });
    }

    /**
     * increaseCoinBar() updates the coin status bar to reflect a positive value.
     */
    increaseCoinBar() {
        this.statusBarCoin.collected++;
        this.statusBarCoin.setCollected(this.statusBarCoin.collected);
    }

    /**
     * coinCollected(coin) checks collected coins for endgame statistics and removes the collected coin from an array to make it disappear from the game world.
     * @param {Object} coin - The coin that has been collected.
     */
    coinCollected(coin) {
        checkCollectedCoins();
        let i = this.level.collectableObjectCoin.indexOf(coin);
        this.level.collectableObjectCoin.splice(i, 1);
    }

    /**
     * draw() draws the game world.
     * At the beginning, the canvas is cleared, then background objects, status bars, and movable objects are added.
     * The drawingFrames() function determines the frames per second (FPS) of the game, depending on the graphics card.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundObjects();
        this.addStatusBars();
        this.addMoveableObjects();
        this.drawingFrames();
    }

    /**
     * addBackgroundObjects() adds the background landscape and clouds to the game world.
     * It translates the context's x-coordinate according to the camera_x value, adds the objects to the map, and then translates the context's x-coordinate back to its original position.
     */
    addBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * addStatusBars() adds the status bars (health, bottle, coin) to the game world.
     * When the end boss is reached, the function also adds the end boss's status bar to the game.
     */
    addStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (arrivedEndboss === true) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * addMoveableObjects() adds the character, enemies, end boss, coins, and bottles to the game.
     * It translates the context's x-coordinate according to the camera_x value. Then it calls the addToMap() function to add each of the game objects to the map.
     * After all objects have been added, it translates the context's x-coordinate back to its original position.
     */
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

    /**
     * drawingFrames() determines the frames per second (FPS) of the game.
     * It calls the requestAnimationFrame() method to redraw the game screen at a rate suitable for the device's graphics capabilities.
     */
    drawingFrames() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * addObjectsToMap(objects) draws and adds the specified objects to the game.
     * @param {Array} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * addToMap(mo) adds a movable object to the game world.
     * If the object has a different direction, it flips the image accordingly before drawing.
     * @param {Object} mo - The movable object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * flipImage(mo) flips the image horizontally for a movable object.
     * It saves the current canvas state, translates to the width of the object,
     * applies a scale transformation to flip the image, and adjusts the object's x-coordinate accordingly.
     * @param {Object} mo - The movable object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * flipImageBack(mo) restores the image to its original orientation after flipping.
     * It adjusts the object's x-coordinate to its original value before the flip,
     * and restores the previously saved canvas state to revert the transformation.
     * @param {Object} mo - The movable object whose image is to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

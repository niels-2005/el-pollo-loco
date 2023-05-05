class World {
    character = new Character();
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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // this.canvas = canvas (index.html)
        this.keyboard = keyboard; // this.keyboard = keyboard (definiert in game.js)
        this.draw();
        this.setWorld();
        this.run();
    }

    // Verknüpfung Character & Welt
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithEndboss();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkThrowObjects();
            this.killChickenWithBottle();
            this.attackEndboss();
        }, 200);
    }
    // Kolisionen Checken (Character & Gegner)
    checkCollisionsWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround()) {
                    this.killChicken(enemy);
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    // killt Chicken wenn draufgesprungen, gibt Character extra jump nach oben
    killChicken(enemy) {
        this.character.speedY = 30;
        enemy.energy = 0;

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    // löscht Enemys wenn Tod aus Array
    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        if (i > -1) {
            this.level.enemies.splice(i, 1);
        }
    }

    // checkt die Collision vom Character & Endboss, wenn kollidiert, character bekommt Schaden
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterNotHitable) {
                this.character.hittedByEndboss();
                this.statusBarHealth.setPercentage(this.character.energy);
                this.characterInvulnerable();
            }
        });
    }

    // gibt Character 1,5s unverwundbarkeit wenn kollidiert
    characterInvulnerable() {
        this.characterNotHitable = true;
        setTimeout(() => {
            this.characterNotHitable = false;
        }, 1500);
    }

    // wenn bottle mit endboss kollidiert, wird der endboss angegriffen
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

    // endboss wurde angegriffen
    endbossGotAttacked(endboss) {
        endboss.hittedByBottle();
        this.endbossInvulnerable();
    }

    // nach angriff 1,5s unverwundbarkeit
    endbossInvulnerable() {
        this.endbossNotHitable = true;
        setTimeout(() => {
            this.endbossNotHitable = false;
        }, 1500);
    }

    // Bottles werfen (checken) & Statusbar aktualisieren
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            this.throwBottle();
            this.reduceBottleBar();
        }
    }

    // statusBarBottle updaten (minus)
    reduceBottleBar() {
        this.statusBarBottle.collected--;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    // definiert eine bottle und pusht sie in ein array, wodurch bottles geworfen werden können
    throwBottle() {
        this.collectedBottles--;
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    // Kolisionen Checken (Character & Bottle)
    checkCollisionsBottle() {
        this.level.collectableObjectBottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollected(bottle);
                this.increaseBottleBar();
            }
        });
    }

    // wenn Bottle eingesammelt wird, wird es aus dem Array (aus der Map) gelöscht
    bottleCollected(bottle) {
        this.collectedBottles++;
        let i = this.level.collectableObjectBottle.indexOf(bottle);
        this.level.collectableObjectBottle.splice(i, 1);
    }

    // bottle bar updaten (plus)
    increaseBottleBar() {
        this.statusBarBottle.collected++;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    // chicken mit bottle killen
    killChickenWithBottle() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.chickenKilledWithBottle(enemy);
                }
            });
        });
    }

    // gegner für tod erklären mit bottle
    chickenKilledWithBottle(enemy) {
        enemy.energy = 0;

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    // Kolisionen Checken (Character & Coin)
    checkCollisionsCoin() {
        this.level.collectableObjectCoin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.increaseCoinBar();
                this.coinCollected(coin);
            }
        });
    }

    // erhöht wenn Coins eingesammelt werden die Status Bar Coin
    increaseCoinBar() {
        this.statusBarCoin.collected++;
        this.statusBarCoin.setCollected(this.statusBarCoin.collected);
    }

    // wenn coin eingesammelt wird, wird es aus dem Array (aus der Map) gelöscht
    coinCollected(coin) {
        let i = this.level.collectableObjectCoin.indexOf(coin);
        this.level.collectableObjectCoin.splice(i, 1);
    }

    // zeichnet alles in der Welt
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart bei jedem zeichnen das canvas
        this.addBackgroundObjects();
        this.addStatusBars();
        this.addMoveableObjects();
        this.drawingFrames();
    }

    // fügt die Hintergrundlandschaft hinzu
    addBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    // fügt Statusbars hinzu
    addStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (arrivedEndboss === true) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    // fügt Moveable Objects hinzu
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

    // function für fps (je nach Grafikkarte)
    drawingFrames() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    // Hilfsfunktion für Objects, führt addToMap auf, die das bestimmte Image zeichnet
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        // funktion um bilder zu spiegeln
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        // zeichnet Bilder
        mo.draw(this.ctx);
        // zeichnet Border um Enemy

        // mo.drawFrame(this.ctx);

        // funktion um zu vermeiden das alles gespiegelt wird
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

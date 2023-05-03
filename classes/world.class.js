class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObject = [];
    collectedBottles = 0;

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
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkThrowObjects();
            this.killChickenWithBottle();
        }, 200);
    }
    // Kolisionen Checken (Character & Gegner)
    checkCollisionsWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    this.killChicken(enemy);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    // killt Chicken wenn draufgesprungen, gibt Character extra jump nach oben
    killChicken(enemy) {
        this.character.speedY = 30;
        enemy.isDead();

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

    // Bottles werfen (checken) & Statusbar aktualisieren
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            this.throwBottle();
            this.collectedBottles--;
            this.statusBarBottle.collected--;
            this.statusBarBottle.setCollected(this.statusBarBottle.collected);
        }
    }

    // hilfsfunktion um code kürzer zu machen (bottle werfen)
    throwBottle() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    // Kolisionen Checken (Character & Bottle)
    checkCollisionsBottle() {
        this.level.collectableObjectBottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollected(bottle);
                this.statusBarBottle.collected++;
                this.statusBarBottle.setCollected(this.statusBarBottle.collected);
            }
        });
    }

    // wenn Bottle eingesammelt wird, wird es aus dem Array (aus der Map) gelöscht
    bottleCollected(bottle) {
        this.collectedBottles++;
        let i = this.level.collectableObjectBottle.indexOf(bottle);
        this.level.collectableObjectBottle.splice(i, 1);
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
        enemy.isDead();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    // Kolisionen Checken (Character & Coin)
    checkCollisionsCoin() {
        this.level.collectableObjectCoin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusBarCoin.collected++;
                this.statusBarCoin.setCollected(this.statusBarCoin.collected);
                this.coinCollected(coin);
            }
        });
    }

    // wenn coin eingesammelt wird, wird es aus dem Array (aus der Map) gelöscht
    coinCollected(coin) {
        let i = this.level.collectableObjectCoin.indexOf(coin);
        this.level.collectableObjectCoin.splice(i, 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart bei jedem zeichnen das canvas

        this.ctx.translate(this.camera_x, 0); // Kamera verschieben
        // moveable Objects zeichnen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // Kamera (zurück) verschieben

        this.addToMap(this.statusBar); // StatusBar einfügen damit sie fixed bleibt
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);

        this.ctx.translate(this.camera_x, 0); // Kamera (wieder) verschieben
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.collectableObjectCoin);
        this.addObjectsToMap(this.level.collectableObjectBottle);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0); // Kamera (wieder zurück) verschieben

        // function für fps (je nach Grafikkarte)
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

// meow

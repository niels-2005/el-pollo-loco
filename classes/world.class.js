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
            this.checkCollisions();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkThrowObjects();
        }, 200);
    }
    // Bottles werfen (checken)
    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
        }
    }
    // Kolisionen Checken (Character & Gegner)
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    // Kolisionen Checken (Character & Bottle)
    checkCollisionsBottle() {
        this.level.collectableObjectBottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.statusBarBottle.collected++;
                this.statusBarBottle.setCollected(this.statusBarBottle.collected);
            }
        });
    }

    // Kolisionen Checken (Character & Coin)
    checkCollisionsCoin() {
        this.level.collectableObjectCoin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusBarCoin.collected++;
                this.statusBarCoin.setCollected(this.statusBarCoin.collected);
            }
        });
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
        mo.drawFrame(this.ctx);

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

class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
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
    // Kolisionen Checken
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart bei jedem zeichnen das canvas

        this.ctx.translate(this.camera_x, 0); // Kamera verschieben
        // moveable Objects zeichnen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); // Kamera (zurück) verschieben

        this.addToMap(this.statusBar); // StatusBar einfügen damit sie fixed bleibt

        this.ctx.translate(this.camera_x, 0); // Kamera (wieder) verschieben
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
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

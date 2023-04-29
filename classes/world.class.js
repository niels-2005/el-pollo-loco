class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // this.canvas = canvas (index.html)
        this.keyboard = keyboard; // this.keyboard = keyboard (definiert in game.js)
        this.draw();
        this.setWorld();
    }

    // Verknüpfung Character & Welt
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart bei jedem zeichnen das canvas

        this.ctx.translate(this.camera_x, 0);

        // moveable Objects zeichnen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); // hilfsfunktion um Images zu zeichnen
        // funktion um zu vermeiden das alles gespielt wird
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}

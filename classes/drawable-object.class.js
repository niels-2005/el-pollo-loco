class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 200;
    height = 150;
    width = 100;

    // lädt das Standardbild
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // world funktion
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // hilfsfunktion um Images zu zeichnen
    }

    // world funktion
    drawFrame(ctx) {
        // zeichnet ein blauen Kasten um moveable objects (instance of = nur bei definierten Klassen (in dem Beispiel: Character oder Chicken))
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // lädt Images aus Character Array, img string wird in ein Img umgewandelt und im imageCache gespeichert
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}

class MovableObject {
    x = 120;
    y = 200;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;

    // lädt das Standardbild von Pepe
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // lädt Images aus Character Array, img string wird in ein Img umgewandelt und im imageCache gespeichert
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {}

    // Objecte nach links zeichnen (speed ist in den einzelnen Classes definiert)
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}

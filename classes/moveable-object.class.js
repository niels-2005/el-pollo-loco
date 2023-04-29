class MovableObject {
    x = 120;
    y = 200;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    otherDirection = false; // variable um Bilder zu spiegeln

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

    // (images) = WALKING_IMAGES
    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // % (mathematischer Rest) => 0, 1, 2, 3, 4, 5! , nach 5 wird es wieder auf 0 gesetzt!
        let path = this.IMAGES_WALKING[i]; // wenn IMAGES_WALKING = 5, durch die variable i wird es wieder auf 0 gesetzt!
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {}

    // Objecte nach links zeichnen (speed ist in den einzelnen Classes definiert)
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}

class Chicken extends MovableObject {
    height = 90;
    y = 340;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 350 + Math.random() * 300; // Zahl der X Achse zwischen 350 & 650 ( Chickenplatzierung )

        this.speed = 0.15 + Math.random() * 0.35; // Geschwindkeit der Chicken unterschiedlich machen
        this.animate();
    }

    // lädt Images aus imageCache (moveable objects class)
    animate() {
        this.moveLeft(); // moveable Object Funktion

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // % (mathematischer Rest) => 0, 1, 2, 3, 4, 5! , nach 5 wird es wieder auf 0 gesetzt!
            let path = this.IMAGES_WALKING[i]; // wenn IMAGES_WALKING = 5, durch die variable i wird es wieder auf 0 gesetzt!
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 10);
    }
}

class Chicken extends MovableObject {
    height = 90;
    y = 340;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 500 + Math.random() * 1750; // Zahl der X Achse zwischen 350 & 650 ( Chickenplatzierung )

        this.speed = 0.15 + Math.random() * 0.5; // Geschwindkeit der Chicken unterschiedlich machen
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(); // moveable Object Funktion
            this.otherDirection = false;
        }, 1000 / 60);
        // Animations abspielen in bestimmten Situationen
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 10);
    }
}

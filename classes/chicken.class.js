class Chicken extends MovableObject {
    height = 90;
    y = 340;
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 350 + Math.random() * 300; // Zahl der X Achse zwischen 350 & 650 ( Chickenplatzierung )
    }
}

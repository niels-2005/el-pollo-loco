class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 350;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; // Zahl der x-Achse zwischen 0 und 500
        this.speed = 0.05;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(); // moveable Object Funktion
            this.otherDirection = false;
        }, 1000 / 60);
    }
}

class Cloud extends MovableObject {
    width = 400;
    height = 350;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.y = 10 + Math.random() * 50;
        this.x = Math.random() * 3000; // Zahl der x-Achse zwischen 0 und 500
        this.speed = 0.05;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft(); // moveable Object Funktion
            this.otherDirection = false;
        }, 1000 / 60);
    }
}

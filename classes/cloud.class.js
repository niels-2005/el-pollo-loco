/**
 * Cloud is a class for background cloud objects in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    width = 400;
    height = 350;

    /**
     * The constructor initializes a background cloud object.
     * It loads the image for the cloud and sets its initial position and speed.
     * The cloud's animations are also set up in the constructor.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.y = 10 + Math.random() * 50;
        this.x = Math.random() * 3000;
        this.speed = 0.05;
        this.animate();
    }

    /**
     * The animate method is responsible for animating the cloud.
     * It uses a setStoppableInterval to move the cloud to the left
     * at approximately 60 frames per second.
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}

class Cloud extends MovableObject {
    width = 400;
    height = 350;

    // The constructor function initializes a background object for clouds.
    //  It calls the loadImage method to load the image for the cloud.
    // The initial position of the cloud on the y-axis is set randomly between 10 and 60.
    // The initial position of the cloud on the x-axis is set randomly between 0 and 3000.
    //  The speed of the cloud is set to 0.05.
    // Finally, the animate function is called to start animating the cloud.
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.y = 10 + Math.random() * 50;
        this.x = Math.random() * 3000;
        this.speed = 0.05;
        this.animate();
    }

    // The animate function is responsible for animating the background cloud.
    //  It uses a setStoppableInterval to repeatedly execute a callback function at a specific interval.
    // In this case, the callback function moves the cloud to the left by calling the moveLeft method.
    // The otherDirection variable is set to false, indicating that the cloud is moving in its default direction.
    // The interval is set to 1000 milliseconds divided by 60, which corresponds to approximately 60 frames per second.
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}

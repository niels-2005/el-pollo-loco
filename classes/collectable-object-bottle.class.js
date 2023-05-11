class CollectableObjectBottle extends MovableObject {
    height = 100;
    width = 100;
    y = 333;

    IMAGES_BOTTLE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];

    // The constructor initializes a SalsaBottle object.
    //  It loads the image for the bottle and sets its initial position on the x-axis randomly between 200 and 2200.
    // The animate function is then called to start animating the bottle.
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random() * 2000;
        this.animate();
    }

    // The animate function sets up a repeating interval to play the animation of the salsa bottle.
    // It calls the playAnimation function with the IMAGES_BOTTLE array as the frames of the animation.
    // The interval is set to 600 milliseconds, so the animation will update every 0.6 seconds.
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 600);
    }
}

/**
 * CollectableObjectBottle is a class for SalsaBottle collectable objects in the game.
 * @extends MovableObject
 */
class CollectableObjectBottle extends MovableObject {
    height = 100;
    width = 100;
    y = 333;

    IMAGES_BOTTLE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];

    /**
     * The constructor initializes a SalsaBottle object.
     * It loads the image for the bottle, sets its initial x-axis position randomly,
     * and sets up its animations.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random() * 2000;
        this.animate();
    }

    /**
     * The animate method sets up the bottle's animation.
     * It uses a setStoppableInterval to periodically update the bottle's animation
     * at approximately every 0.6 seconds.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 600);
    }
}

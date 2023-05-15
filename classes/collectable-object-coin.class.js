/**
 * CollectableObjectCoin is a class for the Coin collectable objects in the game.
 * @extends MovableObject
 */
class CollectableObjectCoin extends MovableObject {
    height = 150;
    width = 150;
    y = 75;

    IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

    /**
     * The constructor initializes a Coin object.
     * It loads the image for the coin, sets its initial x-axis position randomly,
     * loads the coin animation frames, and sets up its animations.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 2000;
        this.animate();
    }

    /**
     * The animate method sets up the coin's animation.
     * It uses a setStoppableInterval to periodically update the coin's animation
     * at approximately every 0.2 seconds.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}

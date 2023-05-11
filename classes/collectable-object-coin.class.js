class CollectableObjectCoin extends MovableObject {
    height = 150;
    width = 150;
    y = 75;

    IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

    // The constructor function initializes the coin object by loading its image and setting its initial position on the x-axis using a random value between 400 and 2400.
    //  It also loads the coin animation frames from the IMAGES_COIN array.
    //  Finally, it calls the animate function to start the animation loop for the coin.
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 2000;
        this.animate();
    }

    // The animate function sets up an interval that repeatedly plays the animation frames from the IMAGES_COIN array
    // at a rate of 5 frames per second (200 milliseconds interval).
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}

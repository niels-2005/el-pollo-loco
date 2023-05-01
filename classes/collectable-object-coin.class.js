class CollectableObjectCoin extends MovableObject {
    height = 200;
    width = 200;
    y = 290;

    IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 700 + Math.random() * 1000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}

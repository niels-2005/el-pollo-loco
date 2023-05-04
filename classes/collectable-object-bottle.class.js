class CollectableObjectBottle extends MovableObject {
    height = 100;
    width = 100;
    y = 333;

    IMAGES_BOTTLE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 400 + Math.random() * 2000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 600);
    }
}

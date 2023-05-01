class ThrowableObject extends MovableObject {
    height = 100;

    IMAGES_THROWING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING_BOTTLE);
        this.x = x;
        this.y = y;
        this.throw();
    }

    // bottles werfen
    throw() {
        this.animate();

        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING_BOTTLE);
        }, 50);
    }
}

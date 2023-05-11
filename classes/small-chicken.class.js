class ChickenSmall extends MovableObject {
    height = 55;
    width = 50;
    y = 372;

    offset = {
        top: 0,
        bottom: 0,
        left: 25,
        right: 25,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    //  The constructor of the chicken class loads the walking and dead images for the chicken object.
    //  It sets the initial x position of the chicken randomly between 500 and 2500.
    // The speed of the chicken is set to a random value between 0.15 and 0.45.
    // Finally, it calls the chickenAnimations() function to start the chicken's animations.
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 2000;

        this.speed = 0.15 + Math.random() * 0.3;
        this.chickenAnimations();
    }
}

class Chicken extends MovableObject {
    height = 90;
    width = 75;
    y = 340;

    offset = {
        top: 0,
        bottom: 0,
        left: 25,
        right: 25,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    // The constructor function initializes a chicken enemy object.
    //  It calls the loadImage method to load the image for the chicken's default walking animation.
    //  It also loads the images for the walking and dead animations using the loadImages method.
    //  The initial position of the chicken on the x-axis is set randomly between 500 and 2500.
    // The speed of the chicken is set randomly between 0.15 and 0.45.
    // Finally, the chickenAnimations function is called to set up the chicken's animations.
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 2000;

        this.speed = 0.15 + Math.random() * 0.3;
        this.chickenAnimations();
    }
}

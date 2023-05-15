/**
 * The ChickenSmall class represents the small chicken object in the game.
 * @extends MovableObject
 */
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

    /**
     * The constructor of the ChickenSmall class.
     * It initializes the chicken object by loading the walking and dead images,
     * sets the initial x position of the chicken randomly between 500 and 2500,
     * assigns a random speed to the chicken between 0.15 and 0.45,
     * and calls the chickenAnimations() method to start the chicken's animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 2000;

        this.speed = 0.15 + Math.random() * 0.3;
        this.chickenAnimations();
    }
}

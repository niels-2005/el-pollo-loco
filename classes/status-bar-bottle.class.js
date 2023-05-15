/**
 * The StatusBarBottle class represents the status bar for the bottle object in the game.
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    x = 0;
    y = 55;
    height = 60;
    width = 250;
    collected = 0;

    /**
     * The constructor of the StatusBarBottle class.
     * It initializes the status bar for the bottle object by loading the images,
     * and sets the initial collected count to 0.
     */
    constructor() {
        super();

        this.loadImages(this.IMAGES_BOTTLE);

        this.setCollected(0);
    }

    /**
     * The setCollected method updates the collected property of the status bar object
     * and changes the displayed image according to the collected amount.
     * @param {number} collected - The collected amount of bottles.
     */
    setCollected(collected) {
        this.collected = collected;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndexCollectableObjects()];
        this.img = this.imageCache[path];
    }
}

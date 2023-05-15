/**
 * The StatusBarCoin class represents the status bar for the coin object in the game.
 * @extends DrawableObject
 */
class StatusBarCoin extends DrawableObject {
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    x = 0;
    y = 110;
    height = 60;
    width = 250;
    collected = 0;

    /**
     * The constructor of the StatusBarCoin class.
     * It initializes the status bar for the coin object by loading the images,
     * and sets the initial collected count to 0.
     */
    constructor() {
        super();

        this.loadImages(this.IMAGES_COIN);

        this.setCollected(0);
    }

    /**
     * The setCollected method updates the collected property of the status bar object
     * and changes the displayed image according to the collected amount.
     * @param {number} collected - The collected amount of coins.
     */
    setCollected(collected) {
        this.collected = collected;
        let path = this.IMAGES_COIN[this.resolveImageIndexCollectableObjects()];
        this.img = this.imageCache[path];
    }
}

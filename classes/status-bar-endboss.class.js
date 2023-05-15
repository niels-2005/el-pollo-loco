/**
 * The StatusBarEndboss class represents the status bar for the endboss object in the game.
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    percent = 100;
    x = 565;
    y = 30;
    height = 60;
    width = 250;

    /**
     * The constructor of the StatusBarEndboss class.
     * It initializes the status bar for the endboss object by loading the images,
     * and sets the initial health percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);

        this.setPercentage(100);
    }

    /**
     * The setPercentage method updates the health percentage property of the status bar object
     * and changes the displayed image according to the health percentage.
     * @param {number} percent - The health percentage of the endboss.
     */
    setPercentage(percent) {
        this.percent = percent;
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }
}

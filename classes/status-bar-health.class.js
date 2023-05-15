/**
 * The StatusBarHealth class represents the health status bar for the player character in the game.
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    percent = 100;
    x = 0;
    y = 0;
    height = 60;
    width = 250;

    /**
     * The constructor of the StatusBarHealth class.
     * It initializes the health status bar for the player character by loading the images,
     * and sets the initial health percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);

        this.setPercentage(100);
    }

    /**
     * The setPercentage method updates the health percentage property of the health status bar object
     * and changes the displayed image according to the health percentage.
     * @param {number} percent - The health percentage of the player.
     */
    setPercentage(percent) {
        this.percent = percent;
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }
}

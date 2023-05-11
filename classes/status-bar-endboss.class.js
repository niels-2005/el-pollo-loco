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

    // In the constructor, the IMAGES_HEALTH are loaded using the loadImages method, and the percentage is set to 100 using the setPercentage method.
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);

        this.setPercentage(100);
    }

    //The setPercentage method sets the percent property of the statusBar to the specified value.
    // It then determines the image path based on the resolved image index using the resolveImageIndex() method.
    // Finally, it updates the img property with the corresponding image from the imageCache.
    setPercentage(percent) {
        this.percent = percent;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    // The resolveImageIndex method determines the image index based on the percent property of the statusBar.
    //  If the percent is 100, it returns 5.
    //  If the percent is greater than 80, it returns 4.
    //  If the percent is greater than 60, it returns 3.
    //  If the percent is greater than 40, it returns 2.
    // If the percent is greater than 20, it returns 1.
    //  If the percent is 20 or less, it returns 0.
    resolveImageIndex() {
        if (this.percent == 100) {
            return 5;
        } else if (this.percent > 80) {
            return 4;
        } else if (this.percent > 60) {
            return 3;
        } else if (this.percent > 40) {
            return 2;
        } else if (this.percent > 20) {
            return 1;
        } else if (this.percent >= 0) {
            return 0;
        }
    }
}

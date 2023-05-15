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
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }
}

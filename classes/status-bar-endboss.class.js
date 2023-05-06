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
    y = 0;
    height = 60;
    width = 250;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);

        this.setPercentage(100);
    }

    //Health Statusbar setPercentage(50), von 100 auf 50
    setPercentage(percent) {
        this.percent = percent;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    // ermittelt welches Healthstatusbar Image angezeigt werden soll
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

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

    constructor() {
        super();

        this.loadImages(this.IMAGES_COIN);

        this.setCollected(0);
    }

    //bottle Statusbar setCollected(1), 1 von 5
    setCollected(collected) {
        this.collected = collected;
        let path = this.IMAGES_COIN[this.resolveImageIndexCoin()];
        this.img = this.imageCache[path];
    }

    // ermittelt welches bottlestatusbar Image angezeigt werden soll
    resolveImageIndexCoin() {
        if (this.collected == 0) {
            return 0;
        } else if (this.collected == 1) {
            return 1;
        } else if (this.collected == 2) {
            return 2;
        } else if (this.collected == 3) {
            return 3;
        } else if (this.collected == 4) {
            return 4;
        } else {
            return 5;
        }
    }
}

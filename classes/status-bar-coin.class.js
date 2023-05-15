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

    // The constructor of the StatusBarCoin class loads the images for the Statusbar object using the loadImages method and the IMAGES_COIN array.
    // It sets the initial collected count to 0 using the setCollected method.
    constructor() {
        super();

        this.loadImages(this.IMAGES_COIN);

        this.setCollected(0);
    }

    // The setCollected method sets the collected property of the statusbar object to the specified collected value.
    // It then determines the image path for the current collected state using the resolveImageIndexCoin method and the IMAGES_COIN array.
    //  Finally, it updates the img property of the statusbar object with the corresponding image from the image cache.
    setCollected(collected) {
        this.collected = collected;
        let path = this.IMAGES_COIN[this.resolveImageIndexCollectableObjects()];
        this.img = this.imageCache[path];
    }
}

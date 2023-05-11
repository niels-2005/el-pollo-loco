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

    // The constructor of the StatusBarBottle class loads the images for the Statusbar object using the loadImages method and the IMAGES_BOTTLE array.
    // It sets the initial collected count to 0 using the setCollected method.
    constructor() {
        super();

        this.loadImages(this.IMAGES_BOTTLE);

        this.setCollected(0);
    }

    // The setCollected method sets the collected property of the statusbar object to the specified collected value.
    // It then determines the image path for the current collected state using the resolveImageIndexBottle method and the IMAGES_BOTTLE array.
    //  Finally, it updates the img property of the statusbar object with the corresponding image from the image cache.
    setCollected(collected) {
        this.collected = collected;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndexBottle()];
        this.img = this.imageCache[path];
    }

    // The resolveImageIndexBottle method returns the index of the image in the IMAGES_BOTTLE array based on the current value of the collected property.
    // If bottles collected is 0, it returns 0.
    // If bottles collected is 1, it returns 1.
    // If bottles collected is 2, it returns 2.
    // If bottles collected is 3, it returns 3.
    // If bottles collected is 4, it returns 4.
    // For any other value of collected, it returns 5.
    // This method is used in conjunction with the setCollected method to determine the appropriate image path for the statusbar object based on its collected state.
    resolveImageIndexBottle() {
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

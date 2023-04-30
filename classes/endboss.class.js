class Endboss extends MovableObject {
    IMAGES_ATTENTION = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    height = 400;
    width = 300;
    y = 45;

    constructor() {
        super().loadImage(this.IMAGES_ATTENTION[0]);
        this.loadImages(this.IMAGES_ATTENTION);
        this.x = 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ATTENTION); // moveable Object Funktion
        }, 300);
    }
}

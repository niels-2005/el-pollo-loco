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

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    height = 400;
    width = 300;
    y = 50;

    constructor() {
        super().loadImage(this.IMAGES_ATTENTION[0]);
        this.loadImages(this.IMAGES_ATTENTION);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3200;
        this.speed = 8;
        this.endbossAnimations();
    }

    endbossAnimations() {
        setInterval(() => {
            if (this.x - world.character.x <= 600 && !arrivedEndboss) {
                this.endbossAttention();
            } else if (this.x - world.character.x < 30) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead()) {
                this.deathAnimation();
            } else if (arrivedEndboss === true) {
                this.walkingAnimation();
            }
        }, 130);
    }

    // wenn character boss erreicht werden attention images abgespielt und durch die variable
    // arrivedEndboss nach 1,5s abgebrochen
    endbossAttention() {
        this.playAnimation(this.IMAGES_ATTENTION);
        setTimeout(() => {
            arrivedEndboss = true;
        }, 1000);
    }

    // zeigt die Images Death und nach 0,5s fliegt der Endboss unten aus dem Game
    deathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            setInterval(() => {
                this.y += 20;
            }, 50);
        }, 500);
    }

    // lässt Endboss nach links laufen
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
        this.otherDirection = false;
    }
}

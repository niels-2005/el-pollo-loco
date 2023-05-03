class ThrowableObject extends MovableObject {
    height = 100;

    IMAGES_THROWING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, characterDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.characterDirection = characterDirection; // übergeben von der world
        this.throw();
        this.bottleAnimations();
    }

    // bottles werfen
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwingLeftOrRight();
    }

    // checkt ob nach links oder rechts geworfen wird und beendet das interval wieder
    throwingLeftOrRight() {
        this.throwingInterval = setInterval(() => {
            if (this.characterDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);

        setTimeout(() => clearInterval(this.throwingInterval), 1000);
    }

    // bottle Animations in der Luft & Boden
    bottleAnimations() {
        this.splashAnimation = setInterval(() => {
            if (this.y > 240) {
                this.playSplashAnimation();
            } else {
                this.playAnimation(this.IMAGES_THROWING_BOTTLE);
            }
        }, 1000 / 15);
    }

    // wenn kollidiert oder boden = splash bottle
    playSplashAnimation() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speed = 0;
        this.height = 100;
        this.splashEffect();
        clearInterval(this.splashAnimation);
    }

    // wenn flasche explodiert, erzeugt es einen kleinen effekt der den bildchirm runtergeht
    splashEffect() {
        setInterval(() => {
            this.y += 10;
        }, 70);
    }
}

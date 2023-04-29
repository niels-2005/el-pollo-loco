class Character extends MovableObject {
    height = 330;
    y = 105;
    x = 60;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    world; // mit dieser Variable kann man auf alle Variablen der World zugreifen
    speed = 7;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                // Geschwindkeit nach rechts
                this.x += this.speed;
            }
            if (this.world.keyboard.LEFT) {
                // Geschwindkeit nach links
                this.x -= this.speed;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk Animation (Bilder laden)
                let i = this.currentImage % this.IMAGES_WALKING.length; // % (mathematischer Rest) => 0, 1, 2, 3, 4, 5! , nach 5 wird es wieder auf 0 gesetzt!
                let path = this.IMAGES_WALKING[i]; // wenn IMAGES_WALKING = 5, durch die variable i wird es wieder auf 0 gesetzt!
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 1000 / 20);
    }

    jump() {}
}

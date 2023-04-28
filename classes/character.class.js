class Character extends MovableObject {
    height = 330;
    y = 105;
    x = 60;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    }

    jump() {}
}

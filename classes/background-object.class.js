// The background-object.class.js is a class that inherits from the MovableObject class.
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // 480 = canvas height
    }
}

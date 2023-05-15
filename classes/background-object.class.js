/**
 * Class representing a background object that extends MovableObject.
 * Each object will have a width and a height, and is placed on a specific location on the canvas.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Constructs a new BackgroundObject instance.
     * Loads the image for the object, and sets its initial x and y coordinates.
     * The y-coordinate is calculated to align the bottom of the object with the bottom of the canvas.
     *
     * @param {string} imagePath - The path to the image for the background object.
     * @param {number} x - The initial x-coordinate for the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}

/**
 * DrawableObject is a class for objects that can be drawn onto a canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 200;
    height = 150;
    width = 100;

    /**
     * Loads an image from a given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object onto the canvas using the provided 2D rendering context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas on which to draw.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from the paths specified in an array.
     * The images are stored in the imageCache property of the object for future use.
     * @param {string[]} arr - The array of paths to the image files.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Determines the image index for collectable objects based on their collected status.
     * @returns {number} The index of the image to be used.
     */
    resolveImageIndexCollectableObjects() {
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

    /**
     * Determines the image index for health objects based on their health percentage.
     * @returns {number} The index of the image to be used.
     */
    resolveImageIndexHealth() {
        if (this.percent == 100) {
            return 5;
        } else if (this.percent > 80) {
            return 4;
        } else if (this.percent > 60) {
            return 3;
        } else if (this.percent > 40) {
            return 2;
        } else if (this.percent > 20) {
            return 1;
        } else if (this.percent >= 0) {
            return 0;
        }
    }
}

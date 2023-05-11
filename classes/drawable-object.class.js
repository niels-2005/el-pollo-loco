class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 200;
    height = 150;
    width = 100;

    // The loadImage function creates a new Image object and assigns the specified path to its src property.
    //  This is used to load an image file for the object.
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // The draw function uses the provided 2D rendering context (ctx) to draw the image of the object on the canvas.
    // It uses the drawImage method of the rendering context and specifies the image (this.img) to be drawn at the specified position (this.x, this.y)
    // with the specified width and height (this.width, this.height).
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // The loadImages function loads multiple images specified in an array (arr).
    // It iterates over each path in the array and creates a new Image object.
    // The source of the image is set to the specified path.
    // The loaded image is then stored in the imageCache property of the object, using the path as the key.
    // This allows the object to access the loaded images later on without having to reload them.
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}

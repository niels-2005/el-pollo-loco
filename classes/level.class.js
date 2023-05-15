/**
 * The Level class encapsulates all the elements that make up a level in the game.
 * Each instance of the Level class  contains all the game objects that exist in that level.
 */
class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectableObjectCoin;
    collectableObjectBottle;
    level_end_x = 3200;

    /**
     * @constructor
     * @param {Array} enemies - The array of enemy objects in the level.
     * @param {Array} endboss - The array of the endboss object in the level.
     * @param {Array} clouds - The array of cloud objects in the level.
     * @param {Array} backgroundObjects - The array of background objects in the level.
     * @param {Array} collectableObjectCoin - The collectable coin object in the level.
     * @param {Array} collectableObjectBottle - The collectable bottle object in the level.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, collectableObjectCoin, collectableObjectBottle) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjectCoin = collectableObjectCoin;
        this.collectableObjectBottle = collectableObjectBottle;
    }
}

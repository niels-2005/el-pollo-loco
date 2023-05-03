class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectableObjectCoin;
    collectableObjectBottle;
    level_end_x = 3500;

    constructor(enemies, endboss, clouds, backgroundObjects, collectableObjectCoin, collectableObjectBottle) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjectCoin = collectableObjectCoin;
        this.collectableObjectBottle = collectableObjectBottle;
    }
}

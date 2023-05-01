class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjectCoin;
    collectableObjectBottle;
    level_end_x = 2500;

    constructor(enemies, clouds, backgroundObjects, collectableObjectCoin, collectableObjectBottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjectCoin = collectableObjectCoin;
        this.collectableObjectBottle = collectableObjectBottle;
    }
}

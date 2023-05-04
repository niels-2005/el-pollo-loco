class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false; // variable um Bilder zu spiegeln
    speedY = 0; // geschwindigkeit bewegung y-achse (springen)
    acceleration = 2.5; // beschleunigung des objects
    energy = 100; // leben
    lastHit = 0; // für die hurt animation

    // Gravitation (für jump)
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject && this.y < 300) {
            return true;
        } else {
            return this.y < 100;
        }
    }

    // (images) = WALKING_IMAGES
    playAnimation(images) {
        let i = this.currentImage % images.length; // % (mathematischer Rest) => 0, 1, 2, 3, 4, 5! , nach 5 wird es wieder auf 0 gesetzt!
        let path = images[i]; // wenn IMAGES_WALKING = 5, durch die variable i wird es wieder auf 0 gesetzt!
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        // Geschwindkeit nach rechts
        this.x += this.speed;
        this.otherDirection = false;
    }

    // Objecte nach links zeichnen (speed ist in den einzelnen Classes definiert)
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(mo) {
        return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
    }

    // funktion um objekten "Leben" abzuziehen
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // speichert Zeit in Zahlenform, um zu speichern wann ein object verletzt wurde
        }
    }

    // wenn Character vom Endboss getroffen wird, zieht es nicht 5 sondern 19 Leben ab
    hittedByEndboss() {
        this.energy -= 19;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // speichert Zeit in Zahlenform, um zu speichern wann ein object verletzt wurde
        }
    }

    // endboss wenn er mit einer bottle getroffen wird
    hittedByBottle() {
        this.energy -= 19;
        if (this.energy < 10) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // speichert Zeit in Zahlenform, um zu speichern wann ein object verletzt wurde
        }
    }

    // wenn ein Objekt getroffen wird speichert man die genaue Zeit
    // timepassed = neue Zeit - (gespeicherte) alte Zeit
    // um zu definieren wie viel Zeit vergangen ist
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // ms in s
        return timepassed < 1; // 1 = wielange das object verletzt ist
    }

    // funktion die Objekte "tod" erklärt, wenn Objekt Energy = 0
    isDead() {
        return this.energy == 0;
    }

    // funktion für die animationen der small & normal chicken
    chickenAnimations() {
        this.movingLeft();
        this.checkingDeath();
    }

    // lässt die Chicken nach links laufen
    movingLeft() {
        this.walkingLeft = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    // checkt ob ein Chicken Tod ist, wenn nicht läuft es normal weiter
    checkingDeath() {
        this.Death = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.deadChicken();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    // beendet die laufenden Intervalle wenn Chicken Tod
    deadChicken() {
        setTimeout(() => {
            clearInterval(this.walkingLeft);
            clearInterval(this.Death);
        }, 100);
    }
}

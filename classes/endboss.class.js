class Endboss extends MovableObject {
    IMAGES_ATTENTION = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    height = 400;
    width = 300;
    y = 50;
    offset = {
        top: 50,
        bottom: 20,
        left: 30,
        right: 30,
    };

    // The constructor function initializes the Endboss object.
    //  It calls the loadImage function to load the first image in the IMAGES_ATTENTION array as the initial image.
    //  Then, it calls the loadImages function to load all the images specified in the IMAGES_ATTENTION, IMAGES_WALKING, IMAGES_ATTACK, IMAGES_HURT, and IMAGES_DEAD arrays.
    // The x position is set to 3200 and the speed is set to 15.
    // Finally, it calls the endbossAnimations function to set up the animations for the Endboss object.
    constructor() {
        super().loadImage(this.IMAGES_ATTENTION[0]);
        this.loadImages(this.IMAGES_ATTENTION);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3200;
        this.speed = 15;
        this.endbossAnimations();
    }

    // The endbossAnimations function sets up the animations for the Endboss object.
    // It uses a stoppable interval to repeatedly check the current state of the Endboss and play the corresponding animation.
    //  If the Endboss is in the "arriving" state, the endbossAttentionAnimation is played.
    //  If the Character is near the Endboss, the endbossAttackingAnimation is played.
    //  If the Endboss is hurt, the endbossIsHurtAnimation is played.
    // If the Endboss is dead, the deathAnimation is played.
    //  If the Endboss can walk, the walkingAnimation is played.
    // The interval is set to 130 milliseconds.
    endbossAnimations() {
        setStoppableInterval(() => {
            if (this.arrivingEndboss()) {
                this.endbossAttentionAnimation();
            } else if (this.CharacterIsNearEndboss()) {
                this.endbossAttackingAnimation();
            } else if (this.endbossIsHurt()) {
                this.endbossIsHurtAnimation();
            } else if (this.isDead()) {
                this.deathAnimation();
            } else if (this.endbossCanWalk()) {
                this.walkingAnimation();
            }
        }, 130);
    }

    // The arrivingEndboss function checks if the Endboss is currently in the "arriving" state.
    // It returns true if the distance between the Endboss's x-coordinate and the Character's x-coordinate is less than or equal to 800
    //  and the arrivedEndboss variable is false.
    //  This condition ensures that the Endboss is within a certain proximity to the Character and that it hasn't already arrived.
    arrivingEndboss() {
        return this.x - world.character.x <= 800 && !arrivedEndboss;
    }

    // The endbossAttentionAnimation function plays the animation for the Endboss's attention state.
    // It calls the playAnimation method with the IMAGES_ATTENTION array to display the corresponding frames.
    // It also plays the endbossAttentionSound to provide audio feedback.
    // Finally, it calls the letEndbossWalk method to transition the Endboss into the walking state.
    endbossAttentionAnimation() {
        this.playAnimation(this.IMAGES_ATTENTION);
        endbossAttentionSound.play();
        this.letEndbossWalk();
    }

    // The letEndbossWalk function sets a timeout of 1500 milliseconds.
    //  After the timeout, it sets the global variable arrivedEndboss to true, indicating that the Endboss has arrived and can start walking.
    letEndbossWalk() {
        setTimeout(() => {
            arrivedEndboss = true;
        }, 1500);
    }

    // The CharacterIsNearEndboss function checks if the distance between the Endboss and the Character is less than 30.
    // It returns true if the Character is near the Endboss, indicating that an attack animation should be triggered.
    CharacterIsNearEndboss() {
        return this.x - world.character.x < 30;
    }

    // The endbossAttackingAnimation function plays the attack animation of the Endboss by calling the playAnimation method with the IMAGES_ATTACK images.
    //  It also plays the endbossAttackSound to provide audio feedback for the attack.
    endbossAttackingAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        endbossAttackSound.play();
    }

    // The endbossIsHurtAnimation function plays the hurt animation of the Endboss by calling the playAnimation method with the IMAGES_HURT images.
    // It also plays the endbossHurtSound to provide audio feedback for the hurt state.
    endbossIsHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        endbossHurtSound.play();
    }

    // The deathAnimation function triggers the necessary actions when the Endboss is defeated.
    // It calls the endbossDeadAndSound function to play the dead animation and sound effect.
    // It then stops all game sounds by calling setGameSoundsToNull.
    // The endbossMovesDownFromField function moves the Endboss down from the field to clear the screen.
    // The gameWon function is called to handle the game win condition.
    // Finally, the stopsGame function is called to stop the game after a short delay.
    deathAnimation() {
        this.endbossDeadAndSound();
        setGameSoundsToNull();
        this.endbossMovesDownFromField();
        gameWon();
        this.stopsGame();
    }

    // The stopsGame function is responsible for stopping the game after a certain delay.
    // It uses a setTimeout function to delay the execution of the stopGame function.
    // After the delay of 1500 milliseconds, the stopGame function is called to stop the game.
    //  Additionally, the variable arrivedEndboss is set to false to reset its value.
    stopsGame() {
        setTimeout(() => {
            stopGame();
            arrivedEndboss = false;
        }, 1500);
    }

    // The endbossDeadAndSound function is responsible for playing the endboss dead animation and triggering the game win sound effect.
    //It first plays the animation using the IMAGES_DEAD image sequence.
    // Then, after a delay of 200 milliseconds, it plays the game win sound.
    endbossDeadAndSound() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            gameWinSound.play();
        }, 200);
    }

    // The endbossMovesDownFromField function is responsible for moving the endboss down from the field after its death animation.
    // It does this by gradually increasing the endboss's y-coordinate using a setStoppableInterval.
    // The y-coordinate is incremented by 20 every 50 milliseconds, giving the effect of the endboss descending.
    //  This animation starts after a delay of 500 milliseconds using the setTimeout function.
    endbossMovesDownFromField() {
        setTimeout(() => {
            setStoppableInterval(() => {
                this.y += 20;
            }, 50);
        }, 500);
    }

    // The endbossCanWalk function checks if the endboss has arrived (i.e., the "arrivedEndboss" flag is set to true) and returns a boolean value accordingly.
    // It is used to determine whether the endboss should perform its walking animation.
    endbossCanWalk() {
        return arrivedEndboss === true;
    }

    // The walkingAnimation function plays the walking animation of the endboss by calling the playAnimation method and passing the IMAGES_WALKING array.
    // It also plays the endboss music, moves the endboss to the left using the moveLeft method, and sets the otherDirection variable to false.
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.playEndbossMusic();
        this.moveLeft();
        this.otherDirection = false;
    }

    // The playEndbossMusic function configures the gameEndbossMusic to loop continuously, plays the endboss music, and pauses the gameBackgroundMusic.
    playEndbossMusic() {
        gameEndbossMusic.loop = true;
        gameEndbossMusic.play();
        gameBackgroundMusic.pause();
    }
}

/*------------------- 
 a player entity
 -------------------------------- */
game.playerEntity = me.ObjectEntity.extend({
    /* -----
     
     constructor
     
     ------ */
    "health": 50,
    "init": function(x, y, settings) {
        settings.image = "Human_SpriteBig";  //vor Constructorcall
        settings.spritewidth = 64;
        settings.spriteheight = 64;
        // call the constructor
        this.parent(x, y, settings);

        // adjust the bounding box
        this.updateColRect(16, 32, 10, 48);

        // Physics
        this.setVelocity(3.0, 3.0);
        this.setMaxVelocity(5, 10);
        this.gravity = 0;
        this.setFriction(0.25, 0);

        //AnimationSpeed
        this.animationspeed = me.sys.fps / 20;

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // set animations
        //this.direction = 'right';
        this.renderable.addAnimation("up", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.renderable.addAnimation("left", [15, 16, 17, 18, 19, 20, 21, 22, 23]);
        this.renderable.addAnimation("down", [30, 31, 32, 33, 34, 35, 36, 37, 38]);
        this.renderable.addAnimation("right", [45, 46, 47, 48, 49, 50, 51, 52, 53]);

        this.renderable.addAnimation("upSword", [9, 10, 11, 12, 13, 14]);
        this.renderable.addAnimation("leftSword", [24, 25, 26, 27, 28, 29]);
        this.renderable.addAnimation("downSword", [39, 40, 41, 42, 43, 44]);
        this.renderable.addAnimation("rightSword", [54, 55, 56, 57, 58, 59]);

        // Variablen
        //Keys
        this.actionPressed = false;
        this.xPressed = false;
        this.cPressed = false;

        //Hud Werte
        //this.health = 50;
        this.score = 0;

        //ausrichtung
        this.upFacing = true;
        this.downFacing = false;
        this.rightFacing = false;
        this.leftFacing = false;
    },
    /* -----
     
     update the player pos
     
     ------ */
    "update": function() {
        //KeyEingaben
        this.checkInput();
        // check & update player movement
        this.updateMovement();
        //Collision Handling
        this.checkCollision();

        //HUD
        me.game.HUD.setItemValue("health", this.health);
        me.game.HUD.setItemValue("score", this.score);


        // update animation if necessary
        if (this.vel.x > 0) {
            // update object animation
            this.parent();
            this.renderable.setCurrentAnimation("right");
            this.upFacing = false;
            this.downFacing = false;
            this.rightFacing = true;
            this.leftFacing = false;
            return true;
        } else if (this.vel.x < 0) {
            this.renderable.setCurrentAnimation("left");
            this.upFacing = false;
            this.downFacing = false;
            this.rightFacing = false;
            this.leftFacing = true;
            return true;
        } else if (this.vel.y > 0) {
            this.renderable.setCurrentAnimation("down");
            this.upFacing = false;
            this.downFacing = true;
            this.rightFacing = false;
            this.leftFacing = false;
            return true;
        } else if (this.vel.y < 0) {
            this.renderable.setCurrentAnimation("up");
            this.upFacing = true;
            this.downFacing = false;
            this.rightFacing = false;
            this.leftFacing = false;
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
    /* -----
     
     KeyInput
     
     ------ */
    "checkInput": function checkInput() {
        //Bewegung
        if (me.input.isKeyPressed('left')) {
            this.parent();
            this.renderable.setCurrentAnimation("left");
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.parent();
            this.renderable.setCurrentAnimation("right");
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            this.parent();
            this.renderable.setCurrentAnimation("up");
            // update the entity velocity
            this.vel.y = -this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.parent();
            this.renderable.setCurrentAnimation("down");
            // update the entity velocity
            this.vel.y = this.accel.y * me.timer.tick;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
            this.actionPressed = false;
            this.xPressed = false;
            this.cPressed = false;
        }

        //weitere Eingaben
        if (me.input.isKeyPressed('action')) {
            this.actionPressed = true;
        } else if (me.input.isKeyPressed('X')) {
            this.xPressed = true;
            this.swordAttack();
        } else if (me.input.isKeyPressed('C')) {
            this.cPressed = true;
        }

        //Update Bounding Box bei xClick
        if (this.xPressed) {// adjust the bounding box
            this.updateColRect(0, 64, 0, 64);
        } else {// adjust the bounding box
            this.updateColRect(16, 32, 10, 48);
        }


    },
    /* -----
     
     Attack
     
     ------ */
    "swordAttack": function swordAttack() {
        //Angriff
        if (this.rightFacing === true) {
            this.renderable.setCurrentAnimation("rightSword");
            for (var i = this.renderable.getCurrentAnimationFrame(); i < 6; i++) {
                this.parent();
            }
        } else if (this.leftFacing === true) {
            this.renderable.setCurrentAnimation("leftSword");
            for (var i = this.renderable.getCurrentAnimationFrame(); i < 6; i++) {
                this.parent();
            }
        } else if (this.upFacing === true) {
            this.renderable.setCurrentAnimation("upSword");
            for (var i = this.renderable.getCurrentAnimationFrame(); i < 6; i++) {
                this.parent();
            }
        } else if (this.downFacing === true) {
            this.renderable.setCurrentAnimation("downSword");
            for (var i = this.renderable.getCurrentAnimationFrame(); i < 6; i++) {
                this.parent();
            }
        }

    },
    /* -----
     
     Collision Handling
     
     ------ */
    "checkCollision": function checkCollision() {
        // check for collision
        var res = me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type === me.game.ENEMY_OBJECT) {
                if (this.xPressed) {
                    console.warn("attacked");
                    me.game.remove(res.obj);
                } else {
                    this.renderable.flicker(30);
                    this.health -= 10;
                    //game.HUD.HealthObject.update(-10);
                    me.game.remove(res.obj);
                }
            }
        }
    },
    /* -----
     
     Player Hitted
     
     ------ */
    "hit": function hit(power) {
        this.health -= power;
    }


});
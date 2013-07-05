game.npcCharacter = {
    /* -----
     
     Princess
     
     ------ */
    "Princess": game.npcEntity.extend({
        "init": function init(x, y, settings) {
            //Settings
            settings.image = "Princess";
            settings.spritewidth = 64;
            settings.spriteheight = 64;
            this.parent(x, y, settings);

            //Animations
            this.renderable.setCurrentAnimation("down");
            this.renderable.animationpause = true;
        },
        "onCollision": function(res, obj) {
            if (obj.actionPressed === true) {
                console.warn("Hi I'm Princess! Who are you?");
            }
        },
    }),
    /* -----
     
     Dummy
     
     ------ */
    "Dummy": game.npcEntity.extend({
        "init": function init(x, y, settings) {
            //Settings
            settings.image = "Dummy";
            settings.spritewidth = 64;
            settings.spriteheight = 64;
            this.parent(x, y, settings);

            //Animations
            this.renderable.addAnimation("dummy", [0, 1, 2, 3, 4, 5, 6, 7]);
            this.renderable.setCurrentAnimation("dummy");
            this.renderable.animationpause = true;
        },
        "onCollision": function(res, obj) {
            if (obj.xPressed === true) {
                this.renderable.flicker(45);
                for (var i = this.renderable.getCurrentAnimationFrame(); i < 8; i++) {
                    this.renderable.animationpause = false;
                }
            } else {
                this.renderable.animationpause = true;
            }
        },
    }),
    /* -----
     
     Eyeball Enemy Entity
     
     ------ */
    "Eyeball": game.npcEntity.extend({
        "init": function init(x, y, settings) {
            //Settings
            settings.image = "eyeball";
            settings.spritewidth = 32;
            settings.spriteheight = 38;
            this.parent(x, y, settings);

            //Enemy Object
            this.type = me.game.ENEMY_OBJECT;

            //Animations
            this.renderable.setCurrentAnimation("enemyDown");
            this.renderable.animationpause = false;
            
            
            this.startX = x;
            this.endX = x + settings.width - settings.spritewidth;
            // size of sprite

            // make him start from the right
            this.pos.x = x + settings.width - settings.spritewidth;
            this.walkLeft = true;
        },
        "onCollision": function(res, obj) {
        },
        "update": function() {
            this.updateVel();
            this.updateMovement();
        },
        "updateVel": function() {
            if (this.aimingLeft && this.pos.x <= this.startX) {
                this.aimingLeft = false;
            } else if (!this.aimingLeft && this.pos.x >= this.endX) {
                this.aimingLeft = true;
            }
            // make it walk
            this.flipX(this.aimingLeft);
            this.isMoving = true;
            this.vel.x += (this.aimingLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        },
    }),
    /* -----
     
     Ghost Enemy Entity
     
     ------ */
    "Ghost": game.npcEntity.extend({
        "init": function init(x, y, settings) {
            //Settings
            settings.image = "ghost";
            settings.spritewidth = 40;
            settings.spriteheight = 46;
            this.parent(x, y, settings);

            //Enemy Object
            this.type = me.game.ENEMY_OBJECT;

            //Animations
            this.renderable.setCurrentAnimation("enemyDown");
            this.renderable.animationpause = false;
            
            
            //Movement
            this.startX = x;
            this.endX = x + settings.width - settings.spritewidth;
            // size of sprite

            // make him start from the right
            this.pos.x = x + settings.width - settings.spritewidth;
            this.walkLeft = true;
        },
        "onCollision": function(res, obj) {
        },
        "update": function() {
            // do nothing if not in viewport
            if (!this.inViewport)
                return false;

            if (this.alive) {
                //this.moving = true;
                if (this.walkLeft && this.pos.x <= this.startX) {
                 this.walkLeft = false;
                 } else if (!this.walkLeft && this.pos.x >= this.endX) {
                 this.walkLeft = true;
                 }
                // make it walk
                this.flipX(this.walkLeft);
                this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

            } else {
                this.vel.x = 0;
            }

            // check and update movement
            this.updateMovement();

            // update animation if necessary
            if (this.vel.x != 0 || this.vel.y != 0) {
                // update object animation
                this.parent();
                return true;
            }
            return false;
        }
    }),
};
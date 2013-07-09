game.npcEntity = me.ObjectEntity.extend({
    "init": function init(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // Physics
        this.setVelocity(3.0, 3.0);
        this.setMaxVelocity(5, 10);
        this.setFriction(0.25, 0);
        this.gravity = 0;        
        
        //Variablen
        this.collidable = true;
        this.alive = true;
        this.jumping = false;
        
        this.moving = false;        
        this.aimingUp = false;
        this.aimingLeft = true;
        this.aimingDown = false;


        // set animations
        this.renderable.addAnimation("up", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.renderable.addAnimation("left", [9, 10, 11, 12, 13, 14, 15, 16, 17]);
        this.renderable.addAnimation("down", [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.renderable.addAnimation("right", [27, 28, 29, 30, 31, 32, 33, 34, 35]);
        
        this.renderable.addAnimation("enemyUp", [0, 1, 2]);
        this.renderable.addAnimation("enemyDown", [6, 7, 8]);
        this.renderable.addAnimation("enemyLeft", [3, 4, 5]);
        this.renderable.addAnimation("enemyRight", [9, 10, 11]);
        //Animation Options
        this.animationspeed = me.sys.fps / 20;
        
    },
});
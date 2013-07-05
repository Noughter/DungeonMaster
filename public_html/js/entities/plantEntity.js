game.plantEntity = me.ObjectEntity.extend({
    "init": function init(x, y, settings) {
        settings.image = "plants";
        settings.spritewidth = 32;
        settings.spriteheight = 64;
        // call the constructor
        this.parent(x, y, settings);

        // adjust the bounding box
        this.updateColRect(0, 32, 32, 12);

        // Physics
        this.setVelocity(3.0, 3.0);
        this.setMaxVelocity(5, 10);
        //set gravity of player = 0
        this.gravity = 0;
        //Friction
        this.setFriction(0.25, 0);
        //Collidable
        this.collidable = true;

        //AnimationSpeed
        this.animationspeed = me.sys.fps / 20;
        // set animations
        this.renderable.addAnimation("tomato", [0,9,18,27,36,45]);
        this.renderable.addAnimation("potato", [1,10,19,28,37,46]);
        this.renderable.addAnimation("pepper", [2,11,20,29,38,47]);
        this.renderable.addAnimation("salt", [3,12,21,30,39,48]);
        this.renderable.addAnimation("apple", [4,13,22,31,40,49]);
        this.renderable.addAnimation("cuke", [5,14,23,32,41,50]);
        this.renderable.addAnimation("corn", [6,15,24,33,42,51]);
        this.renderable.addAnimation("reed", [45]);
        //this.renderable.addAnimation("right", [3,7,11,15]);
    },
});
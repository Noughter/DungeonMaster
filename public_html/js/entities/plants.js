game.plants = {
    /*George*/
    "applePlant": game.plantEntity.extend({
        "init": function init(x, y, settings) {
            //this.value = 1000;
            //settings.image = "plants";
            //settings.spritewidth = 16;
            //settings.spriteheight = 16;
            this.parent(x,y,settings);
            
            this.renderable.setCurrentAnimation("tomato");
            this.renderable.animationpause = true;
        },
        "onCollision": function(res, obj) {
            //res for EntityObject - obj für PlayerEntity(ausführer)
            // res.y > 0 means touched by something on the bottom
            // which mean at top position for this one
            if (this.alive && obj.actionPressed === true) {
                this.renderable.animationpause = false;
            } else {
                this.renderable.animationpause = true;
            }
        },
    })
};
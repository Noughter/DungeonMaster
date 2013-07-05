game.basicItem = me.CollectableEntity.extend({
    /* -----
     
     constructor
     
     ------ */
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x,y,settings);
    },
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
});


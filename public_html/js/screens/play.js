game.PlayScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        // load a level
        me.levelDirector.loadLevel("startRoom");
        // add a default HUD to the game mngr (with no background)
        me.game.addHUD(0, 0, me.video.getWidth(), me.video.getHeight());
        // add the "score" HUD item
        //me.game.HUD.addItem("score", new HUD(5, 20));
        // add the "health" HUD item
        me.game.HUD.addItem("health", new HealthObject(50));
   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        ; // TODO
    }
});

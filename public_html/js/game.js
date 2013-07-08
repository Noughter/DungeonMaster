/*
 * Dungeon Master, a roguelike Dungeon RPG
 * Copyright (C) 2013  Marvin Ponten
 * Email: marvin.ponten@gmx.de
 * 
 * Tiles by http://lpc.opengameart.org/static/lpc-style-guide/index.html
 * & http://opengameart.org/users/daneeklu
 */


/* Game namespace */
var game = {
    // Whether a dialog box is waiting for input.
    "modal": false,
    // `true` when an object's y-coordinate changes to put it at the proper Z-order.
    "wantsResort": false,
    // Run on page load.    
    "onload": function() {
        // Initialize the video.
        if (!me.video.init("screen", c.WIDTH, c.HEIGHT)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        this.loadResources();

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    "loadResources": function loadResources() {
        // Set all resources to be loaded.
        var resources = [];

        /* Graphics. */
        //Sprites
        this.resources["sprite"].forEach(function forEach(value) {
            resources.push({
                "name": value,
                "type": "image",
                "src": "data/img/sprite/" + value + ".png"
            });
        });

        //Tilesets
        this.resources["tileset"].forEach(function forEach(value) {
            resources.push({
                "name": value,
                "type": "image",
                "src": "data/img/tileset/" + value + ".png"
            });
        });

        //Gui
        this.resources["gui"].forEach(function forEach(value) {
            resources.push({
                "name": value,
                "type": "image",
                "src": "data/img/gui/" + value + ".png"
            });
        });

        //Other
        this.resources["other"].forEach(function forEach(value) {
            resources.push({
                "name": value,
                "type": "image",
                "src": "data/img/other/" + value + ".png"
            });
        });

        // Maps.
        this.resources["map"].forEach(function forEach(value) {
            resources.push({
                "name": value,
                "type": "tmx",
                "src": "data/map/" + value + ".tmx"
            });
        });

        // Sound effects.
        this.resources["sfx"].forEach(function forEach(value) {
            resources.push({
                "name": value,
                "type": "audio",
                "src": "data/sfx/",
                "channel": 1
            });
        });

        // Music.
        this.resources["bgm"].forEach(function forEach(value) {
            resources.push({
                "name": value,
                "type": "audio",
                "src": "data/bgm/",
                "channel": 2
            });
        });

        // Load the resources.
        me.loader.preload(resources);
    },
    // Run on game resources loaded.
    "loaded": function() {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        //Player Entity
        me.entityPool.add("mainPlayer", game.playerEntity);
        //NPC Entities
        //First Room
        me.entityPool.add("Princess", game.npcCharacter.Princess);
        me.entityPool.add("Dummy", game.npcCharacter.Dummy);
        
        //Forest Layout
        //Rnd Enemy onLevelLoaded
        //me.entityPool.add("EnemyEntity", this.changeEnemy()); ----> unnötig
        me.game.onLevelLoaded = (function() {
            me.entityPool.add("EnemyEntity", this.changeEnemy());
        }).bind(this);

        //me.entityPool.add("Ghost", game.npcCharacter.Dummy);
        //var ghost = me.entityPool.newInstanceOf("Ghost", x, y, settings);
        //me.game.add(ghost);

        // add a default HUD to the game mngr (with no background)
        me.game.addHUD(0, 0, 800, 600);
        // add the "score" HUD item
        me.game.HUD.addItem("score", new HUD(5, 20));
        // add the "health" HUD item
        me.game.HUD.addItem("health", new HealthObject(5, 60));

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.SPACE, "action");
        me.input.bindKey(me.input.KEY.X, "X");
        me.input.bindKey(me.input.KEY.C, "C");

        // Start the game.
        me.state.change(me.state.PLAY);
    },
    //Rnd Enemys call onLevelLoaded       
    "changeEnemy": function changeEnemy() {
        var enemyArray = [
            game.npcCharacter.Eyeball,
            game.npcCharacter.Ghost
        ];
        console.warn(this.actualEnemy);
        return enemyArray[Math.floor(Math.random() * enemyArray.length)];        
    }
};

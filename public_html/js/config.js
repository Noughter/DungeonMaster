/* Constants */
var c = {
    "DEBUG"                 : false,

    /*
     * To convert between numeric and named directions:
     * name2dir : c[name.toUpperCase()]
     * dir2name : c.DIR_NAMES[dir]
     */

    // Directions a sprite can face
    "RESET_DIR"             : -1,
    "LEFT"                  : 0,
    "UP"                    : 1,
    "RIGHT"                 : 2,
    "DOWN"                  : 3,

    // Available directions, in a *VERY* specific order.
    "DIR_NAMES"             : [ "left", "up", "right", "down" ],

    // Screen resolution
    "WIDTH"                 : 960,
    "HEIGHT"                : 640,

    // States
    "STATE_INFO"            : me.state.USER + 0,
    "STATE_INTRO"           : me.state.USER + 1,

    // Keys
    "KEY_APOS"              : 222, // Apostrophe (aka single-quote)
};

// Helper to enable debug by setting a special hash in the URL.
if (document.location.hash === "#debug") {
    c.DEBUG = true;
}

window.addEventListener("hashchange", function onHashChange(e) {
    var debug = (document.location.hash === "#debug");
    me.sys.pauseOnBlur = !debug;
    cm.setDebug(debug);
    c.__defineGetter__("DEBUG", function () {
        return debug;
    });
});

// Turn the `c` object into a hash of constants.
try {
    Object.keys(c).forEach(function eachKey(key) {
        if (typeof(c[key]) === "function") {
            return;
        }

        c.__defineGetter__(
            key,
            (function getterFactory(value) {
                return function returnValue() {
                    return value
                };
            })(c[key])
        );
    });
}
catch (e) {
    // No getters? FAKE CONSTANTS!
}


// Game engine settings.
me.sys.gravity = 0;
//me.sys.dirtyRegion = true; // Be fast!
//me.sys.useNativeAnimFrame = true; // Be faster!
//cm.setSync(false); // Be fastest!
//me.debug.renderHitBox = true;
//me.debug.renderCollisionMap = true;
me.sys.stopOnAudioError = false;

if (c.DEBUG) {
    me.sys.pauseOnBlur = false;
    cm.setDebug(true);
};

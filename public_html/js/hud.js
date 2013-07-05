var HUD = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("32x32_font", 32);
        context = this.context;
    },
    draw: function(context, x, y) {
        this.font.draw(context, "SCORE: " + this.value, this.pos.x + x, this.pos.y + y);
    }
});

var HealthObject = me.HUD_Item.extend({
    "init": function(x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("32x32_font", 32);
    },
    "draw": function(context, x, y) {
        this.font.draw(context, "HP: " + this.value, this.pos.x + x, this.pos.y + y);
    },
    "request_update": function request_update() {
        return this.updated || items.containers.updated;
    },
});

var InventarObject = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.Font("Arial", 22, "#fff", "left");

        //var ctx = me.video.createCanvasSurface(500, 700);
        //this.label = ctx.canvas;
        //this.label.width = this.font.measureText(ctx, name + ":").width;
        //this.label.width = 100;
        //this.label.height = 20;
    },
    draw: function(context, x, y) {
        //Inventar Platz 1
        context.beginPath();
        context.rect(200, 540, 50, 50);
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();

        var inventarObj1 = new Image();
        inventarObj1.src = " http://media-mcw.cursecdn.com/a/ab/Ironsword.png";
        context.drawImage(inventarObj1, 205, 545, 40, 40);


        //Inventar Platz 2
        context.beginPath();
        context.rect(270, 540, 50, 50);
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();

        var inventarObj2 = new Image();
        inventarObj2.src = "http://images3.wikia.nocookie.net/__cb20110822135958/mcmmo/images/f/ff/IronHoe.png";
        context.drawImage(inventarObj2, 270, 540, 50, 50);


        //Inventar Platz 3
        context.beginPath();
        context.rect(340, 540, 50, 50);
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();

        var inventarObj3 = new Image();
        inventarObj3.src = "http://images.wikia.com/mcmmo/images/5/5f/IronShovel.png";
        context.drawImage(inventarObj3, 340, 540, 50, 50);

        //Inventar Platz 4
        context.beginPath();
        context.rect(410, 540, 50, 50);
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();

        var inventarObj4 = new Image();
        inventarObj4.src = "http://4.bp.blogspot.com/-MkUqGXVFq4U/TxenTUnLd5I/AAAAAAAAAL0/Vz5vaFhQeUI/s1600/stone%2Bpick%2Baxe.png";
        context.drawImage(inventarObj4, 415, 545, 40, 40);

        //Inventar Platz 5
        context.beginPath();
        context.rect(480, 540, 50, 50);
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();

        var inventarObj4 = new Image();
        inventarObj4.src = "http://media-mcw.cursecdn.com/8/81/Waterbucket.PNG";
        context.drawImage(inventarObj4, 485, 545, 40, 40);

        //Inventar Platz 6
        context.beginPath();
        context.rect(550, 540, 50, 50);
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();

        var inventarObj4 = new Image();
        inventarObj4.src = "http://images.gamebase.com.tw/2009/zone/facebook/ps_icon/farm-seed-bag.png";
        context.drawImage(inventarObj4, 550, 540, 50, 50);
    }
});


var Inventar1Choosen = me.HUD_Item.extend({
    // Bereich löschen mit context.clearRect(190, 530, 70, 70);
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.Font("Arial", 22, "#fff", "left");
    },
    draw: function(context, x, y) {
        context.beginPath();
        context.rect(200, 540, 50, 50);
        context.lineWidth = 12;
        context.strokeStyle = 'red';
        context.stroke();
        //context.clearRect(190, 530, 70, 70);
    }
});
var Inventar2Choosen = me.HUD_Item.extend({
    // Bereich löschen mit context.clearRect(190, 530, 70, 70);
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.Font("Arial", 22, "#fff", "left");
    },
    draw: function(context, x, y) {
        context.beginPath();
        context.rect(270, 540, 50, 50);
        context.lineWidth = 12;
        context.strokeStyle = 'red';
        context.stroke();
        context.clearRect(190, 530, 70, 70);
    }
});


var TestObject = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.Font("Arial", 22, "#fff", "left");
        this.font.bold();
        this.value = 0;
    },
    draw: function(context, x, y) {
        this.font.draw(context, "AMMO: " + this.value, this.pos.x + x, this.pos.y + y);
    }
});

var TimerObject = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("32x32_font", 32);
    },
    draw: function(context, x, y) {
        this.font.draw(context, "TIME: " + this.value, this.pos.x + x, this.pos.y + y)
    }
});
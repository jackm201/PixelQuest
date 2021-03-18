$("#textBox").hide();
$("#gold").hide();
$("#redStaffStats").hide();
$("body").css({
    margin: 0,
    overflowY: 'hidden',
    /* Hide vertical scrollbar */
    overflowX: 'hidden',
    /* Hide horizontal scrollbar */
    height: '100%',
    backgroundColor: 'rgb(0, 255, 255)'
})
alert("click to start!");
/* have you joined the game? */
var been = false;
/* when click to continue gets clicked */
var ok;
/* First weapon */
var Redstaff;
var Greenstaff;
var onmouseoverRedStaff;
var onmouseleaveRedStaff;
var onmouseoverGreenStaff;
var onmouseleaveGreenStaff;
var equipSword;

function game() {
    if (not(been)) {
        been = true;
        if (on_desktop()) {
            var mapOn = "start";
            var inPrompt = false;
            var beenInShop = false;
            var greenstaffBEEN = false;
            var redstaffBEEN = false;
            var width2 = window.innerWidth;
            var height2 = window.innerHeight;
            var TimesEquipedSWORD = 0;

            var quest = {
                one: {
                    images: {map: '<img id="questone" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/New Piskel (49).gif">'}
                }
            }
            var Player = function (x, y) {
                this.x = x;
                this.y = y;
                this.face = "left";
                this.player = {
                    position: {
                        x: this.x,
                        y: this.y
                    },
                    width: 50,
                    height: 50
                }
            }
            Player.prototype.draw = function () {
                var html = '<img id="img" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0.gif">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    zIndex: 209,
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
            }
            Player.prototype.KeyDown = function (e, house, width, height) {
                if (!inPrompt) {
                    switch (e.keyCode) {
                        case 87: /*w*/
                            this.y -= 10;
                            this.face = "up";
                            this.updateImage('<img id="img" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0-1.gif">')
                            if (this.checkCollision(house, width, height)) {
                                this.y += 10;
                            }
                            break;
                        case 83: /*s*/
                            this.y += 10;
                            this.face = "down";
                            this.updateImage('<img id="img" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0-3.gif">');
                            if (this.checkCollision(house, width, height)) {
                                this.y -= 10;
                            }
                            break;
                        case 68: /*d*/
                            this.x += 10;
                            this.face = "right";
                            this.updateImage('<img id="img" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0-2.gif">');
                            if (this.checkCollision(house, width, height)) {
                                this.x -= 10;
                            }
                            break;
                        case 65: /*a*/
                            this.x -= 10;
                            this.face = "left";
                            this.updateImage('<img id="img" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0.gif">');
                            if (this.checkCollision(house, width, height)) {
                                this.x += 10;
                            }
                            break;
                    }
                }
            }
            Player.prototype.Animate = function () {
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
            }
            Player.prototype.updateImage = function (to) {
                document.getElementById('img').remove();
                var html = to;
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
            }
            Player.prototype.checkCollision = function (house, width, height) {
                if (mapOn === "start") {
                    var ToTheRight = false;
                    var ToTheLeft = false;
                    var difference
                    if (this.x - house.x > 0) {
                        /*To the right*/
                        ToTheRight = true;
                        difference = this.x - house.x;
                    } else {
                        /*To the left*/
                        ToTheLeft = true;
                        difference = house.x - this.x;
                    }
                    var AABB = {
                        collide: function (player, el2, offset) {
                            var rect1 = player.getBoundingClientRect();
                            var rect2 = el2.getBoundingClientRect();

                            return !(
                                rect1.top > rect2.bottom - offset ||
                                rect1.right < rect2.left + offset ||
                                rect1.bottom < rect2.top + offset ||
                                rect1.left > rect2.right - offset
                            );
                        }
                    };
                    if (AABB.collide(document.getElementById("img"), document.getElementById("Sign"), 20)) {
                        return true;
                    }
                    var diffY = Math.abs(this.y - house.y);
                    if (ToTheRight) {
                        if (difference <= 200 && difference > 160 && diffY < height - 100) {
                            /*Your At The Door*/
                            dude.draw();
                            inPrompt = true;
                            show_Prompt();
                        }
                        if (difference < 300 && diffY < height - 100) {
                            return true;
                        } else {
                            if (this.x > screen.availWidth - 50) {
                                mapOn = "quest";
                                map.l.hide();
                                sign.drawing.hide();
                                house.drawing.hide();
                                map1.drawing.show();
                                $(".Zombies").show();
                                for (var i = 0; i < zombies.length; i++) {
                                    zombies[i].needToBeHidden = false;
                                }
                                player.x = 10;
                                return true;
                            }
                            if (this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                return true;
                            } else {
                                return false;
                            }
                            return false;
                        }
                    } else {
                        if (difference < 30 && diffY < height - 100) {
                            return true;
                        } else {
                            if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                return true;
                            } else {
                                return false;
                            }
                            return false;
                        }
                    }
                } else if (mapOn === "shop") {
                    if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80) {
                        return true;
                    } else if (this.y < 50) {
                        /* He left the shop */
                        /* delete map */
                        $("#shop").hide();
                        $(".door").hide();
                        $(".wall").hide();
                        $(".wall2").hide();
                        if (not(redstaff.Used)) {
                            $(".RedStaff").hide();
                        }
                        if (not(greenstaff.Used)) {
                            $(".GreenStaff").hide();
                        }
                        if (not(sword.Used)) {
                            $("#sword").hide();
                        }
                        map.l.show();
                        house.drawing.show();
                        $("#Sign").show();
                        mapOn = "start";
                        player.x = 1000;
                    }
                } else if (mapOn === "quest") {
                    if (this.x > screen.availWidth - 50 || this.y < 0 || this.y > screen.availHeight - 80) {
                        return true;
                    } else if (this.x < 0) {
                        /* He left the quests */
                        /* delete map */
                        player.x = window.innerWidth - 70;
                        $("#questone").hide();
                        $(".Zombies").hide();
                        for (var i = 0; i < zombies.length; i++) {
                            zombies[i].needToBeHidden = true;
                        }
                        map.l.show();
                        house.drawing.show();
                        $("#Sign").show();
                        mapOn = "start";
                        return;
                    }
                    var AABB = {
                        collide: function (player, el2, offset) {
                            var rect1 = player.getBoundingClientRect();
                            var rect2 = el2.getBoundingClientRect();

                            return !(
                                rect1.top > rect2.bottom - offset ||
                                rect1.right < rect2.left + offset ||
                                rect1.bottom < rect2.top + offset ||
                                rect1.left > rect2.right - offset
                            );
                        }
                    }
                    for (var i = 0; i < zombies.length; i++) {
                        if (AABB.collide(document.getElementById("img"), document.getElementById("Zombie" + i), 60)) {
                            return true;
                        }
                    }
                }
            }
            //
            var Zombie = function (x, y, i) {
                this.x = x;
                this.y = y;
                this.zombie = i;
                this.Timout = 200;
                this.TimoutDone = false;
                this.needToBeHidden = true;
                this.health = 10;
                this.alive = true;
                this.face = "down";
            }
            /* IMPROTANT: Zombies!!!!!!!!!! */
            Zombie.prototype.draw = function () {
                this.html = '<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + 'src="file:///Users/jackm/Desktop/3DSnake/bulid/models/Zombie.gif">';
                this.drawing = $(this.html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: 150,
                    height: 150
                })
                $("body").append(this.drawing);
            }
            Zombie.prototype.die = function () {
                document.getElementById('Zombie').remove();
                this.alive = false;
            }
            Zombie.prototype.NumberToFace = function (number) {
                if (number === 1) {
                    this.face = "up";
                } else if (number === 2) {
                    this.face = "down";
                } else if (number === 3) {
                    this.face = "left";
                } else if (number === 4) {
                    this.face = "right";
                }
                return this.face;
            }
            Zombie.prototype.checkCollision = function () {
                if (this.x > screen.availWidth - 50 || this.y < 0 || this.x < 0 || this.y > screen.availHeight - 80) {
                    return true;
                }
                var AABB = {
                    collide: function (player, el2, offset) {
                        var rect1 = player.getBoundingClientRect();
                        var rect2 = el2.getBoundingClientRect();

                        return !(
                            rect1.top > rect2.bottom - offset ||
                            rect1.right < rect2.left + offset ||
                            rect1.bottom < rect2.top + offset ||
                            rect1.left > rect2.right - offset
                        );
                    }
                }
                if (AABB.collide(document.getElementById("img"), document.getElementById("Zombie" + String(this.zombie)), 60)) {
                    return true;
                }
                for (var i = 0; i < zombies.length; i++) {
                    if (i !== this.zombie) {
                        if (AABB.collide(document.getElementById("img"), document.getElementById("Zombie" + i), 60)) {
                            return true;
                        }
                    }
                }
            }
            Zombie.prototype.move = function () {
                if (this.alive) {
                    /* Were to go */
                    this.face = this.NumberToFace(Math.floor(Math.random() * 5));
                    /* Move based off it */
                    if (this.face === "up") {
                        /* update image */
                        this.y -= 10;
                        if (this.checkCollision()) {
                            this.y += 10;
                        }
                        this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="file:///Users/jackm/Desktop/3DSnake/bulid/models/New Piskel-4.png">');
                    } else if (this.face === "down") {
                        /* update image */
                        this.y += 10;
                        if (this.checkCollision()) {
                            this.y -= 10;
                        }
                        this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="file:///Users/jackm/Desktop/3DSnake/bulid/models/Zombie.gif">');
                    } else if (this.face === "left") {
                        /* update image */
                        this.x -= 10;
                        if (this.checkCollision()) {
                            this.x += 10;
                        }

                        this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="file:///Users/jackm/Desktop/3DSnake/bulid/models/New Piskel-2.png">');
                    } else if (this.face === "right") {
                        /* update image */
                        this.x += 10;
                        if (this.checkCollision()) {
                            this.x -= 10;
                        }
                        this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="file:///Users/jackm/Desktop/3DSnake/bulid/models/New Piskel-3.png">');
                    }
                }
            }
            Zombie.prototype.updatePosition = function () {
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: 150,
                    height: 150
                })
            }
            Zombie.prototype.updateImage = function (to) {
                document.getElementById('Zombie' + String(this.zombie)).remove();
                this.html = to;
                this.drawing = $(this.html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: 150,
                    height: 150
                })
                $("body").append(this.drawing);
                if (this.needToBeHidden) {
                    this.drawing.hide();
                }
            }

            //
            var PromptShowing = true;

            function hide_Prompt() {
                $(".d").hide();
                PromptShowing = false;
            }

            function show_Prompt() {
                $(".d").show();
                PromptShowing = true;
            }

            function add_text(text) {
                text = String(text);
                $("#text").text(text)
            }

            // unnamed.gif
            var Map = function () {
                this.html = '<img id="map" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/unnamed.gif">';
                this.l = $(this.html);
                this.l.css({
                    position: "absolute",
                    width: window.innerWidth,
                    height: window.innerHeight
                })
                $("body").append(this.l);
            }

            var map = new Map();
            var House = function (x, y) {
                this.x = x;
                this.y = y;
            }
            House.prototype.draw = function () {
                var html = '<img id="house" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0-4.gif" width="400" height="400">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
            }
            document.onmousedown = function (e) {
                e.preventDefault();
            }
            var ShopDude = function (x, y) {
                this.x = x;
                this.y = y;
                this.beenDrawn = false;
            }
            ShopDude.prototype.draw = function () {
                if (this.beenDrawn) document.getElementById("dude").remove();
                var html = '<img id="dude" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0 copy 2.gif" width="200" height="200">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }
            ShopDude.prototype.remove = function () {
                document.getElementById("dude").remove();
            }
            var dude = new ShopDude(600, 250);
            var text_on = "Hello Adventurers!";
            add_text(text_on);
            hide_Prompt();
            var Shop = function () {
                this.x = 0;
                this.y = 0;
                this.beenDrawn = false;
            }
            Shop.prototype.draw = function () {
                var html = '<img id="shop" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/0.png">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    zIndex: 0,
                    left: this.x,
                    top: this.y,
                    width: window.innerWidth,
                    height: window.innerHeight
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }
            var Door = function (x, y) {
                this.x = x;
                this.y = y;
                this.beenDrawn = false;
            }
            Door.prototype.draw = function () {
                var html = '<img class="door" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/images.gif" width="400" height="500">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }
            var Wall = function (x, y) {
                this.x = x;
                this.y = y;
                this.beenDrawn = false;
            }
            Wall.prototype.draw = function () {
                var html = '<img class="wall" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/images copy.gif">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: window.innerWidth,
                    height: 1000
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }
            var WallTurned = function (x, y) {
                this.x = x;
                this.y = y;
                this.beenDrawn = false;
            }
            WallTurned.prototype.draw = function () {
                var html = '<img class="wall2" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/images copy 2.gif">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    height: window.innerHeight,
                    width: 1000
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }

            function RedStaff(x, y) {
                this.x = x;
                this.y = y;
                this.price = 5;
                this.Used = false;
            }

            RedStaff.prototype.draw = function () {
                /* IMPORTANT: WHEN I COME BACK SHOW PRICE IN HTML BY MOUSEOVER :IMPORTANT */
                var html = '<img class="RedStaff" onclick="Redstaff()"  onmouseover="onmouseoverRedStaff()" onmouseleave="onmouseleaveRedStaff()"  src="file:///Users/jackm/Desktop/3DSnake/bulid/models/New Piskel (43).gif" on>';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: 70,
                    height: 100
                })
                $("body").append(this.drawing);
            }
            RedStaff.prototype.update = function () {
                if (this.Used) {
                    if (player.face === "right") {
                        this.x = player.x + 50;
                    } else if (player.face === "left") {
                        this.x = player.x - 10;
                    } else if (player.face === "up") {
                        this.x = player.x + 50;
                    } else if (player.face === "down") {
                        this.x = player.x - 15;
                    }
                    this.y = player.y;
                    this.drawing.css({
                        position: "absolute",
                        left: this.x,
                        top: this.y,
                        width: 70,
                        height: 100
                    })
                }
            }

            function RedStaffBULLET(x, y) {
                this.x = x;
                this.y = y;
                this.justShot = false;
                this.movedShot = false;
                this.distaceShot = 0;
                this.beenDrawn = false;
                this.shotDirection = "left";
            }

            RedStaffBULLET.prototype.draw = function () {
                var html = '<img class="RedStaffB" id="RedStaffB" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/New Piskel (1).gif">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }
            RedStaffBULLET.prototype.update = function () {
                if (this.beenDrawn) {
                    this.drawing.css({
                        position: "absolute",
                        left: this.x,
                        top: this.y
                    })
                }
                if (redstaff.Used) {
                    if (this.justShot) {
                        if (not(this.movedShot)) {
                            this.distaceShot += 30;
                            $(".RedStaffB").show();
                            if (player.face === "left") {
                                this.x = (player.x - 10) - this.distaceShot;
                                this.y = player.y;
                                this.shotDirection = "left";
                            } else if (player.face === "right") {
                                this.x = (player.x + 50) + this.distaceShot;
                                this.y = player.y;
                                this.shotDirection = "right";
                            } else if (player.face === "up") {
                                this.x = player.x + 50;
                                this.y = player.y - this.distaceShot;
                                this.shotDirection = "up";
                            } else if (player.face === "down") {
                                this.x = player.x - 15;
                                this.y = player.y + this.distaceShot;
                                this.shotDirection = "down";
                            }
                            this.movedShot = true;
                        } else {
                            this.distaceShot += 30;
                            $(".RedStaffB").show();
                            if (this.shotDirection === "left") {
                                this.x -= this.distaceShot;
                            } else if (this.shotDirection === "right") {
                                this.x += this.distaceShot;
                            } else if (this.shotDirection === "up") {
                                this.y -= this.distaceShot;
                            } else if (this.shotDirection === "down") {
                                this.y += this.distaceShot;
                            }
                            this.movedShot = true;
                        }
                    } else {
                        $(".RedStaffB").hide();
                        this.x = player.x;
                        this.y = player.y;
                    }
                }
            }
            RedStaffBULLET.prototype.checkCollision = function (house, width, height) {
                if (mapOn === "start") {
                    var ToTheRight = false;
                    var ToTheLeft = false;
                    var difference
                    if (this.x - house.x > 0) {
                        /*To the right*/
                        ToTheRight = true;
                        difference = this.x - house.x;
                    } else {
                        /*To the left*/
                        ToTheLeft = true;
                        difference = house.x - this.x;
                    }
                    //
                    var AABB = {
                        collide: function (player, el2, offset) {
                            var rect1 = player.getBoundingClientRect();
                            var rect2 = el2.getBoundingClientRect();

                            return !(
                                rect1.top > rect2.bottom - offset ||
                                rect1.right < rect2.left + offset ||
                                rect1.bottom < rect2.top + offset ||
                                rect1.left > rect2.right - offset
                            );
                        }
                    };
                    if (AABB.collide(document.getElementById("RedStaffB"), document.getElementById("Sign"), 20)) {
                        return true;
                    }
                    //
                    var diffY = Math.abs(this.y - house.y);
                    if (ToTheRight) {
                        if (difference < 300 && diffY < height - 100) {
                            return true;
                        } else {
                            if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                return true;
                            } else {
                                return false;
                            }
                            return false;
                        }
                    } else {
                        if (difference < 30 && diffY < height - 100) {
                            return true;
                        } else {
                            if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                return true;
                            } else {
                                return false;
                            }
                            return false;
                        }
                    }
                } else if (mapOn === "shop") {
                    if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80) {
                        return true;
                    }
                } else if (mapOn === "quest") {
                    if (this.x > screen.availWidth - 50 || this.y < 0 || this.x < 0 || this.y > screen.availHeight - 80) {
                        return true;
                    }
                }
            }
            var GreenStaff = function (x, y) {
                this.x = x;
                this.y = y;
                this.price = 7;
                this.Used = false;
            }
            GreenStaff.prototype.draw = function () {
                /* IMPORTANT: WHEN I COME BACK SHOW PRICE IN HTML BY MOUSEOVER :IMPORTANT */
                var html = '<img class="GreenStaff" onclick="Greenstaff()" onmouseover="onmouseoverGreenStaff()"    onmouseleave="onmouseleaveGreenStaff()" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/unnamed.png">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: 70,
                    height: 100,
                    transform: 'rotate(-40deg)'
                })
                $("body").append(this.drawing);
            }
            GreenStaff.prototype.update = function () {
                if (this.Used) {
                    if (player.face === "right") {
                        this.x = player.x + 50;
                    } else if (player.face === "left") {
                        this.x = player.x - 10;
                    } else if (player.face === "up") {
                        this.x = player.x + 50;
                    } else if (player.face === "down") {
                        this.x = player.x - 15;
                    }
                    this.y = player.y;
                    this.drawing.css({
                        position: "absolute",
                        left: this.x,
                        top: this.y,
                        width: 70,
                        height: 100
                    })
                }
            }
            var GreenStaffB = function (x, y) {
                this.x = x;
                this.y = y;
                this.justShot = false;
                this.movedShot = false;
                this.distaceShot = 0;
                this.beenDrawn = false;
                this.shotDirection = "left";
            }
            GreenStaffB.prototype.draw = function () {
                var html = '<img id="GreenStaffB" class="GreenStaffB" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/unnamed-2.gif">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: 40,
                    height: 80
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }
            GreenStaffB.prototype.update = function () {
                if (this.beenDrawn) {
                    this.drawing.css({
                        position: "absolute",
                        left: this.x,
                        top: this.y,
                        width: 40,
                        height: 80
                    })
                }
                if (greenstaff.Used) {
                    if (this.justShot) {
                        if (this.shotDirection === "left") {
                            this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/unnamed-2.gif">')
                        } else if (this.shotDirection === "right") {
                            this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/unnamed-4.gif">')
                        } else if (this.shotDirection === "up") {
                            this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/unnamed-3.gif">')
                        } else if (this.shotDirection === "down") {
                            this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/unnamed-1.gif">')
                        }
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 40,
                            height: 80
                        })
                        if (not(this.movedShot)) {
                            this.distaceShot += 30;
                            $(".GreenStaffB").show();
                            if (player.face === "left") {
                                this.x = (player.x - 10) - this.distaceShot;
                                this.y = player.y;
                                this.shotDirection = "left";
                            } else if (player.face === "right") {
                                this.x = (player.x + 50) + this.distaceShot;
                                this.y = player.y;
                                this.shotDirection = "right";
                            } else if (player.face === "up") {
                                this.x = player.x + 50;
                                this.y = player.y - this.distaceShot;
                                this.shotDirection = "up";
                            } else if (player.face === "down") {
                                this.x = player.x - 15;
                                this.y = player.y + this.distaceShot;
                                this.shotDirection = "down";
                            }
                            this.movedShot = true;
                        } else {
                            this.distaceShot += 30;
                            $(".GreenStaffB").show();
                            if (this.shotDirection === "left") {
                                this.x -= this.distaceShot;
                            } else if (this.shotDirection === "right") {
                                this.x += this.distaceShot;
                            } else if (this.shotDirection === "up") {
                                this.y -= this.distaceShot;
                            } else if (this.shotDirection === "down") {
                                this.y += this.distaceShot;
                            }
                            this.movedShot = true;
                        }
                    } else {
                        $(".GreenStaffB").hide();
                        this.x = player.x;
                        this.y = player.y;
                    }
                }
            }
            GreenStaffB.prototype.checkCollision = function (house, width, height) {
                if (mapOn === "start") {
                    var ToTheRight = false;
                    var ToTheLeft = false;
                    var difference
                    if (this.x - house.x > 0) {
                        /*To the right*/
                        ToTheRight = true;
                        difference = this.x - house.x;
                    } else {
                        /*To the left*/
                        ToTheLeft = true;
                        difference = house.x - this.x;
                    }
                    //
                    var AABB = {
                        collide: function (player, el2, offset) {
                            var rect1 = player.getBoundingClientRect();
                            var rect2 = el2.getBoundingClientRect();

                            return !(
                                rect1.top > rect2.bottom - offset ||
                                rect1.right < rect2.left + offset ||
                                rect1.bottom < rect2.top + offset ||
                                rect1.left > rect2.right - offset
                            );
                        }
                    };
                    if (AABB.collide(document.getElementById("GreenStaffB"), document.getElementById("Sign"), 20)) {
                        return true;
                    }
                    //
                    var diffY = Math.abs(this.y - house.y);
                    if (ToTheRight) {
                        if (difference < 300 && diffY < height - 100) {
                            return true;
                        } else {
                            if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                return true;
                            } else {
                                return false;
                            }
                            return false;
                        }
                    } else {
                        if (difference < 30 && diffY < height - 100) {
                            return true;
                        } else {
                            if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                return true;
                            } else {
                                return false;
                            }
                            return false;
                        }
                    }
                } else if (mapOn === "shop") {
                    if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80) {
                        return true;
                    }
                } else if (mapOn === "quest") {
                    if (this.x > screen.availWidth - 50 || this.y < 0 || this.x < 0 || this.y > screen.availHeight - 80) {
                        return true;
                    }
                }
            }
            GreenStaffB.prototype.updateImage = function (to) {
                document.getElementById('GreenStaffB').remove();
                var html = to;
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
            }
            var greenstaff = new GreenStaff(300, 100);
            var greenstaffB = new GreenStaffB(300, 100);
            Greenstaff = function () {
                $(".gold").text(gold);
                if (greenstaffBEEN) {
                    equip(greenstaff);
                    return;
                }
                if (not(greenstaff.Used)) {
                    if (gold >= greenstaff.price) {
                        show_Prompt();
                        add_text("Success!");
                        text_on = "Success!";
                        gold -= greenstaff.price;
                        $(".gold").text(gold);
                        /* The Character needs to not move*/
                        inPrompt = true;
                        equip(greenstaff);
                        greenstaffBEEN = true;
                    } else {
                        show_Prompt();
                        add_text("You need: " + Math.abs(gold - greenstaff.price) + " more gold!")
                        text_on = "You need: " + Math.abs(gold - greenstaff.price) + " more gold!";
                        $(".gold").text(gold);
                        /* The Character needs to nor move*/
                        inPrompt = true;
                    }
                }
            }

            function Sign(x, y) {
                this.x = x;
                this.y = y;
            }

            Sign.prototype.draw = function () {
                var html = '<img id="Sign" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/Untitled document.png">';
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: 100,
                    height: 100
                })
                $("body").append(this.drawing);
            }

            function Sword(x, y) {
                this.x = x;
                this.y = y;
                this.beenDrawn = false;
                this.Used = false;
                this.justHit = false;
                this.face = "left";
            }

            equipSword = function () {
                if (not(sword.Used)) {
                    equip(sword);
                }
            }
            Sword.prototype.draw = function () {
                this.html = '<img id="sword"  onclick="equipSword();" src="file:///Users/jackm/Desktop/3DSnake/bulid/models/imgbin_pixel-art-graphics-sprite-pixelation-png.png">';
                this.width = this.html.width;
                this.height = this.html.height;
                this.drawing = $(this.html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y
                })
                $("body").append(this.drawing);
                this.beenDrawn = true;
            }
            Sword.prototype.update = function () {
                if (this.Used) {
                    if (player.face === "right") {
                        this.x = player.x + 50;
                        this.face = "right";
                    } else if (player.face === "left") {
                        this.x = player.x - 10;
                        this.face = "left";
                    } else if (player.face === "up") {
                        this.x = player.x + 50;
                        this.face = "up";
                    } else if (player.face === "down") {
                        this.x = player.x - 15;
                        this.face = "down";
                    }
                    this.y = player.y;
                    this.drawing.css({
                        position: "absolute",
                        left: this.x,
                        top: this.y,
                        width: 70,
                        height: 100
                    })
                }
            }
            //
            var questOneMap = function () {
                this.x = 0;
                this.y = 0;
            }
            questOneMap.prototype.draw = function () {
                var html = quest.one.images.map;
                this.drawing = $(html);
                this.drawing.css({
                    position: "absolute",
                    left: this.x,
                    top: this.y,
                    width: window.innerWidth,
                    height: window.innerHeight
                })
                $("body").append(this.drawing);
            }

            //
            function equip(weapon) {
                weapon.Used = true;
                if (weapon === greenstaff) {
                    if (redstaff.Used) {
                        redstaff.Used = false;
                        redstaff.drawing.css({
                            position: "absolute",
                            left: 160,
                            top: 100,
                            width: 70,
                            height: 100
                        })
                    }
                    if (sword.Used) {
                        sword.Used = false;
                        sword.drawing.css({
                            position: "absolute",
                            left: 380,
                            top: 100
                        })
                    }
                } else if (weapon === redstaff) {
                    if (greenstaff.Used) {
                        greenstaff.Used = false;
                        greenstaff.drawing.css({
                            position: "absolute",
                            left: 300,
                            top: 100,
                            width: 70,
                            height: 100
                        })
                    }
                    if (sword.Used) {
                        sword.Used = false;
                        sword.drawing.css({
                            position: "absolute",
                            left: 380,
                            top: 100
                        })
                    }
                } else if (weapon === sword) {
                    if (TimesEquipedSWORD >= 0) {
                        if (redstaff.Used) {
                            redstaff.Used = false;
                            redstaff.drawing.css({
                                position: "absolute",
                                left: 160,
                                top: 100,
                                width: 70,
                                height: 100
                            })
                        }
                        if (greenstaff.Used) {
                            greenstaff.Used = false;
                            greenstaff.drawing.css({
                                position: "absolute",
                                left: 300,
                                top: 100,
                                width: 70,
                                height: 100
                            })
                        }
                        TimesEquipedSWORD++;
                    }
                }
            }

            //
            var map1 = new questOneMap();
            map1.draw();
            map1.drawing.hide();
            //
            //
            var shop = new Shop();
            var sign = new Sign(1700, 300);
            sign.draw();
            var door = new Door((window.innerWidth / 2) - 300, 0);
            var door2 = new Door((window.innerWidth / 2), 0);
            var wall = new Wall(0, 0);
            var wall2 = new WallTurned(0, 0);
            var wall3 = new Wall(0, window.innerHeight - 100);
            var wall4 = new WallTurned(window.innerWidth - 100, 0);
            var redstaff = new RedStaff(160, 100);
            var redstaffB = new RedStaffBULLET(160, 100);
            var gold = 12;
            document.getElementById("price").innerHTML = "Price: " + String(redstaff.price);
            onmouseoverRedStaff = () => {
                if (not(redstaffBEEN)) {
                    document.getElementById("price").innerHTML = "Price: " + String(redstaff.price);
                    $("#redStaffStats").show()
                }
            }

            onmouseleaveRedStaff = () => {
                $("#redStaffStats").hide();
            }
            onmouseoverGreenStaff = () => {
                if (not(greenstaffBEEN)) {
                    document.getElementById("price").innerHTML = "Price: " + String(greenstaff.price);
                    $("#redStaffStats").show();
                }
            }
            onmouseleaveGreenStaff = () => {
                $("#redStaffStats").hide();
            }
            $(".gold").text(gold);
            document.onclick = function (e) {
                if (!inPrompt) {
                    if (redstaff.Used) {
                        redstaffB.justShot = true;
                        var t = setTimeout(function () {
                            redstaffB.justShot = false;
                            redstaffB.distaceShot = 0;
                            redstaffB.movedShot = false;
                            $(".RedStaffB").hide();
                        }, 1000)
                        var int = setInterval(function () {
                            if (redstaffB.checkCollision(house, 400, 400)) {
                                clearInterval(int);
                                clearTimeout(t);
                                redstaffB.justShot = false;
                                redstaffB.distaceShot = 0;
                                redstaffB.movedShot = false;
                                $(".RedStaffB").hide();
                            }
                        })
                    } else if (greenstaff.Used) {
                        greenstaffB.justShot = true;
                        var t = setTimeout(function () {
                            greenstaffB.justShot = false;
                            greenstaffB.distaceShot = 0;
                            greenstaffB.movedShot = false;
                            $(".GreenStaffB").hide();
                        }, 1000)
                        var int = setInterval(function () {
                            if (greenstaffB.checkCollision(house, 400, 400)) {
                                clearInterval(int);
                                clearTimeout(t);
                                greenstaffB.justShot = false;
                                greenstaffB.distaceShot = 0;
                                greenstaffB.movedShot = false;
                                $(".GreenStaffB").hide();
                            }
                        })
                    } else if (sword.Used) {
                        if (not(sword.justHit)) {
                            if (sword.face === "right") {
                                sword.drawing.css({
                                    position: "absolute",
                                    left: sword.x,
                                    top: sword.y,
                                    width: sword.width,
                                    height: sword.height,
                                    transform: 'rotate(45deg)'
                                })
                            } else if (sword.face === "left") {
                                sword.drawing.css({
                                    position: "absolute",
                                    left: sword.x,
                                    top: sword.y,
                                    width: sword.width,
                                    height: sword.height,
                                    transform: 'rotate(-45deg)'
                                })
                            }
                            sword.justHit = true;
                            setTimeout(function () {
                                sword.justHit = false;
                                sword.drawing.css({
                                    position: "absolute",
                                    left: sword.x,
                                    top: sword.y,
                                    width: sword.width,
                                    height: sword.height,
                                    transform: 'rotate(0deg)'
                                })
                            }, 200)
                        }
                    }
                }
            }
            //
            //
            /* This is When you Buy it! */
            Redstaff = () => {
                $(".gold").text(gold);
                if (redstaffBEEN) {
                    equip(redstaff);
                    return;
                }
                if (not(redstaff.Used)) {
                    if (gold >= redstaff.price) {
                        show_Prompt();
                        add_text("Success!");
                        text_on = "Success!";
                        gold -= redstaff.price;
                        $(".gold").text(gold);
                        /* The Character needs to not move*/
                        inPrompt = true;
                        equip(redstaff);
                        redstaffBEEN = true;
                    } else {
                        show_Prompt();
                        add_text("You need: " + Math.abs(gold - redstaff.price) + " more gold!")
                        text_on = "You need: " + Math.abs(gold - redstaff.price) + " more gold!";
                        $(".gold").text(gold);
                        /* The Character needs to nor move*/
                        inPrompt = true;
                    }
                }
            }
            ok = function () {
                if (text_on === "You need: " + Math.abs(gold - redstaff.price) + " more gold!") {
                    hide_Prompt();
                    text_on = "Hello Adventurers!";
                    add_text(text_on);
                    /* The Character needs to move again */
                    inPrompt = false;
                    return;
                } else if (text_on === "Success!") {
                    hide_Prompt();
                    text_on = "Hello Adventurers!";
                    add_text(text_on);
                    /* The Character needs to move again */
                    inPrompt = false;
                    return;
                }

                if (text_on === "You need: " + Math.abs(gold - greenstaff.price) + " more gold!") {
                    hide_Prompt();
                    text_on = "Hello Adventurers!";
                    add_text(text_on);
                    /* The Character needs to move again */
                    inPrompt = false;
                    return;
                } else if (text_on === "Success!") {
                    hide_Prompt();
                    text_on = "Hello Adventurers!";
                    add_text(text_on);
                    /* The Character needs to move again */
                    inPrompt = false;
                    return;
                }

                if (text_on === "Hello Adventurers!") {
                    text_on = "I am the shopkeeper!";
                } else if (text_on === "I am the shopkeeper!") {
                    text_on = "Welcome to the shop";
                } else {
                    /* To Enter Shop */
                    /* We needs to hide prompt */
                    hide_Prompt();
                    /* We need to set the text back */
                    text_on = "Hello Adventurers!";
                    /* The Character needs to move again */
                    inPrompt = false;
                    /* The shopKeeper needs to be removed */
                    dude.remove();
                    /* We have to say he has not been drawn, so javascript does not try to remove something that does not exist (The html id of dude) */
                    dude.beenDrawn = false;
                    /* Hides map and buliding*/
                    map.l.hide();
                    house.drawing.hide();
                    $("#Sign").hide();
                    mapOn = "shop";
                    if (not(beenInShop)) {
                        $("#shop").show();
                        $(".door").show();
                        $(".wall").show();
                        $(".wall2").show();
                        $("#sword").show();
                        /* show weapons */
                        $(".RedStaff").show();
                        $(".GreenStaff").show();
                        beenInShop = true;
                    } else {
                        /* show a map we already made */
                        $("#shop").show();
                        $(".door").show();
                        $(".wall").show();
                        $(".wall2").show();
                        $("#sword").show();
                        /* show weapons */
                        $(".RedStaff").show();
                        $(".GreenStaff").show();
                    }
                }
                add_text(text_on)
            }

            //
            var player = new Player(window.innerWidth / 2, window.innerHeight / 2);
            player.draw();
            var house = new House(500, 10);
            house.draw();
            //
            //
            /* To Make new map */
            /*add shop*/
            shop.draw();
            shop.drawing.hide();
            /* add stick 1 */
            door.draw();
            door.drawing.hide();
            /* add stick 2 */
            door2.draw();
            door2.drawing.hide();
            /* add wall */
            wall.draw();
            wall.drawing.hide();
            /* add wall */
            wall2.draw();
            wall2.drawing.hide();
            /* add wall */
            wall3.draw();
            wall3.drawing.hide();
            /* add wall */
            wall4.draw();
            wall4.drawing.hide();
            /* add RedStaff */
            redstaff.draw();
            redstaffB.draw();
            redstaff.drawing.hide();
            /* add green staff */
            greenstaff.draw();
            greenstaff.drawing.hide();
            greenstaffB.draw();
            $(".RedStaffB").hide();
            $(".GreenStaffB").hide();
            //
            //
            var sword = new Sword(10, 10);
            sword.draw();
            equip(sword);
            var zombies = [new Zombie(100, 100, 0), new Zombie(200, 100, 1), new Zombie(100, 300, 2), new Zombie(10, 100, 3)];
            for (var i = 0; i < zombies.length; i++) {
                zombies[i].draw();
            }
            $(".Zombies").hide();
            setInterval(function () {
                for (var i = 0; i < zombies.length; i++) {
                    zombies[i].move();
                }
            }, zombies[0].Timout)

            function animate() {
                requestAnimationFrame(animate);
                width2 = window.innerWidth;
                height2 = window.innerHeight;
                player.Animate();
                redstaff.update();
                redstaffB.update();
                greenstaff.update();
                greenstaffB.update();
                sword.update();
                for (var i = 0; i < zombies.length; i++) {
                    zombies[i].updatePosition();
                }
            }


            animate();
            document.addEventListener('keydown', function (e) {
                player.KeyDown(e, house, 400, 400);
            })
        } else {
            alert("You need a computer/need to be full screen")
        }
    }
}


var pickedCancel = false;
document.addEventListener('mousedown', function () {
        if (BigScreen.enabled) {
            var instructions = this
            BigScreen.request(document.body /*renderer.domElement*/, function () {
                $("body").css({
                    margin: 0,
                    overflowY: 'hidden',
                    /* Hide vertical scrollbar */
                    overflowX: 'hidden',
                    /* Hide horizontal scrollbar */
                    height: '100%',
                    backgroundColor: 'rgb(255, 255, 255)'
                })
                $("#gold").show();
                game();
            }, function () {
            }, function () {
                if (not(pickedCancel)) {
                    $("body").css({
                        margin: 0,
                        overflowY: 'hidden',
                        /* Hide vertical scrollbar */
                        overflowX: 'hidden',
                        /* Hide horizontal scrollbar */
                        height: '100%',
                        backgroundColor: 'rgb(255, 255, 255)'
                    })
                    $("#gold").show();
                    if (not(been) && confirm('Full screen failed: No FullScreen? (ok: yes; cancel: try agian)') && not(pickedCancel)) {
                        pickedCancel = true;
                        game();
                    } else {

                    }
                }
            });

        } else {
            // We fall back to alternative controls
            if (not(pickedCancel)) {
                $("body").css({
                    margin: 0,
                    overflowY: 'hidden',
                    /* Hide vertical scrollbar */
                    overflowX: 'hidden',
                    /* Hide horizontal scrollbar */
                    height: '100%',
                    backgroundColor: 'rgb(255, 255, 255)'
                })
                $("#gold").show();
                if (not(been) && confirm('Full screen failed: No FullScreen? (ok: yes; cancel: try agian)') && not(pickedCancel)) {
                    pickedCancel = true;
                    game();
                } else {

                }
            }
        }
    }
)
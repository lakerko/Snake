function Player() {
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 10;
    this.course = "";
    this.aBody = [];
    this.bodyLength = 5;
}

Player.prototype.setUp = function() {
    this.aBody = [];
    this.x = 0;
    this.y = 0;
    this.course = "";
}

Player.prototype.reset = function() {
    this.setUp();
    for (var i = this.bodyLength - 1; i >= 0  ; i--) {
        this.aBody.push({x: i * this.width, y: this.y});
    }
    this.x = this.aBody[0].x;
}

Player.prototype.fromHole = function() {
    if (alreadyRunM1) {
        return;
    }

    if (alreadyRunM2) {
        return;
    }

    if (score % 10 == 1) {
        this.holeX = this.x = 50;
        this.holeY = this.y = 0;
        this.course = "down";
        alreadyRunM1 = true;
    } else if (score % 10 == 2) {
        this.x = 0;
        this.y = 0;
        this.course = "right";
        alreadyRunM2 = true;
    }

    if (score % 10 == 1) {
        for (var i = 0; i < this.aBody.length; i++) {
            this.aBody[i].x = this.x;
            this.aBody[i].y = this.y - i * 10;
        }
    } else if (score % 10 == 2) {
        for (var i = 0; i < this.aBody.length; i++) {
            this.aBody[i].x = this.x - i * 10;
            this.aBody[i].y = this.y;
        }
    }
}

Player.prototype.update = function(delta) {
    timing += delta;

    if (38 in keysDown && this.course != "down" && (this.aBody[0].x != this.aBody[1].x && this.aBody[0].y - 10 != this.aBody[1].y)) {
        this.course = "up";
    } else if (40 in keysDown && this.course != "up" && (this.aBody[0].x != this.aBody[1].x && this.aBody[0].y + 10 != this.aBody[1].y)) {
        this.course = "down";
    } else if (37 in keysDown && this.course != "right" && (this.aBody[0].x  - 10 != this.aBody[1].x && this.aBody[0].y != this.aBody[1].y)) {
        this.course = "left";
    } else if (39 in keysDown && this.course != "left" && (this.aBody[0].x + 10 != this.aBody[1].x && this.aBody[0].y != this.aBody[1].y)) {
        this.course = "right";
    }

    if (timing >= 100) {
        timing = 0;

        if (this.course == "") {
            this.course = "right";
            this.x += 10;
        } else if (this.course == "right") {
            this.x += 10;
        } else if (this.course == "left") {
            this.x -= 10;
        }

        if (this.course == "up") {
            this.y -= 10;
        } else if (this.course == "down") {
            this.y += 10;
        }

        this.aBody[this.aBody.length - 1].x = this.x;
        this.aBody[this.aBody.length - 1].y = this.y;
        this.aBody.splice(0, 0, this.aBody.splice(-1, 1)[0]);
    }

    if (score > 1 && score % 10 == 1) {
        if (this.aBody[0].x  < 0 || this.aBody[0].x  + this.width > canvas.width || this.aBody[0].y < 0 || this.aBody[0].y + this.height > canvas.height) {
            reset();
        }
    } else if (this.aBody[0].x  < 0 || this.aBody[0].x  + this.width > canvas.width || this.aBody[0].y < 0 || this.aBody[0].y + this.height > canvas.height) {
        reset();
    }
}

Player.prototype.bodyCollision = function() {
    for (var i = 1; i < this.aBody.length; i++) {
        if (this.aBody[0].x == this.aBody[i].x && this.aBody[0].y == this.aBody[i].y) {
            reset();
        }
    }
}

Player.prototype.catchFood = function(target) {
    if (this.aBody[0].x ==  target.x && this.aBody[0].y == target.y) {
        poop = [target.x, target.y];
        eaten = true;
        score++;
        target.spawn(hole);
    }
}

Player.prototype.eatFood = function() {
    if (this.aBody[this.aBody.length - 1].x == poop[0] && this.aBody[this.aBody.length - 1].y == poop[1]) {
        this.aBody.push({x: this.aBody[this.aBody.length - 1].x, y: this.aBody[this.aBody.length - 1].y});
        eaten = false;
        poop = [];
    }
}

Player.prototype.levelEntry = function(target) {
    if ((this.aBody[0].x == canvas.width / 2 - 10 || this.aBody[0].x == canvas.width / 2) &&
        (this.aBody[0].y == canvas.height / 2 - 10 || this.aBody[0].y == canvas.height / 2)) {
        score++;
        target.spawn(hole);
        //generateMap = true;
    }
}

Player.prototype.levelExit = function(target) {
    if ((this.aBody[0].x == canvas.width - 20 || this.aBody[0].x == canvas.width - 10) &&
        (this.aBody[0].y == canvas.height / 2 - 10 || this.aBody[0].y == canvas.height / 2)) {
        score++;
        generateMap = false;
        target.spawn(hole);
        //target.x =
    }
}

Player.prototype.render = function() {
    for (var i = 0; i < this.aBody.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
            ctx.fillRect(this.aBody[i].x, this.aBody[i].y, this.width, this.height);
        } else if ( i == this.aBody.length - 1){
            ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
            ctx.fillRect(this.aBody[i].x, this.aBody[i].y, this.width, this.height);
        } else {
            ctx.fillStyle = "rgba("+(i*10)+", "+(i*10)+","+(i*10)+", 0.6)";
            ctx.fillRect(this.aBody[i].x, this.aBody[i].y, this.width, this.height);
        }
    }
}
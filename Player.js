function Player() {
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 10;
    this.course = "";
    this.aBody = [];
    this.aBodyAnimation = [];
    this.bodyLength = 5;
    this.inHoleDirection = "";
}

Player.prototype.setUp = function() {
    this.aBody = [];
    this.x = 0;
    this.y = 50;
    this.course = "";
}

Player.prototype.reset = function() {
    this.setUp();
    for (var i = this.bodyLength - 1; i >= 0  ; i--) {
        this.aBody.push({x: i * this.width, y: this.y});
    }
    this.x = this.aBody[0].x;
}

Player.prototype.update = function(delta) {
    timing += delta;

    if (keysDown[38] && this.course != "down" && (this.aBody[0].x != this.aBody[1].x && this.aBody[0].y - 10 != this.aBody[1].y)) {
        this.course = "up";
    } else if (keysDown[40] && this.course != "up" && (this.aBody[0].x != this.aBody[1].x && this.aBody[0].y + 10 != this.aBody[1].y)) {
        this.course = "down";
    } else if (keysDown[37] && this.course != "right" && (this.aBody[0].x  - 10 != this.aBody[1].x && this.aBody[0].y != this.aBody[1].y)) {
        this.course = "left";
    } else if (keysDown[39] && this.course != "left" && (this.aBody[0].x + 10 != this.aBody[1].x && this.aBody[0].y != this.aBody[1].y)) {
        this.course = "right";
    }

    if (timing >= gameDif.speed) {
        timing = 0;

        if (score > 1 && score % 10 == 1) {
            antiMovementPeriod++;
        } else {
            antiMovementPeriod = 0;
        }

        if (holeAnimation) {
            animationCounter++;
            this.aBodyAnimation = this.aBodyAnimation.slice(0, this.aBodyAnimation.length - 1);
        } else {
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
    }

    if (score > 1 && score % 10 == 1) {
        if (this.aBody[0].x  < 0 || this.aBody[0].x  + this.width > canvas.width || this.aBody[0].y < 0 || this.aBody[0].y + this.height > canvas.height) {
            theme.load();
            reset();
        }
    } else if (this.aBody[0].x  < 0 || this.aBody[0].x  + this.width > canvas.width || this.aBody[0].y < 0 || this.aBody[0].y + this.height > canvas.height) {
        theme.load();
        reset();
    }
}

Player.prototype.render = function() {
    if (holeAnimation) {
        for (var i = 0; i < this.aBodyAnimation.length; i++) {
            if (i == 0){
                switch (this.inHoleDirection) {
                    case "right":
                        ctx.drawImage(bodyHR, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                        break;
                    case "left":
                        ctx.drawImage(bodyHL, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                        break;
                    case "up":
                        ctx.drawImage(bodyHD, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                        break;
                    case "down":
                        ctx.drawImage(bodyHU, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                        break;
                }
            } else if (i == this.aBodyAnimation.length - 1) {
                if (this.aBodyAnimation[i].x > this.aBodyAnimation[i - 1].x) {
                    ctx.drawImage(tailright, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if (this.aBodyAnimation[i].x < this.aBodyAnimation[i - 1].x) {
                    ctx.drawImage(tailleft, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if (this.aBodyAnimation[i].y > this.aBodyAnimation[i - 1].y) {
                    ctx.drawImage(taildown, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if (this.aBodyAnimation[i].y < this.aBodyAnimation[i - 1].y) {
                    ctx.drawImage(tailup, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                }
            } else {
                if (this.aBodyAnimation[i].x == this.aBodyAnimation[i - 1].x && this.aBodyAnimation[i].x == this.aBodyAnimation[i + 1].x) {
                    ctx.drawImage(body, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if (this.aBodyAnimation[i].y == this.aBodyAnimation[i - 1].y && this.aBodyAnimation[i].y == this.aBodyAnimation[i + 1].y) {
                    ctx.drawImage(body, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if ((this.aBodyAnimation[i].x < this.aBodyAnimation[i - 1].x && this.aBodyAnimation[i].y > this.aBodyAnimation[i + 1].y) || (this.aBodyAnimation[i].x < this.aBodyAnimation[i + 1].x && this.aBodyAnimation[i].y > this.aBodyAnimation[i - 1].y)) {
                    ctx.drawImage(bodyLD, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if ((this.aBodyAnimation[i].x > this.aBodyAnimation[i - 1].x && this.aBodyAnimation[i].y > this.aBodyAnimation[i + 1].y) || (this.aBodyAnimation[i].x > this.aBodyAnimation[i + 1].x && this.aBodyAnimation[i].y > this.aBodyAnimation[i - 1].y)) {
                    ctx.drawImage(bodyPD, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if ((this.aBodyAnimation[i].x > this.aBodyAnimation[i - 1].x && this.aBodyAnimation[i].y < this.aBodyAnimation[i + 1].y) || (this.aBodyAnimation[i].x > this.aBodyAnimation[i + 1].x && this.aBodyAnimation[i].y < this.aBodyAnimation[i - 1].y)) {
                    ctx.drawImage(bodyPH, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                } else if ((this.aBodyAnimation[i].x < this.aBodyAnimation[i - 1].x && this.aBodyAnimation[i].y < this.aBodyAnimation[i + 1].y) || (this.aBodyAnimation[i].x < this.aBodyAnimation[i + 1].x && this.aBodyAnimation[i].y < this.aBodyAnimation[i - 1].y)) {
                    ctx.drawImage(bodyLH, this.aBodyAnimation[i].x, this.aBodyAnimation[i].y);
                }
            }
        }
    } else if (!holeAnimationFix){
        for (var i = 0; i < this.aBody.length; i++) {
            if (i == 0){
                if (this.aBody[i].x > this.aBody[i + 1].x) {
                    ctx.drawImage(headright, this.aBody[i].x, this.aBody[i].y);
                } else if (this.aBody[i].x < this.aBody[i + 1].x) {
                    ctx.drawImage(headleft, this.aBody[i].x, this.aBody[i].y);
                } else if (this.aBody[i].y > this.aBody[i + 1].y) {
                    ctx.drawImage(headdown, this.aBody[i].x, this.aBody[i].y);
                } else if (this.aBody[i].y < this.aBody[i + 1].y) {
                    ctx.drawImage(headup, this.aBody[i].x, this.aBody[i].y);
                }
            } else if (i == this.aBody.length - 1) {
                if (this.aBody[i].x > this.aBody[i - 1].x) {
                    ctx.drawImage(tailright, this.aBody[i].x, this.aBody[i].y);
                } else if (this.aBody[i].x < this.aBody[i - 1].x) {
                    ctx.drawImage(tailleft, this.aBody[i].x, this.aBody[i].y);
                } else if (this.aBody[i].y > this.aBody[i - 1].y) {
                    ctx.drawImage(taildown, this.aBody[i].x, this.aBody[i].y);
                } else if (this.aBody[i].y < this.aBody[i - 1].y) {
                    ctx.drawImage(tailup, this.aBody[i].x, this.aBody[i].y);
                }
            } else {
                if (this.aBody[i].x == this.aBody[i - 1].x && this.aBody[i].x == this.aBody[i + 1].x) {
                    ctx.drawImage(body, this.aBody[i].x, this.aBody[i].y);
                } else if (this.aBody[i].y == this.aBody[i - 1].y && this.aBody[i].y == this.aBody[i + 1].y) {
                    ctx.drawImage(body, this.aBody[i].x, this.aBody[i].y);
                } else if ((this.aBody[i].x < this.aBody[i - 1].x && this.aBody[i].y > this.aBody[i + 1].y) || (this.aBody[i].x < this.aBody[i + 1].x && this.aBody[i].y > this.aBody[i - 1].y)) {
                    ctx.drawImage(bodyLD, this.aBody[i].x, this.aBody[i].y);
                } else if ((this.aBody[i].x > this.aBody[i - 1].x && this.aBody[i].y > this.aBody[i + 1].y) || (this.aBody[i].x > this.aBody[i + 1].x && this.aBody[i].y > this.aBody[i - 1].y)) {
                    ctx.drawImage(bodyPD, this.aBody[i].x, this.aBody[i].y);
                } else if ((this.aBody[i].x > this.aBody[i - 1].x && this.aBody[i].y < this.aBody[i + 1].y) || (this.aBody[i].x > this.aBody[i + 1].x && this.aBody[i].y < this.aBody[i - 1].y)) {
                    ctx.drawImage(bodyPH, this.aBody[i].x, this.aBody[i].y);
                } else if ((this.aBody[i].x < this.aBody[i - 1].x && this.aBody[i].y < this.aBody[i + 1].y) || (this.aBody[i].x < this.aBody[i + 1].x && this.aBody[i].y < this.aBody[i - 1].y)) {
                    ctx.drawImage(bodyLH, this.aBody[i].x, this.aBody[i].y);
                }
            }
        }
    }
}

Player.prototype.levelEntry = function() {
    if ((this.aBody[0].x == canvas.width / 2 - 10 || this.aBody[0].x == canvas.width / 2) &&
        (this.aBody[0].y == canvas.height / 2 - 10 || this.aBody[0].y == canvas.height / 2)) {
        for (var i = 0; i < this.aBody.length; i++) {
            this.aBodyAnimation[i] = this.aBody[i];
        }
        if (this.aBodyAnimation[0].x > this.aBodyAnimation[1].x) {
            this.inHoleDirection = "right";
        } else if (this.aBodyAnimation[0].x < this.aBodyAnimation[1].x) {
            this.inHoleDirection = "left";
        } else if (this.aBodyAnimation[0].y > this.aBodyAnimation[1].y) {
            this.inHoleDirection = "up";
        } else if (this.aBodyAnimation[0].y < this.aBodyAnimation[1].y) {
            this.inHoleDirection = "down";
        }
        holeAnimation = true;
        holeAnimationFix = true;
    }
}

Player.prototype.levelExit = function() {
    if ((this.aBody[0].x == canvas.width - 20 || this.aBody[0].x == canvas.width - 10) &&
        (this.aBody[0].y == canvas.height / 2 - 10 || this.aBody[0].y == canvas.height / 2)) {
        for (var i = 0; i < this.aBody.length; i++) {
            this.aBodyAnimation[i] = this.aBody[i];
        }
        if (this.aBodyAnimation[0].x > this.aBodyAnimation[1].x) {
            this.inHoleDirection = "right";
        } else if (this.aBodyAnimation[0].x < this.aBodyAnimation[1].x) {
            this.inHoleDirection = "left";
        } else if (this.aBodyAnimation[0].y > this.aBodyAnimation[1].y) {
            this.inHoleDirection = "up";
        } else if (this.aBodyAnimation[0].y < this.aBodyAnimation[1].y) {
            this.inHoleDirection = "down";
        }
        holeAnimation = true;
        holeAnimationFix = true;
    }
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
        this.y = 50;
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

Player.prototype.bodyCollision = function() {
    for (var i = 1; i < this.aBody.length; i++) {
        if (this.aBody[0].x == this.aBody[i].x && this.aBody[0].y == this.aBody[i].y) {
            theme.load();
            reset();
        }
    }
}

Player.prototype.mapCollision = function() {
    var arrX = Math.floor(this.aBody[0].x / 10);
    var arrY = Math.floor(this.aBody[0].y / 10);
    if (aMap[arrX][arrY].name == "wall") {
        theme.load();
        reset();
    }
}

Player.prototype.catchFood = function(target) {
    if (this.aBody[0].x ==  target.x && this.aBody[0].y == target.y) {

        score++;
        this.aBody.push({x: this.aBody[this.aBody.length - 1].x, y: this.aBody[this.aBody.length - 1].y});
        target.spawn(hole);
    }
}
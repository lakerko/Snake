function mapBorders() {
    var makerX = Math.round(player.holeX / 10);
    var makerY = Math.round(player.holeY / 10);
    var spawnHoleX = Math.round(hole.x / 10);
    var spawnHoleY = Math.round(hole.y / 10);
    aMap = [];

    function Value(meno) {
        this.name = meno;
    }

    for (var i = 0; i < 32; i++) {
        aMap[i] = [];
        for (var j = 0; j < 32; j++) {
            //aMap[i].splice(j,0, {name: "blank"});
            aMap[i][j] = new Value("blank");
        }
    }
    for (var i = 0; i < 32; i++) {
        aMap[i][0].name = "wall";
        aMap[i][31].name = "wall";
        aMap[0][i].name = "wall";
        aMap[31][i].name = "wall";
    }

    aMap[spawnHoleX][spawnHoleY].name = "hole";
    aMap[spawnHoleX][spawnHoleY + 1].name = "hole";
    aMap[spawnHoleX + 1][spawnHoleY].name = "hole";
    aMap[spawnHoleX + 1][spawnHoleY + 1].name = "hole";
    aMap[makerX][makerY].name = "way";
}

function wayCheck(x, y) {
    var counter = 0;
    if (aMap[x - 1][y].name == "way") {
        counter++;
    }
    if (aMap[x + 1][y].name == "way") {
        counter++;
    }
    if (aMap[x][y - 1].name == "way") {
        counter++;
    }
    if (aMap[x][y + 1].name == "way") {
        counter++;
    }
    if (counter <= 1) {
        return true;
    } else {
        return false;
    }
}

var mapGenerator = function() {
    if (alreadyRunMG) {
        return;
    }
    //alreadyRunMG = true;

    var makerX = Math.round(player.holeX / 10);
    var makerY = Math.round(player.holeY / 10);
    var spawnHoleX = Math.round(hole.x / 10);
    var spawnHoleY = Math.round(hole.y / 10);
    var noOptionsLeft = false;
    var permitRight = false;
    var permitLeft = false;
    var permitUp = false;
    var permitDown = false;
    var makerMoved = false;
    var direction = "down";

    mapBorders();

    for (var i = 0; i < gameDif.lineFromHole; i++) {
        makerY = i;
        aMap[makerX][makerY].name = "way";
        aMap[makerX][makerY].direction = direction;
    }

    var rightWay = false;
    while (!rightWay) {
        permitRight = false;
        permitLeft = false;
        permitUp = false;
        permitDown = false;
        makerMoved = false;

        if ((makerX - 1) > 2 && aMap[makerX - 1][makerY].name == "blank" && wayCheck(makerX - 1, makerY)) {
            permitLeft = true;
        }
        if ((makerX + 1) < 29 && aMap[makerX + 1][makerY].name == "blank" && wayCheck(makerX + 1, makerY)) {
            permitRight = true;
        }
        if ((makerY - 1) > 2 && aMap[makerX][makerY - 1].name == "blank" && wayCheck(makerX, makerY - 1)) {
            permitUp = true;
        }
        if ((makerY + 1) < 29 && aMap[makerX][makerY + 1].name == "blank" && wayCheck(makerX, makerY + 1)) {
            permitDown = true;
        }

        while (!makerMoved) {
            var random = Math.floor(Math.random() * 6);
            if (random == 0 && permitLeft) {
                direction = "left";
                makerMoved = true;
            } else if (random == 1 && permitRight) {
                direction = "right";
                makerMoved = true;
            } else if (random == 2 && permitUp) {
                direction = "up";
                makerMoved = true;
            } else if (random == 3 && permitDown) {
                direction = "down";
                makerMoved = true;
            } else if (!permitDown && !permitUp && !permitRight && !permitLeft){
                //noOptionsLeft = true;
                //direction = "noway";
                break;
            } else {
                if ((direction == "up" && permitUp && (makerY - 1) > 2) ||
                    (direction == "down" && permitDown && (makerY + 1) < 29) ||
                    (direction == "right" && permitRight && (makerX - 1) > 2) ||
                    (direction == "left" && permitLeft && (makerX + 1) < 29)) {
                    makerMoved = true;
                }
            }
        }

        switch (direction) {
            case "up":
                aMap[makerX][makerY - 1].name = "way";
                aMap[makerX][makerY - 1].direction = "up";
                console.log("UP: "+aMap[makerX][makerY - 1].name+" x:"+makerX+" y:"+makerY);
                makerY--;
                break;
            case "down":
                aMap[makerX][makerY + 1].name = "way";
                aMap[makerX][makerY + 1].direction = "down";
                console.log("DOWN: "+aMap[makerX][makerY + 1].name+" x:"+makerX+" y:"+makerY);
                makerY++;
                break;
            case "left":
                aMap[makerX - 1][makerY].name = "way";
                aMap[makerX - 1][makerY].direction = "left";
                console.log("LEFT: "+aMap[makerX - 1][makerY].name+" x:"+makerX+" y:"+makerY);
                makerX--;
                break;
            case "right":
                aMap[makerX + 1][makerY].name = "way";
                aMap[makerX + 1][makerY].direction = "right";
                console.log("RIGHT: "+aMap[makerX + 1][makerY].name+" x:"+makerX+" y:"+makerY);
                makerX++;
                break;
        }

        if (noOptionsLeft) {
            //mapBorders();
            break;
        }

        if (aMap[spawnHoleX - 1][spawnHoleY - 1].name == "way" ||
            aMap[spawnHoleX - 1][spawnHoleY].name == "way" ||
            aMap[spawnHoleX - 1][spawnHoleY + 1].name == "way" ||
            aMap[spawnHoleX - 1][spawnHoleY + 2].name == "way" ||
            aMap[spawnHoleX][spawnHoleY - 1].name == "way" ||
            aMap[spawnHoleX][spawnHoleY + 2].name == "way" ||
            aMap[spawnHoleX + 1][spawnHoleY - 1].name == "way" ||
            aMap[spawnHoleX + 1][spawnHoleY + 2].name == "way") {
            rightWay = true;
        }
    }

    alreadyRunMG = true;
    generateMap = true;
}


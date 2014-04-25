var mapGenerator = function() {
    var makerX = Math.round(player.holeX / 10);
    var makerY = Math.round(player.holeY / 10);
    var spawnHoleX = Math.round(hole.x / 10);
    var spawnHoleY = Math.round(hole.y / 10);
    var permitRight = false;
    var permitUp = false;
    var permitDown = false;
    var makerMoved = false;
    var direction = "down";
    aMap = [];

    function Value(meno) {
        this.name = meno;
    }
    for (var i = 0; i < 32; i++) {
        aMap[i] = [];
        for (var j = 0; j < 32; j++) {
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

    var randomAddition = Math.floor(Math.random()*10);
    for (var i = 0; i <= gameDif.lineFromHole + randomAddition; i++) {
        makerY++;
        aMap[makerX][makerY].name = "way";
    }

    var legitWay = false;
    while (!legitWay) {
        permitRight = false;
        permitUp = false;
        permitDown = false;
        makerMoved = false;

        if (aMap[makerX + 1][makerY].name == "blank" && makerX < 24 && direction != "right") {
            permitRight = true;
        }
        if (aMap[makerX][makerY - 1].name == "blank" && (makerY - 1) > 7 && direction != "up") {
            permitUp = true;
        }
        if (aMap[makerX][makerY + 1].name == "blank" && (makerY + 1) < 24 && direction != "down") {
            permitDown = true;
        }

        while (!makerMoved) {
            var randomDirection = Math.floor(Math.random() * 3);
            if (randomDirection === 0 && permitRight) {
                direction = "right";
                makerMoved = true;
            } else if (randomDirection === 1 && permitUp) {
                direction = "up";
                makerMoved = "true";
            } else if (randomDirection === 2 && permitDown) {
                direction = "down";
                makerMoved = true;
            }
        }

        var randomLength = Math.floor(Math.random()*(gameDif.randomHigh - gameDif.randomLow + 1)+gameDif.randomLow);
        switch (direction) {
            case "right":
                makerX = chunkWayFromRandom("right", randomLength, makerX, makerY);
                break;
            case "up":
                makerY = chunkWayFromRandom("up", randomLength, makerX, makerY);
                break;
            case "down":
                makerY = chunkWayFromRandom("down", randomLength, makerX, makerY);
                break;
        }

        var yDifference;
        if (makerX >= 24) {
            if (makerY < spawnHoleY) {
                yDifference = spawnHoleY - makerY;
                for (var i = 1; i <= yDifference; i++) {
                    makerY++;
                    aMap[makerX][makerY].name = "way";
                }
            } else if (makerY > spawnHoleY) {
                yDifference = makerY - spawnHoleY;
                for (var i = 1; i <= yDifference; i++) {
                    makerY--;
                    aMap[makerX][makerY].name = "way";
                }
            }
            for (var i = makerX; i < spawnHoleX; i++) {
                makerX++;
                aMap[makerX][makerY].name = "way";
            }
        }
        if (aMap[spawnHoleX - 1][spawnHoleY - 1].name == "way" ||
        aMap[spawnHoleX - 1][spawnHoleY].name == "way" ||
        aMap[spawnHoleX - 1][spawnHoleY + 1].name == "way" ||
        aMap[spawnHoleX - 1][spawnHoleY + 2].name == "way" ||
        aMap[spawnHoleX][spawnHoleY - 1].name == "way" ||
        aMap[spawnHoleX][spawnHoleY + 2].name == "way" ||
        aMap[spawnHoleX + 1][spawnHoleY - 1].name == "way" ||
        aMap[spawnHoleX + 1][spawnHoleY + 2].name == "way") {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 6; j++) {
                    if (aMap[(spawnHoleX - 2) + i][(spawnHoleY - 2) + j].name == "blank" || aMap[(spawnHoleX - 2) + i][(spawnHoleY - 2) + j].name == "wall") {
                        aMap[(spawnHoleX - 2) + i][(spawnHoleY - 2) + j].name = "way";
                    }
                }
            }
            legitWay = true;
        }
    }
    mapAdjuster();
    mapGraphics();
    generateMap = true;
    holeAnimationFix = false;
}

function chunkWayFromRandom (direction, randomLength, makerX, makerY) {
    if (direction == "right") {
        for (var i = 1; i <= randomLength; i++) {
            makerX++;
            aMap[makerX][makerY].name = "way";
        }
        return makerX;
    } else if (direction == "up") {
        for (var i = 1; i <= randomLength; i++) {
            makerY--;
            aMap[makerX][makerY].name = "way";
        }
        return makerY;
    } else if (direction == "down") {
        for (var i = 1; i <= randomLength; i++) {
            makerY++;
            aMap[makerX][makerY].name = "way";
        }
        return makerY;
    }
}

function mapAdjuster () {
    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if (aMap[i][j].name == "way") {
                if (i - 1 > 0 && aMap[i - 1][j].name == "blank") {
                    aMap[i - 1][j].name = "wayK";
                }
                if (i + 1 < 31 && aMap[i + 1][j].name == "blank") {
                    aMap[i + 1][j].name = "wayK";
                }
                if (j - 1 > 0 && aMap[i][j - 1].name == "blank") {
                    aMap[i][j - 1].name = "wayK";
                }
                if (j + 1 < 31 && aMap[i][j + 1].name == "blank") {
                    aMap[i][j + 1].name = "wayK";
                }
            }
        }
    }
    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if (aMap[i][j].name == "blank") {
                if (aMap[i - 1][j - 1].name == "way" || aMap[i - 1][j + 1].name == "way" || aMap[i + 1][j - 1].name == "way" || aMap[i + 1][j + 1].name == "way" ) {
                    if ((aMap[i - 1][j].name == "wayK" || aMap[i + 1][j].name == "wayK") && (aMap[i][j - 1].name == "wayK" || aMap[i][j + 1].name == "wayK")) {
                        aMap[i][j].name = "wayK";
                    }
                }
            }
        }
    }
    if (diff) {
        for (var i = 0; i < 32; i++) {
            for (var j = 0; j < 32; j++) {
                if (aMap[i][j].name == "blank") {
                    if (aMap[i - 1][j].name == "wayK" && aMap[i - 2][j].name == "way" && aMap[i + 1][j].name == "blank") {
                        aMap[i][j].name = "wayK";
                    }
                }
                if (aMap[i][j].name == "blank") {
                    if (aMap[i + 1][j].name == "wayK" && aMap[i + 2][j].name == "way" && aMap[i - 1][j].name == "blank") {
                        aMap[i][j].name = "wayK";
                    }
                }
                if (aMap[i][j].name == "blank") {
                    if (aMap[i][j + 1].name == "wayK" && aMap[i][j + 2].name == "way" && aMap[i][j - 1].name == "blank") {
                        aMap[i][j].name = "wayK";
                    }
                }
                if (aMap[i][j].name == "blank") {
                    if (aMap[i][j - 1].name == "wayK" && aMap[i][j - 2].name == "way" && aMap[i][j + 1].name == "blank") {
                        aMap[i][j].name = "wayK";
                    }
                }
            }
        }
    }
    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if (aMap[i][j].name == "blank" && aMap[i - 1][j].name != "blank" && aMap[i + 1][j].name != "blank" && aMap[i][j - 1].name != "blank" && aMap[i][j + 1].name != "blank") {
                aMap[i][j].name = "way";
            }
        }
    }
    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if (aMap[i][j].name == "wayK") {
                aMap[i][j].name = "way";
            }
        }
    }
    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if (aMap[i][j].name == "blank") {
                aMap[i][j].name = "wall"
            }
        }
    }
    aMap[30][15].name = "way";
    aMap[30][16].name = "way";
    aMap[31][15].name = "way";
    aMap[31][16].name = "way";
}

function mapGraphics () {
    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if (aMap[i][j].name == "wall") {
                aMap[i][j].img = aRock[Math.floor(Math.random() * aRock.length)];
            } else if (aMap[i][j].name == "way") {
                aMap[i][j].img = aWay[Math.floor(Math.random() * aWay.length)];
            }
        }
    }
}

function mapRender () {

    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            ctx.drawImage(aMap[i][j].img, i*10, j*10);
        }
    }
}
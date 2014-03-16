var mapGenerator = function() {
    if (alreadyRunMG == true) {
        return;
    }

    aMap = [];
    var makerX = Math.round(player.holeX / 10);
    var makerY = Math.round(player.holeY / 10);
    var spawnHoleX = Math.round(hole.x / 10);
    var spawnHoleY = Math.round(hole.y / 10);
    var noOptionsLeft = false;
    var difficultyLineCounter = 0;
    var permitRight = false;
    var permitLeft = false;
    var permitUp = false;
    var permitDown = false;
    var makerMoved = false;
    var direction = "down";

    function Value(meno) {
        this.name = meno;
    }
    //var valuator = new Value("blank");

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

    /*
     var tmp = '';
     for (var i = 0; i<32; i++) {
         for (var j = 0; j<32; j++) {
             tmp += '['+i+","+j+": "+aMap[i][j].name+']\t';
         }
         tmp += '\n';
     }
     console.log(tmp);
     */

    var rightWay = false;
    while (!rightWay) {
        if (aMap[makerX - 1][makerY].name == "blank") {
            permitLeft = true;
        }
        if (aMap[makerX + 1][makerY].name == "blank") {
            permitRight = true;
        }
        if (aMap[makerX][makerY - 1].name == "blank") {
            permitUp = true;
        }
        if (aMap[makerX][makerY + 1].name == "blank") {
            permitDown = true;
        }

        makerMoved = false;

        while (!makerMoved) {
            var random = Math.floor(Math.random() * 10);
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
                noOptionsLeft = true;
                break;
            } else {
                if ((direction == "up" && permitUp) ||
                    (direction == "down" && permitDown) ||
                    (direction == "right" && permitRight) ||
                    (direction == "left" && permitLeft)) {
                    makerMoved = true;
                }
            }
        }

        switch (direction) {
            case "up":
                aMap[makerX][makerY - 1].name = "way";
                makerY--;
                break;
            case "down":
                aMap[makerX][makerY + 1].name = "way";
                makerY++;
                break;
            case "left":
                aMap[makerX - 1][makerY].name = "way";
                makerX--;
                break;
            case "right":
                aMap[makerX + 1][makerY].name = "way";
                makerX++;
                break;
        }

        if (noOptionsLeft) {
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
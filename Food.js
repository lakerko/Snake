function Food() {
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 10;
    this.rightPos = false;
}

var randomPositions = function() {
    var ranX = 10 * Math.floor(Math.random() * canvas.width / 10);
    var ranY = 10 * Math.floor(Math.random() * canvas.height / 10);
    return [ranX, ranY];
}

Food.prototype.spawn = function(target) {
    this.rightPos = false;
    var newPositions;
    while (!this.rightPos) {
        newPositions = randomPositions();
        this.rightPos = true;
        for (var i = 0; i < player.aBody.length; i++) {
            if (newPositions[0] == player.aBody[i].x && newPositions[1] == player.aBody[i].y) {
                this.rightPos = false;
                break;
            }
        }
    }
    if (score > 0 && (score % 10 == 0 || score % 10 == 1)) {
        this.x = target.x;
        this.y = target.y;
        //console.log("KURWA MAC x"+target.x+" y"+target.y);
    } else {
        this.x = newPositions[0];
        this.y = newPositions[1];
    }
    //console.log("ONE "+score+" x: "+this.x+" y: "+this.y);
}

Food.prototype.render = function() {
    ctx.fillStyle = "rgba("+(this.x / 2)+", "+(this.y / 2)+","+(this.x / 2)+", 1)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
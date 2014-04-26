function Hole() {
    this.x = canvas.width / 2 - 10;
    this.y = canvas.height / 2 - 10;
    this.size = 20;
}

Hole.prototype.update = function() {
    if (score > 2 && score % 10 == 1){
        this.x = canvas.width - 20;
        this.y = canvas.height / 2 - 10;
    } else {
        this.x = canvas.width / 2 - 10;
        this.y = canvas.height / 2 - 10;
    }
}

Hole.prototype.render = function() {
    if (score % 10 == 0) {
        ctx.drawImage(holeBG, this.x - 10, this.y -10);
    } else if (score % 10 == 1) {
        ctx.drawImage(holeMGR, this.x - 20, this.y -10);
        ctx.drawImage(holeMGU, 40, 0);
    }
}
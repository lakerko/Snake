function Hole() {
    this.x = canvas.width / 2 - 10;
    this.y = canvas.height / 2 - 10;
    this.size = 20;
}

Hole.prototype.update = function() {
    if (score > 1 && (score % 10 == 0 || score % 10 == 2)) {
        this.x = canvas.width / 2 - 10;
        this.y = canvas.height / 2 - 10;
    } else if (score > 1 && score % 10 == 1){
        this.x = canvas.width - 20;
        this.y = canvas.height / 2 - 10;
        //console.log("KURWA MAC 11 x"+this.x+" y"+this.y);
    }
}

Hole.prototype.render = function() {
    ctx.fillStyle = "rgba(255, 0 , 0, 1)";
    ctx.fillRect(this.x, this.y, this.size, this.size);
}
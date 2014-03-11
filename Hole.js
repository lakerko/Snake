//git skuska

function Hole() {
    this.x = 0;
    this.y = 0;
    this.size = 20;
}

Hole.prototype.update = function() {
    if (score % 10 == 0) {
        this.x = canvas.width / 2 - 10;
        this.y = canvas.height / 2 - 10;

    } else if (score % 10 == 1){
        this.x = canvas.width - 20;
        this.y = canvas.height / 2 - 10;
        //console.log("KURWA MAC 11 x"+this.x+" y"+this.y);
    }
}

Hole.prototype.render = function() {
    ctx.fillStyle = "rgba(255, 0 , 0, 0.4)";
    ctx.fillRect(this.x, this.y, this.size, this.size);
}
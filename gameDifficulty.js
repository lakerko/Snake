function GameDifficulty(GD) {
    if (GD == "easy") {
        this.lineFromHole = 12;
        this.randomLow = 2;
        this.randomHigh = 4;
        this.speed = 100;
        diff = true;
    } else if (GD == "normal") {
        this.lineFromHole = 10;
        this.randomLow = 2;
        this.randomHigh = 4;
        this.speed = 80;
        diff = true;
    } else if (GD == "hard") {
        this.lineFromHole = 8;
        this.randomLow = 4;
        this.randomHigh = 6;
        this.speed = 60;
        diff = false;
    } else if (GD == "jebe") {
        this.lineFromHole = 5;
        this.randomLow = 5;
        this.randomHigh = 7;
        this.speed = 40;
        diff = false;
    }
}
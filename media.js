var aRock = [];
var aWay = [];
var loadedImages = 0;
var allImages = 35;


var goldenGod = new Image();
goldenGod.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
goldenGod.src = "images/ggp.png";

var snakeL = new Image();
snakeL.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
snakeL.src = "images/snakeL.png";


var headup = new Image();
headup.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
headup.src = "images/headup.png";

var headdown = new Image();
headdown.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
headdown.src = "images/headdown.png";

var headright = new Image();
headright.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
headright.src = "images/headright.png";

var headleft = new Image();
headleft.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
headleft.src = "images/headleft.png";


var body = new Image();
body.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
body.src = "images/body.png";

var bodyLD = new Image();
bodyLD.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyLD.src = "images/bodyLD.png";

var bodyLH = new Image();
bodyLH.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyLH.src = "images/bodyLH.png";

var bodyPH = new Image();
bodyPH.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyPH.src = "images/bodyPH.png";

var bodyPD = new Image();
bodyPD.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyPD.src = "images/bodyPD.png";

var bodyHD = new Image();
bodyHD.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyHD.src = "images/bodyHD.png";

var bodyHU = new Image();
bodyHU.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyHU.src = "images/bodyHU.png";

var bodyHR = new Image();
bodyHR.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyHR.src = "images/bodyHR.png";

var bodyHL = new Image();
bodyHL.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bodyHL.src = "images/bodyHL.png";


var tailup = new Image();
tailup.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
tailup.src = "images/tailup.png";

var taildown = new Image();
taildown.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
taildown.src = "images/taildown.png";

var tailright = new Image();
tailright.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
tailright.src = "images/tailright.png";

var tailleft = new Image();
tailleft.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
tailleft.src = "images/tailleft.png";


var bg = new Image();
bg.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
bg.src = "images/bg.png";


var holeBG = new Image();
holeBG.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
holeBG.src = "images/holeBG.png";

var holeMGR = new Image();
holeMGR.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
holeMGR.src = "images/holeMGR.png";

var holeMGU = new Image();
holeMGU.onload = function() {
    loadedImages++;
    if (loadedImages === allImages) {

    }
};
holeMGU.src = "images/holeMGU.png";


for (var i = 0; i < 5; i++) {
    aRock[i] = new Image();
    aRock[i].onload = function() {
        loadedImages++;
        if (loadedImages === allImages) {

        }
    }
    aRock[i].src = "images/rock"+(i+1)+".png";
}


for (var i = 0; i < 7; i++) {
    aWay[i] = new Image();
    aWay[i].onload = function() {
        loadedImages++;
        if (loadedImages === allImages) {

        }
    }
    aWay[i].src = "images/way"+(i+1)+".png";
}


var theme = new Audio("sound/radiate.mp3");
//分值计算
var dataObj = function() {
    this.fruitNum = 0;
    this.orange = 1; //吃到的分数
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;

}

dataObj.prototype.draw = function() {
    var w = canWidth,
        h = canHeight;
    ctx1.save();
    ctx1.fillStyle = "white";
    ctx1.fillText("score  " + this.score, w * 0.5, h - 20);
    ctx1.fillText("num " + this.fruitNum, w * 0.5, h - 50);
    ctx1.fillText("double " + this.orange, w * 0.5, h - 80);
    if(this.gameOver) {
        this.alpha += deltaTime * 0.001;
        if(this.alpha >= 1) {
            this.alpha = 1;
        }
        ctx1.shadowBlur = 20;
        ctx1.shadowColor = "black";
        ctx1.font="30px";
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctx1.fillText("GAMEOVER", w * 0.5, h * 0.5);
    }
    ctx1.restore();
}
dataObj.prototype.addScore = function() {
    this.score += this.fruitNum * 10 * this.orange;
    this.fruitNum = 0;
    this.orange = 1;
}
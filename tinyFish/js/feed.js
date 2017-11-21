//大鱼喂小鱼特效
var feedObj = function() {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = []; //半径
}
feedObj.prototype.num = 30;
feedObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {

        this.alive[i] = false;
        this.r[i] = 0;
    }
}
feedObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWidth = 4;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    for(var i = 0; i < this.num; i++) {
        if(this.alive[i]) {
            this.r[i] += deltaTime * 0.04;
            var alpha = 1 - this.r[i] / 60;
            if(this.r[i] > 60) {
                this.alive[i] = false;
                break; 
            }
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(249,216,119," + alpha + ")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}
feedObj.prototype.born = function(x, y) {
    for(var i = 0; i < this.num; i++) {
        if(!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            return;
        }
    }
}
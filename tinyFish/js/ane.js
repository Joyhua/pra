//画海葵
var aneObj = function() {

    //摇摆的海葵：二次贝塞尔函数、正弦函数
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.alpha = 0; //频率
    this.amp = []; //振幅
    //this.len = [];

}

aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 200 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 20;
        //this.len[i] = 200 + Math.random() * 50;
    }
};
aneObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);

    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 17;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154a";
    for(var i = 0; i < this.num; i++) {
        //beginPath,moveTo,lineTo,stroke,strokeStyle,lineWith,lineCap,globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 50, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}
//画大鱼
var momObj = function() {
    this.x;
    this.y;
    this.angle = 0;
    this.bigBody = new Image();

    this.bigTailTimer = 0;
    this.bigTailCount = 0;

    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 200;

    this.bigBodyCount = 0;

}

momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.bigBody.src = './src/image/bigSwim0.png';
};
momObj.prototype.draw = function() {

    //大鱼跟随鼠标方向移动
    this.x = lerpDistance(mx, this.x, 0.85);
    this.y = lerpDistance(my, this.y, 0.85);

    //方向改变旋转大鱼
    var deltaY = my - this.y,
        deltaX = mx - this.x,
        beta = Math.atan2(deltaY, deltaX) + Math.PI; //[-PI,PI]

    this.angle = lerpAngel(beta, this.angle, 0.6);
    if(!data.gameOver) {
        this.bigTailTimer += deltaTime;
        if(this.bigTailTimer > 50) {
            this.bigTailCount = (this.bigTailCount + 1) % 8;
            this.bigTailTimer %= 50;
        }

        this.bigEyeTimer += deltaTime;
        if(this.bigEyeTimer > this.bigEyeInterval) {
            this.bigEyeCount = (this.bigEyeCount + 1) % 2;
            this.bigEyeTimer %= this.bigEyeInterval;
            if(this.bigEyeCount == 0) {
                this.bigEyeInterval = Math.random() * 1500 + 2000;
            } else {
                this.bigEyeInterval = 200;
            }

        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    
    var bigTailCount = this.bigTailCount;
    ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width * 0.5 + 30, -bigTail[bigTailCount].height * 0.5);
    
    var bigBodyCount = this.bigBodyCount;
    if(data.orange == 1) {
        ctx1.drawImage(bigBodyOrange[bigBodyCount], -bigBodyOrange[bigBodyCount].width * 0.5, -bigBodyOrange[bigBodyCount].height * 0.5);

    } else {
        ctx1.drawImage(bigBodyBlue[bigBodyCount], -bigBodyBlue[bigBodyCount].width * 0.5, -bigBodyBlue[bigBodyCount].height * 0.5);

    }
    
    var bigEyeCount = this.bigEyeCount;
    ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width * 0.5, -bigEye[bigEyeCount].height * 0.5);

    ctx1.restore();
}
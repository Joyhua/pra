//画小鱼
var babyObj = function() {
    this.x;
    this.y;
    this.angle = 0;

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeInterval = 200;
    this.babyEyeCount = 0;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}

babyObj.prototype.init = function() {
    this.x = canWidth * 0.5 - 200;
    this.y = canHeight * 0.5 + 200;
};
babyObj.prototype.draw = function() {

    //跟随鼠标方向移动
    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);

    //方向改变旋转鱼
    var deltaY = mom.y - this.y,
        deltaX = mom.x - this.x,
        beta = Math.atan2(deltaY, deltaX) + Math.PI; //[-PI,PI]

    this.angle = lerpAngel(beta, this.angle, 0.6);
    if(!data.gameOver) {
        //尾巴摆动
        this.babyTailTimer += deltaTime;
        if(this.babyTailTimer > 50) {
            this.babyTailCount = (this.babyTailCount + 1) % 8;
            this.babyTailTimer %= 50;
        }

        //眨眼睛
        this.babyEyeTimer += deltaTime;
        if(this.babyEyeTimer > this.babyEyeInterval) {
            this.babyEyeCount = (this.babyEyeCount + 1) % 2;
            this.babyEyeTimer %= this.babyEyeInterval;

            if(this.babyEyeCount == 0) {
                this.babyEyeInterval = Math.random() * 1500 + 2000;
            } else {
                this.babyEyeInterval = 200;
            }
        }
    }

    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 200) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 200;
        if(this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            data.gameOver = true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 25, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

    ctx1.restore();
}
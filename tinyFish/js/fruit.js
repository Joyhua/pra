//画果实
var fruitObj = function() {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNo = [];
    this.l = [];
    this.spd = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();

}

fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.fruitType = [];
        this.spd[i] = Math.random() * 0.02 + 0.01;
    }
    this.orange.src = './src/image/fruit.png';
    this.blue.src = './src/image/blue.png';
};
fruitObj.prototype.draw = function() {
    for(var i = 0; i < this.num; i++) {
        if(this.alive[i]) {
            if(this.l[i] < 16) {
                var No = this.aneNo[i];
                this.x[i] = ane.headx[No];
                this.y[i] = ane.heady[No];
                //console.log(this.x[i])
                this.l[i] += this.spd[i] * deltaTime;
            } else {
                this.y[i] -= this.spd[i] * deltaTime;
            }
            if(this.fruitType[i] == "blue") {
                var pic = this.blue;
            } else {
                var pic = this.orange;
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if(this.y[i] < 10) {
                this.alive[i] = false;
            }
        }

    }
}

fruitObj.prototype.born = function(i) {

    var aneID = Math.floor(Math.random() * ane.num);
    this.aneNo[i] = aneID; //随海葵摆动出生
    //this.x[i] = ane.headx[aneID];
    //this.y[i] = ane.heady[aneID];
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2) {
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }
}

fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}

//控制果实数量> 15
function fruitMonitor() {
    var num = 0;
    for(var i = 0; i < fruit.num; i++) {
        if(fruit.alive[i]) num++;
    }
    if(num < 15) {
        sendFruit();
        return;
    }
}

function sendFruit() {
    for(var i = 0; i < fruit.num; i++) {
        if(!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}
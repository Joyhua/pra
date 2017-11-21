var can1, can2, ctx1, ctx2, lastTime, deltaTime, bgPic = new Image(),
    canWidth, canHeight, ane, fruit, mom, mx, my, baby, babyTail = [],
    babyEye = [],
    babyBody = [],
    bigTail = [],
    bigEye = [],
    data,
    bigBodyBlue = [],
    bigBodyOrange = [],
    wave,
    feed,
    dust, //漂浮物
    dustPic = []; //漂浮物图片
document.body.onload = game;

function getId(str) {
    return document.getElementById(str);
}

function getClass(str) {
    return document.getElementsByClassName(str);
}

function game() {
    init();
    lastTime = new Date();
    deltaTime = 0;
    gameloop();
}

function init() {
    //获得canvas context(画布的画笔)
    can1 = getId('canvas1');
    ctx1 = can1.getContext("2d");
    can2 = getId('canvas2');
    ctx2 = can1.getContext("2d");

    can1.addEventListener('mousemove', mouseMove, false);

    ctx1.font = "20px Verdane";
    ctx1.textAlign = "center";

    bgPic.src = './src/image/background.jpg';
    canWidth = can1.width;
    canHeight = can1.height;
    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();

    mx = canWidth * 0.5; //鼠标x,y坐标
    my = canHeight * 0.5;

    baby = new babyObj();
    baby.init();

    //小鱼尾巴
    for(var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = './src/image/babyTail' + i + '.png';
    }

    //小鱼眼睛
    for(var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = './src/image/babyEye' + i + '.png';
    }

    //小鱼身体
    for(var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = './src/image/babyFade' + i + '.png';
    }

    //大鱼尾巴
    for(var i = 0; i < 8; i++) {
        bigTail[i] = new Image();
        bigTail[i].src = './src/image/bigTail' + i + '.png';
    }

    //大鱼眼睛
    for(var i = 0; i < 2; i++) {
        bigEye[i] = new Image();
        bigEye[i].src = './src/image/bigEye' + i + '.png';
    }

    data = new dataObj();

    //大鱼身体
    for(var i = 0; i < 8; i++) {
        bigBodyBlue[i] = new Image();
        bigBodyOrange[i] = new Image();
        bigBodyBlue[i].src = './src/image/bigSwimBlue' + i + '.png';
        bigBodyOrange[i].src = './src/image/bigSwim' + i + '.png';

    }

    wave = new waveObj();
    wave.init();

    feed = new feedObj();
    feed.init();

    dust = new dustObj();
    dust.init();

    for(var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = './src/image/dust' + i + '.png';
    }
}

function gameloop() {
    window.requestAnimFrame(gameloop); //setInterval,setimeout
    var now = new Date;
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40) deltaTime = 40; //防止切换窗口后当前帧停止，导致间隔时间过长引发的问题
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    //ctx1.clearRect(0,0,canWidth,canHeight);//清除掉ctx1每一帧叠加的鱼；
    mom.draw();

    getMomFruitCollision();
    getMomBabyCollision();

    baby.draw();

    data.draw();
    wave.draw();
    feed.draw();
    dust.draw();
}

function mouseMove(e) {
    if(!data.gameOver) {
        if(e.offSetX || e.layerX) {
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }

}
//大鱼吃果实,判断大鱼和果实之间的距离
function getMomFruitCollision() {
	if(!data.gameOver){
		for(var i = 0; i < fruit.num; i++) {
        if(fruit.alive[i]) {
        	
            var l = calLength(fruit.x[i], fruit.y[i], mom.x, mom.y);
            if(l < 900) { //如果距离的平方小于900
                fruit.dead(i);
                data.fruitNum++;
                mom.bigBodyCount++;
                if(mom.bigBodyCount > 7) {
                    mom.bigBodyCount = 7
                }

                if(fruit.fruitType[i] == 'blue') {
                    data.orange = 2;
                }
                
                wave.born(fruit.x[i],fruit.y[i]);
            }
        }
    }
	}
    
}

//大鱼喂小鱼
function getMomBabyCollision() {
    if(data.fruitNum > 0 && !data.gameOver) {
        var l = calLength(mom.x, mom.y, baby.x, baby.y);
        if(l < 900) {
            baby.babyBodyCount = 0;
            mom.bigBodyCount = 0;

            data.addScore();
            
            feed.born(baby.x,baby.y);
            
        }
    }

}
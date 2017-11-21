window.requestAnimFrame=(function(){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback){return window.setTimeout(callback,1000/60);}
})();

function lerpDistance(aim,cur,ratio){
	var delta = cur - aim;
	return aim + delta *ratio;
}

function lerpAngel(a,b,t){
	var d= b-a;
	if(d>Math.PI) d=d-2*Math.PI;
	if(d<-Math.PI ) d=d+2*Math.PI;
	return a+d*t;
	
}

//直角三角形的第三边的平方；
function calLength(x1,y1,x2,y2){
	return Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
}

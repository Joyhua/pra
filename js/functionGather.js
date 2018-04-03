//数组判断
var is_array=function(value){
	return Object.prototype.toString.apply(value)==='[object Array]';
};

//使用sort排序：sort的灵活，取决于设计比较函数的灵活
function compareAscFun(a,b){//升序：从小到大
	return (a-b);
}
function compareDESCFun(a,b){//降序：从大到小
	return -(a-b);
}
function compareParityFun1(a,b){//奇偶排序:奇数在前，偶数在后
	var a=a%2,b=b%2;
	if(a==0) return 1;
	if(b==0) return -1;
}
function compareParityFun2(a,b){//奇偶排序:偶数在前，奇数在后
	var a=a%2,b=b%2;
	if(a==0) return -1;
	if(b==0) return 1;
}
function compareLetterFun(a,b){//不区分大小写按升序排序
	var a=a.toLowerCase,b=toLowerCase;
	if (a<b) {
		return 1;
	}else{
		return -1;
	}
}
function compareIntFun(a,b){//浮点数/整数分开排列
	if (a>Math.floor(a)) {return 1};
	if (b>Math.floor(b)) {return -1};
}
var a=[3,5,7,4,3,4];
a.sort(compareAscFun);

//f()() 这种执行函数方式
var n=1;
function f(){
	var n=2;
	var e= function(){
		return n;
	}
	return e;
}
//console.log(f()());//f():打印出函数，f()()：打印出e()执行过的值；

/*数组去重方法集合 start*/
/*方法一：最简单的遍历数组方法 */

function uniquelFun(array){
	var n=[];
	for(var i=0;i<array.length;i++){
		//indexOf ie8+才支持，为了兼容ie低版本浏览器。后面的方法若用到IndexOf，忽略兼容处理
		if(!Array.prototype.indexOf){
			Array.prototype.indexOf=function(item){
				var that=this,t_len=that.length, result=-1,a_item=null;
				if(t_len===0){
					return result;
				}
				for(var x1=0;x1<t_len;x1++){
					a_item=that[x1];
					if (a_item===item) {
						return x1;
						break;
					}

				}
				return result;

			}
			if (n.indexOf(array[i])==-1) {  
				n[n.length]=array[i];
			}

		}else{
			if (n.indexOf(array[i])==-1) {  
				n[n.length]=array[i];
			}
		}
		
	}
	return n;
}
/*方法二：对象键值对法 速度最快，占用空间最多(原理:相同键的数据被后面的覆盖)*/
function keyAndValueFun(array){
	var n={},r=[],len=array.length,val,type;
	for(var i=0;i<len;i++){
		val =array[i];
		type= typeof val;
		console.log(n[val]);
		if(!n[val]){
			n[val]=[type];
			r[r.length]=val;
		}else if(n[val].indexOf(type)<0){	//判断是否为js对象键时，会自动对传入的键执行“toString()”，不同的键可能会被误认为一样；例如： a[1]、a["1"].
			n[val].push(type);
			r[r.length]=val;
		}
	}
return r;
}

/*方法三：数组下标判断法（如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组,此方法其实有点类似遍历法）*/
function arrIndexFun(array){
	var n=[array[0]];

	//从第二项开始遍历
	for(var i=1;i<array.length;i++){
		if(array.indexOf(array[i])==i){
			n[n.length]=array[i];
		}
	}
	return n;
}

/*方法四：排序后相邻去除法*/
function neighborFun(array){
	array.sort();
	var re=[array[0]];
	for(var i=1;i<array.length;i++){
		if (array[i]!==re[re.length-1]) {
			re[re.length]=array[i];
		}
	}
	return re;
}

/*方法五：优化遍历数组法*/
function updateEachFun(array){
	var r = [];
  for(var i = 0, l = array.length; i < l; i++) {
    for(var j = i + 1; j < l; j++){
      if (array[i] === array[j]){ 
      	j = ++i;
      }
    }
    console.log(i);
    r.push(array[i]);
  }
  return r;
}

var s=[9,8,0,9,9,9,9,7,8];
var r=updateEachFun(s);
console.log(r);

/*数组去重方法集合 end*/
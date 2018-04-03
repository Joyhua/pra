/*方法一：构造函数绑定，apply/call方法*/

//狗继承动物的的属性和方法
function animal() {
    this.species = '动物';
}

function dog(name, color) {
    animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}

/*方法二：prototype*/
function animal() {
    this.species = '动物';
}

function dog(name, color) {
    this.name = name;
    this.color = color;
}

dog.prototype = new animal(); //删除prototype对象原先的值，然后赋值，此时实例化dog对象后prototype发生了改变指向了animal
dog.prototype.constructor = dog; //由于上一行，因此把prototype 指回dog。

/*方法三：prototype  此方法是对二的改进,与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），
 * 比较省内存。缺点是dog.prototype和Animal.prototype现在指向了同一个对象，那么任何对dog.prototype的修改，
 * 都会反映到Animal.prototype。*/

function animal() {}
animal.prototype.species = '动物';

function dog(name, color) {
    this.name = name;
    this.color = color;
}

dog.prototype = animal.prototype;
dog.prototype.constructor = dog;

var cat1 = new Cat("大毛", "黄色");

alert(cat1.species); // 动物

/*方法四：利用空对象作为中介*/
/*f是空对象，所以几乎不占内存。这时，修改dog的prototype对象，就不会影响到Animal的prototype对象*/
var f = function() {};
f.prototype = animal.prototype;
dog.prototype = new f();
dog.prototype.constructor = dog;

//封装方法四
function extend(child, parent) {
    var f = function() {}
    f.prototype = parent.prototype;
    child.prototype = new f();
    child.prototype.constructor = child;
    child.uber = parent.prototype; //意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
}　
extend(dog, animal);
var dog1 = new dog("大毛", "黄色");
alert(dog1.species); // 动物

/*方法五:拷贝继承  把父对象的所有属性和方法，拷贝进子对象*/

function animal() {}
animal.prototype.species = "动物";

function extend(child, parent) {
    var p = parent.prototype;
    var c = child.prototype;
    for(var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}
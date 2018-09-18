//数组判断
var is_array = function(value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};
//使用sort排序：sort的灵活，取决于设计比较函数的灵活
function compareAscFun(a, b) { //升序：从小到大
    return (a - b);
}

function compareDESCFun(a, b) { //降序：从大到小
    return -(a - b);
}

function compareParityFun1(a, b) { //奇偶排序:奇数在前，偶数在后
    var a = a % 2,
    b = b % 2;
    if (a == 0) return 1;
    if (b == 0) return -1;
}

function compareParityFun2(a, b) { //奇偶排序:偶数在前，奇数在后
    var a = a % 2,
    b = b % 2;
    if (a == 0) return -1;
    if (b == 0) return 1;
}

function compareLetterFun(a, b) { //不区分大小写按升序排序
    var a = a.toLowerCase,
    b = toLowerCase;
    if (a < b) {
        return 1;
    } else {
        return -1;
    }
}

function compareIntFun(a, b) { //浮点数/整数分开排列
    if (a > Math.floor(a)) {
        return 1
    };
    if (b > Math.floor(b)) {
        return -1
    };
}
var a = [3, 5, 7, 4, 3, 4];
a.sort(compareAscFun);
//f()() 这种执行函数方式
var n = 1;

function f() {
    var n = 2;
    var e = function() {
        return n;
    }
    return e;
}
//console.log(f()());//f():打印出函数，f()()：打印出e()执行过的值；
/*数组去重方法集合 start*/
/*方法一：最简单的遍历数组方法 */
function uniquelFun(array) {
    var n = [];
    for (var i = 0; i < array.length; i++) {
        //indexOf ie8+才支持，为了兼容ie低版本浏览器。后面的方法若用到IndexOf，忽略兼容处理
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(item) {
                var that = this,
                t_len = that.length,
                result = -1,
                a_item = null;
                if (t_len === 0) {
                    return result;
                }
                for (var x1 = 0; x1 < t_len; x1++) {
                    a_item = that[x1];
                    if (a_item === item) {
                        return x1;
                        break;
                    }
                }
                return result;
            }
            if (n.indexOf(array[i]) == -1) {
                n[n.length] = array[i];
            }
        } else {
            if (n.indexOf(array[i]) == -1) {
                n[n.length] = array[i];
            }
        }
    }
    return n;
}
/*方法二：对象键值对法 速度最快，占用空间最多(原理:相同键的数据被后面的覆盖)*/
function keyAndValueFun(array) {
    var n = {},
    r = [],
    len = array.length,
    val, type;
    for (var i = 0; i < len; i++) {
        val = array[i];
        type = typeof val;
        console.log(n[val]);
        if (!n[val]) {
            n[val] = [type];
            r[r.length] = val;
        } else if (n[val].indexOf(type) < 0) { //判断是否为js对象键时，会自动对传入的键执行“toString()”，不同的键可能会被误认为一样；例如： a[1]、a["1"].
        n[val].push(type);
        r[r.length] = val;
    }
}
return r;
}
/*方法三：数组下标判断法（如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组,此方法其实有点类似遍历法）*/
function arrIndexFun(array) {
    var n = [array[0]];
    //从第二项开始遍历
    for (var i = 1; i < array.length; i++) {
        if (array.indexOf(array[i]) == i) {
            n[n.length] = array[i];
        }
    }
    return n;
}
/*方法四：排序后相邻去除法*/
function neighborFun(array) {
    array.sort();
    var re = [array[0]];
    for (var i = 1; i < array.length; i++) {
        if (array[i] !== re[re.length - 1]) {
            re[re.length] = array[i];
        }
    }
    return re;
}
/*方法五：优化遍历数组法*/
function updateEachFun(array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (array[i] === array[j]) {
                j = ++i;
            }
        }
        console.log(i);
        r.push(array[i]);
    }
    return r;
}
var s = [9, 8, 0, 9, 9, 9, 9, 7, 8];
var r = updateEachFun(s);
console.log(r);
/*数组去重方法集合 end*/
/*身份证校验 start*/
var checkCode = function(val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p.test(val)) {
        var sum = 0;
        for (var i = 0; i < 17; i++) {
            sum += val[i] * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
}

function idCardRex(string) {
    if (checkCode(val)) {
        var date = val.substring(6, 14);
        if (checkDate(date)) {
            if (checkProv(val.substring(0, 2))) {
                return true;
            }
        }
    }
    return false;
}
/*身份证校验 end*/
 /**
    * 判断是否输入汉字和空格
    * @param val 待验证的字符串
    */
    function isCheckChineseAndBlank(val) {
        // const reg = new RegExp('[\u0391-\uFFE5]+|\s+', 'g');
        return /[\u0391-\uFFE5]+|\s+/.test(val);
    }

// 只能有数字和字母
function isOnlyNumberAndLetter(str) {
    const myreg = /^[0-9a-zA-Z]*$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 小于10大于或等于0自动补0 主要用于日期自动补0
 * @param num 数
 * @return 修改后的数字
 */
 function getFullDate(num) {
    if (num < 10 && num >= 0) {
        return '0' + num;
    } else {
        return num;
    }
}
/**
 * 日期格式化
 * @param { Date } value 时间格式为 系统获取的时间
 * @return 格式化后的时间 例如 2017-12-09
 */
 function dateFormatterforDay(value) {
    const year = value.getFullYear();
    const month = getFullDate(value.getMonth() + 1);
    const date = getFullDate(value.getDate());
    const newDate = year + '-' + month + '-' + date;
    return newDate;
}
/**
 * 获取value天前的日期并格式化
 * @param {number} value  多少天前
 * @return value天前格式化后的时间 例如 2017-12-09
 */
 function dateFormatterforDaysAgo(value) {
    const today = new Date();
    const resultDay = new Date(today.getTime() - 1000 * 60 * 60 * 24 * value);
    return dateFormatterforDay(resultDay);
}
/**获取count天前的日期和当天日期
 * @param count 多少天
 */
 function timeForMat(count) {
    let startDate = dateFormatterforDay(new Date()),
    endDate = dateFormatterforDaysAgo(count);
    return {
        t1: endDate,
        t2: startDate
    };
}
/**
 * 获取当前时间的年月日时分秒并日期格式化
 * @return  格式化后的时间 例如 2017-12-09 11:12:12
 */
 function getCurrentAlldateFormatterforDay() {
    const JsonDateValue = new Date();
    const hour = getFullDate(JsonDateValue.getHours());
    const minite = getFullDate(JsonDateValue.getMinutes());
    const second = getFullDate(JsonDateValue.getSeconds());
    const newDate = dateFormatterforDay(JsonDateValue) + ' ' + hour + ':' + minite + ':' + second;
    return newDate;
}
/**获取当前月的最后一天
 * @param {number} y 当前年
 * @param {number} m 当前月
 */
 function getMouthLastDay(y, m) {
    let day = new Date(y, m, 0),
    lastDay = dateFormatterforDay(day),
    lastDaySplit = lastDay.split('-'),
    cellD = parseInt(lastDaySplit[2]);
    return cellD;
}
/**格式化日期为Date 
 * @param {string} value 2017-12-09 
 */
 function formatTimeForDate(value) {
    let all: Date;
    if (value) {
        const a = value.split('-');
        let b = parseInt(a[0]);
        let c = parseInt(a[1]) - 1;
        let d = parseInt(a[2]);
        all = new Date(b, c, d);
    }
    return all;
}

 /**格式化时间为2017/05/07
     * @param value 时间 格式化为2017-05-07
     * @returns 2017/05/07
     */
     function formatDateForYearMonthDay(value) {
        return value.replace(/-/g, '/');
    }

/**获取n个月前的日期，格式为Date
   * @param {number} n 多少个月前
   */
   function getBeforeDate(n: number) {
    let result: Date;
    const current: Date = new Date();
    result = new Date(current.setMonth(current.getMonth() + 1 - n));
    return result;
}
/**每三个字符加一个逗号
 * @param num 需要格式化的数据
 */
 function toThousands(num, n ? : number) {
    if (num !== null && num !== undefined) {
        const numSplit = num.toString().split('.');
        const numDor = numSplit[1] ? '.' + numSplit[1].toString() : '';
        const counts = n || 3;
        let reg = new RegExp('(\\d)(?=(?:\\d{' + counts + '})+$)', 'g');
        return (numSplit[0] || 0).toString().replace(reg, '$1,') + numDor;
    }
    return 0;
}
/**筛选某个字符是否存在
 * @param {string} filter 过滤规则,转义后的字符串
 * @param {string} data 过滤的内容
 */
 function filterCode(filter: string, data: string) {
    let filters = new RegExp(filter, 'g');
    return filters.test(data);
}


/*四舍五入并保留2位小数*/
function getTwoDecimal(value) {
    let num = Math.round(value * 100) / 100,
    numString = num.toString(),
    numSplit = numString.split('.'),
    len = numSplit.length,
    result;
    if (len === 1) {
        result = numString + '.00';
    } else if (len === 2 && numSplit[1].length != 2) {
        result = numString + '0';
    } else if (len === 2 && numSplit[1].length === 2) {
        result = numString;
    } else {
        result = numString;
    }
    return result;
}

/**获取随机数
* @param value 随机的字符串或数组
* @param len 长度
* @param num 返回多少个数，默认1位
*/
function randomNum(value,len,num=1) {
    let leng = value.length,
    code = '';
    if(num){
        for(let i=0; i<num; i++){
            code += value[Math.floor(Math.random()*leng)];
        }

    }else{
        code = Math.floor(Math.random()*leng);

    }
    return code;

}

/*筛选字符串中出现次数最多的字符*/
// 传统写法
function max(str){
    var json={};
    var num=0;
    var value=null;
    for(var i=0;i<str.length;i++){
        var k=str[i];
        if(!json[k]){
            json[k]=[];
        }
        json[k].push(k);
    }
    for(var attr in json){
        if(num<json[attr].length){
            num=json[attr].length;
            value=json[attr][0];
        }
    }
    alert("出现最多的字符是:"+value+',出现次数是:'+num);
};
// 正则表达式写法
function max(str){
    var num=0,value=null,new_str=str.split("").sort().join(""),re=/(\w)\1+/g; //没有\1,re就是一整个排好序的字符串，有了\1就是出现过的有重复的取出来，\1表示跟前面第一个子项是相同的
    new_str.replace(re,function($0,$1){ //$0代表取出来重复的一个个整体，如[s,s...],[f,f..],[d,d....] $1代表这个整体里的字符
        if(num<$0.length){
            num=$0.length;
            value=$1
        }
    });
    alert(value+":"+num)
};

/**
     *数组深拷贝
     *
     * @param {*} obj
     * @returns
     * @memberof FormatterModel
     */
     function getType(obj) {
        //tostring会返回对应不同的标签的构造函数
        var toString = Object.prototype.toString;
        var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        if (obj instanceof Element) {
            return 'element';
        }
        return map[toString.call(obj)];
    }
    function deepClone(data) {
        var type = getType(data);
        var obj;
        if (type === 'array') {
            obj = [];
        } else if (type === 'object') {
            obj = {};
        } else {
            //不再具有下一层次
            return data;
        }
        if (type === 'array') {
            for (var i = 0, len = data.length; i < len; i++) {
                obj.push(this.deepClone(data[i]));
            }
        } else if (type === 'object') {
            for (var key in data) {
                obj[key] = this.deepClone(data[key]);
            }
        }
        return obj;
    }

      /**
     * 判断是否是手机号
     * @param val 要判断的数
     */
    function isPoneAvailable(str) {
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 判断是否正浮点数
     * @param val 要判断的数
     */
    function postitiveFloatPoint(val) {
        const reg = new RegExp('^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$');
        if (reg.test(val)) {
            return true;
        } else {
            return false;
        }
    }

    /**0和正整数
     * @param data 数据
     */
    function isNumber(data) {
        const numberFilter = /(^[0]{1}$)|(^[1-9]+[0-9]*$)/;
        return numberFilter.test(data);
    }

    /**正数
     * @param data 数据
    */
    function isPositiveNumber(data) {
        const dataNumber = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/;
        return dataNumber.test(data);
    }
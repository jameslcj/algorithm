# 用JavaScript实现的一些算法
---
## 寻路算法
### demo演示
![image](https://raw.githubusercontent.com/jameslcj/algorithm/master/findRoad/findRoad.gif)

### 算法原理
- 首先计算出一个点下一步可走地址, 放到一个数组里保存起来
- 过滤掉障碍点, 和已经走过的点
- 利用估值函数算法`f(n) = g(n) + h(n)`计算出一个点到起始点和到终点和的最短距离
- 并且把距离大小和上一步位置记录到对应的对象上, 方便后面绘制路径
- 然后将结果从小到大重新排序, 获取下一步可走点
- 然后递归循环计算路径
- 当到达终点时, 开始绘制路径
- 具体详情请看[源代码](https://github.com/jameslcj/algorithm/blob/master/findRoad/findRoad.js)

### [寻路算法源代码地址](https://github.com/jameslcj/algorithm/blob/master/findRoad/)
---
## 行列式变换算法
### demo演示
![image](https://raw.githubusercontent.com/jameslcj/algorithm/master/changeXY/demo.png)
### 算法原理
- 每个元素的索引位置对行的长度取模
- 根据模的结果, 重新建立数组, 就能实现变换
- 具体详情请看[源代码](https://github.com/jameslcj/algorithm/blob/master/changeXY/index.js)

### [爱消除游戏源代码地址](https://github.com/jameslcj/algorithm/blob/master/changeXY/)

---
## 八皇后问题
### demo演示
![image](https://raw.githubusercontent.com/jameslcj/algorithm/master/eightQueen/demo.gif)
### 算法原理
- 递归计算是否在同行同列同斜线是否有其他皇后存在
- 每次递归后, 要应用回溯的方法, 将棋盘恢复, 方面计算其他方法
- 具体详情请看[源代码](https://github.com/jameslcj/algorithm/blob/master/eightQueen/index.js)

### [八皇后源代码地址](https://github.com/jameslcj/algorithm/blob/master/eightQueen/)

---
## 螺旋矩阵
### demo演示
![image](https://raw.githubusercontent.com/jameslcj/algorithm/master/volution/demo.gif)
### 算法原理
- 算法原理比较简单, 看代码就明白了
- 具体详情请看[源代码](https://github.com/jameslcj/algorithm/blob/master/volution/index.js)

### [螺旋矩阵源代码地址](https://github.com/jameslcj/algorithm/blob/master/volution/)

---
## 排列和组合算法
### 算法原理
- 排列: A(m, n) = m! / (m - n)!
- 组合: C(m, n) = m! / n! * (m - n)!
- 具体详情请看[源代码](https://github.com/jameslcj/algorithm/blob/master/PandC/index.js)

---
## Eratosthenes算法 (寻找一定范围内的所有素数)
### 算法原理
- 先筛选掉范围内能被2整数的数
- 再筛选掉范围内能被3整数的数
- 依次筛选下去, 直到此数的平方大于总数为止, 剩下的数就全是素数
- 具体详情请看[源代码](https://github.com/jameslcj/algorithm/blob/master/Eratosthenes/index.js)

---
## 斐波那契算法

```JavaScript
function test(num) {
	if (num <= 1) {
		return 1;
	}

	return test(num - 1) + test(num - 2)
}

function test(num) {
	var num1 = 1;
	var num2 = 1;
	var num3 = 0;

	for (var i = 0; i < num -2; i ++) {
		num3 = num1 + num2;
		num1 = num2;
		num2 = num3;
	}

	return num3
}
```
---
## 技巧算法
- 不使用第三个变量交换两个变量的值
```JavaScript
var a = 5;
var b = 8;
//第一种
a = a + b;
b = a - b;
a = a - b;

//第二种
a = a | b;
b = a | b;
a = a | b;

//当a和b都不是数字的时候
a = [a, b]
b = a[0]
a = a[1]
```
- 不适用循环方法 输入 3 返回[1, 2, 3]数组
```JavaScript
function test(num) {
	var arr = [];

	arr.push(num);
	if (-- num) {
		arr = test(num).concat(arr);
	}
	return arr
}
//利用闭包 公用一个arr
function test(num) {
	var arr = [];

	return (function() {
		arr.unshift(num);
		if (-- num) {
			arguments.callee(num)
		}
		return arr;
	})()
}
//利用正则
function test(num) {
	var arr = [];
	var resArr = [];
	arr.length = num + 1;
	var str = arr.join('a');
	str.replace(/a/g, function() {
		resArr.unshift(num --);
	})

	return resArr;
}
```

- 利用多种方式获取输入num 当大于100返回100 否则返回num

```JavaScript
function test(num) {
	return num < 100 ? num : 100;
}

function test(num) {
	switch(num < 100) {
		case true:
			return num
		case false:
			return 100;
	}
}

function test(num) {

	return Math.min(num, 100);
}

function test(num) {

	var tmp = num > 100 && 100;
	return tmp || num
}

function test(num) {

	var tmp = num + '';
	for (var i = 2; i < num.length && num > 0;) {
		return 100
	}
	return num;
}

function test(num) {
	var arr = [num, 100];
	arr.sort(function(num1, num2) {
		return num1 - num2;
	})

	return arr[0] 
}

function test(num) {
	var json = {foo: 'bar'}
	var tmp = num > 100 || json;
	for (var i in tmp) {
		return 100
	}
	return num
}
```
---
## 如果觉得不错, 记得点星哦, 谢谢啦. 大家的鼓励才是我继续努力的最大动力
- [转载请注明出处](https://github.com/jameslcj/algorithm)

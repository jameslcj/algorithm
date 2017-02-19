var ul = document.getElementById('ul'),
allLi = document.getElementsByTagName('li'),
size = 8,
len = size * size,
gridSize = 70,
arr = [],
obj = {
    init: function() {
        this.createMap();
        this.findIdentity();
        //变化行列式
        allLi = this.changeXY(allLi);
        this.findIdentity();
        this.printArr()
        console.log(arr)
    },
    createMap: function() {
        ul.style.width = (gridSize + 1) * size + 'px';
        for (var i = 0; i < len; i ++) {
            var li = document.createElement('li');
            li.style.width = gridSize + 'px';
            li.style.height = gridSize + 'px';
            li.className = 'box' + Math.ceil(Math.random() * 5);
            ul.appendChild(li);
        }
    },
    findIdentity: function() {
        //初始化第一个
        var preLi = allLi[0];
        var num = 0;
        for (var i = 0; i < len; i ++) {
            //第一列不进行判断 同时和前一个li的class相同
            if (i % size != 0 && preLi.className == allLi[i].className) {
                num ++;
            } else {
                //计算连续个数 并放入数组 印务第一排不计算 所以num要等于2 j也要等于num
                this.calNum(i, num);
                //清空重新计算
                num = 0;
            }
            //当前li变成前一个li 方便后面计算
            preLi = allLi[i];
        }
        //修复最后连续的bug
        this.calNum(i, num);
    },
    calNum() {
        var i = arguments[0];
        var num = arguments[1];
        if (num >= 2) {
            for (var j = 0; j <= num; j ++) {
                //公式 计算出之前的索引
                var index = i - 1 - j;
                if (this.isInclude(allLi[index])) {
                    //将之前相同的都放入数组
                    arr.unshift(allLi[index]);
                }
            }
        }
    },
    isInclude: function() {
        var param = arguments[0];
        for (var i = 0; i < arr.length; i ++) {
            if (param == arr[i]) {
                return false;
            }
        }
        return true;
    },
    changeXY: function() {
        var arr = arguments[0];
        var newArr = [];
        var iNow = 0;
        //递归变化
        (function() {
            if (iNow == size) {
                return ;
            }
            for (var i = 0; i < len; i ++) {
                //取余
                if (i % size == iNow) {
                    newArr.push(arr[i]);
                }
            }
            iNow ++;
            arguments.callee();
        })()
        return newArr;
    },
    printArr: function() {
        //全部变暗
        for (var i = 0; i < len; i ++) {
            allLi[i].style.opacity = 0.3;
        }
        //只显示连续2个以上的
        for (var i = 0; i < arr.length; i ++) {
            arr[i].style.opacity = 1;
        }
    },
};
obj.init();

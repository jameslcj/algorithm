var gridSize = 50,
queenNum = 8,
input = document.getElementById('input'),
span = document.getElementById('span'),
ul = document.getElementById('ul'),
allLi = document.getElementsByTagName('li'),
count = 0,
collectArr = [],
allCollectArr = [],
obj = {
    init: function() {
        this.createMap();
        // this.bindEvent();
        this.run(0);
        span.innerHTML = count
        this.show();
    },
    show: function() {
        setInterval(function() {
            //还原所有位置
            for (var i = 0, len = allLi.length; i < len; i++) {
                allLi[i].style.backgroundImage = '';
                allLi[i].className = '';
            }
            var randomArr = allCollectArr[Math.floor(Math.random() * allCollectArr.length)];
            for (var i = 0, len = randomArr.length; i < len; i++) {
    			randomArr[i].style.backgroundImage = 'url(img/' + Math.floor((Math.random() * 12 + 1)) + '.jpg)';
    			// randomArr[i].className = 'active';
    			randomArr[i].style.animationDelay = - Math.random() * 2 + 's';
    			randomArr[i].style.webkitAnimationDelay = - Math.random() * 2 + 's';
            }
        }, 2000)
    },
    bindEvent: function() {
        var _this = this;
        input.onchange = function() {
            queenNum = this.value;
            _this.run(0);
        }
    },
    createMap: function() {
        var len = queenNum * queenNum;
        ul.style.width = (gridSize + 1) * queenNum + 'px';
        for (var i = 0; i < len; i ++) {
            var li = document.createElement('li');
            li.style.width = gridSize + 'px';
            li.style.height = gridSize + 'px';
            ul.appendChild(li);
        }
        //打上空白标记
        for (var i = 0; i < queenNum; i ++) {
            for (var j = 0; j < queenNum; j ++) {
                // allLi[queenNum * i + j].innerHTML = -1;
                allLi[queenNum * i + j].index = -1;
                allLi[queenNum * i + j].x = i;
                allLi[queenNum * i + j].y = j;
            }
        }
    },
    //一行一次递归
    run: function() {
        var iQueen = arguments[0];
        //判断是否完成
        if (iQueen == queenNum) {
            // allCollectArr.push(Array.prototype.slice.call(collectArr, 0));
            //深拷贝
            allCollectArr.push(collectArr.concat());
            count ++;
            return ;
        }
        //判断这一行的情况
        for (var i = 0; i < queenNum; i ++) {
            var currQueen = allLi[iQueen * queenNum + i];
            //已被其他皇后映射到 跳过下棋
            if (currQueen.index != -1) {
                continue;
            }
            //如果没有被其他皇后映射 就此皇后占用
            currQueen.index = iQueen;
            // currQueen.innerHTML = iQueen;
            //用于后面展示使用
            collectArr.push(currQueen);
            var x = currQueen.x;
            var y = currQueen.y;
            //判断所有位置 判断是否被其他皇后映射到
            for (var j = 0, len = allLi.length; j < len; j ++) {
                var currObj = allLi[j];
                if (currObj.index != -1 || ! this.isSafe(currQueen, currObj)) {
                    continue;
                }
                //满足条件 打上标记 防止其他皇后占用
                currObj.index = iQueen;
                // currObj.innerHTML = iQueen;
            }
            //递归 查找下一列皇后
            this.run(iQueen + 1);
            //回溯算法 此次计算完毕 还原刚打上标记  以便计算多种情况
            for (var j = 0, len = allLi.length; j < len; j ++) {
                var currObj = allLi[j];
                if (currObj.index == iQueen) {
                    currObj.index = -1;
                    // currObj.innerHTML = -1;
                }
            }
            collectArr.pop();
        }
    },
    //判断是否在同行同列同斜线上
    isSafe: function() {
        var currQueen = arguments[0],
        currObj = arguments[1];
        //同行
        jungle1 = currQueen.x == currObj.x,
        //同列
        jungle2 = currQueen.y == currObj.y,
        //同左斜
        jungle3 = currQueen.x + currQueen.y == currObj.x + currObj.y,
        //同右斜
        jungle4 = currQueen.x - currQueen.y == currObj.x - currObj.y;
        //满足任何一种情况都可以下棋
        if (jungle1 || jungle2 || jungle3 || jungle4) {
            return true;
        }
        
        return false;
    }
};

obj.init();

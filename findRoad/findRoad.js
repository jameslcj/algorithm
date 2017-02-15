//路径图; 1标识起始点, 2 标识终点, 3标识路障
var map = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,2,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
],
cols = Math.sqrt(map.length),
gridSize = 20,
input = document.getElementById('input'),
ul = document.getElementById('ul'),
allLi = document.getElementsByTagName('li'),
beginPos = document.getElementsByClassName('begin'),
endPos =  document.getElementsByClassName('end'),
nextArr = [],
blockArr = [],
routeArr = [],
findRoad = {
    init: function() {
        this.createMap();
        this.bindEvent();
    },
    createMap: function() {
        //固定宽度 有border宽度所以要+1
        ul.style.width = (gridSize + 1) * cols + 'px';
        for (var i = 0, len = map.length; i < len; i ++) {
            var grid = document.createElement('li');
            grid.style.width = gridSize + 'px';
            grid.style.height = gridSize + 'px';
            
            switch (map[i]) {
                case 1:
                    grid.className = 'begin';
                    //记录起始位置
                    nextArr.push(grid);
                    break;
                case 2:
                    grid.className = 'end';
                    break;
                case 3:
                    //记录屏障
                    grid.className = 'block';
                    blockArr.push(grid);
                    break;
                default:
            }
            ul.appendChild(grid);
        }
    },
    bindEvent: function() {
        var _this = this;
        input.onclick = function() {
            _this.findRoad();
        }
    },
    findRoad: function() {
        //获取下一个估值最短位置
        var nextPos = this.getNextPos();
        //到达终点
        if (nextPos == endPos[0]) {
            //绘制正确路径
            this.showLine();
            return false;
        }
        //记录此位置已走过
        this.recordPos2Block(nextPos);
        //计算下一步可走位置
        this.calNextPos(nextPos);
        //重新排序可走位置, 算出最近距离位置
        this.sortNextArr();
        //利用递归查找下一部走法
        this.findRoad();
    },
    showLine: function() {
        //递归绘制路线
        var lastPos = blockArr.pop();
        this.getRouteArr(lastPos);
        var timer = setInterval(function() {
            var pos = routeArr.shift()
            if (! pos) {
                clearInterval(timer);
                return;
            }
            pos.style.background = 'red';
        }, 300);
    },
    //递归绘制路线
    getRouteArr: function() {
        routeArr.unshift(arguments[0]);
        if (arguments[0].parent == beginPos[0]) {
            return;
        }
        this.getRouteArr(arguments[0].parent);
    },
    calNextPos: function() {
        var nowPos = arguments[0],
        enableArr = [];
        for (var i = 0, len = allLi.length; i < len; i ++) {
            if (this.isEnablePos(allLi[i])) {
                enableArr.push(allLi[i]);
            }
        }
        
        for (var i = 0, len = enableArr.length; i < len; i ++) {
            //计算出下一步可走位置
            if (this.calLeftDistance(nowPos, enableArr[i]) <= (gridSize + 1) && this.calTopDistance(nowPos, enableArr[i]) <= (gridSize + 1)) {
                //记录父位置 方便后面绘画路径
                enableArr[i].parent = nowPos;
                //通过估值函数算出此点到终点和起始点的长度
                enableArr[i].num = this.f(enableArr[i]);
                nextArr.push(enableArr[i])
            }
        }
    },
    isEnablePos: function() {
        var pos = arguments[0];
        //过滤掉可走位置
        for (var i = 0, len = nextArr.length; i < len; i ++) {
            if (nextArr[i] == pos) {
                return false;
            }
        }
        //过滤已禁止位置
        for (var i = 0, len = blockArr.length; i < len; i ++) {
            if (blockArr[i] == pos) {
                return false;
            }
        }
        
        return true;
    },
    getNextPos: function() {
        return nextArr.shift();
    },
    sortNextArr: function() {
        nextArr.sort(function(arr1, arr2) {
            return arr1.num - arr2.num;
        });
    },
    recordPos2Block: function() {
        blockArr.push(arguments[0])
    },
    calLeftDistance: function() {
        return Math.abs(arguments[0].offsetLeft - arguments[1].offsetLeft);
    },
    calTopDistance: function() {
        return Math.abs(arguments[0].offsetTop - arguments[1].offsetTop);
    },
    //估值函数 算出此位置到起始点和终点的距离
    f: function() {
        return this.g(arguments[0]) + this.h(arguments[0]);
    },
    //与起始点的距离
    g: function() {
        var param = arguments[0],
        x = this.calLeftDistance(beginPos[0], param),
        y = this.calTopDistance(beginPos[0], param);
        
        return Math.sqrt(x * x + y * y);
    },
    //与终点的距离
    h: function() {
        var param = arguments[0],
        x = this.calLeftDistance(endPos[0], param),
        y = this.calTopDistance(endPos[0], param);
        
        return Math.sqrt(x * x + y * y);
    }
}
//初始化执行
findRoad.init();

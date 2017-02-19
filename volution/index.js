var ul = document.getElementById('ul'),
allLi = document.getElementsByTagName('li'),
gridSize = 50,
size = 8,
len = size * size,
row = 0,
col = 0,
max = size - 1,
min = 0,
arr = [],
bgArr = [],
obj = {
    init: function() {
        this.createMap();
        this.run();
    },
    createMap: function() {
        ul.style.width = (gridSize + 1) * size + 'px';
        for (var i = 0; i < len; i ++) {
            var li = document.createElement('li');
            li.style.width = gridSize + 'px';
            li.style.height = gridSize + 'px';
            ul.appendChild(li);
        }
    },
    run: function() {
        this.dispatch();
        this.createBg();
        this.createAnimation();
    },
    dispatch: function() {
        //螺旋算法
        for (var i = 0; i < len; i ++) {
            arr.push(allLi[size * row + col]);
            allLi[row * size + col].innerHTML = i
            //当行等于最小时, 列小于最大值 列++
            if (row == min && col < max) {
                col ++;
            //当列等于最大时, 行小于最大值 行--
            } else if (col == max && row < max) {
                row ++;
            //当行等于最大时, 列大于最小值 列--
            } else if (row == max && col > min) {
                col --;
            //当列为最小时, 行大于最小值, 行++
            } else if (row > min && col == min) {
                row --;
            }
            
            //min++ max-- 进入新的一轮
            if (col == min && row == (min + 1)) {
                min ++;
                max --;
            }
        }
    },
    createBg: function() {
        for (var i = 0; i < arr.length; i++) {
            //每隔几个位置展现一张图片
            if (i % size == 0) {
                var bg = this.getRandomImg();
                arr[i].style.backgroundImage = bg;
                bgArr.push([i, bg]);
            }
        }
    },
    createAnimation: function() {
        var _this = this;
        setInterval(function() {
            //清空所有图片
            for (var i = 0; i < len; i ++) {
                allLi[i].style.backgroundImage = '';
            }
            
            for (var i = 0; i < bgArr.length; i ++) {
                //如果没有越界 就让其向前移动一格
                if (arr[bgArr[i][0]]) {
                    arr[bgArr[i][0]].style.backgroundImage = bgArr[i][1];
                    bgArr[i][0] += 1;
                } else {
                    //到底了 就删除
                    bgArr.pop();
                    var bg = _this.getRandomImg();
                    //在最前面插入新数据
                    bgArr.unshift([0, bg])
                }
            }
        }, 500);
    },
    getRandomImg: function() {
        return 'url(img/' + Math.ceil(Math.random() * 12)  + '.jpg)';
    }
}
obj.init();

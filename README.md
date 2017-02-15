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
- 具体详情请看[源代码](https://github.com/jameslcj/algorithm/blob/master/findRoad/findRoad.html)

### [寻路算法源代码地址](https://github.com/jameslcj/algorithm/blob/master/findRoad/findRoad.html)
---
# 如果觉得不错, 记得点星哦, 谢谢啦. 大家的鼓励才是我继续努力的动力

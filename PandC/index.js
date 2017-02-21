var data = ['A', 'B', 'C', 'D'],
len = data.length,
resArr = [],
combArr = [],
num = 3,
obj = {
    init: function() {
        //计算排列
        this.getPermutationByNum(num);
        console.log('排列结果: ', resArr, '排列总共数组个数: ', resArr.length)
        this.calPermutationByMath(num);
        //计算组合
        this.getCombinationByNum(num);
        console.log('组合结果: ', combArr, '组合总共数组个数: ', combArr.length)
        this.calCombinationByMath(num);
    },
    getCombinationByNum: function() {
        if (arguments[0] == 0) {
            return [];
        }
        //就取一个直接返回
        if (arguments[0] == 1) {
            combArr = data
            return ;
        }
        var obj = {};
        for (var i = 0; i < resArr.length; i ++) {
            var str = resArr[i].split('').sort().join('');
            if (! obj[str]) {
                combArr.push(str);
                obj[str] = 1;
            }
        }
    },
    getCombination: function() {
        var iNow = arguments[1],
        arr = arguments[2];
        for (var i = 0; i < arr.length; i ++) {
            var str = arguments[0],
            copArr = Array.prototype.slice.call(arr, 0);
            str += copArr.splice(i, 1); 
            
            //满足要求
            if (iNow == num) {
                this.isUniqueArr(str) && combArr.push(str);
            } else {
                // console.log(str, copArr)
                this.getAllPermutation(str, iNow + 1, copArr)
            }
        }
    },
    isUniqueArr: function() {
        var str = arguments[0],
        obj = {};
        for (var i = 0; i < combArr.length; i ++) {
        }
        
        return true;
    },
    //利用数学方式计算组合 C(3, 4) ==> 4! / 3! * (4-3)!
    calCombinationByMath: function() {
        var pickNum = arguments[0];
        var res = this.factorial(len) / (this.factorial(pickNum) * this.factorial(len - pickNum));
        console.log('数学结果: ', res);
        
    },
    //利用数学方式计算排列 A(3, 4) ==> 4! / (4-3)!
    calPermutationByMath: function() {
        var pickNum = arguments[0];
        var res = this.factorial(len) / this.factorial(len - pickNum);
        console.log('数学结果: ', res);
        
    },
    //计算阶乘
    factorial: function() {
        var iNum = arguments[0];
        if (iNum <= 1) {
            return 1;
        }
        
        return this.factorial(iNum - 1) * iNum;
    },
    getPermutationByNum: function() {
        if (arguments[0] == 0) {
            return [];
        }
        //就取一个直接返回
        if (arguments[0] == 1) {
            resArr = data
            return ;
        }
        this.getAllPermutation('', 1, data);
    },
    getAllPermutation: function() {
        var iNow = arguments[1],
        arr = arguments[2];
        for (var i = 0; i < arr.length; i ++) {
            var str = arguments[0],
            copArr = Array.prototype.slice.call(arr, 0);
            str += copArr.splice(i, 1); 
            
            //满足要求
            if (iNow == num) {
                resArr.push(str);
            } else {
                // console.log(str, copArr)
                this.getAllPermutation(str, iNow + 1, copArr)
            }
        }
    },
};
obj.init();

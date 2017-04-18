const MAX = 100;


(function() {
    document.write("普通算法结果:")
    for (var i = 1; i <= MAX; i ++) {
        for (var j = 2; j * j <= i; j ++) {
            if (i % j === 0) {
                break;
            }
        }
        
        if (j * j > i) {
            document.write(" " +  i + " ");
        }
    }
})()

document.write("<br>");
document.write("<br>");

(function() {
    var arr = [];
    for (var i = 1; i <= MAX; i ++) {
        arr[i] = 1;
    }
    
    for (var i = 2; i * i <= MAX; i ++) {
        if (! arr[i]) {
            continue;
        }
        for (var j = i * 2; j <= MAX; j ++) {
            if (! arr[j]) {
                continue;
            }
            if (j % i === 0) {
                arr[j] = 0;
            }
        }
    }
    document.write("Eratosthenes算法结果:")
    for (var i = 0; i <= MAX; i ++) {
        if (! arr[i]) {
            continue;
        }
        document.write(" " +  i + " ");
    }
})();

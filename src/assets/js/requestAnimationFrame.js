/**
 * raf是window.requestAnimationFrame的引用
 * caf是window.cancelAnimationFrame的引用
 */
let raf,caf;

var lastTime = 0;
var vendors = ['webkit', 'moz'];

raf=window.requestAnimationFrame;
for(var x = 0; x < vendors.length && !raf; ++x) {
    raf = window[vendors[x] + 'RequestAnimationFrame'];
    caf = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
          window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!raf) {
    raf = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
if (!caf) {
    caf = function(id) {
        clearTimeout(id);
    };
}

module.exports={
    raf,
    caf
}
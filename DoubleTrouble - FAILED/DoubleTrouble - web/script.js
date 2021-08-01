var a = 0;
var x = 200;
var y = 200;
var r = 100;
var b = 16;
var s = 0.03;

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, 800, 450);
    
    a = a + s > Math.PI * 2 ? 0 : a + s;
    
    ctx.beginPath();
    ctx.arc((Math.sin(a) * r) + x, (Math.cos(a) * r) + y, b, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgb(0, 122, 222)';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(0, 87, 158)';
    ctx.stroke();
    
    window.requestAnimationFrame(draw);
}

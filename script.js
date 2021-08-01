/*jshint esversion: 6 */

// var colors = [
//     '#FFADAD',
//     '#FFD6A5',
//     '#FDFFB6',
//     '#CAFFBF',
//     '#9BF6FF',
//     '#A0C4FF',
//     '#BDB2FF',
//     '#FFC6FF'
// ];
var colors = [
    '#FF6565',
    '#FFB65C',
    '#FAFF6D',
    '#89FF71',
    '#54F1FF',
    '#5898FF',
    '#7F69FF',
    '#FF7AFF'
];
var spar = '#ADC1B7';
var pendulums = [];
_ = undefined;

function init() {
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'overlay';

    colors.forEach(function callback(color, i) {
        pendulums.push(new DoublePendulum(ctx, _, _, (180.5 + i * 0.5) * (Math.PI / 180), _, _, color, spar, _, _, _, _, _, _, _, _, _, _, 0, 12, _, _, _, _, _, _, _, _, _, _, _, 0, 0, 0));
        pendulums[i].draw();
    });
}

var active = false;
var reset = false;
document.addEventListener('keydown', (event) => {
    if (event.code == "Space") {
        active = !active;
        draw();
    } else if (event.code == "F5") {
        active = false;
        reset = true;
    }
}, false);

function draw() {
    this.ctx.clearRect(0, 0, 800, 800);
    pendulums.forEach(p => {
        p.step();
        p.draw();
    });

    if (active)
        window.requestAnimationFrame(draw);
    else if (reset) {
        this.ctx.clearRect(0, 0, 800, 800);
        pendulums.forEach(p => {
            p.reset();
            p.draw();
        });
    }
}
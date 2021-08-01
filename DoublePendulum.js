/*jshint esversion: 6 */

class DoublePendulum {
    constructor(ctx,
        x0 = 400,
        y0 = 400,
        a = undefined,
        a1 = 179.5 * (Math.PI / 180),
        a2 = -179.5 * (Math.PI / 180),
        c = undefined, c1 = '#889B93', c2 = '#C2DEDE', c3 = '#889B93', c4 = '#ACDEDE',
        r = undefined, r1 = 130, r2 = 130,
        L = undefined, L1 = 1.3, L2 = 1.3,
        s = undefined, s1 = 24, s2 = 24,
        m = undefined, m1 = 0.4, m2 = 0.05,
        g = 9.81,
        e = undefined, e1 = 0, e2 = 0,
        w = undefined, w1 = 0, w2 = 0,
        length = 64,
        d1 = 4, d2 = 10, d3 = 5
    ) {
        this.ctx = ctx;
        if (a == undefined) {
            this.A1 = a1;
            this.A2 = a2;
        } else {
            this.A1 = a;
            this.A2 = a;
        }
        this.a1 = this.A1;
        this.a2 = this.A2;
        if (c == undefined) {
            this.c2 = c2;
            this.c3 = c3;
            this.c4 = c4;
        } else {
            this.c2 = c;
            this.c3 = c;
            this.c4 = c;
        }
        this.c1 = c1;
        this.x0 = x0;
        this.y0 = y0;
        if (r == undefined) {
            this.r1 = r1;
            this.r2 = r2;
        } else {
            this.r1 = r;
            this.r2 = r;
        }
        if (L == undefined) {
            this.L1 = L1;
            this.L2 = L2;
        } else {
            this.L1 = L;
            this.L2 = L;
        }
        if (s == undefined) {
            this.s1 = s1;
            this.s2 = s2;
        } else {
            this.s1 = s;
            this.s2 = s;
        }
        if (m == undefined) {
            this.m1 = m1;
            this.m2 = m2;
        } else {
            this.m1 = m;
            this.m2 = m;
        }
        this.g = g;
        if (e == undefined) {
            this.E1 = e1;
            this.E2 = e2;
        } else {
            this.E1 = e;
            this.E2 = e;
        }
        this.e1 = this.E1;
        this.e2 = this.E2;
        if (w == undefined) {
            this.W1 = w1;
            this.W2 = w2;
        } else {
            this.W1 = w;
            this.W2 = w;
        }
        this.w1 = this.W1;
        this.w2 = this.W2;
        this.tail = [
            [],
            []
        ];
        this.length = length;
        this.t0 = 0;
        this.d1 = d1;
        this.d2 = d2;
        this.d3 = d3;
    }

    reset() {
        this.t0 = 0;
        this.a1 = this.A1;
        this.a2 = this.A2;
        this.e1 = this.E1;
        this.e2 = this.E2;
        this.w1 = this.W1;
        this.w2 = this.W2;
        this.tail = [
            [],
            []
        ];
    }

    draw() {
        var x1 = (Math.sin(this.a1) * this.r1) + this.x0;
        var y1 = (Math.cos(this.a1) * this.r1) + this.y0;

        var x2 = (Math.sin(this.a2) * this.r2) + x1;
        var y2 = (Math.cos(this.a2) * this.r2) + y1;

        this.tail.push([x2, y2]);
        while (this.tail.length > this.length)
            this.tail.shift();

        this.ctx.beginPath();
        this.ctx.moveTo(this.tail[0][0], this.tail[0][1]);
        this.tail.forEach(element => {
            this.ctx.lineTo(element[0], element[1]);
        });
        this.ctx.lineWidth = this.d3;
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.c4;
        if (this.d3 > 0)
            this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x0, this.y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineWidth = this.d2;
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.c1;
        if (this.d2 > 0)
            this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(x1, y1, this.s1, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.c2;
        this.ctx.fill();
        this.ctx.lineWidth = this.d1;
        this.ctx.strokeStyle = this.c3;
        if (this.d1 > 0)
            this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(x2, y2, this.s2, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.c2;
        this.ctx.fill();
        this.ctx.lineWidth = this.d1;
        this.ctx.strokeStyle = this.c3;
        if (this.d1 > 0)
            this.ctx.stroke();
    }

    step() {
        if (this.t0 == 0) this.t0 = new Date().getTime();
        var t1 = new Date().getTime();
        var dt = Math.min(0.04, (t1 - this.t0) / 1500);
        this.t0 = t1;

        this.e1 = (-this.g * (2 * this.m1 + this.m2) * Math.sin(this.a1) - this.m2 * this.g * Math.sin(this.a1 - 2 * this.a2) - 2 * Math.sin(this.a1 - this.a2) * this.m2 * (this.w2 * this.w2 * this.L2 + this.w1 * this.w1 * this.L1 * Math.cos(this.a1 - this.a2))) / (this.L1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2)));
        this.e2 = (2 * Math.sin(this.a1 - this.a2) * (this.w1 * this.w1 * this.L1 * (this.m1 + this.m2) + this.g * (this.m1 + this.m2) * Math.cos(this.a1) + this.w2 * this.w2 * this.L2 * this.m2 * Math.cos(this.a1 - this.a2))) / (this.L2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2)));

        this.w1 = this.w1 + this.e1 * dt;
        this.w2 = this.w2 + this.e2 * dt;
        this.a1 = this.a1 + this.w1 * dt;
        this.a2 = this.a2 + this.w2 * dt;
    }

}
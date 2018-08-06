class Ball {
    static get ANGLE360() {
        return 6.283185307179586;
    }

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.collisionPoint = [
            {x: radius, y: 0},  // 0
            {x: 0.866 * radius, y: 0.5 * radius},  // 30
            {x: 0.5 * radius, y: 0.866 * radius},  // 60
            {x: 0, y: radius},  // 90
            {x: -0.5 * radius, y: 0.866 * radius},  // 120
            {x: -0.866 * radius, y: 0.5 * radius},  // 150
            {x: -radius, y: 0},  // 180
            {x: -0.866 * radius, y: -0.5 * radius},  // 210
            {x: -0.5 * radius, y: -0.866 * radius},  // 240
            {x: 0, y: -radius},  // 270
            {x: 0.5 * radius, y: -0.866 * radius},  // 300
            {x: 0.866 * radius, y: -0.5 * radius}  // 330
        ]
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Ball.ANGLE360);

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore();
    }

    isCollide(ctx) {
        let flag = false;
        this.collisionPoint.forEach((point) => {
            if (!flag) {
                const cx = this.x + point.x;
                const cy = this.y + point.y;

                flag = ctx.isPointInPath(cx, cy);
            }
        });
        return flag;
    }

    move () {
        this.x += this.vx;
        this.y += this.vy;

        // 下の壁の跳ね返りチェック (あとから削除)
        if (this.y + this.radius > WINDOW_HEIGHT) {
            this.y -= (this.y + this.radius) - WINDOW_HEIGHT;
            this.vy = -this.vy;
        }
        // 右の壁の跳ね返りチェック
        if (this.x + this.radius > WINDOW_WIDTH) {
            this.x -= (this.x + this.radius) - WINDOW_WIDTH;
            this.vx = -this.vx;
        }
        // 上の壁の跳ね返りチェック
        if (this.y - this.radius < 0) {
            this.y -= this.y - this.radius;
            this.vy = -this.vy;
        }
        // 左の壁の跳ね返りチェック
        if (this.x - this.radius < 0) {
            this.x -= this.x - this.radius;
            this.vx = -this.vx;
        }
    }

    start() {
        if (this.vx !== 0 || this.vy !== 0) {
            return;
        }

        this.vx = 1.4142;
        this.vy = 1.4142;
    }
}

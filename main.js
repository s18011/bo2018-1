const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;

const input = new Input();
const ball = new Ball(400, 300, 10, 'red');

window.setInterval(game_tick, SPF);

function game_tick () {
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start();
    }


    // 各種オブジェクトの移動
    ball.move();


    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    ball.draw(ctx)
}
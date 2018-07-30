const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

const ball = new Ball(400, 300, 10, 'red');
ball.draw(ctx);
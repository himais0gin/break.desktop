// ゲームのロジックを記述

// Canvas要素を取得
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// パドルの初期位置とサイズ
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// ボールの初期位置と移動速度
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height - 30;
var ballSpeedX = 2;
var ballSpeedY = -2;

// パドルを描画する関数
function drawPaddle() {
  context.beginPath();
  context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

// ボールを描画する関数
function drawBall() {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

// ゲームの描画を更新する関数
function draw() {
  // Canvasをクリア
  context.clearRect(0, 0, canvas.width, canvas.height);

  // パドルとボールを描画
  drawPaddle();
  drawBall();

  // ボールの位置を更新
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // ボールが画面外に出ないように反射させる
  if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY + ballSpeedY < ballRadius) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
    // ボールがパドルに当たった場合
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballSpeedY = -ballSpeedY;
    } else {
      // ボールがパドルに当たらず画面下に到達した場合はゲームオーバー
      alert("ゲームオーバー");
      document.location.reload();
    }
  }

  // パドルを動かす
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

// キーボードの状態を監視する変数
var rightPressed = false;
var leftPressed = false;

// キーボードのイベントリスナーを設定
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// キーが押されたときに呼び出される関数
function keyDownHandler(event) {
  if (event.key == "ArrowRight") {
    rightPressed = true;
  } else if (event.key == "ArrowLeft") {
    leftPressed = true;
  }
}

// キーが離されたときに呼び出される関数
function keyUpHandler(event) {
  if (event.key == "ArrowRight") {
    rightPressed = false;
  } else if (event.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// 指定された間隔でゲームを更新する関数を呼び出す
setInterval(draw, 10);

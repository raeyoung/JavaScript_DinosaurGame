var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var message = document.createElement('div');
message.innerText = 'Game Over!! 너무 못한당 후헿헿';
message.id = 'gameOver';


canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var miffy = new Image();
miffy.src = "miffy.png";

// 공룡 등장 좌표
var dino = {
    x: 10,
    y: 200,
    width: 55,
    height: 95,
    draw() {
        //ctx.fillStyle = 'skyblue';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(miffy, this.x, this.y, this.width, this.height);
    }
}

var flower = new Image();
flower.src = "flower.png";


// 장애물
class Cacuts {
    constructor() {
        this.x = 500;
        this.y = 270;
        this.width = 30;
        this.height = 30;
    }
    draw() {
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(flower, this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var cacutsArray = [];
var jumpTimer = 0;
var animation;

// 프레임마다 실행
function MoveDino() {
    // 애니메이션 : 1초에 60번 정도 x++ 하면 움직이는 것처럼 보이는 함수
    animation = requestAnimationFrame(MoveDino);
    timer++;

    // 캔버스 새로 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // 해당 프레임마다 실행
    if(timer % 200 == 0) {
        var cacuts = new Cacuts();
        cacutsArray.push(cacuts);
    }

    // 장애물이 반복적으로 그려짐
    cacutsArray.forEach((c, i, o) => {
        // x좌표가 0미만인 경우 장애물 제거 (필요없는 장애물 제거)
        if(c.x < 0) {
            o.slice(i, 1);
        }
        c.x--;

        // 충돌여부 체크는 공룡과 모든 장애물과의 x, y좌표를 체크해야함 
        isCollision(dino, c);

        c.draw();
    });

    if(jump == true) {
        dino.y-= 4;
        jumpTimer++;
    }
    if(jump == false) {
        // 땅 높이 고정 
        if(dino.y < 200) {
            dino.y+= 4;    
        }
        
    }
    // 해당 프레임이 지나면 점프 중단
    if(jumpTimer > 30) {
        jump = false;
        jumpTimer = 0;
    }
    
    dino.draw();
}
MoveDino();

// 장애물과의 충돌 확인
function isCollision(dino, cacuts) {
    var xDifference = cacuts.x - (dino.x + dino.width); 
    var yDifference = cacuts.y - (dino.y + dino.height); 

    // 충돌했으면 캔버스 클리어
    if(xDifference < 0 && yDifference < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.canvas.width = ctx.canvas.width;
        //ctx.beginPath();
        cancelAnimationFrame(animation);

        document.body.appendChild(message);
    }
}

// 스페이스바를 누를 때마다 공룡 점프
var jump = false;
document.addEventListener('keydown', function(e) {
    if(e.code === 'Space' ) {
        jump = true;
    }
})
document.addEventListener("touchstart", function(e) {
    jump = true;

})
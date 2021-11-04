var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gameAgainBtn = document.getElementById('gameAgainBtn');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 500;

var miffy = new Image();
miffy.src = "image/miffy.png";

// 미피 등장 좌표
var Miffy = {
    x: 50,
    y: 200,
    width: 70,
    height: 110,
    draw() {
        ctx.drawImage(miffy, this.x, this.y, this.width, this.height);
    }
}

var bomb = new Image();
bomb.src = "image/bomb.png";


// 장애물
class Cacuts {
    constructor() {
        this.x = 900;
        this.y = 270;
        this.width = 40;
        this.height = 40;
    }
    draw() {
        ctx.drawImage(bomb, this.x, this.y, this.width, this.height);
    }
}

var cloud = new Image();
cloud.src = "image/cloud.png";

// 구름
class Clouds {
    constructor() {
        this.x = 700;
        this.y = 150;
        this.width = 80;
        this.height = 80;
    }
    draw() {
        ctx.drawImage(cloud, this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var cacutsArray = [];
var cloudsArray = [];
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
        var clouds = new Clouds();
        cacutsArray.push(cacuts);
        cloudsArray.push(clouds);
    }

    // 장애물이 반복적으로 그려짐
    cacutsArray.forEach((c, i, o) => {
        // x좌표가 0미만인 경우 장애물 제거 (필요없는 장애물 제거)
        if(c.x < 0) {
            cacutsArray = o.slice((o.length-1)*-1);
        }
        c.x-= 2;

        // 충돌여부 체크는 공룡과 모든 장애물과의 x, y좌표를 체크해야함 
        isCollision(Miffy, c);

        if(window.innerWidth < 1000) {
            c.y = 150; 
        }
        
        c.draw();
    });

    cloudsArray.forEach((c, i, o) => {
        // x좌표가 0미만인 경우 장애물 제거 (필요없는 장애물 제거)
        if(c.x < 0) {
            o.slice(i, 1);
        }
        c.x-= 1;

        if(window.innerWidth < 1000) {
            c.y = 50; 
        }

        c.draw();
    });

    if(jump == true) {
        Miffy.y-= 5;
        jumpTimer++;
    }
    if(jump == false) {
        // 땅 높이 고정 
        if(Miffy.y < 200) {
            Miffy.y += 4;    
        }
        
    }
    // 해당 프레임이 지나면 점프 중단
    if(jumpTimer > 40) {
        jump = false;
        jumpTimer = 0;
    }

    if(window.innerWidth < 1000) {
        Miffy.x = 20;
        Miffy.y = 100;
        Miffy.width = 50;
        Miffy.height = 90;
    }
    
    Miffy.draw();
}
MoveDino();

// 장애물과의 충돌 확인
function isCollision(Miffy, cacuts) {
    var xDifference = cacuts.x - (Miffy.x + Miffy.width); 
    var yDifference = cacuts.y - (Miffy.y + Miffy.height); 

    // 충돌했으면 캔버스 클리어
    if(xDifference < 0 && yDifference < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);

        // clearRect 버그로 대체
        //canvas.style.display = 'none';
        gameOverWarpper.style.display = 'block';
    }
}

gameAgainBtn.addEventListener('click', function() {
    location.reload();
})

// 스페이스바를 누를 때마다 공룡 점프
var jump = false;
document.addEventListener('keydown', function(e) {
    if(e.code === 'Space' ) {
        jump = true;
    }
});

// 모바일 전용
document.addEventListener("touchstart", function() {
    jump = true;

});

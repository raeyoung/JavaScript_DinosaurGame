let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 공룡 등장 좌표
let dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}



// 장애물
class Cacuts {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let cacutsArray = [];

// 프레임마다 실행
function MoveDino() {
    // 애니메이션 : 1초에 60번 정도 x++ 하면 움직이는 것처럼 보이는 함수
    requestAnimationFrame(MoveDino);
    timer++;

    // 캔버스 새로 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // 120 프레임마다 실행
    if(timer % 120 == 0) {
        let cacuts = new Cacuts();
        cacutsArray.push(cacuts);
    }

    // 장애물이 반복적으로 그려짐
    cacutsArray.forEach((c) => {
        c.x--;
        c.draw();
    });
    dino.draw();
}
MoveDino();
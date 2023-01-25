import { pigGameLevel } from "./app.js";
import { storyCanvas } from "./app.js";

let canvas = document.querySelector(".pighomegame-canvas");
let storycanvas = document.querySelector(".story-canvas");

/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

canvas.width = 1400;
canvas.height = 700;
// document.body.appendChild(canvas);

// 오디오
let pig1clearaudio = document.querySelector("#pighomeclearbgm");  
//주인공 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
let pigX = canvas.width / 2 - 52;
let pigY = canvas.height - 100;
let pigSpeed = 8;
let score = 0;

// 설정 옵션들 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
let start = false; // 게임 스타트화면 위한 변수
let clearScore = 1; // 클리어점수
let clear = false; // 게임 클리어 변수
let level = 0; // 게임 레벨 변수
// document.addEventListener("load", function(){
//     storyCanvas.checkCurPage = (page) => {
//         if(page===4){
//                level = 0;
//         }
//         else if(page === 5){
//                level = 1;
//         }
//         else if(page === 6){
//                level = 2;
//         }
//     }
// })
console.log(level);
let monster = false; // 몬스터생성 한번하기위한 변수
let monsterlevel = 1; // 몬스터 속도레벨
let heartmove = canvas.height * 0.042; // 하트게이지이동속도
//이미지 파일들 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
let backgroundImage, babypigImage, houseImage1, houseImage2, houseImage3, item1Image, item2Image, item3Image, wolfImage, gamestartImage
    , heart7, clearString;
let gameclearList = []; // 게임 클리어 화면들 리스트

//이미지 로드ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function loadImg() {

    backgroundImage = new Image();
    backgroundImage.src = "img/000.png";

    babypigImage = new Image();
    babypigImage.src = "img/pig.png";

    houseImage1 = new Image();
    houseImage1.src = "img/house1.png"
    gameclearList.push(houseImage1);

    houseImage2 = new Image();
    houseImage2.src = "img/house2.png"
    gameclearList.push(houseImage2);

    houseImage3 = new Image();
    houseImage3.src = "img/house3.png"
    gameclearList.push(houseImage3);

    item1Image = new Image();
    item1Image.src = "img/itme1.png";

    item2Image = new Image();
    item2Image.src = "img/item2.png";

    item3Image = new Image();
    item3Image.src = "img/item3.png";

    wolfImage = new Image();
    wolfImage.src = "img/wolf.png";

    gamestartImage = new Image();
    gamestartImage.src = "img/start.png";

    clearString = new Image();
    clearString.src = "img/clearString.png"

    heart7 = new Image();
    heart7.src = "img/heart7.png"


};
function randomValue(min, max) { // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ랜덤 생성 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
};
function randomValue2(min, max) {
    let randomNum2 = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum2;
};
function randomValue3(min, max) {
    let randomNum3 = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum3;
};

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
let KeysDown = {}; // 누른 키 저장 공간
function setupKeyboardListener() { // 키 누름 + 뗌
    document.addEventListener("keydown", function (e) {
        KeysDown[e.keyCode] = true;
    });
    document.addEventListener("keyup", function (e) {
        delete KeysDown[e.keyCode];

        // if (e.keyCode == 32) { // 스페이스바 
        //     createBullet();
        // }
        if(canvas.classList.contains("d-none")){
            e.preventDefault();
            console.log("게임등장");
        }
        else if (e.keyCode === 13) { // 엔터키 
            start = true;
            monster = true;
            // starter.classList.add(HIDDEN_CLASSNAME);
        }
    });
};

let wolfList = []; //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡwolfㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function Wolf() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.y = 0;
        this.x = randomValue(0, canvas.width - 64);
        wolfList.push(this);
    };
    this.update = function () {
        this.y += 10;
    };
    this.checkHit = function () {
        for (let i = 0; i < wolfList.length; i++) {
            if (pigY <= wolfList[i].y + 20 && wolfList[i].y <= pigY + 30 && pigX + 30 >= wolfList[i].x && pigX - 60 <= wolfList[i].x) {
                wolfList.splice(i, 1) // 부딪힌 wolf 제거
                if (level == 0) {
                    score -= 5;
                    heartGauge.y += heartmove * 20;
                }
                else if (level == 1) {
                    score -= 5;
                    heartGauge.y += heartmove * 10;
                }
                else if (level == 2) {
                    score -= 10;
                    heartGauge.y += heartmove * 10;
                }
            };
        };
        for (let i = 0; i < wolfList.length; i++) {
            if (wolfList[i].y > canvas.height - 100) { // 화면넘어간 wolf 제거
                wolfList.splice(i, 1)
            };
        };
    };
};
let item1List = []; //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡitem1ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function Item1() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.y = 0;
        this.x = randomValue(0, canvas.width - 64);
        item1List.push(this);
    };
    this.update = function () {
        this.y += 4;
    };
    this.checkHit = function () {
        for (let i = 0; i < item1List.length; i++) {
            if (pigY <= item1List[i].y + 15 && item1List[i].y <= pigY + 25 && pigX + 25 >= item1List[i].x && pigX - 55 <= item1List[i].x) {
                item1List.splice(i, 1) // 부딪힌 item1 제거
                if (level == 0) {
                    score += 1;
                    heartGauge.y -= heartmove * 4;
                }
                else if (level == 1) {
                    score -= 1;
                    heartGauge.y += heartmove * 2;
                }
                else if (level == 2) {
                    score -= 1;
                    heartGauge.y += heartmove;
                }
            };
        };
        for (let i = 0; i < item1List.length; i++) {
            if (item1List[i].y > canvas.height - 50) { // 화면넘어간 imte1 제거
                item1List.splice(i, 1)
            };
        };
    };
};
let item2List = []; //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡitem2ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function Item2() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.y = 0;
        this.x = randomValue(0, canvas.width - 64);
        item2List.push(this);
    };
    this.update = function () {
        this.y += 6;
    };
    this.checkHit = function () {
        for (let i = 0; i < item2List.length; i++) {
            if (pigY <= item2List[i].y + 15 && item2List[i].y <= pigY + 25 && pigX + 25 >= item2List[i].x && pigX - 55 <= item2List[i].x) {
                item2List.splice(i, 1) // 부딪힌 item2 제거
                if (level == 0) {
                    score -= 1;
                    heartGauge.y += heartmove * 4;
                }
                else if (level == 1) {
                    score += 1;
                    heartGauge.y -= heartmove * 2;
                }
                else if (level == 2) {
                    score -= 1;
                    heartGauge.y += heartmove;
                }
            };
        };
        for (let i = 0; i < item2List.length; i++) {
            if (item2List[i].y > canvas.height - 50) { // 화면넘어간 imte2 제거
                item2List.splice(i, 1)
            };
        };
    };
};
let item3List = []; //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡitem3ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function Item3() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.y = 0;
        this.x = randomValue(0, canvas.width - 64);
        item3List.push(this);
    };
    this.update = function () {
        this.y += 8;
    };
    this.checkHit = function () {
        for (let i = 0; i < item3List.length; i++) {
            if (pigY <= item3List[i].y + 15 && item3List[i].y <= pigY + 25 && pigX + 25 >= item3List[i].x && pigX - 55 <= item3List[i].x) {
                item3List.splice(i, 1) // 부딪힌 item3 제거
                if (level == 0) {
                    score -= 1;
                    heartGauge.y += heartmove * 4;
                }
                else if (level == 1) {
                    score -= 1;
                    heartGauge.y += heartmove * 2;
                }
                else if (level == 2) {
                    score += 1;
                    heartGauge.y -= heartmove;
                }
            };
        };
        for (let i = 0; i < item3List.length; i++) {
            if (item3List[i].y > canvas.height - 50) { // 화면넘어간 imte3 제거
                item3List.splice(i, 1)
            };
        };
    };
};


function createItem() { // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ몬스터 생성ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const interval = setInterval(function () {
        let m = new Item1();
        m.init();
    }, 320 * monsterlevel)
    const interval2 = setInterval(function () {
        let m2 = new Item2();
        m2.init();
    }, 320 * monsterlevel)
    const interval3 = setInterval(function () {
        let m3 = new Item3();
        m3.init();
    }, 320 * monsterlevel)
    const interval4 = setInterval(function () {
        let m4 = new Wolf();
        m4.init();
    }, 500 * monsterlevel)
};


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ좌표값 업데이트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function update() {
    if (39 in KeysDown) { //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ주인공좌표ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
        pigX += pigSpeed;
        if (pigX > canvas.width - 60)
            pigX = canvas.width - 60;
    };
    if (37 in KeysDown) {
        pigX -= pigSpeed;
        if (pigX < 0)
            pigX = 0;
    };
    if (38 in KeysDown) {
        pigY -= pigSpeed;
        if (pigY < 0)
            pigY = 0;
    };
    if (40 in KeysDown) {
        pigY += pigSpeed;
        if (pigY > canvas.height - 70)
            pigY = canvas.height - 70;
    };
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ아이탬들 좌표 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    for (let i = 0; i < item1List.length; i++) {
        item1List[i].update();
        item1List[i].checkHit();
    }
    for (let i = 0; i < item2List.length; i++) {
        item2List[i].update();
        item2List[i].checkHit();
    }
    for (let i = 0; i < item3List.length; i++) {
        item3List[i].update();
        item3List[i].checkHit();
    }
    for (let i = 0; i < wolfList.length; i++) {
        wolfList[i].update();
        wolfList[i].checkHit();
    }

};

function render() { //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 이미지 그리기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경
    heartGauge.draw();
    ctx.drawImage(babypigImage, pigX, pigY); // 종이비행기
    ctx.fillStyle = "rgba(255,99,71, 0.3)";
    ctx.fillText(`${String(score).padStart(2, '0')} / ${String(clearScore).padStart(2, '0')}`, canvas.width - canvas.width / 1.42, canvas.height - canvas.height / 2); // 점수
    ctx.font = `bold ${canvas.width / 8}px Arial, sans-serif`;

    for (let i = 0; i < item1List.length; i++) { // item1 그리기
        ctx.drawImage(item1Image, item1List[i].x, item1List[i].y)
    }
    for (let i = 0; i < item2List.length; i++) { // item2 그리기
        ctx.drawImage(item2Image, item2List[i].x, item2List[i].y)
    }
    for (let i = 0; i < item3List.length; i++) { // item3 그리기
        ctx.drawImage(item3Image, item3List[i].x, item3List[i].y)
    }
    for (let i = 0; i < wolfList.length; i++) { // 울프 그리기
        ctx.drawImage(wolfImage, wolfList[i].x, wolfList[i].y)
    }
}
let heartGauge = {     // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 하트게이지 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    x: canvas.width - 100,
    y: canvas.height - 100,
    draw() {
        ctx.fillStyle = "rgba(250, 152, 154, 0.15)"
        ctx.fillRect(canvas.width - 110, 0, 128, canvas.height)
        ctx.drawImage(heart7, this.x, this.y)
        if (level == 0)
            ctx.drawImage(houseImage1, canvas.width - 100, canvas.height * 0.005, 88, 88)
        else if (level == 1)
            ctx.drawImage(houseImage2, canvas.width - 100, canvas.height * 0.005, 88, 88)
        else if (level == 2)
            ctx.drawImage(houseImage3, canvas.width - 100, canvas.height * 0.005, 88, 88)
    }
}


function startPage() { //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 게임 시작 전 첫번째 화면ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    ctx.drawImage(gamestartImage, 0, 0, canvas.width, canvas.height);
    ctx.fillText(`Level 『${level + 1}』`, canvas.width - canvas.width / 1.05, canvas.height - canvas.height / 1.2)
    ctx.fillStyle = "rgba(54, 87, 158,0.8)";
    ctx.font = `bold ${canvas.width / 30}px Arial, sans-serif`
    wolfList = [];
    item1List = [];
    item2List = [];
    item3List = [];
    pigX = canvas.width / 2 - 52;
    pigY = canvas.height - 100;


}


function gameClear() { // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ클리어 화면ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    for (let i = 0; i < gameclearList.length; i++) {
        if (level == i) {
            ctx.drawImage(gameclearList[i], 0, 0, canvas.width, canvas.height);
            ctx.drawImage(clearString, 0, 0, canvas.width, canvas.height)
        };
    }; 
    pig1clearaudio.play();
    clear = false;
    score = 0;      
    level++;
    start = false;
    heartGauge.y = canvas.height - 100;
    monsterlevel = 7;
};

function clearCheck() {
    if (score < 0) score = 0;
    if (heartGauge.y > canvas.height - 100) heartGauge.y = canvas.height - 100;
    if (level == 0 && score >= clearScore) {
        clear = true;        
    }
    else if (level == 1 && score >= clearScore) {
        clear = true;
    }
    else if (level == 2 && score >= clearScore) {
        clear = true;
        level = 0;
    }
}

function main() {
    if (!start) { // 게임시작전 
        //console.log("돌아가는중");        
        startPage();
        requestAnimationFrame(main);
    }
    else if (clear) { // 게임 클리어          
        gameClear();
        start = false;
        storycanvas.classList.remove("d-none");
        canvas.classList.add("d-none");
        requestAnimationFrame(main);
    }
    else { // 게임 화면
        if (monster) {            
            createItem();
            if (level == 1) clearScore = clearScore * 2;
            else if (level == 2) clearScore = clearScore * 2;
            monster = false;
        }
        update();
        render();
        clearCheck();
        requestAnimationFrame(main);
    }
}

loadImg();
setupKeyboardListener();
main();


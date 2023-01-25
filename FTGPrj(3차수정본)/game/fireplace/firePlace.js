import Fire from "./fire.js";

export default class FirePlace{
    #MIDDLE_FIRE
    #BIG_FIRE
    #WOLF;
    #fireArr
    #isFirst
    #isEnd
    #curImg;

    constructor(dom, func){
        this.dom = dom;
        this.storyCanvas = document.querySelector(".story-canvas");
        /**@type {CanvasRenderingContext2D} */
        this.ctx = this.dom.getContext("2d");
        this.#MIDDLE_FIRE = document.querySelector(".middle-fire");
        this.#BIG_FIRE = document.querySelector(".big-fire");
        this.#WOLF = document.querySelector(".fire-wolf");
        this.#fireArr = [this.#MIDDLE_FIRE, this.#BIG_FIRE];
        this.#curImg = document.querySelector(".basic-fireplace");
        this.bgAudio = document.querySelector(".fire-audio-bg");
        this.clickAudio = document.querySelector(".fire-audio-click");

        this.#isFirst = true;
        this.#isEnd = false;

        this.isMouseOn = false;

        this.redBarPoint = 10;
        this.delay = 100;
        this.wolfY = -300;

        this.fireMap = new Map();

        this.fireEndGame = func;
        this.dom.onmouseover = this.mouseoverHandler.bind(this);
        this.dom.onmouseout = this.mouseoutHandler.bind(this);
        this.dom.onclick = this.clickHandler.bind(this);
    }

    update(){
        if(!this.#isEnd){
            this.wolfUpdate();
            this.fireUpdate();
        }
    }
    
    draw(){
        this.ctx.drawImage(this.#curImg, 0, 0, 1400, 700);
        if(this.#isFirst){
            this.playDrawStart();
        }else{
            //backgroud
            this.ctx.drawImage(this.#WOLF, 500, this.wolfY, 400, 400);
            this.drawProgress();
            this.drawWolf();
            this.drawFire();
            this.ctx.font = `30px bmkrhr`;
            this.ctx.fillStyle = "orange";
            this.ctx.fillText("불을 클릭하세요", 300, 83);
        }
    }

    drawFire(){
        if(this.redBarPoint < 500){
            for(let [x, fire] of this.fireMap){
                this.ctx.drawImage(this.#fireArr[fire.imgIdx], fire.x, fire.y, 150, 150);
            }
        }else{
            this.ctx.font = `80px bmkrhr`;
            this.ctx.fillStyle = "red";
            this.ctx.fillText("미션 성공! Click", 700, 350);
            this.#isEnd = true;
        }
    }
    drawWolf(){
        //isEnd?
        if(this.wolfY >= 250){
            this.ctx.font = `80px bmkrhr`;
            this.ctx.fillStyle = "red";
            this.ctx.fillText("게임 종료! Click", 700, 350);
            this.#isEnd = true;
        }
    }
    drawProgress(){
        //static progress-bar
        this.ctx.fillStyle = "white";
        this.ctx.fillRect (50, 50, 500, 50);
        //dynamic progress
        if(this.redBarPoint > 0){
            this.ctx.fillStyle = "rgb(200,0,0)";
            this.ctx.fillRect (50, 50, this.redBarPoint, 50);
        }
    }
    fireUpdate(){
        let fire = null;
        if(this.delay % 54 ===4){
            let x = Math.floor(Math.random() * 1400);
            let y = Math.floor(Math.random() * 700);
            let imgIdx = Math.floor(Math.random() * 2)
            fire = new Fire(x,y,imgIdx);
            this.fireMap.set(x, fire);
        }
        for(let [x, fire] of this.fireMap){
            if(++fire.time > 60){
                this.fireMap.delete(x);
            }
        }
    }
    wolfUpdate(){
        this.delay--;
        if(this.delay === 0){
            this.delay = 100;
            if(this.wolfY < 250)
                this.wolfY += 50;
        }
    }

    playDrawStart(){
        this.ctx.font = `80px bmkrhr`;
        this.ctx.textAlign = "center";
        if(this.isMouseOn){
            this.ctx.fillStyle = "orange";
            this.ctx.fillText("불을 지펴라! Click", 700, 350);
        }else{
            this.ctx.fillStyle = "black";
            this.ctx.fillText("불을 지펴라!", 700, 350);
        }
    }

    mouseoverHandler(){
        if(this.#isFirst)
            this.isMouseOn = true;
    }

    mouseoutHandler(){
        if(this.#isFirst)
            this.isMouseOn = false;
    }

    clickHandler(e){
        if(this.#isFirst){
            this.#isFirst = false;
            this.#curImg = document.querySelector(".fireplace");
            this.bgAudio.play();
        }
        if(this.#isEnd){
            this.bgAudio.pause();
            this.fireEndGame();
            this.storyCanvas.classList.remove("d-none");            
        }

        for(let [x, fire] of this.fireMap){

            if(e.x-30 <= x && x <= e.x+30){
                this.clickAudio.play();
                this.fireMap.delete(x);
                this.redBarPoint += 50;
                setTimeout(() => {
                    this.clickAudio.pause();
                    this.clickAudio.load();
                }, 800);
            }
        }
    }
}
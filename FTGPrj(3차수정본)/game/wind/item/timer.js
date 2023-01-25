import globalbtn from '../../../globalbtn.js';

export default class Timer{
    constructor(){
        this.realTimer=690; // 프레임초시계
        this.counter=643    // 게임시간 실제 반영하기 위한 시간
        this.gameTimer=15;  // 게임프레임에 비출 시계 
    }

    update(){
        // if(!globalbtn.btn.clear){  // 전역변수를 이용해, 게임이 clear가 되면 타이머 차감이 멈춘다.
        //     this.realTimer--;
        if(!globalbtn.clear)
            if(0<this.gameTimer){  // 시간이 0이 되면 카운트다운이 멈춘다.
                this.realTimer--;

                if(this.realTimer==this.counter){
                    this.gameTimer--;
                    this.counter-=46
                }

            if(this.gameTimer==0){
                //this.gameTimer=-1;
                //alert("Game Over")
                return;
            }
        }
    }

    draw(ctx){
        ctx.font="100px sans-serif"
        //ctx.fillText(this.realTimer, 500, 100, 110) // 글자, x좌표, y좌표, 너비?-110이상 차이 없음
        ctx.fillStyle = "#f008"
        ctx.fillRect(10,10,200,110)
        ctx.fillStyle = "#000"
        ctx.fillText(this.gameTimer, 50, 100, 110) // 글자, x좌표, y좌표, 너비?-110이상 차이 없음

    }

    
}
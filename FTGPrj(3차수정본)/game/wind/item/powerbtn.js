import globaltimer from "../../../globaltimer.js";

export default class PowerBtn{
    #speed;
    #btnSpeed;
    #wsx
    constructor(speed){
  
        

        // 바람 이미지
        this.imgWind=document.querySelector("#w-p-btn")
        this.#wsx=-556;
        this.wsy=410;

        // 난도조절
        this.#speed=speed || 1; // 게이지 줄어드는 속도 // 1 성공모드 3 벽돌모드
        this.#btnSpeed=50; // 스페이스바에 따른 바람의 이동거리


        // 키보드 한 번만 누르게 하기
        this.shouldHandleKeyDown = true;
        this.n=0;

        // 클리어확인용
        this.clear = false;

        // 소리 한 번만 나오게 하기
        this.soundCount=false;
        this.onWarning=null;
        this.offWarning=null;
    }
    get speed(){
        return this.#speed;
    }

    get wsx(){
        return this.#wsx;
    }

    update(){
        // console.log(`업데이트에서 ${this.#wsx}`);
        // 바람 이미지가 줄어든다.
        if(!globaltimer.timer==0)
            if(!this.clear)
                this.#wsx-=this.#speed; 


        if(this.#wsx<-830){ // 바람게이지가 0이 되면 점핑(?)한다.
            this.#wsx=-755;
            if(this.onWarning!=null) // 게임 안내문 "스페이스바를 누르세요" 출력
               this.onWarning();
        }

        if(-530<this.#wsx)
            if(this.offWarning!=null){
                this.offWarning();
                this.alertReset();
            }


        // 게임 클리어 시 (입김이 창에 끝에 닿으면) 태풍 이미지가 바탕을 채운다.
        if(-130<this.#wsx){
            this.clear=true;
            // this.#speed=0; // 칸이 넘어가면 바람 게이지가 멈춘다.
            // if(!this.soundCount){  // 소리 한 번만 나오게 하기
            //     this.sound.play();          
            //     this.soundCount=true;
            // }
        }
    }

    draw(ctx){  
        // console.log(`드로우에서 ${this.#wsx}`);
        ctx.drawImage(this.imgWind, 
            0,0,750,150,
            this.#wsx,this.wsy,1400,200);
        }

    keyDown(k){     // 클릭 시 바람의 x좌표가 올라간다.
        if(k==" "){
            // console.log(this.#wsx);
            if (!this.shouldHandleKeyDown) 
                    return;
            this.shouldHandleKeyDown = false;
            this.#wsx+=50;
            // console.log(this.#wsx);
            }
        else
            return;    
    }
            
    keyUp(k){
        if(k==" ")
            this.shouldHandleKeyDown = true;
    }

    getClear(){
        return this.clear;
    }
}
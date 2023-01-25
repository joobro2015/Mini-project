import Background from '../game/wind/item/background.js';
import PowerBtn from '../game/wind/item/powerbtn.js';
import Timer from '../game/wind/item/timer.js';
import RedBasis from '../game/wind/item/red.js';
import Typoon from '../game/wind/item/typhoon.js';
import globalbtn from '../globalbtn.js'
import globaltimer from '../globaltimer.js'
import ConfirmDlg from '../game/wind/item/confirmdlg.js';

export default class WindGameCanvas{
    constructor(speed){
        this.dom = document.querySelector(".wind-game-canvas");
        this.dom.focus();

        /**@type {CanvasRenderingContext2D} */
        this.ctx = this.dom.getContext("2d");

        this.red = new RedBasis();
        this.btn = new PowerBtn(speed);   //  this.speed값에 난도변경
            globalbtn.btn=this.btn; // 전역객체만들기

        this.bg = new Background(); 
        this.timer = new Timer();
            globaltimer.timer=this.timer; // 전역객체만들기
        this.typhoons = [];
        this.dlg = new ConfirmDlg();
        this.dlg.onclick = this.dlgClickHandler.bind(this); // story-cnavas로 넘어가기

        this.mode = speed;
        // 클리어 시 바람소리
        this.sound=document.querySelector("#windsound");
        this.windsound = document.querySelector("#windsound2");
        this.questionsound = document.querySelector("#questionsound");
        this.soundCount=false;


        // 게이지가 0을 찍으면 경고창 알리기
        this.btn.onWarning=this.onWarningHandler.bind(this);
        // 게이지가 일정량 차면 경고창 없애기
        this.btn.offWarning=this.offWarningHandler.bind(this);
        // 경고창 소스 리셋
        this.btn.alertReset = this.alertResetHandler.bind(this);

        // 버튼 한 번만 눌리게 하는 코드
        this.dom.onkeydown=this.keyDownHander.bind(this);
        this.dom.onkeyup=this.keyUpHander.bind(this);

        this.dom.onclick=this.clickHandler.bind(this);


        //globalbtn.btn.speed=this.btn.speed;

        this.typhoonsTimer=1;   // 게임 클리어시 태풍 조작을 위한 변수

        this.onnextGame=null;

        this.pause=false;   // 창 전환 시 게임 종료 
    }

    run(){
        if(this.pause){
            this.windsound.pause();
            this.sound.pause();
            this.questionsound.pause();
            return;
        }
        console.log("동작중");

        this.update();
        this.draw();

        window.setTimeout(()=>{
            this.run();
        },17);

    }

    update(){
        this.timer.update();
        this.btn.update();

        if(this.btn.clear){
            this.typhoonsTimer--;
            if(this.mode === 1 && !this.soundCount){
                this.sound.play();
                this.windsound.play();
                this.soundCount = true;
            }
            else if(this.mode === 3 && !this.soundCount){
                this.questionsound.play();
                this.soundCount = true;
            }
            if(this.typhoonsTimer==0)  // 태풍 조작을 위한 변수
                {   // 클리어 시 나오는 태풍 만들기
                    let x= -550;//sw랜덤
                    let y= Math.floor(Math.random()*(this.dom.height+500+50)-50);//sh랜덤
                    let typhoon = new Typoon(x,y);
                    
                    typhoon.onOutOfScreen=this.onOutOfScreenHandler.bind(this);

                    this.typhoons.push(typhoon)
                    
                    this.typhoonsTimer=1;
                }
                for(let typhoon of this.typhoons)
                    typhoon.update();
        }
    }

    draw(){
        this.red.draw(this.ctx); // 가장 맨 밑 바탕
        this.btn.draw(this.ctx); // 컨트롤 하는 버튼
        this.bg.draw(this.ctx);  // 늑대, 초원
        this.timer.draw(this.ctx); // 타이머
        if(this.btn.clear==true)   // 게임 클리어 시 태풍이미지
            for(let typhoon of this.typhoons)
                typhoon.draw(this.ctx);
        this.dlg.draw(this.ctx)
    }

    clickHandler(e){
        this.dlg.notifyClick(e.x,e.y);    
    }

    dlgClickHandler(){     // 스토리캔버스로 화면전환
        if(this.onnextGame)
            this.onnextGame();
    }

    onWarningHandler(){   // 알림 키기
        this.dlg.show();        
    }
    offWarningHandler(){  // 알림 끄기
        this.dlg.blind();
    }
    alertResetHandler(){  // 알림 값 리셋
        this.dlg.reblind();
    }

    onOutOfScreenHandler(en){      // 태풍이 게임화면 밖으로 나가면 사라지게 만드는 코드
        let index = this.typhoons.indexOf(en)
        this.typhoons.splice(index,1);
    }

    keyDownHander(e){              // 게임 조작을 위한 함수
        this.btn.keyDown(e.key);
    }
    keyUpHander(e){                // 게임 조작을 위한 함수
        this.btn.keyUp(e.key);
    }



}
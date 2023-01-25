import Title from "../story/s0-title.js"
import LeaveHomeScene from "../story/s1-leavehomescene.js";
import Pig1home from "../story/s2-pig1home.js";
import Pig2home from "../story/s3-pig2home.js";
import Pig3home from "../story/s4-pig3home.js";
import WolfAppear from "../story/s5-wolfAppear.js";
import Wolfpig1talk from "../story/s6-wolfpig1talk.js";
import Pig1homegone from "../story/s7-pig1homegone.js";
import Pig2HomeGone from "../story/s8-pig2homegone.js";
import WolfPig3Talk from "../story/s9-wolfpig3talk.js";
import Pig3HomeAlive from "../story/s10-pig3homealive.js";
import WolpAngry from "../story/s11-wolfangry.js";
import WolfFire from "../story/s12-wolffire.js";
import Ending from "../story/s13-ending.js";
import PigHomegameInfo from "../story/s2-1-pighomegameInfo.js";
import Pig1HomeClear from "../gameinfo/pig1homeclear.js";
import Pig2HomeClear from "../gameinfo/pig2homeclear.js";
import Pig3HomeClear from "../gameinfo/pig3homeclear.js";
import WindGameInfo from "../gameinfo/windgameinfo.js";
import FireGameInfo from "../gameinfo/firegameinfo.js";
import Intro from "../story/intro.js";
import StoryInfo from "../story/storyinfo.js";
import Sample from "../story/sample.js";

export default class StoryCanvas {
    constructor(curPage) {
        this.dom = document.querySelector(".story-canvas");
        this.ctx = this.dom.getContext("2d");
        // new FireGameInfo(), new WindGameInfo()
        this.scenes = [new Intro(), new StoryInfo(),new Title(), 
            new LeaveHomeScene(), new Pig1home(), 
            new PigHomegameInfo(), new Pig1HomeClear(), new Pig2home(), 
            new Pig2HomeClear(), new Pig3home(), new Pig3HomeClear(),
            new WolfAppear(), new Wolfpig1talk(), new WindGameInfo(), new Pig1homegone(), 
            new Pig2HomeGone(), new WolfPig3Talk(), new Pig3HomeAlive(), 
            new WolpAngry(), new FireGameInfo(), new WolfFire(), new Ending()];
        this.page = curPage || 0;
        
        this.checkCurPage = null;
        // 마우스 클릭, 이동 관련 이벤트 넣어주기 위해서 
        this.dom.onmousemove = this.onmousemovehandler.bind(this);
        this.dom.onclick = this.onclickhandler.bind(this);
        
        this.storyover = false;
    }

    run() {
        if(this.storyover) {
            window.clearTimeout(window.setTimeout());
        }

        this.update();
        this.draw();       
        
        window.setTimeout(() => { this.run(); }, 17);
    }
    
    update() {
        this.scenes[this.page].update();
        if(this.scenes[this.page].backbtnclicked){
            this.scenes[this.page].backbtnclicked = false;
            this.backbtnclickhandler();
            return;
        }
        else if(this.scenes[this.page].fwdbtnclicked){
            this.scenes[this.page].fwdbtnclicked = false;
            this.forwardbtnclickhandler();
            return;
        }
        console.log(this.page);
    }

    draw() {
        
        this.scenes[this.page].draw(this.ctx);      
    }

    //이벤트

    // 클릭 위치 찍기
    onclickhandler(e) {
        // console.log(e);
        this.scenes[this.page].notifyClick(e.x,e.y);
    }

    // 마우스 이동 좌표 찍기
    onmousemovehandler(e){
        // console.log(e.x,e.y);
        this.scenes[this.page].notifyMove(e.x, e.y);
    }

    // 뒤로 가기 버튼이 있는 좌표 눌럿을 때
    backbtnclickhandler() {

    }

    // 앞으로 가기 버튼이 있는 좌표 눌럿을 때
    forwardbtnclickhandler() {
        if (this.page === this.scenes.length - 1)
            return;
        else{            
            this.page++;        
        }
        if(this.checkCurPage && (this.page===6 || this.page===8 || this.page===10 || this.page===14
            || this.page === 17 || this.page === 20)){
            this.checkCurPage(this.page);
        }
    }



    


}
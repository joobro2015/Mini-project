// 클래스명 바꿔주기
export default class PigHomegameInfo{

  constructor() {
    // 이미지 파일들 불러오는 부분 
    // (만약에 로드가 늦어져서 드로우가 안되는 현상이 반복되면 html에서 불러올 계획.)
    // this.img = document.querySelector("??"); 이런식으로


    // 버튼 이미지 불러오기
    this.backBtn = document.querySelector("#backbtn");
    this.backHoverBtn = document.querySelector("#backhoverbtn");
    this.forwardBtn = document.querySelector("#forwardbtn");
    this.fwdHoverBtn = document.querySelector("#fwdhoverbtn");
    this.playBtn = document.querySelector("#playbtn");
    this.pauseBtn = document.querySelector("#pausebtn");
    this.replayBtn = document.querySelector("#replaybtn");

    // this.canvas = document.querySelector(".story-canvas");
    // this.canvasWidth = canvas.width;
    // this.canvasHeight = canvas.height;
    this.canvas = document.querySelector(".story-canvas");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    
    
    
    // 뒤로 가기 버튼 (1.클릭이 되었는지 2.버튼 이미지의 x,y좌표)
    this.backbtnclicked = false;
    this.backbtnx = 0;
    this.backbtny = 0;
    this.dirBtnSz = 100; /*방향버튼사이즈 줄임*/
    
    // 앞으로 가기 버튼 
    this.fwdbtnclicked = false;
    this.fwdbtnx = 1300;
    this.fwdbtny = 0;

    // 재생 관련 버튼
    this.playBtnX = 600;
    this.pauseBtnX = 700;
    this.replayBtnX = 800;
    this.playBtnY = 630;
    this.playBtnSz = 70;
    
    // 장면 이미지 파일 불러오기 (src 임시)
    this.img = new Image();
    this.img.src = "../img/pighomegameInfo.png";
    this.pigImg = new Image();
    this.pigImg.src = "../img/pig.png";
    this.wolfImg = new Image();
    this.wolfImg.src = "../img/wolf.png";
    this.heartImg = new Image();
    this.heartImg.src = "../img/heart8.png";
    
    // 오디오 파일 불러오기 (src 임시) , .loop 자동반복 false로 막음
    this.audio = new Audio();
    this.audio.src = "../audio/sound/title.mp3";
    this.audio.loop = false; 
    this.audioCount = 0;

    // 자막 관련
    this.fontlight = 0.0;
    this.fontlightspeed = 0.05; /* 글자 밝기 0.0 ~ 1.0 */ 
    this.subtitleX = 500;
    this.subtitleY = 100; /** 자막 위치 */
    this.lineInterval = 40; /** 자막 간격 */
    this.subtitleTxt = []; /*여기다가 멘트들 한줄씩 넣으면 됨*/
    
    // story-canvas 에서 받아오는 클릭된 x,y 좌표 값 저장
    this.onclickx = null;
    this.onclicky = null;

    // story-canvas 에서 받아오는 움직이는 포인터 x,y 좌표 값 저장
    this.onmovex = null;
    this.onmovey = null;
  }

  draw(ctx){
    // 이미지 그리기
    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvasWidth, this.canvasHeight);

    ctx.drawImage(this.pigImg, 0, 0, this.pigImg.width, this.pigImg.height, 200, 200, 90, 90);
    ctx.drawImage(this.wolfImg, 0, 0, this.wolfImg.width, this.wolfImg.height, 200, 350, 90, 90);
    ctx.drawImage(this.heartImg, 0, 0, this.heartImg.width, this.heartImg.height, 200, 500, 90, 90);
    
    
    
    // 앞으로 가기 버튼 그리기
    if((this.fwdbtnx<this.onmovex && this.onmovex < 1400) && (this.fwdbtny<this.onmovey && this.onmovey < 100)) {
      ctx.drawImage(this.fwdHoverBtn, 0, 0, this.fwdHoverBtn.width, this.fwdHoverBtn.height, this.fwdbtnx, this.fwdbtny, this.dirBtnSz, this.dirBtnSz);
    }
    else
      ctx.drawImage(this.forwardBtn, 0, 0, this.forwardBtn.width, this.forwardBtn.height,this.fwdbtnx, this.fwdbtny, this.dirBtnSz, this.dirBtnSz);    
    
    // // 재생 관련 버튼 그리기 (재생, 일시정지, 다시 재생)
    // ctx.drawImage(this.playBtn, 0, 0, this.playBtn.width, this.playBtn.height, this.playBtnX, this.playBtnY, this.playBtnSz, this.playBtnSz);
    // ctx.drawImage(this.pauseBtn, 0, 0, this.pauseBtn.width, this.pauseBtn.height, this.pauseBtnX, this.playBtnY, this.playBtnSz, this.playBtnSz);
    // ctx.drawImage(this.replayBtn, 0, 0, this.replayBtn.width, this.replayBtn.height, this.replayBtnX, this.playBtnY, this.playBtnSz, this.playBtnSz);
    
    
    // 자막 그리기
    this.printSubtitle(ctx);
    
    
  }
  
  update() {
    if((this.backbtnx < this.onclickx && this.onclickx < 100) && (this.backbtny < this.onclicky && this.onclicky < 100)) {
      this.backbtnclicked = true;     
      this.fontlight = 0.0; /* 자막 밝기 초기화*/
      // this.audio.pause();
      // this.audio.currentTime = 0; /*오디오 초기화(멈추고 플레이시간 처음으로 돌려놓음)*/
    }
    
    if((this.fwdbtnx<this.onclickx && this.onclickx < 1400) && (this.fwdbtny<this.onclicky && this.onclicky < 100)) {
      this.fwdbtnclicked = true;
      this.fontlight = 0.0;
      // this.audio.pause();
      // this.audio.currentTime = 0;
    }
    
    // 해당 버튼에 마우스 클릭 시에 재생, 일시정지, 처음부터 다시 재생
    // if((this.playBtnX < this.onclickx && this.onclickx < this.pauseBtnX) && (this.playBtnY < this.onclicky && this.onclicky < 700)) {
    //     this.audio.play();            
    // }
    
    // if((this.pauseBtnX < this.onclickx && this.onclickx < this.replayBtnX) && (this.playBtnY < this.onclicky && this.onclicky < 700)) {
    //     this.audio.pause();
    // }
  
    // if((this.replayBtnX < this.onclickx && this.onclickx < this.replayBtnX + 100) && (this.playBtnY <this.onclicky && this.onclicky < 700)) {
    //   this.audio.currentTime = 0;
    //   this.audio.play();
    // }

    this.onclickx = null;
    this.onclicky = null;

    if(this.fontlight < 1)
      this.fontlight += this.fontlightspeed;
      
    this.audioCount++;
    
}

// 자막 그리는 함수
printSubtitle(ctx) {
  ctx.font = '45pt Jua';
  ctx.fillStyle = `rgba(0,0,0,${this.fontlight})`; 
  ctx.fillText("집 재료 모으기 게임 도움말", 410, 80);

  ctx.font = '30pt Jua';
  ctx.fillStyle = `rgba(0,0,0,${this.fontlight})`; 
  ctx.fillText("방향키로 아기 돼지를 움직여서 재료를 모아요.", 450, 250);
  ctx.fillText("날아오는 늑대와 마주치면 점수를 많이 잃어요.", 450, 400);
  ctx.fillText("재료를 모아서 화면 가운데에 점수를 채우면 게임 성공!", 450, 550);

  for(let i=0; i<this.subtitleTxt.length; i++){
    ctx.font = '30pt Jua';
    ctx.fillStyle = `rgba(0,0,0,${this.fontlight})`; 
    ctx.fillText(this.subtitleTxt[i], this.subtitleX, this.subtitleY + this.lineInterval * i);
  }
  
}

// story-canvas에서 콜백함수통해서 x,y 좌표 설정해주는 메소드
notifyClick(x,y) {
    this.onclickx = x;
    this.onclicky = y;    
}

notifyMove(x,y) {
  this.onmovex = x;
  this.onmovey = y;
}

}
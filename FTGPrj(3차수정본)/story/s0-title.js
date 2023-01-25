export default class Title {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.onclickx = null;
    this.onclicky = null;

    this.onmovex = null;
    this.onmovey = null;
    this.fwdbtnclicked = false;

    // this.img = document.querySelector("#title");
    this.img = new Image();
    this.img.src = '../img/Title.jpg';
    // console.log("경로",window.location.pathname);
    // 이미지 스타일 js에서 손보기
    // this.img.style
    this.forwardbtn = document.querySelector('#forwardbtn');
    this.fwdhoverbtn = document.querySelector('#fwdhoverbtn');
    this.pausebtn = document.querySelector('#pausebtn');

    this.backbtnclicked = false;
    this.backbtnx = 0;
    this.backbtny = 0;
    this.backBtn = document.querySelector('#backbtn');
    this.backHoverBtn = document.querySelector('#backhoverbtn');

    this.audio = new Audio();
    // this.audio.src = '../audio/sound/title.mp3';
    this.audio.loop = false;

    this.light = 0.0;
    this.lightspeed = 0.01;

    this.fwdbtnx = 1300;
    this.fwdbtny = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, 1400, 700, 0, 0, 1400, 700);
    // ctx.drawImage(this.pausebtn, 0, 0, this.pausebtn.width, this.pausebtn.height, 750, 650, 50, 50);

    
    if (
      this.fwdbtnx < this.onmovex &&
      this.onmovex < 1400 &&
      this.fwdbtny < this.onmovey &&
      this.onmovey < 100
    ) {
      ctx.drawImage(
        this.fwdhoverbtn,
        0,
        0,
        this.fwdhoverbtn.width,
        this.fwdhoverbtn.height,
        this.fwdbtnx,
        this.fwdbtny,
        100,
        100
      );
    } else
      ctx.drawImage(
        this.forwardbtn,
        0,
        0,
        this.forwardbtn.width,
        this.forwardbtn.height,
        this.fwdbtnx,
        this.fwdbtny,
        100,
        100
      );

    // this.drawtxt(ctx);
  }

  update() {
    if (
      this.fwdbtnx < this.onclickx &&
      this.onclickx < 1400 &&
      this.fwdbtny < this.onclicky &&
      this.onclicky < 100
    ) {
      this.fwdbtnclicked = true;
    }

    if (
      700 < this.onclickx &&
      this.onclickx < 750 &&
      650 < this.onclicky &&
      this.onclicky < 700
    ) {
      this.audio.play();
    }
    if (
      750 < this.onclickx &&
      this.onclickx < 800 &&
      650 < this.onclicky &&
      this.onclicky < 700
    ) {
      this.audio.pause();
    }

    this.onclickx = null;
    this.onclicky = null;

    if (this.light < 1.0) this.light += this.lightspeed;
  }

  fontinit(ctx) {
    ctx.font = '30pt';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
  }

  drawtxt(ctx) {
    ctx.font = '25pt Jua';
    ctx.fillStyle = `rgba(0,0,0,${this.light})`;
    ctx.fillText('아기 돼지 삼형제가 살았어요.', 500, 70);
    ctx.fillText('하루는 엄마 돼지가 말했어요', 500, 110);
    ctx.fillText('얘들아, 이제 너희는 다 컸단다.', 500, 150);
  }

  notifyClick(x, y) {
    this.onclickx = x;
    this.onclicky = y;
    // console.log(this.onclickx, this.onclicky);
  }

  notifyMove(x, y) {
    this.onmovex = x;
    this.onmovey = y;
  }
}

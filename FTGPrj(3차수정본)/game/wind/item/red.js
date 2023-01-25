export default class red{
    constructor(){
        this.imgRed=document.querySelector("#bg-bg-red");  // 제일 밑 바탕


    }

    draw(ctx){
        ctx.drawImage(this.imgRed,0,0);
    }

}
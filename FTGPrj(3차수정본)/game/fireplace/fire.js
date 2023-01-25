export default class Fire{
    constructor(x, y, imgIdx){
        //x,y 중앙으로 이동
        this.x = x-75;
        this.y = y-75;
        this.imgIdx = imgIdx;
        this.time = 0;
    }
}
class timer{
    #timer;
    constructor(){
        this.#timer = null;

    }
        set timer(value){
            this.#timer=value;
        }
    
        get timer(){
            return this.#timer.gameTimer;
        }


}


export default new timer()
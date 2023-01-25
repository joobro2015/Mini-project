class Btn{
    #btn;
    constructor(){
        this.#btn = null;

    }
        set btn(value){
            this.#btn=value;
        }
    
        get btn(){
            return this.#btn;
        }

        get clear(){
            return this.#btn.clear;
        }

        // set seeed(value){
        //     this.#btn=value;
        // }
        get speed(){
            return this.#btn.speed;
        }
}


export default new Btn()
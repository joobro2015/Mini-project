// import {wolf} from "wolf경로.js"
// import {house} from "house경로.js"
import FirePlace from "../game/fireplace/firePlace.js"

class FireGameCanvas{
    #wolf;
    #house;
    #firePlace;
    #objArr;
    #curObj;

    constructor(){
        
        this.dom = document.querySelector(".fire-game-canvas");
        this.dom.focus();        
        // /**@type {CanvasRenderingContext2D} */
        // this.ctx = this.dom.getContext("2d");

        //this.#wolf = wolf;
        //this.#house = house;
        this.#firePlace = new FirePlace(this.dom, this.fireEndGame);
        this.#objArr = [this.#firePlace];
        this.#curObj = this.#firePlace;

        // funcend
        this.gameOff = false;
        
        
        //add eventHandler
        this.dom.addEventListener("load", this.eventHandler);
    }

    set obj(o){
        this.#curObj = this.#objArr.filter(obj => o===obj).shift();
        console.log(`this.#curObj is ${this.#curObj}`);
    }

    get obj(){
        return this.#curObj;
    }

    fireEndGame(){
        this.dom.classList.add("d-none");                   
    }

    run(){
        if(this.gameOff){
            return;
        }
        console.log("불 작동");
        this.update();
        this.draw();
        window.setTimeout(()=>{
            this.run();
        },17);
    }
    
    update(){
        this.#curObj.update(this.ctx);
    }

    draw(){
        this.#curObj.draw(this.ctx);
    }

    eventHandler(e){
        this.dom.onkeyup = (e)=> this.#curObj.keyUp(e);
        this.dom.onkeydown = (e)=> this.#curObj.keyDown(e);
        //add any event function
    }

}

export let gc = new FireGameCanvas();
import GameCanvas from "./panel/wind-game-canvas.js"
import StoryCanvas from "./panel/story-canvas.js";
import WindGameCanvas from "./panel/wind-game-canvas.js";
import {gc} from "./panel/fire-game-canvas.js"
export {pigGameLevel, storyCanvas};

const gameCanvas = new GameCanvas();
const storyCanvas = new StoryCanvas();

const pigwindgameCanvas = document.querySelector(".wind-game-canvas");
const pighomegameCanvas = document.querySelector(".pighomegame-canvas");

let pig1homegame;
let pig3homegame;
let pigGameLevel = null;  

let pig1clearaudio = document.querySelector("#pighomeclearbgm");    


window.addEventListener("load",function(){

       storyCanvas.checkCurPage = (page) => {
              if(page === 14){                               
                     storyCanvas.dom.classList.add("d-none");
                     pigwindgameCanvas.classList.remove("d-none");                     
                     pig1homegame = new WindGameCanvas(1);
                     pig1homegame.onnextGame=()=>{
                            storyCanvas.dom.classList.remove("d-none");
                            pigwindgameCanvas.classList.add("d-none");
                            storyCanvas.page = 14;
                            pig1homegame.pause = true;
                            // storyCanvas.run();
                     }
                     pig1homegame.run();
              }             
              else if(page === 17){
                     storyCanvas.dom.classList.add("d-none");
                     pigwindgameCanvas.classList.remove("d-none");                     
                     pig3homegame = new WindGameCanvas(3);
                     pig3homegame.onnextGame=() => {
                            storyCanvas.dom.classList.remove("d-none");
                            pigwindgameCanvas.classList.add("d-none");
                            storyCanvas.page = 17;
                            pig3homegame.pause = true;
                            // storyCanvas.run();
                     }
                     pig3homegame.run();
              }
              else if(page === 20){
                     storyCanvas.dom.classList.add("d-none");
                     gc.dom.classList.remove("d-none");
                     gc.ongameover = () => {
                            gc.dom.classList.add("d-none");
                            gc.gameOff = true;
                     }                    
                     gc.run();
              }              
              else{
                     storyCanvas.dom.classList.add("d-none");              
                     pighomegameCanvas.classList.remove("d-none");                       
              }
              
       }     
       
       storyCanvas.run();
})
// pighomegameCanvas.style.display === 'none' &&
// window.addEventListener("keydown", function(e){      
//        if(  pighomegameCanvas.style.display === 'none' &&e.keyCode === 13){
//               console.log("enter키 작동중");
//               e.preventDefault();
//               e.returnValue = false;
//        }
// })
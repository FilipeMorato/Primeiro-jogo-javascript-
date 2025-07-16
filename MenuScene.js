import { drawText } from "./DrawText.js"
import * as soundFuncs from "./SoundHandler.js"
import { filipeSprites, aneSprites, pedroSprites } from "./sprites.js"
import { clicouNoRetanguloCanvas } from "./settings.js"
import { SingleMode, SceneVs } from "./ActionScenes.js"
import { SelectScene } from "./CharSelectScene.js"
import { changeScene } from "./SceneManager.js"
import { globalState } from "./settings.js"

export class MenuScene {
    constructor(context, canvas) {
this.currentFrame = 0
this.animationFire = 0

this.menumusic = new Audio("./music/menu.mp3")

this.context = context
this.canvas = canvas
      
   this.context.strokeStyle = "white"
   this.context.lineWidth = 6   
this.context.globalAlpha = 0

this.menuFireFrames = []
this.loadFireFrames()

this.handleClick = (event) => { 
  if (clicouNoRetanguloCanvas(event, this.canvas, 130, 60, 157, 60)){
    globalState.currentMode = "vsBot"
    changeScene(SelectScene, this.context, this.canvas)
  }
  else if (clicouNoRetanguloCanvas(event, this.canvas, 576, 60, 240, 55)){
    globalState.currentMode = "single"
    changeScene(SelectScene, this.context, this.canvas)
  }
  else if (clicouNoRetanguloCanvas(event, this.canvas, 300, 120, 300, 55)){
    globalState.currentMode = "vsPlayer"
    changeScene(SelectScene, this.context, this.canvas)
  }
}
      
      this.canvas.addEventListener("click", this.handleClick)

soundFuncs.playSound(this.menumusic, 1, { volume: 0.6, loop: true })
    }
    
loadFireFrames() {
    // Carregar várias imagens e armazená-las no array
    for (let i = 1; i < 9; i++) {
      const img = new Image();
      img.src = './bgfire' + i + '.png'
      this.menuFireFrames.push(img)
    }
  }    

update(frameTime){
    if (frameTime.previous > this.animationFire + 90){
        this.animationFire = frameTime.previous
        this.currentFrame++
        
        if (this.currentFrame > 7){
            this.currentFrame = 0
        }
    }
    if (this.context.globalAlpha < 1) {
    this.context.globalAlpha += 0.5 * frameTime.secondsPassed
    }
}

draw(){
    this.context.drawImage(this.menuFireFrames[this.currentFrame], 0, 0, this.context.canvas.width, this.context.canvas.height)
  
    this.drawPostersFighters()
    drawText(this.context, "white", 40, "1v1 Bot", 140, 100)
    this.context.strokeRect(130, 60, 157, 60)
  
    drawText(this.context, "white", 40, "Single Player", 580, 100)
    this.context.strokeRect(300, 120, 300, 55)
  
    drawText(this.context, "white", 40, "1v1 Multiplayer", 310, 160)
    this.context.strokeRect(576, 60, 240, 55)
}

drawPostersFighters(){
        this.context.drawImage(filipeSprites.win.img, 40, 115, 129, 411)
        this.context.drawImage(aneSprites.win.img, 360, 210, 199.1, 328.9)
        this.context.drawImage(pedroSprites.win.img, 740, 248, 87.2, 290.9)
}

cleanClassInstance(){
  this.context.globalAlpha = 1
  this.context = null
  this.canvas.removeEventListener("click", this.handleClick)
  this.canvas = null
  this.menuFireFrames = []
  this.menuFireFrames = null
  this.menumusic.src = null
  this.menumusic = null
 }
}
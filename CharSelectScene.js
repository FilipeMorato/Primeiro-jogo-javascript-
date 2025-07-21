import { clicouNoRetanguloCanvas, globalState } from "./settings.js"
import * as soundFuncs from "./SoundHandler.js"
import { charSelectSong } from "./musics.js"
import { startSprite, unselectSprite, filipeSprites, aneSprites, pedroSprites, laraSprites } from "./sprites.js"
import { VsFighter, VsModeBot, SingleFighter } from "./Fighter.js"
import { LeftHudFighter, RightHudFighter } from "./SameDeviceMultiplayer.js"
import { changeScene } from "./SceneManager.js"
import { SingleMode, SceneVs } from "./ActionScenes.js"
import { drawText } from "./DrawText.js"
import { activateMenuBtn } from "./menuReturnButton.js"

export class SelectScene{
    constructor(context, canvas) {
      this.context = context
      activateMenuBtn()
      this.canvas = canvas
      this.context.fillStyle = 'navy'
      this.ready = false
      globalState.player1 = null
      globalState.player2 = null
      globalState.p1fighterName = ""
      globalState.p2fighterName = ""
      this.player1selection = []
      this.player2selection = []
      //console.log(charSelectSong)
      this.handleClick = (event) => {
        if (globalState.currentMode == "single"){
          this.updateSingleMode(event)
          this.checkStart()
       }
       else if (globalState.currentMode == "vsBot"){
        this.updateVsBotMode(event)
        this.updateUnselect() 
         this.updateHardMode(event)
        this.checkStart() 
       }
       else if (globalState.currentMode == "vsPlayer"){
         this.updateVsPlayerMode(event)
         this.updateUnselect()
         this.checkStart()
       }
      }
      
      this.canvas.addEventListener("click", this.handleClick)
      soundFuncs.playSound(charSelectSong, 1, { volume: 0.6, loop: true })
  }
  
  updateSingleMode(event){
    if (clicouNoRetanguloCanvas(event, this.canvas, 235, 240, 110, 110)){
      globalState.player1 = SingleFighter
      globalState.p1fighterName = "filipe"
      this.ready = true
      this.player1selection = [235, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 360, 240, 110, 110)){
      globalState.player1 = SingleFighter
      globalState.p1fighterName = "pedro"
      this.ready = true
      this.player1selection = [360, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 485, 240, 110, 110)){
      globalState.player1 = SingleFighter
      globalState.p1fighterName = "ane"
       this.ready = true
       this.player1selection = [485, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 610, 240, 110, 110)){
      globalState.player1 = SingleFighter
      globalState.p1fighterName = "lara"
      this.ready = true
      this.player1selection = [610, 240, 110, 110]
    }
  }
  
  updateVsBotMode(event){
    //se nenhum player selecionou ainda, seleção vai para o player1
    if (globalState.player1 == null && globalState.player2 == null){
      if (clicouNoRetanguloCanvas(event, this.canvas, 235, 240, 110, 110)){
      globalState.player1 = VsFighter
      globalState.p1fighterName = "filipe"  
      this.player1selection = [235, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 360, 240, 110, 110)){
      globalState.player1 = VsFighter
      globalState.p1fighterName = "pedro"
      this.player1selection = [360, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 485, 240, 110, 110)){
      globalState.player1 = VsFighter
      globalState.p1fighterName = "ane"
       this.player1selection = [485, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 610, 240, 110, 110)){
      globalState.player1 = VsFighter
      globalState.p1fighterName = "lara"
      this.player1selection = [610, 240, 110, 110]
     }
    }
    //se player1 selecionou, vai para o player 2
    else if (globalState.player1 != null && globalState.player2 == null){
      if (clicouNoRetanguloCanvas(event, this.canvas, 235, 240, 110, 110)){
      globalState.player2 = VsModeBot
      globalState.p2fighterName = "filipe"  
      this.ready = true
      this.player2selection = [235, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 360, 240, 110, 110)){
      globalState.player2 = VsModeBot
      globalState.p2fighterName = "pedro"
      this.ready = true
      this.player2selection = [360, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 485, 240, 110, 110)){
      globalState.player2 = VsModeBot
      globalState.p2fighterName = "ane"
       this.ready = true
       this.player2selection = [485, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 610, 240, 110, 110)){
      globalState.player2 = VsModeBot
      globalState.p2fighterName = "lara"
      this.ready = true
      this.player2selection = [610, 240, 110, 110]
     }
    }
  }
  
  updateVsPlayerMode(event){
    //se nenhum player selecionou ainda, seleção vai para o player1
    if (globalState.player1 == null && globalState.player2 == null){
      if (clicouNoRetanguloCanvas(event, this.canvas, 235, 240, 110, 110)){
      globalState.player1 = LeftHudFighter
      globalState.p1fighterName = "filipe"  
      this.player1selection = [235, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 360, 240, 110, 110)){
      globalState.player1 = LeftHudFighter
      globalState.p1fighterName = "pedro"
      this.player1selection = [360, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 485, 240, 110, 110)){
      globalState.player1 = LeftHudFighter
      globalState.p1fighterName = "ane"
       this.player1selection = [485, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 610, 240, 110, 110)){
      globalState.player1 = LeftHudFighter
      globalState.p1fighterName = "lara"
      this.player1selection = [610, 240, 110, 110]
     }
    }
    //se player1 selecionou, vai para o player 2
    else if (globalState.player1 != null && globalState.player2 == null){
      if (clicouNoRetanguloCanvas(event, this.canvas, 235, 240, 110, 110)){
      globalState.player2 = RightHudFighter
      globalState.p2fighterName = "filipe"  
      this.ready = true
      this.player2selection = [235, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 360, 240, 110, 110)){
      globalState.player2 = RightHudFighter
      globalState.p2fighterName = "pedro"
      this.ready = true
      this.player2selection = [360, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 485, 240, 110, 110)){
      globalState.player2 = RightHudFighter
      globalState.p2fighterName = "ane"
       this.ready = true
       this.player2selection = [485, 240, 110, 110]
    }
    else if (clicouNoRetanguloCanvas(event, this.canvas, 610, 240, 110, 110)){
      globalState.player2 = RightHudFighter
      globalState.p2fighterName = "lara"
      this.ready = true
      this.player2selection = [610, 240, 110, 110]
     }
    }
  }
  
  updateUnselect(){
    if (clicouNoRetanguloCanvas(event, this.canvas, 360, 375, 180, 108)){
      if (globalState.player1 != null && globalState.player2 != null){
        globalState.player2 = null
        this.player2selection = []
        this.ready = false
      }
      else if (globalState.player1 != null && globalState.player2 == null){
        globalState.player1 = null
        this.player1selection = []
      }
    }
  }
  
  checkStart(){
    if (this.ready == true && clicouNoRetanguloCanvas(event, this.canvas, 340, 115, 252, 108)){
      if (globalState.currentMode == "single"){
        changeScene(SingleMode, this.context, this.canvas)
      }
      else if (globalState.currentMode == "vsBot" || globalState.currentMode == "vsPlayer"){
        changeScene(SceneVs, this.context, this.canvas)
      }
    }
  }
  
  updateHardMode(event){
    if (clicouNoRetanguloCanvas(event, this.canvas, 730, 100, 150, 90)){
      if (globalState.hardVsBot == true){ globalState.hardVsBot = false }
      else { globalState.hardVsBot = true }
    }
  }
    
    update(frameTime){
    return
    }
  
    drawP1SelectionBorder(){
      if (this.player1selection.length > 0){
            this.context.strokeStyle = "orange"
            this.context.lineWidth = 9
            this.context.strokeRect(this.player1selection[0], this.player1selection[1], this.player1selection[2], this.player1selection[3])
        }
    }
    drawP2SelectionBorder(){
      if (this.player2selection.length > 0){
            this.context.strokeStyle = "cyan"
            this.context.lineWidth = 9
            this.context.strokeRect(this.player2selection[0], this.player2selection[1], this.player2selection[2], this.player2selection[3])
        }
    }
  
  drawHardModeState(){
    if (globalState.currentMode != "vsBot"){
      return
    }
    
    this.context.strokeRect(730, 100, 150, 90)
      drawText(this.context, 'white', 30, "HardMode", 734, 130)
      if (globalState.hardVsBot == true){
        drawText(this.context, 'red', 30, "ON", 765, 175)
      }
      else {
        drawText(this.context, 'yellow', 30, "OFF", 762, 175)
      }
  }
  
    
    draw(){
      this.context.strokeStyle = "white"
      this.context.lineWidth = 6
        
      this.context.fillStyle = 'navy'
      this.context.fillRect(0, 0, 960, 540)
      
      this.drawHardModeState()
      
      this.context.fillStyle = 'crimson'
      this.context.fillRect(235, 240, 110, 110)
      this.context.fillRect(360, 240, 110, 110)
      this.context.fillRect(485, 240, 110, 110)
      this.context.fillRect(610, 240, 110, 110)
      
      this.context.drawImage(filipeSprites.win.img, 41, 60, 70, 100, 235, 230, 100, 120)
      this.context.drawImage(pedroSprites.win.img, 10, 0, 90, 67, 370, 235, 160, 115)
      this.context.drawImage(aneSprites.win.img, 75, 0, 60, 67, 485, 235, 110, 115)
      this.context.drawImage(laraSprites.win.img, 140, -10, 140, 147, 610, 230, 110, 120)
      
      this.context.strokeRect(235, 240, 110, 110)
      this.context.strokeRect(360, 240, 110, 110)
      this.context.strokeRect(485, 240, 110, 110)
      this.context.strokeRect(610, 240, 110, 110)
      
        this.drawP1SelectionBorder()
        this.drawP2SelectionBorder()
      
      if (this.ready){
          this.context.drawImage(startSprite, 340, 115)
      }
      
   if (globalState.currentMode == "vsBot" || globalState.currentMode == "vsPlayer"){   
      if (globalState.player1 != null || globalState.player2 != null){
        this.context.drawImage(unselectSprite, 360, 375)
      }
     }
    }
    
 cleanClassInstance(){
  this.context = null
   this.canvas.removeEventListener("click", this.handleClick)
   this.canvas = null
   this.player1selection = null
   this.player2selection = null
   soundFuncs.stopSound(charSelectSong)
  }
}
import * as soundFuncs from "./SoundHandler.js"
import * as input from "./inputs.js"
import { drawText } from "./DrawText.js"
import { stagesSprites, trofeuSprite, laraSprites } from "./sprites.js"
import { battleMusics, winSound } from "./musics.js"
import { Magic, EnemyMagic } from "./Magic.js"
import { MenuScene } from "./MenuScene.js"
import { changeScene } from "./SceneManager.js"
import { PunchCpu, Kicker } from "./CPU.js"
import { Shooter, Giant } from "./CPU2.js"
import { getRandomPuncherSprites, getRandomKickerSprites, getRandomShooterSprites, getRandomGiantSprites } from "./CpuSpawner.js"
import { globalState } from "./settings.js"
import  { menuBtn } from "./menuReturnButton.js"

export class ActionScene {
  constructor (context, canvas){
    this.musicRandomizer = Math.floor(Math.random() * 4)
    this.stageRandomizer = Math.floor(Math.random() * 7)
    this.context = context
    this.canvas = canvas
    
    this.context.strokeStyle = "white"
    this.context.lineWidth = 4
    
    this.entities = []
    
    soundFuncs.playSound(battleMusics[this.musicRandomizer], 1, { volume: 0.5, loop: true })
    menuBtn.style.display = "none"
  }
  addMagic(direction, x, y, opponent){
    this.entities.push(new Magic(direction, x, y, opponent))
  }
  addEnemyMagic(direction, x, y, opponent){
    this.entities.push(new EnemyMagic(direction, x, y, opponent))
  }
  
}

export class SceneVs extends ActionScene {
  constructor(context, canvas){
    super(context, canvas)
    
    if (globalState.currentMode == "vsPlayer"){
      this.fighter1 = new globalState.player1(this.context, 280, 519, this.addMagic.bind(this), globalState.p1fighterName)
      this.fighter2 = new globalState.player2(this.context, 640, 519, this.addMagic.bind(this), globalState.p2fighterName)
      input.setUpMpHud()
    }
    else if (globalState.currentMode == "vsBot"){
      this.fighter1 = new globalState.player1(this.context, 280, 519, this.addMagic.bind(this), globalState.p1fighterName)
      this.fighter2 = new globalState.player2(this.context, 640, 519, this.addMagic.bind(this), globalState.p2fighterName, globalState.hardVsBot)
      input.setUpSingleHud()
    }
    
    this.fighter1.currentDirection = this.fighter1.rightDirection
    this.fighter2.currentDirection = this.fighter2.leftDirection
    
    //largura das healthbars
    this.hb1 = 392
    this.hb2 = 392

   //vitorias de cada fighter
   this.f1wins = 0
   this.f2wins = 0

    this.startTimer = 2.5
    
    this.fighter1.opponent = this.fighter2
    this.fighter2.opponent = this.fighter1
  }
  
  updateHealthBar(frameTime){
    
    //ajusta a largura da health bar com base no hp do lutador
    if (this.hb1 > this.fighter1.hp){
      this.hb1 -= 300 * frameTime.secondsPassed
      if (this.hb1 < 0){ this.hb1 = 0 }
    }
    if (this.hb2 > this.fighter2.hp){
      this.hb2 -= 300 * frameTime.secondsPassed
      if (this.hb2 < 0){ this.hb2 = 0 }
    }
  }
  
  updatePoints(){
    if (this.fighter1.lost && this.fighter2.lost){
      return
    }
    if (this.fighter2.lost){
      this.f1wins += 1
    }
    else if (this.fighter1.lost){
      this.f2wins += 1
    }
  }
  
  drawTrophys(context, fWins, x, y){
    if (fWins == 0){ return }
    
    if (fWins == 1){
      context.drawImage(trofeuSprite, x, y, 70, 70)
    }
  }
  
  resetRound(){
    this.fighter1.hp = 392
    this.fighter2.hp = 392
    this.hb1 = 392
    this.hb2 = 392
    
    this.fighter1.positionX = 280
    this.fighter1.positionY = 519
    
    this.fighter1.groundPosition = 519
    this.fighter2.groundPosition = 519
    
    this.fighter2.positionX = 640
    this.fighter2.positionY = 519
    
    this.fighter1.currentDirection = this.fighter1.rightDirection
    this.fighter2.currentDirection = this.fighter2.leftDirection
    
    this.fighter1.angle = 0
    this.fighter2.angle = 0
    
    this.fighter1.changeState(this.fighter1.states.idle)
    this.fighter2.changeState(this.fighter2.states.idle)
    
    this.entities = []
    
    this.updatePoints()
  }
  
  update(frameTime){
    this.fighter1.update(frameTime)
    this.fighter2.update(frameTime)
    //console.log(this.fighter2.lookingToOpponent)
    
    if (this.entities.length > 0){
      for (let entity of this.entities){
        entity.update(frameTime)
      }
    }
    
    this.updateHealthBar(frameTime)
    
    
    
    if (this.fighter1.lost == true || this.fighter2.lost == true){
      this.startTimer -= frameTime.secondsPassed
      if (this.startTimer <= 0){
        if (this.f1wins < 2 && this.f2wins < 2){
        this.resetRound()
        this.startTimer = 2.5
        }
        if (this.f1wins == 2 || this.f2wins == 2) {
          changeScene(MenuScene, this.context, this.canvas)
        }
      }
    }
  }
  
  draw(){
    this.context.drawImage(stagesSprites[this.stageRandomizer], 0, 0, this.canvas.width, this.canvas.height)
    this.fighter1.draw()
    this.fighter2.draw()
    
    if (this.entities.length > 0){
      for (const entity of this.entities){
        entity.draw(this.context)
      }
    }
    
    this.context.strokeRect(70, 20, 400, 40)
    this.context.strokeRect(500, 20, 400, 40)
    
    this.context.fillStyle = "lime"
   // hp player1
    this.context.fillRect( 466, 24, -this.hb1, 32)
   // hp player2 
    this.context.fillRect(504, 24, this.hb2, 32)
    
    this.drawTrophys(this.context, this.f1wins, 350, 70)
    this.drawTrophys(this.context, this.f2wins, 490, 70)
  }
  
  cleanClassInstance(){
     this.fighter1 = null
     this.fighter2 = null
     this.context = null
     this.canvas = null
    soundFuncs.stopSound(battleMusics[this.musicRandomizer])
    this.entities = []
     this.entities = null
     this.startTimer = null
  }
}

export class SingleMode extends ActionScene {
  constructor(context, canvas){
  super(context, canvas)
    this.player = new globalState.player1(this.context, 20, 519, this.addMagic.bind(this), globalState.p1fighterName)
    this.hb1 = 392
    this.startTimer = 2.5
    this.spawner = [this.addGiant.bind(this), this.addPuncher.bind(this), this.addShooter.bind(this), this.addKicker.bind(this)]
    this.stageX = 0
    winSound.currentTime = 0
    this.invStageX = -1920
    input.setUpSingleHud()
    this.grd = this.context.createLinearGradient(60, 80, 60, 110)
      this.grd.addColorStop(0, "yellow")
      this.grd.addColorStop(1, "goldenrod")
      this.context.fillStyle = "lime"
  }
  updateHealthBar(frameTime){
    //ajusta a largura da health bar com base no hp do lutador
    if (this.hb1 > this.player.hp){
      this.hb1 -= 300 * frameTime.secondsPassed
      if (this.hb1 < 0){ this.hb1 = 0 }
    }
  }
  
  drawInverseBackground(){
    if (this.invStageX >= -1920){
        
      this.context.save()
      this.context.scale(-1, 1)
      this.context.drawImage(stagesSprites[this.stageRandomizer], this.invStageX, 0, this.canvas.width, this.canvas.height)
      this.context.restore() 
    }
  }
  
  addPuncher(){
    const r = getRandomPuncherSprites()
    if (r.ane == true){
    this.player.opponent.push(new PunchCpu(this.context, 970, 519, this.player, r.idle, r.hurt, r.punch, r.walk1, r.walk2, r.walk3, null, r.hurtbox))
    }
    else {
      this.player.opponent.push(new PunchCpu(this.context, 970, 519, this.player, r.idle, r.hurt, r.punch, r.walk1, r.walk2, r.walk3, r.walk4, r.hurtbox))
    }
  }
  addGiant(){
    const r = getRandomGiantSprites()
    if (r.ane == true){
    this.player.opponent.push(new Giant(this.context, 1000, 519, this.player, r.idle, r.kick, r.hurt, r.walk1, r.walk2, r.walk3, null, r.hurtbox))
    }
    else {
      this.player.opponent.push(new Giant(this.context, 1000, 519, this.player, r.idle, r.kick, r.hurt, r.walk1, r.walk2, r.walk3, r.walk4, r.hurtbox))
    }
  }
  addKicker(){
    const r = getRandomKickerSprites()
    this.player.opponent.push(new Kicker(this.context, 1960, 90, this.player, r.idle, r.hurt, r.kick, r.jump, r.hurtbox))
  }
  addShooter(){
    const r = getRandomShooterSprites()
    this.player.opponent.push(new Shooter(this.context, 970, 519, this.player, r.idle, r.hurt, r.magic, r.hurtbox, this.addEnemyMagic.bind(this)))
  }
  
  
  update(frameTime){
    if (this.player.lost){
      this.context.globalAlpha -= frameTime.secondsPassed
    }
    if (this.context.globalAlpha < 0.1){
      changeScene(MenuScene, this.context, this.canvas)
      return
    }
    
    this.player.update(frameTime)
    
    if (this.player.shouldOffset && this.player.velocityX > 0){
      this.stageX -= this.player.offsetValue * frameTime.secondsPassed 
      this.invStageX += this.player.offsetValue * frameTime.secondsPassed
    }
    
    if (this.stageX <= -960){
      this.stageX = -this.invStageX
    }

    if (this.invStageX >= 0){
      this.invStageX = -1920
    }
    
    this.updateHealthBar(frameTime)
    
    if (this.player.opponent.length > 0){
      this.player.opponent = this.player.opponent.filter(opp => {
   opp.update(frameTime);
           
   return opp.context
   })
 }
 if (this.entities.length > 0){
       this.entities = this.entities.filter(entity => {
        entity.update(frameTime)
         
        return entity.currentState != null
      })
  }
  
  if (this.player.shouldOffset && this.player.velocityX > 0){
    if (this.player.opponent.length < 5){
      const rndm = Math.floor(Math.random() * 500)
      const r = Math.floor(Math.random() * 4)
      if (rndm < 4 && this.player.score < 100){
        this.spawner[r]()
      }
    }
  }
    
    if (winSound.ended && input.clickWarningState.active == false){
      input.activateClickWarning()
      input.clickWarning.addEventListener('click', () => {
        changeScene(MenuScene, this.context, this.canvas)
        input.disableClickWarning()
      }, { once: true })
    }
    
    if (this.player.score > 99 && winSound.currentTime == 0){
      soundFuncs.stopSound(battleMusics[this.musicRandomizer])
      soundFuncs.playSound(winSound, 1, { volume: 1, loop: false })
      
     if (this.player.opponent.length > 0){
      for (let opp of this.player.opponent){
        opp.hp = 0
       }
     }
    }
}
  
  draw(){
    this.context.drawImage(stagesSprites[this.stageRandomizer], this.stageX, 0, 960, 540)
    this.drawInverseBackground()
    
    if (this.player.opponent.length > 0){
      for (let opponent of this.player.opponent){
        opponent.draw()
      }
    }
    
    this.player.draw()
    
    if (this.entities.length > 0){
      for (const entity of this.entities){
        entity.draw(this.context)
      }
    }
    
    this.context.fillStyle = "lime"
    this.context.strokeRect(70, 20, 400, 40)
    
    this.context.fillRect( 466, 24, -this.hb1, 32)
    
    this.context.fillStyle = "black"
    this.context.fillRect(220, 83, 160, 35)
    drawText(this.context, this.grd, 30, "Score: " + this.player.score.toString(), 230, 110)
  }
  
  cleanClassInstance(){
    this.grd = null
    this.context = null
    this.canvas = null
    this.entities = null
    this.player.opponent = null
    this.startTimer = null
    this.player = null
    this.spawner = null
    soundFuncs.stopSound(battleMusics[this.musicRandomizer])
  }
}

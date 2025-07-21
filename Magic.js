import { magicSprite } from "./sprites.js"
import { rectsOverlap } from "./collisions.js"
import * as soundFuncs from "./SoundHandler.js"
import { fogobixo } from "./musics.js"
import { frameTime } from "./Main.js"
const emptySprite = new Image()

export class Magic{
  constructor(direction, x, y, opponent){
    this.direction = direction
    this.opponent = opponent
    this.positionX = x
    this.positionY = y
    this.speed = 1000 * this.direction
    this.destroyTimer = 0
    this.struck = false
    this.alpha = 1
    
    this.states = {
      active: [[magicSprite], this.updateActive],
      collided: [[emptySprite], this.updateCollided]
    }
    this.currentState = this.states.active
  }
  changeState(){
    this.destroyTimer = performance.now()
    this.currentState = this.states.collided
    this.speed = 0
  }
  
  checkStruck(opponent, damage){
      if (this.struck == true){ return }
      if (opponent.lost){ return }
      
    const x1 = this.direction == 1 ? this.positionX + 120 : this.positionX - 120 - 70
    const hitbox = [x1, this.positionY + 60, 70, 50]
      
    const x2 = opponent.positionX - opponent.hurtBox[0]
    const y2 = opponent.positionY - opponent.hurtBox[1]
    const width2 = opponent.hurtBox[2]
    const height2 = opponent.hurtBox[3]
      
      if (!rectsOverlap(hitbox[0], hitbox[1], hitbox[2], hitbox[3], x2, y2, width2, height2) || opponent.currentState == opponent.states.hurtFall){
        return
      }
      const random = Math.floor(Math.random() * 10)
      if ( random < 4 ){
       if (opponent.isGiant) { soundFuncs.playSound(fogobixo, 0.8, { volume: 0.7, loop: false }) }
        else { soundFuncs.playSound(fogobixo, 1, { volume: 0.7, loop: false }) }
      }
      
      opponent.hp -= damage
      if (opponent.hp <= 0){ 
        opponent.opponent.score += 1
        if (opponent.opponent.score > 100) {opponent.opponent.score = 100}
      }
      opponent.changeState(opponent.states.hurtStand)
      
      opponent.slideDone = false
      opponent.slide = (51000 * this.direction)
      
      this.struck = true
      this.changeState()
    }
  
  updateActive = (frameTime) => {
    if (this.opponent.length == undefined){
      this.checkStruck(this.opponent, 30)
      
    }  else {
      
    if (this.opponent.length > 0){
      for (let opp of this.opponent){
      this.checkStruck(opp, 1)
      }
     } 
    }
    this.positionX += this.speed * frameTime.secondsPassed
    if (this.positionX > 1010 || this.positionX < -309.3){
      this.changeState()
    }
  }
  updateCollided = (frameTime) => {
    this.alpha -= 5 * frameTime.secondsPassed
  if (performance.now() > this.destroyTimer + 180){
    this.destroyTimer = performance.now()
    this.destroy()
  }
  }
  
  update(frameTime){
    if (this.currentState){
    this.currentState[1](frameTime)
    }
  }
  
  draw(context){
    if (this.alpha < 0.1){
     return
    }
    context.save()
    context.scale(this.direction, 1)
    
    if (!this.struck){
    context.drawImage(magicSprite, this.positionX * this.direction, this.positionY, 309.3, 174)
    }
    else {
    context.globalCompositeOperation = "lighter"
    context.globalAlpha = this.alpha
    context.drawImage(magicSprite, this.positionX * this.direction, this.positionY, 309.3, 174)
    }
    context.restore()
  }
  
  destroy(){
    this.currentState = null
    this.states = null
    this.opponent = null
  }
}

export class EnemyMagic extends Magic{
  constructor(direction, x, y, opponent){
    super(direction, x, y, opponent)
    this.direction = direction
    this.opponent = opponent
    this.damage = 30
    
    this.states = {
      active: [[magicSprite], this.updateActive],
      collided: [[emptySprite], this.updateCollided]
    }
    this.currentState = this.states.active
  }
  
  updateActive = (frameTime) => {
    this.checkStruck(this.opponent, this.damage)
    
    this.positionX += this.speed * frameTime.secondsPassed
    if (this.positionX > 1110 || this.positionX < -309.3){
      this.changeState()
    }
  }
}
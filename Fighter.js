import { isButtonPressed } from "./inputs.js"
import { rectsOverlap } from "./collisions.js"
import * as soundFuncs from "./SoundHandler.js"
import { punchSounds, woosh } from "./musics.js"
import { airSprites } from "./sprites.js"
import { frameTime } from "./Main.js"
import { setFighterInstanceSprites } from "./CpuSpawner.js"

export function playRandomPunchSound(){
  const random = Math.floor(Math.random() * 2)
  soundFuncs.playSound(punchSounds[random], 1, { volume: 1, loop: false })
}

export class BaseFighter {
  constructor(context, x, y, addMagic, name){
  this.context = context
  this.name = name  
  this.positionX = x
  this.positionY = y
  this.velocityX = 0
  this.velocityY = 0
  this.groundPosition = 519
  this.animationTimer = 0
  this.currentState
  this.currentFrame = 0
  this.shouldSlide = false
  this.addMagic = addMagic
  this.magicDelay = 1.2
  this.firedMagic = false
  this.hurtBox = [0,0,0,0]
  this.opponent
  this.hurtTimer = 0
  this.leftDirection = 1
  this.rightDirection = -1
  this.currentDirection = this.rightDirection
  this.slide = 0
  this.angle = 0
  this.randomDirection = 0
  this.hitStruck = false
  this.lost = false
  this.fallDuration = 0
  
  }
  notOnGround() { if (this.positionY < this.groundPosition) { return true } else { return false } }
  }

export class VsFighter extends BaseFighter {
  constructor(context, x, y, addMagic, name){
    super(context, x, y, addMagic, name)
    this.idleSprite = {}
    this.kick1Sprite = {}
    this.kick2Sprite = {}
    this.punchSprite = {}
    this.winSprite = {}
    this.sadSprite = {}
    this.hurtSprite = {}
    this.magicSprite = {}
    this.walk1Sprite = {}
    this.walk2Sprite = {}
    this.walk3Sprite = {}
    this.walk4Sprite = {}
    this.jumpSprite = {}
    this.magicTimer = 0
    this.hp = 392
    this.gileteBox = [0,0,0,0]
    this.airTimer = 0.3
    this.currentAir = 0
    this.winDelay = 1
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      kick: [[this.kick1Sprite, this.kick2Sprite, this.kick1Sprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite, this.walk4Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate],
      magic: [[this.magicSprite], this.magicInit, this.magicUpdate],
      win: [[this.winSprite], this.winInit],
      sad: [[this.sadSprite], this.sadInit],
      jump: [[this.jumpSprite], this.jumpInit, this.jumpUpdate],
      gilete: [[this.kick1Sprite], this.gileteInit, this.gileteUpdate]
    }
    setFighterInstanceSprites(this)
    this.currentState = this.states.idle
  }
  
  isAnimationFinished() {
  return this.currentFrame >= this.currentState[0].length - 1;
}

getGileteBox(){
  const x = this.currentDirection == this.leftDirection ? Math.round(this.positionX - this.states.kick[0][0].adjusts[1]/1.8) : this.positionX + 30
  this.gileteBox = [x, this.positionY - 140, 120, 100]
  return this.gileteBox
}

doingMagicInput(){
  if (this.firedMagic == true){ return }
  
  if (this.positionX < this.opponent.positionX && isButtonPressed(3) && isButtonPressed(4)){
    this.currentDirection = this.rightDirection
    return true
  }
  else if (this.positionX > this.opponent.positionX && isButtonPressed(1) && isButtonPressed(4)){
    this.currentDirection = this.leftDirection
    return true
  }
  else {
    return false
  }
}

shouldTransferSlide(){
  //retorna se os lutadores nao tiverem proximos
  if (Math.abs(this.positionX - this.opponent.positionX) > 500){
    return
  }
  
  if (this.positionX > 910 || this.positionX < 43){
    return true
  }
  else {
    return false
  }
}

notLookingToOpponent(){
  if (this.currentDirection == this.leftDirection && this.positionX < this.opponent.positionX){ return true }
  else if (this.currentDirection == this.rightDirection && this.positionX > this.opponent.positionX){ return true }
  else { return false }
}

hitClash(opponent, atkState){
    return opponent.currentState == atkState && !opponent.notLookingToOpponent() 
    }
    
    closeAttackReaction(damage, slide, damageState){
      playRandomPunchSound()
      this.opponent.changeState(damageState)
      this.opponent.hp -= damage
      if (this.opponent.hp < 0){ this.opponent.hp = 0 }
      
      if (this.opponent.shouldTransferSlide()){
      this.slideDone = false
      this.slide = slide * this.currentDirection
    }
    else {
      this.opponent.slideDone = false
      this.opponent.slide = -slide * this.currentDirection
    }
    }
  
  changeState(newState){
    if (this.currentState == newState){
      return
    }
    if (newState == this.states.jump){
      this.states.jump[0] = this.currentState[0]
    }
    
    this.currentFrame = 0
    this.currentState = newState
    this.currentState[1]()
  }
  
  checkWin(frameTime){
    if (this.currentState == this.states.win || this.lost){ return }
    
    if (this.opponent.lost){
      this.winDelay -= frameTime.secondsPassed
      if (this.winDelay <= 0){
        this.winDelay = 1
        this.changeState(this.states.win)
      }
    }
  }
  
  idleInit = () => {
    this.velocityX = 0
    this.angle = 0
    this.groundPosition = 519
    this.hitStruck = false
  }
  idleUpdate = () => {
    if (isButtonPressed(1)) {
     this.currentDirection = this.rightDirection
     this.changeState(this.states.walk)
   }
   else if (isButtonPressed(3)){
     this.currentDirection = this.leftDirection
     this.changeState(this.states.walk)
   }
   else if (isButtonPressed(0) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
   else if (isButtonPressed(4)){
     this.changeState(this.states.punch)
   }
   //verifica gilete
   else if (isButtonPressed(2) && isButtonPressed(5)){
     this.changeState(this.states.gilete)
   }
   
   else if (isButtonPressed(5)){
     this.changeState(this.states.kick)
   }
  }
  walkInit = () => {
    this.angle = 0
    this.velocityX = -600 * this.currentDirection
  }
  walkUpdate = () => {
    if (!isButtonPressed(1) && !isButtonPressed(3)) {
     this.changeState(this.states.idle)
   }
   
   if (isButtonPressed(4)){
     this.changeState(this.states.punch)
   }
    if (isButtonPressed(5)){
     this.changeState(this.states.kick)
   }
   if (isButtonPressed(0) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
  if (this.doingMagicInput()){
    this.changeState(this.states.magic)
  }
  }
  punchInit = () => {
    this.angle = 0
  if (!this.notOnGround()){
    Math.floor(this.velocityX /= 5)
   }
  }
  punchUpdate = () => {
    if (this.isAnimationFinished()) {
        this.changeState(this.states.idle)
      }
  }
  kickInit = () => {
    this.angle = 0
   if (!this.notOnGround()){
    Math.floor(this.velocityX /= 5)
   }
  }
  kickUpdate = () => {
    if (this.isAnimationFinished()){
        this.changeState(this.states.idle)
      }
  }
  hurtStandInit = () => {
    this.angle = 0
    this.hurtTimer = performance.now()
  }
  
  hurtStandUpdate = () => {
    if (this.lost){
      this.changeState(this.states.hurtFall)
    }
    if (performance.now() > this.hurtTimer + 260){
      this.hurtTimer = performance.now()
      this.changeState(this.states.idle)
      this.slide = 0
    }
  }
  hurtFallInit = () => {
    this.fallDuration = Math.round(((Math.random() * 0.7) + 1) * 1000)
    this.angle = 0
    this.groundPosition = 610
    this.hurtTimer = performance.now()
    this.velocityY = -700
    this.randomDirection = Math.random() < 0.5 ? Math.PI/2 : -Math.PI/2
  }
  hurtFallUpdate = () => {
   if (this.randomDirection < 0){
     if (this.angle > this.randomDirection){
       this.angle -= 4 * frameTime.secondsPassed
     }
   }
   else {
     if (this.angle < this.randomDirection){
       this.angle += 4 * frameTime.secondsPassed
     }
   }
   if (this.lost){ return }
    if (performance.now() > this.hurtTimer + this.fallDuration){
      this.groundPosition = 519
      this.slide = 0
      this.angle = 0
      this.randomDirection = 0
      this.changeState(this.states.idle)
      this.fallDuration = 0
      this.hurtTimer = performance.now()
    }
  }
  magicInit = () => {
    this.angle = 0
    this.addMagic(-this.currentDirection, this.positionX - 100 * -this.currentDirection, this.positionY - this.currentState[0][this.currentFrame].adjusts[1]* 1.1, this.opponent)
   this.firedMagic = true
   if (!this.notOnGround()){
    this.velocityX = 0
   }
    this.magicTimer = performance.now()
  }
  magicUpdate = () => {
    if (performance.now() > this.magicTimer + 220){
      this.changeState(this.states.idle)
      this.magicTimer = performance.now()
    }
  }
  sadInit = () => {
    this.groundPosition = 519
    this.velocityX = 0
    this.angle = 0
  }
   winInit = () => {
    this.groundPosition = 519
    this.velocityX = 0
    this.angle = 0
  }
  jumpInit = () => {
    this.angle = 0
    this.velocityY = -1500
  }
  jumpUpdate = () => {
    if (!this.notOnGround()){
    this.changeState(this.states.idle)
    }
    
    if (isButtonPressed(4)){
     this.changeState(this.states.punch)
   }
    if (isButtonPressed(5)){
     this.changeState(this.states.kick)
   }
   if (this.doingMagicInput()){
    this.changeState(this.states.magic)
  }
  }
  
  gileteInit = () => {
    this.angle = 0
    this.currentAir = 0
    this.airTimer = 0.1
    this.velocityY = -1200
    this.velocityX = -60 * this.currentDirection
    this.gileteBox = this.getGileteBox()
    soundFuncs.playSound(woosh, 1.5, { volume: 1, loop: false })
  }
  gileteUpdate = () => {
    this.angle += 10 * this.currentDirection * frameTime.secondsPassed
    if (Math.abs(this.angle) < Math.PI){
    this.gileteBox[1] -= 1200 * frameTime.secondsPassed
    }
    else {
      if (Math.abs(this.angle) < 4.5){
      this.gileteBox[0] -= 190 * -this.currentDirection * frameTime.secondsPassed
      }
      else{
      for (let x = 0; x < 3; x++){
      this.gileteBox[x] = 0
      }
    }
   }
    
    if (!this.notOnGround()){
      this.angle = 0
      this.changeState(this.states.idle)
    }
  }
  
  updateAir(frameTime){
    if (this.currentState == this.states.gilete){
      if (this.airTimer > 0){
      this.airTimer -= frameTime.secondsPassed
      }
      else {
        this.currentAir++
        this.airTimer = 0.1
      }
    }
  }
  
  updateSlide(frameTime){
    const deceleration = 125000
   if (Math.abs(this.slide) > 3500){
    if (this.slide > 0) {
            this.slide -= deceleration * frameTime.secondsPassed
        } else {
            this.slide += deceleration * frameTime.secondsPassed
        }
    this.velocityX = this.slide * frameTime.secondsPassed
   }
   
   else {
   if (this.slideDone == false){
     this.slide = 0
     this.velocityX = 0
     
     if (isButtonPressed(1) || isButtonPressed(3)){
       if (this.currentState != this.states.hurtStand && this.currentState != this.states.hurtFall){
     this.velocityX = (-600 * this.currentDirection)
       }
     }
     this.slideDone = true
    }
   }
  }
  
  updateAttackCollided(frameTime){
    if (this.currentState != this.states.punch && this.currentState != this.states.kick && this.currentState != this.states.gilete){
      return
    }
    
    const x1 = this.currentDirection == this.leftDirection ? this.positionX - this.currentState[0][this.currentFrame].adjusts[2] : this.positionX - this.currentState[0][this.currentFrame].adjusts[2]/1.9
    const y1 = this.positionY - this.currentState[0][this.currentFrame].adjusts[3]
    const width1 = this.currentState[0][this.currentFrame].adjusts[0]
    const height1 = this.currentState[0][this.currentFrame].adjusts[1]
    
    const x2 = this.opponent.positionX - this.opponent.hurtBox[0]
    const y2 = this.opponent.positionY - this.opponent.hurtBox[1]
    const width2 = this.opponent.hurtBox[2]
    const height2 = this.opponent.hurtBox[3]
    
    if (!rectsOverlap(x1, y1, width1, height1, x2, y2, width2, height2) || this.hitStruck == true){
      return
    }
    
    if (this.currentState == this.states.gilete && !this.notLookingToOpponent() && this.opponent.currentState != this.opponent.states.hurtFall && rectsOverlap(this.gileteBox[0], this.gileteBox[1], this.gileteBox[2], this.gileteBox[3], x2, y2, width2, height2)){
      
      if (!this.hitClash(this.opponent, this.opponent.states.gilete)){
      this.closeAttackReaction(70, 51000, this.opponent.states.hurtFall)
    }
    else {
      playRandomPunchSound()
      this.opponent.changeState(this.opponent.states.hurtFall)
      this.changeState(this.states.hurtFall)
      this.opponent.hp -= 70
      this.hp -= 70
      if (this.opponent.hp < 0){ this.opponent.hp = 0 }
      if (this.hp < 0){ this.hp = 0 }
      
      if (this.opponent.shouldTransferSlide()){
      this.slideDone = false
      this.slide = 51000 * this.currentDirection
    }
    else {
      this.opponent.slideDone = false
      this.opponent.slide = -51000 * this.currentDirection
      this.slideDone = false
      this.slide = -51000 * this.opponent.currentDirection
    }
    }
    this.hitStruck = true
    return
   }
    
    if (this.currentFrame != 1 || this.notLookingToOpponent() || this.opponent.currentState == this.opponent.states.hurtFall){
      return
    }
    if (this.currentState == this.states.kick){
      
      if (!this.hitClash(this.opponent, this.opponent.states.kick)){
      this.closeAttackReaction(50, 51000, this.opponent.states.hurtFall)
    }
    else {
      playRandomPunchSound()
      this.opponent.changeState(this.opponent.states.hurtFall)
      this.changeState(this.states.hurtFall)
      this.opponent.hp -= 50
      this.hp -= 50
      if (this.opponent.hp < 0){ this.opponent.hp = 0 }
      if (this.hp < 0){ this.hp = 0 }
      
      if (this.opponent.shouldTransferSlide()){
      this.slideDone = false
      this.slide = 51000 * this.currentDirection
    }
    else {
      this.opponent.slideDone = false
      this.opponent.slide = -51000 * this.currentDirection
      this.slideDone = false
      this.slide = -51000 * this.opponent.currentDirection
    }
    }
    }
    
    if (this.currentState == this.states.punch){
      if (!this.hitClash(this.opponent, this.opponent.states.punch)){
      this.closeAttackReaction(30, 43000, this.opponent.states.hurtStand)
      if (this.opponent.currentState == this.opponent.states.hurtStand){
      this.opponent.states.hurtStand[1]()
      }
    }
    else {
      playRandomPunchSound()
      this.opponent.changeState(this.opponent.states.hurtStand)
      this.changeState(this.states.hurtStand)
      this.opponent.hp -= 30
      this.hp -= 30
      if (this.opponent.hp < 0){ this.opponent.hp = 0 }
      if (this.hp < 0){ this.hp = 0 }
      
      if (this.opponent.shouldTransferSlide()){
      this.slideDone = false
      this.slide = 43000 * this.currentDirection
    }
    else {
      this.opponent.slideDone = false
      this.opponent.slide = -43000 * this.currentDirection
      this.slideDone = false
      this.slide = -43000 * this.opponent.currentDirection
    }
    }
  }
    this.hitStruck = true
  }
  
  updatePush(){
    const x1 = this.positionX - this.hurtBox[0]
    const y1 = this.positionY - this.hurtBox[1]
    const width1 = this.hurtBox[2]
    const height1 = this.hurtBox[3]

    const x2 = this.opponent.positionX - this.opponent.hurtBox[0]
    const y2 = this.opponent.positionY - this.opponent.hurtBox[1]
    const width2 = this.opponent.hurtBox[2]
    const height2 = this.opponent.hurtBox[3]
    
    if (!rectsOverlap(x1, y1, width1, height1, x2, y2, width2, height2)) {
      return
    }
      if (this.positionX < this.opponent.positionX && this.velocityX >= 0){
        this.positionX = this.opponent.positionX - this.opponent.hurtBox[2]/2 - this.hurtBox[2]/2
      }
      
      else if (this.positionX > this.opponent.positionX && this.velocityX <= 0) {
        this.positionX = this.opponent.positionX + this.opponent.hurtBox[2]/2 + this.hurtBox[2]/2
      }
      else if (this.positionX == this.opponent.positionX){
        this.positionX = this.opponent.positionX + ((this.opponent.hurtBox[2]/2 + this.hurtBox[2]/2) * (Math.random() < 0.5 ? 1 : -1))
      }
  }
  
  updateAnimation(frameTime){
    if (frameTime.previous > this.animationTimer + 100){
      this.animationTimer = frameTime.previous
      this.currentFrame++
      
      if (this.currentFrame > this.currentState[0].length - 1){
        this.currentFrame = 0
      }
    }
  }
  
  updateStageLimits(frameTime){
    this.updatePush()
    
    if (this.positionX > 920){
      this.positionX = 920
    }
    else if (this.positionX < 40){
      this.positionX = 40
    }
    if (this.notOnGround()){
    this.velocityY += 4100 * frameTime.secondsPassed
    }
    if (this.positionY > this.groundPosition){
      this.positionY = this.groundPosition
    }
  }
  
  update(frameTime){
    if (this.hp <= 0){
      this.lost = true
    }
    else {
      this.lost = false
    }
    
    if (this.firedMagic == true){
      this.magicDelay -= frameTime.secondsPassed
      if (this.magicDelay <= 0){
        this.magicDelay = 1.2
        this.firedMagic = false
      }
    } else {
      this.magicDelay = 1.2
    }
    
    this.positionX += this.velocityX * frameTime.secondsPassed
    this.positionY += this.velocityY * frameTime.secondsPassed
    
    this.updateSlide(frameTime)
    this.updateAnimation(frameTime)
    this.updateStageLimits(frameTime)
    
    if (this.shouldOffset == true){
      this.offsetValue = Math.abs(Math.floor(this.velocityX / 1.5))
    }
    
    //chama a update do state atual se esse state o tiver
    if (this.currentState[2]){
      this.currentState[2]()
    }
    this.updateAttackCollided(frameTime)
    this.updateAir(frameTime)
    this.checkWin(frameTime)
  }
  
  draw() {
  this.context.save(); // Salva o estado atual do contexto

  // Define o ponto de rotação (centro do personagem)
  const centerX = this.positionX;
  const centerY = this.positionY - this.currentState[0][this.currentFrame].adjusts[1] / 2;

  this.context.translate(centerX, centerY); // Move o ponto de origem
  this.context.rotate(this.angle); // Aplica a rotação
  this.context.scale(this.currentDirection, 1); // Mantém a escala horizontal correta

  // Desenha a imagem deslocada para alinhar corretamente
  this.context.drawImage(
    this.currentState[0][this.currentFrame].img,
    -this.currentState[0][this.currentFrame].adjusts[2], // Ajusta X relativo ao centro
    - this.currentState[0][this.currentFrame].adjusts[1] / 2, // Ajusta Y relativo ao centro
    this.currentState[0][this.currentFrame].adjusts[0],
    this.currentState[0][this.currentFrame].adjusts[1]
  )

  this.context.restore(); // Restaura o contexto para evitar acúmulo de transformações
  
  if (this.currentState == this.states.gilete){
    
    this.context.save()
    this.context.scale(this.currentDirection, 1)
    
    if (this.currentAir < 4){
    this.context.drawImage(airSprites[this.currentAir], (this.positionX * this.currentDirection) - 200, this.positionY - this.kick1Sprite.adjusts[1]/1.1, 200, 320)
    }
    this.context.restore()
  }
}
}

export class SingleFighter extends VsFighter{
  constructor(context, x, y, addMagic, name){
  super(context, x, y, addMagic, name)
  this.opponent = []
  this.score = 0
  this.shouldOffset = false
  this.offsetValue = 0  
  }
  
  notLookingToOpponent(opponent){
  if (this.currentDirection == this.leftDirection && this.positionX < opponent.positionX){ return true }
  else if (this.currentDirection == this.rightDirection && this.positionX > opponent.positionX){ return true }
  else { return false }
}
  
  updateStageLimits(frameTime){
    this.updatePush()
    
    if (this.positionX > 400){
      this.shouldOffset = true
      this.positionX = 400
    }
    else if (this.positionX < 400){
      this.shouldOffset = false
    }
    if (this.positionX < 40){
      this.positionX = 40
    }
    if (this.notOnGround()){
    this.velocityY += 4100 * frameTime.secondsPassed
    }
    if (this.positionY > this.groundPosition){
      this.positionY = this.groundPosition
    }
  }
  
  doingMagicInput(){
  if (this.firedMagic == true){ return }
  
  if (isButtonPressed(3) && isButtonPressed(4)){
    this.currentDirection = this.rightDirection
    return true
  }
  else if (isButtonPressed(1) && isButtonPressed(4)){
    this.currentDirection = this.leftDirection
    return true
  }
  
  else {
    return false
  }
}

  checkWin(frameTime){
    if (this.currentState == this.states.win){ return }
    
    if (this.score > 99){
      this.winDelay -= frameTime.secondsPassed
      if (this.winDelay <= 0){
        this.winDelay = 1
        this.changeState(this.states.win)
      }
    }
  }
  
  updatePush(){
    for (let opponent of this.opponent) {
      if (!opponent.context || opponent.lost) { continue }
    if (Math.abs(opponent.positionX - this.positionX) > Math.round(this.hurtBox[2]/2) + Math.round(opponent.hurtBox[2]/2)) { continue }
    
    else if (this.positionY - this.hurtBox[3] > opponent.positionY || this.positionY < opponent.positionY - opponent.hurtBox[3]) { continue }
   
   if (this.positionX < opponent.positionX && this.velocityX >= 0){
        this.positionX = opponent.positionX - opponent.hurtBox[2]/2 - this.hurtBox[2]/2
        continue
      }
      
      else if (this.positionX > opponent.positionX && this.velocityX <= 0) {
        this.positionX = opponent.positionX + opponent.hurtBox[2]/2 + this.hurtBox[2]/2
        continue
      }
      else if (this.positionX == opponent.positionX){
        this.positionX = opponent.positionX + ((opponent.hurtBox[2]/2 + this.hurtBox[2]/2) * (Math.random() < 0.5 ? 1 : -1))
        continue
      }
    }
  }
  
  updateAttackCollided(frameTime){
  if (this.currentState != this.states.punch && this.currentState != this.states.kick && this.currentState != this.states.gilete){
    return
  }
  
  if (this.hitStruck == true){
      return // Se já registrou ataque, sai da funcao
    }

  // Verifica a colisão com todos os oponentes
  for (let opponent of this.opponent) {
    if (this.notLookingToOpponent(opponent)){ continue }
    
    if (Math.abs((opponent.positionX + (opponent.hurtBox[0] * this.currentDirection)) - this.positionX) > Math.round(this.currentState[0][this.currentFrame].adjusts[0]/1.6)) { continue }
    
    if (this.positionY - Math.round(this.currentState[0][this.currentFrame].adjusts[3]/1.4) > opponent.positionY || this.positionY < opponent.positionY - Math.round(opponent.hurtBox[3]/1.5)) { continue }
    
    // Verifica a colisão específica do gilete
    if (this.currentState == this.states.gilete && opponent.currentState != opponent.states.hurtFall && rectsOverlap(this.gileteBox[0], this.gileteBox[1], this.gileteBox[2], this.gileteBox[3], opponent.positionX - opponent.hurtBox[0], opponent.positionY - opponent.hurtBox[1], opponent.hurtBox[2], opponent.hurtBox[3])){
      
      playRandomPunchSound();
      if (opponent.isGiant) { opponent.changeState(opponent.states.hurtStand) }
      else { opponent.changeState(opponent.states.hurtFall) }
      
      opponent.hp -= 3;
      if (opponent.hp <= 0) {
      opponent.hp = 0;
      this.score += 1
        if (this.score > 100){ this.score = 100 }
      }
        opponent.slideDone = false;
        opponent.slide = -51000 * this.currentDirection;
        
        this.hitStruck = true;
        continue
    }

    // Verifica as colisões para os outros tipos de ataques (kick, punch)
    if (this.currentFrame != 1 || opponent.currentState == opponent.states.hurtFall){
      continue; // Se não houve colisão relevante, vai para o próximo oponente
    }

    if (this.currentState == this.states.kick){
      
      playRandomPunchSound();
      if (opponent.isGiant) { opponent.changeState(opponent.states.hurtStand) }
      else { opponent.changeState(opponent.states.hurtFall) }
      opponent.hp -= 2;
      
      if (opponent.hp <= 0) {
      opponent.hp = 0;
      this.score += 1
        if (this.score > 100){ this.score = 100 }
      }
        opponent.slideDone = false;
        opponent.slide = -51000 * this.currentDirection
      
        this.hitStruck = true;
        continue
    }

    if (this.currentState == this.states.punch){
      
      playRandomPunchSound();
      opponent.changeState(opponent.states.hurtStand);
      opponent.hp -= 1;

      if (opponent.hp <= 0) {
      opponent.hp = 0;
      this.score += 1
        if (this.score > 100){ this.score = 100 }
      }
      opponent.slideDone = false;
      opponent.slide = -43000 * this.currentDirection;
      
      if (opponent.currentState == this.states.hurtStand){
        opponent.states.hurtStand[1](); // Chama a ação correspondente no estado "hurtStand"
      }
      
      this.hitStruck = true;
       continue
    }
    break; // Só ataca um oponente por vez, se colidir com um
  }
 }
}

export class VsModeBot extends VsFighter{
  constructor(context, x, y, addMagic, name, hardMode){
  super(context, x, y, addMagic, name)
    this.hardMode = hardMode
    this.distanceXfromPlayer = 0
    this.distanceYfromPlayer = 0
    this.turnAroundTimer = Math.random()/ 3.3
    this.lookingToOpponent = true
    
    this.states.idle[2] = this.idleUpdate
    this.states.walk[2] = this.walkUpdate
    this.states.jump[2] = this.jumpUpdate
    
    this.botFightStates = {
     dashDanceFooling: this.dashDance,
     rushingIn: this.rush,
     waitingShortly: this.wait,
    }
    this.currentFightState = this.botFightStates.rushingIn
  }
  
  changeFightState(newFstate){
    if (newFstate == this.currentFightState){
      return
    }
    
    this.currentFightState = newFstate
  }
  
  updateLookingToOpponent(){
    if (this.notLookingToOpponent()){
      this.lookingToOpponent = false
    }
    else {
      this.lookingToOpponent = true
    }
  }
  
  invertDirection(){
    if (this.currentDirection == this.leftDirection)
    { this.currentDirection = this.rightDirection }
    
    else if (this.currentDirection == this.rightDirection)
    { this.currentDirection = this.leftDirection }
  }
  
  idleUpdate = () => {
    return
 }
  walkUpdate = () => {
    return
 }
  jumpUpdate = () => {
   if (!this.notOnGround()){
     this.changeState(this.states.idle)
    }
 }
  
  dashDance = () => {
    if (this.currentState == this.states.idle){
      this.changeState(this.states.walk)
    }
    
    if (!this.notOnGround()){
      const rndm = Math.floor(Math.random() * 500)
      if (rndm < 4){ this.changeState(this.states.jump) }
    }
    
    this.tryRandomAttack(35)
    
    if (this.firedMagic == false){
      if (this.currentState == this.states.jump || this.currentState == this.states.walk){
      const rndm = Math.floor(Math.random() * 500)
      if (rndm < 4){
        if (!this.lookingToOpponent){ this.invertDirection() }
        this.changeState(this.states.magic)
       }
      }
    }
    
    if (this.currentState != this.states.gilete && this.currentState != this.states.hurtFall){
      this.turnAroundTimer -= frameTime.secondsPassed
    }
    
    if (this.turnAroundTimer <= 0){ 
      this.invertDirection()
      this.velocityX *= -1
      this.turnAroundTimer = Math.random()/ 3.3
    }
 }
  
  rush = () => {
    const waitChance = Math.floor(Math.random() * 500)
    if (waitChance < 50) { 
      this.changeState(this.states.idle)
      this.changeFightState(this.botFightStates.waitingShortly)
    }
    
    if (this.currentState == this.states.idle){
      if (!this.lookingToOpponent){ this.invertDirection() }
      this.changeState(this.states.walk)
    }
    
    if (!this.notOnGround()){
      const rndm = Math.floor(Math.random() * 800)
      if (rndm < 6){ this.changeState(this.states.jump) }
    }
      
      if (this.firedMagic == false){
       const rndm = Math.floor(Math.random() * 800)
       if (rndm < 2){
         if (!this.lookingToOpponent){ this.invertDirection() }
         this.changeState(this.states.magic)
      }
     }
    
    if (this.currentState == this.states.magic){
      return
    }
    this.tryRandomAttack(5)
  }
  wait = () => {
    const rushChance = Math.floor(Math.random() * 500)
    if (rushChance < 6) {
      this.changeFightState(this.botFightStates.rushingIn)
    }
    
    if (this.firedMagic == false){
       const rndm = Math.floor(Math.random() * 800)
       if (rndm < 2){
         if (!this.lookingToOpponent){ this.invertDirection() }
         this.changeState(this.states.magic)
      }
     }
    
    if (this.currentState == this.states.magic){
      return
    }
    this.tryRandomAttack(10)
  }
  
  tryRandomAttack(level){
    if (this.distanceXfromPlayer < 140){
      const rndm = Math.floor(Math.random() * 500)
      if (rndm < level){
        const randomAttack = Math.floor(Math.random() * 3) + 1
        if (!this.lookingToOpponent){ this.invertDirection() }
        
        switch (randomAttack){
          case 1: this.changeState(this.states.punch); break
          case 2: this.changeState(this.states.kick); break
          case 3: if (!this.notOnGround()){ this.changeState(this.states.gilete) } else { this.changeState(this.states.punch) }; break      
        }
      }
    }
  }
  
  updateHardBehaviour(){
    if (this.opponent.lost || this.lost){
      return
    }
    if (this.opponent.currentState == this.opponent.states.hurtFall || this.opponent.currentState == this.opponent.states.hurtStand){
      return
    }
    
    this.botFightStates.dashDanceFooling()
  }
  updateNormalBehaviour(){
    if (this.opponent.lost || this.lost){
      return
    }
    if (this.opponent.currentState == this.opponent.states.hurtFall || this.opponent.currentState == this.opponent.states.hurtStand){
      return
    }
    this.currentFightState()
    
  }
  
  update(frameTime){
    super.update(frameTime)
    this.updateLookingToOpponent()
    
    this.distanceXfromPlayer = Math.abs(this.positionX - this.opponent.positionX)
    
    if (this.hardMode){
      this.updateHardBehaviour()
      return
    } else {
      this.updateNormalBehaviour()
    }
    
  }
}
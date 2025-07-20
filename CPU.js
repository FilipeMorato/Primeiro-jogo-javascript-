import { BaseFighter } from "./Fighter.js"
import { playRandomPunchSound } from "./Fighter.js"
import { frameTime } from "./Main.js"

export class PunchCpu extends BaseFighter {
  constructor(context, x, y, opponent, idle, hurt, punch, walk1, walk2, walk3, walk4, hurtb){
    super(context, x, y)
    this.hp = 2
    this.currentDirection = this.leftDirection
    this.idleSprite = idle
    this.hurtSprite = hurt
    this.punchSprite = punch 
    this.walk1Sprite = walk1
    this.walk2Sprite = walk2
    this.walk3Sprite = walk3
    if (walk4){
    this.walk4Sprite = walk4
    
    this.states = {
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite, this.walk4Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate]
    }
  } else {
    this.states = {
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate]
    }
  }
    this.changeState(this.states.walk)
    this.opponent = opponent
    this.hurtBox = hurtb
  }
  
  changeState(newState){
    if (this.currentState == newState){
      return
    }
    
    this.currentFrame = 0
    this.currentState = newState
    this.currentState[1]()
  }
  
  isAnimationFinished() {
  return this.currentFrame >= this.currentState[0].length - 1;
}
  
  walkInit = () => {
    this.velocityX = -60
    this.hitStruck = false
  }
  walkUpdate = () => {
    if (this.opponent.lost){
      return
    }
    if (this.velocityX == 0){
      this.velocityX = -60
    }
    
   const rndm = Math.floor(Math.random() * 200)
   if (rndm < 4){ this.changeState(this.states.punch)}
  }
  punchInit = () => {
    this.velocityX = -30
  }
  punchUpdate = () => {
   if (this.isAnimationFinished()) {
        this.changeState(this.states.walk)
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
      this.changeState(this.states.walk)
      this.slide = 0
    }
  }
  hurtFallInit = () => {
    this.fallDuration = Math.round(((Math.random() * 0.7) + 1) * 1000)
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
    if (performance.now() > this.hurtTimer + this.fallDuration){
      this.groundPosition = 519
      this.slide = 0
      this.angle = 0
      this.randomDirection = 0
      this.fallDuration = 0
      this.hurtTimer = performance.now()
      this.destroy()
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
  
  updateSlide(frameTime){
   if (Math.abs(this.slide) > 3200){
  this.slide /= 60 * frameTime.secondsPassed
  this.velocityX = this.slide * frameTime.secondsPassed
   }
   
   else {
   if (this.slideDone == false){
     this.slide = 0
     this.velocityX = 0
     this.slideDone = true
   }
   }
  }
  updateAttackCollided(frameTime){
    if (this.hitStruck == true || !this.context){ return }
    if (this.currentState != this.states.punch){ return }
    if (this.currentFrame != 1){ return }
    if (this.positionX <= this.opponent.positionX){ return }
    if (this.positionX - this.opponent.positionX > this.punchSprite.adjusts[1]/2 + this.opponent.hurtBox[2]/2){ return }
    if (this.positionY - this.currentState[0][this.currentFrame].adjusts[3] > this.opponent.positionY || this.positionY < this.opponent.positionY - this.opponent.hurtBox[3]) { return }
    
    console.log("enemyHit")
    playRandomPunchSound()
      this.opponent.changeState(this.opponent.states.hurtStand)
      this.opponent.hp -= 30
      if (this.opponent.hp < 0){ this.opponent.hp = 0 }
      
      if (this.opponent.positionX < 43){
      this.slideDone = false
      this.slide = 41000 * this.currentDirection
    }
    else {
      this.opponent.slideDone = false
      this.opponent.slide = -41000 * this.currentDirection
    }
      this.hitStruck = true
    }
  
  destroy(){
    this.context = null
    this.currentState = null
    this.addMagic = null
    this.hurtBox = null
    this.opponent = null
    this.currentDirection = null
    this.idleSprite = null
    this.hurtSprite = null
    this.punchSprite = null
    this.walk1Sprite = null
    this.walk2Sprite = null
    this.walk3Sprite = null
    this.walk4Sprite = null
    this.states = null
  }
  
  update(frameTime){
    if (this.positionX < -this.hurtBox[2]){
        this.destroy()
      }
    
    if (this.context == null){ return }
    
    if (this.hp <= 0){
      this.lost = true
      this.changeState(this.states.hurtFall)
    }
    else {
      this.lost = false
    }
    if (this.opponent.shouldOffset && this.opponent.velocityX > 0){
    this.positionX += Math.floor((this.velocityX - this.opponent.offsetValue) * frameTime.secondsPassed)
    }
    else {
      this.positionX += Math.floor(this.velocityX * frameTime.secondsPassed)
    }
    this.positionY += Math.floor(this.velocityY * frameTime.secondsPassed)
    
    this.updateSlide(frameTime)
    this.updateAnimation(frameTime)
    if (this.context){
    this.currentState[2]()
    }
    
    if (this.notOnGround()){
      this.velocityY += 4000 * frameTime.secondsPassed
    }
    
    this.updateAttackCollided(frameTime)
  }
  
  draw(){
    if (!this.context){ return }
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
  }
}

export class Kicker extends BaseFighter{
  constructor(context, x, y, opponent, idle, hurt, kick, jump, hurtb){
    super(context, x, y)
    this.hp = 1
    this.currentDirection = this.leftDirection
    this.idleSprite = idle
    this.hurtSprite = hurt
    this.jumpSprite = jump
    this.kickSprite = kick
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      kick: [[this.kickSprite], this.kickInit, this.kickUpdate],
      jump: [[this.jumpSprite], this.jumpInit, this.jumpUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate]
    }
    this.changeState(this.states.kick)
    this.opponent = opponent
    this.hurtBox = hurtb
    this.timeToKick = 0.4
    this.idleTime = 1
    this.velocityX = -340
  }
  
  changeState(newState){
    if (this.currentState == newState){
      return
    }
    
    this.currentFrame = 0
    if (newState == this.states.hurtStand){
    this.currentState = this.states.hurtFall
    } else {
      this.currentState = newState
    }
    this.currentState[1]()
  }
  
  idleInit = () => {
    this.angle = 0
    this.velocityX = 0
    this.hitStruck = false
  }
  
  idleUpdate = () => {
   this.idleTime -= frameTime.secondsPassed;
  if (this.idleTime <= 0) {
    this.idleTime = 1
    this.changeState(this.states.jump);
  }
  }
  
  hurtFallInit = () => {
    this.fallDuration = Math.round(((Math.random() * 0.7) + 1) * 1000)
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
    if (performance.now() > this.hurtTimer + this.fallDuration){
      this.groundPosition = 519
      this.slide = 0
      this.angle = 0
      this.randomDirection = 0
      this.fallDuration = 0
      this.hurtTimer = performance.now()
      this.destroy()
    }
  }
  
  jumpInit = () => {
    this.velocityX = -340
    this.velocityY = -1500
  }
  jumpUpdate = () => {
    if (this.lost){ return }
    if (this.timeToKick > 0){
      this.timeToKick -= frameTime.secondsPassed
    }
    else { this.timeToKick = 0.4
    this.changeState(this.states.kick) }
    if (!this.notOnGround()){
      this.changeState(this.states.idle)
    }
    
  }
  kickInit = () => {
    
  }
  kickUpdate = () => {
    if (!this.notOnGround()){
      this.changeState(this.states.idle)
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
  
  updateSlide(frameTime){
   if (Math.abs(this.slide) > 3200){
  this.slide /= 60 * frameTime.secondsPassed
  this.velocityX = this.slide * frameTime.secondsPassed
   }
   
   else {
   if (this.slideDone == false){
     this.slide = 0
     this.velocityX = 0
     this.slideDone = true
   }
   }
  }
  updateAttackCollided(frameTime){
    if (this.hitStruck == true || !this.context){ return }
    if (this.currentState != this.states.kick){ return }
    if (this.positionX <= this.opponent.positionX){ return }
    if (this.positionX - this.opponent.positionX > this.kickSprite.adjusts[1]/2 + this.opponent.hurtBox[2]/2){ return }
    if (this.positionY - this.currentState[0][this.currentFrame].adjusts[3] > this.opponent.positionY || this.positionY < this.opponent.positionY - this.opponent.hurtBox[3]) { return }
    
    console.log("enemyHit")
    playRandomPunchSound()
      this.opponent.changeState(this.opponent.states.hurtFall)
      this.opponent.hp -= 50
      if (this.opponent.hp < 0){ this.opponent.hp = 0 }
      
      if (this.opponent.positionX < 43){
      this.slideDone = false
      this.slide = 53000 * this.currentDirection
    }
    else {
      this.opponent.slideDone = false
      this.opponent.slide = -53000 * this.currentDirection
    }
      this.hitStruck = true
    }
  
  update(frameTime){
    if (this.positionX < -this.hurtBox[2]){
        this.destroy()
      }
    
    if (this.context == undefined){ return }
    
    if (this.hp <= 0){
      this.lost = true
      this.changeState(this.states.hurtFall)
    }
    else {
      this.lost = false
    }
    
    if (this.opponent.shouldOffset && this.opponent.velocityX > 0){
    this.positionX += Math.floor((this.velocityX - this.opponent.offsetValue) * frameTime.secondsPassed)
    }
    else {
      this.positionX += Math.floor(this.velocityX * frameTime.secondsPassed)
    }
    this.positionY += Math.floor(this.velocityY * frameTime.secondsPassed)
    
    this.updateSlide(frameTime)
    this.updateAnimation(frameTime)
    if (this.context){
    this.currentState[2]()
    }
    if (this.notOnGround()){
      this.velocityY += 3000 * frameTime.secondsPassed
      if (this.velocityY > 1600) { this.velocityY = 1600 }
      
    } else if (this.positionY > this.groundPosition){
        this.positionY = this.groundPosition
      }
      
    this.updateAttackCollided(frameTime)
  }
  
  draw(){
    if (!this.context){ return }
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

  this.context.restore()
  }
  
  destroy(){
    this.context = null
    this.currentState = null
    this.addMagic = null
    this.hurtBox = null
    this.opponent = null
    this.currentDirection = null
    this.idleSprite = null
    this.hurtSprite = null
    this.kickSprite = null
    this.jumpSprite = null
    this.states = null
  }
}

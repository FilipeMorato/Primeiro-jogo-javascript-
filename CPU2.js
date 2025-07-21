import { BaseFighter } from "./Fighter.js"
import { PunchCpu } from "./CPU.js"
import { playRandomPunchSound } from "./Fighter.js"
import { frameTime } from "./Main.js"

export class Shooter extends BaseFighter{
  constructor(context, x, y, opponent, idle, hurt, magic, hurtb, addMagic){
    super(context, x, y, addMagic)
    this.hp = 2
    this.addMagic = addMagic
    this.currentDirection = this.leftDirection
    this.idleSprite = idle
    this.hurtSprite = hurt
    this.magicSprite = magic
    this.magicTimer = 0
    this.firedMagic = false
    this.magicDelay = 1.7
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      magic: [[this.magicSprite], this.magicInit, this.magicUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate]
    }
    this.changeState(this.states.idle)
    this.opponent = opponent
    this.hurtBox = hurtb
    this.idleTime = 2.8
  }
  
  changeState(newState){
    if (this.currentState == newState){
      return
    }
    
    this.currentFrame = 0
    this.currentState = newState
    this.currentState[1]()
  }
  
  idleInit = () => {
    this.angle = 0
    this.velocityX = 0
    this.hitStruck = false
  }
  
  idleUpdate = () => {
   this.idleTime -= frameTime.secondsPassed
  if (this.idleTime <= 0) {
    this.idleTime = 2.8
    this.changeState(this.states.magic)
   }
  }
  
  hurtStandInit = () => {
    this.angle = 0
    this.hurtTimer = performance.now()
  }
  
  hurtStandUpdate = () => {
    if (this.lost == true){
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
  
  magicInit = () => {
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
  
  updateAnimation(frameTime){
    if (!this.currentState){ return }
    if (frameTime.previous > this.animationTimer + 100){
      this.animationTimer = frameTime.previous
      this.currentFrame++
      
      if (this.currentFrame > this.currentState[0].length - 1){
        this.currentFrame = 0
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
     this.slideDone = true
    }
   }
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
    
    if (this.firedMagic == true){
      this.magicDelay -= frameTime.secondsPassed
      if (this.magicDelay <= 0){
        this.magicDelay = 1.7
        this.firedMagic = false
      }
    } else {
      this.magicDelay = 1.7
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
    if (this.currentState){
    this.currentState[2]()
    }
    if (this.notOnGround()){
      this.velocityY += 3000 * frameTime.secondsPassed
      if (this.velocityY > 1600) { this.velocityY = 1600 }
      
    } else if (this.positionY > this.groundPosition){
        this.positionY = this.groundPosition
      }
  }
  
  draw(){
    if (this.context == undefined){ return }
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

export class Giant extends PunchCpu{
  constructor(context, x, y, opponent, idle, kick, hurt, walk1, walk2, walk3, walk4, hurtb){
    super(context, x, y)
    this.hp = 9
    this.isGiant = true
    this.idleSprite = idle
    this.kickSprite = kick
    this.walk1Sprite = walk1
    this.walk2Sprite = walk2
    this.walk3Sprite = walk3
    this.hurtSprite = hurt
    delete this.punchSprite
    
    if (walk4){
    this.walk4Sprite = walk4
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      kick: [[this.walk3Sprite, this.kickSprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite, this.walk4Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate]
    }
  } else {
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      kick: [[this.walk3Sprite, this.kickSprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate]
    }
    delete this.walk4Sprite
  }
    this.changeState(this.states.walk)
    this.opponent = opponent
    this.hurtBox = hurtb.map(value => Math.round(value * 1.6))
  }
  
  changeState(newState){
    if (this.currentState == newState){
      return
    }
    
    this.currentFrame = 0
    this.currentState = newState
    this.currentState[1]()
  }
  
  idleInit = () => {
    this.angle = 0
    this.velocityX = 0
    this.hitStruck = false
  }
  
  idleUpdate = () => {
    if (this.opponnent.currentState == this.opponnent.states.hurtFall){
      return
    }

    const rndm = Math.floor(Math.random() * 500)
    if (rndm < 2){ this.changeState(this.states.kick) }
  }
  
  walkInit = () => {
    this.velocityX = -40
  }
  
  walkUpdate = () => {
    if (this.opponent.lost){
      return
    }
    if (this.velocityX == 0){
      this.velocityX = -40
    }
    
    
    if (Math.abs(this.positionX - this.opponent.positionX) < Math.round((this.currentState[0][this.currentFrame].adjusts[0]/1.4) * 2) + (Math.round(this.opponent.hurtBox[2]/1.4))) { this.changeState(this.states.idle) }
  }
  
  kickInit = () => {
    this.velocityX = 50
  }
  
  kickUpdate = () => {
    switch (this.currentFrame){
    case 1: this.velocityX = 0; break
    case 2: this.changeState(this.states.walk); break
   }
  }
  
  updateAttackCollided(frameTime){
    if (this.hitStruck == true || !this.context){ return }
    if (this.currentState != this.states.kick){ return }
    if (this.currentFrame != 1){ return }
    if (this.positionX <= this.opponent.positionX){ return }
    if (this.positionX - this.opponent.positionX > this.kickSprite.adjusts[1] + this.opponent.hurtBox[2]/2){ return }
    if (this.positionY - (this.currentState[0][this.currentFrame].adjusts[3] * 2) > this.opponent.positionY || this.positionY < this.opponent.positionY - this.opponent.hurtBox[3]) { return }
    
    console.log("enemyHit")
    playRandomPunchSound()
      this.opponent.changeState(this.opponent.states.hurtFall)
      this.opponent.hp -= 70
      if (this.opponent.hp < 0){ this.opponent.hp = 0 }
      
      if (this.opponent.positionX < 43){
      this.slideDone = false
      this.slide = 43000 * this.currentDirection
    }
    else {
      this.opponent.slideDone = false
      this.opponent.slide = -43000 * this.currentDirection
    }
      this.hitStruck = true
    }
    
    draw(){
    if (!this.context){ return }
    
    this.context.save(); // Salva o estado atual do contexto

  // Define o ponto de rotação (centro do personagem)
  const centerX = this.positionX;
  const centerY = this.positionY - (this.currentState[0][this.currentFrame].adjusts[1] * 1.6) / 2;

  this.context.translate(centerX, centerY); // Move o ponto de origem
  this.context.rotate(this.angle); // Aplica a rotação
  this.context.scale(this.currentDirection, 1); // Mantém a escala horizontal correta
  
  // Desenha a imagem deslocada para alinhar corretamente
  this.context.drawImage(
    this.currentState[0][this.currentFrame].img,
    -(this.currentState[0][this.currentFrame].adjusts[2] * 1.6), // Ajusta X relativo ao centro
    -((this.currentState[0][this.currentFrame].adjusts[1] * 1.6) / 2), // Ajusta Y relativo ao centro
    (this.currentState[0][this.currentFrame].adjusts[0] * 1.6),
    (this.currentState[0][this.currentFrame].adjusts[1] * 1.6)
  )

  this.context.restore(); // Restaura o contexto para evitar acúmulo de transformações
  }
  
  destroy(){
    this.context = null
    this.currentState = null
    this.hurtBox = null
    this.opponent = null
    this.currentDirection = null
    this.idleSprite = null
    this.hurtSprite = null
    this.kickSprite = null
    this.walk1Sprite = null
    this.walk2Sprite = null
    this.walk3Sprite = null
    if (this.walk4Sprite){
    this.walk4Sprite = null
    }
    this.states = null
  }
}
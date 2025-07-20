import { VsFighter } from "./Fighter.js"
import { isMpButtonPressed } from "./inputs.js"

export class LeftHudFighter extends VsFighter{
    constructor(context, x, y, addMagic, name){
    super(context, x, y, addMagic, name)
      this.states.idle[2] = this.idleUpdate
      this.states.walk[2] = this.walkUpdate
      this.states.jump[2] = this.jumpUpdate
      
      this.currentState = this.states.idle
    }
   doingMagicInput(){
    if (this.firedMagic == true){ return }
  
    if (this.positionX < this.opponent.positionX && isMpButtonPressed(3) && isMpButtonPressed(4)){
      this.currentDirection = this.rightDirection
      return true
    }
    else if (this.positionX > this.opponent.positionX && isMpButtonPressed(1) && isMpButtonPressed(4)){
      this.currentDirection = this.leftDirection
      return true
    }
    else {
      return false
    }
   } 
    
    idleUpdate = () => {
    if (isMpButtonPressed(1)) {
     this.currentDirection = this.rightDirection
     this.changeState(this.states.walk)
   }
   else if (isMpButtonPressed(3)){
     this.currentDirection = this.leftDirection
     this.changeState(this.states.walk)
   }
   else if (isMpButtonPressed(0) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
   else if (isMpButtonPressed(4)){
     this.changeState(this.states.punch)
   }
   //verifica gilete
   else if (isMpButtonPressed(2) && isMpButtonPressed(5)){
     this.changeState(this.states.gilete)
   }
   
   else if (isMpButtonPressed(5)){
     this.changeState(this.states.kick)
   }     
 }
    walkUpdate = () => {
    if (!isMpButtonPressed(1) && !isMpButtonPressed(3)) {
     this.changeState(this.states.idle)
   }
   
   if (isMpButtonPressed(4)){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(5)){
     this.changeState(this.states.kick)
   }
   if (isMpButtonPressed(0) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
  if (this.doingMagicInput()){
    this.changeState(this.states.magic)
  }
  }
    jumpUpdate = () => {
    if (!this.notOnGround()){
    this.changeState(this.states.idle)
    }
    
    if (isMpButtonPressed(4)){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(5)){
     this.changeState(this.states.kick)
   }
   if (this.doingMagicInput()){
    this.changeState(this.states.magic)
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
     
     if (isMpButtonPressed(1) || isMpButtonPressed(3)){
       if (this.currentState != this.states.hurtStand && this.currentState != this.states.hurtFall){
     this.velocityX = (-600 * this.currentDirection)
       }
     }
     this.slideDone = true
   }
   }
  }
}

export class RightHudFighter extends VsFighter{
    constructor(context, x, y, addMagic, name){
    super(context, x, y, addMagic, name)
      this.states.idle[2] = this.idleUpdate
      this.states.walk[2] = this.walkUpdate
      this.states.jump[2] = this.jumpUpdate
      
      this.currentState = this.states.idle
    }
   doingMagicInput(){
    if (this.firedMagic == true){ return }
  
    if (this.positionX < this.opponent.positionX && isMpButtonPressed(9) && isMpButtonPressed(10)){
      this.currentDirection = this.rightDirection
      return true
    }
    else if (this.positionX > this.opponent.positionX && isMpButtonPressed(7) && isMpButtonPressed(10)){
      this.currentDirection = this.leftDirection
      return true
    }
    else {
      return false
    }
   } 
    
    idleUpdate = () => {
    if (isMpButtonPressed(7)) {
     this.currentDirection = this.rightDirection
     this.changeState(this.states.walk)
   }
   else if (isMpButtonPressed(9)){
     this.currentDirection = this.leftDirection
     this.changeState(this.states.walk)
   }
   else if (isMpButtonPressed(6) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
   else if (isMpButtonPressed(10)){
     this.changeState(this.states.punch)
   }
   //verifica gilete
   else if (isMpButtonPressed(8) && isMpButtonPressed(11)){
     this.changeState(this.states.gilete)
   }
   
   else if (isMpButtonPressed(11)){
     this.changeState(this.states.kick)
   }     
 }
    walkUpdate = () => {
    if (!isMpButtonPressed(7) && !isMpButtonPressed(9)) {
     this.changeState(this.states.idle)
   }
   
   if (isMpButtonPressed(10)){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(11)){
     this.changeState(this.states.kick)
   }
   if (isMpButtonPressed(6) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
  if (this.doingMagicInput()){
    this.changeState(this.states.magic)
  }
  }
    jumpUpdate = () => {
    if (!this.notOnGround()){
    this.changeState(this.states.idle)
    }
    
    if (isMpButtonPressed(10)){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(11)){
     this.changeState(this.states.kick)
   }
   if (this.doingMagicInput()){
    this.changeState(this.states.magic)
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
     
     if (isMpButtonPressed(7) || isMpButtonPressed(9)){
       if (this.currentState != this.states.hurtStand && this.currentState != this.states.hurtFall){
     this.velocityX = (-600 * this.currentDirection)
       }
     }
     this.slideDone = true
   }
   }
  }
}
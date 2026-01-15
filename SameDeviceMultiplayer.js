import { VsFighter } from "./Fighter.js"
import { isMpButtonPressed } from "./inputs.js"
import { p1Stick, p2Stick } from "./virtualJoystick.js"
import { frameTime } from "./Main.js"

export class LeftHudFighter extends VsFighter{
    constructor(context, x, y, addMagic, name){
    super(context, x, y, addMagic, name)
      this.states.idle[2] = this.idleUpdate
      this.states.walk[2] = this.walkUpdate
      this.states.jump[2] = this.jumpUpdate
      
      this.currentState = this.states.idle
    }
    
    updateSuperHistory(){
      //esse if é para caso nenhuma etapa da sequencia do super estiver feita ainda
      if (this.superAttack.doneSteps == 0){
        if (p1Stick.direction == "downleft" || p1Stick.direction == "left"){
          
          this.superAttack.sequence = ["downleft", "downright", "downleft", "downright"]
           this.superAttack.nextInput = "right"
           this.superAttack.doneSteps += 1
        }
        else if (p1Stick.direction == "downright" || p1Stick.direction == "right"){
          
          this.superAttack.sequence = ["downright", "downleft", "downright", "downleft"]
        this.superAttack.nextInput = "left"
        this.superAttack.doneSteps += 1
      }
      return
    }
      
      //esse if é para depois que ja tem ao menos uma etapa feita
      if (this.superAttack.doneSteps > 0){
        
        this.superAttack.timer -= frameTime.secondsPassed
        
        if (this.superAttack.timer <= 0){
          this.superAttack.sequence = []
          this.superAttack.nextInput = ""
          this.superAttack.doneSteps = 0
          this.superAttack.timer = 1
        }
        
        if (p1Stick.direction == this.superAttack.nextInput || p1Stick.direction == "down" + this.superAttack.nextInput){
          
          this.superAttack.nextInput = this.superAttack.sequence[this.superAttack.doneSteps + 1]
        this.superAttack.doneSteps += 1
        }
        
        if (this.superAttack.doneSteps > 2 && this.superAttack.meter == 70){
          if (isMpButtonPressed(5) && this.superAttack.timer > 0){
            
            this.superAttack.timer = 1
            this.superAttack.sequence = []
            this.superAttack.nextInput = ""
            this.superAttack.doneSteps = 0
            this.superAttack.durationTimer = 0.8
            this.changeState(this.states.superCombo)
          }
        }
      }
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
   else if (isMpButtonPressed(4) && this.attackDelay <= 0){
     this.changeState(this.states.punch)
   }
   //verifica gilete
   else if (isMpButtonPressed(2) && isMpButtonPressed(5) && this.attackDelay <= 0){
     this.superAttack.meter += 4
     this.changeState(this.states.gilete)
   }
   
   else if (isMpButtonPressed(5) && this.attackDelay <= 0){
     this.changeState(this.states.kick)
   }     
 }
    walkUpdate = () => {
    if (!isMpButtonPressed(1) && !isMpButtonPressed(3)) {
     this.changeState(this.states.idle)
   }
   
   if (isMpButtonPressed(4) && this.attackDelay <= 0){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(5) && this.attackDelay <= 0){
     this.changeState(this.states.kick)
   }
   if (isMpButtonPressed(0) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
  if (this.doingMagicInput()){
    this.superAttack.meter += 4
    this.changeState(this.states.magic)
  }
  }
    jumpUpdate = () => {
    if (!this.notOnGround()){
    this.changeState(this.states.idle)
    }
    
    if (isMpButtonPressed(4) && this.attackDelay <= 0){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(5) && this.attackDelay <= 0){
     this.changeState(this.states.kick)
   }
   if (this.doingMagicInput()){
     this.superAttack.meter += 4
    this.changeState(this.states.magic)
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
    
    updateSuperHistory(){
      //esse if é para caso nenhuma etapa da sequencia do super estiver feita ainda
      if (this.superAttack.doneSteps == 0){
        if (p2Stick.direction == "downleft" || p2Stick.direction == "left"){
          
          this.superAttack.sequence = ["downleft", "downright", "downleft", "downright"]
           this.superAttack.nextInput = "right"
           this.superAttack.doneSteps += 1
        }
        else if (p2Stick.direction == "downright" || p2Stick.direction == "right"){
          
          this.superAttack.sequence = ["downright", "downleft", "downright", "downleft"]
        this.superAttack.nextInput = "left"
        this.superAttack.doneSteps += 1
      }
      return
    }
      
      //esse if é para depois que ja tem ao menos uma etapa feita
      if (this.superAttack.doneSteps > 0){
        
        this.superAttack.timer -= frameTime.secondsPassed
        
        if (this.superAttack.timer <= 0){
          this.superAttack.sequence = []
          this.superAttack.nextInput = ""
          this.superAttack.doneSteps = 0
          this.superAttack.timer = 1
        }
        
        if (p2Stick.direction == this.superAttack.nextInput || p2Stick.direction == "down" + this.superAttack.nextInput){
          
          this.superAttack.nextInput = this.superAttack.sequence[this.superAttack.doneSteps + 1]
        this.superAttack.doneSteps += 1
        }
        
        if (this.superAttack.doneSteps > 2 && this.superAttack.meter == 70){
          if (isMpButtonPressed(11) && this.superAttack.timer > 0){
            
            this.superAttack.timer = 1
            this.superAttack.sequence = []
            this.superAttack.nextInput = ""
            this.superAttack.doneSteps = 0
            this.superAttack.durationTimer = 0.8
            this.changeState(this.states.superCombo)
          }
        }
      }
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
   else if (isMpButtonPressed(10) && this.attackDelay <= 0){
     this.changeState(this.states.punch)
   }
   //verifica gilete
   else if (isMpButtonPressed(8) && isMpButtonPressed(11) && this.attackDelay <= 0){
     this.superAttack.meter += 4
     this.changeState(this.states.gilete)
   }
   
   else if (isMpButtonPressed(11) && this.attackDelay <= 0){
     this.changeState(this.states.kick)
   }     
 }
    walkUpdate = () => {
    if (!isMpButtonPressed(7) && !isMpButtonPressed(9)) {
     this.changeState(this.states.idle)
   }
   
   if (isMpButtonPressed(10) && this.attackDelay <= 0){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(11) && this.attackDelay <= 0){
     this.changeState(this.states.kick)
   }
   if (isMpButtonPressed(6) && !this.notOnGround()){
     this.changeState(this.states.jump)
   }
  if (this.doingMagicInput()){
    this.superAttack.meter += 4
    this.changeState(this.states.magic)
  }
  }
    jumpUpdate = () => {
    if (!this.notOnGround()){
    this.changeState(this.states.idle)
    }
    
    if (isMpButtonPressed(10) && this.attackDelay <= 0){
     this.changeState(this.states.punch)
   }
    if (isMpButtonPressed(11) && this.attackDelay <= 0){
     this.changeState(this.states.kick)
   }
   if (this.doingMagicInput()){
     this.superAttack.meter += 4
    this.changeState(this.states.magic)
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
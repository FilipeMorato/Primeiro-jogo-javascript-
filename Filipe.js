import { filipeSprites } from "./sprites.js"
import { VsFighter, VsModeBot, SingleFighter } from "./Fighter.js"

export class VsFilipe extends VsFighter {
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = filipeSprites.idle
    this.kick1Sprite = filipeSprites.kick
    delete this.kick2Sprite
    this.punchSprite = filipeSprites.punch
    this.winSprite = filipeSprites.win
    this.sadSprite = filipeSprites.sad
    this.hurtSprite = filipeSprites.hurt
    this.magicSprite = filipeSprites.magic
    this.walk1Sprite = filipeSprites.walk1
    this.walk2Sprite = filipeSprites.walk2
    this.walk3Sprite = filipeSprites.walk3
    this.walk4Sprite = filipeSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [30, 320, 65, 250]
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      kick: [[this.idleSprite, this.kick1Sprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite, this.walk4Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate],
      magic: [[this.magicSprite], this.magicInit, this.magicUpdate],
      win: [[this.winSprite], this.winInit],
      sad: [[this.sadSprite], this.sadInit],
      jump: [[this.jumpSprite], this.jumpInit, this.jumpUpdate],
      gilete: [[this.kick1Sprite], this.gileteInit, this.gileteUpdate]
    }
    this.currentState = this.states.idle
  }
}

export class SingleFilipe extends SingleFighter{
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = filipeSprites.idle
    this.kick1Sprite = filipeSprites.kick
    delete this.kick2Sprite
    this.punchSprite = filipeSprites.punch
    this.winSprite = filipeSprites.win
    this.sadSprite = filipeSprites.sad
    this.hurtSprite = filipeSprites.hurt
    this.magicSprite = filipeSprites.magic
    this.walk1Sprite = filipeSprites.walk1
    this.walk2Sprite = filipeSprites.walk2
    this.walk3Sprite = filipeSprites.walk3
    this.walk4Sprite = filipeSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [30, 320, 65, 250]
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      kick: [[this.idleSprite, this.kick1Sprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite, this.walk4Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate],
      magic: [[this.magicSprite], this.magicInit, this.magicUpdate],
      win: [[this.winSprite], this.winInit],
      sad: [[this.sadSprite], this.sadInit],
      jump: [[this.jumpSprite], this.jumpInit, this.jumpUpdate],
      gilete: [[this.kick1Sprite], this.gileteInit, this.gileteUpdate]
    }
    this.currentState = this.states.idle
  }
}

export class BotFilipe extends VsModeBot {
  constructor(context, x, y, addMagic, hardMode){
    super(context, x, y, addMagic, hardMode)
    this.idleSprite = filipeSprites.idle
    this.kick1Sprite = filipeSprites.kick
    delete this.kick2Sprite
    this.punchSprite = filipeSprites.punch
    this.winSprite = filipeSprites.win
    this.sadSprite = filipeSprites.sad
    this.hurtSprite = filipeSprites.hurt
    this.magicSprite = filipeSprites.magic
    this.walk1Sprite = filipeSprites.walk1
    this.walk2Sprite = filipeSprites.walk2
    this.walk3Sprite = filipeSprites.walk3
    this.walk4Sprite = filipeSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [30, 320, 65, 250]
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      kick: [[this.idleSprite, this.kick1Sprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite, this.walk4Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate],
      magic: [[this.magicSprite], this.magicInit, this.magicUpdate],
      win: [[this.winSprite], this.winInit],
      sad: [[this.sadSprite], this.sadInit],
      jump: [[this.jumpSprite], this.jumpInit, this.jumpUpdate],
      gilete: [[this.kick1Sprite], this.gileteInit, this.gileteUpdate]
    }
    this.currentState = this.states.idle
    
  }
}
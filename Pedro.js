import { pedroSprites } from "./sprites.js"
import { VsFighter, VsModeBot, SingleFighter } from "./Fighter.js"

export class VsPedro extends VsFighter {
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = pedroSprites.idle
    this.kick1Sprite = pedroSprites.kick1
    this.kick2Sprite = pedroSprites.kick2
    this.punchSprite = pedroSprites.punch
    this.winSprite = pedroSprites.win
    this.sadSprite = pedroSprites.sad
    this.hurtSprite = pedroSprites.hurt
    this.magicSprite = pedroSprites.magic
    this.walk1Sprite = pedroSprites.walk1
    this.walk2Sprite = pedroSprites.walk2
    this.walk3Sprite = pedroSprites.walk3
    this.walk4Sprite = pedroSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [30, 270, 63, 260]
    
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
      gilete: [[this.kick2Sprite], this.gileteInit, this.gileteUpdate]
    }
    this.currentState = this.states.idle
    this.currentDirection = this.leftDirection
  }
}
export class SinglePedro extends SingleFighter {
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = pedroSprites.idle
    this.kick1Sprite = pedroSprites.kick1
    this.kick2Sprite = pedroSprites.kick2
    this.punchSprite = pedroSprites.punch
    this.winSprite = pedroSprites.win
    this.sadSprite = pedroSprites.sad
    this.hurtSprite = pedroSprites.hurt
    this.magicSprite = pedroSprites.magic
    this.walk1Sprite = pedroSprites.walk1
    this.walk2Sprite = pedroSprites.walk2
    this.walk3Sprite = pedroSprites.walk3
    this.walk4Sprite = pedroSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [30, 270, 63, 260]
    
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
      gilete: [[this.kick2Sprite], this.gileteInit, this.gileteUpdate]
    }
    this.currentState = this.states.idle
  }
}

export class BotPedro extends VsModeBot {
  constructor(context, x, y, addMagic, hardMode){
    super(context, x, y, addMagic, hardMode)
    this.idleSprite = pedroSprites.idle
    this.kick1Sprite = pedroSprites.kick1
    this.kick2Sprite = pedroSprites.kick2
    this.punchSprite = pedroSprites.punch
    this.winSprite = pedroSprites.win
    this.sadSprite = pedroSprites.sad
    this.hurtSprite = pedroSprites.hurt
    this.magicSprite = pedroSprites.magic
    this.walk1Sprite = pedroSprites.walk1
    this.walk2Sprite = pedroSprites.walk2
    this.walk3Sprite = pedroSprites.walk3
    this.walk4Sprite = pedroSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [30, 270, 63, 260]
    
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
      gilete: [[this.kick2Sprite], this.gileteInit, this.gileteUpdate]
    }
    this.currentState = this.states.idle
  }
}
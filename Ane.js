import { aneSprites } from "./sprites.js"
import { VsFighter, VsModeBot, SingleFighter } from "./Fighter.js"

export class VsAne extends VsFighter {
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = aneSprites.idle
    this.kick1Sprite = aneSprites.kick
    delete this.kick2Sprite
    this.punchSprite = aneSprites.punch
    this.winSprite = aneSprites.win
    this.sadSprite = aneSprites.sad
    this.hurtSprite = aneSprites.hurt
    this.magicSprite = aneSprites.magic
    this.walk1Sprite = aneSprites.walk1
    this.walk2Sprite = aneSprites.walk2
    this.walk3Sprite = aneSprites.walk3
    delete this.walk4Sprite
    this.jumpSprite = {}
    
    this.hurtBox = [30, 280, 65, 260]
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      kick: [[this.idleSprite, this.kick1Sprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite], this.walkInit, this.walkUpdate],
      hurtStand: [[this.hurtSprite], this.hurtStandInit, this.hurtStandUpdate],
      hurtFall: [[this.hurtSprite], this.hurtFallInit, this.hurtFallUpdate],
      magic: [[this.magicSprite], this.magicInit, this.magicUpdate],
      win: [[this.winSprite], this.winInit],
      sad: [[this.sadSprite], this.sadInit],
      jump: [[this.jumpSprite], this.jumpInit, this.jumpUpdate],
      gilete: [[this.kick1Sprite], this.gileteInit, this.gileteUpdate]
    }
    this.currentState = this.states.idle
    this.currentDirection = this.leftDirection
  }
}
export class SingleAne extends SingleFighter {
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = aneSprites.idle
    this.kick1Sprite = aneSprites.kick
    delete this.kick2Sprite
    this.punchSprite = aneSprites.punch
    this.winSprite = aneSprites.win
    this.sadSprite = aneSprites.sad
    this.hurtSprite = aneSprites.hurt
    this.magicSprite = aneSprites.magic
    this.walk1Sprite = aneSprites.walk1
    this.walk2Sprite = aneSprites.walk2
    this.walk3Sprite = aneSprites.walk3
    delete this.walk4Sprite
    this.jumpSprite = {}
    
    this.hurtBox = [30, 280, 65, 260]
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      kick: [[this.idleSprite, this.kick1Sprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite], this.walkInit, this.walkUpdate],
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

export class BotAne extends VsModeBot {
  constructor(context, x, y, addMagic, hardMode){
    super(context, x, y, addMagic, hardMode)
    this.idleSprite = aneSprites.idle
    this.kick1Sprite = aneSprites.kick
    delete this.kick2Sprite
    this.punchSprite = aneSprites.punch
    this.winSprite = aneSprites.win
    this.sadSprite = aneSprites.sad
    this.hurtSprite = aneSprites.hurt
    this.magicSprite = aneSprites.magic
    this.walk1Sprite = aneSprites.walk1
    this.walk2Sprite = aneSprites.walk2
    this.walk3Sprite = aneSprites.walk3
    delete this.walk4Sprite
    this.jumpSprite = {}
    
    this.hurtBox = [30, 280, 65, 260]
    
    this.states = {
      idle: [[this.idleSprite], this.idleInit, this.idleUpdate],
      punch: [[this.idleSprite, this.punchSprite, this.idleSprite], this.punchInit, this.punchUpdate],
      kick: [[this.idleSprite, this.kick1Sprite, this.idleSprite], this.kickInit, this.kickUpdate],
      walk: [[this.walk1Sprite, this.walk2Sprite, this.walk3Sprite], this.walkInit, this.walkUpdate],
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

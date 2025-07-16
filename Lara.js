import { laraSprites } from "./sprites.js"
import { VsFighter, VsModeBot, SingleFighter } from "./Fighter.js"

export class VsLara extends VsFighter {
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = laraSprites.idle
    this.kick1Sprite = laraSprites.kick
    delete this.kick2Sprite
    this.punchSprite = laraSprites.punch
    this.winSprite = laraSprites.win
    this.sadSprite = laraSprites.sad
    this.hurtSprite = laraSprites.hurt
    this.magicSprite = laraSprites.magic
    this.walk1Sprite = laraSprites.walk1
    this.walk2Sprite = laraSprites.walk2
    this.walk3Sprite = laraSprites.walk3
    this.walk4Sprite = laraSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [34, 290, 65, 240]
    
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

export class SingleLara extends SingleFighter{
  constructor(context, x, y, addMagic){
    super(context, x, y, addMagic)
    this.idleSprite = laraSprites.idle
    this.kick1Sprite = laraSprites.kick
    delete this.kick2Sprite
    this.punchSprite = laraSprites.punch
    this.winSprite = laraSprites.win
    this.sadSprite = laraSprites.sad
    this.hurtSprite = laraSprites.hurt
    this.magicSprite = laraSprites.magic
    this.walk1Sprite = laraSprites.walk1
    this.walk2Sprite = laraSprites.walk2
    this.walk3Sprite = laraSprites.walk3
    this.walk4Sprite = laraSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [34, 290, 65, 240]
    
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

export class BotLara extends VsModeBot{
  constructor(context, x, y, addMagic, hardMode){
    super(context, x, y, addMagic, hardMode)
    this.idleSprite = laraSprites.idle
    this.kick1Sprite = laraSprites.kick
    delete this.kick2Sprite
    this.punchSprite = laraSprites.punch
    this.winSprite = laraSprites.win
    this.sadSprite = laraSprites.sad
    this.hurtSprite = laraSprites.hurt
    this.magicSprite = laraSprites.magic
    this.walk1Sprite = laraSprites.walk1
    this.walk2Sprite = laraSprites.walk2
    this.walk3Sprite = laraSprites.walk3
    this.walk4Sprite = laraSprites.walk4
    this.jumpSprite = {}
    
    this.hurtBox = [34, 290, 65, 240]
    
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
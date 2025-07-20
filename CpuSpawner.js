import { pedroSprites, filipeSprites, aneSprites, laraSprites } from "./sprites.js"
import { globalState } from "./settings.js"

const sprites = [pedroSprites, filipeSprites, aneSprites, laraSprites]
const hurtbox = [[30, 290, 63, 280], [30, 340, 65, 270], [30, 300, 65, 280], [34, 290, 65, 240]]

function getHurtBox(i){
  return hurtbox[i]
}

export function getRandomPuncherSprites(){
  const rndm = Math.floor(Math.random() * 4)
  //vezes a quantidade de jogadores pois math.random desconsidera o ultimo valor
  const hurt = getHurtBox(rndm)
  
  const isAne = rndm == 2
  return {
    idle: sprites[rndm].idle,
    hurt: sprites[rndm].hurt,
    punch: sprites[rndm].punch,
    walk1: sprites[rndm].walk1,
    walk2: sprites[rndm].walk2,
    walk3: sprites[rndm].walk3,
    ...(isAne ? {} : { walk4: sprites[rndm].walk4 }),
    ane: isAne,
    hurtbox: hurt
  }
}

export function getRandomKickerSprites(){
  const rndm = Math.floor(Math.random() * 4)
  const hurt = getHurtBox(rndm)
  
  const isAne = rndm == 2
  const isPedro = rndm == 0
  return {
    idle: sprites[rndm].idle,
    hurt: sprites[rndm].hurt,
    ...(isAne ? { jump: sprites[rndm].walk2 } : { jump: sprites[rndm].walk1 }),
    ...(isPedro ? { kick: sprites[rndm].kick2 } : { kick: sprites[rndm].kick }),
    hurtbox: hurt
  }
}

export function getRandomShooterSprites(){
  const rndm = Math.floor(Math.random() * 4)
  const hurt = getHurtBox(rndm)

  return {
    idle: sprites[rndm].idle,
    hurt: sprites[rndm].hurt,
    magic: sprites[rndm].magic,
    hurtbox: hurt
  }
}

export function getRandomGiantSprites(){
  const rndm = Math.floor(Math.random() * 4)
  const hurt = getHurtBox(rndm)
  
  const isAne = rndm == 2
  const isPedro = rndm == 0
  
  return {
    idle: sprites[rndm].idle,
    hurt: sprites[rndm].hurt,
    walk1: sprites[rndm].walk1,
    walk2: sprites[rndm].walk2,
    walk3: sprites[rndm].walk3,
    ...(isAne ? {} : { walk4: sprites[rndm].walk4 }),
    ...(isPedro ? { kick: sprites[rndm].kick2 } : { kick: sprites[rndm].kick }),
    ane: isAne,
    hurtbox: hurt
  }
}

export function setFighterInstanceSprites(instance){
  switch (instance.name){
    case "filipe": filipeSpritesToInstance(instance); break
    case "lara": laraSpritesToInstance(instance); break
    case "ane": aneSpritesToInstance(instance); break
    case "pedro": pedroSpritesToInstance(instance); break
  }
}

//funções de auxílio pra função acima
function filipeSpritesToInstance(instance){
    instance.idleSprite = filipeSprites.idle
    instance.kick1Sprite = filipeSprites.kick
    instance.kick2Sprite = null
    instance.punchSprite = filipeSprites.punch
    instance.winSprite = filipeSprites.win
    instance.sadSprite = filipeSprites.sad
    instance.hurtSprite = filipeSprites.hurt
    instance.magicSprite = filipeSprites.magic
    instance.walk1Sprite = filipeSprites.walk1
    instance.walk2Sprite = filipeSprites.walk2
    instance.walk3Sprite = filipeSprites.walk3
    instance.walk4Sprite = filipeSprites.walk4
    instance.jumpSprite = {}
  
    instance.hurtBox = [30, 320, 65, 250]
  
    instance.states = {
      idle: [[instance.idleSprite], instance.idleInit, instance.idleUpdate],
      punch: [[instance.idleSprite, instance.punchSprite, instance.idleSprite], instance.punchInit, instance.punchUpdate],
      kick: [[instance.idleSprite, instance.kick1Sprite, instance.idleSprite], instance.kickInit, instance.kickUpdate],
      walk: [[instance.walk1Sprite, instance.walk2Sprite, instance.walk3Sprite, instance.walk4Sprite], instance.walkInit, instance.walkUpdate],
      hurtStand: [[instance.hurtSprite], instance.hurtStandInit, instance.hurtStandUpdate],
      hurtFall: [[instance.hurtSprite], instance.hurtFallInit, instance.hurtFallUpdate],
      magic: [[instance.magicSprite], instance.magicInit, instance.magicUpdate],
      win: [[instance.winSprite], instance.winInit],
      sad: [[instance.sadSprite], instance.sadInit],
      jump: [[instance.jumpSprite], instance.jumpInit, instance.jumpUpdate],
      gilete: [[instance.kick1Sprite], instance.gileteInit, instance.gileteUpdate]
    }
}

function laraSpritesToInstance(instance){
    instance.idleSprite = laraSprites.idle
    instance.kick1Sprite = laraSprites.kick
    instance.kick2Sprite = null
    instance.punchSprite = laraSprites.punch
    instance.winSprite = laraSprites.win
    instance.sadSprite = laraSprites.sad
    instance.hurtSprite = laraSprites.hurt
    instance.magicSprite = laraSprites.magic
    instance.walk1Sprite = laraSprites.walk1
    instance.walk2Sprite = laraSprites.walk2
    instance.walk3Sprite = laraSprites.walk3
    instance.walk4Sprite = laraSprites.walk4
    instance.jumpSprite = {}
  
    instance.hurtBox = [34, 290, 65, 240]
  
    instance.states = {
      idle: [[instance.idleSprite], instance.idleInit, instance.idleUpdate],
      punch: [[instance.idleSprite, instance.punchSprite, instance.idleSprite], instance.punchInit, instance.punchUpdate],
      kick: [[instance.idleSprite, instance.kick1Sprite, instance.idleSprite], instance.kickInit, instance.kickUpdate],
      walk: [[instance.walk1Sprite, instance.walk2Sprite, instance.walk3Sprite, instance.walk4Sprite], instance.walkInit, instance.walkUpdate],
      hurtStand: [[instance.hurtSprite], instance.hurtStandInit, instance.hurtStandUpdate],
      hurtFall: [[instance.hurtSprite], instance.hurtFallInit, instance.hurtFallUpdate],
      magic: [[instance.magicSprite], instance.magicInit, instance.magicUpdate],
      win: [[instance.winSprite], instance.winInit],
      sad: [[instance.sadSprite], instance.sadInit],
      jump: [[instance.jumpSprite], instance.jumpInit, instance.jumpUpdate],
      gilete: [[instance.kick1Sprite], instance.gileteInit, instance.gileteUpdate]
    }
}

function aneSpritesToInstance(instance){
    instance.idleSprite = aneSprites.idle
    instance.kick1Sprite = aneSprites.kick
    instance.kick2Sprite = null
    instance.punchSprite = aneSprites.punch
    instance.winSprite = aneSprites.win
    instance.sadSprite = aneSprites.sad
    instance.hurtSprite = aneSprites.hurt
    instance.magicSprite = aneSprites.magic
    instance.walk1Sprite = aneSprites.walk1
    instance.walk2Sprite = aneSprites.walk2
    instance.walk3Sprite = aneSprites.walk3
    instance.walk4Sprite = null
    instance.jumpSprite = {}
    
    instance.hurtBox = [30, 280, 65, 260]
  
    instance.states = {
      idle: [[instance.idleSprite], instance.idleInit, instance.idleUpdate],
      punch: [[instance.idleSprite, instance.punchSprite, instance.idleSprite], instance.punchInit, instance.punchUpdate],
      kick: [[instance.idleSprite, instance.kick1Sprite, instance.idleSprite], instance.kickInit, instance.kickUpdate],
      walk: [[instance.walk1Sprite, instance.walk2Sprite, instance.walk3Sprite], instance.walkInit, instance.walkUpdate],
      hurtStand: [[instance.hurtSprite], instance.hurtStandInit, instance.hurtStandUpdate],
      hurtFall: [[instance.hurtSprite], instance.hurtFallInit, instance.hurtFallUpdate],
      magic: [[instance.magicSprite], instance.magicInit, instance.magicUpdate],
      win: [[instance.winSprite], instance.winInit],
      sad: [[instance.sadSprite], instance.sadInit],
      jump: [[instance.jumpSprite], instance.jumpInit, instance.jumpUpdate],
      gilete: [[instance.kick1Sprite], instance.gileteInit, instance.gileteUpdate]
    }
}

function pedroSpritesToInstance(instance){
    instance.idleSprite = pedroSprites.idle
    instance.kick1Sprite = pedroSprites.kick1
    instance.kick2Sprite = pedroSprites.kick2
    instance.punchSprite = pedroSprites.punch
    instance.winSprite = pedroSprites.win
    instance.sadSprite = pedroSprites.sad
    instance.hurtSprite = pedroSprites.hurt
    instance.magicSprite = pedroSprites.magic
    instance.walk1Sprite = pedroSprites.walk1
    instance.walk2Sprite = pedroSprites.walk2
    instance.walk3Sprite = pedroSprites.walk3
    instance.walk4Sprite = pedroSprites.walk4
    instance.jumpSprite = {}
    
    instance.hurtBox = [30, 270, 63, 260]
  
    instance.states = {
      idle: [[instance.idleSprite], instance.idleInit, instance.idleUpdate],
      punch: [[instance.idleSprite, instance.punchSprite, instance.idleSprite], instance.punchInit, instance.punchUpdate],
      kick: [[instance.kick1Sprite, instance.kick2Sprite, instance.kick1Sprite], instance.kickInit, instance.kickUpdate],
      walk: [[instance.walk1Sprite, instance.walk2Sprite, instance.walk3Sprite, instance.walk4Sprite], instance.walkInit, instance.walkUpdate],
      hurtStand: [[instance.hurtSprite], instance.hurtStandInit, instance.hurtStandUpdate],
      hurtFall: [[instance.hurtSprite], instance.hurtFallInit, instance.hurtFallUpdate],
      magic: [[instance.magicSprite], instance.magicInit, instance.magicUpdate],
      win: [[instance.winSprite], instance.winInit],
      sad: [[instance.sadSprite], instance.sadInit],
      jump: [[instance.jumpSprite], instance.jumpInit, instance.jumpUpdate],
      gilete: [[instance.kick2Sprite], instance.gileteInit, instance.gileteUpdate]
    }
}

import { pedroSprites, filipeSprites, aneSprites, laraSprites } from "./sprites.js"

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
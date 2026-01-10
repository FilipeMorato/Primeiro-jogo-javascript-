function createSpriteImg (sourceString){
    const img = new Image()
    img.src = sourceString
    return img
}

export const filipeSprites = {
  // adjusts 0 e 1 é largura e altura, 2 e 3 é offsets do ponto de origem
idle: { img: createSpriteImg('./filipeidle.png'), adjusts: [141.4, 367.1,84, 367]},
punch: { img: createSpriteImg('./filipepunch.png'), adjusts: [236.9, 336.9, 157, 344]},
kick: { img: createSpriteImg('./filipekick.png'), adjusts: [269, 343, 160, 343]},
hurt: { img: createSpriteImg('./filipehurt.png'), adjusts: [176, 330, 83, 330]},
magic: { img: createSpriteImg('./filipemagic.png'), adjusts: [225, 308.3, 137, 330]},
win: { img: createSpriteImg('./filipewin.png'), adjusts: [129.1, 411.6, 65, 419]},
sad: { img: createSpriteImg('./filipesad.png'), adjusts: [127.2, 357.2, 73, 359]},
walk1: { img: createSpriteImg('./filipewalk1.png'), adjusts: [107.6, 373.07, 60, 373]},
walk2: { img: createSpriteImg('./filipewalk2.png'), adjusts: [150.7, 343.5, 101, 360]},
walk3: { img: createSpriteImg('./filipewalk3.png'), adjusts: [124.2, 360.7, 62, 367]},
walk4: { img: createSpriteImg('./filipewalk4.png'), adjusts: [147, 357, 74, 362]}

}

export const aneSprites = {
    idle: { img: createSpriteImg('./aneidle.png'), adjusts: [129.8, 338.8, 85, 336]},
    punch: { img: createSpriteImg('./anepunch.png'), adjusts: [179.3, 338.8, 125, 338]},
    kick: { img: createSpriteImg('./anekick.png'), adjusts: [243.1, 346.5, 140, 346]},
    hurt: { img: createSpriteImg('./anehurt.png'), adjusts: [160.6, 319, 72, 319]},
    magic: { img: createSpriteImg('./anemagic.png'), adjusts: [146.3, 336.6, 103, 336]},
    win: { img: createSpriteImg('./anewin.png'), adjusts: [199.1, 328.9, 106, 328]},
    sad: { img: createSpriteImg('./anesad.png'), adjusts: [99, 319, 42, 319]},
    walk1: { img: createSpriteImg('./anewalk1.png'), adjusts: [167.2, 326.7, 110, 326]},
    walk2: { img: createSpriteImg('./anewalk2.png'), adjusts: [117.2, 332.7, 48, 332]},
    walk3: { img: createSpriteImg('./anewalk3.png'), adjusts: [132, 342.1, 80, 342]}
}

export const pedroSprites = {
    idle: { img: createSpriteImg('./pedroidle.png'), adjusts: [137.7, 331.5, 77.2, 331.5]},
    punch: { img: createSpriteImg('./pedropunch.png'), adjusts: [181.4, 329.2, 120.9, 329.2]},
    kick1: { img: createSpriteImg('./pedrokick1.png'), adjusts: [143.3, 327, 82.8, 327]},
    kick2: { img: createSpriteImg('./pedrokick2.png'), adjusts: [264.3, 310.2, 155.68, 310.2]},
    hurt: { img: createSpriteImg('./pedrohurt.png'), adjusts: [175.8, 283.3, 70.5, 283.3]},
    magic: { img: createSpriteImg('./pedromagic.png'), adjusts: [164.6, 296.8, 101.9, 296.8]},
    win: { img: createSpriteImg('./pedrowin.png'), adjusts: [97.6, 325.8, 35.8, 324.8]},
    sad: { img: createSpriteImg('./pedrosad.png'), adjusts: [103, 327, 40.3, 327]},
    walk1: { img: createSpriteImg('./pedrowalk1.png'), adjusts: [126.5, 320.3, 64.9, 320.3]},
    walk2: { img: createSpriteImg('./pedrowalk2.png'), adjusts: [120.9, 331.5, 60.4, 331.5]},
    walk3: { img: createSpriteImg('./pedrowalk3.png'), adjusts: [140, 312.4, 78.4, 312.4]},
    walk4: { img: createSpriteImg('./pedrowalk4.png'), adjusts: [115.3, 308, 43.6, 308]}
}

export const laraSprites = {

  // adjusts 0 e 1 é largura e altura, 2 e 3 é offsets do ponto de origem

idle: { img: createSpriteImg('./laraidle.png'), adjusts: [99.6, 318.9, 39, 318]},
punch: { img: createSpriteImg('./larapunch.png'), adjusts: [169, 334.7, 100, 329]},
kick: { img: createSpriteImg('./larakick.png'), adjusts: [241.5, 328.4, 140, 320]},
hurt: { img: createSpriteImg('./larahurt.png'), adjusts: [189.5, 329.5, 105, 320]},
magic: { img: createSpriteImg('./laramagic.png'), adjusts: [172.8, 327.1, 65, 320]},
win: { img: createSpriteImg('./larawin.png'), adjusts: [148.6, 316.5, 54, 307]},
sad: { img: createSpriteImg('./larasad.png'), adjusts: [154.5, 224.8, 72, 214]},
walk1: { img: createSpriteImg('./larawalk1.png'), adjusts: [146.9, 320.8, 90, 310]},
walk2: { img: createSpriteImg('./larawalk2.png'), adjusts: [156.3, 329.5, 93, 319]},
walk3: { img: createSpriteImg('./larawalk3.png'), adjusts: [126.4, 315.6, 87, 305]},
walk4: { img: createSpriteImg('./larawalk4.png'), adjusts: [144.7, 325.6, 92, 319]}

}

export const stagesSprites = [
  createSpriteImg("./backgrounds/filipe1.png"),
  createSpriteImg("./backgrounds/filipe2.png"),
  createSpriteImg("./backgrounds/filipe3.png"),
  createSpriteImg("./backgrounds/meire1.png"),
  createSpriteImg("./backgrounds/meire2.png"),
  createSpriteImg("./backgrounds/colimpico.png"),
  createSpriteImg("./backgrounds/pedro1.png")
]

export const magicSprite = new Image()
magicSprite.src = "./magic.png"

export const trailSprite = new Image()
trailSprite.src = "./trail.png"

export const trofeuSprite = new Image()
trofeuSprite.src = "./trofeu.png"

export const startSprite = new Image()
startSprite.src = "./start.png"

export const unselectSprite = new Image()
unselectSprite.src = "./unselect.png"

export const airSprites = [
  createSpriteImg("./air1.png"),
  createSpriteImg("./air2.png"),
  createSpriteImg("./air3.png"),
  createSpriteImg("./air4.png")
  ]
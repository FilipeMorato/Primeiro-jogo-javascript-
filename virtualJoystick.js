import { hudState, mpHudState, mpHudCurrently } from "./inputs.js"

//espaço do meio que nao deve ser detectado
export let threshold = {
  value: 0
}

export const p1Stick = {
  element: document.getElementById('stick1'),
  centerX: 0,
  centerY: 0,
  direction: ""
}
export const p2Stick = {
  element: document.getElementById('stick2'),
  centerX: 0,
  centerY: 0,
  direction: ""
}

export function updateStickCenter(stick){
  const rect = stick.element.getBoundingClientRect();
stick.centerX = rect.left + rect.width / 2
stick.centerY = rect.top + rect.height / 2
}

function getDirection(disX, disY){
  //calcular o angulo da tangente das distancias/lados
 const angle = Math.atan2(disY, disX)
 
 //conversão radianos para graus
  const degrees = angle * (180 / Math.PI)

  // Diagonais e Eixos
  if (degrees > -22.5 && degrees <= 22.5)  return "right"
  if (degrees > 22.5 && degrees <= 67.5)   return "downright"
  if (degrees > 67.5 && degrees <= 112.5)  return "down"
  if (degrees > 112.5 && degrees <= 157.5) return "downleft"
  if (degrees > -67.5 && degrees <= -22.5) return "upright"
  if (degrees > -112.5 && degrees <= -67.5) return "up"
  if (degrees > -157.5 && degrees <= -112.5) return "upleft"
  
  // O que sobrar é LEFT (entre 157.5 e 180 ou -157.5 e -180)
 return "left"
}

export function handleStickTouch(event, stick){
  
  event.preventDefault()
  
  // Se for o início do toque, armazena o ID do dedo
  if (event.type == 'touchstart') {
    const touch = event.changedTouches[0]
    stick.activeTouchId = touch.identifier
  }

  // Encontra o toque específico dono desse ID
  let currentTouch = null
  for (let i = 0; i < event.touches.length; i++) {
    if (event.touches[i].identifier === stick.activeTouchId) {
      currentTouch = event.touches[i]
      break
    }
  }
  
  const distanceX = currentTouch.clientX - stick.centerX
  const distanceY = currentTouch.clientY - stick.centerY
  
 //distancia do toque para o centro do joystick
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  
 //pega a direcao só se o toque nao for muito no meio do joystick
  if (distance > threshold.value) {
    stick.direction = getDirection(distanceX, distanceY)
  } else {
    stick.direction = "" //dedo no centro
  }
  
  
  if (mpHudCurrently.active == true){
    mpHudState[0].fill(false, 0, 12)
    updateMpHudStickData()
  } else {
    hudState[0].fill(false, 0, 6)
    updateHudStickData()
  }
}

function updateHudStickData(){
  switch (p1Stick.direction){
    case "up": hudState[0][0] = true;
     break
    case "upright": hudState[0][0] = true
    hudState[0][1] = true;
     break
    case "right": hudState[0][1] = true;
     break
    case "downright": hudState[0][1] = true
    hudState[0][2] = true;
     break
    case "down": hudState[0][2] = true;
     break
    case "downleft": hudState[0][2] = true
    hudState[0][3] = true;
     break
    case "left": hudState[0][3] = true;
     break
    case "upleft": hudState[0][0] = true
    hudState[0][3] = true;
     break
  }
}

function updateMpHudStickData(){
  //atualiza primeiro o hudState do p1
  switch (p1Stick.direction){
    case "up": mpHudState[0][0] = true;
     break
    case "upright": mpHudState[0][0] = true
    mpHudState[0][1] = true;
     break
    case "right": mpHudState[0][1] = true;
     break
    case "downright": mpHudState[0][1] = true
    mpHudState[0][2] = true;
     break
    case "down": mpHudState[0][2] = true;
     break
    case "downleft": mpHudState[0][2] = true
    mpHudState[0][3] = true;
     break
    case "left": mpHudState[0][3] = true;
     break
    case "upleft": mpHudState[0][0] = true
    mpHudState[0][3] = true;
     break
  }
  
  //agora o do p2
  switch (p2Stick.direction){
    case "up": mpHudState[0][6] = true;
     break
    case "upright": mpHudState[0][6] = true
    mpHudState[0][7] = true;
     break
    case "right": mpHudState[0][7] = true;
     break
    case "downright": mpHudState[0][7] = true
    mpHudState[0][8] = true;
     break
    case "down": mpHudState[0][8] = true;
     break
    case "downleft": mpHudState[0][8] = true
    mpHudState[0][9] = true;
     break
    case "left": mpHudState[0][9] = true;
     break
    case "upleft": mpHudState[0][6] = true
    mpHudState[0][9] = true;
     break
  }
}
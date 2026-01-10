import { p1Stick, p2Stick, handleStickTouch } from "./virtualJoystick.js"

//a sub-array são as ordens para atualizar os hud states corretamente
export const hudState = [[false, false, false, false, false, false], [4, 5]]
export const hudCurrently = {
  active: false
}

export const mpHudState = [[false, false, false, false, false, false, false, false, false, false, false, false], [4, 5, 10, 11]]

export const mpHudCurrently = {
  active: false
}

let isMobileBool = false

function isMobileDevice(){
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

isMobileBool = isMobileDevice()

const keysState = [false, false, false, false, false, false]

const mpKeysState = [false, false, false, false, false, false, false, false, false, false, false, false]

// Funções para lidar com eventos de teclado
function handleKeyDown(e) {
  switch (e.code){
    case "KeyW": keysState[0] = true; break
    case "KeyD": keysState[1] = true; break
    case "KeyS": keysState[2] = true; break
    case "KeyA": keysState[3] = true; break
    case "KeyK": keysState[4] = true; break
    case "KeyL": keysState[5] = true; break
  }
}

function handleKeyUp(e) {
  switch (e.code){
    case "KeyW": keysState[0] = false; break
    case "KeyD": keysState[1] = false; break
    case "KeyS": keysState[2] = false; break
    case "KeyA": keysState[3] = false; break
    case "KeyK": keysState[4] = false; break
    case "KeyL": keysState[5] = false; break
  }
}

function handleMpKeyDown(e) {
  switch (e.code){
    case "KeyW": mpKeysState[0] = true; break
    case "KeyD": mpKeysState[1] = true; break
    case "KeyS": mpKeysState[2] = true; break
    case "KeyA": mpKeysState[3] = true; break
    case "KeyR": mpKeysState[4] = true; break
    case "KeyT": mpKeysState[5] = true; break
    case "ArrowUp": mpKeysState[6] = true; break
    case "ArrowRight": mpKeysState[7] = true; break
    case "ArrowDown": mpKeysState[8] = true; break
    case "ArrowLeft": mpKeysState[9] = true; break
    case "KeyO": mpKeysState[10] = true; break
    case "KeyP": mpKeysState[11] = true; break
  }
}

function handleMpKeyUp(e) {
  switch (e.code){
    case "KeyW": mpKeysState[0] = false; break
    case "KeyD": mpKeysState[1] = false; break
    case "KeyS": mpKeysState[2] = false; break
    case "KeyA": mpKeysState[3] = false; break
    case "KeyR": mpKeysState[4] = false; break
    case "KeyT": mpKeysState[5] = false; break
    case "ArrowUp": mpKeysState[6] = false; break
    case "ArrowRight": mpKeysState[7] = false; break
    case "ArrowDown": mpKeysState[8] = false; break
    case "ArrowLeft": mpKeysState[9] = false; break
    case "KeyO": mpKeysState[10] = false; break
    case "KeyP": mpKeysState[11] = false; break
  }
}

function getHudState() {
  return hudState[0]
}

export function isButtonPressed(index){
const state = getHudState()
if (state[index] == true || keysState[index] == true) {
  return true
}
else {
  return false
}
}

export function isMpButtonPressed(index){
if (mpHudState[0][index] == true || mpKeysState[index] == true) {
  return true
}
else {
  return false
}
}

const hud = [
  document.querySelector("#punch"),
  document.querySelector("#kick")
]

//mp significa multiplayer
const mpHud = [
  document.querySelector("#punch1"),
  document.querySelector("#kick1"),
  document.querySelector("#punch2"),
  document.querySelector("#kick2")
]

// Funções para lidar com eventos de toque (touch)
function handleTouchStart(i, hudStateArray) {
  return () => { // Retorna uma função para cada índice 'i'
   
    hudStateArray[0][hudStateArray[1][i]] = true
  }
}

function handleTouchEnd(i, hudStateArray) {
  return () => { // Retorna uma função para cada índice 'i'
    hudStateArray[0][hudStateArray[1][i]] = false
  }
}

export function setUpSingleHud() {
  // Adiciona listeners para eventos de teclado
  window.addEventListener("keydown", handleKeyDown)
  window.addEventListener("keyup", handleKeyUp)

  // Adiciona listeners para eventos de toque nos elementos HUD
  for (let i = 0; i < hud.length; i++) {
    // Usamos bind(null, i) ou criamos uma closure para passar o 'i' corretamente
    hud[i].ontouchstart = handleTouchStart(i, hudState)
    hud[i].ontouchend = handleTouchEnd(i, hudState)
    if (isMobileBool == false) { continue }
    hud[i].style.display = "block"
  }
  hudCurrently.active = true
  
 //setup p1 stick
  p1Stick.element.ontouchstart = (e) => handleStickTouch(e, p1Stick)
    p1Stick.element.ontouchmove = (e) => handleStickTouch(e, p1Stick)
    p1Stick.element.ontouchend = () => {
      p1Stick.direction = ""
      hudState[0].fill(false, 0, 4) // Reseta direções (0 a 3)
    }
    if (isMobileBool == true) p1Stick.element.style.display = "block"
}

export function disableSingleHud() {
  // Remove listeners para eventos de teclado
  window.removeEventListener("keydown", handleKeyDown)
  window.removeEventListener("keyup", handleKeyUp)

  // Remove listeners para eventos de toque nos elementos HUD
  for (let i = 0; i < hud.length; i++) {
    // É importante passar as mesmas referências de função que foram usadas para adicionar
    hud[i].ontouchstart = null // Atribui null para remover o listener de ontouchstart
    hud[i].ontouchend = null   // Atribui null para remover o listener de ontouchend
    if (isMobileBool == false) { continue }
    hud[i].style.display = "none"
  }
  
  //clear p1 stick
  p1Stick.element.ontouchstart = null
    p1Stick.element.ontouchmove = null
    p1Stick.element.ontouchend = null
    p1Stick.element.style.display = "none";
  
  hudCurrently.active = false
}

export function setUpMpHud() {
  // Adiciona listeners para eventos de teclado
  window.addEventListener("keydown", handleMpKeyDown)
  window.addEventListener("keyup", handleMpKeyUp)

  // Adiciona listeners para eventos de toque nos elementos HUD
  for (let i = 0; i < mpHud.length; i++) {
    // Usamos bind(null, i) ou criamos uma closure para passar o 'i' corretamente
    mpHud[i].ontouchstart = handleTouchStart(i, mpHudState)
    mpHud[i].ontouchend = handleTouchEnd(i, mpHudState)
    if (isMobileBool == false) { continue }
    mpHud[i].style.display = "block"
  }
  
  // Setup Joysticks P1 e P2
  [p1Stick, p2Stick].forEach((stick, index) => {
      stick.element.ontouchstart = (e) => handleStickTouch(e, stick)
      stick.element.ontouchmove = (e) => handleStickTouch(e, stick)
      stick.element.ontouchend = () => {
        stick.direction = ""
        // Se for p1 reseta indices 0-3, se for p2 reseta 6-9
        const offset = index === 0 ? 0 : 6
        mpHudState[0].fill(false, offset, offset + 4)
      }
      if (isMobileBool == true) stick.element.style.display = "block"
  })
  
  mpHudCurrently.active = true
}

export function disableMpHud() {
  // Remove listeners para eventos de teclado
  window.removeEventListener("keydown", handleMpKeyDown)
  window.removeEventListener("keyup", handleMpKeyUp)

  // Remove listeners para eventos de toque nos elementos HUD
  for (let i = 0; i < mpHud.length; i++) {
    // É importante passar as mesmas referências de função que foram usadas para adicionar
    mpHud[i].ontouchstart = null // Atribui null para remover o listener de ontouchstart
    mpHud[i].ontouchend = null   // Atribui null para remover o listener de ontouchend
    if (isMobileBool == false) { continue }
    mpHud[i].style.display = "none"
  }
  
  // limpar joysticks P1 e P2
  [p1Stick, p2Stick].forEach((stick, index) => {
      stick.element.ontouchstart = null
      stick.element.ontouchmove = null
      stick.element.ontouchend = null
      stick.element.style.display = "none"
  })
  
  mpHudCurrently.active = false
}

export const clickWarning = document.getElementById("clickWarning")
export const clickWarningState = {
  active: true
}

export function activateClickWarning(){
  clickWarning.style.display = "flex"
  clickWarningState.active = true
}

export function disableClickWarning(){
  clickWarning.style.display = "none"
  clickWarningState.active = false
}
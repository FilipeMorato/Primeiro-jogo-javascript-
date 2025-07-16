const hudState = [false, false, false, false, false, false]
export let active = [true]

const keysState = [false, false, false, false, false, false]

window.onkeydown = (e) => {
  switch (e.code){
    case "KeyW": keysState[0] = true; break
    case "KeyD": keysState[1] = true; break
    case "KeyS": keysState[2] = true; break
    case "KeyA": keysState[3] = true; break
    case "KeyK": keysState[4] = true; break
    case "KeyL": keysState[5] = true; break
  }
}
window.onkeyup = (e) => {
  switch (e.code){
    case "KeyW": keysState[0] = false; break
    case "KeyD": keysState[1] = false; break
    case "KeyS": keysState[2] = false; break
    case "KeyA": keysState[3] = false; break
    case "KeyK": keysState[4] = false; break
    case "KeyL": keysState[5] = false; break
  }
}

function getHudState() {
  return hudState
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

const hud = [document.querySelector("#up"), document.querySelector("#right"), document.querySelector("#down"), document.querySelector("#left"), document.querySelector("#punch"), document.querySelector("#kick")]

for (let i = 0; i < hud.length; i++) {
  hud[i].ontouchstart = () => {
    hudState[i] = true
   // console.log(`Button ${hud[i].id} pressed: ${isButtonPressed(i)}`)
  }
  hud[i].ontouchend = () => {
    hudState[i] = false
    //console.log(`Button ${hud[i].id} pressed: ${isButtonPressed(i)}`)
  }
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
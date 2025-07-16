import { MenuScene } from "./MenuScene.js"
import { SingleMode, SceneVs } from "./ActionScenes.js"
import { SelectScene } from "./CharSelectScene.js"
import { changeScene, currentScene } from "./SceneManager.js"
import { clickWarningState, activateClickWarning, disableClickWarning } from "./inputs.js"

let frameTime = {
        previous: 0,
        secondsPassed: 0
    }

window.onload = function() { window.addEventListener('click', function () {
        
   disableClickWarning()
        
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
  
  changeScene(MenuScene, context, canvas)

    function mainUpdateCall(time) {
        window.requestAnimationFrame(mainUpdateCall)
        
        context.clearRect(0,0,canvas.width,canvas.height)
        
      frameTime = {
          secondsPassed : (time - frameTime.previous) / 1000,
          previous : time
      }  
        currentScene.update(frameTime)
        currentScene.draw()
    }
    window.requestAnimationFrame(mainUpdateCall)
  }, { once: true })
}

//se for usar o time como parâmetro das funcões individuais de update, não use o frameTime.previous para fazer as comparações, use o proprio time
export { frameTime }
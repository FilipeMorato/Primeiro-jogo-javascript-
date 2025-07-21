import { changeScene, currentScene } from "./SceneManager.js"
import { MenuScene } from "./MenuScene.js"

export const menuBtn = document.getElementById("menuBtn")

export function activateMenuBtn(){
  menuBtn.style.display = "block"
  menuBtn.addEventListener("click", () => {
     changeScene(MenuScene, currentScene.context, currentScene.canvas)
     menuBtn.style.display = "none"
      }, { once: true })
}
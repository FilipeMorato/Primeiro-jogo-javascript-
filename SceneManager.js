export let currentScene = null

export function changeScene(newScene, context, canvas){
  if (currentScene == newScene){
  return
}
if (currentScene){
  currentScene.cleanClassInstance()
  currentScene = null
}
  currentScene = new newScene(context, canvas)
}
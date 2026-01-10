import { trailSprite } from "./sprites.js"

export class Initial {
  constructor(x, y){
    this.x = x
    this.y = y
    this.scale = 1
    this.accelerator = 3.2
    this.currentState = "lol"
    this.rotationDone = false
    this.lineDistance = 100
  }
  
  update(frameTime){
    if (this.currentState == null){
      return
    }
    
    this.scale -= this.accelerator * frameTime.secondsPassed
    
    this.accelerator -= 4.5 * frameTime.secondsPassed
    
    this.lineDistance -= 240 * frameTime.secondsPassed
    
    if (this.scale <= 0){
      this.destroy()
    }
  }
  
  draw(context) {
  if (this.currentState == null) return

  context.save()
  context.translate(this.x, this.y)

  for (let i = 0; i < 7; i++) {
    context.save()
    
    // 1. Rotaciona para a direção da fatia (distribuição circular)
    // Multiplicamos por i para espalhar as 7 linhas
    let angle = i * 0.9 
    context.rotate(angle)
    
    // 2. Move para fora (raio)
    context.translate(0, this.lineDistance)
    
    // 3. Escala (afeta a largura/altura local)
    context.scale(1, this.scale)
    
    // 4. Desenha centralizado no novo ponto
    // Se o sprite é vertical, desenhamos compensando metade da largura
    let imgW = trailSprite.width / 3
    let imgH = trailSprite.height / 3
    context.drawImage(trailSprite, -imgW / 2, 0, imgW, imgH)
    
    context.restore()
  }

  context.restore()
}
  
  destroy(){
    this.x = null
    this.y = null
    this.scale = null
    this.accelerator = null
    this.currentState = null
    this.lineDistance = null
  }
}
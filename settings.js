// Função para verificar se o clique está dentro do retângulo do canvas
export function clicouNoRetanguloCanvas(event, elemento, x, y, width, height) {
  if (!elemento){
    return
  }
    const rect = elemento.getBoundingClientRect(); // Obter o tamanho e posição do canvas na tela
    let rectx = event.clientX - rect.left; // Converter a posição X do clique para o espaço do canvas
    let recty = event.clientY - rect.top;  // Converter a posição Y do clique para o espaço do canvas
  
const originalWidth = elemento.width;
  const originalHeight = elemento.height;

  // Calcula o fator de escalonamento que foi aplicado no eixo X e Y.
  // rect.width/height são as dimensões VISÍVEIS do canvas, após o escalonamento CSS.
  const scaleX = originalWidth / rect.width;
  const scaleY = originalHeight / rect.height;

  // Aplica o fator de desscalonamento às coordenadas do clique.
  // Agora, rectx e recty estão no mesmo sistema de coordenadas dos retângulos que você desenha
  // (que usam as dimensões originais do canvas).
  rectx = rectx * scaleX;
  recty = recty * scaleY;
  
       return (
        rectx >= x &&
        rectx <= x + width &&
        recty >= y &&
        recty <= y + height
    )
}

function isMobileDevice(){
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const globalState = {
  currentMode: "",
  player1: null,
  player2: null,
  hardVsBot: false
}
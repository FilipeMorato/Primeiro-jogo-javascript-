export function drawText(context, color, size, text, x, y) {
  context.save()
  context.fillStyle = color
  context.font = size.toString() + "px Arial"
  context.fillText(text, x, y)
  context.restore()
}
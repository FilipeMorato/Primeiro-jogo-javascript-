function createAudio(source){
  const audio = new Audio(source)
  audio.preservesPitch = false
  audio.preload = "auto"
  return audio
}

export const battleMusics = [
  createAudio("./music/battle1.mp3"),
  createAudio("./music/battle2.mp3"),
  createAudio("./music/battle3.mp3"),
  createAudio("./music/battle4.mp3"),
  ]
  
  export const punchSounds = [
    createAudio("./punch1.mp3"),
    createAudio("./punch2.mp3"),
    createAudio("./punch3.mp3")
    ]

export const woosh = createAudio("./woosh.mp3")
export const fogobixo = createAudio("./fogobixo.mp3")
export const winSound = createAudio("./Win.mp3")
export const charSelectSong = createAudio("./music/characterSelect.mp3")
export const magicShoot = createAudio("./magic.mp3")
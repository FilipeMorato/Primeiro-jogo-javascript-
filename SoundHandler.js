export function playSound(sound, speed, { volume = 1, loop } = {}) {
	sound.volume = 0
	sound.volume = volume;
	sound.playbackRate = speed
	sound.loop = loop ?? sound.loop;
	if (sound.currentTime > 0) sound.currentTime = 0;
	if (sound.paused) sound.play();
}

export function stopSound(sound) {
	sound.pause();
	sound.currentTime = 0;
}
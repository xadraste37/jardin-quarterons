const registry = new Set<HTMLAudioElement>();

export function registerAudio(audio: HTMLAudioElement): void {
  registry.add(audio);
}

export function unregisterAudio(audio: HTMLAudioElement): void {
  registry.delete(audio);
}

export function stopAllAudio(): void {
  registry.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

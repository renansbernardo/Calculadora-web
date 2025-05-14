// Arquivo de utilitário para tocar sons simples
export function playClickSound() {
  if (typeof window !== 'undefined' && window.__CALC_SOUND_ON__ === false) return;
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = 420; // tom suave
  g.gain.value = 0.08;
  o.connect(g);
  g.connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.08);
  o.onended = () => ctx.close();
}

export async function createMyAudioProcessor(audioContext) {
  if (!audioContext) {
    try {
      audioContext = new AudioContext();
      await audioContext.resume();
      await audioContext.audioWorklet.addModule("resample.js");
    } catch (e) {
      return null;
    }
  }

  return new AudioWorkletNode(audioContext, "resampler");
}
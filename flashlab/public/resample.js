class Resampler extends AudioWorkletProcessor {
  constructor(options) {
    super();

    const opts = options.processorOptions || {};

    this.reductionFactor = opts.reductionFactor || 8; // sample hold
    this.bitDepth = opts.bitDepth || 8;               // bit crushing

    this.phase = 0;
    this.lastSample = 0;
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];

    if (!input.length) return true;

    for (let ch = 0; ch < input.length; ch++) {
      const inputChannel = input[ch];
      const outputChannel = output[ch];

      for (let i = 0; i < inputChannel.length; i++) {

        // --- Sample Rate Reduction (sample hold) ---
        if (this.phase++ >= this.reductionFactor) {
          this.phase = 0;
          this.lastSample = inputChannel[i];
        }

        let sample = this.lastSample;

        // --- Bit Depth Reduction ---
        const levels = Math.pow(2, this.bitDepth);
        sample = Math.round(sample * levels) / levels;

        outputChannel[i] = sample;
      }
    }

    return true;
  }
}

registerProcessor("resampler", Resampler);



class resampler extends AudioWorkletProcessor {
    constructor(options) {
        super();
        this.reductionFactor = options.processorOptions.reductionFactor || 8;
        this.lastSample = 0;
        this.counter = 0;
    }
    
    process(inputs, outputs) {
        console.log(inputs.length)
        console.log(outputs.length)
        const output = outputs[0]
        inputs.forEach((channel) => {
            for(let i = 0;i<channel.length;i++){
                channel.splice(-10)
            }
        });
        return true;
    }
}
registerProcessor('resampler',resampler)
/**
 * ASTRA-ResQ: Audio Synthesizer (Web Audio API)
 * Generates tactical alarms, sonar sweeps, emergency sirens, and distress beeps.
 */
class EmergencyAudioSynth {
    constructor() {
        this.ctx = null;
        this.isSirenActive = false;
        this.sirenOsc1 = null;
        this.sirenOsc2 = null;
        this.sirenGain = null;
        this.sirenTimer = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playSonarPing() {
        try {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.6);
        } catch(e){}
    }

    playRadioChirp() {
        try {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
            osc.frequency.setValueAtTime(1600, this.ctx.currentTime + 0.05);
            osc.frequency.setValueAtTime(1000, this.ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.18);
        } catch(e){}
    }

    playDistressBeep() {
        try {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(950, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch(e){}
    }

    toggleSiren(forceState) {
        this.init();
        if (typeof forceState !== 'undefined') {
            this.isSirenActive = !forceState;
        }
        if (this.isSirenActive) {
            this.stopSiren();
            return false;
        } else {
            this.startSiren();
            return true;
        }
    }

    startSiren() {
        if (this.isSirenActive) return;
        this.init();
        this.isSirenActive = true;
        try {
            this.sirenOsc1 = this.ctx.createOscillator();
            this.sirenOsc2 = this.ctx.createOscillator();
            this.sirenGain = this.ctx.createGain();
            this.sirenOsc1.type = 'sawtooth';
            this.sirenOsc2.type = 'triangle';
            this.sirenGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
            this.sirenOsc1.connect(this.sirenGain);
            this.sirenOsc2.connect(this.sirenGain);
            this.sirenGain.connect(this.ctx.destination);
            const now = this.ctx.currentTime;
            this.sirenOsc1.start(now);
            this.sirenOsc2.start(now);
            let isHigh = false;
            const cycle = () => {
                if (!this.isSirenActive) return;
                const t = this.ctx.currentTime;
                if (isHigh) {
                    this.sirenOsc1.frequency.exponentialRampToValueAtTime(450, t + 1.2);
                    this.sirenOsc2.frequency.exponentialRampToValueAtTime(455, t + 1.2);
                } else {
                    this.sirenOsc1.frequency.exponentialRampToValueAtTime(900, t + 1.2);
                    this.sirenOsc2.frequency.exponentialRampToValueAtTime(910, t + 1.2);
                }
                isHigh = !isHigh;
                this.sirenTimer = setTimeout(cycle, 1200);
            };
            cycle();
        } catch(e){}
    }

    stopSiren() {
        this.isSirenActive = false;
        if (this.sirenTimer) clearTimeout(this.sirenTimer);
        try {
            if (this.sirenOsc1) { this.sirenOsc1.stop(); this.sirenOsc1.disconnect(); }
            if (this.sirenOsc2) { this.sirenOsc2.stop(); this.sirenOsc2.disconnect(); }
        } catch(e) {}
    }
}
window.AudioSynth = new EmergencyAudioSynth();

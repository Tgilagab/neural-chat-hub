class NeuralRelay {
    constructor(state) {
        this.state = state; // Access to global app state/UI elements
        this.recognition = null;
        this.synth = window.speechSynthesis;
        this.setupSpeechRecognition();
    }

    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRec();
            this.recognition.continuous = true;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const text = event.results[event.results.length - 1][0].transcript;
                this.state.sendMessage(text, true); 
            };

            this.recognition.onend = () => {
                if (this.state.ui.micBtn.classList.contains('mic-active')) this.recognition.start();
            };
        }
    }

    startMic() {
        if (this.recognition) this.recognition.start();
    }

    stopMic() {
        if (this.recognition) this.recognition.stop();
    }

    speak(text, langCode) {
        if (!this.state.speakerActive) return;
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Simple mapping for demo
        if (langCode.startsWith('fr')) utterance.lang = 'fr-FR';
        else if (langCode.startsWith('es')) utterance.lang = 'es-ES';
        else utterance.lang = 'en-US';

        this.synth.speak(utterance);
    }

    stopAudio() {
        this.synth.cancel();
    }
}

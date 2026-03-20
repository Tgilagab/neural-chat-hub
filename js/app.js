class NeuralApp {
    constructor() {
        this.ui = {
            languageSelect: document.getElementById('languageSelect'),
            chatInput: document.getElementById('chatInput'),
            sendBtn: document.getElementById('sendBtn'),
            chatMessages: document.getElementById('chatMessages'),
            clockEl: document.getElementById('clock'),
            micBtn: document.getElementById('micBtn'),
            speakerBtn: document.getElementById('speakerBtn'),
            relayStatus: document.getElementById('relayStatus')
        };

        this.isRelayActive = false;
        this.speakerActive = false;
        this.relay = new NeuralRelay(this);

        this.init();
    }

    init() {
        populateLanguages(this.ui.languageSelect);
        this.ui.micBtn.classList.add('mic-muted'); // Initial state: Muted
        this.ui.speakerBtn.classList.add('speaker-muted'); // Initial state: Muted
        this.setupEventListeners();
        this.startClock();
    }

    startClock() {
        const update = () => {
            const now = new Date();
            const datePart = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            this.ui.clockEl.textContent = `${datePart} | ${timePart}`;
        };
        setInterval(update, 1000);
        update();
    }

    setupEventListeners() {
        this.ui.micBtn.onclick = () => this.toggleMic();
        this.ui.speakerBtn.onclick = () => this.toggleSpeaker();
        this.ui.sendBtn.onclick = () => this.handleDeployment();
        this.ui.chatInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                if (!this.isRelayActive) this.handleDeployment();
                else this.sendMessage(this.ui.chatInput.value);
            }
        };
    }

    toggleMic() {
        const isMuted = this.ui.micBtn.classList.contains('mic-muted') || !this.ui.micBtn.classList.contains('mic-active');
        
        if (isMuted) {
            // Unmute -> Active Green
            this.ui.micBtn.classList.remove('mic-muted');
            this.ui.micBtn.classList.add('mic-active');
            this.relay.startMic();
            this.appendMessage("Microphone link established. Forwarding raw audio bypass...", 'user', true);
        } else {
            // Mute -> Red
            this.ui.micBtn.classList.remove('mic-active');
            this.ui.micBtn.classList.add('mic-muted');
            this.relay.stopMic();
            this.appendMessage("Microphone muted. Local sync suspended.", 'system');
        }
    }

    toggleSpeaker() {
        const isMuted = this.ui.speakerBtn.classList.contains('speaker-muted') || !this.ui.speakerBtn.classList.contains('speaker-active');
        
        if (isMuted) {
            // Activate -> Bright Green
            this.ui.speakerBtn.classList.remove('speaker-muted');
            this.ui.speakerBtn.classList.add('speaker-active');
            this.speakerActive = true;
            this.appendMessage("Neural audio output engaged. Primary speaker active.", 'system');
        } else {
            // Mute -> Red
            this.ui.speakerBtn.classList.remove('speaker-active');
            this.ui.speakerBtn.classList.add('speaker-muted');
            this.speakerActive = false;
            this.relay.stopAudio();
            this.appendMessage("Audio output muted. Background archival continues.", 'system');
        }
    }

    handleDeployment() {
        const url = this.ui.chatInput.value.trim();
        if (!url) return;

        this.isRelayActive = !this.isRelayActive;
        if (this.isRelayActive) {
            this.ui.relayStatus.classList.add('active');
            this.ui.relayStatus.innerHTML = '<span class="status-dot"></span> Relay: Sync Active';
            this.ui.sendBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg> Stop';
            this.appendMessage(`Neural translation engaged for link: ${url}. Monitoring inbound audio...`, 'system');
            this.simulateMeetingAudio();
        } else {
            this.ui.relayStatus.classList.remove('active');
            this.ui.relayStatus.innerHTML = '<span class="status-dot"></span> Relay: Standby';
            this.ui.sendBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6 6-6"></path><path d="M2 18h20"></path></svg> Translate';
            this.appendMessage("Neural translation link terminated.", 'system');
            this.relay.stopAudio();
        }
    }

    appendMessage(text, type = 'user', isDirect = false) {
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        const meta = isDirect ? 'Direct Transmission' : (type === 'user' ? 'Operator' : 'Inbound [Translated]');
        const tag = isDirect ? 'DIRECT' : (type === 'user' ? 'LOCAL' : 'RECV');
        
        msg.innerHTML = `
            <div class="message-meta">
                <span>${meta}</span>
                <span class="meta-tag">${tag}</span>
            </div>
            ${text}
        `;
        this.ui.chatMessages.appendChild(msg);
        this.ui.chatMessages.scrollTop = this.ui.chatMessages.scrollHeight;

        // Audio feedback for translated inbound
        if (type === 'system' && this.speakerActive && !text.includes("Establishing") && !text.includes("terminated")) {
            this.relay.speak(text, this.ui.languageSelect.value);
        }
    }

    sendMessage(text, fromMic = false) {
        if (text) {
            this.appendMessage(text, 'user', true);
            if (!fromMic) this.ui.chatInput.value = '';
        }
    }

    simulateMeetingAudio() {
        if (!this.isRelayActive) return;
        
        const selectedLang = this.ui.languageSelect.selectedOptions[0].text.split(' ')[0];
        const meetResponses = [
            `Acknowledged. We are seeing the data stream clearly now in ${selectedLang}.`,
            `The project timeline has been approved by the board. Translation complete.`,
            `Could you clarify the technical requirements for the neural link? [Relaying to ${selectedLang}]`,
            `Synchronization verified. All systems operational.`,
            `Inbound audio stream detected. Processing through ${selectedLang} core.`
        ];
        
        setTimeout(() => {
            if (this.isRelayActive) {
                const randomIndex = Math.floor(Math.random() * meetResponses.length);
                this.appendMessage(meetResponses[randomIndex], 'system');
                this.simulateMeetingAudio();
            }
        }, 5000 + Math.random() * 5000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NeuralApp();
});

/**
 * ASTRA-ResQ: Multilingual Voice Assistant & Emergency Guidance
 * Languages: English (en-IN), Telugu (te-IN), Hindi (hi-IN)
 */

class EmergencyVoiceAssistant {
    constructor() {
        this.synth = (typeof window !== 'undefined') ? window.speechSynthesis : null;
        this.currentLang = 'en-IN';
        this.isListening = false;
        this.recognition = null;
        this.voices = [];
        this.initSpeechRecognition();
        this.loadVoices();
    }

    loadVoices() {
        if (!this.synth) return;
        this.voices = this.synth.getVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => {
                this.voices = this.synth.getVoices();
            };
        }
    }

    setLanguage(langCode) {
        this.currentLang = langCode;
        console.log('Voice Assistant Language set to:', langCode);
    }

    speak(text, lang = null) {
        if (!this.synth) return;
        this.synth.cancel();

        const targetLang = lang || this.currentLang;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang;
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        const prefix = targetLang.split('-')[0];
        const matchedVoice = this.voices.find(v => v.lang.startsWith(prefix));
        if (matchedVoice) {
            utterance.voice = matchedVoice;
        }

        this.synth.speak(utterance);
    }

    initSpeechRecognition() {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Speech Recognition not supported in this browser.');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('Voice input received:', transcript);
            if (window.handleVoiceInputResult) {
                window.handleVoiceInputResult(transcript);
            }
        };

        this.recognition.onerror = (e) => {
            console.error('Speech recognition error:', e);
            this.isListening = false;
            if (window.updateVoiceUI) window.updateVoiceUI(false);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            if (window.updateVoiceUI) window.updateVoiceUI(false);
        };
    }

    startListening() {
        if (!this.recognition) {
            alert('Speech recognition is not supported in this browser. You can type in the emergency prompt.');
            return false;
        }
        try {
            this.recognition.lang = this.currentLang;
            this.recognition.start();
            this.isListening = true;
            if (window.AudioSynth) window.AudioSynth.playRadioChirp();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }

    getEmergencyGuidance(query) {
        const q = (query || '').toLowerCase();
        
        if (q.includes('cpr') || q.includes('heart') || q.includes('గుండె') || q.includes('శ్వాస') || q.includes('दिल')) {
            if (this.currentLang.startsWith('te')) {
                return {
                    title: 'CPR అత్యవసర చికిత్స (Cardiopulmonary Resuscitation)',
                    audio: 'బాధితుడి ఛాతీ మధ్యలో రెండు చేతులు ఉంచి నిమిషానికి 100 నుండి 120 సార్లు బలంగా నొక్కండి. సహాయం వచ్చేవరకు ఆపవద్దు.',
                    steps: [
                        'బాధితుడిని గట్టి సమాంతర నేలపై పడుకోబెట్టండి.',
                        'రెండు చేతులు జోడించి ఛాతీ మధ్య భాగంలో ఉంచండి.',
                        'మోచేతులు వంచకుండా 5-6 సెం.మీ లోతుకు బలంగా నొక్కండి (నిమిషానికి 100-120 సార్లు).',
                        'ప్రతి 30 నొక్కుల తర్వాత 2 సార్లు నోటి శ్వాస అందించండి.',
                        'SRU హెల్త్ సెంటర్ లేదా 108 అంబులెన్స్‌ను తక్షణమే సంప్రదించండి.'
                    ]
                };
            } else if (this.currentLang.startsWith('hi')) {
                return {
                    title: 'सीपीआर आपातकालीन निर्देश (CPR Life Support)',
                    audio: 'पीड़ित की छाती के बीच दोनों हाथ रखकर प्रति मिनट 100 से 120 बार जोर से दबाएं। सहायता आने तक जारी रखें।',
                    steps: [
                        'पीड़ित को सख्त और समतल जमीन पर सीधा लिटाएं।',
                        'छाती के केंद्र पर दोनों हथेलियां रखें।',
                        'कोहनी सीधी रखकर 5-6 सेमी गहराई तक तेजी से दबाएं (100-120 बार प्रति मिनट)।',
                        'हर 30 दबाव के बाद 2 बार मुंह से सांस दें।',
                        'तुरंत एसआर यूनिवर्सिटी हेल्थ सेंटर या 108 पर कॉल करें।'
                    ]
                };
            } else {
                return {
                    title: 'CPR Emergency Life Support Protocol',
                    audio: 'Place both hands in the center of the chest. Push hard and fast at 100 to 120 beats per minute until medical help arrives.',
                    steps: [
                        'Check responsiveness and call for help immediately.',
                        'Place victim on a firm, flat surface.',
                        'Push down hard (5-6 cm depth) at rate of 100-120 compressions/minute.',
                        'Allow chest to fully recoil between compressions.',
                        'Give 2 rescue breaths after every 30 compressions if trained.',
                        'Call SRU Health Center (+91 870 281 8399) or 108.'
                    ]
                };
            }
        } else if (q.includes('flood') || q.includes('water') || q.includes('వరద') || q.includes('నీరు') || q.includes('बाढ़')) {
            if (this.currentLang.startsWith('te')) {
                return {
                    title: 'వరద భద్రత మరియు తరలింపు (Flood Protocol)',
                    audio: 'వరద నీటిలోకి దిగవద్దు. తక్షణమే ఎస్.ఆర్.యు స్పోర్ట్స్ కాంప్లెక్స్ లేదా అడ్మిన్ భవనం పై అంతస్తులకు చేరుకోండి.',
                    steps: [
                        'ప్రవహించే వరద నీటిలోకి వెళ్లవద్దు.',
                        'వెంటనే ఎత్తైన సేఫ్ జోన్ (స్పోర్ట్స్ కాంప్లెక్స్ లేదా అడ్మిన్ పై అంతస్తులు) వైపు వెళ్ళండి.',
                        'ట్రాన్స్‌ఫార్మర్ మరియు విద్యుత్ వైర్ల నుండి 30 మీటర్ల దూరంలో ఉండండి.',
                        'ఫోన్ బ్యాటరీ ఆదా చేసి ఆఫ్లైన్ SOS లోకేషన్ పంపండి.',
                        'సురక్షితమైన శుభ్రమైన తాగునీటిని మాత్రమే సేవించండి.'
                    ]
                };
            } else if (this.currentLang.startsWith('hi')) {
                return {
                    title: 'बाढ़ सुरक्षा एवं निकासी निर्देश (Flood Protocol)',
                    audio: 'बाढ़ के पानी में न जाएं। तुरंत एसआर यूनिवर्सिटी के स्पोर्ट्स कॉम्प्लेक्स या मुख्य भवन में शरण लें।',
                    steps: [
                        'बहते पानी में कभी पैदल या वाहन से न जाएं।',
                        'तुरंत ऊंचे सुरक्षित स्थानों (स्पोर्ट्स एरिना या असेंबली प्वाइंट) पर जाएं।',
                        'बिजली के खंभों और ट्रांसफार्मर से कम से कम 30 मीटर दूर रहें।',
                        'फोन की बैटरी बचाएं और ऑफलाइन SOS का उपयोग करें।',
                        'सुरक्षित राहत कैंप के पेयजल का ही उपयोग करें।'
                    ]
                };
            } else {
                return {
                    title: 'Flash Flood & Inundation Protocol',
                    audio: 'Do not enter moving floodwaters. Evacuate immediately to high ground shelters at SRU Sports Complex or Admin Upper Floors.',
                    steps: [
                        'Never walk or drive through moving water.',
                        'Evacuate to elevated shelters (Sports Complex or Assembly Point Alpha).',
                        'Stay at least 30 meters away from electrical transformers and downed power lines.',
                        'Keep emergency offline SMS ready on your mobile.',
                        'Drink only verified potable relief water.'
                    ]
                };
            }
        } else if (q.includes('fire') || q.includes('burn') || q.includes('మంటలు') || q.includes('ఆగ') || q.includes('आग')) {
            if (this.currentLang.startsWith('te')) {
                return {
                    title: 'అగ్నిప్రమాద అత్యవసర చర్యలు (Fire Emergency)',
                    audio: 'పొగ ఉంటే నేలపై వంగి వెళ్ళండి. లిఫ్ట్ వాడవద్దు. కేవలం అత్యవసర మెట్లను మాత్రమే ఉపయోగించండి.',
                    steps: [
                        'పొగ నుండి రక్షణకు నేలపై వంగి తడి గుడ్డతో ముఖాన్ని కప్పుకోండి.',
                        'ఎట్టి పరిస్థితుల్లోనూ లిఫ్ట్ వాడవద్దు; ఎమర్జెన్సీ మెట్ల ద్వారా బయటకు రండి.',
                        'తలుపు తెరవడానికి ముందు హ్యాండిల్ వేడిగా ఉందో లేదో తనిఖీ చేయండి.',
                        'శరీరానికి మంటలు అంటుకుంటే: ఆగండి, పడుకోండి, దొర్లండి (STOP, DROP, ROLL).',
                        'కాలిన గాయాలపై కనీసం 10 నిమిషాలు చల్లని నీరు పోయండి.'
                    ]
                };
            } else {
                return {
                    title: 'Fire & Chemical Hazard Protocol',
                    audio: 'Crawl low under smoke. Never use elevators. Use emergency fire stairwells and proceed directly to Assembly Point Alpha on the campus cricket ground.',
                    steps: [
                        'Crawl low under smoke where air is cleaner.',
                        'Feel door handles before opening.',
                        'Never use elevators during fire alerts.',
                        'If clothes catch fire: STOP, DROP, and ROLL.',
                        'Cool burns under clean running water for 10-15 minutes.',
                        'Assemble at SRU Central Cricket Ground (Safe Assembly Point Alpha).'
                    ]
                };
            }
        } else {
            return {
                title: 'SR University Disaster Advisory',
                audio: 'ASTRA-ResQ AI is active. Please state your exact campus location, building code, or medical assistance requirement.',
                steps: [
                    'Locate nearest SRU Building QR / Signboard (e.g. ADM-01, CSE-02, SPT-08).',
                    'Press the Red SOS button for 1-click rescue dispatch.',
                    'Check your map for dynamic green safe evacuation corridors.',
                    'SRU Incident Control Hotline: +91 870 281 8300.'
                ]
            };
        }
    }
}

window.VoiceAssistant = new EmergencyVoiceAssistant();

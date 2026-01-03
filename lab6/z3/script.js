const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert('Speech Recognition API is not supported in this browser. Please use Chrome, Edge, or Safari.');
}

const recognition = new SpeechRecognition();
recognition.lang = 'pl-PL';

const singleBtn = document.getElementById('singleBtn');
const continuousBtn = document.getElementById('continuousBtn');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const statusEl = document.getElementById('status');
const currentModeEl = document.getElementById('currentMode');
const output = document.getElementById('output');

let isListening = false;
let isContinuousMode = false;

singleBtn.addEventListener('click', () => {
    if (isListening) return;

    isContinuousMode = false;
    recognition.continuous = false;
    recognition.interimResults = false;

    singleBtn.classList.add('active');
    continuousBtn.classList.remove('active');
    currentModeEl.textContent = 'Pojedyńcza komenda';
});

continuousBtn.addEventListener('click', () => {
    if (isListening) return;

    isContinuousMode = true;
    recognition.continuous = true;
    recognition.interimResults = true;

    continuousBtn.classList.add('active');
    singleBtn.classList.remove('active');
    currentModeEl.textContent = 'Tryb ciągu słów';
});

startBtn.addEventListener('click', () => {
    recognition.start();
    isListening = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    updateStatus('Nasłuchuję...', true);
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
    isListening = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    updateStatus('Zatrzymano');
});

clearBtn.addEventListener('click', () => {
    output.innerHTML = '<p class="placeholder">Twoja mowa pojawi się tutaj...</p>';
});

recognition.onstart = () => {
    console.log('Rozpoczęto rozpoznawanie mowy');
};

recognition.onresult = (event) => {
    console.log('Wynik rozpozniania:', event);

    for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        const isFinal = result.isFinal;

        if (isFinal) {
            addResult(transcript, confidence);
        } else if (isContinuousMode) {
            updateInterimResult(transcript);
        }
    }
};

recognition.onerror = (event) => {
    console.error('Błąd rozpoznawania mowy:', event.error);
    let errorMessage = 'Wystąpił błąd';

    switch (event.error) {
        case 'no-speech':
            errorMessage = 'Nie wykryto mowy';
            break;
        case 'audio-capture':
            errorMessage = 'Nie znaleziono mikrofonu';
            break;
        case 'not-allowed':
            errorMessage = 'Odmowa dostępu do mikrofonu';
            break;
        case 'network':
            errorMessage = 'Błąd sieciowy';
            break;
        default:
            errorMessage = `Error: ${event.error}`;
    }

    updateStatus(errorMessage);
    isListening = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

recognition.onend = () => {
    console.log('Zakończono rozpoznawanie mowy');

    if (!isContinuousMode || !isListening) {
        isListening = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        updateStatus('Gotowy');
    } else {
        try {
            recognition.start();
        } catch (e) {
            console.error('Nie udało się ponownie uruchomić rozpoznawania:', e);
            isListening = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            updateStatus('Gotowy');
        }
    }
};

function updateStatus(status, isListening = false) {
    if (isListening) {
        statusEl.innerHTML = status + ' <span class="listening-indicator"></span>';
    } else {
        statusEl.textContent = status;
    }
}

function addResult(transcript, confidence) {
    const placeholder = output.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    const interim = output.querySelector('.interim');
    if (interim) {
        interim.remove();
    }

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-item';

    const timestamp = new Date().toLocaleTimeString('pl-PL');
    const confidencePercent = (confidence * 100).toFixed(1);

    resultDiv.innerHTML = `
        <div class="timestamp"> ${timestamp}</div>
        <div class="text"> ${transcript}</div>
        <div class="confidence">✓ Pewność: ${confidencePercent}%</div>
    `;

    output.insertBefore(resultDiv, output.firstChild);
}

function updateInterimResult(transcript) {
    const placeholder = output.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    let interim = output.querySelector('.interim');
    if (!interim) {
        interim = document.createElement('div');
        interim.className = 'result-item interim';
        interim.style.opacity = '0.6';
        interim.style.borderLeftColor = '#f59e0b';
        output.insertBefore(interim, output.firstChild);
    }

    interim.innerHTML = `
        <div class="timestamp"> Interim...</div>
        <div class="text"> ${transcript}</div>
    `;
}
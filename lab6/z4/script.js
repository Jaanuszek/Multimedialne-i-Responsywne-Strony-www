const startButton = document.getElementById("startListening");
const stopButton = document.getElementById("stopListening");

const pageMap = {
    "home": "home",
    "formularz": "form",
    "ustawienia": "settings"
};

let pageActivated = document.querySelector(".page.active");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let isRecognizing = false;

const recognition = new SpeechRecognition();
recognition.lang = "pl-PL";
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

startButton.addEventListener("click", startRecognition);
stopButton.addEventListener("click", stopRecognition);

recognition.onresult = (event) => {
    console.log(event);
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    const confidence = event.results[event.results.length - 1][0].confidence;
    console.log("Recognized text:", transcript);
    console.log("Confidence:", confidence);

    if(transcript.toLowerCase().includes("szukaj")) {
        const query = transcript.toLowerCase().replace("szukaj", "").trim();
        searchGoogle(query);
    }
    else if(transcript.toLowerCase().includes("youtube")) {
        const query = transcript.toLowerCase().replace("youtube", "").trim();
        searchYoutube(query);
    }
    else if(transcript.toLowerCase().includes("idź do")) {
        const destination = transcript.toLowerCase().replace("idź do", "").trim();
        if (pageMap[destination]) {
            pageActivated.classList.remove("active");
            let newSelector = document.getElementById(pageMap[destination]);
            if(newSelector)
            {
                newSelector.classList.add("active");
                pageActivated = newSelector;
            }
        }
    }
    else if(transcript.toLowerCase().includes("zaznacz") && pageActivated.id === "settings") {
        const checkboxName = transcript.toLowerCase().replace("zaznacz", "").trim();
        const checkbox = document.querySelector(`#settings input[type="checkbox"][name="${checkboxName}"]`);
        if(checkbox) {
            checkbox.checked = true;
        }
    }
    else if(transcript.toLowerCase().includes("odznacz") && pageActivated.id === "settings") {
        const checkboxName = transcript.toLowerCase().replace("odznacz", "").trim();
        const checkbox = document.querySelector(`#settings input[type="checkbox"][name="${checkboxName}"]`);
        if(checkbox) {
            checkbox.checked = false;
        }
    }
    else if(transcript.toLowerCase().includes("aktywuj") && pageActivated.id === "form") {
        const fieldName = transcript.toLowerCase().replace("aktywuj", "").trim();
        const field = document.querySelector(`#form input[name="${fieldName}"], #form textarea[name="${fieldName}"]`);
        if(field) {
            field.focus();
        }
    }
    else if(transcript.toLowerCase().includes("wpisz") && pageActivated.id === "form") {
        const textToEnter = transcript.toLowerCase().replace("wpisz", "").trim();
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
            activeElement.value = textToEnter;
        }
    }
};

recognition.onend = () => {
    isRecognizing = false;
    console.log("Speech recognition ended.");
}

function searchGoogle(query) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
}

function searchYoutube(query) {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
}

function startRecognition() {
    if (isRecognizing) return;
    try{
        recognition.start();
        isRecognizing = true;
        console.log("Speech recognition started.");
    } catch (error) {
        console.error("Error starting speech recognition:", error);
    }
}

function stopRecognition() {
    try {
        recognition.stop();
    } catch (error) {
        console.error("Error stopping speech recognition:", error);
    }
}


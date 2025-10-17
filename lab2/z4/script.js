const blueSquare = document.getElementById(`blue`);
const redSquare = document.getElementById(`red`);
const yellowSquare = document.getElementById(`yellow`);
const console = document.getElementById(`console`);
const score = document.getElementById(`score`);
const propagationButton = document.getElementById(`togglePropagation`);
const resetButton = document.getElementById(`reset`);
const orderButton = document.getElementById(`order`);

let scoreValue = 0;
let propagationEnabled = true;
let isCapture = false;

function updateScore(){
    score.innerHTML = "Score: " + scoreValue;
}

function blueEvent(event)
{
    if(!propagationEnabled){
        event.stopPropagation();
    }
    console.innerHTML += "Nacisnąłeś niebieski o wartości 1<br>";
    scoreValue += 1;
    updateScore();
}

function redEvent(event)
{
    if(!propagationEnabled){
        event.stopPropagation();
    }
    console.innerHTML += "Nacisnąłeś czerwony o wartości 2<br>";
    scoreValue += 2;
    updateScore();
    if(scoreValue > 30){
        redSquare.removeEventListener('click', redEvent);
    }
}

function yellowEvent(event)
{
    if(!propagationEnabled){
        event.stopPropagation();
    }
    console.innerHTML += "Nacisnąłeś żółty o wartości 5<br>";
    scoreValue += 5;
    updateScore();
    if(scoreValue > 50){
        yellowSquare.removeEventListener('click', yellowEvent);
    }
}

function disableAll(){
    blueSquare.removeEventListener('click', blueEvent, isCapture);
    redSquare.removeEventListener('click', redEvent, isCapture);
    yellowSquare.removeEventListener('click', yellowEvent, isCapture);
}


function activateAll(){
    blueSquare.addEventListener('click', blueEvent, isCapture);
    redSquare.addEventListener('click', redEvent, isCapture);
    yellowSquare.addEventListener('click', yellowEvent, isCapture);
}

activateAll();

propagationButton.addEventListener('click', (event)=>{
    propagationEnabled = !propagationEnabled;
    propagationButton.innerHTML = propagationEnabled ? "Stop Propagation" : "Start Propagation";
});

orderButton.addEventListener('click', ()=>{
    disableAll();
    isCapture = !isCapture;
    orderButton.innerHTML = isCapture ? "Order: Capture" : "Order: Bubble";
    activateAll(propagationEnabled);
});
    

resetButton.addEventListener('click', ()=>{
    scoreValue = 0;
    updateScore();
    console.innerHTML = "";
    disableAll();
    blueSquare.addEventListener('click', blueEvent);
    redSquare.addEventListener('click', redEvent);
    yellowSquare.addEventListener('click', yellowEvent);
});

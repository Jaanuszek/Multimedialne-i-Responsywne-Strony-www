const blueSquare = document.getElementById(`blue`);
const redSquare = document.getElementById(`red`);
const yellowSquare = document.getElementById(`yellow`);
const console = document.getElementById(`console`);

let score = 0;

function blueEvent()
{
    console.innerHTML += "Nacisnąłeś niebieski o wartości 1<br>";
    score += 1;
}

function redEvent()
{
    console.innerHTML += "Nacisnąłeś czerwony o wartości 2<br>";
    score += 2;

    if(score > 30){
        redSquare.removeEventListener('click', redEvent);
    }
}

function yellowEvent()
{
    console.innerHTML += "Nacisnąłeś żółty o wartości 5<br>";
    score += 5;

    if(score > 50){
        yellowSquare.removeEventListener('click', yellowEvent);
    }
}

blueSquare.addEventListener('click', blueEvent);

redSquare.addEventListener('click', redEvent);

yellowSquare.addEventListener('click', yellowEvent);


function disableAll(){
    blueSquare.removeEventListener('click', blueEvent);
    redSquare.removeEventListener('click', redEvent);
    yellowSquare.removeEventListener('click', yellowEvent);
}


if(score >= 10){
    disableAll();
}
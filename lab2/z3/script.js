const cards_context = document.getElementsByClassName("card");
let card_idx = 0;
let first_load = true;

const left_buttons = document.getElementsByClassName("button-left");
const right_buttons = document.getElementsByClassName("button-right");
const random_button = document.getElementById("random");

const Direction = Object.freeze({
    LEFT: "left",
    RIGHT: "right",
    BOTTOM: "bottom"
});

const AnimType = Object.freeze({
    IN: "in",
    OUT: "out"
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function animateFun(element, direction, inOut){
    let keyframes;
    const duration=200;

    if(inOut === "in"){
        if(direction === "right")
        {
            keyframes= [
                {transform: "translateX(100%)", opacity: 0},
                {transform: "translateX(0%)", opacity: 1}
            ]
        }
        else if(direction === "left")
        {
            keyframes = [
                {transform: "translateX(-100%)", opacity: 0},
                {transform: "translateX(0%)", opacity: 1}
            ]
        }
        else if(direction === "bottom")
        {
            keyframes = [
                {transform: "translateY(100%)", opacity: 0},
                {transform: "translateY(0%)", opacity: 1}
            ]
        }
    }
    else if (inOut === "out")
    {
        if(direction === "right")
        {
            keyframes= [
                {transform: "translateX(0%)", opacity: 1},
                {transform: "translateX(-100%)", opacity: 0}
            ]
        }
        else if(direction === "left")
        {
            keyframes = [
                {transform: "translateX(0%)", opacity: 1},
                {transform: "translateX(100%)", opacity: 0}
            ]
        }
        else if(direction === "bottom")
        {
            keyframes = [
                {transform: "translateY(0%)", opacity: 1},
                {transform: "translateY(100%)", opacity: 0}
            ]
        }
    }

    return element.animate(keyframes,
        {
            duration: duration,
            easing: "ease-in-out",
            fill: "forwards"
        }
    );
}

function displayCard(direction){
    const currentCard = cards_context[card_idx];
    const outCardAnim = animateFun(currentCard, direction, AnimType.OUT);
    const outRandButtonAnim = animateFun(random_button, direction, AnimType.OUT);
    outCardAnim.onfinish = () =>{
        currentCard.style.display = "none";
        
        if (direction === Direction.BOTTOM) {
            card_idx = getRandomInt(cards_context.length);
        } else if (direction === Direction.LEFT) {
            card_idx = (card_idx + 1) % cards_context.length;
        } else if (direction === Direction.RIGHT) {
            card_idx = (card_idx - 1 + cards_context.length) % cards_context.length;
        }

        const nextCard = cards_context[card_idx];
        nextCard.style.display = "grid";
        animateFun(nextCard, direction, AnimType.IN);
        animateFun(random_button, direction, AnimType.IN);
    }
}

if(first_load)
{
    cards_context[card_idx].style.display = "grid";
    first_load = false;
}

for(let left_button of left_buttons){
    left_button.addEventListener('click', () => displayCard(Direction.RIGHT));
}

for(let right_button of right_buttons){
    right_button.addEventListener('click', () => displayCard(Direction.LEFT));
}

random_button.addEventListener('click', () => displayCard(Direction.BOTTOM));
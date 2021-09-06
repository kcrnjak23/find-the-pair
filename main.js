const sign = ["star", "star", "circle", "circle", "box", "box", "plus", "plus", "triangle", "triangle"];
const cards = document.querySelectorAll(".card");
let timer = document.querySelector(".timer");
const restart = document.getElementById("restartBtn");
let seconds = 0;
let value1 = "";
let value2 = "";
let counter = 0;
let turns = 0;
let card1;
let card2;
let correctPairs = 0;

let time = setInterval(setTime, 1000);

function setTime(){
    seconds += 1;
    timer.innerHTML = seconds;
}

cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * sign.length);
    card.classList.add(sign[randomNum]);
    sign.splice(randomNum, 1);
    //card.innerHTML = card.className;
});

cards.forEach(card => {
    card.setAttribute("clicked", "no");
    card.addEventListener("click", () => {
        if (counter === 0) {
            counter += 1;
            turns += 1;
            card.innerHTML = card.className;
            card.setAttribute("clicked", "yes")
            value1 = card.className;
            card1 = card;
        }

        else if(card.getAttribute("clicked") === "yes") return;

        else {
            counter -= 1;
            turns += 1;
            card.innerHTML = card.className;
            card.setAttribute("clicked", "yes")
            value2 = card.className;
            card2 = card;
        }

        if (turns == 2) {
            if (value1 == value2) {
                let sameCards = document.getElementsByClassName(value1);
                for (let i = 0; i < sameCards.length; i++) {
                    setTimeout(() => {
                        sameCards[i].style.backgroundColor = "green";
                        sameCards[i].style.border = "1px solid green";
                    }, 1000);
                }
                correctPairs += 1;
                if(correctPairs == 5){
                    clearInterval(time);
                    console.log("win");
                    restart.style.display = "block";
                }
            }
            else {
                setTimeout(() => {
                    card1.setAttribute("clicked", "no");
                    card1.innerHTML = "";
                    card2.setAttribute("clicked", "no");
                    card2.innerHTML = "";
                }, 1000);
            }
            value1 = "";
            value2 = "";
            turns = 0;
        }
    });
    
});

restart.addEventListener("click", () => {
    location.reload();
})


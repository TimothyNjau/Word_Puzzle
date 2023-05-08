const startBtn = document.getElementById("startBtn");
const wordCont = document.getElementById("wordsCont");
const scores = document.getElementById("scores");
const mainCont = document.getElementById("mainCont");
const messageCont = document.getElementById("messageCont");
const timerInp = document.getElementById("timer");
let startFlag = false;
let timingInterval

startBtn.addEventListener("click", () => {
    let array = dict.slice();
    mainCont.style.visibility = "visible";
    messageCont.style.visibility = "hidden";
    timerInp.value = "00:00";
    if (startFlag) {
        table.innerHTML = "";
        document.querySelectorAll("#wordsCont > h4").forEach(item => {
            item.remove();
        });
        scores.value = 0;
        loadItems(array);
        clearInterval(timingInterval);

    } else {
        loadItems(array);
        startFlag = true;
    }
    timingInterval = setInterval(updateTime, 1000);
})
function updateTime(){
    timerInp.stepUp(1);
}
function loadItems(array) {
    for (word of array) {
        let h4 = document.createElement("h4");
        h4.style.textTransform = "uppercase";
        h4.style.fontSize = "18px";
        h4.style.padding = "10px";
        h4.innerText = word;
        h4.id = word;
        wordCont.append(h4);
    }
    puzzleConstructor(array);
    getText();
}
let answers = [];

function getText() {
    let cellArr = document.querySelectorAll(".cell");
    let flag = false;
    let myWord = [];
    let myCells = [];
    let array = dict.slice();
    let score = 0;
    let myAudio = document.createElement("audio");
    myAudio.src = "../static/sounds/game-complete.mp3";
    cellArr.forEach(cell => {
        cell.addEventListener("mousedown", () => {
            if (!flag) {
                myWord.push(cell.innerText);
                myCells.push(cell);
                cell.style.backgroundColor = "yellow";
                flag = true;
            }

        }, false);
        cell.addEventListener("mouseover", () => {
            if (flag) {
                myWord.push(cell.innerText);
                myCells.push(cell);
                cell.style.backgroundColor = "yellow";
            }
        }, false);
        cell.addEventListener("mouseup", () => {
            if (flag) {
                flag = false;
                var word = myWord.join("").toLocaleLowerCase();
                if (array.includes(word)) {
                    score += 10;
                    scores.value = score;
                    tag = document.getElementById(word);
                    tag.style.backgroundColor = "white";
                    var color = randColor();
                    for (elem of myCells) {
                        elem.style.backgroundColor = "#" + color + "75";
                    }
                    array.splice(array.indexOf(word), 1);
                } else {
                    for (elem of myCells) {
                        elem.style.backgroundColor = "";
                    }
                }
                myWord = [];
                myCells = [];
                if(array.length === 0){
                    myAudio.play();
                    messageCont.style.visibility = "visible";
                    clearInterval(timingInterval);
                    updateTimingText();
                }
            }
        }, false);
        
    })
}
function updateTimingText(){
    var s = parseInt(timerInp.value.split(":")[1]);
    var min = parseInt(timerInp.value.split(":")[0]);
    var timeinSec = (min * 60) + s;
    document.getElementById("timingText").innerText = "You have completed the puzzle in "+ timeinSec + " seconds";
}
function randColor() {
    let letters = "0123456789ABCDEF";
    let letter = [];
    var word;
    for (i = 0; i < 6; i++) {
        letter.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    return word = letter.join("");
}

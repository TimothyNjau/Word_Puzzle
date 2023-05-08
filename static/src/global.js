const table = document.getElementById("puzzleCont");
const puzzleDim = 10;
const categoryBtn = document.getElementById("categoryBtn");

categoryBtn.addEventListener("change",(event)=>{
    let val = event.target.value;
    switch(val){
        case "animals":
        dict = animal.slice();
            break;
        case "school":
        dict = school.slice();
            break;
        case "kitchen":
        dict = kitchen.slice();
            break;
    }
})
const animal = ["lion", 'cheetah', 'monkey',
                'dog', 'sheep', 'elephant', 
                'leopard', 'zebra', 'buffalo'];

const school = ['ruler', 'notebook', 'book',
                'eraser', 'pencil', 'desk',
                'teacher', 'student', 'chalk' ];

const kitchen = ['plate', 'whisk', 'spatula',
              'knife', 'spoon', 'fork',
              'blender', 'ladle', 'grater'];

let dict = [ "elephant", "lion", "giraffe", 
               "cat", "mercedes", "computer",
               "human", "feeling", "kilogram"];
class Word {
    constructor(array) {
        var num = randomNum(array.length)
        var elem = array[num];
        //array.splice(num, 1);
        this.word = elem.split("");
        this.x = randomNum(puzzleDim);
        this.y = randomNum(puzzleDim);
        while ((this.x + this.word.length) > puzzleDim && (this.y + this.word.length) > puzzleDim) {
            this.x = randomNum(puzzleDim);
            this.y = randomNum(puzzleDim);
        }
        this.vertical = (Math.random() > 0.5) ? false : true;
        this.text = elem;
    }
}
let puzzleConstructor = (array) => {
    for (let i = 0; i < puzzleDim; i++) {
        let puzzleRow = document.createElement("tr");
        for (let j = 0; j < puzzleDim; j++) {
            let puzzleCell = document.createElement("td");
            puzzleCell.className = "cell";
            puzzleCell.id = `${i}_${j}`;
            puzzleRow.append(puzzleCell);
        }
        table.append(puzzleRow);
    }
const emptyCell = '';
let cell = [];
let jumbleLetters = [];
for (let row = 0; row < puzzleDim; row++) {
    cell[row] = [];
    for (let col = 0; col < puzzleDim; col++) {
        cell[row][col] = document.getElementById(`${row}_${col}`);
    }
}
function isEmpty(Word) {
    var count = 0;
    var row = Word.y;
    var column = Word.x;
    if (Word.vertical) {
        for(letter of Word.word){
            if(cell[row][column].innerHTML != emptyCell){
                count++;
            }
           row++;
        }
    } else {
        for(letter of Word.word){
            if(cell[row][column].innerHTML != emptyCell){
                count++;
            }
           column++;
        }
    }
    if(count > 0){
        return false;
    } else {
        return true;
    }
}
function fitOnGrid(Word) {
    if (Word.vertical && (Word.y + Word.word.length) > puzzleDim) {
        Word.vertical = !Word.vertical;
    } else if (!Word.vertical && (Word.x + Word.word.length) > puzzleDim) {
        Word.vertical = !Word.vertical;
    }
}
function placeWord(Word) {
    var row = Word.y;
    var column = Word.x;
    if (Word.vertical) {
        for (letter of Word.word) {
            cell[row][column].innerHTML = letter;
            row++;
            
        }
    } else {
        for (letter of Word.word) {
            cell[row][column].innerHTML = letter;
            column++;
        }
    }
}
function pushWord(usedWord){
    jumbleLetters.push(usedWord.text);
    return array.splice(array.indexOf(usedWord.text), 1);
}


while (array.length > 0) {
    var elem = new Word(array);
    fitOnGrid(elem);
    if(isEmpty(elem)){
        placeWord(elem);
        pushWord(elem);
    } else {
        continue;
    }
}
for(let row = 0; row < puzzleDim; row++){
    for(let col = 0; col < puzzleDim; col++){
        let word = jumbleLetters[randomNum(jumbleLetters.length)];
        let letter = word[randomNum(word.length)];
        if(cell[row][col].innerHTML === emptyCell){
            cell[row][col].innerHTML = letter;
        }
    }
}
}
function randomNum(max) {
    var num;
    return num = Math.floor(Math.random() * max);
}
//puzzleConstructor(dict);


function playGame() {

var wins = document.getElementById('wins').innerHTML;
var losses = document.getElementById('losses').innerHTML;
var lettersGuessed = [];
var guessesRemaining = document.getElementById('guessesRemaining').innerHTML;
var winOrLoseState = false;

function updateScore () {
    document.getElementById('wins').innerHTML = wins;
    document.getElementById('losses').innerHTML = losses;
}

function updateGuesses() {
    guessesRemaining--;
    document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
}

function updateLettersGuessed () {
    document.getElementById('lettersGuessed').innerHTML = lettersGuessed.join(', ');
}

function updateCurrentWords () {
    document.getElementById('currentWordFormatted').innerHTML = currentWordFormatted.join(' ');
}

function resetGame () {
    lettersGuessed = [];
    document.getElementById('lettersGuessed').innerHTML = '';
    guessesRemaining = 10;
    document.getElementById('guessesRemaining').innerHTML = '10';
    document.getElementById('winLose').innerHTML = ' ';
}
var listOfRandomWords = [ 
    "change", "cherries", "humor", "bike","cushion",
    "idea", "wood", "channel", "wire", "rice",
    "magic", "friend", "language", "crime", "bird",
    "sign", "bite", "veil", "mountain", "cast",
    "statement", "voice", "sort", "spiders", "expert",
    "country", "eggnog", "spy", "vegetable", "wax",
    "part", "calendar", "spark", "distribution", "riddle",
    "insurance", "creator", "basin", "slave", "harmony",
    "doll", "aunt", "curtain", "cloth", "crate",
    "interest", "tiger", "lettuce", "holiday", "caption"
];

function chooseWord () {
var randomNumber = Math.floor(Math.random() * 50);
var chosenWord = listOfRandomWords[randomNumber];
var formattedWord = chosenWord.split('');
return formattedWord;
}

var secretWord = chooseWord();

var currentWordFormatted = new Array (secretWord.length);
currentWordFormatted.fill(' _ ');
updateCurrentWords();


console.log(secretWord);
console.log(currentWordFormatted);


document.onkeyup = function (event) {
    var guess;

    if (event.keyCode >= 65 && event.keyCode <= 90){
        guess = event.key.toLowerCase(); 
    } else {
        alert("Enter a letter a-z");
    }

    // if letter is in the secret word and hasn't been guessed yet, 
    if (secretWord.indexOf(guess) !== -1 && lettersGuessed.indexOf(guess) === -1){
        var idxWithGuess = [];
        var idx = secretWord.indexOf(guess);

        while (idx != -1) {
            idxWithGuess.push(idx);
            idx = secretWord.indexOf(guess, idx + 1);
        }
        idxWithGuess.forEach( function (index) {
            currentWordFormatted[index] = guess;
        });

        lettersGuessed.push(guess);
    } else if (secretWord.indexOf(guess) === -1 && lettersGuessed.indexOf(guess) === -1) {
        lettersGuessed.push(guess);
        updateGuesses();
    }

    console.log(currentWordFormatted);
    console.log(secretWord);

    updateLettersGuessed();
    updateCurrentWords();

    if (currentWordFormatted.join() === secretWord.join()) {
        
        wins++;
        document.getElementById("winLose").innerHTML = "<h1>Winner. Press any key to play again.</h1>";
        document.onkeyup = function (event) {
            resetGame();
            playGame();
        }

    }
    if (guessesRemaining <= 0) {
        
        losses++;
        document.getElementById("winLose").innerHTML = "<h1>Loser. Press any key to play again.</h1>";
        document.onkeyup = function (event) {
            resetGame();
            playGame();
        }
    };
    updateScore ();
}
}

playGame();



// "<button type='reset'>New Game</button>"



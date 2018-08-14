
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
        
        alert("Winner");
        wins++;
        document.getElementsByClassName(".button").innerHTML = "<h1>Hello</h1>";
        console.log(document.getElementsByClassName(".button").innerHTML);

    }
    if (guessesRemaining === 0) {
        
        alert("Loser");
        losses++;
    };
    updateScore ();
}






// "<button type='reset'>New Game</button>"



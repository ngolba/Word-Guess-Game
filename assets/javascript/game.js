
function playGame() {

document.getElementById('mainBody').classList.remove('hide');
var wins = document.getElementById('wins').innerHTML;
var losses = document.getElementById('losses').innerHTML;
var lettersGuessed = [];
var guessesRemaining = document.getElementById('guessesRemaining').innerHTML;
var winSound = new Audio('assets/audio/slowClap.wav');
var loseSound = new Audio('assets/audio/hornFail.wav');

winSound.load();
loseSound.load();

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
    guessesRemaining = 7;
    document.getElementById('guessesRemaining').innerHTML = '7';
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

var listOfImgs = [ "assets/images/Hang0.png" , "assets/images/Hang1.png", 
"assets/images/Hang2.png", "assets/images/Hang3.png", 
"assets/images/Hang4.png", "assets/images/Hang5.png",
"assets/images/Hang6.png", "assets/images/Hang7.png",

]

var imgNum = 0;

function nextImg (imgNum) {
    document.getElementById('hangImg').src = listOfImgs [imgNum];
}

function resetImg () {
    imgNum = 0;
    document.getElementById('hangImg').src = listOfImgs [imgNum];
}

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

console.log("Wow, you even came to the console to cheat like the plebian you are.");
console.log(secretWord);
console.log(currentWordFormatted);

// Credit to www.peckedtodeathbychickens.com/the-pg-insult-generator-because-sometimes-even-mom-needs-to-name-call/ for list of PG insults
function randomIndex () {
    return Math.floor(Math.random() * 18);
}

var insultGenerator = {
    firstInsultWord : ["lilly-livered", "rotten", "stinky", "lame", "dim-witted", "funky", "crusty", "steamy", "drizzly", "grizzly", "squirty", "uptight", "hairy", "husky", "arrogant", "nippy", "chunky", "smelly"],
    secondInsultWord : ["hiney", "poop", "toot", "wedgie", "stool", "fudge", "bum", "potty", "dookie", "pudding", "sphincter", "booger", "feces", "snot", "crust", "badonk-a", "crud", "sludge"],
    thirdInsultWord : ["squeegee", "turtle", "cabbage", "bomb", "sniffer", "binkie", "stump", "nugget", "whistle", "twig", "knuckle", "burger", "hot dog", "loaf", "freckle", "soldier", "kernel", "shingle"],
    a : randomIndex(),
    b : randomIndex(),
    c : randomIndex(),

    generateInsult : function() {
        return this.firstInsultWord[this.a] + ' ' + this.secondInsultWord[this.b] + ' ' + this.thirdInsultWord[this.c];
    }
}


document.onkeyup = function (event) {
    var guess;

    // Literally 50% of the code is in this if instance and won't run if a non a-z character is pressed
    if (event.keyCode >= 65 && event.keyCode <= 90){
        guess = event.key.toLowerCase(); 


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
            imgNum++;
            nextImg(imgNum);
            if(guessesRemaining === 4) {
                alert("Yawn");
            } else if (guessesRemaining === 2){
                alert("You really don't get it, do you?");
            } else if (guessesRemaining === 1){
                alert("Last guess. Are you feeling lucky?");
            }
        }

        // console.log(currentWordFormatted);
        // console.log(secretWord);

        updateLettersGuessed();
        updateCurrentWords();

        if (currentWordFormatted.join() === secretWord.join()) {
            
            wins++;
            document.getElementById('mainBody').classList.add('hide');
            document.getElementById("winLose").innerHTML = '<div class="jumbotron fixed-top m-5 text-center" ><h1>You win, or whatever.</h1>' + "<br>" + '<h1>Press any key to play again.</h1></div>';
            winSound.play();
            document.onkeyup = function (event) {
                resetGame();
                playGame();
                resetImg();
            }

        }
        if (guessesRemaining <= 0) {
            
            losses++;
            document.getElementById('mainBody').classList.add('hide');
            document.getElementById("winLose").innerHTML = '<div class="jumbotron fixed-top m-5 text-center" ><h1>The word was ' + '"' + secretWord.join('') + '"' + ", you " +  insultGenerator.generateInsult() + ".</h1>" + "<br>" + '<h1>Press any key to play again.</h1></div>';
            loseSound.play();
            document.onkeyup = function (event) {
                resetGame();
                playGame();
                resetImg();
            }
        };

        updateScore ();
    } else {
        alert("Dude, that's not even a letter.");
        
    }
}
}

playGame();




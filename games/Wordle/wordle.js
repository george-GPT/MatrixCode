// initialize HTML elements
const gameDisplay = document.getElementById("gameDisplay");
const userGuess = document.getElementById("userGuess");
const restartButton = document.getElementById("restartButton");
const submitButton = document.getElementById('submitButton');
const guessData = document.getElementById('guessData');
const attemptDisplay= document.getElementById('attemptDisplay');

// initialize game display
userGuess.innerText ="";


// initialize game logic 
let correctWord = ''
let currentGuess = userGuess.innerText 
let currentAttempt = 1;
let attemptNumber = ""
attemptDisplay.innerHTML = ``Attempt ${currentAttempt}/6``
wordGenerator()

const wordArray = [
  "world",
  "diver",
  "house",
  "place",
  "right",
  "large",
  "small",
  "water",
  "group",
  "study",
  "still",
  "learn",
  "plant",
  "cover",
  "while",
  "point",
  "about",
  "other",
  "which",
  "their",
  "there",
  "would",
  "these",
  "write",
  "could",
  "first",
  "thing",
  "think",
  "after",
  "child",
  "every",
  "found",
  "great",
  "where",
  "drive",
  "night",
  "hover",
  "thing",
  "think",
  "right",
  "story",
  "dream",
  "never",
  "along",
  "bring",
  "above",
  "place",
  "earth",
  "world",
  "night",
  "light",
  "small",
  "under",
  "start",
  "where",
  "drive",
  "other",
  "large",
  "study",
  "plant",
  "water",
  "cover",
  "while",
  "found",
  "learn",
  "about",
  "group",
  "still",
  "child",
  "every",
  "which",
  "could",
  "write",
  "think",
  "after",
  "first",
  "there",
  "where",
  "would",
  "right",
  "house",
  "thing",
  "story",
  "never",
  "dream",
  "bring",
  "night",
  "along",
  "above",
  "earth",
  "light",
  "start",
  "under",
  "small",
  "place",
  "other",
  "world",
  "drive",
  "large",
  "cover",
  "found",
  "learn",
  "about",
  "while",
  "still",
  "child",
  "every",
  "which",
  "apple",
  "knife",
  "piano",
  "table",
  "chair",
  "phone",
  "teeth",
  "laugh",
  "happy",
  "fence",
  "dress",
  "plant",
  "tiger",
  "grape",
  "lemon",
  "juice",
  "queen",
  "beach",
  "music",
  "beard",
  "cream",
  "beard",
  "happy",
  "cheer",
  "hurry",
  "horse",
  "apple",
  "juice",
  "queen",
  "cream",
  "dress",
  "music",
  "knife",
  "piano",
  "teeth",
  "table",
  "phone",
  "tiger",
  "grape",
  "lemon",
  "chair",
  "fence",
  "laugh",
  "happy",
  "beach",
  "plant",
  "beard",
  "cheer",
  "hurry",
  "horse",
  "cream",
  "dress",
  "music",
  "apple",
  "knife",
  "piano",
  "teeth",
  "table",
  "phone",
  "tiger",
  "grape",
  "lemon",
  "chair",
  "fence",
  "laugh",
  "happy",
  "beach",
  "plant",
  "beard",
  "cheer",
  "hurry",
  "horse",
  "apple",
  "juice",
  "queen",
  "cream",
  "dress",
  "music",
  "knife",
  "piano",
  "teeth",
  "table",
  "phone",
  "tiger",
  "grape",
  "lemon",
  "chair",
  "fence",
  "laugh",
  "happy",
  "beach",
  "plant",
  "beard",
  "cheer",
  "hurry",
  "horse",
  "baker",
  "brick",
  "chair",
  "dough",
  "eagle",
  "flood",
  "glass",
  "hatch",
  "igloo",
  "jelly",
  "kiosk",
  "leash",
  "mocha",
  "ocean",
  "piano",
  "quilt",
  "raven",
  "salsa",
  "thorn",
  "valve",
  "waltz",
  "yacht",
  "actor",
  "cigar",
  "dance",
  "elbow",
  "fable",
  "glaze",
  "hoist",
  "issue",
  "juice",
  "lemon",
  "merry",
  "night",
  "opera",
  "paste",
  "quake",
  "relic",
  "scale",
  "scope",
  "trail",
  "trunk",
  "urban",
  "vocal",
  "wedge",
  "yield",
  "zesty",
  "abode",
  "blink",
  "charm",
  "dandy",
  "froth",
  "gravy",
  "hefty",
  "index",
  "joust",
  "knack",
  "lunar",
  "marsh",
  "novel",
  "pluck",
  "query",
  "roast",
  "scuba",
  "tramp",
  "ultra",
  "virus",
  "whisk",
  "young",
  "zebra",
  "adore",
  "bliss",
  "chaos",
  "dwarf",
  "ether",
  "gauze",
  "heart",
  "image",
  "jumbo",
  "kitty",
  "laser",
  "nerdy",
  "oasis",
  "pluck",
  "quest",
  "ruler",
  "savor",
  "toast",
  "unity",
  "vibes",
  "wreck",
  "bread",
  "grass",
  "smile",
  "laugh",
  "river",
  "beach",
  "bread",
  "clean",
  "close",
  "cloud",
  "dance",
  "drink",
  "early",
  "floor",
  "fresh",
  "happy",
  "heart",
  "honey",
  "light",
  "music",
  "peace",
  "quiet",
  "round",
  "shape",
  "sound",
  "beach",
  "brown",
  "clean",
  "coast",
  "dance",
  "event",
  "fruit",
  "green",
  "laugh",
  "peace",
  "quick",
  "round",
  "shape",
  "solid",
  "space",
  "sweet",
  "voice",
  "watch",
  "young",
  "child",
  "depth",
  "knife",
  "plant",
  "quick",
  "snake",
  "table",
  "uncle",
  "wagon",
  "zebra",
  "dream",
  "frost",
  "image",
  "jeans",
  "night",
  "queen",
  "shoes",
  "tiger",
  "vocal",
  "wrist",
  "yacht",
  "yield",
  "wield",
  "field",
  "naive",
  "swore",
  "adore",
  "snore",
  "shore",
  "floor",
  "odour",
  "attest",
  "apple",
  "birch",
  "chase",
  "daisy",
  "earth",
  "fairy",
  "globe",
  "happy",
  "ivory",
  "jelly",
  "kitty",
  "lemon",
  "magic",
  "novel",
  "oasis",
  "arrow",
  "bloom",
  "cloud",
  "dwarf",
  "elbow",
  "flood",
  "grain",
  "hatch",
  "igloo",
  "juicy",
  "leash",
  "novel",
  "opera",
  "peace",
  "quilt",
  "roast",
  "sunny",
  "theme",
  "vital",
];


//function for CPU to come up with 5 letter word
function wordGenerator(){
const randomIndex = Math.floor(Math.random() * wordArray.length);
const randomWord = wordArray[randomIndex];
correctWord = randomWord;
return correctWord;
}


function guessResults(correctWord, userGuess, guessData) {
    // Split both the correct word and the user guess into arrays of characters
    const correctWordArray = correctWord.split('');
    const userGuessArray = userGuess.split('');
    currentAttempt++;
    // Create a new table row
    const newRow = document.createElement('tr');
    // Iterate over the userGuessArray to populate the table and apply logic
    userGuessArray.forEach((char, index) => {
        // Create a new table cell
        const newCell = document.createElement('td');
        // Set the text content of the cell to the current letter
        newCell.textContent = char;

        // Apply comparison logic and add the appropriate class
        if (char === correctWordArray[index]) {
            // Correct letter in the correct position
            newCell.classList.add('rightLetterRightSpot');
        } else if (correctWordArray.includes(char)) {
            // Correct letter but in the wrong position
            newCell.classList.add('rightLetterWrongSpot');
        } else {
            // Incorrect letter
            newCell.classList.add('wrongLetterWrongSpot');
        }
        
        // Append the new cell to the row
        newRow.appendChild(newCell);

        // Append the new row to the table or table body
        guessData.appendChild(newRow);
        if (correctWord === userGuess) {
          gameOverCorrect()
        }
        if (currentAttempt === 6 && userGuess !== correctWord) {
          gameOverIncorrect()
        }    
 });
}

// gameOver screen once all guesses are made and user loses
function gameOverIncorrect(){
alert("You have run out of guesses! Press Restart to play again.");
}

// correctGuess screen once the word has been guessed within 6 or less attempts
function gameOverCorrect(){
  alert(`That is the correct word! You guessed it in ${currentAttempt} tries!`);
}

// new game / start over function
function newGame() {
  document.getElementById('guessData').innerHTML = '';  
  wordGenerator()
  currentGuess = "";
  currentGuess = userGuess.innerText 
  currentAttempt = 1;
  attemptNumber = ""
  attemptDisplay.innerHTML = `Attempt ${currentAttempt}/6`
}

// event listeners
submitButton.addEventListener("click", function(){
  guessResults(correctWord, userGuess, guessData);
});

restartButton.addEventListener("click", function(){
  newGame();
});

// Initialize HTML elements
const gameDisplay = document.getElementById("gameDisplay");
const currentGuess = document.getElementById("currentGuess");
const restartButton = document.getElementById("restartButton");
const submitButton = document.getElementById('submitButton');
const guessData = document.getElementById('guessData');
const attemptDisplay = document.getElementById('attemptDisplay');

// Initialize game logic 
let correctWord = '';
let currentAttempt = 1;
attemptDisplay.innerHTML = `Attempt ${currentAttempt}/6`;
wordGenerator();

const wordArray = [
"abide",
"abode",
"about",
"above",
"actor",
"adore",
"adult",
"after",
"along",
"apple",
"arrow",
"attest",
"baker",
"beach",
"beard",
"birch",
"blink",
"bliss",
"bloom",
"bread",
"brick",
"bring",
"brown",
"chair",
"chaos",
"charm",
"chase",
"cheer",
"child",
"cigar",
"clean",
"close",
"cloud",
"coast",
"could",
"cover",
"cream",
"daisy",
"dance",
"dandy",
"depth",
"diver",
"dough",
"dream",
"dress",
"drink",
"drive",
"dwarf",
"eagle",
"early",
"earth",
"elbow",
"ether",
"event",
"every",
"fable",
"fairy",
"fence",
"field",
"first",
"flood",
"floor",
"flush",
"found",
"fresh",
"frost",
"froth",
"fruit",
"gauze",
"glass",
"glaze",
"glide",
"globe",
"grain",
"grape",
"grass",
"gravy",
"great",
"green",
"group",
"happy",
"hatch",
"heart",
"hefty",
"hoist",
"honey",
"horse",
"house",
"hover",
"hurry",
"igloo",
"image",
"index",
"issue",
"ivory",
"jeans",
"jelly",
"joust",
"juice",
"juicy",
"jumbo",
"kiosk",
"kitty",
"knack",
"knife",
"large",
"laser",
"laugh",
"learn",
"leash",
"lemon",
"light",
"lunar",
"magic",
"marsh",
"merry",
"mocha",
"music",
"naive",
"nerdy",
"never",
"night",
"novel",
"oasis",
"ocean",
"odour",
"opera",
"other",
"paste",
"peace",
"phone",
"piano",
"place",
"plant",
"pluck",
"point",
"quake",
"queen",
"query",
"quest",
"quick",
"quiet",
"quilt",
"raven",
"relic",
"right",
"river",
"roast",
"round",
"ruler",
"salsa",
"savor",
"scale",
"scope",
"scuba",
"shape",
"shoes",
"shore",
"slide",
"small",
"smile",
"snake",
"snore",
"solid",
"sound",
"space",
"start",
"still",
"story",
"study",
"sunny",
"sweet",
"swore",
"table",
"teeth",
"their",
"theme",
"there",
"these",
"thing",
"think",
"thorn",
"tiger",
"toast",
"trail",
"tramp",
"trunk",
"ultra",
"uncle",
"under",
"unity",
"urban",
"valve",
"vibes",
"virus",
"vital",
"vocal",
"voice",
"wagon",
"waltz",
"watch",
"water",
"wedge",
"where",
"which",
"while",
"whisk",
"wield",
"world",
"would",
"wreck",
"wrist",
"write",
"yacht",
"yearn",
"yield",
"young",
"zebra",
"zesty",
"angel",
"angle",
"bonus",
"clear",
"entry",
"frame",
"ghost",
"human",
"ideal",
"judge",
"kneel",
"limit",
"money",
"order",
"proud",
"quiet",
"rural",
"speak",
"total",
"usual",
"visit",
"wheel",
"youth"
];

function wordGenerator() {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    correctWord = wordArray[randomIndex].toLowerCase();
}

function guessResults() {
    let userGuess = currentGuess.value.toLowerCase();
    const correctWordArray = correctWord.split('');
    const userGuessArray = userGuess.split('');
    const newRow = document.createElement('tr');
    userGuessArray.forEach((char, index) => {
        const newCell = document.createElement('td');
        newCell.textContent = char;
        if (char === correctWordArray[index]) {
            newCell.classList.add('rightLetterRightSpot');
        } else if (correctWordArray.includes(char)) {
            newCell.classList.add('rightLetterWrongSpot');
        } else {
            newCell.classList.add('wrongLetterWrongSpot');
        }
        newRow.appendChild(newCell);
    });
    guessData.appendChild(newRow);
    if (correctWord === userGuess) {
        gameOverCorrect();
    } else if (currentAttempt >= 6) {
        gameOverIncorrect();
    } else {
        currentAttempt++;
        attemptDisplay.innerHTML = `Attempt ${currentAttempt}/6`;
    }
}


function gameOverIncorrect() {
    alert("You have run out of guesses! Press Restart to play again.");
}

function gameOverCorrect() {
    alert(`That is the correct word! You guessed it in ${currentAttempt} tries!`);
}


restartButton.addEventListener("click", function() {
    newGame();
});

function newGame() {
    currentGuess.value = ""; // Clear the input field
    guessData.innerHTML = '';  // Clear the table
    currentAttempt = 1;
    attemptDisplay.innerHTML = `Attempt ${currentAttempt}/6`;
    wordGenerator(); // Generate a new word
}

submitButton.addEventListener("click", function() {
    let userGuess = currentGuess.value.toLowerCase();
    if (userGuess.length !== 5) {
        alert("Please enter a 5 letter word");
    } else {
        guessResults();
    }
});



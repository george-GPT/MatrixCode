document.addEventListener('DOMContentLoaded', function () {
  // Fetch CSV data
  fetchData()

  // Add event listener to the list-group div
  const listGroup = document.querySelector('.list-group')
  const listGroupItems = document.querySelectorAll('.list-group a')
  const htmlCard = document.getElementById('html-card')
  const cssCard = document.getElementById('css-card')
  const jsCard = document.getElementById('js-card')

  // Handle click on list-group items
  if (listGroup) {
    listGroup.addEventListener('click', function (event) {
      handleListGroupClick(event)
    })
  }

  // Set click events for each card
  if (htmlCard) {
    htmlCard.addEventListener('click', () =>
      redirectToUrl('https://matrixcode.ca/html.html')
    )
  }
  if (cssCard) {
    cssCard.addEventListener('click', () =>
      redirectToUrl('https://matrixcode.ca/css.html')
    )
  }
  if (jsCard) {
    jsCard.addEventListener('click', () =>
      redirectToUrl('https://matrixcode.ca/javascript.html')
    )
  }

  // Attach event listeners for all items within the list-group
  listGroupItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
      handleListGroupItemClick(event, this)
    })
  })
})

function handleListGroupClick(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault()
    scrollToTarget(event.target.hash)
  }
}

function handleListGroupItemClick(event, item) {
  event.preventDefault()
  scrollToTarget(item.hash)
}

function scrollToTarget(hash) {
  const targetElement = document.querySelector(hash)
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth',
    })
  }
}
// Function to fetch CSV data from the PHP script and update csvData
function fetchData() {
  fetch('/php/display_data.php') // Update the URL with the correct path to your PHP script
    .then((response) => response.text())
    .then((data) => {
      const csvDataElement = document.getElementById('csvData')
      if (csvDataElement) {
        csvDataElement.innerHTML = data
      }
    })
    .catch((error) => {
      console.error('Error fetching CSV data:', error)
    })
}

// Function to redirect to a specified URL
function redirectToUrl(url) {
  window.location.href = url
}

// Function to open a page by name
function openPage(pageName) {
  const tabContent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }
  const pageElement = document.getElementById(pageName);
  if (pageElement) {
    pageElement.style.display = 'block';
  }

  // Fetch CSV data when a tab is opened
  if (pageName === 'csvDataTab') {
    fetchData();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Function to check if the device is a touch device
  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  // Apply click event listeners for all items within the list-group
  const listGroupItems = document.querySelectorAll('.list-group a');
  listGroupItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Get the target section's ID (e.g., #htmlCheatSheet)
      const target = this.getAttribute('href').substring(1); // Remove the "#" character

      // Find the target element by its ID
      const targetElement = document.getElementById(target);

      // Check if the target element exists
      if (targetElement) {
        // Calculate the distance to scroll
        const offset = targetElement.getBoundingClientRect().top + window.scrollY;

        // Scroll smoothly to the target element
        window.scrollTo({
          top: offset,
          behavior: 'smooth', // Use smooth scrolling behavior
        });
      }
    });
  });

  // Get all the dropdown elements
  const dropdowns = document.getElementsByClassName('tab');

  // Loop through the dropdowns and add click event listeners
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', function (event) {
      // Prevent the click from affecting other elements
      event.stopPropagation();

      // Toggle the dropdown content
      this.querySelector('.dropdown-content').classList.toggle('show');
    });
  }

  if (isTouchDevice()) {
    // Apply specific click event listeners for touch devices
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (event) {
        let dropdown = this.querySelector('.dropdown-content');
        if (dropdown) {
          // Toggle dropdown display for touch devices
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          event.stopPropagation(); // Prevents document click from immediately hiding the dropdown
        }
      });
    });
  } else {
    // Desktop-specific event handling can be added here if needed
  }

  // Close the dropdown if the user clicks outside of it
  document.addEventListener('click', function (event) {
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    dropdownContents.forEach(function (dropdown) {
      if (!event.target.closest('.tab')) {
        dropdown.style.display = 'none';
      }
    });
  });

});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebarMenu");
  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "250px";
  }
}

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}


function jsQuiz() {

const question = document.getElementById("currentQuestion");
const optionsList = document.getElementById("optionsList");
const nextButton = document.getElementById("nextButton");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

function startQuizFunction() {
  document.getElementById("welcomePage").style.display = 'none';
  document.getElementById("quizContainer").style.display = 'block';
  displayQuestion();
}

let userScore = 0;
let currentQuestionIndex = 0;
let selectedOption = null;
let wrongAnswers = [];

const quizQuestions = [
  {
    question:
      '1. What is the purpose of the preventDefault() method in JavaScript event handling?',
    options: {
      a: 'To stop the event from bubbling up the DOM tree',
      b: 'To prevent the default action associated with an event',
      c: 'To pause the execution of event handling code',
      d: 'To trigger the event manually',
    },
    correctAnswer: 'b', 
  },
  {
    question: '2. What does the DOM stand for in JavaScript?',
    options: {
      a: 'Document Object Model',
      b: 'Data Object Model',
      c: 'Document Order Model',
      d: 'Document Ownership Model',
    },
    correctAnswer: 'a',
  },
  {
    question:
      '3. Which JavaScript concept allows you to create reusable blocks of code that perform specific tasks?',
    options: {
      a: 'Arrays',
      b: 'Objects',
      c: 'Functions',
      d: 'Variables',
    },
    correctAnswer: 'c', 
  },
  {
    question:
      '4. How do you access an array element by its index in JavaScript?',
    options: {
      a: 'Using square brackets and the index number, like myArray[index]',
      b: 'Using dot notation, like myArray.index',
      c: 'Using parentheses, like myArray(index)',
      d: 'Using curly braces, like myArray{index}',
    },
    correctAnswer: 'a', 
  },
  {
    question:
      '5. Which of the following data types is used for text data in JavaScript?',
    options: {
      a: 'Numbers',
      b: 'Booleans',
      c: 'Strings',
      d: 'Objects',
    },
    correctAnswer: 'c', 
  },
  {
    question: '6. What is the purpose of parentheses in JavaScript?',
    options: {
      a: 'To define objects',
      b: 'To access array elements',
      c: 'To declare variables',
      d: 'To control the order of operations in expressions',
    },
    correctAnswer: 'd', 
  },
  {
    question:
      '7. Which JavaScript statement is used to create a loop that executes a block of code as long as a specified condition is true?',
    options: {
      a: 'for',
      b: 'if',
      c: 'while',
      d: 'switch',
    },
    correctAnswer: 'c',
  },
  {
    question:
      '8. What is the keyword used to declare a variable in JavaScript with block scope?',
    options: {
      a: 'var',
      b: 'let',
      c: 'const',
      d: 'block',
    },
    correctAnswer: 'b', 
  },
  {
    question:
      '9. Which of the following is used for string interpolation in JavaScript?',
    options: {
      a: "single quotes (' ')",
      b: 'double quotes (" ")',
      c: 'backticks ( ` )',
      d: 'square brackets ([ ])',
    },
    correctAnswer: 'c', 
  },
  {
    question:
      '10. How can you add a new element to the end of an array in JavaScript?',
    options: {
      a: 'myArray.unshift(newElement)',
      b: 'myArray.shift(newElement)',
      c: 'myArray.push(newElement)',
      d: 'myArray.pop(newElement)',
    },
    correctAnswer: 'c',
  },
  {
    question:
      '11. Which method is used to add a CSS class to an HTML element in JavaScript?',
    options: {
      a: 'element.setClass()',
      b: 'element.addClass()',
      c: 'element.className()',
      d: 'element.classList.add()',
    },
    correctAnswer: 'd',
  },
  {
    question: '12. What does the DOM stand for in JavaScript?',
    options: {
      a: 'Document Object Model',
      b: 'Data Object Model',
      c: 'Document Order Model',
      d: 'Document Ownership Model',
    },
    correctAnswer: 'a', 
  },
  {
    question:
      '13. Which event is triggered when a user clicks on an HTML element?',
    options: {
      a: 'mouseover',
      b: 'click',
      c: 'keydown',
      d: 'submit',
    },
    correctAnswer: 'b', 
  },
  {
    question:
      '14. What is the purpose of the preventDefault() method in JavaScript event handling?',
    options: {
      a: 'To stop the event from bubbling up the DOM tree',
      b: 'To prevent the default action associated with an event',
      c: 'To pause the execution of event handling code',
      d: 'To trigger the event manually',
    },
    correctAnswer: 'b', 
  },
  {
    question:
      '15. Which JavaScript concept allows you to create reusable blocks of code that perform specific tasks?',
    options: {
      a: 'Arrays',
      b: 'Objects',
      c: 'Functions',
      d: 'Variables',
    },
    correctAnswer: 'c', 
  },
  {
    question:
      '16. What is the primary purpose of an arrow function in JavaScript?',
    options: {
      a: 'To create objects',
      b: 'To define classes',
      c: 'To write concise functions',
      d: 'To declare variables',
    },
    correctAnswer: 'c', 
  },
  {
    question:
      '17. How do you access an array element by its index in JavaScript?',
    options: {
      a: 'Using square brackets and the index number, like myArray[index]',
      b: 'Using dot notation, like myArray.index',
      c: 'Using parentheses, like myArray(index)',
      d: 'Using curly braces, like myArray{index}',
    },
    correctAnswer: 'a', 
  },
  {
    question:
      '18. Which JavaScript keyword is used to handle asynchronous operations and avoid callback hell?',
    options: {
      a: 'Promise',
      b: 'Callback',
      c: 'Async',
      d: 'Await',
    },
    correctAnswer: 'a', 
  },
  {
    question:
      '19. Which browser API is used for making HTTP requests in JavaScript?',
    options: {
      a: 'fetch()',
      b: 'localStore()',
      c: 'navigator()',
      d: 'setTimeout()',
    },
    correctAnswer: 'a', 
  },
  {
    question: '20. What is the purpose of the localStorage API in JavaScript?',
    options: {
      a: 'To store data on the server',
      b: 'To store data on the client-side browser',
      c: 'To store data in the cloud',
      d: 'To store data in a database',
    },
    correctAnswer: 'b', 
  },
  {
    question: '21. How can you catch and handle errors in JavaScript code?',
    options: {
      a: 'Using try and catch blocks',
      b: 'Using if-else statements',
      c: 'Using switch statements',
      d: 'Using while loops',
    },
    correctAnswer: 'a', 
  },
  {
    question:
      '22. Which JavaScript concept allows you to model classes based on real-world entities and hide internal details?',
    options: {
      a: 'Inheritance',
      b: 'Abstraction',
      c: 'Encapsulation',
      d: 'Polymorphism',
    },
    correctAnswer: 'b', 
  },
  {
    question: '23. What does OOP stand for in JavaScript?',
    options: {
      a: 'Object-Oriented Programming',
      b: 'Object Order Programming',
      c: 'Order of Operations in Programming',
      d: 'Object Ownership Protocol',
    },
    correctAnswer: 'a',
  },
  {
    question:
      '24. How do you remove an element from the beginning of an array in JavaScript?',
    options: {
      a: 'myArray.unshift()',
      b: 'myArray.shift()',
      c: 'myArray.pop()',
      d: 'myArray.splice(myArray.length - 1, 1)',
    },
    correctAnswer: 'b', 
  },
  {
    question: '25. Which of the following is NOT a JavaScript data type?',
    options: {
      a: 'Symbol',
      b: 'Date',
      c: 'Time',
      d: 'Undefined',
    },
    correctAnswer: 'c',
  },
  {
    question:
      '26. What is the purpose of the innerHTML property in JavaScript when working with the DOM?',
    options: {
      a: 'To set the text content of an element',
      b: 'To add a new element to the DOM',
      c: 'To change the HTML content of an element',
      d: 'To hide an element from the DOM',
    },
    correctAnswer: 'c', 
  },
  {
    question: '27. In JavaScript, what is the role of the this keyword?',
    options: {
      a: 'It represents the next function to be executed',
      b: 'It refers to the global object',
      c: 'It refers to the current object or context',
      d: 'It is a reserved keyword with no specific purpose',
    },
    correctAnswer: 'c', 
  },
  {
    question:
      '28. Which loop in JavaScript is guaranteed to execute the code block at least once, even if the condition is false from the start?',
    options: {
      a: 'for loop',
      b: 'while loop',
      c: 'do...while loop',
      d: 'switch statement',
    },
    correctAnswer: 'c', 
  },
  {
    question:
      '29. What is the purpose of the setTimeout() function in JavaScript?',
    options: {
      a: 'To create a new element in the DOM',
      b: 'To schedule the execution of a function after a specified delay',
      c: 'To prevent default behavior in event handling',
      d: 'To add a class to an HTML element',
    },
    correctAnswer: 'b', 
  },
  {
    question:
      '30. Which JavaScript event occurs when a user moves the mouse pointer over an HTML element?',
    options: {
      a: 'click',
      b: 'mouseover',
      c: 'keydown',
      d: 'submit',
    },
    correctAnswer: 'b', 
  },
];

// Function to load and display the current question
function displayQuestion() {
  // Get the current question object from the quizQuestions array
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Display the question text in the question
  question.textContent = currentQuestion.question;

  // Clear any previous options from the optionsList
  optionsList.innerHTML = '';

  // Loop through the options of the qu question
  for (let key in currentQuestion.options) {;
    // Create a new list item element for each option
    const optionElement = document.createElement('li');

    // Set the text content of the list item to display the option key and value
    optionElement.textContent = `${key}: ${currentQuestion.options[key]}`;

    // Add the 'option' class to style the option
    optionElement.classList.add('option');

    // Add a click event listener to each option to handle user selection
    optionElement.addEventListener('click', function () {
      // Update the selectedOption variable with the chosen key
      selectedOption = key;

      // Enable the next button once an option is selected
      nextButton.disabled = false;

      // Highlight the selected option for user feedback
      highlightSelectedOption(optionElement)
    });

    // Append the option to the optionsList
    optionsList.appendChild(optionElement);
  }

  // Disable the nextButton by default until an option is selected
  nextButton.disabled = true;
}

// Highlight the selected option
function highlightSelectedOption(selectedLi) {
  // Remove the 'selected' class from all options
  document.querySelectorAll('.option.selected').forEach((option) => {
    option.classList.remove('selected');
  });

  // Add the 'selected' class to the clicked option to highlight it
  selectedLi.classList.add('selected');
}
// Function to handle the "Next" button click
function goToNextQuestion() {
  // Check if the selected option is correct
  if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
    userScore++;
  } else {
    // If the answer is wrong, store the question index in wrongAnswers
    wrongAnswers.push(currentQuestionIndex + 1);
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  // Display the completion message
  question.textContent = 'You have completed the quiz!';
  nextButton.style.display = 'none';
  restartButton.style.display = 'block'; // Show the restart button
  optionsList.innerHTML = "";

  // Display the final score
  finalScore.innerHTML = `You answered ${userScore} / ${quizQuestions.length} questions correctly.<br><br>`;

  // Display a list of wrong answers, if any
  if (wrongAnswers.length > 0) {
    finalScore.innerHTML += `The questions you got wrong were: ${wrongAnswers.join(
      ', '
    )}.<br>`;
  }
}

// Function to restart the quiz
function restartQuiz() {
  // Reset quiz-related variables
  currentQuestionIndex = 0;
  userScore = 0;
  selectedOption = null;
  wrongAnswers = [];
  finalScore.textContent = '';
  
  // Hide quiz container and show welcome page
  document.getElementById("quizContainer").style.display = 'none';
  document.getElementById("welcomePage").style.display = 'block';
  
  // Reset the Next and Restart button visibility
  nextButton.style.display = 'none';
  restartButton.style.display = 'none';
}


// Set up event listeners
nextButton.addEventListener('click', goToNextQuestion);
restartButton.addEventListener('click', restartQuiz);
document.getElementById("startQuiz").addEventListener('click', startQuizFunction);


// Initial setup
displayQuestion();
}



function BMICalculator() {

  // Locating DOM Elements
  const weight =  document.getElementById("weight");
  const heightFeet = document.getElementById("heightFeet");
  const heightInches = document.getElementById("heightInches");
  const convertButton = document.getElementById("convertButton");
  const checkBMIButton = document.getElementById("checkBMIButton");
  const resultsDisplay = document.getElementById("resultsDisplay");

  // Initial set up 
  let userWeight = 0;
  let userFeet = 0;
  let userInches = 0;
  let convertedWeight = 0;
  let convertedHeight = 0;
  let totalInches = 0;
  
  // Function to enable/disable the convertButton based on input validity
  function updateButtonStatus() {
    // Check if all fields have values (and optionally, are valid numbers)
    const allFieldsFilled = weight.value.trim() !== "" && heightFeet.value.trim() !== "" && heightInches.value.trim() !== "";
    convertButton.disabled = !allFieldsFilled; // Enable button if all fields are filled, disable otherwise
  }
  updateButtonStatus();
// function convert weight in lbs to kilos
  function lbsToKilos() {
    userWeight = weight.value;
    if (userWeight === "") {
    resultsDisplay.innerText = "Please add a valid number for your weight in lbs.";
    } else {
    let kilos = (userWeight * 0.453592);
    convertedWeight = kilos; 
    }
  }
    // Convert feet & inches into just inches, then inches to meters
  function heightInMeters() {
    userFeet = heightFeet.value;
    userInches = heightInches.value;
    if (userFeet === "" || userInches === "") {
    resultsDisplay.innerText = "Please add a valid number for your height in feet & inches.";
    } else {
    totalInches = (userFeet * 12) + userInches; 
    convertedHeight = totalInches * 0.0254;
  }
}
  
  function calculateBMI() {
    lbsToKilos();
    heightInMeters();
    if (convertedWeight > 0 && convertedHeight > 0) {
    let BMI = convertedWeight / (convertedHeight * convertedHeight);
    BMI = BMI.toFixed(2);
    resultsDisplay.innerText = `Your weight of ${userWeight} pounds has been converted to ${convertedWeight} Kilograms.\nYour height of ${totalInches} inches, has been converted to ${convertedHeight}.`;
    }
  }

  function displayResults(BMI) {
    resultsDisplay.innerText = `Based off your calculations of ${convertedWeight} kilograms & ${convertedeight} Meters,\n your BMI(body mass index) is ${BMI};.`;
    if (BMI < 18.5) {
      resultsDisplay.innerText = "\nAccording to your BMI you are underweight.";
    } else if (BMI >= 18.5 && BMI < 25) {
      resultsDisplay.innerText = "\nAccording to your BMI you are at a normal & healthy weight.";
    } else if (BMI >=25 && BMI < 30) {
      resultsDisplay.innerText = "\nAccording to your BMI you are overweight.";
    } else {
      resultsDisplay.innerText = "\nAccording to your BMI you are obese.";
    }
  }
  
  // event listeners
    convertButton.addEventListener("click", calculateBMI);
    checkBMIButton.addEventListener("click", displayResults);
    weight.addEventListener("input", updateButtonStatus);
    heightFeet.addEventListener("input", updateButtonStatus);
    heightInches.addEventListener("input", updateButtonStatus);
  
    // initializations  
    BMICalculator();
}




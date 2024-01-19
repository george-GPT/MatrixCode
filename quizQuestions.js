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
